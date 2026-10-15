import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';

const component = readFileSync(new URL('../src/components/site/ThemeToggle.astro', import.meta.url), 'utf8');
const script = stripTypeScriptTypes(component.match(/<script>([\s\S]*?)<\/script>/)[1]);

function setup({ reduced = false, supported = true } = {}) {
  const styles = {};
  const root = { dataset: { theme: 'light' }, style: { setProperty(key, value) { styles[key] = value; } } };
  const button = new EventTarget();
  button.querySelector = () => ({ getBoundingClientRect: () => ({ left: 334, top: 33, width: 20, height: 20 }) });
  const attributes = {};
  button.setAttribute = (key, value) => { attributes[key] = value; };
  const document = new EventTarget();
  document.documentElement = root;
  document.querySelectorAll = () => [button];
  const window = new EventTarget();
  const media = new EventTarget();
  media.matches = false;
  window.matchMedia = (query) => query.includes('reduced-motion') ? { matches: reduced } : media;
  let stored = 'light';
  const transitions = [];
  if (supported) document.startViewTransition = (update) => {
    update();
    let finish;
    const transition = {
      ready: Promise.resolve(),
      finished: new Promise((resolve) => { finish = resolve; }),
      skipTransition() { this.skipped = true; finish(); },
      finish: () => finish(),
    };
    transitions.push(transition);
    return transition;
  };
  runInNewContext(script, {
    document, window, innerWidth: 393, innerHeight: 852,
    localStorage: { getItem: () => stored, setItem: (_, value) => { stored = value; } },
  });
  document.dispatchEvent(new Event('astro:page-load'));
  const click = (coordinates = {}) => {
    const event = new Event('click');
    Object.assign(event, { detail: 0, clientX: 0, clientY: 0, ...coordinates });
    button.dispatchEvent(event);
  };
  return { root, window, document, click, transitions, attributes, styles, setStored(value) { stored = value; } };
}

const settle = () => new Promise((resolve) => setImmediate(resolve));

for (const coordinates of [{}, { detail: 1, clientX: 320, clientY: 20 }]) {
  test(`reveal starts at the icon centre for ${JSON.stringify(coordinates)}`, () => {
    const page = setup();
    page.click(coordinates);
    assert.equal(page.styles['--theme-x'], '344px');
    assert.equal(page.styles['--theme-y'], '43px');
  });
}

test('the final circle covers snapshot corners independently of window.innerHeight', () => {
  const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  const reveal = css.slice(css.indexOf('@keyframes theme-reveal'));
  const percent = Number(reveal.match(/to\s*\{[^}]*circle\(([\d.]+)%/)[1]);
  // CSS circle percentages use the reference box's normalized diagonal.
  for (const [width, height] of [[393, 852], [852, 393], [1440, 900]]) {
    const radius = percent / 100 * Math.hypot(width, height) / Math.SQRT2;
    for (const [x, y] of [[0, 0], [width, 0], [0, height], [width, height], [355, 34]]) {
      const required = Math.hypot(Math.max(x, width - x), Math.max(y, height - y));
      assert(radius >= required, `Circle misses a corner of ${width}x${height} from ${x},${y}`);
    }
  }
});

test('finishes cleanly and ignores overlapping clicks', async () => {
  const page = setup();
  page.click();
  page.click();
  assert.equal(page.transitions.length, 1);
  assert.equal(page.root.dataset.theme, 'dark');
  assert.equal(page.attributes['aria-pressed'], 'true');
  page.transitions[0].finish();
  await settle();
  assert.equal(page.root.dataset.themeTransition, undefined);
  page.click();
  assert.equal(page.root.dataset.theme, 'light');
});

for (const eventName of ['astro:before-preparation', 'pagehide']) {
  test(`cancels on ${eventName} without clearing a later transition`, async () => {
    const page = setup();
    page.click();
    (eventName === 'pagehide' ? page.window : page.document).dispatchEvent(new Event(eventName));
    assert.equal(page.transitions[0].skipped, true);
    assert.equal(page.root.dataset.themeTransition, undefined);
    page.click();
    await settle();
    assert.equal(page.root.dataset.themeTransition, '');
    page.transitions[1].finish();
    await settle();
    assert.equal(page.root.dataset.themeTransition, undefined);
  });
}

test('restores the stored theme from bfcache without replaying or duplicating handlers', () => {
  const page = setup();
  page.setStored('dark');
  const event = new Event('pageshow');
  event.persisted = true;
  page.window.dispatchEvent(event);
  page.window.dispatchEvent(event);
  assert.equal(page.root.dataset.theme, 'dark');
  assert.equal(page.attributes['aria-pressed'], 'true');
  assert.equal(page.transitions.length, 0);
  page.click();
  assert.equal(page.transitions.length, 1);
  assert.equal(page.root.dataset.theme, 'light');
});

for (const options of [{ reduced: true }, { supported: false }]) {
  test(`switches immediately with ${JSON.stringify(options)}`, () => {
    const page = setup(options);
    page.click();
    assert.equal(page.root.dataset.theme, 'dark');
    assert.equal(page.transitions.length, 0);
  });
}

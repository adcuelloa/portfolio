import type { TransitionBeforeSwapEvent } from "astro:transitions/client";

/**
 * Client-router lifecycle shared by every page (pattern from the Ges2l landing):
 * keeps the visitor's theme across swaps, restores scroll on back/forward,
 * and honours `#hash` targets after a cross-page navigation.
 */

const INIT_ATTR = "data-page-lifecycle";
let pendingScrollY: number | null = null;

function storedTheme(): "light" | "dark" | null {
  try {
    const value = localStorage.getItem("theme");
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function onBeforeSwap(event: TransitionBeforeSwapEvent): void {
  // The incoming document has no data-theme; copy the choice over before it paints.
  const theme = storedTheme();
  if (theme) event.newDocument.documentElement.dataset.theme = theme;

  pendingScrollY =
    event.navigationType === "traverse" && typeof history.state?.scrollY === "number" ? history.state.scrollY : 0;
}

function applyPendingScroll(): void {
  if (pendingScrollY === null || location.hash) return;
  window.scrollTo({ left: 0, top: pendingScrollY, behavior: "instant" });
}

function finishPendingScroll(): void {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      applyPendingScroll();
      pendingScrollY = null;
    });
  });
}

function scrollToHash(): void {
  const id = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (!id) return;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  });
}

export function initPageLifecycle(): void {
  const root = document.documentElement;
  if (root.hasAttribute(INIT_ATTR)) return;
  root.setAttribute(INIT_ATTR, "");

  document.addEventListener("astro:before-swap", onBeforeSwap);
  document.addEventListener("astro:after-swap", applyPendingScroll);
  document.addEventListener("astro:page-load", finishPendingScroll);
  document.addEventListener("astro:page-load", scrollToHash);
}

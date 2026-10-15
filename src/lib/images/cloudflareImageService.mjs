// Astro image service that emits Cloudflare Image Transformation URLs
// (`<cdn>/cdn-cgi/image/<options>/<key>`) for masters stored in R2 behind the CDN domain.
// Adapted from the Ges2l landing. Build-time only: nothing here runs in the browser.

const DEFAULTS = { fit: "cover", format: "auto", quality: 82, metadata: "none" };

function sourceString(src) {
  return typeof src === "string" ? src : src.src;
}

function optionString(options, config) {
  const pairs = [];
  if (options.width) pairs.push(["width", options.width]);
  if (options.height) pairs.push(["height", options.height]);
  pairs.push(["fit", options.fit ?? config.defaultFit ?? DEFAULTS.fit]);
  pairs.push(["quality", options.quality ?? config.defaultQuality ?? DEFAULTS.quality]);
  pairs.push(["format", options.format ?? config.defaultFormat ?? DEFAULTS.format]);
  pairs.push(["metadata", config.metadata ?? DEFAULTS.metadata]);
  if (config.onerror) pairs.push(["onerror", config.onerror]);
  return pairs.map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`).join(",");
}

/** Same-origin sources become a bucket key; anything else is passed through as an absolute URL. */
function normalizeSource(src, baseUrl) {
  const source = sourceString(src);
  try {
    const base = new URL(baseUrl);
    const url = new URL(source, base);
    if (url.origin === base.origin)
      return encodeURI(`${url.pathname}${url.search}`).replace(/^\/+/, "");
    return encodeURI(url.href);
  } catch {
    return encodeURI(source).replace(/^\/+/, "");
  }
}

function transformUrl(options, config) {
  const baseUrl = (config.baseUrl ?? "").replace(/\/+$/, "");
  return `${baseUrl}/cdn-cgi/image/${optionString(options, config)}/${normalizeSource(options.src, baseUrl)}`;
}

function dimensions(options) {
  const width = Number(options.width);
  const height = Number(options.height);
  return Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0
    ? { width, height }
    : { width: options.width, height: options.height };
}

const service = {
  getURL(options, imageConfig) {
    return transformUrl(options, imageConfig.service.config);
  },

  getSrcSet(options) {
    const widths = [...new Set(options.widths ?? [])].sort((a, b) => a - b);
    const { width, height } = dimensions(options);
    if (widths.length === 0 || typeof width !== "number" || typeof height !== "number") return [];

    const ratio = width / height;
    return widths.map((w) => ({
      transform: { ...options, width: w, height: Math.round(w / ratio) },
      descriptor: `${w}w`,
      attributes: {},
    }));
  },

  getHTMLAttributes(options) {
    const { width, height } = dimensions(options);
    const attributes = { ...options };
    for (const key of [
      "src",
      "width",
      "height",
      "format",
      "quality",
      "widths",
      "densities",
      "layout",
      "priority",
      "fit",
      "position",
      "background",
    ]) {
      delete attributes[key];
    }
    return {
      ...attributes,
      width,
      height,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async",
    };
  },
};

export default service;

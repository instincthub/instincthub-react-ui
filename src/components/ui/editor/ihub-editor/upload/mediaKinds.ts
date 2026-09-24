import type { MediaKind } from "../types";

export const ACCEPT_BY_KIND: Record<MediaKind, string> = {
  image: "image/*",
  video: "video/*",
  audio: "audio/*",
  pdf: "application/pdf,.pdf",
  file: "*/*",
  embed: "",
};

export const DEFAULT_MAX_SIZE_MB: Record<MediaKind, number> = {
  image: 10,
  video: 500,
  audio: 100,
  pdf: 50,
  file: 100,
  embed: 0,
};

export const KIND_LABEL: Record<MediaKind, string> = {
  image: "image",
  video: "video",
  audio: "audio",
  pdf: "PDF",
  file: "file",
  embed: "embed",
};

/** Pick the block kind that best displays a file. */
export function kindFromMime(mime: string, fileName = ""): MediaKind {
  const type = (mime || "").toLowerCase();
  if (type.startsWith("image/")) return "image";
  if (type.startsWith("video/")) return "video";
  if (type.startsWith("audio/")) return "audio";
  if (type === "application/pdf" || /\.pdf$/i.test(fileName)) return "pdf";
  return "file";
}

/** Guess a kind from a pasted URL's extension (used for "Embed link"). */
export function kindFromUrl(url: string, fallback: MediaKind): MediaKind {
  const path = url.split(/[?#]/)[0].toLowerCase();
  if (/\.(png|jpe?g|gif|webp|svg|avif)$/.test(path)) return "image";
  if (/\.(mp4|webm|ogg|mov|m4v)$/.test(path)) return "video";
  if (/\.(mp3|wav|m4a|aac|oga)$/.test(path)) return "audio";
  if (/\.pdf$/.test(path)) return "pdf";
  if (toEmbedUrl(url)) return "embed";
  return fallback;
}

export function formatBytes(bytes?: number | null): string {
  if (!bytes || bytes < 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  const exp = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, exp);
  return `${value.toFixed(exp === 0 ? 0 : 1)} ${units[exp]}`;
}

export function fileExtension(name?: string | null): string {
  const match = (name || "").match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toUpperCase() : "FILE";
}

export function fileNameFromUrl(url: string): string {
  try {
    const last = new URL(url).pathname.split("/").filter(Boolean).pop();
    return last ? decodeURIComponent(last) : url;
  } catch {
    return url;
  }
}

const EMBED_PROVIDERS: Array<{ regex: RegExp; toUrl: (m: RegExpMatchArray) => string }> = [
  {
    regex: /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/i,
    toUrl: (m) => `https://www.youtube.com/embed/${m[1]}`,
  },
  {
    regex: /vimeo\.com\/(?:video\/)?(\d+)/i,
    toUrl: (m) => `https://player.vimeo.com/video/${m[1]}`,
  },
  {
    regex: /loom\.com\/(?:share|embed)\/([\w-]+)/i,
    toUrl: (m) => `https://www.loom.com/embed/${m[1]}`,
  },
  {
    regex: /drive\.google\.com\/file\/d\/([\w-]+)/i,
    toUrl: (m) => `https://drive.google.com/file/d/${m[1]}/preview`,
  },
  {
    regex: /(https:\/\/(?:www\.)?figma\.com\/(?:file|design|proto)\/[^\s]+)/i,
    toUrl: (m) => `https://www.figma.com/embed?embed_host=instincthub&url=${encodeURIComponent(m[1])}`,
  },
  {
    regex: /(https:\/\/codepen\.io\/[\w-]+)\/(?:pen|embed)\/([\w-]+)/i,
    toUrl: (m) => `${m[1]}/embed/${m[2]}?default-tab=result`,
  },
];

/** Convert a known provider URL into its embeddable iframe URL, or null. */
export function toEmbedUrl(url: string): string | null {
  const trimmed = (url || "").trim();
  if (!/^https?:\/\//i.test(trimmed)) return null;
  for (const provider of EMBED_PROVIDERS) {
    const match = trimmed.match(provider.regex);
    if (match) return provider.toUrl(match);
  }
  return null;
}

const EMBED_HOSTS = ["youtube.com", "youtube-nocookie.com", "player.vimeo.com", "loom.com", "drive.google.com", "figma.com", "codepen.io"];

/** Embeds are limited to known providers so pasted HTML can't frame arbitrary sites. */
export function isAllowedEmbed(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);
    if (protocol !== "https:") return false;
    return EMBED_HOSTS.some((host) => hostname === host || hostname.endsWith(`.${host}`));
  } catch {
    return false;
  }
}

/** Accept only plain widths (e.g. "60%", "480px") so the attribute can't inject CSS. */
export function safeWidth(value: unknown): string | null {
  return typeof value === "string" && /^\d{1,4}(px|%)$/.test(value.trim()) ? value.trim() : null;
}

/** Only allow http(s) and site-relative URLs into src/href attributes. */
export function isSafeUrl(url?: string | null): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  const siteRelative = trimmed.startsWith("/") && !trimmed.startsWith("//");
  return /^https?:\/\//i.test(trimmed) || siteRelative || trimmed.startsWith("blob:");
}

/** Provider players need scripts + same-origin; forms and top navigation stay blocked. */
export const EMBED_SANDBOX = "allow-scripts allow-same-origin allow-presentation allow-popups";

/** The src to render for a media block, or "" when it isn't allowed for that kind. */
export function renderableSrc(attrs: { kind: MediaKind; src?: string | null }): string {
  if (!isSafeUrl(attrs.src)) return "";
  const src = (attrs.src as string).trim();
  if (attrs.kind === "embed" && !isAllowedEmbed(src)) return "";
  return src;
}

/**
 * PDFs get an inline viewer only when the URL is really a .pdf (or a local blob).
 * Chrome won't render PDFs in a sandboxed iframe, so this check is what stops a
 * "PDF" block from framing an arbitrary page; other URLs render as a download card.
 */
export function isInlinePdf(src: string): boolean {
  if (src.startsWith("blob:")) return true;
  return /\.pdf$/i.test(src.split(/[?#]/)[0]);
}

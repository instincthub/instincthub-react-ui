const COLOR_PATTERN = /^(#[0-9a-f]{3,8}|rgba?\([\d\s.,%]+\)|hsla?\([\d\s.,%deg]+\)|[a-z]{3,20})$/i;

/** Accept only plain colour values so attributes can't inject extra CSS. */
export function safeColor(value: unknown, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return COLOR_PATTERN.test(trimmed) ? trimmed : fallback;
}

/** Split a style string on ";" outside parentheses and quotes (data: URLs contain ";base64"). */
export function splitDeclarations(style: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let quote: string | null = null;
  let current = "";
  for (const ch of style) {
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") quote = ch;
    else if (ch === "(") depth += 1;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    else if (ch === ";" && depth === 0) {
      if (current.trim()) out.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) out.push(current.trim());
  return out;
}

const BLOCKED_DECLARATION = /expression\s*\(|javascript:|vbscript:|behavior\s*:|-moz-binding|@import/i;
const OVERLAY_POSITION = /^position\s*:\s*(fixed|sticky)/i;
const REMOTE_URL = /url\(\s*(?!['"]?data:image\/)/i;

/**
 * Drop declarations that can run code, pull remote resources (tracking pixels)
 * or pin content over the page (full-screen overlays).
 */
export function sanitizeStyle(style: string | null | undefined): string | null {
  if (!style) return null;
  const cleaned = splitDeclarations(style)
    .filter((decl) => !BLOCKED_DECLARATION.test(decl) && !OVERLAY_POSITION.test(decl) && !REMOTE_URL.test(decl))
    .join(";");
  return cleaned || null;
}

/**
 * Read a declaration from the raw style attribute. Unlike el.style.x this keeps
 * the author's value (hex stays hex) and ignores !important.
 */
export function readStyleValue(el: HTMLElement, property: string): string | null {
  const style = el.getAttribute("style") || "";
  const match = style.match(new RegExp(`(?:^|;)\\s*${property}\\s*:\\s*([^;]+)`, "i"));
  return match ? match[1].replace(/!important/i, "").trim() : null;
}

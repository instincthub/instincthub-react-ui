/**
 * Helpers that upgrade the plain `<pre>` / `<code>` markup rendered by
 * ContentViewer into accessible, click-to-copy code blocks.
 *
 * The markup is injected with `dangerouslySetInnerHTML`, so the copy controls
 * are built as real DOM nodes here and driven through event delegation on the
 * viewer container instead of React event handlers.
 */

export const CODE_COPY_ATTR = "data-ihub-copy";
export const CODE_BLOCK_WRAPPER_CLASS = "ihub-code-block-wrapper";
export const INLINE_COPIED_CLASS = "ihub-inline-copied";
export const COPIED_CLASS = "ihub-copied";
export const CODE_LINE_CLASS = "ihub-code-line";
export const LINE_NUMBERS_CLASS = "ihub-line-numbers";

/** Single-line snippets read better without a gutter */
const MIN_LINES_FOR_NUMBERING = 2;

const COPY_ICON = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="9" y="9" width="12" height="12" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

const CHECK_ICON = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M20 6 9 17l-5-5"></path></svg>`;

const LANGUAGE_CLASS_PATTERN = /(?:language|lang)-([\w+#.-]+)/i;

/** Milliseconds the "Copied!" confirmation stays visible */
export const COPIED_FEEDBACK_MS = 2000;

export type CodeCopyKind = "block" | "inline";

export interface CodeCopyTarget {
  /** Element that should receive the transient "copied" styling */
  element: HTMLElement;
  /** Text that should land on the clipboard */
  text: string;
  kind: CodeCopyKind;
}

interface EnhanceOptions {
  /** Add a toolbar with a copy button above every fenced code block */
  enableBlockCopy?: boolean;
  /** Allow single-line `<code>` snippets to be copied on click */
  enableInlineCopy?: boolean;
  /** Draw a line-number gutter on code blocks with more than one line */
  showLineNumbers?: boolean;
}

/**
 * Read the language of a code block from the `language-*` / `lang-*` class that
 * marked (and most editors) attach to `<pre>` or its inner `<code>`.
 */
export const detectCodeLanguage = (pre: Element): string => {
  const code = pre.querySelector("code");
  const source = `${code?.className || ""} ${pre.className || ""}`;
  const match = source.match(LANGUAGE_CLASS_PATTERN);
  return match ? match[1].toLowerCase() : "code";
};

const buildCopyButton = (doc: Document, language: string): HTMLButtonElement => {
  const button = doc.createElement("button");
  button.type = "button";
  button.className = "ihub-code-copy-btn";
  button.setAttribute(CODE_COPY_ATTR, "block");
  button.setAttribute(
    "aria-label",
    `Copy ${language === "code" ? "" : `${language} `}code to clipboard`.replace(
      /\s+/g,
      " "
    )
  );
  button.innerHTML = `${COPY_ICON}<span class="ihub-code-copy-label">Copy</span>`;
  return button;
};

const buildToolbar = (doc: Document, language: string): HTMLDivElement => {
  const toolbar = doc.createElement("div");
  toolbar.className = "ihub-code-block-toolbar";

  const label = doc.createElement("span");
  label.className = "ihub-code-block-lang";
  label.textContent = language;

  toolbar.appendChild(label);
  toolbar.appendChild(buildCopyButton(doc, language));
  return toolbar;
};

const wrapCodeBlock = (pre: HTMLElement): void => {
  const parent = pre.parentElement;
  if (!parent || parent.classList.contains(CODE_BLOCK_WRAPPER_CLASS)) return;

  const doc = pre.ownerDocument;
  const language = detectCodeLanguage(pre);

  const wrapper = doc.createElement("div");
  wrapper.className = CODE_BLOCK_WRAPPER_CLASS;
  wrapper.setAttribute("data-language", language);

  parent.insertBefore(wrapper, pre);
  wrapper.appendChild(buildToolbar(doc, language));
  wrapper.appendChild(pre);

  // Scrollable regions must be reachable with the keyboard.
  pre.setAttribute("tabindex", "0");
  pre.setAttribute("role", "region");
  pre.setAttribute(
    "aria-label",
    language === "code" ? "Code block" : `${language} code block`
  );
};

/**
 * Split a plain-text code block into one span per line so CSS counters can draw
 * a gutter. The numbers live in a `::before` pseudo-element, so they never enter
 * `textContent` (button copy, PDF export) and `user-select: none` keeps them out
 * of manual selections too.
 *
 * Blocks that already contain markup (syntax highlighting, previously enhanced
 * blocks) are left untouched so nothing is destroyed.
 */
const applyLineNumbers = (pre: HTMLElement): void => {
  const code = pre.querySelector("code") || pre;
  if (code.children.length > 0) return;

  // A trailing newline is an artifact of the fence, not an extra line
  const text = (code.textContent || "").replace(/\n$/, "");
  const lines = text.split("\n");
  if (lines.length < MIN_LINES_FOR_NUMBERING) return;

  const doc = pre.ownerDocument;
  const fragment = doc.createDocumentFragment();

  lines.forEach((line, index) => {
    const span = doc.createElement("span");
    span.className = CODE_LINE_CLASS;
    // Newlines stay inside the text so textContent still reads as real code
    span.textContent = index === lines.length - 1 ? line : `${line}\n`;
    fragment.appendChild(span);
  });

  code.textContent = "";
  code.appendChild(fragment);
  pre.classList.add(LINE_NUMBERS_CLASS);
};

const isInsideLink = (element: Element): boolean =>
  Boolean(element.closest("a"));

const enhanceInlineCode = (code: HTMLElement): void => {
  const text = code.textContent || "";
  if (!text.trim() || isInsideLink(code)) return;

  code.setAttribute(CODE_COPY_ATTR, "inline");
  code.setAttribute("role", "button");
  code.setAttribute("tabindex", "0");
  code.setAttribute("title", "Click to copy");
};

/**
 * Add copy affordances to every code block and inline snippet inside `root`.
 * Safe to call repeatedly — already-enhanced nodes are skipped.
 */
export const enhanceCodeBlocks = (
  root: HTMLElement,
  {
    enableBlockCopy = true,
    enableInlineCopy = true,
    showLineNumbers = true,
  }: EnhanceOptions = {}
): void => {
  if (enableBlockCopy || showLineNumbers) {
    root.querySelectorAll<HTMLElement>("pre").forEach((pre) => {
      if (showLineNumbers) applyLineNumbers(pre);
      if (enableBlockCopy) wrapCodeBlock(pre);
    });
  }

  if (enableInlineCopy) {
    root
      .querySelectorAll<HTMLElement>("code:not(pre code)")
      .forEach((code) => enhanceInlineCode(code));
  }
};

/**
 * Map a click/keyboard event target onto the code that should be copied.
 * Returns null when the event did not originate from a copy affordance.
 */
export const resolveCodeCopyTarget = (
  eventTarget: EventTarget | null
): CodeCopyTarget | null => {
  if (!(eventTarget instanceof Element)) return null;

  const trigger = eventTarget.closest<HTMLElement>(`[${CODE_COPY_ATTR}]`);
  if (!trigger) return null;

  if (trigger.getAttribute(CODE_COPY_ATTR) === "block") {
    const pre = trigger
      .closest(`.${CODE_BLOCK_WRAPPER_CLASS}`)
      ?.querySelector("pre");
    if (!pre) return null;
    return { element: trigger, text: pre.textContent || "", kind: "block" };
  }

  return { element: trigger, text: trigger.textContent || "", kind: "inline" };
};

/**
 * Write text to the clipboard, falling back to a hidden textarea when the
 * async Clipboard API is unavailable (insecure origins, older browsers).
 */
export const copyTextToClipboard = async (text: string): Promise<boolean> => {
  if (!text) return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    console.error("Clipboard API copy failed, falling back:", error);
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch (error) {
    console.error("Failed to copy code to clipboard:", error);
    return false;
  }
};

/**
 * Flip a copy button (or inline snippet) into its confirmation state and
 * restore it afterwards. Returns a cleanup timer id.
 */
export const showCopiedFeedback = (
  target: CodeCopyTarget
): ReturnType<typeof setTimeout> => {
  const { element, kind } = target;

  if (kind === "inline") {
    element.classList.add(INLINE_COPIED_CLASS);
    return setTimeout(() => {
      element.classList.remove(INLINE_COPIED_CLASS);
    }, COPIED_FEEDBACK_MS);
  }

  element.classList.add(COPIED_CLASS);
  element.innerHTML = `${CHECK_ICON}<span class="ihub-code-copy-label">Copied!</span>`;

  return setTimeout(() => {
    element.classList.remove(COPIED_CLASS);
    element.innerHTML = `${COPY_ICON}<span class="ihub-code-copy-label">Copy</span>`;
  }, COPIED_FEEDBACK_MS);
};

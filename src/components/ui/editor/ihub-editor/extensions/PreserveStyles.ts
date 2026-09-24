import { Extension, Node, mergeAttributes } from "@tiptap/core";
import { sanitizeStyle, splitDeclarations } from "./colorUtils";

/**
 * CSS properties already owned by another attribute on the same node/mark.
 * They're dropped from the preserved style so editing (align, colour, cell
 * background) isn't overridden by a stale — often !important — pasted value.
 */
const OWNED_PROPERTIES: Record<string, string[]> = {
  // The table view writes its own min-width from column sizes.
  table: ["min-width"],
  paragraph: ["text-align"],
  heading: ["text-align"],
  textStyle: ["color"],
  highlight: ["background-color"],
  tableCell: ["background-color", "background"],
  tableHeader: ["background-color", "background"],
};

export function stripProperties(style: string | null, properties: string[] = []): string | null {
  if (!style) return null;
  if (!properties.length) return style;
  const kept = splitDeclarations(style).filter((decl) => !properties.includes(decl.split(":")[0].trim().toLowerCase()));
  return kept.length ? kept.join(";") : null;
}

const NODE_TYPES = [
  "paragraph",
  "heading",
  "blockquote",
  "bulletList",
  "orderedList",
  "listItem",
  "horizontalRule",
  "table",
  "tableRow",
  "tableCell",
  "tableHeader",
];
const MARK_TYPES = ["textStyle", "link"];

/** Keeps inline `style` from pasted or loaded HTML (emails, CMS exports). */
export const PreserveStyles = Extension.create({
  name: "preserveStyles",

  addGlobalAttributes() {
    return [...NODE_TYPES, ...MARK_TYPES].map((type) => ({
      types: [type],
      attributes: {
        style: {
          default: null,
          parseHTML: (el: HTMLElement) => sanitizeStyle(el.getAttribute("style")),
          renderHTML: (attrs: Record<string, unknown>) => {
            const style = stripProperties(sanitizeStyle(attrs.style as string), OWNED_PROPERTIES[type]);
            return style ? { style } : {};
          },
        },
      },
    }));
  },
});

/** Generic styled <div> wrapper so layout boxes in pasted HTML survive. */
export const StyledBlock = Node.create({
  name: "styledBlock",
  group: "block",
  content: "block+",
  defining: true,

  addAttributes() {
    return {
      style: {
        default: null,
        parseHTML: (el: HTMLElement) => sanitizeStyle(el.getAttribute("style")),
        // Sanitise on output too: JSON content can set style without parsing HTML.
        renderHTML: (attrs: Record<string, unknown>) => {
          const style = sanitizeStyle(attrs.style as string);
          return style ? { style } : {};
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[style]",
        priority: 40,
        getAttrs: (el: HTMLElement) => {
          if (el.hasAttribute("data-type") || el.hasAttribute("data-youtube-video")) return false;
          if (/\bihub-te-/.test(el.className || "")) return false;
          return sanitizeStyle(el.getAttribute("style")) ? {} : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-styled": "true" }), 0];
  },
});

import { Editor } from "@tiptap/core";
import { buildExtensions } from "../hooks/useIHubEditor";
import type { IHubEditorFeatures } from "../types";

/** Headless editor with the same extension set IHubTextEditor uses. */
export function makeEditor(content: string, features?: IHubEditorFeatures): Editor {
  return new Editor({
    extensions: buildExtensions({ features }),
    content,
  });
}

/** Parse HTML into a DOM for structural assertions. */
export function toDom(html: string): HTMLElement {
  const host = document.createElement("div");
  host.innerHTML = html;
  return host;
}

/** Computed-style style lookup (ProseMirror writes styles via cssText, so values are normalised). */
export function css(el: Element | null, property: string): string {
  return (el as HTMLElement | null)?.style.getPropertyValue(property) ?? "";
}

export function important(el: Element | null, property: string): boolean {
  return (el as HTMLElement | null)?.style.getPropertyPriority(property) === "important";
}

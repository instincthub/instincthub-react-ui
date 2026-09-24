"use client";
import { useEffect } from "react";
import { Editor } from "@tiptap/react";
import { toEmbedUrl } from "../upload/mediaKinds";

interface UseMediaEmbedOptions {
  editor: Editor | null;
  enabled?: boolean;
}

/** Turn a pasted YouTube / Vimeo / Loom / Figma / Drive link into an embed block. */
export default function useMediaEmbed({ editor, enabled = true }: UseMediaEmbedOptions) {
  useEffect(() => {
    if (!editor || !enabled) return;

    const handlePaste = (event: ClipboardEvent) => {
      // Only a bare link: pasted rich HTML should go through the normal parser.
      if (event.clipboardData?.getData("text/html")) return;
      const text = event.clipboardData?.getData("text/plain")?.trim();
      if (!text || /\s/.test(text)) return;
      const src = toEmbedUrl(text);
      if (!src) return;
      event.preventDefault();
      event.stopPropagation();
      editor.chain().focus().setMediaBlock({ kind: "embed", src, name: text }).run();
    };

    // Capture phase so we run before ProseMirror's own paste handling.
    const dom = editor.view.dom;
    dom.addEventListener("paste", handlePaste, { capture: true });
    return () => dom.removeEventListener("paste", handlePaste, { capture: true });
  }, [editor, enabled]);
}

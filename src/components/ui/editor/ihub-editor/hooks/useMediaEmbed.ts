"use client";
import { useEffect } from "react";
import { Editor } from "@tiptap/react";

const YOUTUBE_REGEX =
  /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;

const SUPPORTED_EMBED_PATTERNS = [
  {
    name: "youtube",
    regex: YOUTUBE_REGEX,
    getUrl: (match: RegExpMatchArray) =>
      `https://www.youtube.com/embed/${match[1]}`,
  },
];

interface UseMediaEmbedOptions {
  editor: Editor | null;
  enabled?: boolean;
}

export default function useMediaEmbed({
  editor,
  enabled = true,
}: UseMediaEmbedOptions) {
  useEffect(() => {
    if (!editor || !enabled) return;

    const handlePaste = (_view: any, event: ClipboardEvent) => {
      const text = event.clipboardData?.getData("text/plain")?.trim();
      if (!text) return false;

      // Check if it's a YouTube URL
      const youtubeMatch = text.match(YOUTUBE_REGEX);
      if (youtubeMatch) {
        event.preventDefault();
        editor.commands.setYoutubeVideo({ src: text });
        return true;
      }

      // Check other embed patterns
      for (const pattern of SUPPORTED_EMBED_PATTERNS) {
        if (pattern.name === "youtube") continue; // Already handled above
        const match = text.match(pattern.regex);
        if (match) {
          event.preventDefault();
          (editor.commands as any).setEmbed({
            src: pattern.getUrl(match),
            type: pattern.name,
          });
          return true;
        }
      }

      return false;
    };

    // We attach at the DOM level to intercept before Tiptap's default paste
    const dom = editor.view.dom;
    const handler = (e: Event) => handlePaste(null, e as ClipboardEvent);
    dom.addEventListener("paste", handler, { capture: true });

    return () => {
      dom.removeEventListener("paste", handler, { capture: true });
    };
  }, [editor, enabled]);
}

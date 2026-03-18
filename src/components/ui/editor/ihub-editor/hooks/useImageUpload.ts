"use client";
import { useCallback, useEffect } from "react";
import { Editor } from "@tiptap/react";

interface UseImageUploadOptions {
  editor: Editor | null;
  onImageUpload?: (file: File) => Promise<string>;
  enabled?: boolean;
}

export default function useImageUpload({
  editor,
  onImageUpload,
  enabled = true,
}: UseImageUploadOptions) {
  const insertImage = useCallback(
    async (file: File) => {
      if (!editor || !onImageUpload) return;

      try {
        const url = await onImageUpload(file);
        (editor.commands as any).setImageWithCaption({
          src: url,
          alt: file.name,
          caption: "",
        });
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    },
    [editor, onImageUpload]
  );

  const openFilePicker = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) insertImage(file);
    };
    input.click();
  }, [insertImage]);

  // Handle paste events
  useEffect(() => {
    if (!editor || !enabled || !onImageUpload) return;

    const handlePaste = (view: any, event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return false;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          event.preventDefault();
          const file = item.getAsFile();
          if (file) insertImage(file);
          return true;
        }
      }
      return false;
    };

    const handleDrop = (view: any, event: DragEvent) => {
      const files = event.dataTransfer?.files;
      if (!files?.length) return false;

      const imageFiles = Array.from(files).filter((f) =>
        f.type.startsWith("image/")
      );
      if (imageFiles.length === 0) return false;

      event.preventDefault();
      imageFiles.forEach((file) => insertImage(file));
      return true;
    };

    // Register ProseMirror event handlers
    editor.view.dom.addEventListener("drop", handleDrop as any);

    // Listen for custom insert-image events (from slash commands)
    // Scope to this editor instance by checking the event detail
    const handleInsertImage = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.editor === editor) {
        openFilePicker();
      }
    };
    document.addEventListener(
      "ihub-editor-insert-image",
      handleInsertImage as any
    );

    return () => {
      editor.view.dom.removeEventListener("drop", handleDrop as any);
      document.removeEventListener(
        "ihub-editor-insert-image",
        handleInsertImage as any
      );
    };
  }, [editor, enabled, onImageUpload, insertImage, openFilePicker]);

  return { insertImage, openFilePicker };
}

"use client";
import React, { useState, useCallback } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link,
  Heading2,
  Heading3,
  Quote,
  Code,
  Highlighter,
} from "lucide-react";
import LinkPopover from "./LinkPopover";

interface BubbleToolbarProps {
  editor: Editor;
}

export default function BubbleToolbar({ editor }: BubbleToolbarProps) {
  const [showLinkPopover, setShowLinkPopover] = useState(false);

  const toggleLink = useCallback(() => {
    setShowLinkPopover((prev) => !prev);
  }, []);

  const btnClass = (isActive: boolean) =>
    `ihub-te-bubble-btn${isActive ? " is-active" : ""}`;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{
        duration: 150,
        placement: "top",
        maxWidth: "none",
        onHide: () => setShowLinkPopover(false),
      }}
      className="ihub-te-bubble-menu"
    >
      {showLinkPopover ? (
        <LinkPopover
          editor={editor}
          onClose={() => setShowLinkPopover(false)}
        />
      ) : (
        <div className="ihub-te-bubble-toolbar">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={btnClass(editor.isActive("bold"))}
            title="Bold (⌘B)"
          >
            <Bold size={16} className="ihub-text-white" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={btnClass(editor.isActive("italic"))}
            title="Italic (⌘I)"
          >
            <Italic size={16} className="ihub-text-white" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={btnClass(editor.isActive("underline"))}
            title="Underline (⌘U)"
          >
            <Underline size={16} className="ihub-text-white" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={btnClass(editor.isActive("strike"))}
            title="Strikethrough"
          >
            <Strikethrough size={16} className="ihub-text-white" />
          </button>

          <span className="ihub-te-bubble-divider" />

          <button
            type="button"
            onClick={toggleLink}
            className={btnClass(editor.isActive("link"))}
            title="Link (⌘K)"
          >
            <Link size={16} className="ihub-text-white" />
          </button>

          <span className="ihub-te-bubble-divider" />

          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={btnClass(editor.isActive("heading", { level: 2 }))}
            title="Heading 2"
          >
            <Heading2 size={16} className="ihub-text-white" />
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={btnClass(editor.isActive("heading", { level: 3 }))}
            title="Heading 3"
          >
            <Heading3 size={16} className="ihub-text-white" />
          </button>

          <span className="ihub-te-bubble-divider" />

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={btnClass(editor.isActive("blockquote"))}
            title="Quote"
          >
            <Quote size={16} className="ihub-text-white" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={btnClass(editor.isActive("code"))}
            title="Inline Code"
          >
            <Code size={16} className="ihub-text-white" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={btnClass(editor.isActive("highlight"))}
            title="Highlight"
          >
            <Highlighter size={16} className="ihub-text-white" />
          </button>
        </div>
      )}
    </BubbleMenu>
  );
}

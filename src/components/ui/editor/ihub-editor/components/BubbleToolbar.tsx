"use client";
import React, { useState } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import { NodeSelection } from "@tiptap/pm/state";
import { CellSelection } from "@tiptap/pm/tables";
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
  Baseline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RemoveFormatting,
} from "lucide-react";
import LinkPopover from "./LinkPopover";
import ColorPalette, { HIGHLIGHT_COLORS, TEXT_COLORS } from "./ColorPalette";

interface BubbleToolbarProps {
  editor: Editor;
}

type Panel = "link" | "color" | null;

interface BtnProps {
  title: string;
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

/** mousedown is cancelled so the text selection survives the click. */
function Btn({ title, active = false, onClick, children }: BtnProps) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`ihub-te-bubble-btn${active ? " is-active" : ""}`}
      title={title}
      aria-label={title}
    >
      {children}
    </button>
  );
}

export default function BubbleToolbar({ editor }: BubbleToolbarProps) {
  const [panel, setPanel] = useState<Panel>(null);
  const preventFocusLoss = (e: React.MouseEvent) => e.preventDefault();

  const icon = { size: 16, className: "ihub-text-white" };
  const align = (value: "left" | "center" | "right") => editor.chain().focus().setTextAlign(value).run();

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 150, placement: "top", maxWidth: "none", onHide: () => setPanel(null) }}
      className="ihub-te-bubble-menu"
      shouldShow={({ state, from, to }) => {
        const { selection } = state;
        // Atom blocks (media, buttons) and table cell ranges have their own controls.
        if (from === to || selection instanceof NodeSelection || selection instanceof CellSelection) return false;
        return editor.isEditable && !selection.empty;
      }}
    >
      {panel === "link" ? (
        <LinkPopover editor={editor} onClose={() => setPanel(null)} />
      ) : (
        <div className="ihub-te-bubble-toolbar">
          <Btn title="Bold (⌘B)" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold {...icon} /></Btn>
          <Btn title="Italic (⌘I)" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic {...icon} /></Btn>
          <Btn title="Underline (⌘U)" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><Underline {...icon} /></Btn>
          <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough {...icon} /></Btn>
          <Btn title="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code {...icon} /></Btn>
          <span className="ihub-te-bubble-divider" />
          <Btn title="Link (⌘K)" active={editor.isActive("link")} onClick={() => setPanel("link")}><Link {...icon} /></Btn>
          <Btn title="Text and highlight colour" active={panel === "color"} onClick={() => setPanel(panel === "color" ? null : "color")}><Baseline {...icon} /></Btn>
          <span className="ihub-te-bubble-divider" />
          <Btn title="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 {...icon} /></Btn>
          <Btn title="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 {...icon} /></Btn>
          <Btn title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote {...icon} /></Btn>
          <span className="ihub-te-bubble-divider" />
          <Btn title="Align left" active={editor.isActive({ textAlign: "left" })} onClick={() => align("left")}><AlignLeft {...icon} /></Btn>
          <Btn title="Align centre" active={editor.isActive({ textAlign: "center" })} onClick={() => align("center")}><AlignCenter {...icon} /></Btn>
          <Btn title="Align right" active={editor.isActive({ textAlign: "right" })} onClick={() => align("right")}><AlignRight {...icon} /></Btn>
          <span className="ihub-te-bubble-divider" />
          <Btn title="Clear formatting" onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}><RemoveFormatting {...icon} /></Btn>
          {panel === "color" && (
            <div className="ihub-te-bubble-panel" onMouseDown={preventFocusLoss}>
              <ColorPalette
                label="Text colour"
                colors={TEXT_COLORS}
                value={editor.getAttributes("textStyle").color}
                onChange={(c) => (c ? editor.chain().focus().setColor(c).run() : editor.chain().focus().unsetColor().run())}
              />
              <ColorPalette
                label="Highlight"
                colors={HIGHLIGHT_COLORS}
                value={editor.getAttributes("highlight").color}
                onChange={(c) => (c ? editor.chain().focus().setHighlight({ color: c }).run() : editor.chain().focus().unsetHighlight().run())}
              />
            </div>
          )}
        </div>
      )}
    </BubbleMenu>
  );
}

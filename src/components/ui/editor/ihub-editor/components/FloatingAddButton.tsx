"use client";
import React, { useState, useRef, useCallback } from "react";
import { FloatingMenu, Editor } from "@tiptap/react";
import {
  Plus,
  GripVertical,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  CodeXml,
  ImageIcon,
  TableIcon,
  Minus,
  Youtube,
} from "lucide-react";

interface FloatingAddButtonProps {
  editor: Editor;
  onImageInsert?: () => void;
}

const BLOCK_ITEMS = [
  {
    icon: <Heading2 size={16} />,
    label: "Heading 2",
    action: (editor: Editor) =>
      editor.chain().focus().setHeading({ level: 2 }).run(),
  },
  {
    icon: <Heading3 size={16} />,
    label: "Heading 3",
    action: (editor: Editor) =>
      editor.chain().focus().setHeading({ level: 3 }).run(),
  },
  {
    icon: <List size={16} />,
    label: "Bullet List",
    action: (editor: Editor) =>
      editor.chain().focus().toggleBulletList().run(),
  },
  {
    icon: <ListOrdered size={16} />,
    label: "Numbered List",
    action: (editor: Editor) =>
      editor.chain().focus().toggleOrderedList().run(),
  },
  {
    icon: <ListChecks size={16} />,
    label: "Task List",
    action: (editor: Editor) =>
      editor.chain().focus().toggleTaskList().run(),
  },
  {
    icon: <Quote size={16} />,
    label: "Quote",
    action: (editor: Editor) =>
      editor.chain().focus().toggleBlockquote().run(),
  },
  {
    icon: <CodeXml size={16} />,
    label: "Code Block",
    action: (editor: Editor) =>
      editor.chain().focus().toggleCodeBlock().run(),
  },
  {
    icon: <ImageIcon size={16} />,
    label: "Image",
    action: (_editor: Editor) => {
      document.dispatchEvent(
        new CustomEvent("ihub-editor-insert-image")
      );
    },
  },
  {
    icon: <TableIcon size={16} />,
    label: "Table",
    action: (editor: Editor) =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
  },
  {
    icon: <Minus size={16} />,
    label: "Divider",
    action: (editor: Editor) =>
      editor.chain().focus().setHorizontalRule().run(),
  },
  {
    icon: <Youtube size={16} />,
    label: "YouTube",
    action: (editor: Editor) => {
      const url = prompt("Enter YouTube URL:");
      if (url) editor.commands.setYoutubeVideo({ src: url });
    },
  },
];

export default function FloatingAddButton({
  editor,
}: FloatingAddButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAction = useCallback(
    (action: (editor: Editor) => void) => {
      action(editor);
      setIsExpanded(false);
    },
    [editor]
  );

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{
        duration: 150,
        placement: "left-start",
        offset: [-4, 0],
      }}
      className="ihub-te-floating-wrapper"
      shouldShow={({ state }) => {
        const { $from } = state.selection;
        const isEmptyParagraph =
          $from.parent.type.name === "paragraph" &&
          $from.parent.content.size === 0;
        if (!isEmptyParagraph) return false;

        // Don't show inside tables, lists, or blockquotes
        const depth = $from.depth;
        for (let i = depth; i > 0; i--) {
          const node = $from.node(i);
          const name = node.type.name;
          if (
            name === "tableCell" ||
            name === "tableHeader" ||
            name === "listItem" ||
            name === "taskItem" ||
            name === "blockquote"
          ) {
            return false;
          }
        }

        return true;
      }}
    >
      <div ref={menuRef} className="ihub-te-floating-container">
        <button
          type="button"
          className={`ihub-te-floating-btn${
            isExpanded ? " ihub-te-floating-btn--active" : ""
          }`}
          onClick={() => setIsExpanded((prev) => !prev)}
          title="Add a block"
        >
          <Plus
            size={18}
            strokeWidth={2}
            style={{
              transform: isExpanded ? "rotate(45deg)" : "none",
              transition: "transform 0.2s ease",
            }}
          />
        </button>
        <span className="ihub-te-floating-grip" aria-hidden="true">
          <GripVertical size={14} />
        </span>
        {isExpanded && (
          <div className="ihub-te-floating-menu">
            {BLOCK_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                className="ihub-te-floating-menu-item"
                onClick={() => handleAction(item.action)}
                title={item.label}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </FloatingMenu>
  );
}

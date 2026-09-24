"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { FloatingMenu, Editor } from "@tiptap/react";
import { Plus } from "lucide-react";
import type { SlashCommandItem } from "../types";
import { COMMAND_ICONS } from "./commandIcons";

interface FloatingAddButtonProps {
  editor: Editor;
  commands: SlashCommandItem[];
}

const BLOCKED_PARENTS = ["tableCell", "tableHeader", "listItem", "taskItem", "blockquote", "callout", "sectionBanner", "toggleBlock"];

export default function FloatingAddButton({ editor, commands }: FloatingAddButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleAction = useCallback(
    (item: SlashCommandItem) => {
      item.command({ editor });
      setIsExpanded(false);
    },
    [editor]
  );

  // Close when the caret moves elsewhere.
  useEffect(() => {
    const close = () => setIsExpanded(false);
    editor.on("selectionUpdate", close);
    return () => {
      editor.off("selectionUpdate", close);
    };
  }, [editor]);

  return (
    <FloatingMenu
      editor={editor}
      tippyOptions={{
        duration: 150,
        placement: "left-start",
        offset: [-4, 0],
        onHidden: () => setIsExpanded(false),
      }}
      className="ihub-te-floating-wrapper"
      shouldShow={({ state }) => {
        const { $from, empty } = state.selection;
        if (!empty) return false;
        const isEmptyParagraph = $from.parent.type.name === "paragraph" && $from.parent.content.size === 0;
        if (!isEmptyParagraph) return false;
        for (let depth = $from.depth; depth > 0; depth -= 1) {
          if (BLOCKED_PARENTS.includes($from.node(depth).type.name)) return false;
        }
        return true;
      }}
    >
      <div ref={menuRef} className="ihub-te-floating-container" onMouseDown={(e) => e.preventDefault()}>
        <button
          type="button"
          className={`ihub-te-floating-btn${isExpanded ? " ihub-te-floating-btn--active" : ""}`}
          onClick={() => setIsExpanded((prev) => !prev)}
          title="Add a block"
          aria-expanded={isExpanded}
        >
          <Plus
            size={18}
            strokeWidth={2}
            style={{ transform: isExpanded ? "rotate(45deg)" : "none", transition: "transform 0.2s ease" }}
          />
        </button>
        {isExpanded && (
          <div className="ihub-te-floating-menu" role="menu">
            {commands.map((item) => (
              <button
                key={item.title}
                type="button"
                role="menuitem"
                className="ihub-te-floating-menu-item"
                onClick={() => handleAction(item)}
                title={item.description}
              >
                {COMMAND_ICONS[item.icon]}
                <span>{item.title}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </FloatingMenu>
  );
}

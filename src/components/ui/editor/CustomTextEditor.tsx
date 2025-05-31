"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import CodeBlock from "@tiptap/extension-code-block";
import Highlight from "@tiptap/extension-highlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import MenuBar from "./MenuBar";
import { formatDateToWord } from "../../lib/helpFunction";

interface TextEditorProps {
  label?: string;
  name?: string;
  note?: string;
  onChange?: (html: string) => void;
  setIsEditing?: (html: boolean) => void;
  isEditing?: boolean;
  content?: string;
  charLimit?: number;
  placeholder?: string;
  lastUpdated?: string;
  showPreviewBtn?: boolean;
  required?: boolean;
}

/**
 * CustomTextEditor is a component that allows you to create a text editor with a menu bar and a preview button.
 * It is a wrapper around the Tiptap editor.
 * It is used to create a text editor with a menu bar and a preview button.
 * @example
 * ```tsx
 * <CustomTextEditor
 *  label="Content"
 *  name="content"
 *  onChange={handleChange}
 *  content={content}
 * />
 * ```
 * @param {TextEditorProps} props - The props for the CustomTextEditor component.
 * @param {string} props.label - The label for the editor.
 * @param {string} props.name - The name for the editor.
 * @param {function} props.onChange - The function to call when the editor content changes.
 * @param {string} props.content - The content for the editor.
 * @param {boolean} props.isEditing - Whether the editor is in editing mode.
 * @param {number} props.charLimit - The character limit for the editor.
 * @param {string} props.placeholder - The placeholder for the editor.
 * @param {string} props.lastUpdated - The last updated date for the editor.
 * @param {boolean} props.showPreviewBtn - Whether to show the preview button.
 * @param {string} props.note - The note to display below the editor.
 * @param {function} props.setIsEditing - Function to set the editing state.
 * @param {boolean} props.required - Whether the editor is required.
 * @returns {React.ReactNode} The CustomTextEditor component.
 *
 */

export default function CustomTextEditor({
  label,
  name = "editor-content",
  note,
  onChange,
  setIsEditing,
  content,
  isEditing = false,
  charLimit = 5000,
  placeholder = "Begin writing here...",
  lastUpdated = "",
  showPreviewBtn = false,
  required = false,
}: TextEditorProps) {
  const [newContent, setNewContent] = React.useState(content || "");
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      CodeBlock,
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
      CharacterCount.configure({
        limit: charLimit,
      }),
    ],
    editorProps: {
      attributes: {
        class: "ihub-editor-content",
      },
    },
    content: newContent,
    onUpdate: ({ editor }) => {
      if (onChange) {
        // Call the onChange function with the updated HTML content
        onChange(editor.getHTML());
      }
      setNewContent(editor.getHTML());
    },
  });

  return (
    <div className="ihub-editor">
      {label && <label htmlFor={name}>{label}</label>}
      <MenuBar
        editor={editor}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        showPreviewBtn={showPreviewBtn}
      />
      <EditorContent editor={editor} className="ihub-editor-content-wrapper" required={required} />
      <input type="hidden" value={newContent} name={name} />
      {editor && (
        <div className="ihub-editor-char-count">
          <p>
            {lastUpdated
              ? `Last updated: ${formatDateToWord(lastUpdated)}`
              : ""}
          </p>
          <p>
            {editor.storage.characterCount.words()} words:{"  "}
            {editor.storage.characterCount.characters() / charLimit}/{charLimit}{" "}
            characters
          </p>
        </div>
      )}
      {note && <p className="ihub-editor-note">{note}</p>}
    </div>
  );
}

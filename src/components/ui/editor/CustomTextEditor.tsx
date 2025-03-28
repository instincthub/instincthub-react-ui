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
  onChange: (html: string) => void;
  setIsEditing: (html: boolean) => void;
  isEditing: boolean;
  content: string;
  charLimit?: number;
  placeholder?: string;
  lastUpdated?: string;
  showPreviewBtn?: boolean;
}

export default function CustomTextEditor({
  onChange,
  setIsEditing,
  content,
  isEditing = false,
  charLimit = 5000,
  placeholder = "Begin writing here...",
  lastUpdated = "",
  showPreviewBtn = false,
}: TextEditorProps) {
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
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="ihub-editor">
      <MenuBar
        editor={editor}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        showPreviewBtn={showPreviewBtn}
      />
      <EditorContent editor={editor} className="ihub-editor-content-wrapper" />
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
    </div>
  );
}

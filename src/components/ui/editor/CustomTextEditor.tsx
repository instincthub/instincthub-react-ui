"use client";
import React from "react";
import "../../../assets/css/ui/editor.css";
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

interface TextEditorProps {
  onChange: (html: string) => void;
  content: string;
  charLimit?: number;
  placeholder?: string;
}

export default function CustomTextEditor({
  onChange,
  content,
  charLimit = 5000,
  placeholder = "Begin writing here...",
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
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="ihub-editor-content-wrapper" />
      {editor && (
        <div className="ihub-editor-char-count">
          {editor.storage.characterCount.words()} words:{"  "}
          {editor.storage.characterCount.characters() / charLimit}/{charLimit}{" "}
          characters
        </div>
      )}
    </div>
  );
}

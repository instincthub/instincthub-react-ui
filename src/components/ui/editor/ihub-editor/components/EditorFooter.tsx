"use client";
import React from "react";
import { Editor } from "@tiptap/react";
import { formatDateToWord } from "../../../../lib/helpFunction";

interface EditorFooterProps {
  editor: Editor;
  charLimit: number;
  lastUpdated?: string;
}

export default function EditorFooter({
  editor,
  charLimit,
  lastUpdated,
}: EditorFooterProps) {
  const words = editor.storage.characterCount.words();
  const chars = editor.storage.characterCount.characters();

  return (
    <div className="ihub-te-footer">
      <p className="ihub-te-footer-text">
        {lastUpdated ? `Last updated: ${formatDateToWord(lastUpdated)}` : ""}
      </p>
      <p className="ihub-te-footer-text">
        {words} words &middot; {chars}/{charLimit} characters
      </p>
    </div>
  );
}

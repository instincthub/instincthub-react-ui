"use client";
import React from "react";
import { Editor } from "@tiptap/react";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CodeIcon from "@mui/icons-material/Code";
import TableChartIcon from "@mui/icons-material/TableChart";
import ImageIcon from "@mui/icons-material/Image";
import LinkIcon from "@mui/icons-material/Link";
import HighlightIcon from "@mui/icons-material/Highlight";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import FormatClearIcon from "@mui/icons-material/FormatClear";
import PreviewIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

interface MenuBarProps {
  editor: Editor | null;
  setIsEditing: (html: boolean) => void;
  isEditing: boolean;
  showPreviewBtn?: boolean;
}

const MenuBar: React.FC<MenuBarProps> = ({
  editor,
  setIsEditing,
  isEditing,
  showPreviewBtn = false,
}) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter link URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="ihub-editor-menu">
      {showPreviewBtn ? (
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className={`ihub-editor-btn`}
        >
          {isEditing ? (
            <PreviewIcon fontSize="small" />
          ) : (
            <EditIcon fontSize="small" />
          )}
        </button>
      ) : (
        ""
      )}

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`ihub-editor-btn ${
          editor.isActive("bold") ? "is-active" : ""
        }`}
        title="Bold"
      >
        <FormatBoldIcon fontSize="small" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`ihub-editor-btn ${
          editor.isActive("italic") ? "is-active" : ""
        }`}
        title="Italic"
      >
        <FormatItalicIcon fontSize="small" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`ihub-editor-btn ${
          editor.isActive("strike") ? "is-active" : ""
        }`}
        title="Strike"
      >
        <StrikethroughSIcon fontSize="small" />
      </button>

      <div className="ihub-editor-divider"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`ihub-editor-btn ${
          editor.isActive("heading", { level: 1 }) ? "is-active" : ""
        }`}
        title="Heading 2"
      >
        H1
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`ihub-editor-btn ${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        }`}
        title="Heading 2"
      >
        H2
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`ihub-editor-btn ${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        }`}
        title="Heading 3"
      >
        H3
      </button>

      <div className="ihub-editor-divider"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`ihub-editor-btn ${
          editor.isActive("bulletList") ? "is-active" : ""
        }`}
        title="Bullet List"
      >
        <FormatListBulletedIcon fontSize="small" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`ihub-editor-btn ${
          editor.isActive("orderedList") ? "is-active" : ""
        }`}
        title="Ordered List"
      >
        <FormatListNumberedIcon fontSize="small" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        className={`ihub-editor-btn ${
          editor.isActive("taskList") ? "is-active" : ""
        }`}
        title="Task List"
      >
        <CheckBoxIcon fontSize="small" />
      </button>

      <div className="ihub-editor-divider"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`ihub-editor-btn ${
          editor.isActive("codeBlock") ? "is-active" : ""
        }`}
        title="Code Block"
      >
        <CodeIcon fontSize="small" />
      </button>

      <button
        type="button"
        onClick={setLink}
        className={`ihub-editor-btn ${
          editor.isActive("link") ? "is-active" : ""
        }`}
        title="Link"
      >
        <LinkIcon fontSize="small" />
      </button>

      {/* <button
        type="button"
        onClick={addImage}
        className="ihub-editor-btn"
        title="Image"
      >
        <ImageIcon fontSize="small" />
      </button> */}

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`ihub-editor-btn ${
          editor.isActive("highlight") ? "is-active" : ""
        }`}
        title="Highlight"
      >
        <HighlightIcon fontSize="small" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`ihub-editor-btn ${
          editor.isActive("blockquote") ? "is-active" : ""
        }`}
        title="Blockquote"
      >
        <FormatQuoteIcon fontSize="small" />
      </button>

      <div className="ihub-editor-divider"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="ihub-editor-btn"
        title="Horizontal Rule"
      >
        <HorizontalRuleIcon fontSize="small" />
      </button>

      <button
        type="button"
        onClick={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
        className="ihub-editor-btn"
        title="Insert Table"
      >
        <TableChartIcon fontSize="small" />
      </button>

      <div className="ihub-editor-divider"></div>

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="ihub-editor-btn"
        disabled={!editor.can().undo()}
        title="Undo"
      >
        <UndoIcon fontSize="small" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="ihub-editor-btn"
        disabled={!editor.can().redo()}
        title="Redo"
      >
        <RedoIcon fontSize="small" />
      </button>

      <button
        type="button"
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
        className="ihub-editor-btn"
        title="Clear Formatting"
      >
        <FormatClearIcon fontSize="small" />
      </button>
    </div>
  );
};

export default MenuBar;

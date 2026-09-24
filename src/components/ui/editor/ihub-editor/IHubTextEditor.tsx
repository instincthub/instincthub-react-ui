"use client";
import React, { useState, useMemo, useRef } from "react";
import { EditorContent } from "@tiptap/react";

import { IHubTextEditorProps, DEFAULT_FEATURES } from "./types";
import useIHubEditor from "./hooks/useIHubEditor";
import useSlashCommands from "./hooks/useSlashCommands";
import useMediaEmbed from "./hooks/useMediaEmbed";
import useSurfaceClick from "./hooks/useSurfaceClick";
import BubbleToolbar from "./components/BubbleToolbar";
import SlashCommandMenu from "./components/SlashCommandMenu";
import FloatingAddButton from "./components/FloatingAddButton";
import TableToolbar from "./components/TableToolbar";
import TableControls from "./table/TableControls";
import BlockHandle from "./blocks/BlockHandle";
import EditorFooter from "./components/EditorFooter";
import { commandsForFeatures } from "./constants";
import { canUpload, createUploader, type EditorUploader } from "./upload/uploadFile";

export default function IHubTextEditor({
  name = "editor-content",
  label,
  content = "",
  placeholder = "Tell your story...",
  onChange,
  onBlur,
  required = false,
  charLimit = 50000,
  features: featuresProp,
  onImageUpload,
  onFileUpload,
  upload,
  className = "",
  minHeight = "400px",
  maxHeight = "80vh",
  lastUpdated,
  readOnly = false,
  extensions: additionalExtensions = [],
}: IHubTextEditorProps) {
  const features = useMemo(() => ({ ...DEFAULT_FEATURES, ...featuresProp }), [featuresProp]);
  const [htmlContent, setHtmlContent] = useState(content);
  const areaRef = useRef<HTMLDivElement>(null);
  const slashCommands = useSlashCommands();

  // A ref keeps node views on the latest upload props without rebuilding the editor.
  const uploaderRef = useRef<EditorUploader | null>(null);
  const sources = { onFileUpload, onImageUpload, upload };
  uploaderRef.current = canUpload(sources, "file") || canUpload(sources, "image") ? createUploader(sources) : null;

  const commands = useMemo(() => commandsForFeatures(features), [features]);

  const handleChange = (html: string) => {
    setHtmlContent(html);
    onChange?.(html);
  };

  const editor = useIHubEditor({
    content,
    placeholder,
    charLimit,
    features: featuresProp,
    readOnly,
    onChange: handleChange,
    onBlur,
    additionalExtensions,
    onSlashCommandStart: slashCommands.onStart,
    onSlashCommandExit: slashCommands.onExit,
    uploaderRef,
  });

  useMediaEmbed({ editor, enabled: features.mediaEmbeds && !readOnly });
  const surfaceClick = useSurfaceClick(editor, readOnly);

  const wrapperClass = [
    "ihub-te-wrapper",
    features.focusMode ? "ihub-te-wrapper--focus" : "",
    readOnly ? "ihub-te-wrapper--readonly" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (!editor) return null;

  return (
    <div className={wrapperClass}>
      {label && (
        <label htmlFor={name} className="ihub-te-label">
          {label}
          {required && <span className="ihub-te-required">*</span>}
        </label>
      )}

      <div
        ref={areaRef}
        className="ihub-te-editor-area"
        style={{ minHeight, maxHeight }}
        onMouseDown={surfaceClick.onMouseDown}
        onClick={surfaceClick.onClick}
      >
        {features.bubbleMenu && !readOnly && <BubbleToolbar editor={editor} />}

        {features.floatingAddButton && !readOnly && <FloatingAddButton editor={editor} commands={commands} />}

        {features.slashCommands && slashCommands.isOpen && (
          <SlashCommandMenu
            items={slashCommands.items}
            selectedIndex={slashCommands.selectedIndex}
            onSelect={slashCommands.selectItem}
            clientRect={slashCommands.clientRect}
          />
        )}

        <EditorContent editor={editor} className="ihub-te-content-wrapper" />

        {features.dragHandle && !readOnly && <BlockHandle editor={editor} containerRef={areaRef} />}
        {features.tables && !readOnly && <TableControls editor={editor} containerRef={areaRef} />}
        {features.tables && !readOnly && <TableToolbar editor={editor} />}
      </div>

      <input type="hidden" value={htmlContent} name={name} />

      {features.characterCount && <EditorFooter editor={editor} charLimit={charLimit} lastUpdated={lastUpdated} />}
    </div>
  );
}

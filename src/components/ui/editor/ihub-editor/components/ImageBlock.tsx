"use client";
import React, { useCallback } from "react";
import { AlignLeft, AlignCenter, AlignRight, Trash2 } from "lucide-react";

interface ImageBlockProps {
  src: string;
  alt?: string;
  caption?: string;
  alignment?: string;
  onUpdateCaption?: (caption: string) => void;
  onUpdateAlignment?: (alignment: string) => void;
  onDelete?: () => void;
  selected?: boolean;
}

export default function ImageBlock({
  src,
  alt = "",
  caption = "",
  alignment = "center",
  onUpdateCaption,
  onUpdateAlignment,
  onDelete,
  selected = false,
}: ImageBlockProps) {
  const handleCaptionChange = useCallback(
    (e: React.FormEvent<HTMLElement>) => {
      onUpdateCaption?.(e.currentTarget.textContent || "");
    },
    [onUpdateCaption]
  );

  return (
    <figure
      className={`ihub-te-image-block ihub-te-image-${alignment}${
        selected ? " ihub-te-image-block--selected" : ""
      }`}
    >
      <img src={src} alt={alt} className="ihub-te-image-block-img" />
      {selected && (
        <div className="ihub-te-image-toolbar">
          <button
            type="button"
            onClick={() => onUpdateAlignment?.("left")}
            className={`ihub-te-image-toolbar-btn${
              alignment === "left" ? " is-active" : ""
            }`}
          >
            <AlignLeft size={14} />
          </button>
          <button
            type="button"
            onClick={() => onUpdateAlignment?.("center")}
            className={`ihub-te-image-toolbar-btn${
              alignment === "center" ? " is-active" : ""
            }`}
          >
            <AlignCenter size={14} />
          </button>
          <button
            type="button"
            onClick={() => onUpdateAlignment?.("right")}
            className={`ihub-te-image-toolbar-btn${
              alignment === "right" ? " is-active" : ""
            }`}
          >
            <AlignRight size={14} />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="ihub-te-image-toolbar-btn ihub-te-image-toolbar-btn--danger"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
      <figcaption
        className="ihub-te-image-caption"
        contentEditable
        suppressContentEditableWarning
        onInput={handleCaptionChange}
        data-placeholder="Add a caption..."
      >
        {caption}
      </figcaption>
    </figure>
  );
}

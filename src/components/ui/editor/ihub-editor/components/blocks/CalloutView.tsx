"use client";
import React, { useCallback, useRef, useState } from "react";
import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { Trash2 } from "lucide-react";
import useDismiss from "./useDismiss";
import { CALLOUT_STYLES, type CalloutVariant } from "../../extensions/Callout";

const EMOJIS = ["💡", "📌", "✅", "⚠️", "🚫", "📝", "🔥", "🎯", "📣", "❓", "⭐", "🚀"];

export default function CalloutView({ node, updateAttributes, deleteNode, editor }: NodeViewProps) {
  const [picker, setPicker] = useState(false);
  const pickerRef = useRef<HTMLSpanElement>(null);
  useDismiss(pickerRef, picker, useCallback(() => setPicker(false), []));
  const variant: CalloutVariant = (node.attrs.variant in CALLOUT_STYLES ? node.attrs.variant : "info") as CalloutVariant;
  const style = CALLOUT_STYLES[variant];
  const editable = editor.isEditable;
  const keep = (e: React.MouseEvent) => e.preventDefault();

  return (
    <NodeViewWrapper
      className={`ihub-te-callout ihub-te-callout--${variant} ihub-te-block-shell`}
      data-type="callout"
      style={{ backgroundColor: style.bg, borderLeftColor: style.border }}
    >
      <span ref={pickerRef} contentEditable={false} className="ihub-te-callout-emoji-wrap">
        <button
          type="button"
          className="ihub-te-callout-emoji"
          disabled={!editable}
          onMouseDown={keep}
          onClick={() => setPicker((v) => !v)}
          title="Change icon"
        >
          {node.attrs.emoji || style.emoji}
        </button>
        {picker && editable && (
          <span className="ihub-te-block-popover ihub-te-emoji-picker">
            {EMOJIS.map((emoji) => (
              <button key={emoji} type="button" onMouseDown={keep} onClick={() => { updateAttributes({ emoji }); setPicker(false); }}>
                {emoji}
              </button>
            ))}
          </span>
        )}
      </span>
      <NodeViewContent className="ihub-te-callout-body" />
      {editable && (
        <div className="ihub-te-block-controls" contentEditable={false}>
          {(Object.keys(CALLOUT_STYLES) as CalloutVariant[]).map((v) => (
            <button
              key={v}
              type="button"
              title={v}
              aria-label={`${v} style`}
              className={`ihub-te-variant-dot${v === variant ? " is-active" : ""}`}
              style={{ background: CALLOUT_STYLES[v].border }}
              onMouseDown={keep}
              onClick={() => updateAttributes({ variant: v })}
            />
          ))}
          <button type="button" title="Delete callout" className="is-danger" onMouseDown={keep} onClick={deleteNode}>
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </NodeViewWrapper>
  );
}

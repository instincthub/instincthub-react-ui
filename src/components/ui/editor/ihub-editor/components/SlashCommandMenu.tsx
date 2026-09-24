"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { SlashCommandItem } from "../types";
import { COMMAND_ICONS } from "./commandIcons";

interface SlashCommandMenuProps {
  items: SlashCommandItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  clientRect: (() => DOMRect | null) | null;
}

export default function SlashCommandMenu({
  items,
  selectedIndex,
  onSelect,
  clientRect,
}: SlashCommandMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  const position = useMemo(() => {
    if (!clientRect) return { top: 0, left: 0 };
    const rect = clientRect();
    if (!rect) return { top: 0, left: 0 };
    return {
      top: rect.bottom + 8,
      left: rect.left,
    };
  }, [clientRect]);

  useEffect(() => {
    const selectedEl = menuRef.current?.querySelector(
      `[data-index="${selectedIndex}"]`
    );
    selectedEl?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (items.length === 0) return null;

  return (
    <div
      ref={menuRef}
      className="ihub-te-slash-menu"
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {items.map((item, index) => (
        <button
          key={item.title}
          type="button"
          data-index={index}
          className={`ihub-te-slash-item${
            index === selectedIndex ? " ihub-te-slash-item--selected" : ""
          }`}
          onClick={() => onSelect(index)}
          onMouseDown={(e) => e.preventDefault()}
        >
          <span className="ihub-te-slash-item-icon">
            {COMMAND_ICONS[item.icon] || null}
          </span>
          <span className="ihub-te-slash-item-text">
            <span className="ihub-te-slash-item-title">{item.title}</span>
            <span className="ihub-te-slash-item-desc">{item.description}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

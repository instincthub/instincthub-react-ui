"use client";
import React, { useEffect, useRef, useMemo } from "react";
import {
  Heading2,
  Heading3,
  List,
  ListOrdered,
  ListChecks,
  Quote,
  CodeXml,
  ImageIcon,
  TableIcon,
  Minus,
  Youtube,
  MessageSquareQuote,
} from "lucide-react";
import { SlashCommandItem } from "../types";

const ICON_MAP: Record<string, React.ReactNode> = {
  "heading-2": <Heading2 size={18} />,
  "heading-3": <Heading3 size={18} />,
  list: <List size={18} />,
  "list-ordered": <ListOrdered size={18} />,
  "list-checks": <ListChecks size={18} />,
  quote: <Quote size={18} />,
  "code-xml": <CodeXml size={18} />,
  image: <ImageIcon size={18} />,
  table: <TableIcon size={18} />,
  minus: <Minus size={18} />,
  youtube: <Youtube size={18} />,
  "message-square-quote": <MessageSquareQuote size={18} />,
};

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
          onMouseEnter={() => {}} // Hover handled via CSS
        >
          <span className="ihub-te-slash-item-icon">
            {ICON_MAP[item.icon] || null}
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

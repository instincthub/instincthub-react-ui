"use client";
import React from "react";
import { GripVertical } from "lucide-react";

interface DragHandleProps {
  visible?: boolean;
}

export default function DragHandle({ visible = false }: DragHandleProps) {
  if (!visible) return null;

  return (
    <div className="ihub-te-drag-handle" draggable contentEditable={false}>
      <GripVertical size={16} />
    </div>
  );
}

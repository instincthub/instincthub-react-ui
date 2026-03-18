"use client";
import { useState, useCallback, useEffect } from "react";
import { SlashCommandItem } from "../types";

interface SlashCommandState {
  isOpen: boolean;
  items: SlashCommandItem[];
  selectedIndex: number;
  command: ((props: any) => void) | null;
  range: any;
  editor: any;
  clientRect: (() => DOMRect | null) | null;
}

const INITIAL_STATE: SlashCommandState = {
  isOpen: false,
  items: [],
  selectedIndex: 0,
  command: null,
  range: null,
  editor: null,
  clientRect: null,
};

export default function useSlashCommands() {
  const [state, setState] = useState<SlashCommandState>(INITIAL_STATE);

  const onStart = useCallback((props: any) => {
    setState({
      isOpen: true,
      items: props.items || [],
      selectedIndex: 0,
      command: props.command,
      range: props.range,
      editor: props.editor,
      clientRect: props.clientRect,
    });
  }, []);

  const onExit = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const selectItem = useCallback(
    (index: number) => {
      const item = state.items[index];
      if (item && state.command) {
        state.command(item);
      }
      setState(INITIAL_STATE);
    },
    [state.items, state.command]
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!state.isOpen) return false;

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setState((prev) => ({
          ...prev,
          selectedIndex:
            (prev.selectedIndex - 1 + prev.items.length) % prev.items.length,
        }));
        return true;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setState((prev) => ({
          ...prev,
          selectedIndex: (prev.selectedIndex + 1) % prev.items.length,
        }));
        return true;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        selectItem(state.selectedIndex);
        return true;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onExit();
        return true;
      }

      return false;
    },
    [state.isOpen, state.selectedIndex, state.items.length, selectItem, onExit]
  );

  useEffect(() => {
    if (state.isOpen) {
      const handler = (e: KeyboardEvent) => onKeyDown(e);
      document.addEventListener("keydown", handler, true);
      return () => document.removeEventListener("keydown", handler, true);
    }
  }, [state.isOpen, onKeyDown]);

  return {
    isOpen: state.isOpen,
    items: state.items,
    selectedIndex: state.selectedIndex,
    clientRect: state.clientRect,
    onStart,
    onExit,
    selectItem,
  };
}

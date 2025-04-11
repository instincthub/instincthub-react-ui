// Main export file for the InstinctHub Cursor Library

// Components
export { default as Cursor } from './Cursor';
export { default as MagneticButton } from './MagneticButton';
export { CursorProvider, useCursor, withCursorEffect } from './CursorContext';

// Hooks
export { default as useCursorInteraction } from './useCursorInteraction';

// Demo
export { default as CursorControlDemo } from './CursorControlDemo';

// Types
export type { CursorProps } from './Cursor';
export type { MagneticButtonProps } from './MagneticButton';
export type { UseCursorInteractionOptions, UseCursorInteractionReturn } from './useCursorInteraction';

// Constants
export const CURSOR_TYPES = {
  DEFAULT: 'default',
  POINTER: 'pointer',
  TEXT: 'text',
  LOADING: 'loading',
  DRAGGABLE: 'draggable',
  NOT_ALLOWED: 'not-allowed'
} as const;

// Helper to add cursor classes
export const addCursorClass = (className: string): void => {
  document.body.classList.add(className);
};

// Helper to remove cursor classes
export const removeCursorClass = (className: string): void => {
  document.body.classList.remove(className);
};

// Helper to hide default cursor
export const hideDefaultCursor = (): void => {
  document.body.classList.add('ihub-cursor-hidden');
};

// Helper to show default cursor
export const showDefaultCursor = (): void => {
  document.body.classList.remove('ihub-cursor-hidden');
};
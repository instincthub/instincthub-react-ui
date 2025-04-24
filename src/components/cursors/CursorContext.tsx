"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CursorType =
  | "default"
  | "pointer"
  | "text"
  | "loading"
  | "draggable"
  | "not-allowed";

interface CursorContextProps {
  /**
   * Current cursor type
   */
  cursorType: CursorType;

  /**
   * Update the cursor type
   */
  setCursorType: (type: CursorType) => void;

  /**
   * Add a custom class to the cursor
   */
  addCursorClass: (className: string) => void;

  /**
   * Remove a custom class from the cursor
   */
  removeCursorClass: (className: string) => void;

  /**
   * Toggle cursor visibility
   */
  toggleCursorVisibility: (isVisible: boolean) => void;

  /**
   * Whether the cursor is currently visible
   */
  isCursorVisible: boolean;
}

// Create the cursor context
const CursorContext = createContext<CursorContextProps | undefined>(undefined);

interface CursorProviderProps {
  /**
   * Children components
   */
  children: ReactNode;

  /**
   * Whether to enable cursor tracking
   * @default true
   */
  enabled?: boolean;
}

/**
 * Provider component for cursor context
 */
export function CursorProvider({
  children,
  enabled = true,
}: CursorProviderProps) {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [customClasses, setCustomClasses] = useState<string[]>([]);
  const [isCursorVisible, setIsCursorVisible] = useState<boolean>(true);

  // Add custom class to cursor
  const addCursorClass = (className: string) => {
    setCustomClasses((prev) => {
      if (!prev.includes(className)) {
        return [...prev, className];
      }
      return prev;
    });
  };

  // Remove custom class from cursor
  const removeCursorClass = (className: string) => {
    setCustomClasses((prev) => prev.filter((c) => c !== className));
  };

  // Toggle cursor visibility
  const toggleCursorVisibility = (isVisible: boolean) => {
    setIsCursorVisible(isVisible);
  };

  // Apply cursor type class to body
  useEffect(() => {
    if (!enabled) return;

    // Remove all cursor type classes
    document.body.classList.remove(
      "ihub-cursor-default",
      "ihub-cursor-pointer",
      "ihub-cursor-text",
      "ihub-cursor-loading",
      "ihub-cursor-draggable",
      "ihub-cursor-not-allowed"
    );

    // Add current cursor type class
    document.body.classList.add(`ihub-cursor-${cursorType}`);

    // Add or remove custom classes
    customClasses.forEach((className) => {
      document.body.classList.add(className);
    });

    // Add or remove cursor visibility class
    if (isCursorVisible) {
      document.body.classList.remove("ihub-cursor-hidden");
    } else {
      document.body.classList.add("ihub-cursor-hidden");
    }

    return () => {
      // Clean up all cursor classes
      document.body.classList.remove(
        "ihub-cursor-default",
        "ihub-cursor-pointer",
        "ihub-cursor-text",
        "ihub-cursor-loading",
        "ihub-cursor-draggable",
        "ihub-cursor-not-allowed",
        "ihub-cursor-hidden",
        ...customClasses
      );
    };
  }, [cursorType, customClasses, isCursorVisible, enabled]);

  // The context value
  const value = {
    cursorType,
    setCursorType,
    addCursorClass,
    removeCursorClass,
    toggleCursorVisibility,
    isCursorVisible,
  };

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

/**
 * Hook to use cursor context
 */
export const useCursor = (): CursorContextProps => {
  const context = useContext(CursorContext);

  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }

  return context;
};

/**
 * HOC to add cursor hover effect to any component
 */
interface WithCursorEffectProps {
  Component: any;
  cursorType: CursorType;
}
export function withCursorEffect({
  Component,
  cursorType,
}: WithCursorEffectProps) {
  const WithCursorEffect = (props: any) => {
    const { setCursorType } = useCursor();

    return (
      <div
        onMouseEnter={() => setCursorType(cursorType)}
        onMouseLeave={() => setCursorType("default")}
      >
        <Component {...props} />
      </div>
    );
  };

  return WithCursorEffect;
}

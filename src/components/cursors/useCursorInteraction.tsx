import { useRef, useEffect, useState, RefObject } from "react";

export interface UseCursorInteractionOptions {
  /**
   * Whether the element should have magnetic effect
   * @default false
   */
  magnetic?: boolean;

  /**
   * Strength of the magnetic effect (higher = stronger)
   * @default 0.3
   */
  magneticStrength?: number;

  /**
   * Whether to highlight the element on hover
   * @default false
   */
  highlight?: boolean;

  /**
   * Whether to apply glow effect on hover
   * @default false
   */
  glow?: boolean;

  /**
   * Custom cursor type to apply on hover
   */
  cursorType?:
    | "default"
    | "pointer"
    | "text"
    | "loading"
    | "draggable"
    | "not-allowed";

  /**
   * Whether to enable click ripple effect
   * @default false
   */
  ripple?: boolean;

  /**
   * Element to apply the effects to (defaults to the returned ref)
   */
  targetElement?: HTMLElement | null;
}

export interface UseCursorInteractionReturn<T extends HTMLElement> {
  /**
   * Ref to attach to the element
   */
  ref: RefObject<T>;

  /**
   * Whether the element is currently being hovered
   */
  isHovered: boolean;

  /**
   * Whether the element is currently being clicked
   */
  isClicked: boolean;

  /**
   * Handler to attach the magnetic effect manually
   */
  attachMagneticEffect: (element: HTMLElement) => () => void;

  /**
   * Handler to attach ripple effect manually
   */
  createRippleEffect: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Hook to add cursor interaction effects to elements
 */
function useCursorInteraction<T extends HTMLElement = HTMLDivElement>({
  magnetic = false,
  magneticStrength = 0.3,
  highlight = false,
  glow = false,
  cursorType,
  ripple = false,
  targetElement = null,
}: UseCursorInteractionOptions = {}): UseCursorInteractionReturn<T> {
  const ref = useRef<T>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Create ripple effect
  const createRippleEffect = (e: React.MouseEvent<HTMLElement>) => {
    if (!ripple) return;

    const element = e.currentTarget;
    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rippleTag = document.createElement("span");
    rippleTag.classList.add("ihub-ripple-effect");
    rippleTag.style.left = `${x}px`;
    rippleTag.style.top = `${y}px`;

    element.appendChild(rippleTag);

    setTimeout(() => {
      rippleTag.remove();
    }, 600);
  };

  // Attach magnetic effect to an element
  const attachMagneticEffect = (element: HTMLElement) => {
    if (!magnetic) return () => {};

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const maxDistance = Math.max(rect.width, rect.height) * 1.5;

      if (distance < maxDistance) {
        const x = distanceX * magneticStrength;
        const y = distanceY * magneticStrength;

        element.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        element.style.transform = "translate(0, 0)";
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0, 0)";
      element.style.transition =
        "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)";

      // Reset transition after animation completes
      setTimeout(() => {
        element.style.transition = "";
      }, 500);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.style.transform = "translate(0, 0)";
    };
  };

  // Apply effects based on options
  useEffect(() => {
    const element = targetElement || ref.current;
    if (!element) return;

    // Apply cursor type class
    if (cursorType) {
      element.dataset.cursorType = cursorType;
    }

    // Apply highlight effect
    if (highlight) {
      element.classList.add("ihub-cursor-highlight");
    }

    // Apply glow effect
    if (glow) {
      element.classList.add("ihub-cursor-glow");
    }

    // Setup event listeners
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousedown", handleMouseDown);
    element.addEventListener("mouseup", handleMouseUp);

    // Attach magnetic effect if enabled
    const detachMagnetic = magnetic ? attachMagneticEffect(element) : null;

    // Cleanup
    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousedown", handleMouseDown);
      element.removeEventListener("mouseup", handleMouseUp);

      if (detachMagnetic) detachMagnetic();

      if (cursorType) {
        delete element.dataset.cursorType;
      }

      if (highlight) {
        element.classList.remove("ihub-cursor-highlight");
      }

      if (glow) {
        element.classList.remove("ihub-cursor-glow");
      }
    };
  }, [
    magnetic,
    magneticStrength,
    highlight,
    glow,
    cursorType,
    ripple,
    targetElement,
  ]);

  return {
    ref,
    isHovered,
    isClicked,
    attachMagneticEffect,
    createRippleEffect,
  };
}

export default useCursorInteraction;

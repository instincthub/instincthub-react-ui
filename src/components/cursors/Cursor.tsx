import React, { useState, useEffect, useRef } from 'react';

export interface CursorProps {
  /**
   * Color of the cursor
   * @default 'var(--DarkCyan)'
   */
  color?: string;
  
  /**
   * Size of the main cursor in pixels
   * @default 10
   */
  size?: number;
  
  /**
   * Size of the trailing cursor in pixels
   * @default 30
   */
  trailingSize?: number;
  
  /**
   * Duration of the trailing effect in milliseconds
   * @default 200
   */
  trailingDuration?: number;
  
  /**
   * Whether to hide the default cursor
   * @default true
   */
  hideDefaultCursor?: boolean;
  
  /**
   * Whether to activate click animation
   * @default true
   */
  clickEffect?: boolean;
}

/**
 * Custom cursor component with trailing effect and click animation
 */
const Cursor: React.FC<CursorProps> = ({
  color = 'var(--DarkCyan)',
  size = 10,
  trailingSize = 30,
  trailingDuration = 200,
  hideDefaultCursor = true,
  clickEffect = true
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailingPosition, setTrailingPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (hideDefaultCursor) {
      document.body.classList.add('ihub-cursor-hidden');
    }
    
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      setTimeout(() => {
        setTrailingPosition({ x: e.clientX, y: e.clientY });
      }, trailingDuration);
      
      if (!isVisible) {
        setIsVisible(true);
      }
    };
    
    const onMouseDown = () => {
      if (clickEffect) {
        setIsClicking(true);
      }
    };
    
    const onMouseUp = () => {
      if (clickEffect) {
        setIsClicking(false);
      }
    };
    
    const onMouseLeave = () => {
      setIsVisible(false);
    };
    
    const onMouseEnter = () => {
      setIsVisible(true);
    };
    
    // Check if hovering over clickable elements
    const checkIfPointer = () => {
      const elements = document.querySelectorAll('a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      
      const observer = new MutationObserver(() => {
        window.requestAnimationFrame(() => {
          const element = document.elementFromPoint(position.x, position.y);
          if (!element) return;
          
          const isClickable = Array.from(elements).some(el => el.contains(element) || element === el);
          setIsPointer(isClickable);
        });
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
      
      return () => observer.disconnect();
    };
    
    const pointerObserver = checkIfPointer();
    
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('ihub-cursor-hidden');
      pointerObserver();
    };
  }, [hideDefaultCursor, isVisible, position.x, position.y, trailingDuration, clickEffect]);
  
  const mainCursorStyle: React.CSSProperties = {
    position: 'fixed',
    width: `${isClicking ? size * 0.8 : size}px`,
    height: `${isClicking ? size * 0.8 : size}px`,
    borderRadius: '50%',
    backgroundColor: color,
    pointerEvents: 'none',
    zIndex: 9999,
    transform: `translate(${position.x - size / 2}px, ${position.y - size / 2}px)`,
    opacity: isVisible ? 1 : 0,
    transition: 'width 0.2s, height 0.2s, opacity 0.2s',
    mixBlendMode: 'difference',
  };
  
  const trailingCursorStyle: React.CSSProperties = {
    position: 'fixed',
    width: `${isClicking ? trailingSize * 1.2 : trailingSize}px`,
    height: `${isClicking ? trailingSize * 1.2 : trailingSize}px`,
    borderRadius: '50%',
    border: `1px solid ${color}`,
    pointerEvents: 'none',
    zIndex: 9998,
    transform: `translate(${trailingPosition.x - trailingSize / 2}px, ${trailingPosition.y - trailingSize / 2}px)`,
    opacity: isVisible ? 0.5 : 0,
    transition: `transform ${trailingDuration}ms ease, width 0.3s, height 0.3s, opacity 0.3s`,
  };
  
  if (isPointer) {
    mainCursorStyle.width = `${size * 0.5}px`;
    mainCursorStyle.height = `${size * 0.5}px`;
    mainCursorStyle.border = `2px solid ${color}`;
    mainCursorStyle.backgroundColor = 'transparent';
    
    trailingCursorStyle.width = `${trailingSize * 0.5}px`;
    trailingCursorStyle.height = `${trailingSize * 0.5}px`;
  }
  
  return (
    <>
      <div ref={cursorRef} style={mainCursorStyle} />
      <div ref={trailingRef} style={trailingCursorStyle} />
    </>
  );
};

export default Cursor;
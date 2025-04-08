import React, { useState, useRef, useEffect } from 'react';

export interface MagneticButtonProps {
  /**
   * Button content
   */
  children: React.ReactNode;
  
  /**
   * Optional CSS class names
   */
  className?: string;
  
  /**
   * Distance factor for magnetic effect (higher = stronger)
   * @default 0.5
   */
  distanceFactor?: number;
  
  /**
   * Button type attribute
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  
  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Additional button props
   */
  [key: string]: any;
}

/**
 * A button component with magnetic cursor effect
 */
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  distanceFactor = 0.5,
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || disabled) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) * distanceFactor;
    const y = (e.clientY - centerY) * distanceFactor;
    
    setPosition({ x, y });
  };
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };
  
  const buttonStyle: React.CSSProperties = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    transition: position.x === 0 && position.y === 0 ? 'transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)' : 'none',
  };
  
  // Ensure a smooth return to original position when component unmounts
  useEffect(() => {
    return () => {
      setPosition({ x: 0, y: 0 });
    };
  }, []);
  
  return (
    <button
      ref={buttonRef}
      className={`ihub-magnetic-button ${className}`}
      style={buttonStyle}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default MagneticButton;
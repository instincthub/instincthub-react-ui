"use client";
import React from "react";
import { useState, useEffect, ReactNode } from "react";

export interface AnimatedBoxProps {
  isVisible?: boolean;
  animation?: 'fade' | 'slideDown' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'fadeInLeft' | 'fadeInRight' | 'fadeInUp' | 'fadeInDown' | 'zoomIn' | 'zoomOut';
  duration?: number;
  delay?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'bounce';
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}

// Define component as a Functional Component (FC)
function AnimatedBox({ 
  isVisible = true,
  animation = 'fade',
  duration = 300,
  delay = 0,
  easing = 'ease-in-out',
  className = '',
  children,
  style = {}
}: AnimatedBoxProps) {
  const [animationClass, setAnimationClass] = useState<string>("");
  const [shouldRender, setShouldRender] = useState<boolean>(isVisible);

  // Add animation class when the component mounts or visibility changes
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setAnimationClass("animate");
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setAnimationClass("");
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay, duration]);

  const getAnimationStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: `all ${duration}ms ${easing}`,
      transitionDelay: `${delay}ms`,
    };

    if (!isVisible || !animationClass) {
      switch (animation) {
        case 'fade':
          return { ...baseStyles, opacity: 0 };
        case 'slideDown':
          return { ...baseStyles, opacity: 0, transform: 'translateY(-20px)' };
        case 'slideUp':
          return { ...baseStyles, opacity: 0, transform: 'translateY(20px)' };
        case 'slideLeft':
          return { ...baseStyles, opacity: 0, transform: 'translateX(20px)' };
        case 'slideRight':
          return { ...baseStyles, opacity: 0, transform: 'translateX(-20px)' };
        case 'scale':
          return { ...baseStyles, opacity: 0, transform: 'scale(0.8)' };
        case 'fadeInLeft':
          return { ...baseStyles, opacity: 0, transform: 'translateX(-30px)' };
        case 'fadeInRight':
          return { ...baseStyles, opacity: 0, transform: 'translateX(30px)' };
        case 'fadeInUp':
          return { ...baseStyles, opacity: 0, transform: 'translateY(30px)' };
        case 'fadeInDown':
          return { ...baseStyles, opacity: 0, transform: 'translateY(-30px)' };
        case 'zoomIn':
          return { ...baseStyles, opacity: 0, transform: 'scale(0.3)' };
        case 'zoomOut':
          return { ...baseStyles, opacity: 0, transform: 'scale(1.3)' };
        default:
          return { ...baseStyles, opacity: 0 };
      }
    }

    return {
      ...baseStyles,
      opacity: 1,
      transform: 'translateX(0) translateY(0) scale(1)',
    };
  };

  if (!shouldRender && !isVisible) {
    return null;
  }

  return (
    <div
      className={`animated-box ${className} ${animationClass}`}
      style={{
        ...getAnimationStyles(),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default AnimatedBox;

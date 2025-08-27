"use client";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import HelpIcon from "@mui/icons-material/Help";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from "@mui/icons-material/Pending";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/icons-material/Autorenew";
import { IconSize, StatusIconProps } from "@/types";


/**
 * StatusIcon component - A versatile status indicator with multiple icon types and customization options
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <StatusIcon status="success" />
 * <StatusIcon status="error" />
 * 
 * // With custom size and animation
 * <StatusIcon status="loading" size="large" animated />
 * 
 * // With click handler
 * <StatusIcon 
 *   status="warning" 
 *   onClick={() => console.log('Warning clicked')}
 *   title="Click for more info"
 * />
 * ```
 */
const StatusIcon: React.FC<StatusIconProps> = ({
  status,
  size = "small",
  className = "",
  color,
  animated = false,
  title,
  onClick,
  style,
}) => {
  // Base classes for consistent styling
  const baseClasses = "ihub-status-icon";
  const sizeClass = `ihub-icon-${size}`;
  const clickableClass = onClick ? "ihub-clickable" : "";
  const animatedClass = animated ? "ihub-animated" : "";
  
  const combinedClassName = [
    baseClasses,
    sizeClass,
    clickableClass,
    animatedClass,
    className
  ].filter(Boolean).join(" ");

  // Get icon component and default styling based on status
  const getIconConfig = () => {
    switch (status) {
      case "success":
        return {
          Icon: CheckCircleIcon,
          defaultClasses: "ihub-text-success text-green-600",
          defaultColor: "#4CAF50"
        };
      
      case "error":
        return {
          Icon: ErrorIcon,
          defaultClasses: "ihub-text-danger text-red-600", 
          defaultColor: "#F44336"
        };
      
      case "warning":
        return {
          Icon: WarningIcon,
          defaultClasses: "ihub-text-warning text-yellow-600",
          defaultColor: "#FF9800"
        };
      
      case "info":
        return {
          Icon: InfoIcon,
          defaultClasses: "ihub-text-info text-blue-600",
          defaultColor: "#2196F3"
        };
      
      case "pending":
        return {
          Icon: PendingIcon,
          defaultClasses: "ihub-text-pending text-orange-500",
          defaultColor: "#FF5722"
        };
      
      case "loading":
        return {
          Icon: CircularProgress,
          defaultClasses: "ihub-text-loading text-blue-500",
          defaultColor: "#2196F3"
        };
      
      case "question":
        return {
          Icon: HelpIcon,
          defaultClasses: "ihub-text-question text-purple-600",
          defaultColor: "#9C27B0"
        };
      
      case "check":
        return {
          Icon: CheckIcon,
          defaultClasses: "ihub-text-check text-green-500",
          defaultColor: "#4CAF50"
        };
      
      case "close":
        return {
          Icon: CloseIcon,
          defaultClasses: "ihub-text-close text-red-500",
          defaultColor: "#F44336"
        };
      
      default:
        return {
          Icon: InfoIcon,
          defaultClasses: "ihub-text-default text-gray-600",
          defaultColor: "#757575"
        };
    }
  };

  const { Icon, defaultClasses, defaultColor } = getIconConfig();

  // Combine styles
  const iconStyle = {
    color: color || defaultColor,
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s ease-in-out',
    ...style,
  };

  // Handle click
  const handleClick = (event: React.MouseEvent) => {
    if (onClick) {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    }
  };

  // Handle keyboard navigation for accessibility
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <Icon
      className={`${combinedClassName} ${defaultClasses}`}
      fontSize={size as "inherit" | "small" | "medium" | "large"}
      style={iconStyle}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyPress : undefined}
      titleAccess={title}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? "button" : undefined}
      aria-label={title || `${status} status icon`}
    />
  );
};

/**
 * Backward compatibility function - maintains the original API
 * @deprecated Use StatusIcon component instead
 */
export const GetSuccessFailedIcon = (success: boolean, size: IconSize = "small") => {
  return (
    <StatusIcon
      status={success ? "success" : "error"}
      size={size}
    />
  );
};

export default StatusIcon;
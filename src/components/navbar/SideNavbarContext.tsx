"use client";

import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { SideNavContextProps } from "../../types/navbar";

// Create the context with default values
const SideNavContext = createContext<SideNavContextProps>({
  isExpanded: true,
  toggleExpanded: () => {},
  setExpanded: () => {},
  isMobile: false,
  activeItemId: null,
  setActiveItem: () => {},
  expandedGroups: new Set(),
  toggleGroup: () => {},
  darkMode: false,
  sidebarWidth: 240,
  updateSidebarWidth: () => {},
});

// Provider props type
interface SideNavProviderProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  persistStateKey?: string;
  darkMode?: boolean;
  defaultWidth?: number | string;
}

// Provider component
export const SideNavProvider: React.FC<SideNavProviderProps> = ({
  children,
  defaultExpanded = true,
  persistStateKey = "ihub-sidenav-expanded",
  darkMode = false,
  defaultWidth = 240,
}) => {
  // Initialize expanded state, potentially from localStorage
  const [isExpanded, setIsExpandedState] = useState(() => {
    if (typeof window !== "undefined" && persistStateKey) {
      const savedState = localStorage.getItem(persistStateKey);
      return savedState !== null ? savedState === "true" : defaultExpanded;
    }
    return defaultExpanded;
  });

  // Track active item ID
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  
  // Track expanded groups
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  
  // Track if on mobile
  const [isMobile, setIsMobile] = useState(false);

  // Track sidebar width
  const [sidebarWidth, setSidebarWidth] = useState<number | string>(
    isExpanded ? defaultWidth : (typeof defaultWidth === 'number' ? 64 : '64px')
  );

  // Update localStorage when expanded state changes
  const setExpanded = useCallback((expanded: boolean) => {
    setIsExpandedState(expanded);
    if (typeof window !== "undefined" && persistStateKey) {
      localStorage.setItem(persistStateKey, String(expanded));
    }
  }, [persistStateKey]);

  // Toggle expanded state
  const toggleExpanded = useCallback(() => {
    setExpanded(!isExpanded);
  }, [isExpanded, setExpanded]);

  // Set active item
  const setActiveItem = useCallback((id: string) => {
    setActiveItemId(id);
  }, []);

  // Toggle group expansion
  const toggleGroup = useCallback((id: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  // Update sidebar width
  const updateSidebarWidth = useCallback((width: number | string) => {
    setSidebarWidth(width);
  }, []);

  // Check if on mobile device
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Set initial value
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update width when expanded state changes
  useEffect(() => {
    if (!isExpanded) {
      setSidebarWidth(typeof defaultWidth === 'number' ? 64 : '64px');
    } else {
      setSidebarWidth(defaultWidth);
    }
  }, [isExpanded, defaultWidth]);

  // Context value
  const contextValue: SideNavContextProps = {
    isExpanded,
    toggleExpanded,
    setExpanded,
    isMobile,
    activeItemId,
    setActiveItem,
    expandedGroups,
    toggleGroup,
    darkMode,
    sidebarWidth,
    updateSidebarWidth,
  };

  return (
    <SideNavContext.Provider value={contextValue}>
      {children}
    </SideNavContext.Provider>
  );
};

// Custom hook to use the sidebar context
export const useSideNav = () => useContext(SideNavContext);

export default SideNavContext;
"use client";

import React, { useState, useEffect, ReactNode } from "react";

interface VerticalTabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

interface VerticalTabsProps {
  items: VerticalTabItem[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  tabsContainerClassName?: string;
  contentClassName?: string;
}

/**
 * Vertical Tab component for InstinctHub
 * @compnent
 * @example
 * ```tsx
 *
 * <VerticalTabs
 *   items={[
 *     { id: 1, label: "Tab 1", content: <div>Content 1</div> },
 *     { id: 2, label: "Tab 2", content: <div>Content 2</div> },
 *     { id: 3, label: "Tab 3", content: <div>Content 3</div> },
 *   ]}
 *   defaultActiveTab={1}
 *   onChange={(tabId) => {
 *     console.log(tabId);
 *   }}
 * />
 * ``` 
 * Props interface for the VerticalTabsProps interface
 * @param items Array of tab items containing id, label, content, and optional icon
 * @param defaultActiveTab ID of the tab that should be active by default
 * @param onChange Callback function that fires when a tab is changed
 * @param className Additional classes for the main container
 * @param tabsContainerClassName Additional classes for the tabs sidebar container
 * @param contentClassName Additional classes for the content container
 */
const VerticalTabs: React.FC<VerticalTabsProps> = ({
  items,
  defaultActiveTab,
  onChange,
  className = "",
  tabsContainerClassName = "",
  contentClassName = "",
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    defaultActiveTab || (items.length > 0 ? items[0].id : "")
  );

  useEffect(() => {
    if (defaultActiveTab) {
      setActiveTab(defaultActiveTab);
    }
  }, [defaultActiveTab]);

  const handleTabClick = (tabId: string) => {
    if (items.find(item => item.id === tabId)?.disabled) {
      return;
    }
    
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  const getTabItemClass = (tabId: string, disabled?: boolean) => {
    const baseClass = "ihub-vtab-item";
    const activeClass = tabId === activeTab ? "ihub-vtab-active" : "";
    const disabledClass = disabled ? "ihub-vtab-disabled" : "";
    
    return `${baseClass} ${activeClass} ${disabledClass}`;
  };

  return (
    <div className={`ihub-vtabs-container ${className}`}>
      <div className={`ihub-vtabs-sidebar ${tabsContainerClassName}`}>
        {items.map((tab) => (
          <div
            key={tab.id}
            className={getTabItemClass(tab.id, tab.disabled)}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            tabIndex={tab.disabled ? -1 : 0}
          >
            {tab.icon && <span className="ihub-vtab-icon">{tab.icon}</span>}
            <span className="ihub-vtab-label">{tab.label}</span>
          </div>
        ))}
      </div>
      
      <div className={`ihub-vtab-content ${contentClassName}`}>
        {items.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default VerticalTabs;
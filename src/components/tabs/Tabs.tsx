
"use client";

import React, { useState, useEffect, ReactNode } from "react";

interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  defaultActiveTab?: string;
  onChange?: (tabId: string) => void;
  variant?: "default" | "bordered" | "pills";
  className?: string;
  tabsContainerClassName?: string;
  contentClassName?: string;
}

/**
 * Modern Tab component for InstinctHub
 * @component
 * @example
 * const tabs = [
 *   {
 *     id: "tab1",
 *     label: "Tab 1",
 *     content: <div>Tab 1 content</div>,
 *   },
 *   {
 *     id: "tab2",
 *     label: "Tab 2",
 *     content: <div>Tab 2 content</div>,
 *   },
 * ];
 *
 * <Tabs items={tabs} defaultActiveTab="tab1" onChange={(tabId) => console.log(tabId)} />
 * 
 * @param items Array of tab items containing id, label, and content. See example above.
 * @param defaultActiveTab ID of the tab that should be active by default
 * @param onChange Callback function that fires when a tab is changed
 * @param variant Visual style of tabs: "default", "bordered", or "pills"
 * @param className Additional classes for the main container
 * @param tabsContainerClassName Additional classes for the tabs header container
 * @param contentClassName Additional classes for the content container
 */
const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveTab,
  onChange,
  variant = "default",
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

  // Generate class names based on variant
  const getTabsContainerClass = () => {
    const baseClass = "ihub-tabs-header";
    
    switch (variant) {
      case "bordered":
        return `${baseClass} ihub-tabs-bordered ${tabsContainerClassName}`;
      case "pills":
        return `${baseClass} ihub-tabs-pills ${tabsContainerClassName}`;
      default:
        return `${baseClass} ${tabsContainerClassName}`;
    }
  };

  const getTabItemClass = (tabId: string, disabled?: boolean) => {
    const baseClass = "ihub-tab-item";
    const activeClass = tabId === activeTab ? "ihub-tab-active" : "";
    const disabledClass = disabled ? "ihub-tab-disabled" : "";
    
    return `${baseClass} ${activeClass} ${disabledClass}`;
  };

  return (
    <div className={`ihub-tabs-container ${className}`}>
      <div className={getTabsContainerClass()}>
        {items.map((tab) => (
          <div
            key={tab.id}
            className={getTabItemClass(tab.id, tab.disabled)}
            onClick={() => handleTabClick(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            tabIndex={tab.disabled ? -1 : 0}
          >
            {tab.label}
          </div>
        ))}
      </div>
      
      <div className={`ihub-tab-content ${contentClassName}`}>
        {items.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
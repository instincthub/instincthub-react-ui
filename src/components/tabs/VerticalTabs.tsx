"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { VerticalTabItemType } from "src/types";

interface VerticalTabsProps {
  items: VerticalTabItemType[];
  defaultActiveTab?: string;
  onChange?: (tabItem: VerticalTabItemType) => void;
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
 *   onChange={(tabItem) => {
 *     console.log(tabItem);
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
 *
 * @type {VerticalTabsProps} from src/types
 */
const VerticalTabs = ({
  items,
  defaultActiveTab,
  onChange,
  className = "",
  tabsContainerClassName = "",
  contentClassName = "",
}: VerticalTabsProps) => {
  const [activeTab, setActiveTab] = useState<VerticalTabItemType>(
    (items.length > 0 ? items[0] : null) as VerticalTabItemType
  );

  useEffect(() => {
    if (defaultActiveTab) {
      const defaultItem = items.find(
        (item) => defaultActiveTab === item.id
      ) as VerticalTabItemType;

      setActiveTab(defaultItem);
    }
  }, [defaultActiveTab]);

  const handleTabClick = (tabItem: VerticalTabItemType) => {
    if (items.find((item) => item.id === tabItem.id)?.disabled) {
      return;
    }

    setActiveTab(tabItem);
    if (onChange) {
      onChange(tabItem);
    }
  };

  const getTabItemClass = (tabId: string, disabled?: boolean) => {
    const baseClass = "ihub-vtab-item";
    const activeClass = tabId === activeTab.id ? "ihub-vtab-active" : "";
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
            onClick={() => handleTabClick(tab)}
            role="tab"
            aria-selected={activeTab.id === tab.id}
            tabIndex={tab.disabled ? -1 : 0}
          >
            {tab.icon && <span className="ihub-vtab-icon">{tab.icon}</span>}
            <span className="ihub-vtab-label">{tab.label}</span>
          </div>
        ))}
      </div>
      {activeTab?.content && (
        <div className={`ihub-vtab-content ${contentClassName}`}>
          {activeTab?.content}
        </div>
      )}
    </div>
  );
};

export default VerticalTabs;

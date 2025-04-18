"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { TabItemType } from "src/types";

interface TabsProps {
  items: TabItemType[];
  defaultActiveTab?: string | number;
  onChange?: (tabId: TabItemType) => void;
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
 * <Tabs items={tabs} defaultActiveTab="tab1" onChange={(tabItem) => console.log(tabItem)} />
 *
 * @param items Array of tab items containing id, label, and content. See example above.
 * @param defaultActiveTab ID of the tab that should be active by default
 * @param onChange Callback function that fires when a tab is changed
 * @param variant Visual style of tabs: "default", "bordered", or "pills"
 * @param className Additional classes for the main container
 * @param tabsContainerClassName Additional classes for the tabs header container
 * @param contentClassName Additional classes for the content container
 * @type {TabsProps} from src/types
 */
const Tabs = ({
  items,
  defaultActiveTab,
  onChange,
  variant = "default",
  className = "",
  tabsContainerClassName = "",
  contentClassName = "",
}: TabsProps) => {
  const [activeItem, setactiveItem] = useState<TabItemType>(
    (items.length > 0 ? items[0] : null) as TabItemType
  );

  useEffect(() => {
    if (defaultActiveTab) {
      const defaultItem = items.find(
        (item) => defaultActiveTab === item.id
      ) as TabItemType;
      setactiveItem(defaultItem);
    }
  }, [defaultActiveTab]);

  const handleTabClick = (item: TabItemType) => {
    if (items.find((item) => item.id === item.id)?.disabled) {
      return;
    }

    setactiveItem(item);

    if (onChange) {
      onChange(item);
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
    const activeClass = tabId === activeItem.id ? "ihub-tab-active" : "";
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
            onClick={() => handleTabClick(tab)}
            role="tab"
            aria-selected={activeItem.id === tab.id}
            tabIndex={tab.disabled ? -1 : 0}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {activeItem?.content && (
        <div className={`ihub-tab-content ${contentClassName}`}>
          {activeItem?.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;

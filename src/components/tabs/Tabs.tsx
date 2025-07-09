"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { TabItemType } from "@/types";

interface TabsProps {
  items: TabItemType[];
  defaultActiveTab?: string | number;
  onChange?: (tabId: TabItemType) => void;
  variant?: "default" | "bordered" | "pills";
  className?: string;
  tabsContainerClassName?: string;
  contentClassName?: string;
}

const Tabs = ({
  items,
  defaultActiveTab,
  onChange,
  variant = "default",
  className = "",
  tabsContainerClassName = "",
  contentClassName = "",
}: TabsProps) => {
  const [activeTabId, setActiveTabId] = useState<string | number>(
    defaultActiveTab || (items.length > 0 ? items[0].id : "")
  );

  useEffect(() => {
    if (defaultActiveTab) {
      setActiveTabId(defaultActiveTab);
    }
  }, [defaultActiveTab]);

  const handleTabClick = (item: TabItemType) => {
    if (item.disabled) {
      return;
    }

    setActiveTabId(item.id);

    if (onChange) {
      onChange(item);
    }
  };

  // Find the active tab
  const activeTab = items.find((item) => item.id === activeTabId) || items[0];

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

  const getTabItemClass = (tabId: string | number, disabled?: boolean) => {
    const baseClass = "ihub-tab-item";
    const activeClass = tabId === activeTabId ? "ihub-tab-active" : "";
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
            aria-selected={activeTabId === tab.id}
            tabIndex={tab.disabled ? -1 : 0}
          >
            {tab.label}
          </div>
        ))}
      </div>
      {activeTab?.content && (
        <div className={`ihub-tab-content ${contentClassName}`}>
          {activeTab.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;

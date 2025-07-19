"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { TabItemType } from "@/types";

/**
 * Props interface for the Tabs component
 * @interface TabsProps
 * @prop {TabItemType[]} items - Array of tab items containing id, label, content, and disabled state
 * @prop {string | number} [defaultActiveTab] - ID of the tab to be active by default
 * @prop {function} [onChange] - Callback function triggered when a tab is clicked
 * @prop {"default" | "bordered" | "pills"} [variant] - Visual style variant for the tabs
 * @prop {string} [className] - Additional CSS class for the main container
 * @prop {string} [tabsContainerClassName] - Additional CSS class for the tabs header container
 * @prop {string} [contentClassName] - Additional CSS class for the content area
 */
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
 * A flexible tabs component that supports multiple visual variants and provides
 * an accessible tabbed interface for organizing content into separate views.
 * Each tab consists of a clickable header and associated content panel.
 * 
 * @example
 * ```tsx
 * const tabItems = [
 *   { id: 'tab1', label: 'Overview', content: <Overview /> },
 *   { id: 'tab2', label: 'Details', content: <Details /> },
 *   { id: 'tab3', label: 'Settings', content: <Settings />, disabled: true }
 * ];
 * 
 * <Tabs
 *   items={tabItems}
 *   defaultActiveTab="tab1"
 *   onChange={(tab) => console.log('Selected tab:', tab)}
 *   variant="bordered"
 * />
 * ```
 * 
 * @component
 * @param {TabsProps} props - The component props
 * @param {TabItemType[]} props.items - Array of tab items with id, label, content, and optional disabled state
 * @param {string | number} [props.defaultActiveTab] - ID of the initially active tab (defaults to first tab)
 * @param {function} [props.onChange] - Callback fired when tab selection changes
 * @param {"default" | "bordered" | "pills"} [props.variant="default"] - Visual style variant
 * @param {string} [props.className=""] - Additional CSS class for the container
 * @param {string} [props.tabsContainerClassName=""] - Additional CSS class for tabs header
 * @param {string} [props.contentClassName=""] - Additional CSS class for content area
 * @returns {JSX.Element} The rendered tabs component
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
  const [activeTabId, setActiveTabId] = useState<string | number>(
    defaultActiveTab || (items.length > 0 ? items[0].id : "")
  );

  useEffect(() => {
    if (defaultActiveTab) {
      setActiveTabId(defaultActiveTab);
    }
  }, [defaultActiveTab]);

  /**
   * Handles tab click events, updating the active tab and triggering onChange callback
   * Prevents interaction with disabled tabs
   * @param {TabItemType} item - The tab item that was clicked
   */
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

  /**
   * Generates CSS class names for the tabs container based on the variant prop
   * @returns {string} Combined CSS class names for the tabs header
   */
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

  /**
   * Generates CSS class names for individual tab items based on their state
   * @param {string | number} tabId - The ID of the tab item
   * @param {boolean} [disabled] - Whether the tab is disabled
   * @returns {string} Combined CSS class names for the tab item
   */
  const getTabItemClass = (tabId: string | number, disabled?: boolean) => {
    const baseClass = "ihub-tab-item";
    const activeClass = tabId === activeTabId ? "ihub-tab-active" : "";
    const disabledClass = disabled ? "ihub-tab-disabled" : "";

    return `${baseClass} ${activeClass} ${disabledClass}`;
  };

  return (
    <div className={`ihub-tabs-container ${className}`}>
      <div className={getTabsContainerClass()}>
        {items.map((tab, index) => (
          <div
            key={tab.id || index}
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

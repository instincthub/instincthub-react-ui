import React from "react";

interface TabContentProps {
  title?: string | null;
  description: React.ReactElement;
}

/**
 * 
 * @component
 * @example
 * ```tsx
 *
 * <TabContent title="Tab Title" description={<p>Tab Description</p>} />
 * ```
 * Props interface for the TabContent component
 * @property {string} [title] - Optional title for the tab
 * @property {React.ReactElement} description - Description for the tab
 * 
 * @returns 
 */

const TabContent: React.FC<TabContentProps> = ({ title, description }) => {
  return (
    <div className="ihub-tab-content">
      {title ? <h3 className="ihub-fs-lg ihub-mb-2">{title}</h3> : ""}
      <div className="ihub-mb-4">{description}</div>
    </div>
  );
};

export default TabContent;

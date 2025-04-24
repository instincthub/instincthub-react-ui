"use client"
import { useState } from "react";
import { Action } from "../../../../index";

const ActionExamples = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  const dropdownItems = [
    {
      label: "Edit Profile",
      onClick: () => alert("Edit Profile clicked"),
      iconBefore: <span className="text-lg">✏️</span>,
    },
    {
      label: "Change Password",
      onClick: () => alert("Change Password clicked"),
    },
    {
      label: "View Settings",
      href: "/settings",
    },
    {
      label: "Disabled Option",
      onClick: () => alert("This should not be called"),
      disabled: true,
    },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="space-y-2">
        <h2 className="text-xl font-bold mb-4">Action Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Action
            label="Primary Button"
            variant="primary"
            onClick={handleClick}
          />
          <Action
            label="Secondary Button"
            variant="secondary"
            onClick={handleClick}
          />
          <Action
            label="Outline Button"
            variant="outline"
            onClick={handleClick}
          />
          <Action
            label="Danger Button"
            variant="danger"
            onClick={handleClick}
          />
          <Action label="Text Button" variant="text" onClick={handleClick} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold mb-4">Size Variants</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Action label="Small" size="small" onClick={handleClick} />
          <Action
            label="Medium (Default)"
            size="medium"
            onClick={handleClick}
          />
          <Action label="Large" size="large" onClick={handleClick} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold mb-4">States</h2>
        <div className="flex flex-wrap gap-4">
          <Action label="Normal Button" onClick={handleClick} />
          <Action label="Disabled Button" disabled onClick={handleClick} />
          <Action
            label="Full Width"
            fullWidth
            onClick={handleClick}
            className="mt-4"
          />
          <Action label="Animated" animated onClick={handleClick} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold mb-4">Link Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Action label="Internal Link" href="/dashboard" />
          <Action
            label="External Link"
            href="https://instincthub.com"
            target="_blank"
          />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold mb-4">With Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Action
            label="Icon Before"
            iconBefore={<span className="text-lg">👈</span>}
            onClick={handleClick}
          />
          <Action
            label="Icon After"
            iconAfter={<span className="text-lg">👉</span>}
            onClick={handleClick}
          />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold mb-4">Dropdown Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Action
            label="Account Options"
            dropdown
            dropdownItems={dropdownItems}
            variant="primary"
          />

          <Action
            label="Left Dropdown"
            dropdown
            dropdownItems={dropdownItems}
            dropdownPosition="left"
            variant="outline"
          />

          <Action
            label="Center Dropdown"
            dropdown
            dropdownItems={dropdownItems}
            dropdownPosition="center"
            variant="secondary"
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <p className="text-lg font-medium">Button click count: {count}</p>
      </div>
    </div>
  );
};

export default ActionExamples;

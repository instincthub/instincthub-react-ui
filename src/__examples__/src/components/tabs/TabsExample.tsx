"use client";

import React, { useState } from "react";
import Tabs from "@/components/ui/Tabs";

const TabsExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log(`Tab changed to: ${tabId}`);
  };

  const tabItems = [
    {
      id: "profile",
      label: "Profile",
      content: (
        <div className="ihub-py-4">
          <h3>Profile Information</h3>
          <p>This is the profile tab content. Here you can display user profile information.</p>
        </div>
      ),
    },
    {
      id: "security",
      label: "Security",
      content: (
        <div className="ihub-py-4">
          <h3>Security Settings</h3>
          <p>Change your password and security preferences here.</p>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      content: (
        <div className="ihub-py-4">
          <h3>Notification Preferences</h3>
          <p>Manage your notification settings and preferences.</p>
        </div>
      ),
    },
    {
      id: "billing",
      label: "Billing",
      disabled: true,
      content: (
        <div className="ihub-py-4">
          <h3>Billing Information</h3>
          <p>View and manage your billing settings.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="ihub-container">
      <h2>Default Tabs</h2>
      <Tabs 
        items={tabItems} 
        defaultActiveTab={activeTab}
        onChange={handleTabChange}
      />
      
      <h2 className="ihub-mt-8">Bordered Tabs</h2>
      <Tabs 
        items={tabItems} 
        defaultActiveTab="security"
        variant="bordered"
      />
      
      <h2 className="ihub-mt-8">Pills Tabs</h2>
      <Tabs 
        items={tabItems} 
        defaultActiveTab="notifications"
        variant="pills"
      />
    </div>
  );
};

export default TabsExample;
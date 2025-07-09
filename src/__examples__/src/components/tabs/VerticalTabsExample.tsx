"use client";

import React, { useState } from "react";


// Import icons (assuming you're using a library like Lucide or similar)
import { 
  User, 
  Shield, 
  Bell, 
  CreditCard, 
  Settings, 
  HelpCircle 
} from "lucide-react";
import VerticalTabs from "../../../../components/tabs/VerticalTabs";
import { VerticalTabItemType } from "@/types";

const VerticalTabsExample: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("profile");
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log(`Tab changed to: ${tabId}`);
  };

  const tabItems = [
    {
      id: "profile",
      label: "Profile",
      icon: <User size={18} />,
      content: (
        <div className="ihub-p-4">
          <h3 className="ihub-mb-4">Profile Information</h3>
          <p>Manage your personal information, profile picture, and public details.</p>
          
          <div className="ihub-mt-6">
            <h4 className="ihub-mb-2">Personal Details</h4>
            <div className="ihub-p-4 ihub-bg-white">
              <p>Name: John Doe</p>
              <p>Email: john.doe@example.com</p>
              <p>Location: New York, USA</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      label: "Security",
      icon: <Shield size={18} />,
      content: (
        <div className="ihub-p-4">
          <h3 className="ihub-mb-4">Security Settings</h3>
          <p>Manage your password, two-factor authentication, and security preferences.</p>
          
          <div className="ihub-mt-6">
            <h4 className="ihub-mb-2">Password</h4>
            <div className="ihub-p-4 ihub-bg-white">
              <p>Last changed: 30 days ago</p>
              <button className="ihub-important-btn ihub-mt-2">Change Password</button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell size={18} />,
      content: (
        <div className="ihub-p-4">
          <h3 className="ihub-mb-4">Notification Preferences</h3>
          <p>Control which notifications you receive and how they are delivered.</p>
          
          <div className="ihub-mt-6">
            <h4 className="ihub-mb-2">Email Notifications</h4>
            <div className="ihub-p-4 ihub-bg-white">
              <div className="ihub-mb-2">
                <input type="checkbox" id="updates" checked />
                <label htmlFor="updates" className="ihub-ml-2">Product Updates</label>
              </div>
              <div className="ihub-mb-2">
                <input type="checkbox" id="news" checked />
                <label htmlFor="news" className="ihub-ml-2">InstinctHub News</label>
              </div>
              <div className="ihub-mb-2">
                <input type="checkbox" id="activity" />
                <label htmlFor="activity" className="ihub-ml-2">Account Activity</label>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "billing",
      label: "Billing",
      icon: <CreditCard size={18} />,
      disabled: true,
      content: (
        <div className="ihub-p-4">
          <h3 className="ihub-mb-4">Billing Information</h3>
          <p>View and manage your subscription, payment methods, and billing history.</p>
        </div>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={18} />,
      content: (
        <div className="ihub-p-4">
          <h3 className="ihub-mb-4">Account Settings</h3>
          <p>Manage your account preferences, language, and other settings.</p>
          
          <div className="ihub-mt-6">
            <h4 className="ihub-mb-2">Language & Region</h4>
            <div className="ihub-p-4 ihub-bg-white">
              <div className="ihub-mb-3">
                <label className="ihub-mb-1 ihub-block">Language</label>
                <select className="ihub-p-2 ihub-w-full">
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
              <div>
                <label className="ihub-mb-1 ihub-block">Time Zone</label>
                <select className="ihub-p-2 ihub-w-full">
                  <option>UTC (Coordinated Universal Time)</option>
                  <option>EST (Eastern Standard Time)</option>
                  <option>PST (Pacific Standard Time)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "help",
      label: "Help & Support",
      icon: <HelpCircle size={18} />,
      content: (
        <div className="ihub-p-4">
          <h3 className="ihub-mb-4">Help & Support</h3>
          <p>Get assistance with using InstinctHub products and services.</p>
          
          <div className="ihub-mt-6">
            <h4 className="ihub-mb-2">Support Options</h4>
            <div className="ihub-p-4 ihub-bg-white">
              <div className="ihub-mb-3">
                <h5 className="ihub-font-semibold">Documentation</h5>
                <p>Browse our comprehensive documentation for guides and tutorials.</p>
                <a href="#" className="ihub-text-cyan-700 ihub-font-semibold">View Documentation</a>
              </div>
              <div className="ihub-mb-3">
                <h5 className="ihub-font-semibold">Contact Support</h5>
                <p>Get in touch with our support team for personalized help.</p>
                <button className="ihub-outlined-btn ihub-mt-2">Contact Support</button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="ihub-container">
      <h2 className="ihub-mb-6">Account Management</h2>
      <VerticalTabs 
        items={tabItems} 
        defaultActiveTab={activeTab}
        onChange={(tabId: VerticalTabItemType) => handleTabChange(tabId.id as string)}
        className="ihub-border ihub-rounded-lg ihub-p-6 ihub-bg-white ihub-shadow-sm"
      />
    </div>
  );
};

export default VerticalTabsExample;
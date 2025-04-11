import { TabContent, Tabs, VeriticalTabs } from "@/index";

// Icons for demo
const ProfileIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SecurityIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const NotificationIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BillingIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1 10H23"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface VerticalTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

// Demo Component
const TabsDemo = () => {
  const horizontalTabs = [
    {
      id: "profile",
      label: "Profile",
      content: (
        <TabContent
          title="Profile Information"
          description=<p>"Here you can view and edit your profile details."</p>
        />
      ),
    },
    {
      id: "security",
      label: "Security",
      content: (
        <TabContent
          title="Security Settings"
          description=<p>"Manage your password and security preferences."</p>
        />
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      content: (
        <TabContent
          title="Notification Preferences"
          description=<p>"Control which notifications you receive."</p>
        />
      ),
    },
    {
      id: "billing",
      label: "Billing",
      disabled: true,
      content: (
        <TabContent
          title="Billing Information"
          description=<p>View your subscription and payment history.</p>
        />
      ),
    },
  ];

  const verticalTabs: VerticalTab[] = [
    {
      id: "profile",
      label: "Profile",
      icon: <ProfileIcon />,
      content: (
        <TabContent
          title="Profile Information"
          description=<p>Here you can view and edit your profile details.</p>
        />
      ),
    },
    {
      id: "security",
      label: "Security",
      icon: <SecurityIcon />,
      content: (
        <TabContent
          title="Security Settings"
          description=<p>Manage your password and security preferences.</p>
        />
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: <NotificationIcon />,
      content: (
        <TabContent
          title="Notification Preferences"
          description=<p>Control which notifications you receive.</p>
        />
      ),
    },
    {
      id: "billing",
      label: "Billing",
      icon: <BillingIcon />,
      disabled: true,
      content: (
        <TabContent
          title="Billing Information"
          description=<p>View your subscription and payment history.</p>
        />
      ),
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">
        InstinctHub Tab Components
      </h1>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Default Tabs</h2>
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <Tabs items={horizontalTabs} defaultActiveTab="profile" />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Bordered Tabs</h2>
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <Tabs
            items={horizontalTabs}
            defaultActiveTab="security"
            variant="bordered"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Pills Tabs</h2>
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <Tabs
            items={horizontalTabs}
            defaultActiveTab="notifications"
            variant="pills"
          />
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Vertical Tabs</h2>
        <div className="border rounded-lg p-6 bg-white shadow-sm">
          <VeriticalTabs items={verticalTabs} defaultActiveTab="profile" />
        </div>
      </div>
    </div>
  );
};

export default TabsDemo;

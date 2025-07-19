# SideNavbar

**Category:** Navbar | **Type:** component

Advanced side navigation component with collapsible menus, multi-level hierarchy, responsive behavior, and extensive customization options.

## 🏷️ Tags

`navbar`, `navigation`, `menu`, `sidebar`, `responsive`, `collapsible`

```tsx
"use client";
import React, { useState } from "react";
import { SideNavbar } from "@instincthub/react-ui";
import {
  Dashboard,
  Users,
  Settings,
  Analytics,
  Help,
  Logout,
  ShoppingCart,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  User,
  CreditCard,
  Archive,
  Folder,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Download,
  Upload,
  Star,
  Heart,
  Share,
  Filter,
  BookOpen,
  Award,
  Target,
  TrendingUp,
  Globe,
  Lock,
  Zap,
  Shield,
  Mail,
  Phone,
  MapPin,
  Coffee,
  Building,
  Briefcase,
  Code,
  Database,
  Server,
  Monitor,
  Smartphone,
  Tablet,
  Cpu,
  HardDrive,
  Wifi,
  Camera,
  Headphones,
  Printer,
  Mouse,
  Keyboard,
  Speaker,
  Microphone
} from "lucide-react";

/**
 * Comprehensive SideNavbar Examples
 * Demonstrating various configurations and use cases
 */
const SideNavbarExamples = () => {
  // State for different sidebar examples
  const [basicExpanded, setBasicExpanded] = useState(true);
  const [adminExpanded, setAdminExpanded] = useState(true);
  const [ecommerceExpanded, setEcommerceExpanded] = useState(false);
  const [cmsExpanded, setCmsExpanded] = useState(true);
  const [appExpanded, setAppExpanded] = useState(true);
  const [dashboardExpanded, setDashboardExpanded] = useState(true);

  // Basic navigation items
  const basicNavItems = [
    {
      id: "dashboard",
      type: "link" as const,
      title: "Dashboard",
      href: "/dashboard",
      icon: <Dashboard size={20} />,
      isActive: true,
      badge: { content: "New", variant: "primary" as const }
    },
    {
      id: "users",
      type: "link" as const,
      title: "Users",
      href: "/users",
      icon: <Users size={20} />,
      badge: { content: 12, variant: "danger" as const }
    },
    {
      id: "analytics",
      type: "link" as const,
      title: "Analytics",
      href: "/analytics",
      icon: <Analytics size={20} />
    },
    {
      id: "divider1",
      type: "divider" as const,
      title: "Settings"
    },
    {
      id: "settings",
      type: "link" as const,
      title: "Settings",
      href: "/settings",
      icon: <Settings size={20} />
    },
    {
      id: "help",
      type: "link" as const,
      title: "Help & Support",
      href: "/help",
      icon: <Help size={20} />
    },
    {
      id: "logout",
      type: "button" as const,
      title: "Logout",
      icon: <Logout size={20} />,
      onClick: () => console.log("Logout clicked")
    }
  ];

  // Admin dashboard navigation
  const adminNavItems = [
    {
      id: "admin-dashboard",
      type: "link" as const,
      title: "Dashboard",
      href: "/admin",
      icon: <Dashboard size={20} />,
      isActive: true
    },
    {
      id: "user-management",
      type: "group" as const,
      title: "User Management",
      icon: <Users size={20} />,
      defaultExpanded: true,
      badge: { content: 5, variant: "warning" as const },
      children: [
        {
          id: "all-users",
          type: "link" as const,
          title: "All Users",
          href: "/admin/users",
          icon: <Users size={16} />,
          badge: { content: 1247, variant: "default" as const }
        },
        {
          id: "user-roles",
          type: "link" as const,
          title: "User Roles",
          href: "/admin/users/roles",
          icon: <Shield size={16} />
        },
        {
          id: "permissions",
          type: "link" as const,
          title: "Permissions",
          href: "/admin/users/permissions",
          icon: <Lock size={16} />
        },
        {
          id: "user-activity",
          type: "link" as const,
          title: "User Activity",
          href: "/admin/users/activity",
          icon: <TrendingUp size={16} />
        }
      ]
    },
    {
      id: "content-management",
      type: "group" as const,
      title: "Content",
      icon: <FileText size={20} />,
      children: [
        {
          id: "posts",
          type: "link" as const,
          title: "Posts",
          href: "/admin/posts",
          icon: <FileText size={16} />,
          badge: { content: 23, variant: "success" as const }
        },
        {
          id: "pages",
          type: "link" as const,
          title: "Pages",
          href: "/admin/pages",
          icon: <Globe size={16} />
        },
        {
          id: "media",
          type: "link" as const,
          title: "Media Library",
          href: "/admin/media",
          icon: <Archive size={16} />
        },
        {
          id: "categories",
          type: "group" as const,
          title: "Categories",
          icon: <Folder size={16} />,
          children: [
            {
              id: "post-categories",
              type: "link" as const,
              title: "Post Categories",
              href: "/admin/categories/posts",
              icon: <FileText size={14} />
            },
            {
              id: "product-categories",
              type: "link" as const,
              title: "Product Categories",
              href: "/admin/categories/products",
              icon: <ShoppingCart size={14} />
            }
          ]
        }
      ]
    },
    {
      id: "analytics-reports",
      type: "group" as const,
      title: "Analytics & Reports",
      icon: <Analytics size={20} />,
      children: [
        {
          id: "traffic-analytics",
          type: "link" as const,
          title: "Traffic Analytics",
          href: "/admin/analytics/traffic",
          icon: <TrendingUp size={16} />
        },
        {
          id: "user-analytics",
          type: "link" as const,
          title: "User Analytics",
          href: "/admin/analytics/users",
          icon: <Users size={16} />
        },
        {
          id: "revenue-reports",
          type: "link" as const,
          title: "Revenue Reports",
          href: "/admin/analytics/revenue",
          icon: <CreditCard size={16} />
        },
        {
          id: "custom-reports",
          type: "link" as const,
          title: "Custom Reports",
          href: "/admin/analytics/custom",
          icon: <FileText size={16} />
        }
      ]
    },
    {
      id: "system",
      type: "group" as const,
      title: "System",
      icon: <Server size={20} />,
      children: [
        {
          id: "system-settings",
          type: "link" as const,
          title: "System Settings",
          href: "/admin/system/settings",
          icon: <Settings size={16} />
        },
        {
          id: "backup",
          type: "link" as const,
          title: "Backup & Restore",
          href: "/admin/system/backup",
          icon: <Download size={16} />
        },
        {
          id: "logs",
          type: "link" as const,
          title: "System Logs",
          href: "/admin/system/logs",
          icon: <FileText size={16} />
        },
        {
          id: "maintenance",
          type: "link" as const,
          title: "Maintenance Mode",
          href: "/admin/system/maintenance",
          icon: <Zap size={16} />
        }
      ]
    }
  ];

  // E-commerce navigation
  const ecommerceNavItems = [
    {
      id: "ecommerce-dashboard",
      type: "link" as const,
      title: "Dashboard",
      href: "/ecommerce",
      icon: <Dashboard size={20} />,
      isActive: true
    },
    {
      id: "orders",
      type: "group" as const,
      title: "Orders",
      icon: <ShoppingCart size={20} />,
      defaultExpanded: true,
      badge: { content: 15, variant: "danger" as const },
      children: [
        {
          id: "all-orders",
          type: "link" as const,
          title: "All Orders",
          href: "/ecommerce/orders",
          icon: <ShoppingCart size={16} />,
          badge: { content: 234, variant: "default" as const }
        },
        {
          id: "pending-orders",
          type: "link" as const,
          title: "Pending Orders",
          href: "/ecommerce/orders/pending",
          icon: <Calendar size={16} />,
          badge: { content: 15, variant: "warning" as const }
        },
        {
          id: "shipped-orders",
          type: "link" as const,
          title: "Shipped Orders",
          href: "/ecommerce/orders/shipped",
          icon: <Upload size={16} />
        },
        {
          id: "cancelled-orders",
          type: "link" as const,
          title: "Cancelled Orders",
          href: "/ecommerce/orders/cancelled",
          icon: <Trash2 size={16} />
        }
      ]
    },
    {
      id: "products",
      type: "group" as const,
      title: "Products",
      icon: <Archive size={20} />,
      children: [
        {
          id: "all-products",
          type: "link" as const,
          title: "All Products",
          href: "/ecommerce/products",
          icon: <Archive size={16} />,
          badge: { content: 1456, variant: "default" as const }
        },
        {
          id: "add-product",
          type: "link" as const,
          title: "Add Product",
          href: "/ecommerce/products/add",
          icon: <Plus size={16} />
        },
        {
          id: "categories",
          type: "link" as const,
          title: "Categories",
          href: "/ecommerce/products/categories",
          icon: <Folder size={16} />
        },
        {
          id: "inventory",
          type: "link" as const,
          title: "Inventory",
          href: "/ecommerce/products/inventory",
          icon: <Database size={16} />,
          badge: { content: "Low", variant: "warning" as const }
        },
        {
          id: "reviews",
          type: "link" as const,
          title: "Product Reviews",
          href: "/ecommerce/products/reviews",
          icon: <Star size={16} />,
          badge: { content: 42, variant: "success" as const }
        }
      ]
    },
    {
      id: "customers",
      type: "group" as const,
      title: "Customers",
      icon: <Users size={20} />,
      children: [
        {
          id: "all-customers",
          type: "link" as const,
          title: "All Customers",
          href: "/ecommerce/customers",
          icon: <Users size={16} />
        },
        {
          id: "customer-groups",
          type: "link" as const,
          title: "Customer Groups",
          href: "/ecommerce/customers/groups",
          icon: <Building size={16} />
        },
        {
          id: "loyalty-program",
          type: "link" as const,
          title: "Loyalty Program",
          href: "/ecommerce/customers/loyalty",
          icon: <Award size={16} />
        }
      ]
    },
    {
      id: "divider2",
      type: "divider" as const,
      title: "Marketing"
    },
    {
      id: "marketing",
      type: "group" as const,
      title: "Marketing",
      icon: <Target size={20} />,
      children: [
        {
          id: "campaigns",
          type: "link" as const,
          title: "Campaigns",
          href: "/ecommerce/marketing/campaigns",
          icon: <Mail size={16} />
        },
        {
          id: "coupons",
          type: "link" as const,
          title: "Coupons & Discounts",
          href: "/ecommerce/marketing/coupons",
          icon: <CreditCard size={16} />
        },
        {
          id: "newsletters",
          type: "link" as const,
          title: "Newsletters",
          href: "/ecommerce/marketing/newsletters",
          icon: <Mail size={16} />
        }
      ]
    },
    {
      id: "analytics-ecom",
      type: "link" as const,
      title: "Analytics",
      href: "/ecommerce/analytics",
      icon: <TrendingUp size={20} />
    },
    {
      id: "settings-ecom",
      type: "link" as const,
      title: "Settings",
      href: "/ecommerce/settings",
      icon: <Settings size={20} />
    }
  ];

  // CMS navigation
  const cmsNavItems = [
    {
      id: "cms-dashboard",
      type: "link" as const,
      title: "Dashboard",
      href: "/cms",
      icon: <Dashboard size={20} />,
      isActive: true
    },
    {
      id: "content",
      type: "group" as const,
      title: "Content",
      icon: <FileText size={20} />,
      defaultExpanded: true,
      children: [
        {
          id: "articles",
          type: "link" as const,
          title: "Articles",
          href: "/cms/articles",
          icon: <FileText size={16} />,
          badge: { content: 156, variant: "default" as const }
        },
        {
          id: "pages",
          type: "link" as const,
          title: "Pages",
          href: "/cms/pages",
          icon: <Globe size={16} />
        },
        {
          id: "blog-posts",
          type: "link" as const,
          title: "Blog Posts",
          href: "/cms/blog",
          icon: <BookOpen size={16} />,
          badge: { content: 89, variant: "success" as const }
        },
        {
          id: "drafts",
          type: "link" as const,
          title: "Drafts",
          href: "/cms/drafts",
          icon: <Edit size={16} />,
          badge: { content: 12, variant: "warning" as const }
        }
      ]
    },
    {
      id: "media-cms",
      type: "group" as const,
      title: "Media",
      icon: <Camera size={20} />,
      children: [
        {
          id: "images",
          type: "link" as const,
          title: "Images",
          href: "/cms/media/images",
          icon: <Camera size={16} />
        },
        {
          id: "videos",
          type: "link" as const,
          title: "Videos",
          href: "/cms/media/videos",
          icon: <Monitor size={16} />
        },
        {
          id: "documents",
          type: "link" as const,
          title: "Documents",
          href: "/cms/media/documents",
          icon: <FileText size={16} />
        },
        {
          id: "gallery",
          type: "link" as const,
          title: "Gallery",
          href: "/cms/media/gallery",
          icon: <Eye size={16} />
        }
      ]
    },
    {
      id: "organization",
      type: "group" as const,
      title: "Organization",
      icon: <Folder size={20} />,
      children: [
        {
          id: "categories-cms",
          type: "link" as const,
          title: "Categories",
          href: "/cms/categories",
          icon: <Folder size={16} />
        },
        {
          id: "tags",
          type: "link" as const,
          title: "Tags",
          href: "/cms/tags",
          icon: <Filter size={16} />
        },
        {
          id: "menus",
          type: "link" as const,
          title: "Navigation Menus",
          href: "/cms/menus",
          icon: <Briefcase size={16} />
        }
      ]
    },
    {
      id: "users-cms",
      type: "group" as const,
      title: "Users & Access",
      icon: <Users size={20} />,
      children: [
        {
          id: "authors",
          type: "link" as const,
          title: "Authors",
          href: "/cms/authors",
          icon: <User size={16} />
        },
        {
          id: "editors",
          type: "link" as const,
          title: "Editors",
          href: "/cms/editors",
          icon: <Edit size={16} />
        },
        {
          id: "permissions-cms",
          type: "link" as const,
          title: "Permissions",
          href: "/cms/permissions",
          icon: <Lock size={16} />
        }
      ]
    },
    {
      id: "divider3",
      type: "divider" as const,
      title: "Tools"
    },
    {
      id: "seo",
      type: "link" as const,
      title: "SEO Tools",
      href: "/cms/seo",
      icon: <Search size={16} />
    },
    {
      id: "analytics-cms",
      type: "link" as const,
      title: "Analytics",
      href: "/cms/analytics",
      icon: <TrendingUp size={16} />
    },
    {
      id: "backup-cms",
      type: "button" as const,
      title: "Backup Content",
      icon: <Download size={16} />,
      onClick: () => console.log("Backup initiated")
    }
  ];

  // Mobile app navigation
  const appNavItems = [
    {
      id: "app-home",
      type: "link" as const,
      title: "Home",
      href: "/app",
      icon: <Dashboard size={20} />,
      isActive: true
    },
    {
      id: "notifications",
      type: "link" as const,
      title: "Notifications",
      href: "/app/notifications",
      icon: <Bell size={20} />,
      badge: { content: 3, variant: "danger" as const }
    },
    {
      id: "messages",
      type: "link" as const,
      title: "Messages",
      href: "/app/messages",
      icon: <MessageSquare size={20} />,
      badge: { content: 12, variant: "primary" as const }
    },
    {
      id: "favorites",
      type: "link" as const,
      title: "Favorites",
      href: "/app/favorites",
      icon: <Heart size={20} />
    },
    {
      id: "profile-section",
      type: "group" as const,
      title: "Profile",
      icon: <User size={20} />,
      children: [
        {
          id: "my-profile",
          type: "link" as const,
          title: "My Profile",
          href: "/app/profile",
          icon: <User size={16} />
        },
        {
          id: "account-settings",
          type: "link" as const,
          title: "Account Settings",
          href: "/app/profile/settings",
          icon: <Settings size={16} />
        },
        {
          id: "privacy",
          type: "link" as const,
          title: "Privacy",
          href: "/app/profile/privacy",
          icon: <Lock size={16} />
        },
        {
          id: "billing",
          type: "link" as const,
          title: "Billing",
          href: "/app/profile/billing",
          icon: <CreditCard size={16} />
        }
      ]
    },
    {
      id: "divider4",
      type: "divider" as const,
      title: "Other"
    },
    {
      id: "help-app",
      type: "link" as const,
      title: "Help & Support",
      href: "/app/help",
      icon: <Help size={20} />
    },
    {
      id: "share-app",
      type: "button" as const,
      title: "Share App",
      icon: <Share size={20} />,
      onClick: () => console.log("Share app")
    },
    {
      id: "logout-app",
      type: "button" as const,
      title: "Logout",
      icon: <Logout size={20} />,
      onClick: () => console.log("Logout from app")
    }
  ];

  // Developer dashboard navigation
  const dashboardNavItems = [
    {
      id: "overview",
      type: "link" as const,
      title: "Overview",
      href: "/dashboard",
      icon: <Dashboard size={20} />,
      isActive: true
    },
    {
      id: "projects",
      type: "group" as const,
      title: "Projects",
      icon: <Code size={20} />,
      defaultExpanded: true,
      badge: { content: 8, variant: "primary" as const },
      children: [
        {
          id: "active-projects",
          type: "link" as const,
          title: "Active Projects",
          href: "/dashboard/projects/active",
          icon: <Zap size={16} />,
          badge: { content: 5, variant: "success" as const }
        },
        {
          id: "completed-projects",
          type: "link" as const,
          title: "Completed",
          href: "/dashboard/projects/completed",
          icon: <Award size={16} />
        },
        {
          id: "archived-projects",
          type: "link" as const,
          title: "Archived",
          href: "/dashboard/projects/archived",
          icon: <Archive size={16} />
        }
      ]
    },
    {
      id: "development",
      type: "group" as const,
      title: "Development",
      icon: <Monitor size={20} />,
      children: [
        {
          id: "repositories",
          type: "link" as const,
          title: "Repositories",
          href: "/dashboard/repositories",
          icon: <Database size={16} />
        },
        {
          id: "deployments",
          type: "link" as const,
          title: "Deployments",
          href: "/dashboard/deployments",
          icon: <Upload size={16} />,
          badge: { content: "Live", variant: "success" as const }
        },
        {
          id: "api-keys",
          type: "link" as const,
          title: "API Keys",
          href: "/dashboard/api-keys",
          icon: <Server size={16} />
        },
        {
          id: "webhooks",
          type: "link" as const,
          title: "Webhooks",
          href: "/dashboard/webhooks",
          icon: <Wifi size={16} />
        }
      ]
    },
    {
      id: "monitoring",
      type: "group" as const,
      title: "Monitoring",
      icon: <TrendingUp size={20} />,
      children: [
        {
          id: "performance",
          type: "link" as const,
          title: "Performance",
          href: "/dashboard/monitoring/performance",
          icon: <Cpu size={16} />
        },
        {
          id: "errors",
          type: "link" as const,
          title: "Error Tracking",
          href: "/dashboard/monitoring/errors",
          icon: <Shield size={16} />,
          badge: { content: 2, variant: "warning" as const }
        },
        {
          id: "logs",
          type: "link" as const,
          title: "Logs",
          href: "/dashboard/monitoring/logs",
          icon: <FileText size={16} />
        },
        {
          id: "uptime",
          type: "link" as const,
          title: "Uptime",
          href: "/dashboard/monitoring/uptime",
          icon: <Globe size={16} />
        }
      ]
    },
    {
      id: "team",
      type: "group" as const,
      title: "Team",
      icon: <Users size={20} />,
      children: [
        {
          id: "team-members",
          type: "link" as const,
          title: "Team Members",
          href: "/dashboard/team",
          icon: <Users size={16} />
        },
        {
          id: "invitations",
          type: "link" as const,
          title: "Invitations",
          href: "/dashboard/team/invitations",
          icon: <Mail size={16} />,
          badge: { content: 1, variant: "warning" as const }
        },
        {
          id: "permissions-dash",
          type: "link" as const,
          title: "Permissions",
          href: "/dashboard/team/permissions",
          icon: <Lock size={16} />
        }
      ]
    },
    {
      id: "divider5",
      type: "divider" as const,
      title: "Account"
    },
    {
      id: "billing-dash",
      type: "link" as const,
      title: "Billing",
      href: "/dashboard/billing",
      icon: <CreditCard size={20} />
    },
    {
      id: "settings-dash",
      type: "link" as const,
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={20} />
    },
    {
      id: "support",
      type: "link" as const,
      title: "Support",
      href: "/dashboard/support",
      icon: <Help size={20} />
    }
  ];

  // Logo configurations
  const basicLogo = {
    src: "https://via.placeholder.com/120x40/4F46E5/FFFFFF?text=LOGO",
    miniSrc: "https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=L",
    alt: "Company Logo",
    href: "/",
    width: 120,
    height: 40
  };

  // Footer configurations
  const adminFooter = {
    showUserProfile: true,
    user: {
      name: "John Admin",
      email: "admin@company.com",
      avatar: "https://via.placeholder.com/40x40/10B981/FFFFFF?text=JA",
      role: "Administrator"
    },
    actions: [
      {
        id: "theme-toggle",
        type: "button" as const,
        title: "Toggle Theme",
        icon: <Monitor size={16} />,
        onClick: () => console.log("Toggle theme")
      },
      {
        id: "admin-logout",
        type: "button" as const,
        title: "Logout",
        icon: <Logout size={16} />,
        onClick: () => console.log("Admin logout")
      }
    ]
  };

  const userFooter = {
    showUserProfile: true,
    user: {
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "https://via.placeholder.com/40x40/8B5CF6/FFFFFF?text=JD",
      role: "Content Manager"
    }
  };

  return (
    <div className="ihub-container-fluid ihub-p-0">
      <h1 className="ihub-text-center ihub-py-4">SideNavbar Examples</h1>

      {/* Basic Sidebar Example */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">1. Basic Sidebar</h2>
        <p className="ihub-mb-3">Simple sidebar with basic navigation items, badges, and dividers.</p>
        <div style={{ height: "500px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
          <SideNavbar
            items={basicNavItems}
            defaultExpanded={basicExpanded}
            isExpanded={basicExpanded}
            onExpandedChange={setBasicExpanded}
            logo={basicLogo}
            className="basic-sidebar"
            persistState={false}
          >
            <div className="ihub-p-4">
              <h3>Main Content Area</h3>
              <p>This is the main content area. The sidebar can be toggled to expand or collapse.</p>
              <button 
                className="ihub-primary-btn"
                onClick={() => setBasicExpanded(!basicExpanded)}
              >
                Toggle Sidebar
              </button>
            </div>
          </SideNavbar>
        </div>
      </div>

      {/* Admin Dashboard Example */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">2. Admin Dashboard Sidebar</h2>
        <p className="ihub-mb-3">Multi-level navigation with nested groups, badges, and admin-specific footer.</p>
        <div style={{ height: "600px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
          <SideNavbar
            items={adminNavItems}
            defaultExpanded={adminExpanded}
            isExpanded={adminExpanded}
            onExpandedChange={setAdminExpanded}
            logo={basicLogo}
            footer={adminFooter}
            darkMode={false}
            resizable={true}
            minWidth={200}
            maxWidth={350}
            tooltip={{ enabled: true }}
            toggleShortcut="ctrl+b"
            persistState={false}
          >
            <div className="ihub-p-4">
              <h3>Admin Dashboard</h3>
              <p>Advanced admin interface with multi-level navigation, resizable sidebar, and keyboard shortcuts.</p>
              <div className="ihub-alert ihub-alert-info ihub-mt-3">
                <strong>Features:</strong> Resizable sidebar, keyboard shortcut (Ctrl+B), tooltips when collapsed
              </div>
            </div>
          </SideNavbar>
        </div>
      </div>

      {/* E-commerce Example */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">3. E-commerce Management</h2>
        <p className="ihub-mb-3">E-commerce focused navigation with order management, product catalog, and marketing tools.</p>
        <div style={{ height: "600px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
          <SideNavbar
            items={ecommerceNavItems}
            defaultExpanded={ecommerceExpanded}
            isExpanded={ecommerceExpanded}
            onExpandedChange={setEcommerceExpanded}
            logo={basicLogo}
            variant="compact"
            expandedWidth={280}
            collapsedWidth={60}
            animation="slide"
            persistState={false}
          >
            <div className="ihub-p-4">
              <h3>E-commerce Dashboard</h3>
              <p>Manage your online store with comprehensive navigation for orders, products, customers, and marketing.</p>
              <div className="ihub-row ihub-mt-4">
                <div className="ihub-col-md-4">
                  <div className="ihub-card">
                    <div className="ihub-card-body">
                      <h5>Pending Orders</h5>
                      <h2 className="ihub-text-warning">15</h2>
                    </div>
                  </div>
                </div>
                <div className="ihub-col-md-4">
                  <div className="ihub-card">
                    <div className="ihub-card-body">
                      <h5>Total Products</h5>
                      <h2 className="ihub-text-primary">1,456</h2>
                    </div>
                  </div>
                </div>
                <div className="ihub-col-md-4">
                  <div className="ihub-card">
                    <div className="ihub-card-body">
                      <h5>Active Customers</h5>
                      <h2 className="ihub-text-success">892</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SideNavbar>
        </div>
      </div>

      {/* CMS Example */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">4. Content Management System</h2>
        <p className="ihub-mb-3">CMS-focused sidebar with content organization, media management, and user roles.</p>
        <div style={{ height: "600px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
          <SideNavbar
            items={cmsNavItems}
            defaultExpanded={cmsExpanded}
            isExpanded={cmsExpanded}
            onExpandedChange={setCmsExpanded}
            logo={basicLogo}
            footer={userFooter}
            position="left"
            animation="fade"
            autoCollapseOnMobile={true}
            showBackdrop={true}
            enableTouchGestures={true}
            persistState={false}
          >
            <div className="ihub-p-4">
              <h3>Content Management</h3>
              <p>Comprehensive CMS with content creation, media management, and publishing tools.</p>
              <div className="ihub-alert ihub-alert-success ihub-mt-3">
                <strong>Mobile Ready:</strong> Auto-collapse on mobile, touch gestures, and backdrop overlay
              </div>
            </div>
          </SideNavbar>
        </div>
      </div>

      {/* Mobile App Example */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">5. Mobile App Navigation</h2>
        <p className="ihub-mb-3">Mobile-optimized sidebar with simplified navigation and user-focused features.</p>
        <div style={{ height: "500px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
          <SideNavbar
            items={appNavItems}
            defaultExpanded={appExpanded}
            isExpanded={appExpanded}
            onExpandedChange={setAppExpanded}
            variant="mini"
            expandedWidth={240}
            collapsedWidth={64}
            darkMode={true}
            className="mobile-app-sidebar"
            persistState={false}
          >
            <div className="ihub-p-4">
              <h3>Mobile App Interface</h3>
              <p>Clean, mobile-first navigation with dark theme and essential app features.</p>
              <div className="ihub-d-flex ihub-align-items-center ihub-mt-3">
                <Bell size={20} className="ihub-me-2" />
                <span>3 new notifications</span>
              </div>
            </div>
          </SideNavbar>
        </div>
      </div>

      {/* Developer Dashboard Example */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">6. Developer Dashboard</h2>
        <p className="ihub-mb-3">Developer-focused navigation with project management, monitoring tools, and team collaboration.</p>
        <div style={{ height: "600px", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
          <SideNavbar
            items={dashboardNavItems}
            defaultExpanded={dashboardExpanded}
            isExpanded={dashboardExpanded}
            onExpandedChange={setDashboardExpanded}
            logo={basicLogo}
            variant="overlay"
            positioning={{ 
              fixed: true, 
              top: 0, 
              zIndex: 1000 
            }}
            lazyRender={true}
            persistState={false}
          >
            <div className="ihub-p-4">
              <h3>Developer Dashboard</h3>
              <p>Technical dashboard with project tracking, deployment monitoring, and team management.</p>
              <div className="ihub-row ihub-mt-4">
                <div className="ihub-col-md-6">
                  <div className="ihub-card">
                    <div className="ihub-card-body">
                      <h6>Active Projects</h6>
                      <h3 className="ihub-text-success">5</h3>
                      <small className="ihub-text-muted">2 deploying</small>
                    </div>
                  </div>
                </div>
                <div className="ihub-col-md-6">
                  <div className="ihub-card">
                    <div className="ihub-card-body">
                      <h6>System Status</h6>
                      <h3 className="ihub-text-success">99.9%</h3>
                      <small className="ihub-text-muted">Uptime</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SideNavbar>
        </div>
      </div>

      {/* Feature Showcase */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Key Features Demonstrated</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body">
                <h5>Navigation Types</h5>
                <ul>
                  <li>Links with badges</li>
                  <li>Collapsible groups</li>
                  <li>Action buttons</li>
                  <li>Visual dividers</li>
                  <li>Multi-level nesting</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div className="ihub-card ihub-h-100">
              <div className="ihub-card-body">
                <h5>Responsive Features</h5>
                <ul>
                  <li>Mobile auto-collapse</li>
                  <li>Touch gesture support</li>
                  <li>Backdrop overlay</li>
                  <li>Responsive width</li>
                  <li>Breakpoint detection</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="ihub-col-md-4">
            <div class="ihub-card ihub-h-100">
              <div className="ihub-card-body">
                <h5>Advanced Options</h5>
                <ul>
                  <li>Resizable sidebar</li>
                  <li>Keyboard shortcuts</li>
                  <li>State persistence</li>
                  <li>Custom tooltips</li>
                  <li>Lazy rendering</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Common Use Cases</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Admin Dashboards</h4>
            <p>Perfect for admin interfaces with complex navigation hierarchies, user management, and system controls.</p>
            
            <h4>E-commerce Platforms</h4>
            <p>Ideal for online store management with product catalogs, order processing, and customer management.</p>
          </div>
          <div className="ihub-col-md-6">
            <h4>Content Management</h4>
            <p>Great for CMS interfaces with content organization, media libraries, and publishing workflows.</p>
            
            <h4>Developer Tools</h4>
            <p>Excellent for technical dashboards with project management, monitoring tools, and team collaboration.</p>
          </div>
        </div>
      </div>

      {/* Configuration Examples */}
      <div className="ihub-mb-5">
        <h2 className="ihub-mb-3">Configuration Examples</h2>
        <div className="ihub-alert ihub-alert-info">
          <h5>Quick Setup Examples:</h5>
          <pre className="ihub-bg-light ihub-p-3 ihub-rounded">
{`// Basic sidebar
<SideNavbar items={navItems} />

// With logo and footer
<SideNavbar 
  items={navItems}
  logo={logoConfig}
  footer={footerConfig}
/>

// Resizable with keyboard shortcut
<SideNavbar 
  items={navItems}
  resizable={true}
  toggleShortcut="ctrl+b"
  minWidth={200}
  maxWidth={400}
/>

// Mobile optimized
<SideNavbar 
  items={navItems}
  autoCollapseOnMobile={true}
  showBackdrop={true}
  enableTouchGestures={true}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SideNavbarExamples;
```

## 🔗 Related Components

- [ChannelListAvatar](./ChannelListAvatar.md) - Channel list avatar component
- [MenuDropdown](./MenuDropdown.md) - Menu dropdown component
- [Breadcrumb](./Breadcrumb.md) - Breadcrumb component
- [ResponsiveNavbar](./ResponsiveNavbar.md) - Responsive navbar component
- [SideNavbarContext](./SideNavbarContext.md) - Context provider for side navigation state management


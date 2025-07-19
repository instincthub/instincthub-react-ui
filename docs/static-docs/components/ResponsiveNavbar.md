# ResponsiveNavbar

**Category:** Navbar | **Type:** component

A fully responsive navbar component with mobile menu, submenus, user authentication support, and theme switching capabilities.

## 🏷️ Tags

`navbar`, `navigation`, `menu`, `responsive`, `authentication`, `theme-switching`

```tsx
"use client";
import React, { useState } from "react";
import { ResponsiveNavbar } from "@instincthub/react-ui";
import { NavLinkType, UserAreaLinkType } from "@instincthub/react-ui/types";

/**
 * Example component demonstrating various ways to use the ResponsiveNavbar
 */
const ResponsiveNavbarExamples = () => {
  const [currentExample, setCurrentExample] = useState<string>("basic");
  const [mockSession, setMockSession] = useState<any>(null);

  // Mock session data
  const mockSessionData = {
    expires: "2024-12-31T23:59:59.999Z",
    user: {
      name: {
        id: "123",
        email: "john.doe@example.com",
        first_name: "John",
        last_name: "Doe",
        full_name: "John Doe",
        picture: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
      },
    },
  };

  // Basic navigation links
  const basicNavLinks: NavLinkType[] = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
  ];

  // Advanced navigation with submenus
  const advancedNavLinks: NavLinkType[] = [
    { title: "Home", href: "/" },
    {
      title: "Products",
      href: "#",
      submenu: [
        { title: "Web Development", href: "/products/web", icon: "🌐" },
        { title: "Mobile Apps", href: "/products/mobile", icon: "📱" },
        { title: "Desktop Apps", href: "/products/desktop", icon: "💻" },
        { title: "API Services", href: "/products/api", icon: "🔌" },
      ],
    },
    {
      title: "Solutions",
      href: "#",
      submenu: [
        { title: "Enterprise", href: "/solutions/enterprise" },
        { title: "Startups", href: "/solutions/startups" },
        { title: "E-commerce", href: "/solutions/ecommerce" },
        { title: "Education", href: "/solutions/education" },
      ],
    },
    {
      title: "Resources",
      href: "#",
      submenu: [
        { title: "Documentation", href: "/docs" },
        { title: "Blog", href: "/blog" },
        { title: "Tutorials", href: "/tutorials" },
        {
          title: "GitHub",
          href: "https://github.com/instincthub",
          isExternal: true,
          icon: "🐙",
        },
      ],
    },
    { title: "Pricing", href: "/pricing", highlight: true },
  ];

  // User area links for authenticated users
  const userAreaLinks: UserAreaLinkType[] = [
    { title: "Dashboard", href: "/dashboard", icon: "🏠" },
    { title: "Projects", href: "/projects", icon: "📂" },
    {
      title: "Account",
      href: "#",
      icon: "👤",
      submenu: [
        { title: "Profile", href: "/profile" },
        { title: "Settings", href: "/settings" },
        { title: "Billing", href: "/billing" },
        { title: "Security", href: "/security" },
      ],
    },
    {
      title: "Help",
      href: "#",
      icon: "❓",
      submenu: [
        { title: "Support Center", href: "/support" },
        { title: "Contact Support", href: "/contact-support" },
        { title: "Feature Requests", href: "/feature-requests" },
        {
          title: "Community",
          href: "https://community.example.com",
          isExternal: true,
        },
      ],
    },
  ];

  // Authentication links for guests
  const authLinks: UserAreaLinkType[] = [
    { title: "Login", href: "/auth/login", isButton: false },
    {
      title: "Sign Up",
      href: "/auth/signup",
      isButton: true,
      buttonStyle: "primary",
    },
  ];

  // E-commerce navigation example
  const ecommerceNavLinks: NavLinkType[] = [
    { title: "Home", href: "/" },
    {
      title: "Shop",
      href: "/shop",
      submenu: [
        { title: "All Products", href: "/shop/all" },
        { title: "Electronics", href: "/shop/electronics", icon: "⚡" },
        { title: "Clothing", href: "/shop/clothing", icon: "👕" },
        { title: "Home & Garden", href: "/shop/home-garden", icon: "🏡" },
        { title: "Sports", href: "/shop/sports", icon: "⚽" },
      ],
    },
    { title: "Deals", href: "/deals", highlight: true },
    { title: "Categories", href: "/categories" },
    { title: "Customer Service", href: "/support" },
  ];

  // Dashboard navigation example
  const dashboardNavLinks: NavLinkType[] = [
    { title: "Overview", href: "/dashboard" },
    {
      title: "Analytics",
      href: "#",
      submenu: [
        { title: "Traffic", href: "/analytics/traffic", icon: "📊" },
        { title: "Sales", href: "/analytics/sales", icon: "💰" },
        { title: "Users", href: "/analytics/users", icon: "👥" },
        { title: "Performance", href: "/analytics/performance", icon: "⚡" },
      ],
    },
    {
      title: "Management",
      href: "#",
      submenu: [
        { title: "Users", href: "/manage/users" },
        { title: "Content", href: "/manage/content" },
        { title: "Settings", href: "/manage/settings" },
        { title: "Integrations", href: "/manage/integrations" },
      ],
    },
    { title: "Reports", href: "/reports" },
  ];

  // Corporate website navigation
  const corporateNavLinks: NavLinkType[] = [
    { title: "Home", href: "/" },
    {
      title: "About",
      href: "#",
      submenu: [
        { title: "Our Story", href: "/about/story" },
        { title: "Leadership", href: "/about/leadership" },
        { title: "Careers", href: "/about/careers" },
        { title: "Press", href: "/about/press" },
      ],
    },
    {
      title: "Services",
      href: "#",
      submenu: [
        { title: "Consulting", href: "/services/consulting" },
        { title: "Implementation", href: "/services/implementation" },
        { title: "Support", href: "/services/support" },
        { title: "Training", href: "/services/training" },
      ],
    },
    {
      title: "Industries",
      href: "#",
      submenu: [
        { title: "Healthcare", href: "/industries/healthcare" },
        { title: "Finance", href: "/industries/finance" },
        { title: "Manufacturing", href: "/industries/manufacturing" },
        { title: "Retail", href: "/industries/retail" },
      ],
    },
    { title: "Contact", href: "/contact" },
  ];

  const renderExample = () => {
    switch (currentExample) {
      case "basic":
        return (
          <ResponsiveNavbar
            session={null}
            logoSrc="https://via.placeholder.com/120x40/0066cc/ffffff?text=LOGO"
            logoAlt="Company Logo"
            navLinks={basicNavLinks}
            userAreaLinks={authLinks}
            theme="LightMode"
            containerClass="ihub-container"
          />
        );

      case "advanced":
        return (
          <ResponsiveNavbar
            session={mockSession}
            logoSrc="https://via.placeholder.com/120x40/0066cc/ffffff?text=BRAND"
            logoAlt="Advanced Brand Logo"
            navLinks={advancedNavLinks}
            userAreaLinks={mockSession ? userAreaLinks : authLinks}
            theme="LightMode"
            containerClass="ihub-container"
          />
        );

      case "ecommerce":
        return (
          <ResponsiveNavbar
            session={null}
            logoSrc="https://via.placeholder.com/120x40/e67e22/ffffff?text=SHOP"
            logoAlt="E-commerce Store"
            navLinks={ecommerceNavLinks}
            userAreaLinks={[
              { title: "Cart (3)", href: "/cart", icon: "🛒" },
              { title: "Wishlist", href: "/wishlist", icon: "❤️" },
              ...authLinks,
            ]}
            theme="LightMode"
            containerClass="ihub-container"
            topBanner={
              <div style={{ 
                background: "#e67e22", 
                color: "white", 
                textAlign: "center", 
                padding: "8px",
                fontSize: "14px"
              }}>
                🔥 Free shipping on orders over $50! Use code: FREESHIP
              </div>
            }
          />
        );

      case "dashboard":
        return (
          <ResponsiveNavbar
            session={mockSessionData}
            logoSrc="https://via.placeholder.com/120x40/9b59b6/ffffff?text=ADMIN"
            logoAlt="Admin Dashboard"
            navLinks={dashboardNavLinks}
            userAreaLinks={[
              { title: "Notifications", href: "/notifications", icon: "🔔" },
              ...userAreaLinks,
            ]}
            theme="DarkMode"
            containerClass="ihub-container"
          />
        );

      case "corporate":
        return (
          <ResponsiveNavbar
            session={null}
            logoSrc="https://via.placeholder.com/120x40/2c3e50/ffffff?text=CORP"
            logoAlt="Corporate Company"
            navLinks={corporateNavLinks}
            userAreaLinks={[
              { title: "Client Portal", href: "/portal", isButton: false },
              {
                title: "Get Quote",
                href: "/quote",
                isButton: true,
                buttonStyle: "primary",
              },
            ]}
            theme="LightMode"
            containerClass="ihub-container"
            topBanner={
              <div style={{ 
                background: "#34495e", 
                color: "white", 
                textAlign: "center", 
                padding: "8px",
                fontSize: "14px"
              }}>
                📢 We're hiring! Join our team - <a href="/careers" style={{color: "#3498db"}}>View open positions</a>
              </div>
            }
            bottomBanner={
              <div style={{ 
                background: "#ecf0f1", 
                textAlign: "center", 
                padding: "12px",
                fontSize: "13px",
                borderTop: "1px solid #bdc3c7"
              }}>
                🏆 Awarded "Best Service Provider 2024" by Industry Magazine
              </div>
            }
          />
        );

      case "with-banners":
        return (
          <ResponsiveNavbar
            session={null}
            logoSrc="https://via.placeholder.com/120x40/27ae60/ffffff?text=NEWS"
            logoAlt="News Website"
            navLinks={[
              { title: "Latest", href: "/" },
              { title: "World", href: "/world" },
              { title: "Politics", href: "/politics" },
              { title: "Business", href: "/business" },
              { title: "Tech", href: "/tech" },
              { title: "Sports", href: "/sports" },
            ]}
            userAreaLinks={authLinks}
            theme="LightMode"
            containerClass="ihub-container"
            topBanner={
              <div style={{ 
                background: "#e74c3c", 
                color: "white", 
                textAlign: "center", 
                padding: "8px",
                fontSize: "14px",
                fontWeight: "bold"
              }}>
                🔴 BREAKING: Major story developing - Click here for live updates
              </div>
            }
            bottomBanner={
              <div style={{ 
                background: "#3498db", 
                color: "white", 
                textAlign: "center", 
                padding: "10px",
                fontSize: "13px"
              }}>
                📰 Subscribe to our newsletter for daily news updates
              </div>
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="ihub-py-5">
      <h1>ResponsiveNavbar Examples</h1>
      <p>
        The ResponsiveNavbar component provides a complete navigation solution 
        with mobile responsiveness, authentication support, submenus, and theme switching.
      </p>

      <div
        className="ihub-d-flex ihub-py-4"
        style={{ gap: "12px", flexWrap: "wrap" }}
      >
        {/* Example Selection Buttons */}
        <button
          className={`${
            currentExample === "basic" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("basic")}
        >
          Basic Navbar
        </button>

        <button
          className={`${
            currentExample === "advanced" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("advanced")}
        >
          Advanced with Submenus
        </button>

        <button
          className={`${
            currentExample === "ecommerce" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("ecommerce")}
        >
          E-commerce Store
        </button>

        <button
          className={`${
            currentExample === "dashboard" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("dashboard")}
        >
          Admin Dashboard
        </button>

        <button
          className={`${
            currentExample === "corporate" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("corporate")}
        >
          Corporate Website
        </button>

        <button
          className={`${
            currentExample === "with-banners" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("with-banners")}
        >
          With Banners
        </button>
      </div>

      {/* Authentication Toggle */}
      <div className="ihub-py-3">
        <label style={{ marginRight: "16px" }}>
          <input
            type="checkbox"
            checked={!!mockSession}
            onChange={(e) => setMockSession(e.target.checked ? mockSessionData : null)}
            style={{ marginRight: "8px" }}
          />
          Simulate logged-in user
        </label>
      </div>

      {/* Example Description */}
      <div className="ihub-py-3">
        {currentExample === "basic" && (
          <div>
            <h3>Basic Navbar</h3>
            <p>
              Simple navigation with standard links and authentication buttons.
              Perfect for small websites and landing pages.
            </p>
            <ul>
              <li>Simple navigation links</li>
              <li>Login/signup buttons for guests</li>
              <li>Responsive mobile menu</li>
              <li>Theme switching support</li>
            </ul>
          </div>
        )}

        {currentExample === "advanced" && (
          <div>
            <h3>Advanced Navigation with Submenus</h3>
            <p>
              Comprehensive navigation with dropdown submenus, icons, external links,
              and user profile dropdown when authenticated.
            </p>
            <ul>
              <li>Multi-level dropdown submenus</li>
              <li>Icon support in navigation items</li>
              <li>External link handling</li>
              <li>User profile dropdown with sub-navigation</li>
              <li>Highlighted navigation items</li>
            </ul>
          </div>
        )}

        {currentExample === "ecommerce" && (
          <div>
            <h3>E-commerce Store Navigation</h3>
            <p>
              Navigation designed for online stores with product categories,
              shopping cart, promotional banner, and customer-focused links.
            </p>
            <ul>
              <li>Product category navigation</li>
              <li>Shopping cart and wishlist links</li>
              <li>Promotional top banner</li>
              <li>Deal highlights and special offers</li>
              <li>Customer service integration</li>
            </ul>
          </div>
        )}

        {currentExample === "dashboard" && (
          <div>
            <h3>Admin Dashboard Navigation</h3>
            <p>
              Professional navigation for admin panels and dashboards with
              analytics sections, management tools, and dark theme.
            </p>
            <ul>
              <li>Analytics and reporting sections</li>
              <li>Management tool navigation</li>
              <li>Notification center integration</li>
              <li>Dark theme enabled</li>
              <li>User profile with admin options</li>
            </ul>
          </div>
        )}

        {currentExample === "corporate" && (
          <div>
            <h3>Corporate Website Navigation</h3>
            <p>
              Professional corporate navigation with company information,
              services, industry solutions, and promotional banners.
            </p>
            <ul>
              <li>Company information sections</li>
              <li>Service and industry categories</li>
              <li>Top and bottom promotional banners</li>
              <li>Client portal and quote requests</li>
              <li>Professional branding elements</li>
            </ul>
          </div>
        )}

        {currentExample === "with-banners" && (
          <div>
            <h3>Navigation with Promotional Banners</h3>
            <p>
              News website navigation showcasing both top and bottom banner
              usage for announcements and subscriptions.
            </p>
            <ul>
              <li>Breaking news banner at top</li>
              <li>Newsletter subscription banner at bottom</li>
              <li>News category navigation</li>
              <li>Eye-catching color schemes</li>
              <li>Call-to-action integration</li>
            </ul>
          </div>
        )}
      </div>

      {/* Live Example */}
      <div className="ihub-mt-4">
        <h3>Live Example</h3>
        <div 
          style={{ 
            border: "2px dashed #ddd", 
            borderRadius: "8px", 
            overflow: "hidden",
            marginBottom: "20px"
          }}
        >
          {renderExample()}
        </div>
      </div>

      {/* Props Information */}
      <div className="ihub-mt-5">
        <h3>Key Features Demonstrated</h3>
        
        <h4>🔧 Navigation Structure</h4>
        <ul>
          <li><strong>Simple Links:</strong> Direct navigation to pages</li>
          <li><strong>Dropdown Submenus:</strong> Organized hierarchical navigation</li>
          <li><strong>External Links:</strong> Links that open in new tabs</li>
          <li><strong>Highlighted Items:</strong> Special styling for important links</li>
          <li><strong>Icons:</strong> Visual indicators for navigation items</li>
        </ul>

        <h4>🎨 Visual Customization</h4>
        <ul>
          <li><strong>Logo Support:</strong> Brand logo with alt text</li>
          <li><strong>Theme Switching:</strong> Light/dark mode toggle</li>
          <li><strong>Container Classes:</strong> Custom styling support</li>
          <li><strong>Top/Bottom Banners:</strong> Promotional content areas</li>
          <li><strong>Responsive Design:</strong> Mobile-optimized hamburger menu</li>
        </ul>

        <h4>👤 Authentication Integration</h4>
        <ul>
          <li><strong>Guest State:</strong> Login/signup buttons for unauthenticated users</li>
          <li><strong>User Profile:</strong> Avatar and name display when logged in</li>
          <li><strong>User Dropdown:</strong> Account management and settings</li>
          <li><strong>Auto Signout:</strong> Logout functionality</li>
          <li><strong>User Area Links:</strong> Customizable user-specific navigation</li>
        </ul>

        <h4>📱 Mobile Responsiveness</h4>
        <ul>
          <li><strong>Hamburger Menu:</strong> Collapsible navigation on mobile</li>
          <li><strong>Touch-friendly:</strong> Optimized for mobile interactions</li>
          <li><strong>Viewport Adaptation:</strong> Automatic layout adjustments</li>
          <li><strong>Overlay Management:</strong> Click-outside-to-close behavior</li>
          <li><strong>Scroll Effects:</strong> Dynamic styling based on scroll position</li>
        </ul>

        <h4>⚡ Interactive Features</h4>
        <ul>
          <li><strong>Submenu Toggles:</strong> Smooth dropdown animations</li>
          <li><strong>Outside Click:</strong> Automatic menu closing</li>
          <li><strong>Keyboard Navigation:</strong> Accessibility support</li>
          <li><strong>State Management:</strong> Proper menu state handling</li>
          <li><strong>Event Handling:</strong> Custom click and navigation events</li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveNavbarExamples;
```

## 🔗 Related Components

- [ChannelListAvatar](./ChannelListAvatar.md) - Channel list avatar component
- [MenuDropdown](./MenuDropdown.md) - Menu dropdown component
- [Breadcrumb](./Breadcrumb.md) - Breadcrumb component
- [SideNavbar](./SideNavbar.md) - Side navbar component
- [SideNavbarContext](./SideNavbarContext.md) - Context provider for side navigation state management


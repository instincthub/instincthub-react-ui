# ResponsiveNavbar

**Category:** Navbar | **Type:** component

A fully responsive navbar component with mobile menu, submenus, user authentication support, theme switching capabilities, controlled dropdown state, and custom dropdown rendering.

## 🏷️ Tags

`navbar`, `navigation`, `menu`, `responsive`, `authentication`, `theme-switching`, `controlled-dropdown`, `custom-render`

```tsx
"use client";
import React, { useState } from "react";
import { ResponsiveNavbar } from "@instincthub/react-ui";
import { 
  NavLinkType, 
  UserAreaLinkType,
  DropdownRenderProps 
} from "@instincthub/react-ui/types";

/**
 * Example component demonstrating various ways to use the ResponsiveNavbar
 */
const ResponsiveNavbarExamples = () => {
  const [currentExample, setCurrentExample] = useState<string>("basic");
  const [mockSession, setMockSession] = useState<any>(null);
  const [controlledDropdown, setControlledDropdown] = useState<boolean>(false);
  const [useCustomDropdown, setUseCustomDropdown] = useState<boolean>(false);

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

      case "controlled":
        return (
          <ResponsiveNavbar
            session={mockSessionData}
            logoSrc="https://via.placeholder.com/120x40/8e44ad/ffffff?text=CTRL"
            logoAlt="Controlled Dropdown"
            navLinks={basicNavLinks}
            userAreaLinks={userAreaLinks}
            theme="LightMode"
            containerClass="ihub-container"
            userDropdownOpen={controlledDropdown}
            onUserDropdownToggle={(isOpen) => {
              console.log("Dropdown toggled:", isOpen);
              setControlledDropdown(isOpen);
            }}
          />
        );

      case "custom-dropdown":
        const renderCustomDropdown = ({ user, closeDropdown }: DropdownRenderProps) => (
          <div style={{
            padding: "1rem",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "8px",
            minWidth: "280px",
          }}>
            {/* Custom Header */}
            <div style={{
              borderBottom: "1px solid var(--border-color)",
              paddingBottom: "1rem",
              marginBottom: "1rem",
            }}>
              <h4 style={{ margin: 0, marginBottom: "0.5rem" }}>
                👋 Welcome back!
              </h4>
              <p style={{ margin: 0, fontSize: "0.875rem", opacity: 0.7 }}>
                {user?.email || "user@example.com"}
              </p>
            </div>

            {/* Quick Actions Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem",
              marginBottom: "1rem",
            }}>
              <button 
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#3498db",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
                onClick={() => {
                  alert("Dashboard clicked!");
                  closeDropdown();
                }}
              >
                <span>📊</span>
                <span style={{ fontSize: "0.75rem" }}>Dashboard</span>
              </button>
              <button 
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#2ecc71",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
                onClick={() => {
                  alert("Projects clicked!");
                  closeDropdown();
                }}
              >
                <span>📁</span>
                <span style={{ fontSize: "0.75rem" }}>Projects</span>
              </button>
              <button 
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#9b59b6",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
                onClick={() => {
                  alert("Settings clicked!");
                  closeDropdown();
                }}
              >
                <span>⚙️</span>
                <span style={{ fontSize: "0.75rem" }}>Settings</span>
              </button>
              <button 
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#e67e22",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
                onClick={() => {
                  alert("Support clicked!");
                  closeDropdown();
                }}
              >
                <span>❓</span>
                <span style={{ fontSize: "0.75rem" }}>Support</span>
              </button>
            </div>

            {/* Progress Section */}
            <div style={{
              padding: "0.75rem",
              backgroundColor: "var(--bg-tertiary)",
              borderRadius: "4px",
              marginBottom: "1rem",
            }}>
              <div style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                Storage Used: 2.5 GB / 10 GB
              </div>
              <div style={{
                height: "8px",
                backgroundColor: "var(--bg-primary)",
                borderRadius: "4px",
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: "25%",
                  backgroundColor: "#3498db",
                  borderRadius: "4px",
                }} />
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => {
                alert("Signing out...");
                closeDropdown();
              }}
            >
              Sign Out
            </button>
          </div>
        );

        return (
          <ResponsiveNavbar
            session={mockSessionData}
            logoSrc="https://via.placeholder.com/120x40/e74c3c/ffffff?text=CUSTOM"
            logoAlt="Custom Dropdown"
            navLinks={basicNavLinks}
            userAreaLinks={userAreaLinks}
            theme="LightMode"
            containerClass="ihub-container"
            renderUserDropdown={renderCustomDropdown}
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

        <button
          className={`${
            currentExample === "controlled" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("controlled")}
        >
          Controlled Dropdown
        </button>

        <button
          className={`${
            currentExample === "custom-dropdown" ? "ihub-important-btn" : "ihub-outlined-btn"
          }`}
          onClick={() => setCurrentExample("custom-dropdown")}
        >
          Custom Dropdown
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

        {currentExample === "controlled" && (
          <div>
            <h3>Controlled Dropdown State</h3>
            <p>
              Demonstrates external control of the user dropdown state using boolean props.
              The dropdown can be controlled programmatically from parent components.
            </p>
            <ul>
              <li>External dropdown state management</li>
              <li>Programmatic open/close control</li>
              <li>State synchronization with parent</li>
              <li>Callback on dropdown toggle</li>
              <li>Useful for complex state management scenarios</li>
            </ul>
            <div style={{ marginTop: "1rem", padding: "1rem", backgroundColor: "#f0f0f0", borderRadius: "4px" }}>
              <strong>Controlled State:</strong>
              <button
                style={{
                  marginLeft: "1rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: controlledDropdown ? "#e74c3c" : "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setControlledDropdown(!controlledDropdown)}
              >
                {controlledDropdown ? "Close Dropdown" : "Open Dropdown"}
              </button>
              <span style={{ marginLeft: "1rem" }}>
                Status: {controlledDropdown ? "🟢 Open" : "🔴 Closed"}
              </span>
            </div>
          </div>
        )}

        {currentExample === "custom-dropdown" && (
          <div>
            <h3>Custom Dropdown Rendering</h3>
            <p>
              Shows how to completely customize the dropdown content using a render function.
              This allows for unique layouts, custom styling, and interactive elements.
            </p>
            <ul>
              <li>Custom dropdown layout and design</li>
              <li>Quick action buttons grid</li>
              <li>Progress indicators and stats</li>
              <li>Custom styling and animations</li>
              <li>Full control over dropdown behavior</li>
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
          <li><strong>Controlled Dropdown:</strong> External state control via props</li>
          <li><strong>Custom Rendering:</strong> Fully customizable dropdown content</li>
        </ul>

        <h4>🎯 Advanced Features (New)</h4>
        <ul>
          <li><strong>Controlled Mode:</strong> <code>userDropdownOpen</code> and <code>onUserDropdownToggle</code> props for external control</li>
          <li><strong>Custom Dropdown:</strong> <code>renderUserDropdown</code> prop for custom dropdown content</li>
          <li><strong>Dropdown Render Props:</strong> Access to user, toggle functions, and state</li>
          <li><strong>Backward Compatible:</strong> Works with existing implementations</li>
          <li><strong>Flexible Integration:</strong> Supports both controlled and uncontrolled modes</li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveNavbarExamples;
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `session` | `SessionType \| null` | Required | User session object for authentication |
| `logoSrc` | `string` | Required | URL or path to the logo image |
| `logoAlt` | `string` | `"Company Logo"` | Alt text for the logo |
| `navLinks` | `NavLinkType[]` | Required | Array of navigation links |
| `userAreaLinks` | `UserAreaLinkType[]` | `[]` | Links for user area (dropdown or auth buttons) |
| `theme` | `"LightMode" \| "DarkMode"` | `"LightMode"` | Initial theme setting |
| `containerClass` | `string` | `"ihub-container"` | CSS class for the container |
| `topBanner` | `React.ReactNode` | `null` | Content for top banner |
| `bottomBanner` | `React.ReactNode` | `null` | Content for bottom banner |
| `hideTopBanner` | `boolean` | `false` | Hide the top banner |
| `hideBottomBanner` | `boolean` | `false` | Hide the bottom banner |
| **`userDropdownOpen`** | `boolean` | `undefined` | **NEW: Controlled dropdown state** |
| **`onUserDropdownToggle`** | `(isOpen: boolean) => void` | `undefined` | **NEW: Callback when dropdown toggles** |
| **`renderUserDropdown`** | `(props: DropdownRenderProps) => ReactNode` | `undefined` | **NEW: Custom dropdown renderer** |

### Type Definitions

#### NavLinkType
```typescript
interface NavLinkType {
  title: string;
  href: string;
  isExternal?: boolean;
  highlight?: boolean;
  submenu?: SubMenuItemType[];
}
```

#### UserAreaLinkType
```typescript
interface UserAreaLinkType {
  title: string;
  href: string;
  isExternal?: boolean;
  icon?: string | React.ReactNode;
  isButton?: boolean;
  buttonStyle?: "primary" | "outline";
  submenu?: UserSubMenuItemType[];
}
```

#### DropdownRenderProps (NEW)
```typescript
interface DropdownRenderProps {
  user: any;                    // User object from session
  isOpen: boolean;              // Current dropdown state
  toggleDropdown: () => void;   // Toggle dropdown function
  closeDropdown: () => void;    // Close dropdown function
}
```

### Usage Examples

#### Basic Usage
```tsx
<ResponsiveNavbar
  session={session}
  logoSrc="/logo.png"
  navLinks={navLinks}
  userAreaLinks={userAreaLinks}
/>
```

#### Controlled Dropdown
```tsx
const [dropdownOpen, setDropdownOpen] = useState(false);

<ResponsiveNavbar
  session={session}
  logoSrc="/logo.png"
  navLinks={navLinks}
  userAreaLinks={userAreaLinks}
  userDropdownOpen={dropdownOpen}
  onUserDropdownToggle={(isOpen) => setDropdownOpen(isOpen)}
/>
```

#### Custom Dropdown Content
```tsx
const renderCustomDropdown = ({ user, closeDropdown }) => (
  <div className="custom-dropdown">
    <h3>Welcome, {user.name}!</h3>
    <button onClick={() => handleAction(closeDropdown)}>
      Custom Action
    </button>
    <a href="/signout" onClick={closeDropdown}>
      Sign Out
    </a>
  </div>
);

<ResponsiveNavbar
  session={session}
  logoSrc="/logo.png"
  navLinks={navLinks}
  renderUserDropdown={renderCustomDropdown}
/>
```

#### Combined Controlled + Custom
```tsx
<ResponsiveNavbar
  session={session}
  logoSrc="/logo.png"
  navLinks={navLinks}
  userDropdownOpen={dropdownOpen}
  onUserDropdownToggle={setDropdownOpen}
  renderUserDropdown={({ user, closeDropdown }) => (
    <CustomDropdown user={user} onClose={closeDropdown} />
  )}
/>
```

## 🔗 Related Components

- [ChannelListAvatar](./ChannelListAvatar.md) - Channel list avatar component
- [MenuDropdown](./MenuDropdown.md) - Menu dropdown component
- [Breadcrumb](./Breadcrumb.md) - Breadcrumb component
- [SideNavbar](./SideNavbar.md) - Side navbar component
- [SideNavbarContext](./SideNavbarContext.md) - Context provider for side navigation state management


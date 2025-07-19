# Breadcrumb

**Category:** Navbar | **Type:** component

SEO-friendly breadcrumb navigation component that automatically generates breadcrumbs from the current URL path with customizable labels and exclusions.

## 🏷️ Tags

`navbar`, `navigation`, `breadcrumb`, `seo`

```tsx
"use client";
import React, { useState } from "react";
import { Breadcrumb } from "@instincthub/react-ui";
import Link from "next/link";

/**
 * Example component demonstrating various ways to use the Breadcrumb component
 */
const BreadcrumbExamples = () => {
  const [currentPath, setCurrentPath] = useState("/products/electronics/laptops");

  // Different path mapping configurations for various scenarios
  const ecommercePathMapping = {
    products: "Products",
    electronics: "Electronics",
    laptops: "Laptops",
    "gaming-laptops": "Gaming Laptops",
    "macbook-pro": "MacBook Pro",
    cart: "Shopping Cart",
    checkout: "Checkout",
    "order-confirmation": "Order Confirmation"
  };

  const docsPathMapping = {
    docs: "Documentation",
    "getting-started": "Getting Started",
    components: "Components",
    forms: "Form Components",
    navbar: "Navigation",
    examples: "Examples",
    "advanced-usage": "Advanced Usage"
  };

  const dashboardPathMapping = {
    dashboard: "Dashboard",
    analytics: "Analytics",
    reports: "Reports",
    settings: "Settings",
    "user-management": "User Management",
    profile: "Profile Settings",
    billing: "Billing & Subscriptions"
  };

  const blogPathMapping = {
    blog: "Blog",
    category: "Categories",
    "web-development": "Web Development",
    "react-tutorials": "React Tutorials",
    "javascript-tips": "JavaScript Tips",
    "2024": "2024 Posts",
    "january": "January"
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Breadcrumb Navigation Examples</h1>

      {/* Basic Breadcrumb */}
      <section className="ihub-mb-5">
        <h2>1. Basic Breadcrumb (Default)</h2>
        <p>
          Automatically generates breadcrumbs from the current URL path with 
          default capitalization and formatting.
        </p>
        <div className="ihub-example-container">
          <Breadcrumb />
          <small className="ihub-text-muted ihub-mt-2 ihub-d-block">
            Current path: {typeof window !== 'undefined' ? window.location.pathname : '/components/navbars/breadcrumb'}
          </small>
        </div>
      </section>

      {/* Custom Home Label */}
      <section className="ihub-mb-5">
        <h2>2. Custom Home Label</h2>
        <p>Customize the home link label for different application contexts.</p>
        <div className="ihub-example-container">
          <Breadcrumb homeLabel="Dashboard" />
          <div className="ihub-mt-3">
            <Breadcrumb homeLabel="Store" />
          </div>
          <div className="ihub-mt-3">
            <Breadcrumb homeLabel="Portal" />
          </div>
        </div>
      </section>

      {/* E-commerce Navigation */}
      <section className="ihub-mb-5">
        <h2>3. E-commerce Navigation</h2>
        <p>
          Perfect for online stores with product categories, cart, and checkout flows.
        </p>
        <div className="ihub-example-container">
          {/* Product Category Breadcrumb */}
          <div className="ihub-mb-3">
            <h4>Product Category Navigation</h4>
            <Breadcrumb
              homeLabel="Store"
              pathMapping={ecommercePathMapping}
            />
            <small className="ihub-text-muted">
              Example: Store → Products → Electronics → Laptops
            </small>
          </div>

          {/* Shopping Cart Flow */}
          <div className="ihub-mb-3">
            <h4>Shopping Cart Flow</h4>
            <Breadcrumb
              homeLabel="Shop"
              pathMapping={{
                ...ecommercePathMapping,
                cart: "🛒 Cart",
                checkout: "💳 Checkout",
                "order-confirmation": "✅ Order Complete"
              }}
            />
            <small className="ihub-text-muted">
              Enhanced with emojis for better UX
            </small>
          </div>
        </div>
      </section>

      {/* Documentation Navigation */}
      <section className="ihub-mb-5">
        <h2>4. Documentation Navigation</h2>
        <p>
          Ideal for documentation sites with hierarchical content structure.
        </p>
        <div className="ihub-example-container">
          <Breadcrumb
            homeLabel="Docs Home"
            pathMapping={docsPathMapping}
            className="ihub-breadcrumb-docs"
          />
          <small className="ihub-text-muted ihub-mt-2 ihub-d-block">
            Great for API docs, component libraries, and guides
          </small>
        </div>
      </section>

      {/* Dashboard/Admin Navigation */}
      <section className="ihub-mb-5">
        <h2>5. Dashboard/Admin Navigation</h2>
        <p>
          Professional breadcrumbs for admin panels and dashboard interfaces.
        </p>
        <div className="ihub-example-container">
          <Breadcrumb
            homeLabel="Admin Panel"
            pathMapping={dashboardPathMapping}
          />
          <div className="ihub-mt-3">
            <Breadcrumb
              homeLabel="Control Center"
              pathMapping={dashboardPathMapping}
              className="ihub-breadcrumb-admin"
            />
          </div>
        </div>
      </section>

      {/* Blog/Content Navigation */}
      <section className="ihub-mb-5">
        <h2>6. Blog/Content Navigation</h2>
        <p>
          Organized breadcrumbs for blogs, news sites, and content management.
        </p>
        <div className="ihub-example-container">
          <Breadcrumb
            homeLabel="Content Hub"
            pathMapping={blogPathMapping}
          />
          <small className="ihub-text-muted ihub-mt-2 ihub-d-block">
            Example: Content Hub → Blog → Web Development → React Tutorials
          </small>
        </div>
      </section>

      {/* Excluding Paths */}
      <section className="ihub-mb-5">
        <h2>7. Excluding Specific Paths</h2>
        <p>
          Hide certain path segments from breadcrumbs (like IDs, auth routes, etc.).
        </p>
        <div className="ihub-example-container">
          <div className="ihub-mb-3">
            <h4>Excluding Auth Routes</h4>
            <Breadcrumb
              pathMapping={docsPathMapping}
              excludePaths={["auth", "login", "register"]}
            />
            <small className="ihub-text-muted">
              Auth-related paths are hidden from navigation
            </small>
          </div>

          <div className="ihub-mb-3">
            <h4>Excluding IDs and Technical Paths</h4>
            <Breadcrumb
              homeLabel="Store"
              pathMapping={ecommercePathMapping}
              excludePaths={["api", "v1", "internal"]}
            />
            <small className="ihub-text-muted">
              API routes and version numbers are excluded
            </small>
          </div>
        </div>
      </section>

      {/* Styled Variants */}
      <section className="ihub-mb-5">
        <h2>8. Styled Variants</h2>
        <p>
          Apply different visual styles using CSS classes for various designs.
        </p>
        <div className="ihub-example-container">
          {/* Default Style */}
          <div className="ihub-mb-3">
            <h4>Default Style</h4>
            <Breadcrumb
              pathMapping={ecommercePathMapping}
            />
          </div>

          {/* Custom Styled */}
          <div className="ihub-mb-3">
            <h4>Custom Styled (with className)</h4>
            <Breadcrumb
              pathMapping={ecommercePathMapping}
              className="ihub-breadcrumb-custom"
            />
            <small className="ihub-text-muted">
              Add custom CSS classes for unique styling
            </small>
          </div>
        </div>
      </section>

      {/* Complex Multi-level Navigation */}
      <section className="ihub-mb-5">
        <h2>9. Complex Multi-level Navigation</h2>
        <p>
          Handle deep navigation structures with comprehensive path mapping.
        </p>
        <div className="ihub-example-container">
          <Breadcrumb
            homeLabel="Learning Platform"
            pathMapping={{
              courses: "All Courses",
              "web-development": "Web Development Track",
              "frontend": "Frontend Development",
              "react": "React.js Course",
              "module-1": "Module 1: Basics",
              "lesson-3": "Lesson 3: Components",
              "exercise": "Practice Exercise"
            }}
          />
          <small className="ihub-text-muted ihub-mt-2 ihub-d-block">
            Example: Learning Platform → All Courses → Web Development → 
            React.js → Module 1 → Lesson 3 → Exercise
          </small>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="ihub-mb-5">
        <h2>10. Accessibility Features</h2>
        <p>
          Built-in accessibility features for screen readers and keyboard navigation.
        </p>
        <div className="ihub-example-container">
          <Breadcrumb
            homeLabel="Accessible Site"
            pathMapping={{
              accessibility: "Accessibility Features",
              "screen-reader": "Screen Reader Support",
              navigation: "Keyboard Navigation"
            }}
          />
          <div className="ihub-mt-3">
            <h4>Accessibility Features:</h4>
            <ul>
              <li>Proper ARIA labels (<code>aria-label="Breadcrumb"</code>)</li>
              <li>Semantic HTML structure with <code>&lt;nav&gt;</code> and <code>&lt;ul&gt;</code></li>
              <li>Current page indicated with appropriate styling</li>
              <li>Keyboard navigation support</li>
              <li>Screen reader friendly link text</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Real-world Integration Example */}
      <section className="ihub-mb-5">
        <h2>11. Real-world Integration</h2>
        <p>
          Complete example showing how to integrate breadcrumbs in a real application.
        </p>
        <div className="ihub-example-container">
          <div className="ihub-card">
            <div className="ihub-card-header">
              <h3>InstinctHub Learning Platform</h3>
            </div>
            <div className="ihub-card-body">
              <Breadcrumb
                homeLabel="InstinctHub"
                pathMapping={{
                  courses: "📚 Courses",
                  "full-stack": "Full Stack Development",
                  "javascript": "JavaScript Mastery",
                  "advanced": "Advanced Concepts",
                  promises: "Promises & Async/Await",
                  quiz: "📝 Knowledge Check"
                }}
                className="ihub-breadcrumb-learning"
              />
              
              <div className="ihub-mt-4">
                <h4>Course Content</h4>
                <p>
                  This breadcrumb helps students understand their current 
                  location in the learning path and easily navigate back 
                  to previous sections.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Implementation Notes */}
      <section className="ihub-mb-5">
        <h2>12. Technical Implementation</h2>
        <div className="ihub-alert ihub-alert-info">
          <h4>Implementation Details:</h4>
          <ul>
            <li><strong>Automatic Path Detection:</strong> Uses Next.js <code>usePathname()</code> hook</li>
            <li><strong>Smart Formatting:</strong> Converts kebab-case to Title Case automatically</li>
            <li><strong>Performance:</strong> Only renders when not on homepage (<code>/</code>)</li>
            <li><strong>SEO Benefits:</strong> Improves site structure and navigation</li>
            <li><strong>Responsive:</strong> Works on all screen sizes</li>
          </ul>
        </div>

        <div className="ihub-alert ihub-alert-warning ihub-mt-3">
          <h4>CSS Classes Used:</h4>
          <ul>
            <li><code>.ihub-breadcrumb-container</code> - Main navigation wrapper</li>
            <li><code>.ihub-breadcrumb</code> - Breadcrumb list styling</li>
            <li><code>.ihub-breadcrumb-active</code> - Current page styling</li>
          </ul>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="ihub-mb-5">
        <h2>13. Quick Reference</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6">
            <h4>Props</h4>
            <table className="ihub-table">
              <thead>
                <tr>
                  <th>Prop</th>
                  <th>Type</th>
                  <th>Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>homeLabel</code></td>
                  <td>string</td>
                  <td>"Home"</td>
                </tr>
                <tr>
                  <td><code>pathMapping</code></td>
                  <td>Record&lt;string, string&gt;</td>
                  <td>{`{}`}</td>
                </tr>
                <tr>
                  <td><code>excludePaths</code></td>
                  <td>string[]</td>
                  <td>[]</td>
                </tr>
                <tr>
                  <td><code>className</code></td>
                  <td>string</td>
                  <td>""</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="ihub-col-md-6">
            <h4>Common Use Cases</h4>
            <ul>
              <li>🛒 E-commerce product navigation</li>
              <li>📚 Documentation sites</li>
              <li>⚙️ Admin dashboards</li>
              <li>📝 Blog/CMS navigation</li>
              <li>🎓 Learning platforms</li>
              <li>🏢 Corporate websites</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BreadcrumbExamples;
```

## 🔗 Related Components

- [ChannelListAvatar](./ChannelListAvatar.md) - Channel list avatar component
- [MenuDropdown](./MenuDropdown.md) - Menu dropdown component
- [ResponsiveNavbar](./ResponsiveNavbar.md) - Responsive navbar component
- [SideNavbar](./SideNavbar.md) - Side navbar component
- [SideNavbarContext](./SideNavbarContext.md) - Context provider for side navigation state management


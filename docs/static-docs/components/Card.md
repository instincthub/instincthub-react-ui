# Card

**Category:** UI | **Type:** component

A versatile card component that serves as a container for content, featuring headers, footers, accent colors, and various styling options. Perfect for displaying information in a structured, visually appealing format.

## 🏷️ Tags

`ui`, `card`, `container`, `layout`

```tsx
"use client";
import React, { useState } from "react";
import {
  Card,
  MediaCard,
  ProfileCard,
  FeatureCard,
  PricingCard,
  HorizontalCard,
  CardGrid,
  CardList,
} from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the Card components
 */
const CardExamples = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  // Sample data for examples
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Lead Developer",
      bio: "Full-stack developer with 8 years of experience in React and Node.js",
      imageUrl: "https://i.pravatar.cc/150?img=1",
      socialLinks: [
        { icon: "🔗", url: "https://linkedin.com", label: "LinkedIn" },
        { icon: "📧", url: "mailto:sarah@example.com", label: "Email" },
      ],
    },
    {
      name: "Mike Chen",
      role: "UX Designer",
      bio: "Creative designer focused on user-centered design principles",
      imageUrl: "https://i.pravatar.cc/150?img=3",
      socialLinks: [
        { icon: "🎨", url: "https://dribbble.com", label: "Dribbble" },
        { icon: "📧", url: "mailto:mike@example.com", label: "Email" },
      ],
    },
  ];

  const features = [
    {
      icon: "🚀",
      title: "Fast Performance",
      description: "Lightning-fast load times with optimized code and caching",
    },
    {
      icon: "🔒",
      title: "Secure by Default",
      description: "Built-in security features to protect your data",
    },
    {
      icon: "📱",
      title: "Mobile Responsive",
      description: "Works seamlessly across all device sizes",
    },
    {
      icon: "🎨",
      title: "Customizable",
      description: "Easily customize colors, fonts, and layouts",
    },
  ];

  const pricingPlans = [
    {
      title: "Starter",
      price: "$9",
      period: "per month",
      features: ["10 Projects", "2 GB Storage", "Email Support"],
      buttonText: "Get Started",
    },
    {
      title: "Professional",
      price: "$29",
      period: "per month",
      features: [
        "Unlimited Projects",
        "100 GB Storage",
        "Priority Support",
        "Advanced Analytics",
      ],
      recommended: true,
      buttonText: "Most Popular",
    },
    {
      title: "Enterprise",
      price: "$99",
      period: "per month",
      features: [
        "Everything in Pro",
        "Unlimited Storage",
        "24/7 Support",
        "Custom Integrations",
        "SLA Guarantee",
      ],
      buttonText: "Contact Sales",
    },
  ];

  const products = [
    {
      title: "Premium Headphones",
      description: "High-quality wireless headphones with noise cancellation",
      price: "$299",
      imageUrl: "https://picsum.photos/300/200?random=1",
      badge: { text: "New", color: "green" },
    },
    {
      title: "Smart Watch",
      description: "Track your fitness and stay connected on the go",
      price: "$199",
      imageUrl: "https://picsum.photos/300/200?random=2",
      badge: { text: "Sale", color: "red" },
    },
    {
      title: "Wireless Keyboard",
      description: "Ergonomic keyboard with customizable backlighting",
      price: "$89",
      imageUrl: "https://picsum.photos/300/200?random=3",
    },
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>Card Component Examples</h1>

      {/* Basic Card Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Cards</h2>
        <div className="ihub-row">
          {/* Simple Card */}
          <div className="ihub-col-md-4 ihub-mb-3">
            <Card title="Simple Card">
              <p>
                This is a basic card with a title and simple content. Cards are
                great for organizing information into digestible chunks.
              </p>
            </Card>
          </div>

          {/* Card with Footer */}
          <div className="ihub-col-md-4 ihub-mb-3">
            <Card
              title="Card with Footer"
              footer={
                <div className="ihub-d-flex ihub-justify-content-between">
                  <span>Updated 2 hours ago</span>
                  <button className="ihub-link-btn">Learn More →</button>
                </div>
              }
            >
              <p>This card includes a footer section for additional actions or metadata.</p>
            </Card>
          </div>

          {/* Card with Accent Header */}
          <div className="ihub-col-md-4 ihub-mb-3">
            <Card title="Accent Header Card" accentHeader={true}>
              <p>The accent header adds a colorful bar to make the card stand out.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Accent Color Variants */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Accent Color Variants</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-3 ihub-mb-3">
            <Card title="Cyan Accent" accent="cyan">
              <p>Cards can have different accent colors to match your theme.</p>
            </Card>
          </div>
          <div className="ihub-col-md-3 ihub-mb-3">
            <Card title="Rose Accent" accent="rose">
              <p>Use rose for important or featured content.</p>
            </Card>
          </div>
          <div className="ihub-col-md-3 ihub-mb-3">
            <Card title="Green Accent" accent="green">
              <p>Green works well for success states or eco-friendly content.</p>
            </Card>
          </div>
          <div className="ihub-col-md-3 ihub-mb-3">
            <Card title="Purple Accent" accent="purple">
              <p>Purple adds a premium feel to your cards.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive Cards */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Interactive Cards</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-4 ihub-mb-3">
            <Card
              title="Clickable Card"
              onClick={() => setSelectedCard("card1")}
              className="ihub-cursor-pointer"
              style={{ transition: "transform 0.2s" }}
            >
              <p>Click this card to select it. Great for selection interfaces.</p>
              {selectedCard === "card1" && (
                <div className="ihub-mt-2 ihub-text-success">✓ Selected</div>
              )}
            </Card>
          </div>
          <div className="ihub-col-md-4 ihub-mb-3">
            <Card
              title="No Border Card"
              border={false}
              shadow={true}
            >
              <p>This card has no border but maintains the shadow for depth.</p>
            </Card>
          </div>
          <div className="ihub-col-md-4 ihub-mb-3">
            <Card
              title="Flat Card"
              border={true}
              shadow={false}
            >
              <p>A flat card with border but no shadow for a minimalist look.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Dark Theme Cards */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Dark Theme Cards</h2>
        <div className="ihub-row">
          <div className="ihub-col-md-6 ihub-mb-3">
            <Card
              title="Dark Theme Card"
              darkTheme={true}
              accent="cyan"
              footer={<span>Dark mode enabled</span>}
            >
              <p>Cards can be styled for dark themes with proper contrast and readability.</p>
              <ul className="ihub-mt-2">
                <li>High contrast text</li>
                <li>Subtle borders</li>
                <li>Dark background</li>
              </ul>
            </Card>
          </div>
          <div className="ihub-col-md-6 ihub-mb-3">
            <Card
              title="Dark Card with Custom Styling"
              darkTheme={true}
              className="ihub-bg-gradient"
              style={{ background: "linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)" }}
            >
              <p>Combine dark theme with custom styles for unique effects.</p>
              <div className="ihub-mt-3">
                <button className="ihub-primary-btn">Action Button</button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Media Cards */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Media Cards - Product Showcase</h2>
        <div className="ihub-row">
          {products.map((product, index) => (
            <div key={index} className="ihub-col-md-4 ihub-mb-3">
              <MediaCard
                title={product.title}
                imageUrl={product.imageUrl}
                imageAlt={product.title}
                badge={product.badge}
                footer={
                  <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                    <span className="ihub-h4 ihub-mb-0">{product.price}</span>
                    <button className="ihub-primary-btn">Add to Cart</button>
                  </div>
                }
              >
                <p>{product.description}</p>
              </MediaCard>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Cards */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Profile Cards - Team Members</h2>
        <div className="ihub-row">
          {teamMembers.map((member, index) => (
            <div key={index} className="ihub-col-md-6 ihub-mb-3">
              <ProfileCard
                name={member.name}
                role={member.role}
                bio={member.bio}
                imageUrl={member.imageUrl}
                socialLinks={member.socialLinks}
                accent="purple"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Feature Cards</h2>
        <CardGrid>
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={<span style={{ fontSize: "2rem" }}>{feature.icon}</span>}
              title={feature.title}
              description={feature.description}
              accent={["cyan", "rose", "green", "purple"][index % 4] as any}
            />
          ))}
        </CardGrid>
      </section>

      {/* Pricing Cards */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Pricing Cards</h2>
        <div className="ihub-row">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="ihub-col-md-4 ihub-mb-3">
              <PricingCard
                title={plan.title}
                price={plan.price}
                period={plan.period}
                features={plan.features}
                buttonText={plan.buttonText}
                recommended={plan.recommended}
                onButtonClick={() => console.log(`Selected ${plan.title} plan`)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Horizontal Cards */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Horizontal Cards - Blog Posts</h2>
        <CardList>
          <HorizontalCard
            title="Getting Started with React Hooks"
            imageUrl="https://picsum.photos/200/150?random=4"
            imageAlt="React Hooks"
            footer={
              <div className="ihub-text-muted">
                <small>By John Doe • 5 min read</small>
              </div>
            }
          >
            <p>
              Learn the fundamentals of React Hooks and how they can simplify
              your component logic. This comprehensive guide covers useState,
              useEffect, and custom hooks.
            </p>
          </HorizontalCard>

          <HorizontalCard
            title="Building Scalable Applications"
            imageUrl="https://picsum.photos/200/150?random=5"
            imageAlt="Scalable Apps"
            accent="green"
            footer={
              <div className="ihub-text-muted">
                <small>By Jane Smith • 8 min read</small>
              </div>
            }
          >
            <p>
              Discover best practices for building applications that can grow
              with your business. Topics include architecture patterns,
              performance optimization, and deployment strategies.
            </p>
          </HorizontalCard>
        </CardList>
      </section>

      {/* Complex Card Layouts */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Complex Card Layouts</h2>
        <div className="ihub-row">
          {/* Statistics Card */}
          <div className="ihub-col-md-4 ihub-mb-3">
            <Card
              title={
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <span>Monthly Revenue</span>
                  <span className="ihub-text-success">↑ 12%</span>
                </div>
              }
              accentHeader={true}
              accent="green"
            >
              <h2 className="ihub-mb-0">$45,678</h2>
              <p className="ihub-text-muted ihub-mb-3">vs $40,782 last month</p>
              <div className="ihub-progress">
                <div
                  className="ihub-progress-bar ihub-bg-success"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </Card>
          </div>

          {/* Task Card */}
          <div className="ihub-col-md-4 ihub-mb-3">
            <Card
              title="Today's Tasks"
              size="default"
              footer={
                <button className="ihub-link-btn ihub-w-100">
                  View All Tasks →
                </button>
              }
            >
              <div className="ihub-task-list">
                <div className="ihub-d-flex ihub-align-items-center ihub-mb-2">
                  <input type="checkbox" className="ihub-me-2" />
                  <span>Complete project proposal</span>
                </div>
                <div className="ihub-d-flex ihub-align-items-center ihub-mb-2">
                  <input type="checkbox" className="ihub-me-2" defaultChecked />
                  <span className="ihub-text-decoration-line-through">
                    Review pull requests
                  </span>
                </div>
                <div className="ihub-d-flex ihub-align-items-center">
                  <input type="checkbox" className="ihub-me-2" />
                  <span>Update documentation</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Notification Card */}
          <div className="ihub-col-md-4 ihub-mb-3">
            <Card
              title={
                <div className="ihub-d-flex ihub-align-items-center">
                  <span className="ihub-me-2">🔔</span>
                  <span>Notifications</span>
                  <span className="ihub-badge ihub-badge-danger ihub-ms-auto">3</span>
                </div>
              }
              size="default"
            >
              <div className="ihub-notification-list">
                <div className="ihub-mb-2 ihub-pb-2 ihub-border-bottom">
                  <strong>New comment</strong>
                  <p className="ihub-mb-0 ihub-text-muted ihub-small">
                    Sarah commented on your post
                  </p>
                </div>
                <div className="ihub-mb-2 ihub-pb-2 ihub-border-bottom">
                  <strong>Update available</strong>
                  <p className="ihub-mb-0 ihub-text-muted ihub-small">
                    Version 2.0 is now available
                  </p>
                </div>
                <div>
                  <strong>Meeting reminder</strong>
                  <p className="ihub-mb-0 ihub-text-muted ihub-small">
                    Team standup in 30 minutes
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Custom Styled Cards */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Custom Styled Cards</h2>
        <div className="ihub-row">
          {/* Gradient Card */}
          <div className="ihub-col-md-6 ihub-mb-3">
            <Card
              title="Gradient Background"
              className="ihub-text-white"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
              border={false}
            >
              <p>Create eye-catching cards with gradient backgrounds.</p>
              <p>Perfect for highlighting special content or CTAs.</p>
              <button className="ihub-btn ihub-btn-light ihub-mt-2">
                Learn More
              </button>
            </Card>
          </div>

          {/* Glass Morphism Card */}
          <div className="ihub-col-md-6 ihub-mb-3">
            <Card
              title="Glass Morphism Effect"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <p>Modern glass morphism effect for a sleek, contemporary look.</p>
              <p>Works great on colorful or image backgrounds.</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardExamples;
```

## 📦 Props

### Card Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `React.ReactNode` | - | Card header title content |
| `accentHeader` | `boolean` | `false` | Adds an accent bar to the header |
| `footer` | `React.ReactNode` | - | Footer content |
| `children` | `React.ReactNode` | - | Main card body content |
| `className` | `string` | `""` | Additional CSS classes |
| `accent` | `"cyan" \| "rose" \| "green" \| "purple"` | - | Accent color variant |
| `darkTheme` | `boolean` | `false` | Enable dark theme styling |
| `style` | `React.CSSProperties` | - | Inline styles |
| `size` | `"default" \| "sm"` | `"default"` | Card size variant |
| `border` | `boolean` | `true` | Show card border |
| `shadow` | `boolean` | `true` | Show card shadow |
| `onClick` | `() => void` | - | Click handler for the entire card |

### Additional Card Variants

The package also includes specialized card components:

- **MediaCard**: Cards with images, perfect for products or content previews
- **ProfileCard**: Optimized for displaying user profiles with social links
- **FeatureCard**: Icon-based cards for highlighting features or services
- **PricingCard**: Structured cards for pricing plans with feature lists
- **HorizontalCard**: Side-by-side layout for blog posts or articles

## 💡 Use Cases

1. **Content Organization**: Group related information in a clean, structured format
2. **Product Listings**: Display products with images, prices, and actions
3. **User Profiles**: Show team members or user information with social links
4. **Feature Highlights**: Present key features with icons and descriptions
5. **Pricing Tables**: Create attractive pricing comparisons
6. **Dashboard Widgets**: Build statistics cards, task lists, and notifications
7. **Blog Posts**: Display article previews with horizontal layouts
8. **Interactive Selections**: Create clickable cards for user selections

## 🎨 Styling

Cards support various styling options:
- Four accent colors (cyan, rose, green, purple)
- Dark theme support
- Border and shadow control
- Custom CSS classes and inline styles
- Size variants (default, small)
- Gradient and glass morphism effects

## 🔗 Related Components

- [MediaCard](./MediaCard.md) - Card with image support
- [ProfileCard](./ProfileCard.md) - User profile card component
- [FeatureCard](./FeatureCard.md) - Feature highlighting card
- [PricingCard](./PricingCard.md) - Pricing plan card component
- [HorizontalCard](./HorizontalCard.md) - Horizontal layout card
- [CardGrid](./CardGrid.md) - Grid layout for cards
- [CardList](./CardList.md) - List layout for cards


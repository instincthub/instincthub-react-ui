# FeatureCard

**Category:** UI | **Type:** component

Feature showcase cards with icons, titles, and descriptions

## 🏷️ Tags

`ui`, `cards`, `features`, `icons`

```tsx
"use client";
import React from "react";
import {
  FeatureCard,
  CardGrid,
} from "@instincthub/react-ui";
import {
  StarIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  CogIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

/**
 * Example component demonstrating various ways to use the FeatureCard
 */
const FeatureCardExamples = () => {
  const handleFeatureClick = (feature: string) => {
    console.log(`Feature clicked: ${feature}`);
  };

  const features = [
    {
      icon: <StarIcon className="w-8 h-8" />,
      title: "Premium Quality",
      description: "Built with industry-leading standards and best practices for reliability and performance.",
      accent: "cyan" as const,
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Secure & Safe",
      description: "Enterprise-grade security with end-to-end encryption and data protection protocols.",
      accent: "green" as const,
    },
    {
      icon: <LightBulbIcon className="w-8 h-8" />,
      title: "Innovation First",
      description: "Cutting-edge technology and innovative solutions to stay ahead of the competition.",
      accent: "purple" as const,
    },
    {
      icon: <RocketLaunchIcon className="w-8 h-8" />,
      title: "Fast Performance",
      description: "Lightning-fast load times and optimized performance for the best user experience.",
      accent: "rose" as const,
    },
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>FeatureCard Examples</h1>

      {/* Basic Feature Card */}
      <section className="ihub-mb-5">
        <h2>Basic Feature Card</h2>
        <p>Simple feature card with icon, title, and description</p>
        
        <FeatureCard
          icon={<StarIcon className="w-8 h-8 text-blue-500" />}
          title="Amazing Feature"
          description="This feature will revolutionize your workflow and increase productivity by 300%."
          className="ihub-mb-3"
          style={{ maxWidth: "400px" }}
        />
      </section>

      {/* Feature Cards with Different Accents */}
      <section className="ihub-mb-5">
        <h2>Feature Cards with Accent Colors</h2>
        <p>Feature cards with different accent colors and themes</p>
        
        <CardGrid columns={2} gap="20px" className="ihub-mb-3">
          <FeatureCard
            icon={<CogIcon className="w-8 h-8" />}
            title="Customizable"
            description="Fully customizable components to match your brand and design requirements."
            accent="cyan"
            shadow
          />
          
          <FeatureCard
            icon={<HeartIcon className="w-8 h-8" />}
            title="User Friendly"
            description="Intuitive design and user experience that your customers will love."
            accent="rose"
            shadow
          />
        </CardGrid>
      </section>

      {/* Interactive Feature Cards */}
      <section className="ihub-mb-5">
        <h2>Interactive Feature Cards</h2>
        <p>Clickable feature cards with hover effects</p>
        
        <CardGrid columns={2} gap="20px" className="ihub-mb-3">
          {features.slice(0, 2).map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accent={feature.accent}
              onClick={() => handleFeatureClick(feature.title)}
              className="ihub-cursor-pointer ihub-transition-all"
              style={{
                transform: "scale(1)",
                transition: "transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            />
          ))}
        </CardGrid>
      </section>

      {/* Feature Cards with Additional Content */}
      <section className="ihub-mb-5">
        <h2>Feature Cards with Additional Content</h2>
        <p>Feature cards with custom children content</p>
        
        <FeatureCard
          icon={<RocketLaunchIcon className="w-10 h-10" />}
          title="Advanced Analytics"
          description="Get detailed insights into your application performance and user behavior."
          accent="purple"
          shadow
          border
          style={{ maxWidth: "500px" }}
        >
          <div className="ihub-mt-4">
            <div className="ihub-d-flex ihub-gap-2 ihub-mb-3">
              <span className="ihub-badge ihub-badge-primary">Real-time</span>
              <span className="ihub-badge ihub-badge-success">AI-powered</span>
              <span className="ihub-badge ihub-badge-info">Export ready</span>
            </div>
            
            <button 
              className="ihub-primary-btn ihub-btn-sm"
              onClick={() => console.log("Learn more clicked")}
            >
              Learn More
            </button>
          </div>
        </FeatureCard>
      </section>

      {/* Feature Cards Grid Layout */}
      <section className="ihub-mb-5">
        <h2>Feature Cards Grid</h2>
        <p>Multiple feature cards in a responsive grid layout</p>
        
        <CardGrid columns={3} gap="24px" className="ihub-mb-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              accent={feature.accent}
              shadow
              size="sm"
              onClick={() => handleFeatureClick(feature.title)}
            />
          ))}
        </CardGrid>
      </section>

      {/* Dark Theme Feature Cards */}
      <section className="ihub-mb-5">
        <h2>Dark Theme Feature Cards</h2>
        <p>Feature cards with dark theme styling</p>
        
        <div className="ihub-bg-dark ihub-p-4 ihub-rounded">
          <CardGrid columns={2} gap="20px">
            <FeatureCard
              icon={<ShieldCheckIcon className="w-8 h-8" />}
              title="Enterprise Security"
              description="Bank-level security measures to protect your sensitive data and transactions."
              accent="green"
              darkTheme
              shadow
            />
            
            <FeatureCard
              icon={<LightBulbIcon className="w-8 h-8" />}
              title="Smart Automation"
              description="Intelligent automation that learns from your patterns and optimizes workflows."
              accent="cyan"
              darkTheme
              shadow
            />
          </CardGrid>
        </div>
      </section>

      {/* Compact Feature Cards */}
      <section className="ihub-mb-5">
        <h2>Compact Feature Cards</h2>
        <p>Small size feature cards for sidebar or compact layouts</p>
        
        <div className="ihub-d-flex ihub-flex-column ihub-gap-3" style={{ maxWidth: "300px" }}>
          <FeatureCard
            icon={<CogIcon className="w-6 h-6" />}
            title="Easy Setup"
            description="Get started in minutes with our simple setup process."
            size="sm"
            accent="cyan"
            border
          />
          
          <FeatureCard
            icon={<HeartIcon className="w-6 h-6" />}
            title="24/7 Support"
            description="Round-the-clock customer support whenever you need help."
            size="sm"
            accent="rose"
            border
          />
        </div>
      </section>

      {/* Feature Cards with Custom Styling */}
      <section className="ihub-mb-5">
        <h2>Custom Styled Feature Cards</h2>
        <p>Feature cards with custom styling and animations</p>
        
        <FeatureCard
          icon={
            <div className="ihub-animate-pulse">
              <StarIcon className="w-12 h-12 text-yellow-500" />
            </div>
          }
          title="Premium Experience"
          description="Unlock the full potential with our premium features and exclusive benefits."
          accent="purple"
          shadow
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            maxWidth: "400px",
          }}
        >
          <div className="ihub-mt-4">
            <button className="ihub-btn ihub-btn-light ihub-btn-sm">
              Upgrade Now
            </button>
          </div>
        </FeatureCard>
      </section>
    </div>
  );
};

export default FeatureCardExamples;
```

## 🔗 Related Components

- [Card](./Card.md) - Base card component
- [MediaCard](./MediaCard.md) - Card with media content
- [ProfileCard](./ProfileCard.md) - User profile card component
- [PricingCard](./PricingCard.md) - Pricing plan card component
- [CardGrid](./CardGrid.md) - Grid layout for cards
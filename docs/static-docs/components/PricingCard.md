# PricingCard

**Category:** UI | **Type:** component

Versatile pricing card component for displaying subscription plans, service packages, and pricing tiers with features, buttons, and customizable styling.

## 🏷️ Tags

`ui`, `pricing`, `subscription`, `card`, `plans`

```tsx
"use client";
import React, { useState } from "react";
import { PricingCard } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Example component demonstrating various ways to use the PricingCard
 */
const PricingCardExamples = () => {
  // Handle plan selection
  const handlePlanSelect = (planName: string, price: string) => {
    openToast(`Selected ${planName} plan for ${price}`);
    console.log(`Plan selected: ${planName} - ${price}`);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>PricingCard Examples</h1>

      {/* SaaS Subscription Plans */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-4">SaaS Subscription Plans</h2>
        <div className="ihub-row">
          <div className="ihub-col-lg-4 ihub-col-md-6 ihub-mb-4">
            <PricingCard
              title="Starter"
              price="$9"
              period="per month"
              features={[
                "Up to 5 projects",
                "10GB storage",
                "Email support",
                "Basic analytics",
                "Mobile app access"
              ]}
              buttonText="Start Free Trial"
              onButtonClick={() => handlePlanSelect("Starter", "$9/month")}
              className="ihub-h-100"
            />
          </div>

          <div className="ihub-col-lg-4 ihub-col-md-6 ihub-mb-4">
            <PricingCard
              title="Professional"
              price="$29"
              period="per month"
              features={[
                "Unlimited projects",
                "100GB storage",
                "Priority support",
                "Advanced analytics",
                "API access",
                "Team collaboration",
                "Custom integrations"
              ]}
              buttonText="Choose Professional"
              onButtonClick={() => handlePlanSelect("Professional", "$29/month")}
              recommended={true}
              className="ihub-h-100"
            />
          </div>

          <div className="ihub-col-lg-4 ihub-col-md-6 ihub-mb-4">
            <PricingCard
              title="Enterprise"
              price="$99"
              period="per month"
              features={[
                "Everything in Professional",
                "Unlimited storage",
                "24/7 phone support",
                "Custom reporting",
                "SSO integration",
                "Dedicated account manager",
                "On-premise deployment"
              ]}
              buttonText="Contact Sales"
              onButtonClick={() => handlePlanSelect("Enterprise", "$99/month")}
              className="ihub-h-100"
            />
          </div>
        </div>
      </section>

      {/* Annual vs Monthly Billing */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-4">Annual vs Monthly Billing</h2>
        <div className="ihub-row">
          <div className="ihub-col-lg-6 ihub-mb-4">
            <PricingCard
              title="Pro Monthly"
              price="$39"
              period="per month"
              features={[
                "All Pro features",
                "Monthly billing",
                "Cancel anytime",
                "No setup fees",
                "Instant access"
              ]}
              buttonText="Start Monthly"
              onButtonClick={() => handlePlanSelect("Pro Monthly", "$39/month")}
              accent="cyan"
            />
          </div>

          <div className="ihub-col-lg-6 ihub-mb-4">
            <PricingCard
              title="Pro Annual"
              price="$390"
              period="per year (Save 17%)"
              features={[
                "All Pro features",
                "2 months free",
                "Annual billing",
                "Priority support",
                "Bonus features"
              ]}
              buttonText="Save with Annual"
              onButtonClick={() => handlePlanSelect("Pro Annual", "$390/year")}
              recommended={true}
              accent="green"
            />
          </div>
        </div>
      </section>

      {/* E-commerce Product Plans */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-4">E-commerce Store Plans</h2>
        <div className="ihub-row">
          <div className="ihub-col-lg-3 ihub-col-md-6 ihub-mb-4">
            <PricingCard
              title="Basic Store"
              price="Free"
              features={[
                "Up to 10 products",
                "Basic templates",
                "Payment processing",
                "Order management"
              ]}
              buttonText="Get Started"
              onButtonClick={() => handlePlanSelect("Basic Store", "Free")}
              size="sm"
            />
          </div>

          <div className="ihub-col-lg-3 ihub-col-md-6 ihub-mb-4">
            <PricingCard
              title="Shop"
              price="$29"
              period="per month"
              features={[
                "Up to 100 products",
                "Custom domain",
                "SEO tools",
                "Inventory tracking",
                "Abandoned cart recovery"
              ]}
              buttonText="Choose Shop"
              onButtonClick={() => handlePlanSelect("Shop", "$29/month")}
              accent="purple"
            />
          </div>

          <div className="ihub-col-lg-3 ihub-col-md-6 ihub-mb-4">
            <PricingCard
              title="Business"
              price="$79"
              period="per month"
              features={[
                "Unlimited products",
                "Advanced analytics",
                "Multi-currency",
                "API access",
                "Custom checkout"
              ]}
              buttonText="Go Business"
              onButtonClick={() => handlePlanSelect("Business", "$79/month")}
              recommended={true}
              accent="rose"
            />
          </div>

          <div className="ihub-col-lg-3 ihub-col-md-6 ihub-mb-4">
            <PricingCard
              title="Enterprise"
              price="Custom"
              features={[
                "Everything in Business",
                "Dedicated support",
                "Custom integrations",
                "SLA guarantee",
                "White-label options"
              ]}
              buttonText="Contact Us"
              onButtonClick={() => handlePlanSelect("Enterprise", "Custom")}
              accent="cyan"
            />
          </div>
        </div>
      </section>

      {/* Service Packages */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-4">Digital Marketing Services</h2>
        <div className="ihub-row">
          <div className="ihub-col-lg-4 ihub-mb-4">
            <PricingCard
              title="SEO Starter"
              price="$299"
              period="one-time setup"
              features={[
                "Keyword research",
                "On-page optimization",
                "Technical SEO audit",
                "Content recommendations",
                "1-month support"
              ]}
              buttonText="Order Now"
              onButtonClick={() => handlePlanSelect("SEO Starter", "$299")}
              border={true}
              shadow={true}
            />
          </div>

          <div className="ihub-col-lg-4 ihub-mb-4">
            <PricingCard
              title="Growth Package"
              price="$599"
              period="per month"
              features={[
                "Everything in Starter",
                "Monthly SEO reports",
                "Link building campaign",
                "Social media setup",
                "Google Ads management",
                "Bi-weekly consultations"
              ]}
              buttonText="Get Growth"
              onButtonClick={() => handlePlanSelect("Growth Package", "$599/month")}
              recommended={true}
              border={true}
              shadow={true}
            />
          </div>

          <div className="ihub-col-lg-4 ihub-mb-4">
            <PricingCard
              title="Full Marketing"
              price="$1,299"
              period="per month"
              features={[
                "Complete digital strategy",
                "Multi-channel campaigns",
                "Advanced analytics",
                "Dedicated account manager",
                "Weekly strategy calls",
                "Custom landing pages"
              ]}
              buttonText="Go Premium"
              onButtonClick={() => handlePlanSelect("Full Marketing", "$1,299/month")}
              border={true}
              shadow={true}
            />
          </div>
        </div>
      </section>

      {/* Hosting Plans */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-4">Web Hosting Plans</h2>
        <div className="ihub-row">
          <div className="ihub-col-lg-4 ihub-mb-4">
            <PricingCard
              title="Shared Hosting"
              price="$3.99"
              period="per month"
              features={[
                "10GB SSD storage",
                "Unlimited bandwidth",
                "Free SSL certificate",
                "cPanel access",
                "Email accounts",
                "24/7 support"
              ]}
              buttonText="Choose Shared"
              onButtonClick={() => handlePlanSelect("Shared Hosting", "$3.99/month")}
              darkTheme={false}
            />
          </div>

          <div className="ihub-col-lg-4 ihub-mb-4">
            <PricingCard
              title="VPS Hosting"
              price="$29.99"
              period="per month"
              features={[
                "100GB SSD storage",
                "8GB RAM",
                "4 CPU cores",
                "Root access",
                "Free backups",
                "Priority support"
              ]}
              buttonText="Choose VPS"
              onButtonClick={() => handlePlanSelect("VPS Hosting", "$29.99/month")}
              recommended={true}
            />
          </div>

          <div className="ihub-col-lg-4 ihub-mb-4">
            <PricingCard
              title="Dedicated Server"
              price="$149.99"
              period="per month"
              features={[
                "1TB SSD storage",
                "32GB RAM",
                "8 CPU cores",
                "Full server control",
                "DDoS protection",
                "Managed support"
              ]}
              buttonText="Choose Dedicated"
              onButtonClick={() => handlePlanSelect("Dedicated Server", "$149.99/month")}
            />
          </div>
        </div>
      </section>

      {/* Freemium Model */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-4">Freemium Model</h2>
        <div className="ihub-row">
          <div className="ihub-col-lg-6 ihub-mb-4">
            <PricingCard
              title="Free"
              price="$0"
              period="forever"
              features={[
                "Basic features",
                "Up to 3 users",
                "Community support",
                "5GB storage",
                "Standard templates"
              ]}
              buttonText="Start Free"
              onButtonClick={() => handlePlanSelect("Free", "$0")}
              accent="green"
            />
          </div>

          <div className="ihub-col-lg-6 ihub-mb-4">
            <PricingCard
              title="Premium"
              price="$19"
              period="per month"
              features={[
                "All features",
                "Unlimited users",
                "Priority support",
                "Unlimited storage",
                "Premium templates",
                "Advanced integrations",
                "Custom branding"
              ]}
              buttonText="Upgrade to Premium"
              onButtonClick={() => handlePlanSelect("Premium", "$19/month")}
              recommended={true}
              accent="purple"
            />
          </div>
        </div>
      </section>

      {/* Custom Styling Examples */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-4">Custom Styling Variants</h2>
        <div className="ihub-row">
          <div className="ihub-col-lg-3 ihub-mb-4">
            <PricingCard
              title="Cyan Accent"
              price="$25"
              period="per month"
              features={[
                "Feature 1",
                "Feature 2",
                "Feature 3"
              ]}
              buttonText="Select Plan"
              onButtonClick={() => handlePlanSelect("Cyan", "$25")}
              accent="cyan"
              border={true}
            />
          </div>

          <div className="ihub-col-lg-3 ihub-mb-4">
            <PricingCard
              title="Rose Accent"
              price="$35"
              period="per month"
              features={[
                "Feature 1",
                "Feature 2",
                "Feature 3"
              ]}
              buttonText="Select Plan"
              onButtonClick={() => handlePlanSelect("Rose", "$35")}
              accent="rose"
              shadow={true}
            />
          </div>

          <div className="ihub-col-lg-3 ihub-mb-4">
            <PricingCard
              title="Green Accent"
              price="$45"
              period="per month"
              features={[
                "Feature 1",
                "Feature 2",
                "Feature 3"
              ]}
              buttonText="Select Plan"
              onButtonClick={() => handlePlanSelect("Green", "$45")}
              accent="green"
              size="sm"
            />
          </div>

          <div className="ihub-col-lg-3 ihub-mb-4">
            <PricingCard
              title="Purple Accent"
              price="$55"
              period="per month"
              features={[
                "Feature 1",
                "Feature 2",
                "Feature 3"
              ]}
              buttonText="Select Plan"
              onButtonClick={() => handlePlanSelect("Purple", "$55")}
              accent="purple"
              recommended={true}
            />
          </div>
        </div>
      </section>

      {/* Usage Tips */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-4">Usage Tips & Best Practices</h2>
        <div className="ihub-card ihub-p-4">
          <h4>Key Features:</h4>
          <ul>
            <li><strong>Recommended Plans:</strong> Use <code>recommended={true}</code> to highlight the most popular option</li>
            <li><strong>Accent Colors:</strong> Apply visual hierarchy with <code>accent</code> prop (cyan, rose, green, purple)</li>
            <li><strong>Flexible Pricing:</strong> Support any price format (monthly, yearly, one-time, custom)</li>
            <li><strong>Feature Lists:</strong> Clearly communicate value with organized feature lists</li>
            <li><strong>Call-to-Action:</strong> Customize button text and actions for different use cases</li>
            <li><strong>Responsive Design:</strong> Cards automatically adapt to different screen sizes</li>
            <li><strong>Styling Options:</strong> Use border, shadow, and size props for visual customization</li>
          </ul>

          <h4 className="ihub-mt-4">Best Practices:</h4>
          <ul>
            <li>Keep feature lists concise and benefit-focused</li>
            <li>Use consistent pricing periods across plans</li>
            <li>Highlight the most popular plan with <code>recommended</code></li>
            <li>Ensure CTA buttons are clear and action-oriented</li>
            <li>Consider offering annual discounts to increase commitment</li>
            <li>Use accent colors to create visual hierarchy</li>
            <li>Test different price points and feature combinations</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default PricingCardExamples;
```

## 🔗 Related Components

- [Card](./Card.md) - Base card component
- [MediaCard](./MediaCard.md) - Card with media content
- [FeatureCard](./FeatureCard.md) - Feature showcase card
- [ProfileCard](./ProfileCard.md) - User profile card
- [HorizontalCard](./HorizontalCard.md) - Horizontal layout card


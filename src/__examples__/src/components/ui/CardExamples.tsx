"use client";
import React from "react";
import {
  Card,
  MediaCard,
  HorizontalCard,
  ProfileCard,
  FeatureCard,
  PricingCard,
  CardGrid,
  CardList,
} from "../../../../index";
import PhotoCameraFrontOutlinedIcon from "@mui/icons-material/PhotoCameraFrontOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
// Import Material UI icons
// Note: In a real implementation, you would import these from @mui/icons-material
// For this example, we're using the Material Symbols that are in your existing CSS

export default function CardExamples() {
  return (
    <div className="ihub-py-8">
      <h1 className="mb-6">InstinctHub Card System</h1>

      <section className="ihub-mb-10">
        <h2 className="mb-4">Basic Cards</h2>
        <CardGrid>
          <Card
            title="Standard Card"
            accent="cyan"
            border={false}
            shadow={false}
          >
            <p>
              This is a standard card with a cyan accent. Cards can be used for
              various content types and are fully responsive.
            </p>
          </Card>

          <Card
            title="Card with Footer"
            accent="rose"
            footer={
              <div className="ihub-card-actions">
                <a href="#">Learn more</a>
                <a href="#">Share</a>
              </div>
            }
          >
            <p>
              This card includes a footer section with action links. Footers are
              great for buttons, links, or metadata.
            </p>
          </Card>

          <Card title="Dark Theme Card" darkTheme={true}>
            <p>
              Cards can also use a dark theme for higher contrast or to match
              your site's design.
            </p>
          </Card>

          <Card title="Small Card" size="sm" accent="green">
            <p>For more compact layouts, use the small card variant.</p>
          </Card>
        </CardGrid>
      </section>

      <section className="ihub-mb-10">
        <h2 className="mb-4">Media Cards</h2>
        <CardGrid>
          <MediaCard
            title="Media Card"
            imageUrl="https://images.unsplash.com/photo-1742836531275-1819edd83c46?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
            imageAlt="Placeholder image"
            accent="purple"
          >
            <p>
              Media cards feature an image or video above the content. Great for
              blogs, products, or portfolios.
            </p>
          </MediaCard>

          <MediaCard
            title="Card with Badge"
            imageUrl="https://plus.unsplash.com/premium_photo-1744967143306-0ec5b49ca2eb?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
            imageAlt="Placeholder image"
            badge={{ text: "Featured", color: "var(--DarkCyan)" }}
            footer={
              <a href="#" className="link-style">
                View details <ChevronRightOutlinedIcon />
              </a>
            }
          >
            <p>
              You can add badges to highlight special content or status
              indicators.
            </p>
          </MediaCard>
        </CardGrid>
      </section>

      <section className="ihub-mb-10">
        <h2 className="mb-4">Horizontal Cards</h2>
        <CardList>
          <HorizontalCard
            title="Horizontal Layout"
            imageUrl="https://plus.unsplash.com/premium_photo-1744967143306-0ec5b49ca2eb?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8"
            imageAlt="Placeholder image"
            footer={<p className="semi-bold">Last updated: April 2025</p>}
          >
            <p>
              Horizontal cards provide a side-by-side layout, ideal for lists,
              search results, or featured content.
            </p>
          </HorizontalCard>

          <HorizontalCard
            title="Course Example"
            imageUrl="https://images.unsplash.com/photo-1744754222043-c337f2728640?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D"
            imageAlt="Course thumbnail"
            badge={{ text: "Bestseller", color: "var(--TurkishRose)" }}
          >
            <p>
              Perfect for displaying course information, blog posts, or product
              listings.
            </p>
            <div className="mt-2">
              <span className="badge DarkCyan WhiteC">Web Development</span>
              <span className="badge OldLavender WhiteC ml-1">Beginner</span>
            </div>
          </HorizontalCard>
        </CardList>
      </section>

      <section className="ihub-mb-10">
        <h2 className="mb-4">Profile Cards</h2>
        <CardGrid>
          <ProfileCard
            name="Jane Smith"
            role="UX Designer"
            bio="Creating intuitive user experiences for web and mobile applications."
            imageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww"
            socialLinks={[
              {
                icon: <span className="material-symbols-outlined">person</span>,
                url: "#",
                label: "Profile",
              },
              {
                icon: <span className="material-symbols-outlined">work</span>,
                url: "#",
                label: "Portfolio",
              },
              {
                icon: (
                  <span className="material-symbols-outlined">favorite</span>
                ),
                url: "#",
                label: "Follow",
              },
            ]}
          />

          <ProfileCard
            name="John Doe"
            role="Frontend Developer"
            bio="Building beautiful and responsive web interfaces."
            imageUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww"
            accent="cyan"
          >
            <div className="mt-2">
              <span className="badge ViridianGreen WhiteC">React</span>
              <span className="badge DarkLavender WhiteC ml-1">TypeScript</span>
            </div>
          </ProfileCard>
        </CardGrid>
      </section>

      <section className="ihub-mb-10">
        <h2 className="mb-4">Feature Cards</h2>
        <CardGrid>
          <FeatureCard
            icon={<PhotoCameraFrontOutlinedIcon />}
            title="Visual Content"
            description="Create stunning visual content for your courses with our integrated tools."
          />

          <FeatureCard
            icon={<StarBorderOutlinedIcon />}
            title="Premium Quality"
            description="Deliver high-quality learning experiences that engage your students."
            accent="rose"
          />

          <FeatureCard
            icon={<InsertChartOutlinedIcon />}
            title="Detailed Analytics"
            description="Track student progress and course performance with advanced analytics."
            accent="green"
          />
        </CardGrid>
      </section>

      <section className="ihub-mb-10">
        <h2 className="mb-4">Pricing Cards</h2>
        <CardGrid>
          <PricingCard
            title="Basic"
            price="$29"
            period="per month"
            features={[
              "Up to 3 courses",
              "Basic analytics",
              "Standard support",
              "30-day free trial",
            ]}
            buttonText="Start Free Trial"
          />

          <PricingCard
            title="Professional"
            price="$79"
            period="per month"
            features={[
              "Unlimited courses",
              "Advanced analytics",
              "Priority support",
              "Custom branding",
              "API access",
            ]}
            recommended={true}
            buttonText="Get Professional"
          />

          <PricingCard
            title="Enterprise"
            price="$199"
            period="per month"
            features={[
              "Everything in Professional",
              "Dedicated account manager",
              "Custom integrations",
              "SLA guarantees",
              "White-labeling options",
            ]}
            buttonText="Contact Sales"
          />
        </CardGrid>
      </section>
    </div>
  );
}

# MediaCard

**Category:** UI | **Type:** component

Media card component for displaying content with images, videos, or other media elements

## 🏷️ Tags

`ui`, `card`, `media`, `image`, `gallery`

```tsx
"use client";
import React, { useState } from "react";
import { MediaCard } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the MediaCard
 */
const MediaCardExamples = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Sample data for different use cases
  const portfolioItems = [
    {
      id: 1,
      imageUrl: "https://picsum.photos/400/300?random=1",
      title: "Modern Architecture",
      description: "A stunning example of contemporary design with clean lines and geometric shapes.",
      category: "Architecture",
      badge: { text: "Featured", color: "#10b981" }
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/400/300?random=2",
      title: "Urban Photography",
      description: "Capturing the essence of city life through dynamic street photography.",
      category: "Photography",
      badge: { text: "New", color: "#3b82f6" }
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/400/300?random=3",
      title: "Digital Art",
      description: "Exploring creativity through digital mediums and innovative techniques.",
      category: "Digital Art"
    }
  ];

  const productItems = [
    {
      id: 1,
      imageUrl: "https://picsum.photos/300/300?random=10",
      title: "Premium Headphones",
      price: "$299.99",
      originalPrice: "$399.99",
      rating: 4.5,
      badge: { text: "25% OFF", color: "#ef4444" }
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/300/300?random=11",
      title: "Smart Watch",
      price: "$199.99",
      rating: 4.8,
      badge: { text: "Best Seller", color: "#f59e0b" }
    },
    {
      id: 3,
      imageUrl: "https://picsum.photos/300/300?random=12",
      title: "Wireless Speaker",
      price: "$149.99",
      rating: 4.3
    }
  ];

  const contentItems = [
    {
      id: 1,
      imageUrl: "https://picsum.photos/600/400?random=20",
      title: "The Future of Web Development",
      excerpt: "Exploring emerging technologies and frameworks that will shape the next decade of web development.",
      author: "Jane Doe",
      publishDate: "2024-01-15",
      readTime: "5 min read",
      badge: { text: "Trending", color: "#8b5cf6" }
    },
    {
      id: 2,
      imageUrl: "https://picsum.photos/600/400?random=21",
      title: "AI in Everyday Life",
      excerpt: "How artificial intelligence is seamlessly integrating into our daily routines and workflows.",
      author: "John Smith",
      publishDate: "2024-01-12",
      readTime: "7 min read"
    }
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>MediaCard Examples</h1>

      {/* Basic Media Card */}
      <section className="ihub-my-5">
        <h2>Basic Media Card</h2>
        <div className="ihub-d-flex ihub-gap-3" style={{ flexWrap: "wrap" }}>
          <MediaCard
            imageUrl="https://picsum.photos/400/250?random=100"
            imageAlt="Sample image"
            title="Basic Media Card"
            className="ihub-card-hover"
            style={{ maxWidth: "300px" }}
          >
            <p>This is a simple media card with an image, title, and content area. Perfect for basic content display.</p>
          </MediaCard>

          <MediaCard
            imageUrl="https://picsum.photos/400/250?random=101"
            imageAlt="Card with badge"
            title="Card with Badge"
            badge={{ text: "New", color: "#3b82f6" }}
            accent="cyan"
            style={{ maxWidth: "300px" }}
          >
            <p>This media card includes a badge overlay on the image to highlight special status or categories.</p>
          </MediaCard>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="ihub-my-5">
        <h2>Portfolio Gallery</h2>
        <div className="ihub-d-grid ihub-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {portfolioItems.map((item) => (
            <MediaCard
              key={item.id}
              imageUrl={item.imageUrl}
              imageAlt={item.title}
              title={item.title}
              badge={item.badge}
              className="ihub-card-hover"
              shadow={true}
              onClick={() => setSelectedImage(item.imageUrl)}
              footer={
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <span className="ihub-badge ihub-badge-secondary">{item.category}</span>
                  <button className="ihub-btn ihub-btn-sm ihub-primary-btn">
                    View Details
                  </button>
                </div>
              }
            >
              <p>{item.description}</p>
            </MediaCard>
          ))}
        </div>
      </section>

      {/* Product Showcase */}
      <section className="ihub-my-5">
        <h2>Product Catalog</h2>
        <div className="ihub-d-grid ihub-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          {productItems.map((item) => (
            <MediaCard
              key={item.id}
              imageUrl={item.imageUrl}
              imageAlt={item.title}
              title={item.title}
              badge={item.badge}
              border={true}
              shadow={true}
              className="ihub-card-hover"
              footer={
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <div>
                    <span className="ihub-h4 ihub-text-primary">{item.price}</span>
                    {item.originalPrice && (
                      <span className="ihub-text-muted ihub-text-decoration-line-through ihub-ms-2">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="ihub-btn ihub-important-btn ihub-btn-sm">
                    Add to Cart
                  </button>
                </div>
              }
            >
              <div className="ihub-d-flex ihub-align-items-center ihub-mb-2">
                <div className="ihub-d-flex ihub-me-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.floor(item.rating) ? "ihub-text-warning" : "ihub-text-muted"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <small className="ihub-text-muted">({item.rating})</small>
              </div>
            </MediaCard>
          ))}
        </div>
      </section>

      {/* Content Articles */}
      <section className="ihub-my-5">
        <h2>Article/Blog Cards</h2>
        <div className="ihub-d-grid ihub-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))" }}>
          {contentItems.map((item) => (
            <MediaCard
              key={item.id}
              imageUrl={item.imageUrl}
              imageAlt={item.title}
              title={item.title}
              badge={item.badge}
              accent="green"
              shadow={true}
              className="ihub-card-hover"
              footer={
                <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                  <div className="ihub-d-flex ihub-align-items-center ihub-gap-3">
                    <small className="ihub-text-muted">By {item.author}</small>
                    <small className="ihub-text-muted">{item.readTime}</small>
                  </div>
                  <small className="ihub-text-muted">{item.publishDate}</small>
                </div>
              }
            >
              <p>{item.excerpt}</p>
            </MediaCard>
          ))}
        </div>
      </section>

      {/* Video Thumbnails */}
      <section className="ihub-my-5">
        <h2>Video Gallery</h2>
        <div className="ihub-d-grid ihub-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
          <MediaCard
            imageUrl="https://picsum.photos/640/360?random=30"
            imageAlt="Video thumbnail"
            title="Introduction to React Hooks"
            badge={{ text: "12:45", color: "#1f2937" }}
            className="ihub-card-hover"
            shadow={true}
            footer={
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <div>
                  <small className="ihub-text-muted">1.2M views</small>
                  <small className="ihub-text-muted ihub-ms-2">2 days ago</small>
                </div>
                <button className="ihub-btn ihub-btn-sm ihub-primary-btn">
                  ▶ Play
                </button>
              </div>
            }
          >
            <p>Learn the fundamentals of React Hooks and how to use them effectively in your applications.</p>
            <div className="ihub-d-flex ihub-align-items-center ihub-mt-2">
              <img
                src="https://picsum.photos/32/32?random=40"
                alt="Channel avatar"
                className="ihub-rounded-circle ihub-me-2"
                style={{ width: "24px", height: "24px" }}
              />
              <small className="ihub-text-muted">React Academy</small>
            </div>
          </MediaCard>

          <MediaCard
            imageUrl="https://picsum.photos/640/360?random=31"
            imageAlt="Video thumbnail"
            title="Advanced TypeScript Patterns"
            badge={{ text: "18:30", color: "#1f2937" }}
            className="ihub-card-hover"
            shadow={true}
            footer={
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <div>
                  <small className="ihub-text-muted">856K views</small>
                  <small className="ihub-text-muted ihub-ms-2">1 week ago</small>
                </div>
                <button className="ihub-btn ihub-btn-sm ihub-primary-btn">
                  ▶ Play
                </button>
              </div>
            }
          >
            <p>Explore advanced TypeScript patterns and techniques for building robust applications.</p>
            <div className="ihub-d-flex ihub-align-items-center ihub-mt-2">
              <img
                src="https://picsum.photos/32/32?random=41"
                alt="Channel avatar"
                className="ihub-rounded-circle ihub-me-2"
                style={{ width: "24px", height: "24px" }}
              />
              <small className="ihub-text-muted">TypeScript Pro</small>
            </div>
          </MediaCard>
        </div>
      </section>

      {/* Image Gallery with Different Sizes */}
      <section className="ihub-my-5">
        <h2>Different Card Sizes</h2>
        <div className="ihub-d-flex ihub-gap-3" style={{ flexWrap: "wrap", alignItems: "flex-start" }}>
          <MediaCard
            imageUrl="https://picsum.photos/200/150?random=50"
            imageAlt="Small card"
            title="Small Card"
            size="sm"
            className="ihub-card-hover"
          >
            <p>Compact media card perfect for sidebar content or thumbnails.</p>
          </MediaCard>

          <MediaCard
            imageUrl="https://picsum.photos/300/200?random=51"
            imageAlt="Default card"
            title="Default Card"
            className="ihub-card-hover"
          >
            <p>Standard size media card suitable for most content layouts and grid systems.</p>
          </MediaCard>

          <MediaCard
            imageUrl="https://picsum.photos/400/250?random=52"
            imageAlt="Large card"
            title="Large Card with Dark Theme"
            darkTheme={true}
            accent="purple"
            badge={{ text: "Premium", color: "#7c3aed" }}
            className="ihub-card-hover"
            style={{ maxWidth: "400px" }}
          >
            <p>Larger media card with dark theme styling, perfect for featured content and hero sections.</p>
          </MediaCard>
        </div>
      </section>

      {/* Interactive Examples */}
      <section className="ihub-my-5">
        <h2>Interactive Features</h2>
        <div className="ihub-d-grid ihub-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <MediaCard
            imageUrl="https://picsum.photos/400/300?random=60"
            imageAlt="Clickable card"
            title="Clickable Card"
            onClick={() => alert("Card clicked! This could navigate to a detail page.")}
            className="ihub-card-hover"
            border={true}
            footer={
              <div className="ihub-text-center">
                <small className="ihub-text-muted">Click anywhere on this card</small>
              </div>
            }
          >
            <p>This entire card is clickable and can be used for navigation or actions.</p>
          </MediaCard>

          <MediaCard
            imageUrl="https://picsum.photos/400/300?random=61"
            imageAlt="Card with actions"
            title="Card with Actions"
            badge={{ text: "Action", color: "#059669" }}
            shadow={true}
            footer={
              <div className="ihub-d-flex ihub-gap-2">
                <button className="ihub-btn ihub-btn-sm ihub-outlined-btn">
                  Like
                </button>
                <button className="ihub-btn ihub-btn-sm ihub-outlined-btn">
                  Share
                </button>
                <button className="ihub-btn ihub-btn-sm ihub-primary-btn">
                  Save
                </button>
              </div>
            }
          >
            <p>Cards can include multiple action buttons in the footer for user interactions.</p>
          </MediaCard>
        </div>
      </section>

      {/* Event/Announcement Cards */}
      <section className="ihub-my-5">
        <h2>Event & Announcement Cards</h2>
        <div className="ihub-d-grid ihub-gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))" }}>
          <MediaCard
            imageUrl="https://picsum.photos/500/300?random=70"
            imageAlt="Conference event"
            title="Tech Conference 2024"
            badge={{ text: "Early Bird", color: "#dc2626" }}
            accent="rose"
            shadow={true}
            accentHeader={true}
            footer={
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <div>
                  <strong>March 15-17, 2024</strong>
                  <br />
                  <small className="ihub-text-muted">San Francisco, CA</small>
                </div>
                <button className="ihub-btn ihub-important-btn">
                  Register Now
                </button>
              </div>
            }
          >
            <p>Join industry leaders for three days of cutting-edge technology presentations and networking.</p>
            <div className="ihub-mt-3">
              <div className="ihub-d-flex ihub-justify-content-between">
                <span>Early Bird Price:</span>
                <strong>$299</strong>
              </div>
              <div className="ihub-d-flex ihub-justify-content-between">
                <span>Regular Price:</span>
                <span className="ihub-text-muted">$399</span>
              </div>
            </div>
          </MediaCard>

          <MediaCard
            imageUrl="https://picsum.photos/500/300?random=71"
            imageAlt="Workshop"
            title="React Masterclass Workshop"
            badge={{ text: "Limited Seats", color: "#f59e0b" }}
            accent="cyan"
            shadow={true}
            footer={
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <div>
                  <strong>February 28, 2024</strong>
                  <br />
                  <small className="ihub-text-muted">Online Event</small>
                </div>
                <button className="ihub-btn ihub-primary-btn">
                  Join Workshop
                </button>
              </div>
            }
          >
            <p>Intensive hands-on workshop covering advanced React patterns and best practices.</p>
            <div className="ihub-mt-3">
              <div className="ihub-d-flex ihub-align-items-center ihub-mb-2">
                <span className="ihub-me-2">⏰</span>
                <span>4 hours intensive session</span>
              </div>
              <div className="ihub-d-flex ihub-align-items-center">
                <span className="ihub-me-2">👥</span>
                <span>Max 20 participants</span>
              </div>
            </div>
          </MediaCard>
        </div>
      </section>

      {/* Modal for enlarged image view */}
      {selectedImage && (
        <div
          className="ihub-modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <img
              src={selectedImage}
              alt="Enlarged view"
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(255,255,255,0.9)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCardExamples;
```

## 🔗 Related Components

- [Card](./Card.md) - Base card component
- [ProfileCard](./ProfileCard.md) - Profile-specific card component
- [FeatureCard](./FeatureCard.md) - Feature highlight card component
- [PricingCard](./PricingCard.md) - Pricing display card component
- [HorizontalCard](./HorizontalCard.md) - Horizontal layout card component


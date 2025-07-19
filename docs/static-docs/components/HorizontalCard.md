# HorizontalCard

**Category:** UI | **Type:** component

Horizontal layout card component with side-by-side media and content

## 🏷️ Tags

`ui`, `cards`, `media`, `horizontal`, `layout`

```tsx
"use client";
import React, { useState } from "react";
import {
  HorizontalCard,
  CardGrid,
  Badge,
} from "@instincthub/react-ui";
import {
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

/**
 * Example component demonstrating various ways to use the HorizontalCard
 */
const HorizontalCardExamples = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleCardClick = (title: string) => {
    console.log(`Card clicked: ${title}`);
  };

  const sampleArticles = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      imageAlt: "Modern workspace",
      title: "Building Modern Web Applications",
      description: "Learn the fundamentals of creating responsive, performant web applications using modern frameworks and best practices.",
      author: "John Doe",
      readTime: "5 min read",
      publishDate: "2024-01-15",
      category: "Development",
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
      imageAlt: "Business analytics",
      title: "Data Analytics for Business Growth",
      description: "Discover how to leverage data analytics to drive business decisions and accelerate company growth.",
      author: "Jane Smith",
      readTime: "8 min read",
      publishDate: "2024-01-12",
      category: "Analytics",
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400",
      imageAlt: "Design tools",
      title: "UI/UX Design Principles",
      description: "Master the essential principles of user interface and user experience design for digital products.",
      author: "Mike Johnson",
      readTime: "6 min read",
      publishDate: "2024-01-10",
      category: "Design",
    },
  ];

  const courseData = [
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
      imageAlt: "React course",
      title: "Complete React Development Course",
      description: "Master React from basics to advanced concepts with hands-on projects and real-world applications.",
      instructor: "Sarah Wilson",
      duration: "40 hours",
      rating: 4.8,
      students: 12500,
      price: "$89.99",
      originalPrice: "$149.99",
    },
  ];

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>HorizontalCard Examples</h1>

      {/* Basic Horizontal Card */}
      <section className="ihub-mb-5">
        <h2>Basic Horizontal Card</h2>
        <p>Simple horizontal card with image and content side-by-side</p>
        
        <HorizontalCard
          imageUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400"
          imageAlt="Laptop on desk"
          title="Getting Started with Web Development"
          className="ihub-mb-3"
          style={{ maxWidth: "600px" }}
        >
          <p>Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners looking to start their coding journey.</p>
          <div className="ihub-mt-3">
            <button className="ihub-primary-btn ihub-btn-sm">Read More</button>
          </div>
        </HorizontalCard>
      </section>

      {/* Blog Article Cards */}
      <section className="ihub-mb-5">
        <h2>Blog Article Cards</h2>
        <p>Horizontal cards perfect for blog posts and articles</p>
        
        <div className="ihub-d-flex ihub-flex-column ihub-gap-4">
          {sampleArticles.map((article) => (
            <HorizontalCard
              key={article.id}
              imageUrl={article.imageUrl}
              imageAlt={article.imageAlt}
              title={article.title}
              shadow
              className="ihub-cursor-pointer"
              onClick={() => handleCardClick(article.title)}
              style={{ maxWidth: "700px" }}
              badge={{
                text: article.category,
                color: "primary",
              }}
            >
              <p className="ihub-text-muted ihub-mb-2">{article.description}</p>
              
              <div className="ihub-d-flex ihub-align-items-center ihub-gap-3 ihub-mb-3">
                <span className="ihub-text-sm">By {article.author}</span>
                <span className="ihub-text-sm ihub-d-flex ihub-align-items-center ihub-gap-1">
                  <ClockIcon className="w-4 h-4" />
                  {article.readTime}
                </span>
              </div>
              
              <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
                <span className="ihub-text-xs ihub-text-muted">{article.publishDate}</span>
                <div className="ihub-d-flex ihub-gap-2">
                  <button
                    className={`ihub-btn-icon ${favorites.has(article.id) ? "ihub-text-red-500" : "ihub-text-gray-500"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(article.id);
                    }}
                  >
                    <HeartIcon className="w-5 h-5" />
                  </button>
                  <button className="ihub-btn-icon ihub-text-gray-500">
                    <ShareIcon className="w-5 h-5" />
                  </button>
                  <button className="ihub-btn-icon ihub-text-gray-500">
                    <BookmarkIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </HorizontalCard>
          ))}
        </div>
      </section>

      {/* Course Card Example */}
      <section className="ihub-mb-5">
        <h2>Course Card Example</h2>
        <p>Horizontal card designed for online courses and educational content</p>
        
        {courseData.map((course) => (
          <HorizontalCard
            key={course.id}
            imageUrl={course.imageUrl}
            imageAlt={course.imageAlt}
            title={course.title}
            shadow
            border
            accent="purple"
            style={{ maxWidth: "800px" }}
            badge={{
              text: "Bestseller",
              color: "warning",
            }}
          >
            <p className="ihub-mb-3">{course.description}</p>
            
            <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-2">
              <div className="ihub-d-flex ihub-align-items-center ihub-gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(course.rating) ? "ihub-text-yellow-500" : "ihub-text-gray-300"}`} 
                  />
                ))}
                <span className="ihub-text-sm ihub-font-medium">{course.rating}</span>
              </div>
              <span className="ihub-text-sm ihub-text-muted">({course.students.toLocaleString()} students)</span>
            </div>
            
            <div className="ihub-d-flex ihub-align-items-center ihub-gap-4 ihub-mb-3">
              <span className="ihub-text-sm">By {course.instructor}</span>
              <span className="ihub-text-sm">{course.duration}</span>
            </div>
            
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
              <div className="ihub-d-flex ihub-align-items-center ihub-gap-2">
                <span className="ihub-text-lg ihub-font-bold ihub-text-primary">{course.price}</span>
                <span className="ihub-text-sm ihub-text-muted ihub-line-through">{course.originalPrice}</span>
              </div>
              <button className="ihub-primary-btn">Enroll Now</button>
            </div>
          </HorizontalCard>
        ))}
      </section>

      {/* Product Cards */}
      <section className="ihub-mb-5">
        <h2>Product Cards</h2>
        <p>Horizontal cards for e-commerce and product listings</p>
        
        <CardGrid columns={1} gap="20px" style={{ maxWidth: "600px" }}>
          <HorizontalCard
            imageUrl="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"
            imageAlt="Wireless headphones"
            title="Premium Wireless Headphones"
            shadow
            accent="cyan"
            badge={{
              text: "30% OFF",
              color: "danger",
            }}
          >
            <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-2">
              <div className="ihub-d-flex ihub-align-items-center ihub-gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 ihub-text-yellow-500" />
                ))}
                <span className="ihub-text-sm">(4.9)</span>
              </div>
            </div>
            
            <p className="ihub-text-muted ihub-mb-3">
              High-quality wireless headphones with noise cancellation and 30-hour battery life.
            </p>
            
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
              <div className="ihub-d-flex ihub-align-items-center ihub-gap-2">
                <span className="ihub-text-xl ihub-font-bold">$199.99</span>
                <span className="ihub-text-sm ihub-text-muted ihub-line-through">$299.99</span>
              </div>
              <button className="ihub-primary-btn ihub-btn-sm">Add to Cart</button>
            </div>
          </HorizontalCard>
          
          <HorizontalCard
            imageUrl="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"
            imageAlt="Smart watch"
            title="Smartwatch Pro Series"
            shadow
            accent="green"
            badge={{
              text: "New",
              color: "success",
            }}
          >
            <div className="ihub-d-flex ihub-align-items-center ihub-gap-2 ihub-mb-2">
              <div className="ihub-d-flex ihub-align-items-center ihub-gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`w-4 h-4 ${i < 4 ? "ihub-text-yellow-500" : "ihub-text-gray-300"}`} />
                ))}
                <span className="ihub-text-sm">(4.2)</span>
              </div>
            </div>
            
            <p className="ihub-text-muted ihub-mb-3">
              Advanced fitness tracking, heart rate monitoring, and 7-day battery life.
            </p>
            
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
              <span className="ihub-text-xl ihub-font-bold">$399.99</span>
              <button className="ihub-primary-btn ihub-btn-sm">Add to Cart</button>
            </div>
          </HorizontalCard>
        </CardGrid>
      </section>

      {/* Compact Horizontal Cards */}
      <section className="ihub-mb-5">
        <h2>Compact Horizontal Cards</h2>
        <p>Smaller horizontal cards for sidebar content or compact listings</p>
        
        <div className="ihub-d-flex ihub-flex-column ihub-gap-3" style={{ maxWidth: "450px" }}>
          <HorizontalCard
            imageUrl="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=300"
            imageAlt="Newsletter"
            title="Weekly Tech Newsletter"
            size="sm"
            border
          >
            <p className="ihub-text-sm ihub-text-muted ihub-mb-2">
              Stay updated with the latest in technology and development.
            </p>
            <button className="ihub-outlined-btn ihub-btn-xs">Subscribe</button>
          </HorizontalCard>
          
          <HorizontalCard
            imageUrl="https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300"
            imageAlt="Webinar"
            title="Live Webinar: React Best Practices"
            size="sm"
            border
            badge={{
              text: "Live",
              color: "danger",
            }}
          >
            <p className="ihub-text-sm ihub-text-muted ihub-mb-2">
              Join us for an in-depth discussion on React development.
            </p>
            <span className="ihub-text-xs ihub-text-muted">Jan 20, 2024 at 2:00 PM</span>
          </HorizontalCard>
        </div>
      </section>

      {/* Dark Theme Cards */}
      <section className="ihub-mb-5">
        <h2>Dark Theme Cards</h2>
        <p>Horizontal cards with dark theme styling</p>
        
        <div className="ihub-bg-dark ihub-p-4 ihub-rounded">
          <HorizontalCard
            imageUrl="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400"
            imageAlt="Gaming setup"
            title="Ultimate Gaming Experience"
            darkTheme
            shadow
            accent="purple"
            style={{ maxWidth: "600px" }}
          >
            <p className="ihub-text-light ihub-mb-3">
              Immerse yourself in the ultimate gaming experience with cutting-edge technology and superior performance.
            </p>
            
            <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
              <div className="ihub-d-flex ihub-gap-2">
                <Badge text="4K Gaming" variant="primary" />
                <Badge text="Ray Tracing" variant="success" />
              </div>
              <button className="ihub-btn ihub-btn-light ihub-btn-sm">Learn More</button>
            </div>
          </HorizontalCard>
        </div>
      </section>

      {/* Interactive Cards with Custom Actions */}
      <section className="ihub-mb-5">
        <h2>Interactive Cards with Actions</h2>
        <p>Cards with multiple interactive elements and custom actions</p>
        
        <HorizontalCard
          imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400"
          imageAlt="Team collaboration"
          title="Team Collaboration Platform"
          shadow
          border
          accent="rose"
          style={{ maxWidth: "700px" }}
          onClick={() => console.log("Card clicked")}
          className="ihub-cursor-pointer"
        >
          <p className="ihub-mb-3">
            Streamline your team's workflow with our comprehensive collaboration platform featuring real-time editing, task management, and communication tools.
          </p>
          
          <div className="ihub-d-flex ihub-gap-2 ihub-mb-3">
            <Badge text="Free Trial" variant="success" />
            <Badge text="Team Features" variant="info" />
            <Badge text="Enterprise Ready" variant="warning" />
          </div>
          
          <div className="ihub-d-flex ihub-justify-content-between ihub-align-items-center">
            <div className="ihub-d-flex ihub-gap-2">
              <button 
                className="ihub-primary-btn ihub-btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Start trial clicked");
                }}
              >
                Start Free Trial
              </button>
              <button 
                className="ihub-outlined-btn ihub-btn-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Watch demo clicked");
                }}
              >
                Watch Demo
              </button>
            </div>
            <div className="ihub-d-flex ihub-gap-1">
              <button className="ihub-btn-icon ihub-text-gray-500">
                <HeartIcon className="w-5 h-5" />
              </button>
              <button className="ihub-btn-icon ihub-text-gray-500">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </HorizontalCard>
      </section>
    </div>
  );
};

export default HorizontalCardExamples;
```

## 🔗 Related Components

- [MediaCard](./MediaCard.md) - Base media card component
- [Card](./Card.md) - Basic card component
- [FeatureCard](./FeatureCard.md) - Feature showcase card
- [ProfileCard](./ProfileCard.md) - User profile card component
- [CardGrid](./CardGrid.md) - Grid layout for cards
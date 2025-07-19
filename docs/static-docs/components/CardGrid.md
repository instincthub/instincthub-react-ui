# CardGrid

**Category:** UI | **Type:** component

Responsive grid layout component for organizing multiple cards with automatic sizing and spacing

**File Location:** `src/components/ui/cards/CardGrid.tsx`

## 🏷️ Tags

`ui`, `cards`, `grid`, `layout`, `responsive`

```tsx
"use client";
import React, { useState } from "react";
import { CardGrid } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating CardGrid usage
 * Shows different grid layouts, responsive behavior, and card content types
 */
const CardGridExamples = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [gridColumns, setGridColumns] = useState<number>(3);

  const sampleProducts = [
    { id: 1, name: "React UI Kit", price: 99.99, image: "🎨", category: "Design", rating: 4.8, sales: 1250 },
    { id: 2, name: "TypeScript Course", price: 49.99, image: "📚", category: "Education", rating: 4.9, sales: 890 },
    { id: 3, name: "Design System", price: 199.99, image: "🎯", category: "Templates", rating: 4.7, sales: 567 },
    { id: 4, name: "API Documentation", price: 29.99, image: "📖", category: "Documentation", rating: 4.6, sales: 1100 },
    { id: 5, name: "Mobile Template", price: 149.99, image: "📱", category: "Mobile", rating: 4.8, sales: 423 },
    { id: 6, name: "Dashboard Kit", price: 179.99, image: "📊", category: "Dashboard", rating: 4.5, sales: 780 },
  ];

  const teamMembers = [
    { id: 1, name: "John Doe", role: "Frontend Developer", avatar: "👨‍💻", department: "Engineering", experience: "5 years" },
    { id: 2, name: "Jane Smith", role: "UX Designer", avatar: "👩‍🎨", department: "Design", experience: "4 years" },
    { id: 3, name: "Bob Johnson", role: "Backend Developer", avatar: "👨‍💼", department: "Engineering", experience: "6 years" },
    { id: 4, name: "Alice Brown", role: "Product Manager", avatar: "👩‍💼", department: "Product", experience: "7 years" },
    { id: 5, name: "Charlie Wilson", role: "DevOps Engineer", avatar: "👨‍🔧", department: "Operations", experience: "3 years" },
    { id: 6, name: "Diana Davis", role: "Data Scientist", avatar: "👩‍🔬", department: "Analytics", experience: "4 years" },
  ];

  const blogPosts = [
    { id: 1, title: "Getting Started with React", excerpt: "Learn the basics of React development", date: "2024-01-15", readTime: "5 min", category: "Tutorial" },
    { id: 2, title: "TypeScript Best Practices", excerpt: "Advanced tips for TypeScript development", date: "2024-01-12", readTime: "8 min", category: "Best Practices" },
    { id: 3, title: "UI Design Principles", excerpt: "Core principles for effective UI design", date: "2024-01-10", readTime: "6 min", category: "Design" },
    { id: 4, title: "Performance Optimization", excerpt: "How to optimize React app performance", date: "2024-01-08", readTime: "10 min", category: "Performance" },
  ];

  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId);
    openToast(`Selected card: ${cardId}`);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    setViewMode(mode);
    openToast(`View changed to ${mode} mode`);
  };

  const handleColumnChange = (columns: number) => {
    setGridColumns(columns);
    openToast(`Grid columns set to ${columns}`);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>CardGrid Examples</h1>
      <p className="ihub-mb-4">
        Responsive grid layout component for organizing multiple cards with
        automatic sizing, spacing, and responsive behavior.
      </p>

      {/* Basic Card Grid */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Product Grid</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Product Catalog</h3>
            <p className="ihub-text-muted">Simple grid layout with product cards</p>
          </div>
          
          <div className="ihub-card-body">
            <CardGrid
              columns={3}
              gap="20px"
              className="ihub-product-grid"
            >
              {sampleProducts.map((product) => (
                <div
                  key={product.id}
                  className="ihub-product-card"
                  onClick={() => handleCardSelect(`product-${product.id}`)}
                >
                  <div className="ihub-card-image">
                    <span className="ihub-product-icon">{product.image}</span>
                  </div>
                  <div className="ihub-card-content">
                    <h4 className="ihub-product-name">{product.name}</h4>
                    <p className="ihub-product-category">{product.category}</p>
                    <div className="ihub-product-price">${product.price}</div>
                    <div className="ihub-product-meta">
                      <span className="ihub-rating">★ {product.rating}</span>
                      <span className="ihub-sales">{product.sales} sales</span>
                    </div>
                  </div>
                  <div className="ihub-card-actions">
                    <button className="ihub-primary-btn ihub-btn-sm">
                      Add to Cart
                    </button>
                    <button className="ihub-outlined-btn ihub-btn-sm">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </CardGrid>
          </div>
        </div>
      </section>

      {/* Responsive Grid with Controls */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Responsive Grid with Controls</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Team Members</h3>
            <p className="ihub-text-muted">Grid with responsive columns and view controls</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-grid-controls ihub-mb-4">
              <div className="ihub-control-group">
                <label className="ihub-form-label">Columns:</label>
                <div className="ihub-button-group">
                  {[2, 3, 4].map((cols) => (
                    <button
                      key={cols}
                      className={`ihub-outlined-btn ihub-btn-sm ${gridColumns === cols ? 'active' : ''}`}
                      onClick={() => handleColumnChange(cols)}
                    >
                      {cols}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="ihub-control-group">
                <label className="ihub-form-label">View Mode:</label>
                <div className="ihub-button-group">
                  <button
                    className={`ihub-outlined-btn ihub-btn-sm ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('grid')}
                  >
                    Grid
                  </button>
                  <button
                    className={`ihub-outlined-btn ihub-btn-sm ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => handleViewModeChange('list')}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
            
            <CardGrid
              columns={viewMode === 'list' ? 1 : gridColumns}
              gap="16px"
              responsive={{
                mobile: 1,
                tablet: viewMode === 'list' ? 1 : Math.min(2, gridColumns),
                desktop: viewMode === 'list' ? 1 : gridColumns
              }}
              className={`ihub-team-grid ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`ihub-team-card ${selectedCard === `member-${member.id}` ? 'selected' : ''}`}
                  onClick={() => handleCardSelect(`member-${member.id}`)}
                >
                  <div className="ihub-member-avatar">
                    <span className="ihub-avatar-icon">{member.avatar}</span>
                  </div>
                  <div className="ihub-member-info">
                    <h4 className="ihub-member-name">{member.name}</h4>
                    <p className="ihub-member-role">{member.role}</p>
                    <div className="ihub-member-meta">
                      <span className="ihub-department">{member.department}</span>
                      <span className="ihub-experience">{member.experience}</span>
                    </div>
                  </div>
                  <div className="ihub-member-actions">
                    <button className="ihub-outlined-btn ihub-btn-sm">
                      View Profile
                    </button>
                    <button className="ihub-text-btn ihub-btn-sm">
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </CardGrid>
          </div>
        </div>
      </section>

      {/* Auto-fit Grid */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Auto-fit Grid Layout</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Blog Posts</h3>
            <p className="ihub-text-muted">Grid that automatically fits available space</p>
          </div>
          
          <div className="ihub-card-body">
            <CardGrid
              autoFit={true}
              minCardWidth="300px"
              gap="24px"
              className="ihub-blog-grid"
            >
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="ihub-blog-card"
                  onClick={() => handleCardSelect(`post-${post.id}`)}
                >
                  <div className="ihub-blog-header">
                    <div className="ihub-blog-category">{post.category}</div>
                    <div className="ihub-blog-date">{post.date}</div>
                  </div>
                  <div className="ihub-blog-content">
                    <h4 className="ihub-blog-title">{post.title}</h4>
                    <p className="ihub-blog-excerpt">{post.excerpt}</p>
                  </div>
                  <div className="ihub-blog-footer">
                    <span className="ihub-read-time">📖 {post.readTime}</span>
                    <button className="ihub-text-btn">Read More →</button>
                  </div>
                </div>
              ))}
            </CardGrid>
          </div>
        </div>
      </section>

      {/* Masonry-style Grid */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Masonry-style Grid</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Mixed Content Cards</h3>
            <p className="ihub-text-muted">Grid with variable height cards</p>
          </div>
          
          <div className="ihub-card-body">
            <CardGrid
              columns={3}
              gap="16px"
              masonry={true}
              className="ihub-masonry-grid"
            >
              <div className="ihub-feature-card short">
                <div className="ihub-feature-icon">🚀</div>
                <h4>Quick Setup</h4>
                <p>Get started in minutes with our simple installation process.</p>
              </div>
              
              <div className="ihub-feature-card tall">
                <div className="ihub-feature-icon">⚡</div>
                <h4>High Performance</h4>
                <p>Optimized for speed and efficiency with minimal bundle size impact.</p>
                <ul className="ihub-feature-list">
                  <li>Tree-shaking support</li>
                  <li>Lazy loading components</li>
                  <li>Minimal dependencies</li>
                  <li>Optimized bundle splitting</li>
                </ul>
              </div>
              
              <div className="ihub-feature-card medium">
                <div className="ihub-feature-icon">🎨</div>
                <h4>Customizable Design</h4>
                <p>Fully customizable components that match your brand and design system.</p>
                <div className="ihub-color-palette">
                  <div className="ihub-color-swatch primary"></div>
                  <div className="ihub-color-swatch secondary"></div>
                  <div className="ihub-color-swatch accent"></div>
                </div>
              </div>
              
              <div className="ihub-feature-card medium">
                <div className="ihub-feature-icon">📱</div>
                <h4>Mobile First</h4>
                <p>Responsive design that works perfectly on all devices and screen sizes.</p>
              </div>
              
              <div className="ihub-feature-card short">
                <div className="ihub-feature-icon">♿</div>
                <h4>Accessible</h4>
                <p>Built with accessibility in mind following WCAG guidelines.</p>
              </div>
              
              <div className="ihub-feature-card tall">
                <div className="ihub-feature-icon">🔧</div>
                <h4>Developer Experience</h4>
                <p>Great developer experience with TypeScript support and comprehensive documentation.</p>
                <div className="ihub-tech-stack">
                  <span className="ihub-tech-badge">TypeScript</span>
                  <span className="ihub-tech-badge">React 18</span>
                  <span className="ihub-tech-badge">CSS Modules</span>
                  <span className="ihub-tech-badge">Storybook</span>
                </div>
              </div>
            </CardGrid>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Props Interface:</h3>
          <pre className="ihub-code-block">
{`interface CardGridProps {
  children: React.ReactNode;           // Card components to display
  columns?: number;                    // Number of columns (default: 3)
  gap?: string;                        // Gap between cards (default: "16px")
  className?: string;                  // CSS classes
  autoFit?: boolean;                   // Auto-fit cards to available space
  minCardWidth?: string;               // Minimum card width for auto-fit
  masonry?: boolean;                   // Enable masonry layout
  responsive?: {                       // Responsive breakpoints
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  alignItems?: 'start' | 'center' | 'end' | 'stretch'; // Vertical alignment
  justifyContent?: 'start' | 'center' | 'end' | 'space-between'; // Horizontal alignment
}`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>Responsive Design:</strong> Automatic adaptation to different screen sizes</li>
            <li><strong>Flexible Layouts:</strong> Fixed columns, auto-fit, and masonry options</li>
            <li><strong>Customizable Spacing:</strong> Configurable gaps and padding</li>
            <li><strong>Performance Optimized:</strong> Efficient rendering with CSS Grid</li>
            <li><strong>Accessibility:</strong> Proper focus management and keyboard navigation</li>
            <li><strong>TypeScript Support:</strong> Full type safety and IntelliSense</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use consistent card heights for better visual alignment</li>
            <li>Consider masonry layout for content with varying heights</li>
            <li>Implement responsive breakpoints for optimal mobile experience</li>
            <li>Use auto-fit for dynamic content that changes frequently</li>
            <li>Ensure cards have proper interactive states and accessibility</li>
            <li>Test grid behavior across different screen sizes and content lengths</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CardGridExamples;
```

## 🔗 Related Components

- [Card](./Card.md) - Basic card component
- [CardList](./CardList.md) - Card list layout component
- [FeatureCard](./FeatureCard.md) - Feature card component
- [MediaCard](./MediaCard.md) - Media card component
- [ProfileCard](./ProfileCard.md) - Profile card component


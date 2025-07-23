"use client";

import React, { useState } from "react";
import { CardGrid, SearchField, Badge } from "../../../../index";

const CardGridExample: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [gridColumns, setGridColumns] = useState(3);

  const sampleCards = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Learn the basics of React development with hooks and components",
      image: "https://via.placeholder.com/400x250/3b82f6/ffffff?text=React",
      category: "Frontend",
      price: "$49",
      rating: 4.8,
      students: 1234,
      duration: "8 hours",
      level: "Beginner",
      tags: ["React", "JavaScript", "Web Development"]
    },
    {
      id: 2,
      title: "Advanced TypeScript",
      description: "Master TypeScript patterns and advanced type system features",
      image: "https://via.placeholder.com/400x250/06b6d4/ffffff?text=TypeScript",
      category: "Programming",
      price: "$79",
      rating: 4.9,
      students: 856,
      duration: "12 hours",
      level: "Advanced",
      tags: ["TypeScript", "JavaScript", "Types"]
    },
    {
      id: 3,
      title: "Node.js API Development",
      description: "Build robust REST APIs with Node.js, Express, and MongoDB",
      image: "https://via.placeholder.com/400x250/10b981/ffffff?text=Node.js",
      category: "Backend",
      price: "$69",
      rating: 4.7,
      students: 2341,
      duration: "10 hours",
      level: "Intermediate",
      tags: ["Node.js", "Express", "MongoDB"]
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      description: "Create beautiful and user-friendly interfaces with design principles",
      image: "https://via.placeholder.com/400x250/8b5cf6/ffffff?text=Design",
      category: "Design",
      price: "$59",
      rating: 4.6,
      students: 987,
      duration: "6 hours",
      level: "Beginner",
      tags: ["UI", "UX", "Figma", "Design"]
    },
    {
      id: 5,
      title: "Python Data Science",
      description: "Analyze data and build machine learning models with Python",
      image: "https://via.placeholder.com/400x250/f59e0b/ffffff?text=Python",
      category: "Data Science",
      price: "$89",
      rating: 4.8,
      students: 1567,
      duration: "15 hours",
      level: "Intermediate",
      tags: ["Python", "Data Science", "ML"]
    },
    {
      id: 6,
      title: "DevOps with Docker",
      description: "Containerize applications and set up CI/CD pipelines",
      image: "https://via.placeholder.com/400x250/ef4444/ffffff?text=Docker",
      category: "DevOps",
      price: "$99",
      rating: 4.9,
      students: 743,
      duration: "14 hours",
      level: "Advanced",
      tags: ["Docker", "DevOps", "CI/CD"]
    },
    {
      id: 7,
      title: "Mobile App Development",
      description: "Build cross-platform mobile apps with React Native",
      image: "https://via.placeholder.com/400x250/06b6d4/ffffff?text=Mobile",
      category: "Mobile",
      price: "$79",
      rating: 4.7,
      students: 1123,
      duration: "11 hours",
      level: "Intermediate",
      tags: ["React Native", "Mobile", "iOS", "Android"]
    },
    {
      id: 8,
      title: "AWS Cloud Computing",
      description: "Deploy and manage applications on Amazon Web Services",
      image: "https://via.placeholder.com/400x250/f97316/ffffff?text=AWS",
      category: "Cloud",
      price: "$109",
      rating: 4.8,
      students: 892,
      duration: "16 hours",
      level: "Advanced",
      tags: ["AWS", "Cloud", "Infrastructure"]
    },
    {
      id: 9,
      title: "JavaScript ES6+",
      description: "Modern JavaScript features and best practices",
      image: "https://via.placeholder.com/400x250/fbbf24/ffffff?text=JavaScript",
      category: "Programming",
      price: "$39",
      rating: 4.5,
      students: 2156,
      duration: "7 hours",
      level: "Beginner",
      tags: ["JavaScript", "ES6", "Programming"]
    }
  ];

  const filteredCards = sampleCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || card.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (card: any) => {
    console.log("Card clicked:", card);
  };

  const handleCardAction = (action: string, card: any) => {
    console.log(`Action ${action} on card:`, card);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>CardGrid Examples</h1>
        <p>Card grid component for displaying cards in responsive grid layouts</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Card Grid */}
        <div className="ihub-example-card">
          <h3>Basic Card Grid</h3>
          <p>Simple responsive grid with default card styling</p>
          
          <CardGrid
            cards={sampleCards.slice(0, 6)}
            onCardClick={handleCardClick}
            columns={3}
            gap="medium"
          />
        </div>

        {/* Customizable Grid */}
        <div className="ihub-example-card">
          <h3>Customizable Grid Layout</h3>
          <p>Grid with adjustable columns and responsive breakpoints</p>
          
          <div className="ihub-grid-controls">
            <label>
              Columns: 
              <select value={gridColumns} onChange={(e) => setGridColumns(Number(e.target.value))}>
                <option value={2}>2 Columns</option>
                <option value={3}>3 Columns</option>
                <option value={4}>4 Columns</option>
                <option value={6}>6 Columns</option>
              </select>
            </label>
          </div>
          
          <CardGrid
            cards={sampleCards}
            onCardClick={handleCardClick}
            columns={gridColumns}
            responsiveColumns={{
              mobile: 1,
              tablet: 2,
              desktop: gridColumns
            }}
            gap="large"
            showCardFooter={true}
            showCardActions={true}
            cardActions={[
              { label: "View", action: "view", icon: "👁️" },
              { label: "Bookmark", action: "bookmark", icon: "🔖" }
            ]}
            onCardAction={handleCardAction}
          />
        </div>

        {/* Searchable and Filterable Grid */}
        <div className="ihub-example-card">
          <h3>Searchable and Filterable Grid</h3>
          <p>Grid with search and category filtering</p>
          
          <div className="ihub-grid-filters">
            <SearchField
              placeholder="Search courses..."
              onSearch={setSearchTerm}
              value={searchTerm}
            />
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="ihub-category-filter"
            >
              <option value="all">All Categories</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="design">Design</option>
              <option value="data science">Data Science</option>
              <option value="devops">DevOps</option>
              <option value="mobile">Mobile</option>
              <option value="cloud">Cloud</option>
              <option value="programming">Programming</option>
            </select>
          </div>
          
          <CardGrid
            cards={filteredCards}
            onCardClick={handleCardClick}
            columns={3}
            gap="medium"
            showLoadingState={false}
            emptyState={{
              title: "No courses found",
              description: "Try adjusting your search or filters",
              icon: "🔍"
            }}
          />
          
          <div className="ihub-results-count">
            {filteredCards.length} courses found
          </div>
        </div>

        {/* Course Card Grid with Rich Content */}
        <div className="ihub-example-card">
          <h3>Rich Content Card Grid</h3>
          <p>Grid with detailed card content and interactive elements</p>
          
          <CardGrid
            cards={sampleCards.map(card => ({
              ...card,
              customContent: (
                <div className="ihub-course-card">
                  <div className="ihub-course-image">
                    <img src={card.image} alt={card.title} />
                    <Badge text={card.level} variant="primary" className="ihub-level-badge" />
                  </div>
                  <div className="ihub-course-content">
                    <h4 className="ihub-course-title">{card.title}</h4>
                    <p className="ihub-course-description">{card.description}</p>
                    
                    <div className="ihub-course-meta">
                      <div className="ihub-rating">
                        ⭐ {card.rating} ({card.students} students)
                      </div>
                      <div className="ihub-duration">
                        🕒 {card.duration}
                      </div>
                    </div>
                    
                    <div className="ihub-course-tags">
                      {card.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="ihub-course-tag">{tag}</span>
                      ))}
                    </div>
                    
                    <div className="ihub-course-footer">
                      <span className="ihub-course-price">{card.price}</span>
                      <button className="ihub-enroll-btn">Enroll Now</button>
                    </div>
                  </div>
                </div>
              )
            }))}
            columns={3}
            gap="large"
            useCustomTemplate={true}
            onCardClick={handleCardClick}
          />
        </div>

        {/* Masonry Grid */}
        <div className="ihub-example-card">
          <h3>Masonry Grid Layout</h3>
          <p>Pinterest-style masonry grid with varying card heights</p>
          
          <CardGrid
            cards={sampleCards.map((card, index) => ({
              ...card,
              height: `${200 + (index % 3) * 100}px`, // Varying heights
              customContent: (
                <div className="ihub-masonry-card" style={{ height: card.height }}>
                  <img src={card.image} alt={card.title} />
                  <div className="ihub-masonry-content">
                    <h4>{card.title}</h4>
                    <p>{card.description}</p>
                    <div className="ihub-masonry-meta">
                      <Badge text={card.category} variant="secondary" />
                      <span>{card.price}</span>
                    </div>
                  </div>
                </div>
              )
            }))}
            layout="masonry"
            columns={4}
            gap="medium"
            useCustomTemplate={true}
            onCardClick={handleCardClick}
          />
        </div>

        {/* Loading and Empty States */}
        <div className="ihub-example-card">
          <h3>Loading and Empty States</h3>
          <p>Grid with loading skeleton and empty state demonstrations</p>
          
          <div className="ihub-state-demos">
            <div className="ihub-state-demo">
              <h5>Loading State</h5>
              <CardGrid
                cards={[]}
                columns={3}
                gap="medium"
                showLoadingState={true}
                loadingCards={6}
              />
            </div>
            
            <div className="ihub-state-demo">
              <h5>Empty State</h5>
              <CardGrid
                cards={[]}
                columns={3}
                gap="medium"
                showLoadingState={false}
                emptyState={{
                  title: "No items found",
                  description: "There are no items to display at the moment.",
                  icon: "📭",
                  actionButton: {
                    label: "Add New Item",
                    onClick: () => console.log("Add new item clicked")
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { CardGrid } from '@instincthub/react-ui';

const cards = [
  {
    id: 1,
    title: "Card Title",
    description: "Card description",
    image: "image-url"
  }
];

<CardGrid
  cards={cards}
  onCardClick={handleCardClick}
  columns={3}
  gap="medium"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Responsive Grid</h3>
          <pre><code>{`<CardGrid
  cards={cards}
  columns={4}
  responsiveColumns={{
    mobile: 1,
    tablet: 2,
    desktop: 4
  }}
  gap="large"
  showCardActions={true}
  cardActions={[
    { label: "View", action: "view" },
    { label: "Edit", action: "edit" }
  ]}
  onCardAction={handleCardAction}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Custom Card Template</h3>
          <pre><code>{`<CardGrid
  cards={cards.map(card => ({
    ...card,
    customContent: (
      <div className="custom-card">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
        <Badge text={card.category} />
      </div>
    )
  }))}
  columns={3}
  useCustomTemplate={true}
  onCardClick={handleCardClick}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default CardGridExample;
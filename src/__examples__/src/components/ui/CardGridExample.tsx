"use client";

import React, { useState } from "react";
import { CardGrid, SearchField, Badge, Card } from "../../../../index";

const CardGridExample: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
          <p>Simple responsive grid with card components</p>
          
          <CardGrid className="ihub-grid-3-cols">
            {sampleCards.slice(0, 3).map(card => (
              <Card
                key={card.id}
                title={card.title}
                onClick={() => handleCardClick(card)}
                className="ihub-course-card"
              >
                <div className="ihub-card-image">
                  <img src={card.image} alt={card.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                </div>
                <p>{card.description}</p>
                <div className="ihub-card-meta">
                  <Badge text={card.level} />
                  <span className="ihub-price">{card.price}</span>
                </div>
                <div className="ihub-rating">
                  ⭐ {card.rating} ({card.students} students)
                </div>
              </Card>
            ))}
          </CardGrid>
        </div>

        {/* Card Grid with Search and Filter */}
        <div className="ihub-example-card">
          <h3>Searchable and Filterable Grid</h3>
          <p>Grid with search and category filtering</p>
          
          <div className="ihub-grid-filters ihub-mb-20">
            <SearchField
              labels="courses"
              setSearchValues={setSearchTerm}
              className="ihub-mr-10"
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
              <option value="programming">Programming</option>
            </select>
          </div>
          
          <CardGrid className="ihub-grid-2-cols">
            {filteredCards.length > 0 ? (
              filteredCards.map(card => (
                <Card
                  key={card.id}
                  title={card.title}
                  onClick={() => handleCardClick(card)}
                  accent="cyan"
                >
                  <div className="ihub-card-image">
                    <img src={card.image} alt={card.title} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                  </div>
                  <p>{card.description}</p>
                  <div className="ihub-card-tags">
                    {card.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="ihub-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="ihub-card-footer-meta">
                    <Badge text={card.category} />
                    <span>{card.duration}</span>
                  </div>
                </Card>
              ))
            ) : (
              <div className="ihub-empty-state ihub-col-span-2">
                <h4>No courses found</h4>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </CardGrid>
          
          <div className="ihub-results-count ihub-mt-10">
            {filteredCards.length} courses found
          </div>
        </div>

        {/* Different Card Styles */}
        <div className="ihub-example-card">
          <h3>Different Card Styles</h3>
          <p>Grid showcasing different card accent colors and sizes</p>
          
          <CardGrid className="ihub-grid-4-cols">
            <Card title="Cyan Accent" accent="cyan" size="sm">
              <p>Card with cyan accent color and small size</p>
            </Card>
            <Card title="Rose Accent" accent="rose" shadow={true}>
              <p>Card with rose accent and shadow</p>
            </Card>
            <Card title="Green Accent" accent="green" border={false}>
              <p>Card with green accent and no border</p>
            </Card>
            <Card title="Purple Accent" accent="purple" accentHeader={true}>
              <p>Card with purple accent header</p>
            </Card>
          </CardGrid>
        </div>

        {/* Cards with Footer */}
        <div className="ihub-example-card">
          <h3>Cards with Footer</h3>
          <p>Grid with cards that have footer content</p>
          
          <CardGrid className="ihub-grid-3-cols">
            {sampleCards.slice(0, 3).map(card => (
              <Card
                key={card.id}
                title={card.title}
                footer={
                  <div className="ihub-card-actions">
                    <button className="ihub-btn-primary">Enroll</button>
                    <button className="ihub-btn-secondary">Preview</button>
                  </div>
                }
              >
                <p>{card.description}</p>
                <div className="ihub-course-price">
                  <strong>{card.price}</strong>
                </div>
              </Card>
            ))}
          </CardGrid>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { CardGrid, Card } from '@instincthub/react-ui';

<CardGrid className="ihub-grid-3-cols">
  <Card title="Card Title" accent="cyan">
    <p>Card content goes here</p>
  </Card>
  <Card title="Another Card" accent="rose">
    <p>More card content</p>
  </Card>
</CardGrid>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Card with Footer</h3>
          <pre><code>{`<Card
  title="Card with Footer"
  footer={
    <div className="card-actions">
      <button>Action 1</button>
      <button>Action 2</button>
    </div>
  }
>
  <p>Card content here</p>
</Card>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Search and Filter Integration</h3>
          <pre><code>{`const [searchTerm, setSearchTerm] = useState("");
const [filteredCards, setFilteredCards] = useState(cards);

<SearchField
  labels="cards"
  setSearchValues={setSearchTerm}
/>

<CardGrid className="ihub-grid-2-cols">
  {filteredCards.map(card => (
    <Card key={card.id} title={card.title}>
      <p>{card.description}</p>
    </Card>
  ))}
</CardGrid>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default CardGridExample;
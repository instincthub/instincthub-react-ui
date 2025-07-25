"use client";

import React, { useState } from "react";
import { CardList, Card, SearchField, Badge } from "../../../../index";

const CardListExample: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const sampleCards = [
    {
      id: 1,
      title: "React Development",
      description: "Build modern web applications with React and TypeScript",
      image: "https://via.placeholder.com/300x200/4f46e5/ffffff?text=React",
      category: "Frontend",
      status: "active",
      author: "John Doe",
      date: "2024-01-15",
      tags: ["React", "TypeScript", "Web Development"]
    },
    {
      id: 2,
      title: "Node.js Backend",
      description: "Create robust backend services with Node.js and Express",
      image: "https://via.placeholder.com/300x200/059669/ffffff?text=Node.js",
      category: "Backend",
      status: "completed",
      author: "Jane Smith",
      date: "2024-01-10",
      tags: ["Node.js", "Express", "API"]
    },
    {
      id: 3,
      title: "Database Design",
      description: "Learn database design principles and optimization techniques",
      image: "https://via.placeholder.com/300x200/dc2626/ffffff?text=Database",
      category: "Database",
      status: "draft",
      author: "Bob Johnson",
      date: "2024-01-12",
      tags: ["SQL", "MongoDB", "Design"]
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "Master the principles of user interface and experience design",
      image: "https://via.placeholder.com/300x200/7c3aed/ffffff?text=Design",
      category: "Design",
      status: "active",
      author: "Alice Brown",
      date: "2024-01-08",
      tags: ["UI", "UX", "Figma"]
    },
    {
      id: 5,
      title: "DevOps Practices",
      description: "Implement CI/CD pipelines and infrastructure automation",
      image: "https://via.placeholder.com/300x200/ea580c/ffffff?text=DevOps",
      category: "DevOps",
      status: "active",
      author: "Charlie Wilson",
      date: "2024-01-14",
      tags: ["Docker", "AWS", "CI/CD"]
    },
    {
      id: 6,
      title: "Mobile Development",
      description: "Build cross-platform mobile applications with React Native",
      image: "https://via.placeholder.com/300x200/0891b2/ffffff?text=Mobile",
      category: "Mobile",
      status: "completed",
      author: "Eva Davis",
      date: "2024-01-09",
      tags: ["React Native", "Mobile", "iOS", "Android"]
    }
  ];

  const filteredCards = sampleCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === "all" || card.category.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });

  const handleCardClick = (card: any) => {
    console.log("Card clicked:", card);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>CardList Examples</h1>
        <p>Card list component for displaying collections of cards in a vertical layout</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Card List */}
        <div className="ihub-example-card">
          <h3>Basic Card List</h3>
          <p>Simple card list with default cards</p>
          
          <CardList>
            {sampleCards.slice(0, 3).map((card) => (
              <Card
                key={card.id}
                title={card.title}
                onClick={() => handleCardClick(card)}
              >
                <p>{card.description}</p>
                <div className="ihub-card-meta">
                  <span>By {card.author}</span>
                  <span> • {card.date}</span>
                </div>
              </Card>
            ))}
          </CardList>
        </div>

        {/* Card List with Badges */}
        <div className="ihub-example-card">
          <h3>Card List with Status Badges</h3>
          <p>Cards showing status information with badges</p>
          
          <CardList>
            {sampleCards.map((card) => (
              <Card
                key={card.id}
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{card.title}</span>
                    <Badge
                      text={card.status}
                      variant={card.status === 'active' ? 'success' : 
                              card.status === 'completed' ? 'primary' : 'warning'}
                    />
                  </div>
                }
                onClick={() => handleCardClick(card)}
              >
                <p>{card.description}</p>
                <div className="ihub-card-tags" style={{ marginTop: '10px' }}>
                  {card.tags.map((tag, index) => (
                    <Badge key={index} text={tag} variant="secondary" />
                  ))}
                </div>
              </Card>
            ))}
          </CardList>
        </div>

        {/* Card List with Images */}
        <div className="ihub-example-card">
          <h3>Card List with Images</h3>
          <p>Cards displaying images alongside content</p>
          
          <CardList>
            {sampleCards.slice(0, 4).map((card) => (
              <Card
                key={card.id}
                title={card.title}
                onClick={() => handleCardClick(card)}
              >
                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <img 
                    src={card.image} 
                    alt={card.title}
                    style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <p>{card.description}</p>
                    <div className="ihub-card-meta" style={{ marginTop: '10px' }}>
                      <span>By {card.author}</span>
                      <span> • {card.date}</span>
                      <span> • {card.category}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </CardList>
        </div>

        {/* Searchable and Filterable */}
        <div className="ihub-example-card">
          <h3>Searchable and Filterable Card List</h3>
          <p>Card list with search and filter functionality</p>
          
          <div className="ihub-card-controls" style={{ marginBottom: '20px' }}>
            <SearchField
              labels="cards"
              setSearchValues={setSearchTerm}
            />
            
            <div className="ihub-filter-controls" style={{ marginTop: '10px' }}>
              <label>Filter by category: </label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="ihub-filter-select"
                style={{ marginLeft: '10px', padding: '5px' }}
              >
                <option value="all">All Categories</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="design">Design</option>
                <option value="devops">DevOps</option>
                <option value="mobile">Mobile</option>
              </select>
            </div>
          </div>
          
          {filteredCards.length > 0 ? (
            <CardList>
              {filteredCards.map((card) => (
                <Card
                  key={card.id}
                  title={card.title}
                  onClick={() => handleCardClick(card)}
                  footer={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{card.category}</span>
                      <Badge
                        text={card.status}
                        variant={card.status === 'active' ? 'success' : 
                                card.status === 'completed' ? 'primary' : 'warning'}
                      />
                    </div>
                  }
                >
                  <p>{card.description}</p>
                  <div className="ihub-card-meta" style={{ marginTop: '10px' }}>
                    <span>By {card.author}</span>
                    <span> • {card.date}</span>
                  </div>
                </Card>
              ))}
            </CardList>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>🔍 No cards found</p>
              <p style={{ color: '#666', marginTop: '10px' }}>Try adjusting your search or filter criteria</p>
            </div>
          )}
          
          <div className="ihub-results-summary" style={{ marginTop: '15px', textAlign: 'center', color: '#666' }}>
            Showing {filteredCards.length} of {sampleCards.length} cards
          </div>
        </div>

        {/* Card List with Accent Colors */}
        <div className="ihub-example-card">
          <h3>Card List with Accent Colors</h3>
          <p>Cards with different accent colors for visual hierarchy</p>
          
          <CardList>
            <Card
              title="Primary Accent Card"
              accent="cyan"
              accentHeader={true}
            >
              <p>This card uses a primary accent color to draw attention</p>
            </Card>
            <Card
              title="Success Accent Card"
              accent="green"
              accentHeader={true}
            >
              <p>This card uses a success accent color for positive actions</p>
            </Card>
            <Card
              title="Purple Accent Card"
              accent="purple"
              accentHeader={true}
            >
              <p>This card uses a purple accent color for important notices</p>
            </Card>
            <Card
              title="Rose Accent Card"
              accent="rose"
              accentHeader={true}
            >
              <p>This card uses a rose accent color for critical information</p>
            </Card>
          </CardList>
        </div>

        {/* Customized Card List */}
        <div className="ihub-example-card">
          <h3>Custom Styled Card List</h3>
          <p>Card list with custom styling and dark theme</p>
          
          <CardList className="custom-card-list">
            {sampleCards.slice(0, 3).map((card, index) => (
              <Card
                key={card.id}
                title={card.title}
                darkTheme={index % 2 === 0}
                shadow={true}
                border={true}
                onClick={() => handleCardClick(card)}
                footer={
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      className="ihub-btn ihub-btn-sm ihub-btn-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('View clicked for:', card.title);
                      }}
                    >
                      View
                    </button>
                    <button 
                      className="ihub-btn ihub-btn-sm ihub-btn-secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Edit clicked for:', card.title);
                      }}
                    >
                      Edit
                    </button>
                  </div>
                }
              >
                <p>{card.description}</p>
                <div className="ihub-card-tags" style={{ marginTop: '10px' }}>
                  {card.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="ihub-tag" style={{ marginRight: '5px' }}>{tag}</span>
                  ))}
                </div>
              </Card>
            ))}
          </CardList>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { CardList, Card } from '@instincthub/react-ui';

<CardList>
  <Card title="Card Title">
    <p>Card content goes here</p>
  </Card>
  <Card title="Another Card">
    <p>More content</p>
  </Card>
</CardList>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Card with Full Features</h3>
          <pre><code>{`<CardList>
  <Card
    title="Card Title"
    footer={<button>Action</button>}
    accent="cyan"
    accentHeader={true}
    onClick={handleCardClick}
  >
    <p>Card description</p>
    <div>
      <span>By Author Name</span>
      <span> • 2024-01-15</span>
    </div>
  </Card>
</CardList>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Dynamic Card List</h3>
          <pre><code>{`const cards = [
  { id: 1, title: "Card 1", description: "Description 1" },
  { id: 2, title: "Card 2", description: "Description 2" }
];

<CardList>
  {cards.map(card => (
    <Card
      key={card.id}
      title={card.title}
      onClick={() => handleCardClick(card)}
    >
      <p>{card.description}</p>
    </Card>
  ))}
</CardList>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Custom Styled Card List</h3>
          <pre><code>{`<CardList className="custom-list">
  <Card
    title="Dark Theme Card"
    darkTheme={true}
    shadow={true}
    border={true}
  >
    <p>Card with dark theme styling</p>
  </Card>
</CardList>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default CardListExample;
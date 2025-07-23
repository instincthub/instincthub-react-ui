"use client";

import React, { useState } from "react";
import { CardList, SearchField, Badge } from "../../../../index";

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

  const handleCardAction = (action: string, card: any) => {
    console.log(`Action ${action} on card:`, card);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>CardList Examples</h1>
        <p>Card list component for displaying collections of cards in various layouts</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Card List */}
        <div className="ihub-example-card">
          <h3>Basic Card List</h3>
          <p>Simple card list with default layout</p>
          
          <CardList
            cards={sampleCards.slice(0, 3)}
            onCardClick={handleCardClick}
            layout="default"
          />
        </div>

        {/* Compact Card List */}
        <div className="ihub-example-card">
          <h3>Compact Card List</h3>
          <p>Compact layout for displaying more cards in less space</p>
          
          <CardList
            cards={sampleCards}
            onCardClick={handleCardClick}
            layout="compact"
            showImage={false}
            showAuthor={true}
            showDate={true}
          />
        </div>

        {/* Grid Card List */}
        <div className="ihub-example-card">
          <h3>Grid Card List</h3>
          <p>Grid layout with responsive columns</p>
          
          <CardList
            cards={sampleCards}
            onCardClick={handleCardClick}
            layout="grid"
            columns={3}
            showImage={true}
            showTags={true}
            cardActions={[
              { label: "View", action: "view" },
              { label: "Edit", action: "edit" },
              { label: "Delete", action: "delete" }
            ]}
            onCardAction={handleCardAction}
          />
        </div>

        {/* Searchable and Filterable */}
        <div className="ihub-example-card">
          <h3>Searchable and Filterable Card List</h3>
          <p>Card list with search and filter functionality</p>
          
          <div className="ihub-card-controls">
            <SearchField
              placeholder="Search cards..."
              onSearch={setSearchTerm}
              value={searchTerm}
            />
            
            <div className="ihub-filter-controls">
              <label>Filter by category:</label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="ihub-filter-select"
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
          
          <CardList
            cards={filteredCards}
            onCardClick={handleCardClick}
            layout="list"
            showImage={true}
            showAuthor={true}
            showDate={true}
            showTags={true}
            emptyState={{
              title: "No cards found",
              description: "Try adjusting your search or filter criteria",
              icon: "🔍"
            }}
          />
          
          <div className="ihub-results-summary">
            Showing {filteredCards.length} of {sampleCards.length} cards
          </div>
        </div>

        {/* Interactive Card List */}
        <div className="ihub-example-card">
          <h3>Interactive Card List</h3>
          <p>Card list with selection, sorting, and batch actions</p>
          
          <CardList
            cards={sampleCards}
            onCardClick={handleCardClick}
            layout="list"
            selectable={true}
            sortable={true}
            sortOptions={[
              { key: "title", label: "Title" },
              { key: "date", label: "Date" },
              { key: "author", label: "Author" },
              { key: "category", label: "Category" }
            ]}
            showBulkActions={true}
            bulkActions={[
              { label: "Archive", action: "archive" },
              { label: "Export", action: "export" },
              { label: "Delete", action: "bulk-delete" }
            ]}
            showImage={true}
            showAuthor={true}
            showDate={true}
            showTags={true}
            cardActions={[
              { label: "View", action: "view" },
              { label: "Edit", action: "edit" }
            ]}
            onCardAction={handleCardAction}
          />
        </div>

        {/* Customized Card List */}
        <div className="ihub-example-card">
          <h3>Customized Card Rendering</h3>
          <p>Card list with custom card templates and styling</p>
          
          <CardList
            cards={sampleCards.map(card => ({
              ...card,
              customContent: (
                <div className="ihub-custom-card-content">
                  <div className="ihub-card-header">
                    <h4>{card.title}</h4>
                    <Badge
                      text={card.status}
                      variant={card.status === 'active' ? 'success' : 
                              card.status === 'completed' ? 'primary' : 'warning'}
                    />
                  </div>
                  <p className="ihub-card-description">{card.description}</p>
                  <div className="ihub-card-meta">
                    <span>By {card.author}</span>
                    <span>{card.date}</span>
                  </div>
                  <div className="ihub-card-tags">
                    {card.tags.map((tag, index) => (
                      <span key={index} className="ihub-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              )
            }))}
            onCardClick={handleCardClick}
            layout="custom"
            useCustomTemplate={true}
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { CardList } from '@instincthub/react-ui';

const cards = [
  {
    id: 1,
    title: "Card Title",
    description: "Card description",
    image: "image-url",
    author: "Author Name",
    date: "2024-01-15"
  }
];

<CardList
  cards={cards}
  onCardClick={handleCardClick}
  layout="default"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Grid Layout with Actions</h3>
          <pre><code>{`<CardList
  cards={cards}
  onCardClick={handleCardClick}
  layout="grid"
  columns={3}
  showImage={true}
  showTags={true}
  cardActions={[
    { label: "View", action: "view" },
    { label: "Edit", action: "edit" }
  ]}
  onCardAction={handleCardAction}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Interactive Features</h3>
          <pre><code>{`<CardList
  cards={cards}
  layout="list"
  selectable={true}
  sortable={true}
  sortOptions={[
    { key: "title", label: "Title" },
    { key: "date", label: "Date" }
  ]}
  showBulkActions={true}
  bulkActions={[
    { label: "Archive", action: "archive" },
    { label: "Delete", action: "delete" }
  ]}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default CardListExample;
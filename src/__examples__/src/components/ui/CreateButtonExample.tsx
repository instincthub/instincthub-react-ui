"use client";

import React, { useState } from "react";
import { CreateButton } from "../../../../index";

const CreateButtonExample: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);

  const handleCreate = (type: string) => {
    const newItem = `New ${type} ${Date.now()}`;
    setItems(prev => [newItem, ...prev]);
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>CreateButton Examples</h1>
        <p>Create button component for adding new items, posts, users, and more</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Create Buttons */}
        <div className="ihub-example-card">
          <h3>Basic Create Buttons</h3>
          <p>Simple create buttons for different content types</p>
          
          <div className="ihub-create-buttons">
            <CreateButton
              label="Create Post"
              onClick={() => handleCreate('Post')}
              icon="add"
            />
            
            <CreateButton
              label="Create User"
              onClick={() => handleCreate('User')}
              icon="person_add"
              variant="secondary"
            />
            
            <CreateButton
              label="Create Project"
              onClick={() => handleCreate('Project')}
              icon="folder_add"
              variant="outline"
            />
          </div>
        </div>

        {/* Dropdown Create Button */}
        <div className="ihub-example-card">
          <h3>Create Button with Dropdown</h3>
          <p>Create button with multiple creation options</p>
          
          <CreateButton
            label="Create New"
            onClick={() => handleCreate('Default')}
            showDropdown={true}
            dropdownOptions={[
              { label: 'Blog Post', onClick: () => handleCreate('Blog Post'), icon: 'article' },
              { label: 'Page', onClick: () => handleCreate('Page'), icon: 'description' },
              { label: 'Gallery', onClick: () => handleCreate('Gallery'), icon: 'photo_library' },
              { label: 'Video', onClick: () => handleCreate('Video'), icon: 'videocam' }
            ]}
          />
        </div>

        {/* Different Sizes */}
        <div className="ihub-example-card">
          <h3>Different Sizes</h3>
          <p>Create buttons in various sizes</p>
          
          <div className="ihub-size-buttons">
            <CreateButton
              label="Small"
              onClick={() => handleCreate('Small Item')}
              size="small"
            />
            
            <CreateButton
              label="Medium"
              onClick={() => handleCreate('Medium Item')}
              size="medium"
            />
            
            <CreateButton
              label="Large"
              onClick={() => handleCreate('Large Item')}
              size="large"
            />
          </div>
        </div>

        {/* Created Items List */}
        <div className="ihub-example-card">
          <h3>Created Items</h3>
          <p>Items created using the buttons above</p>
          
          <div className="ihub-items-list">
            {items.length === 0 ? (
              <p className="ihub-empty-state">No items created yet. Use the create buttons above!</p>
            ) : (
              items.map((item, index) => (
                <div key={index} className="ihub-item">
                  <span>{item}</span>
                  <button 
                    onClick={() => setItems(prev => prev.filter((_, i) => i !== index))}
                    className="ihub-delete-btn"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
          
          {items.length > 0 && (
            <button 
              onClick={() => setItems([])}
              className="ihub-clear-btn"
            >
              Clear All Items
            </button>
          )}
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { CreateButton } from '@instincthub/react-ui';

<CreateButton
  label="Create Post"
  onClick={() => handleCreate()}
  icon="add"
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default CreateButtonExample;
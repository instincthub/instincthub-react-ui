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
              icon={<span>📝</span>}
              variant="important"
            />
            
            <CreateButton
              label="Create User"
              onClick={() => handleCreate('User')}
              icon={<span>👤</span>}
              variant="primary"
            />
            
            <CreateButton
              label="Create Project"
              onClick={() => handleCreate('Project')}
              icon={<span>📁</span>}
              variant="outlined"
            />
            
            <CreateButton
              label="Delete Item"
              onClick={() => handleCreate('Deleted Item')}
              icon={<span>🗑️</span>}
              variant="danger"
            />
          </div>
        </div>

        {/* Create Button with Search Parameters */}
        <div className="ihub-example-card">
          <h3>Create Button with URL Parameters</h3>
          <p>Create button that updates URL search parameters</p>
          
          <div className="ihub-url-buttons">
            <CreateButton
              label="Create Course"
              searchParam={{ key: "create", value: "course" }}
              icon={<span>🎓</span>}
              variant="important"
            />
            
            <CreateButton
              label="Create Module"
              searchParam={{ key: "create", value: "module" }}
              icon={<span>📚</span>}
              variant="primary"
            />
          </div>
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
              icon={<span>🔹</span>}
            />
            
            <CreateButton
              label="Medium"
              onClick={() => handleCreate('Medium Item')}
              size="medium"
              icon={<span>🔸</span>}
            />
            
            <CreateButton
              label="Large"
              onClick={() => handleCreate('Large Item')}
              size="large"
              icon={<span>🔶</span>}
            />
          </div>
        </div>

        {/* Loading and Disabled States */}
        <div className="ihub-example-card">
          <h3>Button States</h3>
          <p>Create buttons with loading and disabled states</p>
          
          <div className="ihub-state-buttons">
            <CreateButton
              label="Loading Button"
              onClick={() => handleCreate('Loading Item')}
              loading={true}
              variant="important"
            />
            
            <CreateButton
              label="Disabled Button"
              onClick={() => handleCreate('Disabled Item')}
              disabled={true}
              variant="primary"
            />
            
            <CreateButton
              label="No Animation"
              onClick={() => handleCreate('Static Item')}
              animated={false}
              variant="outlined"
              icon={<span>⚡</span>}
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
  icon={<span>📝</span>}
  variant="important"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With URL Parameters</h3>
          <pre><code>{`<CreateButton
  label="Create Course"
  searchParam={{ key: "create", value: "course" }}
  icon={<span>🎓</span>}
  variant="primary"
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Different States</h3>
          <pre><code>{`<CreateButton
  label="Loading Button"
  loading={true}
  variant="important"
/>

<CreateButton
  label="Disabled Button"
  disabled={true}
  variant="primary"
/>

<CreateButton
  label="No Animation"
  animated={false}
  variant="outlined"
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default CreateButtonExample;
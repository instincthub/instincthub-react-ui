"use client";

import React, { useState } from "react";
import { RandomGradientImage, SubmitButton } from "../../../../index";

const RandomGradientImageExample: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const refreshGradients = () => {
    setRefreshKey(prev => prev + 1);
  };

  const sampleImages = [
    "https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Sample+1",
    "https://via.placeholder.com/300x200/4ECDC4/FFFFFF?text=Sample+2",
    "https://via.placeholder.com/300x200/45B7D1/FFFFFF?text=Sample+3",
    "https://via.placeholder.com/300x200/F9CA24/FFFFFF?text=Sample+4"
  ];

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>RandomGradientImage Examples</h1>
        <p>Component that displays either an image or a random gradient background</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Random Gradient */}
        <div className="ihub-example-card">
          <h3>Basic Random Gradient</h3>
          <p>Default random gradient with standard dimensions</p>
          
          <RandomGradientImage
            key={`basic-${refreshKey}`}
            width={300}
            height={200}
          />
          
          <div className="ihub-example-controls">
            <button 
              onClick={refreshGradients}
              className="ihub-refresh-btn"
            >
              Generate New Gradient
            </button>
          </div>
        </div>

        {/* Different Sizes */}
        <div className="ihub-example-card">
          <h3>Different Sizes</h3>
          <p>Random gradients with various dimensions</p>
          
          <div className="ihub-gradient-sizes">
            <div className="ihub-size-demo">
              <h5>Small (150x100)</h5>
              <RandomGradientImage
                key={`small-${refreshKey}`}
                width={150}
                height={100}
              />
            </div>
            
            <div className="ihub-size-demo">
              <h5>Medium (300x200)</h5>
              <RandomGradientImage
                key={`medium-${refreshKey}`}
                width={300}
                height={200}
              />
            </div>
            
            <div className="ihub-size-demo">
              <h5>Large (400x250)</h5>
              <RandomGradientImage
                key={`large-${refreshKey}`}
                width={400}
                height={250}
              />
            </div>
          </div>
        </div>

        {/* With Image Thumbnail */}
        <div className="ihub-example-card">
          <h3>With Image Thumbnail</h3>
          <p>When thumbnail is provided, shows the image instead of gradient</p>
          
          <div className="ihub-thumbnail-examples">
            <div className="ihub-thumbnail-demo">
              <h5>With Valid Image</h5>
              <RandomGradientImage
                thumbnail={sampleImages[0]}
                title="Sample Image 1"
                width={250}
                height={180}
              />
            </div>
            
            <div className="ihub-thumbnail-demo">
              <h5>Fallback to Gradient</h5>
              <p className="text-sm text-gray-600">When thumbnail fails to load, shows random gradient</p>
              <RandomGradientImage
                key={`fallback-${refreshKey}`}
                thumbnail="https://invalid-url.com/image.jpg"
                title="Fallback Example"
                width={250}
                height={180}
              />
            </div>
          </div>
        </div>

        {/* Square Gradients */}
        <div className="ihub-example-card">
          <h3>Square Gradients</h3>
          <p>Perfect squares with random gradient backgrounds</p>
          
          <div className="ihub-square-gradients">
            <RandomGradientImage
              key={`square1-${refreshKey}`}
              width={200}
              height={200}
              title="Square 1"
            />
            
            <RandomGradientImage
              key={`square2-${refreshKey}`}
              width={200}
              height={200}
              title="Square 2"
            />
            
            <RandomGradientImage
              key={`square3-${refreshKey}`}
              width={200}
              height={200}
              title="Square 3"
            />
          </div>
        </div>

        {/* Image Selector */}
        <div className="ihub-example-card">
          <h3>Image vs Gradient Toggle</h3>
          <p>Switch between showing an actual image and a random gradient</p>
          
          <div className="ihub-toggle-controls">
            <select 
              value={selectedImage} 
              onChange={(e) => setSelectedImage(e.target.value)}
              className="ihub-image-selector"
            >
              <option value="">Show Random Gradient</option>
              {sampleImages.map((img, index) => (
                <option key={index} value={img}>Sample Image {index + 1}</option>
              ))}
            </select>
          </div>
          
          <div className="ihub-toggle-result">
            <RandomGradientImage
              key={`toggle-${selectedImage}-${refreshKey}`}
              thumbnail={selectedImage}
              title={selectedImage ? `Selected Image` : "Random Gradient"}
              width={350}
              height={220}
            />
          </div>
          
          <div className="ihub-toggle-info">
            <p><strong>Current Mode:</strong> {selectedImage ? "Image" : "Random Gradient"}</p>
            {selectedImage && <p><strong>Image URL:</strong> {selectedImage}</p>}
          </div>
        </div>

        {/* Multiple Random Gradients */}
        <div className="ihub-example-card">
          <h3>Gallery of Random Gradients</h3>
          <p>Multiple gradients generated at once</p>
          
          <div className="ihub-gradient-gallery">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="ihub-gallery-item">
                <RandomGradientImage
                  key={`gallery-${index}-${refreshKey}`}
                  width={180}
                  height={120}
                  title={`Gradient ${index + 1}`}
                />
                <p className="ihub-gallery-label">Item {index + 1}</p>
              </div>
            ))}
          </div>
          
          <div className="ihub-gallery-controls">
            <SubmitButton
              label="Refresh All Gradients"
              status={1}
              className="ihub-refresh-gallery-btn"
              onClick={refreshGradients}
            />
          </div>
        </div>

        {/* Responsive Example */}
        <div className="ihub-example-card">
          <h3>Responsive Gradients</h3>
          <p>Gradients that adapt to different container sizes</p>
          
          <div className="ihub-responsive-container">
            <div className="ihub-responsive-small">
              <h5>Mobile View</h5>
              <RandomGradientImage
                key={`mobile-${refreshKey}`}
                width={280}
                height={160}
                title="Mobile Gradient"
              />
            </div>
            
            <div className="ihub-responsive-large">
              <h5>Desktop View</h5>
              <RandomGradientImage
                key={`desktop-${refreshKey}`}
                width={500}
                height={280}
                title="Desktop Gradient"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Random Gradient</h3>
          <pre><code>{`import { RandomGradientImage } from '@instincthub/react-ui';

<RandomGradientImage
  width={300}
  height={200}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Image Thumbnail</h3>
          <pre><code>{`<RandomGradientImage
  thumbnail="https://example.com/image.jpg"
  title="My Image"
  width={300}
  height={200}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Dynamic Refresh</h3>
          <pre><code>{`const [refreshKey, setRefreshKey] = useState(0);

const refreshGradient = () => {
  setRefreshKey(prev => prev + 1);
};

<RandomGradientImage
  key={\`gradient-\${refreshKey}\`}
  width={300}
  height={200}
  title="Dynamic Gradient"
/>

<button onClick={refreshGradient}>
  Generate New Gradient
</button>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Conditional Image/Gradient</h3>
          <pre><code>{`const [showImage, setShowImage] = useState(false);

<RandomGradientImage
  thumbnail={showImage ? imageUrl : undefined}
  title={showImage ? "Image Mode" : "Gradient Mode"}
  width={300}
  height={200}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default RandomGradientImageExample;
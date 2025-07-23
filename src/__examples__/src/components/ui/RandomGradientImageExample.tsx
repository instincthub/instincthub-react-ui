"use client";

import React, { useState } from "react";
import { RandomGradientImage, SubmitButton, Badge } from "../../../../index";

const RandomGradientImageExample: React.FC = () => {
  const [selectedGradient, setSelectedGradient] = useState("sunset");
  const [customSize, setCustomSize] = useState({ width: 300, height: 200 });
  const [refreshKey, setRefreshKey] = useState(0);

  const gradientPresets = [
    { value: "sunset", label: "Sunset", colors: ["#ff7e5f", "#feb47b"] },
    { value: "ocean", label: "Ocean", colors: ["#667eea", "#764ba2"] },
    { value: "forest", label: "Forest", colors: ["#11998e", "#38ef7d"] },
    { value: "purple", label: "Purple", colors: ["#667eea", "#764ba2"] },
    { value: "fire", label: "Fire", colors: ["#f12711", "#f5af19"] },
    { value: "ice", label: "Ice", colors: ["#a8edea", "#fed6e3"] },
    { value: "rainbow", label: "Rainbow", colors: ["#ff0084", "#33001b", "#ff0084"] }
  ];

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleDownload = (imageData: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = imageData;
    link.click();
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>RandomGradientImage Examples</h1>
        <p>Dynamic gradient image generator with customizable patterns and colors</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Gradient Images */}
        <div className="ihub-example-card">
          <h3>Basic Gradient Images</h3>
          <p>Simple gradient images with preset color schemes</p>
          
          <div className="ihub-gradient-showcase">
            <RandomGradientImage
              width={200}
              height={150}
              gradientType="linear"
              colors={["#ff6b6b", "#4ecdc4"]}
            />
            <RandomGradientImage
              width={200}
              height={150}
              gradientType="radial"
              colors={["#a8e6cf", "#dcedc1"]}
            />
            <RandomGradientImage
              width={200}
              height={150}
              gradientType="conic"
              colors={["#ff9a9e", "#fecfef", "#fecfef"]}
            />
          </div>
        </div>

        {/* Customizable Gradient */}
        <div className="ihub-example-card">
          <h3>Customizable Gradient</h3>
          <p>Interactive gradient with selectable presets and custom dimensions</p>
          
          <div className="ihub-gradient-controls">
            <div className="ihub-control-group">
              <label>Gradient Preset:</label>
              <select
                value={selectedGradient}
                onChange={(e) => setSelectedGradient(e.target.value)}
                className="ihub-gradient-select"
              >
                {gradientPresets.map(preset => (
                  <option key={preset.value} value={preset.value}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="ihub-control-group">
              <label>Width:</label>
              <input
                type="number"
                value={customSize.width}
                onChange={(e) => setCustomSize({...customSize, width: parseInt(e.target.value)})}
                min={100}
                max={800}
                className="ihub-size-input"
              />
            </div>
            
            <div className="ihub-control-group">
              <label>Height:</label>
              <input
                type="number"
                value={customSize.height}
                onChange={(e) => setCustomSize({...customSize, height: parseInt(e.target.value)})}
                min={100}
                max={600}
                className="ihub-size-input"
              />
            </div>
            
            <button onClick={handleRefresh} className="ihub-refresh-btn">
              Generate New
            </button>
          </div>
          
          <RandomGradientImage
            width={customSize.width}
            height={customSize.height}
            gradientType="linear"
            colors={gradientPresets.find(p => p.value === selectedGradient)?.colors || ["#ff7e5f", "#feb47b"]}
            refreshTrigger={refreshKey}
            showDownloadButton={true}
            onDownload={handleDownload}
          />
        </div>

        {/* Different Gradient Types */}
        <div className="ihub-example-card">
          <h3>Different Gradient Types</h3>
          <p>Various gradient types with different visual effects</p>
          
          <div className="ihub-gradient-types">
            <div className="ihub-gradient-type">
              <h5>Linear Gradient</h5>
              <RandomGradientImage
                width={180}
                height={120}
                gradientType="linear"
                colors={["#667eea", "#764ba2"]}
                direction="45deg"
              />
            </div>
            
            <div className="ihub-gradient-type">
              <h5>Radial Gradient</h5>
              <RandomGradientImage
                width={180}
                height={120}
                gradientType="radial"
                colors={["#f093fb", "#f5576c"]}
                centerPosition="center"
              />
            </div>
            
            <div className="ihub-gradient-type">
              <h5>Conic Gradient</h5>
              <RandomGradientImage
                width={180}
                height={120}
                gradientType="conic"
                colors={["#ff0084", "#33001b", "#ff0084"]}
                rotation="0deg"
              />
            </div>
            
            <div className="ihub-gradient-type">
              <h5>Multi-Color Linear</h5>
              <RandomGradientImage
                width={180}
                height={120}
                gradientType="linear"
                colors={["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"]}
                direction="135deg"
              />
            </div>
          </div>
        </div>

        {/* Avatar Placeholders */}
        <div className="ihub-example-card">
          <h3>Avatar Placeholders</h3>
          <p>Gradient images as avatar placeholders with text overlay</p>
          
          <div className="ihub-avatar-showcase">
            <RandomGradientImage
              width={80}
              height={80}
              gradientType="linear"
              colors={["#667eea", "#764ba2"]}
              shape="circle"
              overlay={{
                text: "JD",
                fontSize: "24px",
                fontWeight: "bold",
                color: "white"
              }}
            />
            
            <RandomGradientImage
              width={80}
              height={80}
              gradientType="radial"
              colors={["#f093fb", "#f5576c"]}
              shape="circle"
              overlay={{
                text: "AS",
                fontSize: "24px",
                fontWeight: "bold",
                color: "white"
              }}
            />
            
            <RandomGradientImage
              width={80}
              height={80}
              gradientType="conic"
              colors={["#ff9a9e", "#fecfef"]}
              shape="circle"
              overlay={{
                text: "MR",
                fontSize: "24px",
                fontWeight: "bold",
                color: "white"
              }}
            />
            
            <RandomGradientImage
              width={80}
              height={80}
              gradientType="linear"
              colors={["#11998e", "#38ef7d"]}
              shape="circle"
              overlay={{
                text: "KL",
                fontSize: "24px",
                fontWeight: "bold",
                color: "white"
              }}
            />
          </div>
        </div>

        {/* Background Patterns */}
        <div className="ihub-example-card">
          <h3>Background Patterns</h3>
          <p>Gradient images with overlay patterns and effects</p>
          
          <div className="ihub-pattern-showcase">
            <div className="ihub-pattern-item">
              <h5>Noise Overlay</h5>
              <RandomGradientImage
                width={200}
                height={150}
                gradientType="linear"
                colors={["#667eea", "#764ba2"]}
                pattern="noise"
                patternOpacity={0.3}
              />
            </div>
            
            <div className="ihub-pattern-item">
              <h5>Geometric Pattern</h5>
              <RandomGradientImage
                width={200}
                height={150}
                gradientType="radial"
                colors={["#f093fb", "#f5576c"]}
                pattern="geometric"
                patternOpacity={0.2}
              />
            </div>
            
            <div className="ihub-pattern-item">
              <h5>Mesh Pattern</h5>
              <RandomGradientImage
                width={200}
                height={150}
                gradientType="conic"
                colors={["#ff9a9e", "#fecfef", "#fecfef"]}
                pattern="mesh"
                patternOpacity={0.4}
              />
            </div>
          </div>
        </div>

        {/* Dynamic Generation */}
        <div className="ihub-example-card">
          <h3>Dynamic Generation</h3>
          <p>Dynamically generated gradients with random colors and effects</p>
          
          <div className="ihub-dynamic-controls">
            <SubmitButton
              title="Generate Random Gradient"
              status={1}
              className="ihub-generate-btn"
              onClick={handleRefresh}
            />
          </div>
          
          <div className="ihub-dynamic-showcase">
            <RandomGradientImage
              width={250}
              height={180}
              gradientType="random"
              colorCount={3}
              randomSeed={refreshKey}
              animation="fade"
              animationDuration={1000}
              showColorPalette={true}
              onColorsGenerated={(colors) => console.log("Generated colors:", colors)}
            />
          </div>
          
          <div className="ihub-gradient-info">
            <Badge text="Randomly Generated" variant="primary" />
            <Badge text="3 Colors" variant="secondary" />
            <Badge text="Animated" variant="success" />
          </div>
        </div>

        {/* Export Options */}
        <div className="ihub-example-card">
          <h3>Export Options</h3>
          <p>Gradient images with various export formats and sizes</p>
          
          <RandomGradientImage
            width={300}
            height={200}
            gradientType="linear"
            colors={["#667eea", "#764ba2"]}
            showExportOptions={true}
            exportFormats={["PNG", "JPEG", "SVG", "WebP"]}
            exportSizes={[
              { label: "Small", width: 150, height: 100 },
              { label: "Medium", width: 300, height: 200 },
              { label: "Large", width: 600, height: 400 },
              { label: "HD", width: 1200, height: 800 }
            ]}
            onExport={(format, size, imageData) => {
              console.log(`Exported ${format} at ${size.width}x${size.height}`);
              handleDownload(imageData, `gradient.${format.toLowerCase()}`);
            }}
          />
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { RandomGradientImage } from '@instincthub/react-ui';

<RandomGradientImage
  width={200}
  height={150}
  gradientType="linear"
  colors={["#ff6b6b", "#4ecdc4"]}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Avatar Placeholder</h3>
          <pre><code>{`<RandomGradientImage
  width={80}
  height={80}
  gradientType="radial"
  colors={["#667eea", "#764ba2"]}
  shape="circle"
  overlay={{
    text: "JD",
    fontSize: "24px",
    fontWeight: "bold",
    color: "white"
  }}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>With Patterns and Export</h3>
          <pre><code>{`<RandomGradientImage
  width={300}
  height={200}
  gradientType="linear"
  colors={["#f093fb", "#f5576c"]}
  pattern="noise"
  patternOpacity={0.3}
  showDownloadButton={true}
  showExportOptions={true}
  exportFormats={["PNG", "JPEG", "SVG"]}
  onExport={(format, size, imageData) => {
    console.log("Export ready:", format);
  }}
/>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Dynamic Generation</h3>
          <pre><code>{`<RandomGradientImage
  width={250}
  height={180}
  gradientType="random"
  colorCount={3}
  randomSeed={refreshKey}
  animation="fade"
  showColorPalette={true}
  onColorsGenerated={(colors) => {
    console.log("Generated colors:", colors);
  }}
/>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default RandomGradientImageExample;
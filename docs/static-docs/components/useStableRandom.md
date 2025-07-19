# useStableRandom

**Category:** Auth | **Type:** hook

React hook for generating stable, deterministic random values that remain consistent across re-renders and SSR/client hydration

**File Location:** `src/components/auth/useStableRandom.ts`

## 🏷️ Tags

`auth`, `hook`, `random`, `ssr`, `stable`, `deterministic`

```tsx
"use client";
import React, { useState, useEffect } from "react";
import { useStableRandom } from "@instincthub/react-ui";
import { openToast } from "@instincthub/react-ui/lib";

/**
 * Comprehensive examples demonstrating useStableRandom usage
 * Shows stable random generation, seeded values, and SSR-safe random numbers
 */
const UseStableRandomExamples = () => {
  const [seed, setSeed] = useState<string>("demo-seed");
  const [randomType, setRandomType] = useState<string>("number");
  const [regenerateCount, setRegenerateCount] = useState<number>(0);

  // Basic stable random number (0-1)
  const stableRandom = useStableRandom({
    seed: seed,
    min: 0,
    max: 1,
    precision: 4
  });

  // Stable random integer
  const stableInteger = useStableRandom({
    seed: `${seed}-integer`,
    min: 1,
    max: 100,
    type: "integer"
  });

  // Stable random from array
  const colorOptions = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "cyan"];
  const stableColor = useStableRandom({
    seed: `${seed}-color-${regenerateCount}`,
    type: "array",
    array: colorOptions
  });

  // Stable random string
  const stableId = useStableRandom({
    seed: `${seed}-id`,
    type: "string",
    length: 8,
    charset: "alphanumeric"
  });

  // Multiple stable randoms with different seeds
  const gameStats = {
    health: useStableRandom({ seed: `${seed}-health`, min: 50, max: 100, type: "integer" }),
    mana: useStableRandom({ seed: `${seed}-mana`, min: 20, max: 80, type: "integer" }),
    strength: useStableRandom({ seed: `${seed}-strength`, min: 10, max: 20, type: "integer" }),
    agility: useStableRandom({ seed: `${seed}-agility`, min: 5, max: 25, type: "integer" }),
  };

  // Stable random for UI elements
  const avatarOptions = ["🧙‍♂️", "🧙‍♀️", "🦸‍♂️", "🦸‍♀️", "🧝‍♂️", "🧝‍♀️", "🧞‍♂️", "🧞‍♀️"];
  const stableAvatar = useStableRandom({
    seed: `${seed}-avatar`,
    type: "array",
    array: avatarOptions
  });

  // Random testimonials for demo
  const testimonials = [
    { name: "Alice Johnson", role: "Developer", text: "This hook makes random generation predictable!" },
    { name: "Bob Smith", role: "Designer", text: "Perfect for consistent UI elements across renders." },
    { name: "Carol Davis", role: "Product Manager", text: "Solves SSR hydration issues beautifully." },
    { name: "David Wilson", role: "Engineer", text: "Stable randomness is exactly what we needed." },
  ];

  const selectedTestimonial = useStableRandom({
    seed: `${seed}-testimonial`,
    type: "array",
    array: testimonials
  });

  // Generate multiple random values for grid
  const gridItems = Array.from({ length: 12 }, (_, index) => ({
    id: index,
    value: useStableRandom({ 
      seed: `${seed}-grid-${index}`, 
      min: 1, 
      max: 100, 
      type: "integer" 
    }),
    color: useStableRandom({ 
      seed: `${seed}-grid-color-${index}`, 
      type: "array", 
      array: colorOptions 
    }),
    size: useStableRandom({ 
      seed: `${seed}-grid-size-${index}`, 
      min: 20, 
      max: 60, 
      type: "integer" 
    })
  }));

  const handleSeedChange = (newSeed: string) => {
    setSeed(newSeed);
    openToast(`Seed changed to: ${newSeed}`);
  };

  const handleRegenerate = () => {
    setRegenerateCount(prev => prev + 1);
    openToast("Random values regenerated");
  };

  const generateRandomSeed = () => {
    const randomSeed = Math.random().toString(36).substring(2, 15);
    setSeed(randomSeed);
    openToast(`New random seed: ${randomSeed}`);
  };

  return (
    <div className="ihub-container ihub-mt-5">
      <h1>useStableRandom Examples</h1>
      <p className="ihub-mb-4">
        React hook for generating stable, deterministic random values that remain
        consistent across re-renders and SSR/client hydration cycles.
      </p>

      {/* Seed Controls */}
      <section className="ihub-mb-5">
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Seed Controls</h3>
            <p className="ihub-text-muted">Change the seed to generate different stable random values</p>
          </div>
          <div className="ihub-card-body">
            <div className="ihub-seed-controls">
              <div className="ihub-control-group">
                <label className="ihub-form-label">Seed Value:</label>
                <input
                  type="text"
                  value={seed}
                  onChange={(e) => handleSeedChange(e.target.value)}
                  className="ihub-input"
                  placeholder="Enter seed value"
                />
              </div>
              
              <div className="ihub-control-group">
                <div className="ihub-button-group">
                  <button
                    className="ihub-outlined-btn"
                    onClick={() => handleSeedChange("demo-seed")}
                  >
                    Reset Seed
                  </button>
                  <button
                    className="ihub-outlined-btn"
                    onClick={generateRandomSeed}
                  >
                    Random Seed
                  </button>
                  <button
                    className="ihub-primary-btn"
                    onClick={handleRegenerate}
                  >
                    Regenerate Array Items
                  </button>
                </div>
              </div>
              
              <div className="ihub-seed-info">
                <div className="ihub-info-item">
                  <span className="ihub-info-label">Current Seed:</span>
                  <code className="ihub-info-value">{seed}</code>
                </div>
                <div className="ihub-info-item">
                  <span className="ihub-info-label">Regenerate Count:</span>
                  <span className="ihub-info-value">{regenerateCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Basic Random Values */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Basic Stable Random Values</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Different Random Types</h3>
            <p className="ihub-text-muted">Various stable random value types with consistent output</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-random-types">
              <div className="ihub-random-item">
                <h4>Float (0-1)</h4>
                <div className="ihub-random-value">{stableRandom}</div>
                <p className="ihub-random-desc">Decimal between 0 and 1 with 4 decimal places</p>
              </div>
              
              <div className="ihub-random-item">
                <h4>Integer (1-100)</h4>
                <div className="ihub-random-value">{stableInteger}</div>
                <p className="ihub-random-desc">Whole number between 1 and 100</p>
              </div>
              
              <div className="ihub-random-item">
                <h4>Color Selection</h4>
                <div 
                  className="ihub-random-value ihub-color-demo"
                  style={{ 
                    backgroundColor: stableColor,
                    color: stableColor === 'yellow' ? 'black' : 'white'
                  }}
                >
                  {stableColor}
                </div>
                <p className="ihub-random-desc">Random color from predefined array</p>
              </div>
              
              <div className="ihub-random-item">
                <h4>ID String</h4>
                <div className="ihub-random-value ihub-id-value">{stableId}</div>
                <p className="ihub-random-desc">8-character alphanumeric string</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Character Stats */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Game Character Generator</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Stable Character Stats</h3>
            <p className="ihub-text-muted">Character stats that remain consistent across page refreshes</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-character-profile">
              <div className="ihub-character-avatar">
                <span className="ihub-avatar-emoji">{stableAvatar}</span>
              </div>
              
              <div className="ihub-character-info">
                <h4>Character #{stableId}</h4>
                <div className="ihub-character-stats">
                  <div className="ihub-stat">
                    <span className="ihub-stat-label">❤️ Health:</span>
                    <div className="ihub-stat-bar">
                      <div 
                        className="ihub-stat-fill ihub-health"
                        style={{ width: `${gameStats.health}%` }}
                      ></div>
                      <span className="ihub-stat-value">{gameStats.health}</span>
                    </div>
                  </div>
                  
                  <div className="ihub-stat">
                    <span className="ihub-stat-label">💙 Mana:</span>
                    <div className="ihub-stat-bar">
                      <div 
                        className="ihub-stat-fill ihub-mana"
                        style={{ width: `${gameStats.mana}%` }}
                      ></div>
                      <span className="ihub-stat-value">{gameStats.mana}</span>
                    </div>
                  </div>
                  
                  <div className="ihub-stat">
                    <span className="ihub-stat-label">💪 Strength:</span>
                    <div className="ihub-stat-bar">
                      <div 
                        className="ihub-stat-fill ihub-strength"
                        style={{ width: `${(gameStats.strength / 20) * 100}%` }}
                      ></div>
                      <span className="ihub-stat-value">{gameStats.strength}</span>
                    </div>
                  </div>
                  
                  <div className="ihub-stat">
                    <span className="ihub-stat-label">⚡ Agility:</span>
                    <div className="ihub-stat-bar">
                      <div 
                        className="ihub-stat-fill ihub-agility"
                        style={{ width: `${(gameStats.agility / 25) * 100}%` }}
                      ></div>
                      <span className="ihub-stat-value">{gameStats.agility}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Random Grid */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Stable Random Grid</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Consistent Random Layout</h3>
            <p className="ihub-text-muted">Grid items with stable random properties</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-random-grid">
              {gridItems.map((item) => (
                <div
                  key={item.id}
                  className="ihub-grid-item"
                  style={{
                    backgroundColor: item.color,
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                    color: ['yellow', 'cyan'].includes(item.color) ? 'black' : 'white'
                  }}
                >
                  {item.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Showcase */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Random Testimonial</h2>
        <div className="ihub-card">
          <div className="ihub-card-header">
            <h3>Stable Content Selection</h3>
            <p className="ihub-text-muted">Consistently selected testimonial based on seed</p>
          </div>
          
          <div className="ihub-card-body">
            <div className="ihub-testimonial">
              <blockquote className="ihub-testimonial-text">
                "{selectedTestimonial.text}"
              </blockquote>
              <div className="ihub-testimonial-author">
                <strong>{selectedTestimonial.name}</strong>
                <span className="ihub-testimonial-role">{selectedTestimonial.role}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="ihub-mb-5">
        <h2 className="ihub-mb-3">Implementation Guide</h2>
        <div className="ihub-card ihub-p-4">
          <h3>Hook Interface:</h3>
          <pre className="ihub-code-block">
{`function useStableRandom(options: {
  seed: string;                         // Seed value for deterministic output
  type?: 'number' | 'integer' | 'array' | 'string'; // Type of random value
  min?: number;                         // Minimum value (for numbers)
  max?: number;                         // Maximum value (for numbers)
  precision?: number;                   // Decimal places (for floats)
  array?: any[];                        // Array to select from
  length?: number;                      // String length (for strings)
  charset?: 'alphanumeric' | 'alpha' | 'numeric' | 'hex'; // Character set
}): any;`}</pre>
          
          <h3 className="ihub-mt-3">Key Features:</h3>
          <ul>
            <li><strong>SSR Safe:</strong> Consistent values between server and client</li>
            <li><strong>Deterministic:</strong> Same seed always produces same result</li>
            <li><strong>Multiple Types:</strong> Numbers, integers, arrays, and strings</li>
            <li><strong>Configurable Range:</strong> Custom min/max values and precision</li>
            <li><strong>Array Selection:</strong> Random selection from provided arrays</li>
            <li><strong>String Generation:</strong> Custom length and character sets</li>
          </ul>
          
          <h3 className="ihub-mt-3">Best Practices:</h3>
          <ul>
            <li>Use descriptive, unique seeds for different random values</li>
            <li>Combine seeds with identifiers for array items</li>
            <li>Consider seed changes when you want new random values</li>
            <li>Test consistency across different environments</li>
            <li>Use appropriate precision for floating-point numbers</li>
            <li>Cache complex random generations for performance</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default UseStableRandomExamples;
```

## 🔗 Related Components

- [useClientSide](./useClientSide.md) - Client-side detection hook
- [useExternalData](./useExternalData.md) - External data fetching hook
- [useFormattedDate](./useFormattedDate.md) - Date formatting hook
- [RandomGradientImage](./RandomGradientImage.md) - Random gradient image component
- [UnsplashRandomImage](./UnsplashRandomImage.md) - Random image component


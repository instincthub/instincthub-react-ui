"use client";

import React, { useState } from "react";
import { AnimatedBox, SubmitButton } from "../../../../index";

const AnimatedBoxExample: React.FC = () => {
  const [isVisible1, setIsVisible1] = useState(true);
  const [isVisible2, setIsVisible2] = useState(true);
  const [isVisible3, setIsVisible3] = useState(true);
  const [boxContent, setBoxContent] = useState("Click to toggle animations");

  const toggleBox = (boxNumber: number) => {
    switch (boxNumber) {
      case 1:
        setIsVisible1(!isVisible1);
        break;
      case 2:
        setIsVisible2(!isVisible2);
        break;
      case 3:
        setIsVisible3(!isVisible3);
        break;
    }
  };

  return (
    <div className="ihub-container ihub-mt-10">
      <div className="ihub-page-header">
        <h1>AnimatedBox Examples</h1>
        <p>Animated container component with smooth transitions and effects</p>
      </div>

      <div className="ihub-examples-grid">
        {/* Basic Animation */}
        <div className="ihub-example-card">
          <h3>Basic Fade Animation</h3>
          <p>Simple fade in/out animation with opacity transition</p>
          
          <div className="ihub-animation-controls">
            <button 
              onClick={() => toggleBox(1)} 
              className="ihub-toggle-btn"
            >
              Toggle Fade Animation
            </button>
          </div>
          
          <AnimatedBox
            isVisible={isVisible1}
            animation="fade"
            duration={300}
            className="ihub-demo-box"
          >
            <div className="ihub-box-content">
              <h4>Fade Animation</h4>
              <p>This box fades in and out smoothly</p>
            </div>
          </AnimatedBox>
        </div>

        {/* Slide Animation */}
        <div className="ihub-example-card">
          <h3>Slide Animation</h3>
          <p>Slide animation from different directions</p>
          
          <div className="ihub-animation-controls">
            <button 
              onClick={() => toggleBox(2)} 
              className="ihub-toggle-btn"
            >
              Toggle Slide Animation
            </button>
          </div>
          
          <AnimatedBox
            isVisible={isVisible2}
            animation="slideDown"
            duration={500}
            className="ihub-demo-box"
          >
            <div className="ihub-box-content">
              <h4>Slide Down Animation</h4>
              <p>This box slides down from the top</p>
            </div>
          </AnimatedBox>
        </div>

        {/* Scale Animation */}
        <div className="ihub-example-card">
          <h3>Scale Animation</h3>
          <p>Scale animation with bounce effect</p>
          
          <div className="ihub-animation-controls">
            <button 
              onClick={() => toggleBox(3)} 
              className="ihub-toggle-btn"
            >
              Toggle Scale Animation
            </button>
          </div>
          
          <AnimatedBox
            isVisible={isVisible3}
            animation="scale"
            duration={400}
            easing="bounce"
            className="ihub-demo-box"
          >
            <div className="ihub-box-content">
              <h4>Scale Animation</h4>
              <p>This box scales in with a bounce effect</p>
            </div>
          </AnimatedBox>
        </div>

        {/* Interactive Content */}
        <div className="ihub-example-card">
          <h3>Interactive Animated Box</h3>
          <p>Animated box with interactive content and form elements</p>
          
          <AnimatedBox
            isVisible={true}
            animation="slideUp"
            duration={600}
            className="ihub-interactive-box"
          >
            <div className="ihub-box-content">
              <h4>Interactive Content</h4>
              <input 
                type="text"
                value={boxContent}
                onChange={(e) => setBoxContent(e.target.value)}
                className="ihub-input-field"
                placeholder="Enter content..."
              />
              <SubmitButton
                title="Save Changes"
                status={1}
                className="ihub-mt-2"
              />
            </div>
          </AnimatedBox>
        </div>

        {/* Multiple Animation Types */}
        <div className="ihub-example-card">
          <h3>Different Animation Types</h3>
          <p>Various animation types and configurations</p>
          
          <div className="ihub-animation-showcase">
            <AnimatedBox
              isVisible={true}
              animation="fadeInLeft"
              duration={800}
              delay={100}
              className="ihub-mini-box"
            >
              <span>Fade In Left</span>
            </AnimatedBox>
            
            <AnimatedBox
              isVisible={true}
              animation="fadeInRight"
              duration={800}
              delay={200}
              className="ihub-mini-box"
            >
              <span>Fade In Right</span>
            </AnimatedBox>
            
            <AnimatedBox
              isVisible={true}
              animation="fadeInUp"
              duration={800}
              delay={300}
              className="ihub-mini-box"
            >
              <span>Fade In Up</span>
            </AnimatedBox>
            
            <AnimatedBox
              isVisible={true}
              animation="zoomIn"
              duration={800}
              delay={400}
              className="ihub-mini-box"
            >
              <span>Zoom In</span>
            </AnimatedBox>
          </div>
        </div>
      </div>

      <div className="ihub-code-examples">
        <h2>Code Examples</h2>
        
        <div className="ihub-code-section">
          <h3>Basic Usage</h3>
          <pre><code>{`import { AnimatedBox } from '@instincthub/react-ui';

const [isVisible, setIsVisible] = useState(true);

<AnimatedBox
  isVisible={isVisible}
  animation="fade"
  duration={300}
>
  <div>Your content here</div>
</AnimatedBox>`}</code></pre>
        </div>

        <div className="ihub-code-section">
          <h3>Advanced Configuration</h3>
          <pre><code>{`<AnimatedBox
  isVisible={isVisible}
  animation="slideDown"
  duration={500}
  delay={100}
  easing="bounce"
  className="custom-box"
>
  <div>Animated content</div>
</AnimatedBox>`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBoxExample;

# FromInstinctHub

**Category:** Auth | **Type:** component

InstinctHub branding component

## 🏷️ Tags

`auth`, `branding`, `logo`, `powered-by`

```tsx
"use client";
import React from "react";
import { FromInstinctHub, LoginForm, Card } from "@instincthub/react-ui";

/**
 * Example component demonstrating various ways to use the FromInstinctHub component
 */
const FromInstinctHubExamples = () => {
  return (
    <div className="ihub-container ihub-mt-5">
      <h1>FromInstinctHub Examples</h1>

      {/* Basic Usage */}
      <div className="ihub-card ihub-mb-4">
        <h2>Basic Logo Display</h2>
        <p>Simple InstinctHub logo without text</p>
        
        <div className="ihub-text-center ihub-py-4">
          <FromInstinctHub />
        </div>
      </div>

      {/* With "Powered By" Text */}
      <div className="ihub-card ihub-mb-4">
        <h2>Logo with "Powered By" Text</h2>
        <p>Shows the logo with "Powered by" text</p>
        
        <div className="ihub-text-center ihub-py-4">
          <FromInstinctHub showText={true} />
        </div>
      </div>

      {/* Custom Styling */}
      <div className="ihub-card ihub-mb-4">
        <h2>Custom Styling</h2>
        <p>Logo with custom CSS classes</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-4">
            <div className="ihub-bg-light ihub-p-3 ihub-rounded">
              <FromInstinctHub 
                showText={true} 
                className="ihub-mt-2"
              />
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-bg-primary ihub-p-3 ihub-rounded">
              <FromInstinctHub className="ihub-py-3" />
            </div>
          </div>
          
          <div className="ihub-col-md-4">
            <div className="ihub-bg-dark ihub-p-3 ihub-rounded">
              <FromInstinctHub 
                showText={true}
                className="ihub-mb-0" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* In Login Form Footer */}
      <div className="ihub-card ihub-mb-4">
        <h2>In Authentication Forms</h2>
        <p>Commonly used in login and signup forms</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-6 ihub-mx-auto">
            <Card className="ihub-shadow-sm">
              <div className="ihub-card-body ihub-p-4">
                <h3 className="ihub-text-center ihub-mb-4">Login to Your Account</h3>
                
                <form className="ihub-mb-4">
                  <div className="ihub-form-group ihub-mb-3">
                    <input 
                      type="email" 
                      className="ihub-form-control" 
                      placeholder="Email address"
                    />
                  </div>
                  
                  <div className="ihub-form-group ihub-mb-3">
                    <input 
                      type="password" 
                      className="ihub-form-control" 
                      placeholder="Password"
                    />
                  </div>
                  
                  <button className="ihub-important-btn ihub-w-100">
                    Sign In
                  </button>
                </form>
                
                <FromInstinctHub showText={true} />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* In Footer Section */}
      <div className="ihub-card ihub-mb-4">
        <h2>In Footer Sections</h2>
        <p>Used in application footers to show platform branding</p>
        
        <div className="ihub-bg-dark ihub-text-white ihub-p-4 ihub-rounded">
          <div className="ihub-row">
            <div className="ihub-col-md-4">
              <h4>About Us</h4>
              <p className="ihub-text-muted">
                Your trusted education platform for learning and growth.
              </p>
            </div>
            
            <div className="ihub-col-md-4">
              <h4>Quick Links</h4>
              <ul className="ihub-list-unstyled">
                <li><a href="#" className="ihub-text-muted">Home</a></li>
                <li><a href="#" className="ihub-text-muted">Courses</a></li>
                <li><a href="#" className="ihub-text-muted">Contact</a></li>
              </ul>
            </div>
            
            <div className="ihub-col-md-4">
              <h4>Platform</h4>
              <FromInstinctHub 
                showText={true} 
                className="ihub-mt-3" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* In Modal */}
      <div className="ihub-card ihub-mb-4">
        <h2>In Modal Dialogs</h2>
        <p>Shows platform branding in modal footers</p>
        
        <div className="ihub-modal-example ihub-border ihub-rounded ihub-p-4">
          <div className="ihub-modal-header ihub-border-bottom ihub-pb-3 ihub-mb-3">
            <h3>Welcome to Our Platform</h3>
          </div>
          
          <div className="ihub-modal-body ihub-mb-4">
            <p>This is an example of how the FromInstinctHub component can be used in modal dialogs to maintain consistent branding throughout your application.</p>
          </div>
          
          <div className="ihub-modal-footer ihub-border-top ihub-pt-3">
            <FromInstinctHub showText={true} />
          </div>
        </div>
      </div>

      {/* Different Backgrounds */}
      <div className="ihub-card">
        <h2>On Different Backgrounds</h2>
        <p>The logo adapts to different background colors</p>
        
        <div className="ihub-row">
          <div className="ihub-col-md-3">
            <div className="ihub-bg-white ihub-border ihub-p-3 ihub-rounded ihub-text-center">
              <p className="ihub-mb-2">White</p>
              <FromInstinctHub />
            </div>
          </div>
          
          <div className="ihub-col-md-3">
            <div className="ihub-bg-light ihub-p-3 ihub-rounded ihub-text-center">
              <p className="ihub-mb-2">Light</p>
              <FromInstinctHub />
            </div>
          </div>
          
          <div className="ihub-col-md-3">
            <div className="ihub-bg-secondary ihub-text-white ihub-p-3 ihub-rounded ihub-text-center">
              <p className="ihub-mb-2">Secondary</p>
              <FromInstinctHub />
            </div>
          </div>
          
          <div className="ihub-col-md-3">
            <div className="ihub-bg-dark ihub-text-white ihub-p-3 ihub-rounded ihub-text-center">
              <p className="ihub-mb-2">Dark</p>
              <FromInstinctHub />
            </div>
          </div>
        </div>
        
        <div className="ihub-mt-4">
          <h4>Usage Notes:</h4>
          <ul>
            <li>The logo automatically links to https://instincthub.com</li>
            <li>The link opens in a new tab with proper security attributes</li>
            <li>The logo uses CSS variables for theming (var(--Gunmetal))</li>
            <li>Height is fixed at 30px, width at 120px for consistency</li>
            <li>The component is lightweight and requires no additional dependencies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FromInstinctHubExamples;
```

## 🔗 Related Components

- [LoginForm](./LoginForm.md) - Login form component
- [Card](./Card.md) - Card container component
- [Badge](./Badge.md) - Badge component for labels
- [ClientDetector](./ClientDetector.md) - Client device detection component
- [SessionProviders](./SessionProviders.md) - Session management providers


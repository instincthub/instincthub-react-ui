// app/page.jsx
"use client";
import PageNavigation from "@/examples/components/navbars/PageNavigation";
import { ContentViewer } from "@/index";
import Link from "next/link";

export default function Home() {
  return (
    <main className="ihub-container">
      {/* Hero Section */}
      <section className="ihub-hero mt-5 mb-5">
        <div className="ihub-hero-content pt-6 pb-6">
          <h1 className="tw-700">@/index</h1>
          <p className="max_700">
            A modern React UI component library designed for building beautiful,
            responsive web applications with the InstinctHub design system.
          </p>
          <div className="ihub-hero-buttons mt-3">
            <Link href="/docs">
              <button className="important-btn ihub-anime-button-chevron">
                Get Started
                <svg
                  id="animate"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </Link>
            <Link href="https://github.com/instincthub/react-ui">
              <button className="outlined-btn ml-2">GitHub</button>
            </Link>
          </div>
        </div>
      </section>

      <PageNavigation />

      {/* Features Section */}
      <section className="ihub-features mt-5 mb-5">
        <h2 className="tw-600">Why Choose InstinctHub UI?</h2>
        <div className="ihub-features-grid mt-3">
          <div className="ihub-feature-card ChineseSilver pt-2 pb-2">
            <h4 className="tw-600">Responsive Design</h4>
            <p>Components that work seamlessly across all device sizes.</p>
          </div>
          <div className="ihub-feature-card ChineseSilver pt-2 pb-2">
            <h4 className="tw-600">Customizable</h4>
            <p>Easy to adapt to your brand with customizable themes.</p>
          </div>
          <div className="ihub-feature-card ChineseSilver pt-2 pb-2">
            <h4 className="tw-600">Accessible</h4>
            <p>Built with accessibility in mind to support all users.</p>
          </div>
          <div className="ihub-feature-card ChineseSilver pt-2 pb-2">
            <h4 className="tw-600">Developer Friendly</h4>
            <p>Intuitive API with comprehensive documentation.</p>
          </div>
        </div>
      </section>

      {/* Components Preview Section */}
      <section className="ihub-components-preview mt-5 mb-5">
        <h2 className="tw-600">Component Examples</h2>

        {/* Buttons Example */}
        <div className="ihub-component-demo mt-4 pt-3 pb-3 ChineseSilver">
          <h3 className="tw-600">Buttons</h3>
          <div className="ihub-demo-content mt-2">
            <button className="important-btn">Primary Button</button>
            <button className="outlined-btn ml-2">Secondary Button</button>
            <button className="default-btn ml-2">Default Button</button>
            <button className="danger-btn ml-2">Danger Button</button>
          </div>
          <div className="ihub-code-example mt-3">
            <ContentViewer
              content={`<code><button className="important-btn">Primary Button</button>
                <button className="outlined-btn">Secondary Button</button>
                <button className="default-btn">Default Button</button>
                <button className="danger-btn">Danger Button</button></code>`}
              title="Course Module: Introduction"
              showToolbar={false}
              isEditing={false}
              setIsEditing={() => {}}
            />
          </div>
          <Link href="/examples/buttons">
            <button className="default-btn mt-2">
              View More Button Examples
            </button>
          </Link>
        </div>

        {/* Form Controls Example */}
        <div className="ihub-component-demo mt-4 pt-3 pb-3 ChineseSilver">
          <h3 className="tw-600">Form Controls</h3>
          <div className="ihub-demo-content mt-2">
            <div className="max_700">
              <div className="mb-2">
                <label htmlFor="demoInput">Input Field</label>
                <input type="text" id="demoInput" placeholder="Enter text..." />
              </div>
              <div className="mb-2">
                <label htmlFor="demoSelect">Select Field</label>
                <select id="demoSelect">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
              <div className="checkbox_control mb-2">
                <label className="label-cbx">
                  <input type="checkbox" />
                  <div className="checkbox">
                    <svg width="20px" height="20px" viewBox="0 0 20 20">
                      <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                      <polyline points="4 11 8 15 16 6"></polyline>
                    </svg>
                  </div>
                  <span>Checkbox Example</span>
                </label>
              </div>
            </div>
          </div>
          <div className="ihub-code-example mt-3">
            <pre className="ChineseSilver pt-2 pb-2">
              <code>
                {`<input type="text" placeholder="Enter text..." />

<select>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</select>

<div className="checkbox_control">
  <label className="label-cbx">
    <input type="checkbox" />
    <div className="checkbox">
      <svg width="20px" height="20px" viewBox="0 0 20 20">
        <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
        <polyline points="4 11 8 15 16 6"></polyline>
      </svg>
    </div>
    <span>Checkbox Example</span>
  </label>
</div>`}
              </code>
            </pre>
          </div>
          <Link href="/examples/forms">
            <button className="default-btn mt-2">
              View More Form Examples
            </button>
          </Link>
        </div>

        {/* Accordion Example */}
        <div className="ihub-component-demo mt-4 pt-3 pb-3 ChineseSilver">
          <h3 className="tw-600">Accordion</h3>
          <div className="ihub-demo-content mt-2">
            <div className="accordion max_700">
              <div className="rc-accordion-card">
                <div className="rc-accordion-toggle active">
                  <h5 className="rc-accordion-title">
                    What is InstinctHub UI?
                  </h5>
                  <i className="rc-accordion-icon material-symbols-outlined">
                    expand_more
                  </i>
                </div>
                <div className="rc-accordion-body">
                  <p>
                    InstinctHub UI is a React component library designed to help
                    developers build beautiful and accessible web applications
                    quickly and consistently.
                  </p>
                </div>
              </div>
              <div className="rc-accordion-card">
                <div className="rc-accordion-toggle">
                  <h5 className="rc-accordion-title">How do I install it?</h5>
                  <i className="rc-accordion-icon material-symbols-outlined">
                    expand_more
                  </i>
                </div>
                <div className="rc-accordion-body">
                  <p>
                    You can install InstinctHub UI using npm or yarn:
                    <br />
                    <code>npm install @/index</code> or
                    <br />
                    <code>yarn add @/index</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="ihub-code-example mt-3">
            <pre className="ChineseSilver pt-2 pb-2">
              <code>
                {`<div className="accordion">
  <div className="rc-accordion-card">
    <div className="rc-accordion-toggle active">
      <h5 className="rc-accordion-title">What is InstinctHub UI?</h5>
      <i className="rc-accordion-icon material-symbols-outlined">expand_more</i>
    </div>
    <div className="rc-accordion-body">
      <p>
        InstinctHub UI is a React component library designed to help developers
        build beautiful and accessible web applications quickly and consistently.
      </p>
    </div>
  </div>
</div>`}
              </code>
            </pre>
          </div>
          <Link href="/examples/accordion">
            <button className="default-btn mt-2">
              View More Accordion Examples
            </button>
          </Link>
        </div>
      </section>

      {/* Installation Section */}
      <section className="ihub-installation mt-5 mb-5 pt-4 pb-4 ChineseSilver">
        <div className="max_700">
          <h2 className="tw-600">Getting Started</h2>
          <h4 className="tw-600 mt-2">Installation</h4>
          <pre className="ChineseSilver pt-2 pb-2">
            <code>npm install @/index</code>
          </pre>
          <h4 className="tw-600 mt-3">Usage</h4>
          <pre className="ChineseSilver pt-2 pb-2">
            <code>
              {`import React from 'react';
import { Button } from '@/index';

function App() {
  return (
    <div>
      <h1>Hello InstinctHub UI</h1>
      <Button variant="primary">Click Me</Button>
    </div>
  );
}`}
            </code>
          </pre>
          <Link href="/docs/getting-started">
            <button className="important-btn mt-3">
              Read Full Documentation
            </button>
          </Link>
        </div>
      </section>

      {/* Components List Section */}
      <section className="ihub-components-list mt-5 mb-5">
        <h2 className="tw-600">Available Components</h2>
        <div className="ihub-components-grid mt-3">
          <Link href="/components/buttons">
            <div className="ihub-component-card ChineseSilver pt-3 pb-3">
              <h4 className="tw-600">Buttons</h4>
            </div>
          </Link>
          <Link href="/components/forms">
            <div className="ihub-component-card ChineseSilver pt-3 pb-3">
              <h4 className="tw-600">Form Controls</h4>
            </div>
          </Link>
          <Link href="/components/accordion">
            <div className="ihub-component-card ChineseSilver pt-3 pb-3">
              <h4 className="tw-600">Accordion</h4>
            </div>
          </Link>
          <Link href="/components/tables">
            <div className="ihub-component-card ChineseSilver pt-3 pb-3">
              <h4 className="tw-600">Tables</h4>
            </div>
          </Link>
          <Link href="/components/cards">
            <div className="ihub-component-card ChineseSilver pt-3 pb-3">
              <h4 className="tw-600">Cards</h4>
            </div>
          </Link>
          <Link href="/components/navigation">
            <div className="ihub-component-card ChineseSilver pt-3 pb-3">
              <h4 className="tw-600">Navigation</h4>
            </div>
          </Link>
          <Link href="/components/modals">
            <div className="ihub-component-card ChineseSilver pt-3 pb-3">
              <h4 className="tw-600">Modals</h4>
            </div>
          </Link>
          <Link href="/components/loaders">
            <div className="ihub-component-card ChineseSilver pt-3 pb-3">
              <h4 className="tw-600">Loaders</h4>
            </div>
          </Link>
        </div>
        <div className="ihub-view-all mt-3 text-center">
          <Link href="/components">
            <button className="outlined-btn">View All Components</button>
          </Link>
        </div>
      </section>

      {/* Community Section */}
      <section className="ihub-community mt-5 mb-5">
        <div className="ihub-community-content ChineseSilver pt-4 pb-4">
          <h2 className="tw-600">Join Our Community</h2>
          <p className="max_700">
            Get involved with InstinctHub UI development. We welcome
            contributions, bug reports, and feature requests from everyone.
          </p>
          <div className="ihub-community-links mt-3">
            <Link href="https://github.com/instincthub/react-ui">
              <button className="outlined-btn">GitHub Repository</button>
            </Link>
            <Link href="https://discord.gg/instincthub">
              <button className="outlined-btn ml-2">Discord Community</button>
            </Link>
            <Link href="https://twitter.com/instincthub">
              <button className="outlined-btn ml-2">Twitter</button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

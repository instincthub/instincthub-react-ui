import React from "react";
import Link from "next/link";

function MainFooter() {
  return (
    <footer>
      <div className="container">
        <div className="footer_wrap">
          <div className="quick_links it_logo">
            <Link href="/">
              <img
                src="/logo.svg"
                alt="InstinctHub"
                className="InstinctHub_foot"
              />
            </Link>
            <p className="mt-2">
              Building better UI experiences with React components.
            </p>
            <div className="media">
              <Link href="https://twitter.com/instincthub">
                <img src="/twitter.svg" alt="Twitter" />
              </Link>
              <Link href="https://github.com/instincthub">
                <img src="/github.svg" alt="GitHub" />
              </Link>
              <Link href="https://discord.gg/instincthub">
                <img src="/discord.svg" alt="Discord" />
              </Link>
            </div>
          </div>

          <div className="quick_links">
            <h5>Documentation</h5>
            <ul>
              <li>
                <Link href="/docs/getting-started">Getting Started</Link>
              </li>
              <li>
                <Link href="/docs/installation">Installation</Link>
              </li>
              <li>
                <Link href="/docs/usage">Usage</Link>
              </li>
              <li>
                <Link href="/docs/theming">Theming</Link>
              </li>
            </ul>
          </div>

          <div className="quick_links">
            <h5>Components</h5>
            <ul>
              <li>
                <Link href="/components/buttons">Buttons</Link>
              </li>
              <li>
                <Link href="/components/forms">Forms</Link>
              </li>
              <li>
                <Link href="/components/layouts">Layouts</Link>
              </li>
              <li>
                <Link href="/components/navigation">Navigation</Link>
              </li>
            </ul>
          </div>

          <div className="quick_links">
            <h5>Resources</h5>
            <ul>
              <li>
                <Link href="/resources/figma">Figma Kit</Link>
              </li>
              <li>
                <Link href="/resources/changelog">Changelog</Link>
              </li>
              <li>
                <Link href="/resources/roadmap">Roadmap</Link>
              </li>
              <li>
                <Link href="/resources/contributing">Contributing</Link>
              </li>
            </ul>
          </div>

          <div className="quick_links last-media">
            <h5>Support</h5>
            <ul>
              <li>
                <Link href="/support/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/support/community">Community</Link>
              </li>
              <li>
                <Link href="/support/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/support/issues">Report Issues</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="reserved pt-3">
          <p>© {new Date().getFullYear()} InstinctHub. All rights reserved.</p>
          <div className="footer-links mt-2">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="separator">•</span>
            <Link href="/terms">Terms of Service</Link>
            <span className="separator">•</span>
            <Link href="/license">License</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MainFooter;

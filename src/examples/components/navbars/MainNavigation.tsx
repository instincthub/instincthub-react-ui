import React from "react";
import Link from "next/link";

function MainNavigation() {
  return (
    <header>
      <div className="container flexible">
        <div className="logo-container">
          <Link href="/">
            <img
              src="/instincthub-logo.png"
              alt="InstinctHub UI"
              className="logo"
            />
          </Link>
        </div>
        <nav>
          <ul className="navlinks">
            <li>
              <Link href="/docs">Documentation</Link>
            </li>
            <li>
              <Link href="/components">Components</Link>
            </li>
            <li>
              <Link href="/examples">Examples</Link>
            </li>
            <li>
              <Link href="/resources">Resources</Link>
            </li>
            <li>
              <Link href="https://github.com/instincthub/react-ui">
                <img
                  src="/github-icon.svg"
                  alt="GitHub"
                  style={{ width: "24px", height: "24px" }}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainNavigation;

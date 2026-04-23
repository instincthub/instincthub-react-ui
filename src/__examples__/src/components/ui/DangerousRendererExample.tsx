"use client";

import React, { useState } from "react";
import { DangerousRenderer } from "../../../../index";

const UNTRUSTED_HTML = `
<h2>Untrusted HTML from an API</h2>
<p>This payload contains a mix of <strong>safe markup</strong> and
<em>malicious</em> content that DangerousRenderer will strip.</p>

<p>Here is a real link: <a href="https://example.com">example.com</a> — and a
broken one: <a href="javascript:alert('xss')">click me</a>.</p>

<p>An inline script will be removed: <script>alert('pwned')</script></p>

<p>An inline event handler will also be scrubbed:
<img src="x" onerror="alert('xss')" alt="broken"></p>

<p>Code renders literally: <code>&lt;script&gt;bad()&lt;/script&gt;</code></p>
`;

const UNTRUSTED_MARKDOWN = `# Markdown via the API

A greeting from the server. Markdown supports **bold**, *italic*,
and [links](https://example.com).

## Feature list

- DOMPurify sanitization
- Link hardening (\`rel\` + \`target\`)
- DoS guard via \`maxLength\`
- Observability via \`onSanitize\` / \`onError\`

> Inline HTML inside markdown is also sanitized:
> <script>alert('still blocked')</script>

\`\`\`js
// Code fences survive intact.
function hello() {
  return "world";
}
\`\`\`
`;

const MODES = ["html", "markdown", "custom-wrapper", "locked-down"] as const;
type Mode = (typeof MODES)[number];

const MODE_LABELS: Record<Mode, string> = {
  html: "Raw HTML",
  markdown: "Markdown",
  "custom-wrapper": "Custom wrapper (children)",
  "locked-down": "Locked-down allowlist",
};

export default function DangerousRendererExample() {
  const [mode, setMode] = useState<Mode>("html");
  const [log, setLog] = useState<
    Array<{ kind: "sanitize" | "error"; message: string; at: string }>
  >([]);

  const pushLog = (entry: { kind: "sanitize" | "error"; message: string }) => {
    setLog((prev) =>
      [{ ...entry, at: new Date().toLocaleTimeString() }, ...prev].slice(0, 6),
    );
  };

  return (
    <section
      className="ihub-container"
      style={{ padding: "6rem 1.5rem 3rem" }}
    >
      <header style={{ marginBottom: "1.5rem" }}>
        <div className="ihub-container" >
          <h1>DangerousRenderer</h1>
          <p style={{ maxWidth: 720 }}>
            Safe-by-default renderer for untrusted HTML / Markdown. Switch modes
            below to see DOMPurify sanitization, markdown parsing, the custom
            wrapper via <code>children</code>, and a locked-down allowlist.
          </p>
        </div>
      </header>

      <div
        role="tablist"
        aria-label="Demo modes"
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginBottom: "1.5rem",
          marginTop: "1rem",
        }}
      >
        {MODES.map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            onClick={() => setMode(m)}
            className={`ihub-important-btn ${
              mode === m ? "" : "ihub-outlined-btn"
            }`}
          >
            {MODE_LABELS[m]}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 280px",
          gap: "1.5rem",
          alignItems: "flex-start",
        }}
      >
        <div
          style={{
            border: "1px solid var(--borderDefault, #e5e7eb)",
            borderRadius: 8,
            padding: "1rem",
            minHeight: 320,
          }}
        >
          {mode === "html" && (
            <DangerousRenderer
              content={UNTRUSTED_HTML}
              onSanitize={({ changed, sanitized, original }) =>
                pushLog({
                  kind: "sanitize",
                  message: `HTML sanitized — changed: ${changed} (${original.length}→${sanitized.length} chars)`,
                })
              }
              onError={(err) =>
                pushLog({ kind: "error", message: err.message })
              }
            />
          )}

          {mode === "markdown" && (
            <DangerousRenderer
              content={UNTRUSTED_MARKDOWN}
              isMarkdown
              onSanitize={({ changed }) =>
                pushLog({
                  kind: "sanitize",
                  message: `Markdown sanitized — changed: ${changed}`,
                })
              }
            />
          )}

          {mode === "custom-wrapper" && (
            <DangerousRenderer content={UNTRUSTED_MARKDOWN} isMarkdown>
              <article
                className="ihub-content-viewer"
                style={{ maxWidth: 640, margin: "0 auto" }}
              />
            </DangerousRenderer>
          )}

          {mode === "locked-down" && (
            <DangerousRenderer
              content={UNTRUSTED_HTML}
              forbiddenTags={["img", "iframe", "video", "audio"]}
              forbiddenAttributes={["style", "class"]}
              openLinksInNewTab={false}
              onSanitize={({ changed }) =>
                pushLog({
                  kind: "sanitize",
                  message: `Locked-down sanitize — changed: ${changed}`,
                })
              }
            />
          )}
        </div>

        <aside
          style={{
            border: "1px solid var(--borderDefault, #e5e7eb)",
            borderRadius: 8,
            padding: "1rem",
            background: "var(--White, #fff)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Event log</h3>
          {log.length === 0 ? (
            <p style={{ color: "var(--Gray)", fontSize: 14 }}>
              Interact with the renderer to see <code>onSanitize</code> and{" "}
              <code>onError</code> callbacks fire here.
            </p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: 13,
              }}
            >
              {log.map((entry, i) => (
                <li
                  key={i}
                  style={{
                    padding: "0.5rem 0",
                    borderBottom: "1px dashed var(--borderDefault, #e5e7eb)",
                    color:
                      entry.kind === "error"
                        ? "var(--TurkishRose, #b91c1c)"
                        : "var(--Gunmetal, #111)",
                  }}
                >
                  <strong>[{entry.at}]</strong> {entry.message}
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";

type AsElement = string | React.ComponentType<any>;

export interface DangerousRendererProps {
  /** Raw HTML (or Markdown) string to render. */
  content: string;
  /**
   * Optional wrapper element. Pass a single React element (e.g. `<article className="prose" />`)
   * and the sanitized HTML will be injected into it. Gives the consumer full control over the
   * wrapper (classes, refs, event handlers, attributes). If omitted, falls back to `as`.
   */
  children?: React.ReactElement;
  /** HTML element to render the container as when `children` is not provided. Defaults to `div`. */
  as?: AsElement;
  /** CSS class for the default wrapper (ignored when `children` is provided). */
  className?: string;
  /** Inline styles for the default wrapper (ignored when `children` is provided). */
  style?: React.CSSProperties;
  /** Container id for the default wrapper (ignored when `children` is provided). */
  id?: string;
  /** If true, parses `content` as Markdown before sanitization. */
  isMarkdown?: boolean;
  /** Extra tags to allow during sanitization (added to DOMPurify ADD_TAGS). */
  allowedTags?: string[];
  /** Extra attributes to allow during sanitization (added to DOMPurify ADD_ATTR). */
  allowedAttributes?: string[];
  /** Explicitly forbid these tags. */
  forbiddenTags?: string[];
  /** Explicitly forbid these attributes. */
  forbiddenAttributes?: string[];
  /** DOMPurify profile flags. Defaults to `{ html: true }`. */
  useProfiles?: {
    html?: boolean;
    svg?: boolean;
    svgFilters?: boolean;
    mathMl?: boolean;
  };
  /** Escape text inside `<code>` blocks so HTML entities render literally. */
  escapeCodeBlocks?: boolean;
  /** Add `rel="noopener noreferrer"` to anchor tags. Defaults to true. */
  noReferrer?: boolean;
  /** Force external links (http/https) to open in a new tab. Defaults to true. */
  openLinksInNewTab?: boolean;
  /** Hard cap on `content` length to guard against DoS. Defaults to 1,000,000. */
  maxLength?: number;
  /**
   * Bypass sanitization. USE WITH EXTREME CAUTION — only when `content`
   * comes from a fully trusted source. Logs a warning in development.
   */
  trusted?: boolean;
  /** Node rendered when `content` is empty after processing. */
  fallback?: React.ReactNode;
  /** If true, renders `loadingComponent` instead of the content. */
  loading?: boolean;
  /** Node rendered while `loading` is true. */
  loadingComponent?: React.ReactNode;
  /** Called after sanitization with both sanitized and original values. */
  onSanitize?: (info: { sanitized: string; original: string; changed: boolean }) => void;
  /** Called if sanitization/markdown parsing throws. */
  onError?: (error: Error) => void;
  /** ARIA label for the container. */
  ariaLabel?: string;
  /** ARIA role for the container. */
  role?: string;
}

const DEFAULT_MAX_LENGTH = 1_000_000;
const DEFAULT_USE_PROFILES: { html: true } = { html: true };

const escapeCodeTagContent = (html: string): string =>
  html.replace(/<code>([\s\S]*?)<\/code>/g, (_match, inner: string) => {
    const escaped = inner
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<code>${escaped}</code>`;
  });

/**
 * DangerousRenderer
 *
 * A safe-by-default replacement for raw `dangerouslySetInnerHTML`. Sanitizes
 * HTML (or Markdown) via DOMPurify before injection, with configurable
 * allowlists, link hardening, Markdown support, DoS guards, and explicit
 * opt-in for trusted bypass.
 *
 * @example
 * ```tsx
 * import { DangerousRenderer } from "@instincthub/react-ui";
 *
 * // Default wrapper
 * <DangerousRenderer content={htmlFromApi} isMarkdown />
 *
 * // Custom wrapper via children — consumer owns the element
 * <DangerousRenderer content={htmlFromApi}>
 *   <article className="prose" ref={articleRef} onClick={onClick} />
 * </DangerousRenderer>
 * ```
 */
export default function DangerousRenderer({
  content,
  children,
  as = "div",
  className = "",
  style,
  id,
  isMarkdown = false,
  allowedTags,
  allowedAttributes,
  forbiddenTags,
  forbiddenAttributes,
  useProfiles = DEFAULT_USE_PROFILES,
  escapeCodeBlocks = true,
  noReferrer = true,
  openLinksInNewTab = true,
  maxLength = DEFAULT_MAX_LENGTH,
  trusted = false,
  fallback = null,
  loading = false,
  loadingComponent = null,
  onSanitize,
  onError,
  ariaLabel,
  role,
}: DangerousRendererProps) {
  const [html, setHtml] = useState<string>("");
  const hookRegisteredRef = useRef(false);
  const onSanitizeRef = useRef(onSanitize);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onSanitizeRef.current = onSanitize;
    onErrorRef.current = onError;
  }, [onSanitize, onError]);

  useEffect(() => {
    if (hookRegisteredRef.current) return;
    hookRegisteredRef.current = true;

    DOMPurify.addHook("afterSanitizeAttributes", (node) => {
      if (node.tagName === "A" && node.getAttribute("href")) {
        if (noReferrer) {
          node.setAttribute("rel", "noopener noreferrer");
        }
        const href = node.getAttribute("href") || "";
        if (openLinksInNewTab && /^https?:\/\//i.test(href)) {
          node.setAttribute("target", "_blank");
        }
      }
    });

    return () => {
      DOMPurify.removeHook("afterSanitizeAttributes");
      hookRegisteredRef.current = false;
    };
  }, [noReferrer, openLinksInNewTab]);

  const allowedTagsKey = allowedTags?.join(",") ?? "";
  const allowedAttrsKey = allowedAttributes?.join(",") ?? "";
  const forbiddenTagsKey = forbiddenTags?.join(",") ?? "";
  const forbiddenAttrsKey = forbiddenAttributes?.join(",") ?? "";
  const profilesKey = `${useProfiles.html ? 1 : 0}${useProfiles.svg ? 1 : 0}${
    useProfiles.svgFilters ? 1 : 0
  }${useProfiles.mathMl ? 1 : 0}`;

  const sanitizeConfig = useMemo<DOMPurify.Config>(() => {
    const cfg: DOMPurify.Config = { USE_PROFILES: useProfiles };
    if (allowedTags) cfg.ADD_TAGS = allowedTags;
    if (allowedAttributes) cfg.ADD_ATTR = allowedAttributes;
    if (forbiddenTags) cfg.FORBID_TAGS = forbiddenTags;
    if (forbiddenAttributes) cfg.FORBID_ATTR = forbiddenAttributes;
    return cfg;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profilesKey, allowedTagsKey, allowedAttrsKey, forbiddenTagsKey, forbiddenAttrsKey]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        if (!content) {
          if (!cancelled) setHtml("");
          return;
        }

        if (content.length > maxLength) {
          throw new Error(
            `DangerousRenderer: content length (${content.length}) exceeds maxLength (${maxLength}).`,
          );
        }

        let processed = isMarkdown ? await Promise.resolve(marked.parse(content)) : content;

        if (escapeCodeBlocks && typeof processed === "string") {
          processed = escapeCodeTagContent(processed);
        }

        const rawProcessed = String(processed ?? "");
        const finalHtml = trusted
          ? rawProcessed
          : String(DOMPurify.sanitize(rawProcessed, sanitizeConfig) ?? "");

        if (trusted && process.env.NODE_ENV !== "production") {
          console.warn(
            "DangerousRenderer: `trusted` enabled — content injected without sanitization. Ensure the source is fully trusted.",
          );
        }

        if (!cancelled) {
          setHtml(finalHtml);
          onSanitizeRef.current?.({
            sanitized: finalHtml,
            original: content,
            changed: finalHtml !== content,
          });
        }
      } catch (error) {
        if (!cancelled) {
          setHtml("");
          onErrorRef.current?.(
            error instanceof Error ? error : new Error(String(error)),
          );
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [content, isMarkdown, escapeCodeBlocks, trusted, maxLength, sanitizeConfig]);

  if (loading) {
    return <>{loadingComponent}</>;
  }

  if (!html) {
    return <>{fallback}</>;
  }

  const innerProps = { __html: html };

  if (React.isValidElement(children)) {
    const childClassName = (children.props as { className?: string }).className;
    return React.cloneElement(children, {
      ...(ariaLabel ? { "aria-label": ariaLabel } : {}),
      ...(role ? { role } : {}),
      className: [childClassName, "ihub-dangerous-renderer"].filter(Boolean).join(" "),
      dangerouslySetInnerHTML: innerProps,
    } as Partial<typeof children.props>);
  }

  return React.createElement(as, {
    id,
    className: `ihub-dangerous-renderer ${className}`.trim(),
    style,
    "aria-label": ariaLabel,
    role,
    dangerouslySetInnerHTML: innerProps,
  });
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { NavItemType, SideNavSearchConfig } from "../../types/navbar";
import { SideNavSearchResult, searchSideNav, splitNavMatch } from "./sideNavMatch";

interface SideNavSearchProps {
  items: NavItemType[];
  config: SideNavSearchConfig;
  /** Unique prefix for ids (several sidebars can share a page) */
  idPrefix: string;
  /** Renders one hit; must return the clickable element for that item */
  renderResult: (
    result: SideNavSearchResult,
    props: {
      id: string;
      selected: boolean;
      label: React.ReactNode;
      onMouseEnter: () => void;
      onActivated: () => void;
    }
  ) => React.ReactNode;
  /** Whether the "/" shortcut listens (the menu is on screen) */
  shortcutEnabled: boolean;
  /** Renders the area below the field: the result list, or null for "show the menu" */
  children: (results: React.ReactNode | null) => React.ReactNode;
}

/** True when a key press is going into a field, so "/" should type a slash. */
const isTypingTarget = (target: EventTarget | null): boolean => {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
};

/**
 * Search field and result list for SideNavbar. The shortcut key focuses it,
 * arrows move through the hits, Enter opens one, Escape clears.
 */
const SideNavSearch = ({
  items,
  config,
  idPrefix,
  renderResult,
  shortcutEnabled,
  children,
}: SideNavSearchProps) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const shortcut = config.shortcut === undefined ? "/" : config.shortcut;
  const results = searchSideNav(items, query);
  const searching = query.trim().length > 0;
  const listId = `${idPrefix}-results`;

  useEffect(() => {
    if (!shortcut || !shortcutEnabled) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key !== shortcut ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        isTypingTarget(event.target)
      ) {
        return;
      }
      // Only the sidebar actually on screen takes the shortcut.
      const input = inputRef.current;
      if (!input || input.getClientRects().length === 0) return;
      event.preventDefault();
      input.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [shortcut, shortcutEnabled]);

  const update = (value: string) => {
    setQuery(value);
    setSelected(0);
    config.onSearch?.(value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      if (query) update("");
      else inputRef.current?.blur();
      return;
    }
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((selected + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected(selected <= 0 ? results.length - 1 : selected - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      // Click the rendered option so links navigate the way they always do
      // (next/link, external targets, button handlers) without a router here.
      document.getElementById(`${listId}-${selected}`)?.click();
    }
  };

  const list: React.ReactNode | null = !searching ? null : results.length ? (
    <>
      <div className="ihub-sidenav-results-meta" aria-live="polite">
        {results.length} {results.length === 1 ? "match" : "matches"}
      </div>
      <ul className="ihub-sidenav-results" id={listId} role="listbox">
        {results.map((result, index) => {
          const [before, hit, after] = splitNavMatch(result.item.title, query);
          return (
            <li key={`${result.item.id}-${index}`} role="presentation">
              {renderResult(result, {
                id: `${listId}-${index}`,
                selected: index === selected,
                label: (
                  <span className="ihub-sidenav-result-text">
                    <span className="ihub-sidenav-result-title">
                      {before}
                      {hit && <mark>{hit}</mark>}
                      {after}
                    </span>
                    {result.trail.length > 0 && (
                      <span className="ihub-sidenav-result-trail">{result.trail.join(" › ")}</span>
                    )}
                  </span>
                ),
                onMouseEnter: () => setSelected(index),
                onActivated: () => update(""),
              })}
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <div className="ihub-sidenav-search-empty" role="status">
      <span className="ihub-sidenav-search-empty-icon" aria-hidden="true">
        <SearchOffIcon />
      </span>
      {config.emptyMessage ? (
        config.emptyMessage(query.trim())
      ) : (
        <strong>Nothing called &ldquo;{query.trim()}&rdquo;</strong>
      )}
    </div>
  );

  return (
    <>
      <div className="ihub-sidenav-search">
        <div className="ihub-sidenav-search-box">
          <SearchIcon aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            className="ihub-sidenav-search-input"
            placeholder={config.placeholder ?? "Search menu"}
            value={query}
            onChange={(event) => update(event.target.value)}
            onKeyDown={onKeyDown}
            role="combobox"
            aria-label={config.placeholder ?? "Search menu"}
            aria-expanded={searching}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={searching && results.length ? `${listId}-${selected}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          {query ? (
            <button
              type="button"
              className="ihub-sidenav-search-clear"
              aria-label="Clear search"
              onClick={() => {
                update("");
                inputRef.current?.focus();
              }}
            >
              <CloseIcon />
            </button>
          ) : (
            shortcut && (
              <kbd className="ihub-sidenav-kbd" title={`Press ${shortcut} to search`}>
                {shortcut}
              </kbd>
            )
          )}
        </div>
      </div>
      {children(list)}
    </>
  );
};

export default SideNavSearch;

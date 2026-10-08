"use client";

import React, { useEffect, useState, useRef, useCallback, useMemo, useId } from "react";
import Link from "next/link";
import Image from "next/image";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  SideNavbarProps,
  NavItemType,
  NavLinkItem,
  NavGroupItem,
  NavButtonItem,
  NavDividerItem,
  NavSectionItem,
  SideNavSearchConfig,
} from "../../types/navbar";
import { ClientOnly } from "../auth";
import SideNavSearch from "./SideNavSearch";
import {
  containsNavId,
  findFlaggedActive,
  resolveSideNavActive,
} from "./sideNavMatch";

const SideNavbar = ({
  items,
  defaultExpanded = true,
  isExpanded: controlledExpanded,
  onExpandedChange,
  position = "left",
  variant = "default",
  expandedWidth = 240,
  collapsedWidth = 64,
  animation = "slide",
  logo,
  footer,
  className = "",
  darkMode = false,
  positioning,
  resizable = false,
  maxWidth = 400,
  minWidth = 180,
  onNavigate,
  autoCollapseOnMobile = true,
  showBackdrop = true,
  onBackdropClick,
  enableTouchGestures = true,
  persistState = true,
  persistStateKey = "ihub-sidenav-expanded",
  lazyRender = false,
  renderItem,
  tooltip,
  toggleShortcut,
  contentContainerClassName = "",
  activePath,
  search,
  children,
}: SideNavbarProps) => {
  const idPrefix = `ihub-sidenav-${useId().replace(/:/g, "")}`;
  // Determine if component is controlled or uncontrolled
  const isControlled = controlledExpanded !== undefined;

  // Initialize expanded state with default value first (for SSR)
  const [isExpanded, setIsExpandedState] = useState(defaultExpanded);

  // Client-side initialization after hydration
  useEffect(() => {
    if (isControlled) {
      setIsExpandedState(controlledExpanded);
    } else if (persistState && typeof window !== "undefined") {
      const savedState = localStorage.getItem(persistStateKey);
      if (savedState !== null) {
        setIsExpandedState(savedState === "true");
      }
    }
  }, [isControlled, controlledExpanded, persistState, persistStateKey]);

  // Sync with controlled prop
  useEffect(() => {
    if (isControlled) {
      setIsExpandedState(controlledExpanded);
    }
  }, [isControlled, controlledExpanded]);

  // Get actual expanded state regardless of controlled/uncontrolled
  const getIsExpanded = () => (isControlled ? controlledExpanded : isExpanded);

  // Handle expanding and collapsing
  const setIsExpanded = (expanded: boolean) => {
    if (!isControlled) {
      setIsExpandedState(expanded);
      if (persistState && typeof window !== "undefined") {
        localStorage.setItem(persistStateKey, String(expanded));
      }
    }
    onExpandedChange?.(expanded);
  };

  const toggleExpanded = () => setIsExpanded(!getIsExpanded());

  // Where the current page sits in the menu. With `activePath` the route
  // decides (most specific href wins); otherwise the `isActive` flags do, at
  // any depth.
  const active = useMemo(
    () =>
      activePath !== undefined
        ? resolveSideNavActive(items, activePath)
        : findFlaggedActive(items),
    [items, activePath]
  );
  const ancestorKey = active.ancestorIds.join("|");

  const [activeItemId, setActiveItemId] = useState<string | null>(active.id);
  const [expandedGroups, setExpandedGroups] = useState(
    () => new Set<string>(active.ancestorIds)
  );
  const sectionsKey = `${persistStateKey}-sections`;
  const [collapsedSections, setCollapsedSections] = useState(() => {
    const collapsed = new Set<string>();
    items.forEach((item) => {
      if (item.type === "section" && item.defaultCollapsed) collapsed.add(item.id);
    });
    active.ancestorIds.forEach((id) => collapsed.delete(id));
    return collapsed;
  });

  useEffect(() => {
    if (active.id) setActiveItemId(active.id);
  }, [active.id]);

  // Restore remembered section state after hydration, so server and first
  // client render agree. The active page's section stays open regardless.
  useEffect(() => {
    if (!persistState || typeof window === "undefined") return;
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(sectionsKey) || "null");
      if (saved && typeof saved === "object") {
        setCollapsedSections((prev) => {
          const next = new Set(prev);
          Object.entries(saved as Record<string, boolean>).forEach(([id, isCollapsed]) => {
            if (isCollapsed && !active.ancestorIds.includes(id)) next.add(id);
            else next.delete(id);
          });
          return next;
        });
      }
    } catch {
      // Unreadable storage: keep the defaults.
    }
  }, [persistState, sectionsKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // Open default-expanded groups. Merged into, not replacing, what is open:
  // `items` is often a new array on every parent render, and replacing shut
  // every group the user had opened.
  useEffect(() => {
    const defaults: string[] = [];
    const walk = (navItems: NavItemType[], parentExpanded = false) => {
      navItems.forEach((item) => {
        if (item.type === "section") {
          walk(item.children, parentExpanded);
        } else if (item.type === "group") {
          if (item.defaultExpanded || parentExpanded) {
            defaults.push(item.id);
            walk(item.children, true);
          } else {
            walk(item.children, false);
          }
        }
      });
    };
    walk(items);
    if (defaults.length) {
      setExpandedGroups((prev) =>
        defaults.every((id) => prev.has(id)) ? prev : new Set([...prev, ...defaults])
      );
    }
  }, [items]);

  // Open everything above the active page whenever it changes - this is what
  // makes a hard reload on a nested page show that page in the menu.
  useEffect(() => {
    if (!active.ancestorIds.length) return;
    setExpandedGroups((prev) =>
      active.ancestorIds.every((id) => prev.has(id))
        ? prev
        : new Set([...prev, ...active.ancestorIds])
    );
    setCollapsedSections((prev) =>
      active.ancestorIds.some((id) => prev.has(id))
        ? new Set([...prev].filter((id) => !active.ancestorIds.includes(id)))
        : prev
    );
  }, [ancestorKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleSection = (id: string) => {
    setCollapsedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      if (persistState && typeof window !== "undefined") {
        try {
          const record: Record<string, boolean> = {};
          items.forEach((item) => {
            if (item.type === "section") record[item.id] = next.has(item.id);
          });
          localStorage.setItem(sectionsKey, JSON.stringify(record));
        } catch {
          // Private mode or a full quota: the menu works, it just forgets.
        }
      }
      return next;
    });
  };

  // Toggle group expansion
  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Handle navigation
  const handleNavigation = useCallback(
    (
      item: NavLinkItem | NavButtonItem,
      e: React.MouseEvent | React.KeyboardEvent
    ) => {
      if (item.type === "button") {
        (item as NavButtonItem).onClick(e as React.MouseEvent);
      }

      // A button is an action, not a place: it never takes the highlight
      // from the page you are on.
      if (item.type === "link") setActiveItemId(item.id);
      onNavigate?.(item, e);

      // Auto collapse on mobile
      if (autoCollapseOnMobile && window.innerWidth <= 768) {
        setIsExpanded(false);
      }
    },
    [onNavigate, autoCollapseOnMobile, setIsExpanded]
  );

  // Handle window resize
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle keyboard shortcut
  useEffect(() => {
    if (!toggleShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Parse shortcut and check if it matches
      // Example: "ctrl+b" or "shift+alt+s"
      const keys = toggleShortcut.toLowerCase().split("+");
      const modifiers = keys.filter((k) =>
        ["ctrl", "alt", "shift", "meta"].includes(k)
      );
      const key = keys.find(
        (k) => !["ctrl", "alt", "shift", "meta"].includes(k)
      );

      if (
        key &&
        (e.key || "").toLowerCase() === key &&
        modifiers.every((mod) => {
          switch (mod) {
            case "ctrl":
              return e.ctrlKey;
            case "alt":
              return e.altKey;
            case "shift":
              return e.shiftKey;
            case "meta":
              return e.metaKey;
            default:
              return false;
          }
        })
      ) {
        e.preventDefault();
        toggleExpanded();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleShortcut, toggleExpanded]);

  // Resizable sidebar
  const [sidebarWidth, setSidebarWidth] = useState<number | string>(
    getIsExpanded() ? expandedWidth : collapsedWidth
  );
  const resizingRef = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Bring the active row into view once the groups above it have opened, so
  // a reload deep in a long menu does not leave it scrolled off-screen.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const row = contentRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
      const box = contentRef.current;
      if (!row || !box) return;
      const rowRect = row.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();
      if (rowRect.top < boxRect.top || rowRect.bottom > boxRect.bottom) {
        row.scrollIntoView({ block: "center" });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeItemId, expandedGroups, collapsedSections]);

  useEffect(() => {
    setSidebarWidth(getIsExpanded() ? expandedWidth : collapsedWidth);
  }, [getIsExpanded, expandedWidth, collapsedWidth]);

  const startResizing = (e: React.MouseEvent) => {
    if (!resizable || !getIsExpanded()) return;
    e.preventDefault();
    resizingRef.current = true;

    const onMouseMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;

      let newWidth: number;
      if (position === "left") {
        newWidth = e.clientX;
      } else {
        newWidth = window.innerWidth - e.clientX;
      }

      // Clamp width between min and max
      newWidth = Math.max(
        Number(minWidth),
        Math.min(Number(maxWidth), newWidth)
      );
      setSidebarWidth(newWidth);
    };

    const onMouseUp = () => {
      resizingRef.current = false;
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  // Touch gestures
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!enableTouchGestures || !isMobile) return;
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!enableTouchGestures || !isMobile || touchStartXRef.current === null)
      return;

    const touchDelta = e.touches[0].clientX - touchStartXRef.current;
    const threshold = 50; // Minimum distance to trigger swipe

    if (Math.abs(touchDelta) >= threshold) {
      if (
        (position === "left" && touchDelta > 0) ||
        (position === "right" && touchDelta < 0)
      ) {
        setIsExpanded(true);
      } else {
        setIsExpanded(false);
      }
      touchStartXRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    touchStartXRef.current = null;
  };

  // Render navigation items
  const renderNavItem = (item: NavItemType, level = 0) => {
    // Use custom render function if provided
    if (renderItem) {
      return renderItem(item, level);
    }

    // Handle rendering based on item type
    switch (item.type) {
      case "link":
        return renderNavLink(item as NavLinkItem, level);
      case "group":
        return renderNavGroup(item as NavGroupItem, level);
      case "button":
        return renderNavButton(item as NavButtonItem, level);
      case "divider":
        return renderNavDivider(item as NavDividerItem, level);
      case "section":
        return renderNavSection(item as NavSectionItem);
      default:
        return null;
    }
  };

  const renderNavLink = (item: NavLinkItem, level: number) => {
    // Skip if access check fails
    if (item.hasAccess && !item.hasAccess()) {
      return null;
    }

    // With a route, the route decides; without one, a flag still counts so
    // menus that mark several items keep working.
    const isActive =
      item.id === activeItemId || (activePath === undefined && !!item.isActive);
    const indentClass = level > 0 ? `ihub-sidenav-indent-${level}` : "";

    const linkContent = (
      <>
        {item.icon && (
          <span className="ihub-sidenav-icon">
            {typeof item.icon === "string" ? (
              <Image src={item.icon} alt="" width={24} height={24} />
            ) : (
              item.icon
            )}
          </span>
        )}
        <span
          className={`ihub-sidenav-text ${
            !getIsExpanded() ? "ihub-sidenav-text-hidden" : ""
          }`}
        >
          {item.title}
        </span>
        {item.badge && (
          <span
            className={`ihub-sidenav-badge ihub-sidenav-badge-${
              item.badge.variant || "default"
            }`}
          >
            {item.badge.content}
          </span>
        )}
      </>
    );

    // For external links
    if (item.isExternal) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`ihub-sidenav-item ihub-sidenav-link ${indentClass} ${
            isActive ? "ihub-sidenav-active" : ""
          } ${item.isDisabled ? "ihub-sidenav-disabled" : ""} ${
            item.className || ""
          }`}
          onClick={(e) => !item.isDisabled && handleNavigation(item, e)}
          data-tooltip={
            !getIsExpanded() && tooltip?.enabled ? item.title : undefined
          }
          aria-disabled={item.isDisabled}
        >
          {linkContent}
        </a>
      );
    }

    // For internal links
    return (
      <Link
        href={item.href}
        className={`ihub-sidenav-item ihub-sidenav-link ${indentClass} ${
          isActive && level === 0
            ? "ihub-sidenav-active"
            : isActive
            ? "ihub-sidenav-child-active"
            : ""
        } ${item.isDisabled ? "ihub-sidenav-disabled" : ""} ${
          item.className || ""
        }`}
        aria-current={isActive ? "page" : undefined}
        onClick={(e) => !item.isDisabled && handleNavigation(item, e)}
        data-tooltip={
          !getIsExpanded() && tooltip?.enabled ? item.title : undefined
        }
        aria-disabled={item.isDisabled}
      >
        {linkContent}
      </Link>
    );
  };

  const renderNavGroup = (item: NavGroupItem, level: number) => {
    const isGroupExpanded = expandedGroups.has(item.id);
    const hasActiveChild = containsNavId(item, activeItemId);

    const indentClass = level > 0 ? `ihub-sidenav-indent-${level}` : "";

    if (item.hideGroupTitle) {
      return (
        <div className={`ihub-sidenav-group ${item.className || ""}`}>
          {item.children.map((child, index) => (
            <React.Fragment key={child.id || `group-child-${index}`}>
              {renderNavItem(child, level)}
            </React.Fragment>
          ))}
        </div>
      );
    }

    return (
      <div
        className={`ihub-sidenav-group ${item.className || ""} ${
          hasActiveChild ? "ihub-sidenav-group-active" : ""
        }`}
      >
        <div
          className={`ihub-sidenav-item ihub-sidenav-group-header ${
            item.isActive ? "ihub-sidenav-active" : ""
          } ${indentClass} ${item.isDisabled ? "ihub-sidenav-disabled" : ""}`}
          onClick={() => !item.isDisabled && toggleGroup(item.id)}
          data-tooltip={
            !getIsExpanded() && tooltip?.enabled ? item.title : undefined
          }
          aria-disabled={item.isDisabled}
          aria-expanded={isGroupExpanded}
        >
          {item.icon && (
            <span className="ihub-sidenav-icon">
              {typeof item.icon === "string" ? (
                <Image src={item.icon} alt="" width={24} height={24} />
              ) : (
                item.icon
              )}
            </span>
          )}
          <span
            className={`ihub-sidenav-text ${
              !getIsExpanded() ? "ihub-sidenav-text-hidden" : ""
            }`}
          >
            {item.title}
          </span>
          {item.badge && (
            <span
              className={`ihub-sidenav-badge ihub-sidenav-badge-${
                item.badge.variant || "default"
              }`}
            >
              {item.badge.content}
            </span>
          )}
          <span
            className={`ihub-sidenav-arrow ${
              isGroupExpanded ? "ihub-sidenav-arrow-expanded" : ""
            } ${!getIsExpanded() ? "ihub-sidenav-arrow-hidden" : ""}`}
          ></span>
        </div>

        {(isGroupExpanded || !getIsExpanded()) && (
          <div
            className={`ihub-sidenav-group-items ${
              isGroupExpanded ? "ihub-sidenav-group-expanded" : ""
            } ${!getIsExpanded() ? "ihub-sidenav-group-collapsed" : ""}`}
          >
            {(!lazyRender || isGroupExpanded || !getIsExpanded()) &&
              item.children.map((child, index) => (
                <React.Fragment key={child.id || `group-child-${index}`}>
                  {renderNavItem(child, level + 1)}
                </React.Fragment>
              ))}
          </div>
        )}
      </div>
    );
  };

  const renderNavButton = (item: NavButtonItem, level: number) => {
    const indentClass = level > 0 ? `ihub-sidenav-indent-${level}` : "";

    return (
      <button
        className={`ihub-sidenav-item ihub-sidenav-button ${indentClass} ${
          item.isDisabled ? "ihub-sidenav-disabled" : ""
        } ${item.className || ""}`}
        onClick={(e) => !item.isDisabled && handleNavigation(item, e)}
        data-tooltip={
          !getIsExpanded() && tooltip?.enabled ? item.title : undefined
        }
        disabled={item.isDisabled}
      >
        {item.icon && (
          <span className="ihub-sidenav-icon">
            {typeof item.icon === "string" ? (
              <Image src={item.icon} alt="" width={24} height={24} />
            ) : (
              item.icon
            )}
          </span>
        )}
        <span
          className={`ihub-sidenav-text ${
            !getIsExpanded() ? "ihub-sidenav-text-hidden" : ""
          }`}
        >
          {item.title}
        </span>
        {item.badge && (
          <span
            className={`ihub-sidenav-badge ihub-sidenav-badge-${
              item.badge.variant || "default"
            }`}
          >
            {item.badge.content}
          </span>
        )}
      </button>
    );
  };

  const renderNavSection = (item: NavSectionItem) => {
    const expanded = getIsExpanded();
    const collapsible = item.collapsible !== false;
    // A collapsed sidebar shows icons only, so a section is just its items.
    const isCollapsed = expanded && collapsible && collapsedSections.has(item.id);
    const listId = `${idPrefix}-section-${item.id}`;
    const holdsActive = containsNavId(item, activeItemId);

    return (
      <div
        className={`ihub-sidenav-section ${item.className || ""} ${
          holdsActive ? "ihub-sidenav-section-active" : ""
        }`}
      >
        {expanded &&
          (collapsible ? (
            <button
              type="button"
              className="ihub-sidenav-section-head"
              aria-expanded={!isCollapsed}
              aria-controls={listId}
              onClick={() => toggleSection(item.id)}
            >
              <span className="ihub-sidenav-section-title">{item.title}</span>
              {isCollapsed && holdsActive && (
                <span className="ihub-sidenav-section-dot" aria-label="Current page is here" />
              )}
              {isCollapsed && (
                <span className="ihub-sidenav-section-count">
                  {item.children.filter((child) => child.type !== "divider").length}
                </span>
              )}
              <span className="ihub-sidenav-section-chevron" aria-hidden="true">
                <ExpandMoreIcon />
              </span>
            </button>
          ) : (
            <div className="ihub-sidenav-section-head ihub-sidenav-section-head-static">
              <span className="ihub-sidenav-section-title">{item.title}</span>
            </div>
          ))}
        {!isCollapsed && (
          <div id={listId} className="ihub-sidenav-section-items">
            {item.children.map((child, index) => (
              <React.Fragment key={child.id || `section-child-${index}`}>
                {renderNavItem(child, 0)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderNavDivider = (item: NavDividerItem, level: number) => {
    return (
      <div className="ihub-sidenav-divider">
        {item.title && getIsExpanded() && (
          <span className="ihub-sidenav-divider-text">{item.title}</span>
        )}
      </div>
    );
  };

  const searchConfig: SideNavSearchConfig | null =
    search === true ? {} : search ? search : null;

  const renderSearchResult: React.ComponentProps<typeof SideNavSearch>["renderResult"] = (
    { item },
    { id, selected, label, onMouseEnter, onActivated }
  ) => {
    const icon = item.icon && (
      <span className="ihub-sidenav-icon" aria-hidden="true">
        {typeof item.icon === "string" ? (
          <Image src={item.icon} alt="" width={24} height={24} />
        ) : (
          item.icon
        )}
      </span>
    );
    const common = {
      id,
      role: "option" as const,
      "aria-selected": selected,
      className: "ihub-sidenav-item ihub-sidenav-result",
      onMouseEnter,
    };
    if (item.type === "button") {
      return (
        <button
          type="button"
          {...common}
          onClick={(e) => {
            handleNavigation(item, e);
            onActivated();
          }}
        >
          {icon}
          {label}
        </button>
      );
    }
    const onClick = (e: React.MouseEvent) => {
      handleNavigation(item, e);
      onActivated();
    };
    return item.isExternal ? (
      <a href={item.href} target="_blank" rel="noopener noreferrer" {...common} onClick={onClick}>
        {icon}
        {label}
      </a>
    ) : (
      <Link href={item.href} {...common} onClick={onClick}>
        {icon}
        {label}
      </Link>
    );
  };

  const renderContent = (results: React.ReactNode | null) => (
    <div
      ref={contentRef}
      className={`ihub-sidenav-content ihub-scrollbar-thin-light ${
        !logo?.href && !searchConfig ? "ihub-mt-2" : ""
      }`}
    >
      {results ?? (
        <nav className="ihub-sidenav-nav">
          {items.map((item, index) => (
            <React.Fragment key={item.id || `nav-item-${index}`}>
              {renderNavItem(item)}
            </React.Fragment>
          ))}
        </nav>
      )}
    </div>
  );

  // Compose CSS classes
  const sidebarClasses = [
    "ihub-sidenav",
    `ihub-sidenav-${position}`,
    `ihub-sidenav-${variant}`,
    getIsExpanded() ? "ihub-sidenav-expanded" : "ihub-sidenav-collapsed",
    darkMode ? "ihub-sidenav-dark" : "",
    resizable && getIsExpanded() ? "ihub-sidenav-resizable" : "",
    isMobile ? "ihub-sidenav-mobile" : "",
    animation !== "none" ? `ihub-sidenav-${animation}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sidebarStyle: React.CSSProperties = {
    width:
      typeof sidebarWidth === "number" ? `${sidebarWidth}px` : sidebarWidth,
    ...(positioning?.fixed ? { position: "fixed" } : {}),
    ...(positioning?.top !== undefined ? { top: positioning.top } : {}),
    ...(positioning?.zIndex !== undefined
      ? { zIndex: positioning.zIndex }
      : {}),
  };

  // Main container class that wraps both sidebar and content
  const containerClass = [
    "ihub-sidenav-container",
    `ihub-sidenav-container-${position}`,
    getIsExpanded()
      ? "ihub-sidenav-container-expanded"
      : "ihub-sidenav-container-collapsed",
    contentContainerClassName,
  ]
    .filter(Boolean)
    .join(" ");

  // Set CSS variable for dynamic sidebar width (for resizable sidebar)
  const containerStyle: React.CSSProperties = {
    "--ihub-sidenav-width":
      typeof sidebarWidth === "number" ? `${sidebarWidth}px` : sidebarWidth,
  } as React.CSSProperties;

  return (
    <div className={containerClass} style={containerStyle}>
      {/* Backdrop for mobile */}
      {isMobile && getIsExpanded() && showBackdrop && (
        <div
          className="ihub-sidenav-backdrop"
          onClick={() => {
            setIsExpanded(false);
            onBackdropClick?.();
          }}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={sidebarClasses}
        style={sidebarStyle}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Toggle Button - Always visible */}
        <button
          className={`ihub-sidenav-toggle`}
          onClick={toggleExpanded}
          aria-expanded={getIsExpanded()}
          aria-label={getIsExpanded() ? "Collapse sidebar" : "Expand sidebar"}
        >
          {position === "left" ? (
            getIsExpanded() ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon className="ihub-ml-2" />
            )
          ) : getIsExpanded() ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon className="ihub-mr-2" />
          )}
        </button>

        {/* Logo Section */}
        {logo?.href && (
          <div className="ihub-sidenav-logo">
            <Link href={logo.href || ""}>
              {getIsExpanded() || !logo.src ? (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width || 120}
                  height={logo.height || 40}
                />
              ) : (
                logo.miniSrc && (
                  <Image
                    src={logo.miniSrc}
                    alt={logo.alt}
                    width={logo.height || 40}
                    height={logo.height || 40}
                  />
                )
              )}
            </Link>
          </div>
        )}

        {/* Resize Handle */}
        {resizable && getIsExpanded() && (
          <div
            className={`ihub-sidenav-resize-handle ihub-sidenav-resize-handle-${position}`}
            onMouseDown={startResizing}
          />
        )}

        {/* Navigation Items (behind the search field when there is one) */}
        {searchConfig && getIsExpanded() ? (
          <SideNavSearch
            items={items}
            config={searchConfig}
            idPrefix={idPrefix}
            shortcutEnabled={!isMobile || getIsExpanded()}
            renderResult={renderSearchResult}
          >
            {(results) => renderContent(results)}
          </SideNavSearch>
        ) : (
          renderContent(null)
        )}

        {/* Footer */}
        {footer && (
          <div className="ihub-sidenav-footer">
            <ClientOnly
              fallback={
                <div className="ihub-sidenav-user">
                  <div className="ihub-sidenav-user-initials">U</div>
                  <div className="ihub-sidenav-user-info">
                    <div className="ihub-sidenav-user-name">User</div>
                  </div>
                </div>
              }
            >
              {footer.showUserProfile && footer.user && getIsExpanded() && (
                <div className="ihub-sidenav-user">
                  {footer.user.avatar ? (
                    <Image
                      src={`${footer.user.avatar}`}
                      alt={footer.user.name || "User"}
                      width={40}
                      height={40}
                      className="ihub-sidenav-user-avatar"
                    />
                  ) : (
                    <div className="ihub-sidenav-user-initials">
                      {footer.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <div className="ihub-sidenav-user-info">
                    {footer.user.name && (
                      <div className="ihub-sidenav-user-name">
                        {footer.user.name}
                      </div>
                    )}
                    {footer.user.role && (
                      <div className="ihub-sidenav-user-role">
                        {footer.user.role}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </ClientOnly>

            {footer.actions && (
              <div className="ihub-sidenav-footer-actions">
                {footer.actions.map((action, index) => (
                  <React.Fragment key={action.id || `footer-action-${index}`}>
                    {renderNavButton(action, 0)}
                  </React.Fragment>
                ))}
              </div>
            )}

            {footer.content && (
              <div className="ihub-sidenav-footer-content">
                {getIsExpanded() ? footer.content : null}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="ihub-sidenav-main">{children}</div>
    </div>
  );
};

export default SideNavbar;

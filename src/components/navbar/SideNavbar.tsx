"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  SideNavbarProps,
  NavItemType,
  NavLinkItem,
  NavGroupItem,
  NavButtonItem,
  NavDividerItem,
} from "../../types/navbar";
import { ClientOnly } from "../auth";

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
  children,
}: SideNavbarProps) => {
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

  // Track active item and expanded groups
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [expandedGroups, setExpandedGroups] = useState(new Set<string>());

  // Initialize expanded groups
  useEffect(() => {
    const defaultExpandedGroups = new Set<string>();

    const findDefaultExpanded = (
      navItems: NavItemType[],
      parentExpanded = false
    ) => {
      navItems.forEach((item) => {
        if (item.type === "group") {
          const groupItem = item as NavGroupItem;
          const shouldExpand =
            groupItem.defaultExpanded ||
            parentExpanded ||
            groupItem.children.some(
              (child) =>
                ("isActive" in child && child.isActive) ||
                (child.type === "group" &&
                  (child as NavGroupItem).defaultExpanded)
            );

          if (shouldExpand) {
            defaultExpandedGroups.add(item.id);
            findDefaultExpanded(groupItem.children, true);
          }
        }
      });
    };

    findDefaultExpanded(items);
    setExpandedGroups(defaultExpandedGroups);
  }, [items]);

  // Find active item based on current route
  useEffect(() => {
    // This would typically check against the current route
    const findActiveItem = (navItems: NavItemType[]): string | null => {
      for (const item of navItems) {
        if ("isActive" in item && item.isActive) {
          return item.id;
        }
        if (item.type === "group") {
          const activeChild = findActiveItem((item as NavGroupItem).children);
          if (activeChild) {
            setExpandedGroups((prev) => new Set([...prev, item.id]));
            return activeChild;
          }
        }
      }
      return null;
    };

    const activeId = findActiveItem(items);
    if (activeId) {
      setActiveItemId(activeId);
    }
  }, [items]);

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

      setActiveItemId(item.id);
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
        e.key.toLowerCase() === key &&
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
      default:
        return null;
    }
  };

  const renderNavLink = (item: NavLinkItem, level: number) => {
    // Skip if access check fails
    if (item.hasAccess && !item.hasAccess()) {
      return null;
    }

    const isActive = item.id === activeItemId;
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
      </Link>
    );
  };

  const renderNavGroup = (item: NavGroupItem, level: number) => {
    const isGroupExpanded = expandedGroups.has(item.id);
    const hasActiveChild = item.children.some(
      (child) =>
        child.id === activeItemId ||
        (child.type === "group" &&
          (child as NavGroupItem).children.some(
            (subChild) => subChild.id === activeItemId
          ))
    );

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
          className={`ihub-sidenav-item ihub-sidenav-group-header ${indentClass} ${
            item.isDisabled ? "ihub-sidenav-disabled" : ""
          }`}
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

  const renderNavDivider = (item: NavDividerItem, level: number) => {
    return (
      <div className="ihub-sidenav-divider">
        {item.title && getIsExpanded() && (
          <span className="ihub-sidenav-divider-text">{item.title}</span>
        )}
      </div>
    );
  };

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

  return (
    <div className={containerClass}>
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

        {/* Navigation Items */}
        <div
          className={`ihub-sidenav-content ihub-scrollbar-thin-light ${
            !logo?.href ? "ihub-mt-2" : ""
          }`}
        >
          <nav className="ihub-sidenav-nav">
            {items.map((item, index) => (
              <React.Fragment key={item.id || `nav-item-${index}`}>
                {renderNavItem(item)}
              </React.Fragment>
            ))}
          </nav>
        </div>

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

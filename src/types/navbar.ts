// SideNavbar Types

/**
 * Icon representation options - string path or React component
 */
export type IconType = string | React.ReactNode;

/**
 * Base navigation item structure
 */
export interface NavItemBase {
  /** Unique identifier for the item */
  id: string;
  /** Display text for the navigation item */
  title: string;
  /** Icon to display next to the title */
  icon?: IconType;
  /** Whether the item is currently active */
  isActive?: boolean;
  /** Whether the item is disabled */
  isDisabled?: boolean;
  /** Additional CSS class names */
  className?: string;
  /** Any badge or notification indicator */
  badge?: {
    content: string | number;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
  };
  /** Additional metadata for custom rendering */
  meta?: Record<string, any>;
}

/**
 * Navigation link item
 */
export interface NavLinkItem extends NavItemBase {
  /** Type of navigation item */
  type: 'link';
  /** URL the link points to */
  href: string;
  /** Whether the link opens in a new tab */
  isExternal?: boolean;
  /** Access control - function to determine if user has access */
  hasAccess?: () => boolean;
  children?: NavItemType[];
}

/**
 * Navigation group with submenu items
 */
export interface NavGroupItem extends NavItemBase {
  /** Type of navigation item */
  type: 'group';
  /** Submenu items */
  children: (NavLinkItem | NavGroupItem | NavButtonItem | NavDividerItem)[];
  /** Whether the group starts expanded */
  defaultExpanded?: boolean;
  /** Hide group title and only show children */
  hideGroupTitle?: boolean;
}

/**
 * Navigation button for actions
 */
export interface NavButtonItem extends NavItemBase {
  /** Type of navigation item */
  type: 'button';
  /** Click handler function */
  onClick: (e: React.MouseEvent) => void;
}

/**
 * Navigation divider for visual separation
 */
export interface NavDividerItem {
  /** Type of navigation item */
  type: 'divider';
  /** Unique identifier */
  id: string;
  /** Optional title for the divider */
  title?: string;
}

/**
 * Union of all navigation item types
 */
export type NavItemType = NavLinkItem | NavGroupItem | NavButtonItem | NavDividerItem;

/**
 * Logo configuration
 */
export interface SideNavLogoProps {
  /** Full logo for expanded state */
  src: string;
  /** Alternative mini logo for collapsed state */
  miniSrc?: string;
  /** Alt text for the logo */
  alt: string;
  /** Link to navigate to when clicking the logo */
  href?: string;
  /** Logo width */
  width?: number;
  /** Logo height */
  height?: number;
}

/**
 * Footer configuration
 */
export interface SideNavFooterProps {
  /** Custom content for the footer */
  content?: React.ReactNode;
  /** Show user profile in footer */
  showUserProfile?: boolean;
  /** User data for profile display */
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    role?: string;
  };
  /** Additional action buttons */
  actions?: NavButtonItem[];
}

/**
 * Side navigation position
 */
export type SideNavPosition = 'left' | 'right';

/**
 * Side navigation variant
 */
export type SideNavVariant = 'default' | 'compact' | 'mini' | 'overlay';

/**
 * Animation options
 */
export type SideNavAnimation = 'slide' | 'fade' | 'none';

/**
 * Positioning options
 */
export interface SideNavPositioning {
  /** Top offset */
  top?: number | string;
  /** Fixed or absolute positioning */
  fixed?: boolean;
  /** Z-index value */
  zIndex?: number;
}

/**
 * Complete side navbar props
 */
export interface SideNavbarProps {
  /** Array of navigation items */
  items: NavItemType[];
  
  /** Initial expanded state */
  defaultExpanded?: boolean;
  
  /** Controlled expanded state */
  isExpanded?: boolean;
  
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;
  
  /** Side navigation position */
  position?: SideNavPosition;
  
  /** Side navigation variant */
  variant?: SideNavVariant;
  
  /** Expanded sidebar width (px or %) */
  expandedWidth?: number | string;
  
  /** Collapsed sidebar width (px or %) */
  collapsedWidth?: number | string;
  
  /** Animation type for transitions */
  animation?: SideNavAnimation;
  
  /** Logo configuration */
  logo?: SideNavLogoProps;
  
  /** Footer configuration */
  footer?: SideNavFooterProps;
  
  /** Custom CSS class name */
  className?: string;
  
  /** Whether to use dark theme */
  darkMode?: boolean;
  
  /** Additional positioning options */
  positioning?: SideNavPositioning;
  
  /** Allow user to resize sidebar width by dragging */
  resizable?: boolean;
  
  /** Max width for resizable sidebar */
  maxWidth?: number | string;
  
  /** Min width for resizable sidebar */
  minWidth?: number | string;
  
  /** Callback when navigation occurs */
  onNavigate?: (item: NavLinkItem | NavButtonItem, e: React.MouseEvent | React.KeyboardEvent) => void;
  
  /** When true, automatically collapse on mobile after navigation */
  autoCollapseOnMobile?: boolean;
  
  /** Backdrop/overlay for mobile view */
  showBackdrop?: boolean;
  
  /** Callback for backdrop click */
  onBackdropClick?: () => void;
  
  /** Enable touch swipe gestures on mobile */
  enableTouchGestures?: boolean;
  
  /** Whether to persist expansion state in localStorage */
  persistState?: boolean;
  
  /** Key to use for localStorage persistence */
  persistStateKey?: string;
  
  /** Whether to render content only when expanded (performance optimization) */
  lazyRender?: boolean;
  
  /** Custom renderer for nav items */
  renderItem?: (item: NavItemType, level: number) => React.ReactNode;
  
  /** Custom tooltip component or configuration */
  tooltip?: {
    enabled: boolean;
    component?: React.ComponentType<any>;
    delay?: number;
    position?: 'top' | 'right' | 'bottom' | 'left';
  };
  
  /** Keyboard shortcut to toggle sidebar */
  toggleShortcut?: string;
  
  /** Container class name for the main content area */
  contentContainerClassName?: string;
  
  /** Children content to render in main area */
  children?: React.ReactNode;
}

/**
 * Props for the useWindowResize hook
 */
export interface UseWindowResizeProps {
  /** Breakpoint for mobile device detection */
  mobileBreakpoint?: number;
  /** Callback when resizing crosses the mobile breakpoint */
  onBreakpointChange?: (isMobile: boolean) => void;
}

/**
 * Context provider props
 */
export interface SideNavContextProps {
  /** Whether the sidebar is expanded */
  isExpanded: boolean;
  /** Toggle the expanded state */
  toggleExpanded: () => void;
  /** Set expanded state */
  setExpanded: (expanded: boolean) => void;
  /** Whether on mobile viewport */
  isMobile: boolean;
  /** Current active item ID */
  activeItemId: string | null;
  /** Set the active item */
  setActiveItem: (id: string) => void;
  /** Expanded group IDs */
  expandedGroups: Set<string>;
  /** Toggle a group's expanded state */
  toggleGroup: (id: string) => void;
  /** Dark mode state */
  darkMode: boolean;
  /** Current sidebar width */
  sidebarWidth: number | string;
  /** Update sidebar width (for resizable sidebar) */
  updateSidebarWidth: (width: number | string) => void;
}
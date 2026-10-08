import {
  NavButtonItem,
  NavGroupItem,
  NavItemType,
  NavLinkItem,
  NavSectionItem,
} from "../../types/navbar";

/** Where the current route sits in the menu. */
export interface SideNavActive {
  /** Id of the item with the most specific matching href */
  id: string | null;
  /** Ids of the groups and section above it, outermost first */
  ancestorIds: string[];
}

/** One search hit: always something you can open, never a group. */
export interface SideNavSearchResult {
  item: NavLinkItem | NavButtonItem;
  /** Titles of the section and groups above it */
  trail: string[];
}

type Container = NavGroupItem | NavSectionItem;

const isContainer = (item: NavItemType): item is Container =>
  item.type === "group" || item.type === "section";

/**
 * Whether a menu href covers a route.
 * Single-segment hrefs ("/", "/acme") match exactly only, otherwise the home
 * link would claim every page.
 * @param pathname Current route
 * @param href Menu destination
 * @returns True when the route is the href or sits beneath it
 */
export function navPathMatches(pathname: string, href?: string): boolean {
  if (!href) return false;
  const clean = href.split(/[?#]/)[0];
  const depth = clean.split("/").filter(Boolean).length;
  return pathname === clean || (depth > 1 && pathname.startsWith(clean + "/"));
}

/**
 * Find the item a route belongs to: the internal link with the longest
 * matching href, so /deals/import lights "Import" and not "Deals" too.
 * @param items Menu items
 * @param pathname Current route
 * @returns Active id and the ids of everything above it
 */
export function resolveSideNavActive(
  items: NavItemType[],
  pathname?: string
): SideNavActive {
  let best: SideNavActive & { length: number } = { id: null, ancestorIds: [], length: -1 };
  if (!pathname) return { id: null, ancestorIds: [] };

  const walk = (list: NavItemType[], ancestors: string[]) => {
    list.forEach((item) => {
      if (item.type === "link" && !item.isExternal && navPathMatches(pathname, item.href)) {
        const length = item.href.length;
        if (length > best.length) best = { id: item.id, ancestorIds: ancestors, length };
      }
      if (isContainer(item)) walk(item.children, [...ancestors, item.id]);
      else if (item.type === "link" && item.children?.length) walk(item.children, [...ancestors, item.id]);
    });
  };
  walk(items, []);
  return { id: best.id, ancestorIds: best.ancestorIds };
}

/**
 * Find the item flagged `isActive`, at any depth, for menus that do not pass
 * `activePath`.
 * @param items Menu items
 * @returns Active id and the ids of everything above it
 */
export function findFlaggedActive(items: NavItemType[]): SideNavActive {
  const walk = (list: NavItemType[], ancestors: string[]): SideNavActive | null => {
    for (const item of list) {
      if (item.type !== "section" && item.type !== "divider" && item.isActive && !isContainer(item)) {
        return { id: item.id, ancestorIds: ancestors };
      }
      if (isContainer(item)) {
        const found = walk(item.children, [...ancestors, item.id]);
        if (found) return found;
      }
    }
    return null;
  };
  return walk(items, []) ?? { id: null, ancestorIds: [] };
}

/**
 * Whether `id` is somewhere inside `item`.
 * @param item A group or section
 * @param id Item id to look for
 */
export function containsNavId(item: NavItemType, id: string | null): boolean {
  if (!id || !isContainer(item)) return false;
  return item.children.some((child) => child.id === id || containsNavId(child, id));
}

/** Rank of a hit that matched only through a parent's keywords. */
const INHERITED_RANK = 3;

const normalise = (value: string): string =>
  value.toLowerCase().replace(/&/g, "and").replace(/\s+/g, " ").trim();

/**
 * Search every link and button in the menu, nested ones included.
 *
 * Every word must appear in the item's title, keywords, or the titles of the
 * groups and section above it. Title prefixes rank first, then title matches,
 * then context matches. A parent's keywords help a child match, but an item
 * matching only through them is dropped when anything matches directly.
 * Hidden (`hasAccess` false) and disabled items are skipped; an href listed
 * twice is returned once.
 * @param items Menu items
 * @param query What the user typed
 * @returns Ranked hits, empty for a blank query
 */
export function searchSideNav(items: NavItemType[], query: string): SideNavSearchResult[] {
  const needle = normalise(query);
  if (!needle) return [];
  const words = needle.split(" ");
  const matchesAll = (parts: string[]) => {
    const haystack = normalise(parts.join(" "));
    return words.every((word) => haystack.includes(word));
  };

  type Hit = SideNavSearchResult & { rank: number; order: number };
  const hits: Hit[] = [];

  const walk = (list: NavItemType[], trail: string[], inherited: string[]) => {
    list.forEach((item) => {
      if (item.type === "divider") return;
      if (isContainer(item)) {
        const keywords = item.type === "group" ? item.keywords ?? [] : [];
        walk(item.children, [...trail, item.title], [...inherited, ...keywords]);
        return;
      }
      if (item.isDisabled) return;
      if (item.type === "link" && item.hasAccess && !item.hasAccess()) return;

      const own = [item.title, ...trail, ...(item.keywords ?? [])];
      const title = normalise(item.title);
      let rank: number;
      if (matchesAll(own)) {
        rank = title.startsWith(needle) ? 0 : title.includes(needle) ? 1 : 2;
      } else if (inherited.length && matchesAll([...own, ...inherited])) {
        rank = INHERITED_RANK;
      } else {
        rank = -1;
      }
      if (rank >= 0) hits.push({ item, trail, rank, order: hits.length });

      if (item.type === "link" && item.children?.length) {
        walk(item.children, [...trail, item.title], [...inherited, ...(item.keywords ?? [])]);
      }
    });
  };
  walk(items, [], []);

  const hasDirectHit = hits.some((hit) => hit.rank < INHERITED_RANK);
  const seen = new Set<string>();
  return hits
    .filter((hit) => !hasDirectHit || hit.rank < INHERITED_RANK)
    .sort((a, b) => a.rank - b.rank || a.order - b.order)
    .filter((hit) => {
      const key = hit.item.type === "link" ? hit.item.href : `button:${hit.item.id}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map(({ item, trail }) => ({ item, trail }));
}

/**
 * Split a title around the query so the match can be marked.
 * @param title Item title
 * @param query What the user typed
 * @returns [before, match, after]; match is empty when there is no hit
 */
export function splitNavMatch(title: string, query: string): [string, string, string] {
  const needle = query.trim().toLowerCase();
  const at = needle ? title.toLowerCase().indexOf(needle) : -1;
  if (at < 0) return [title, "", ""];
  return [title.slice(0, at), title.slice(at, at + needle.length), title.slice(at + needle.length)];
}

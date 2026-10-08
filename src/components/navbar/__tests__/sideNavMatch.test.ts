import { describe, expect, it } from "vitest";
import {
  containsNavId,
  findFlaggedActive,
  navPathMatches,
  resolveSideNavActive,
  searchSideNav,
  splitNavMatch,
} from "../sideNavMatch";
import { NavItemType } from "../../../types/navbar";

const items: NavItemType[] = [
  {
    type: "section",
    id: "main",
    title: "Main",
    children: [
      { type: "link", id: "home", title: "Dashboard", href: "/acme" },
      {
        type: "group",
        id: "deals",
        title: "Deals",
        keywords: ["pipeline"],
        children: [
          { type: "link", id: "deals-table", title: "Deals Table", href: "/acme/deals" },
          { type: "link", id: "deals-import", title: "Import Deals", href: "/acme/deals/import" },
        ],
      },
    ],
  },
  {
    type: "section",
    id: "more",
    title: "More tools",
    defaultCollapsed: true,
    children: [
      {
        type: "group",
        id: "sms",
        title: "SMS",
        children: [
          { type: "link", id: "sms-templates", title: "Templates", href: "/acme/sms/templates" },
          { type: "link", id: "sms-hidden", title: "Secret", href: "/acme/sms/secret", hasAccess: () => false },
        ],
      },
      { type: "button", id: "logout", title: "Log out", onClick: () => undefined },
    ],
  },
];

describe("navPathMatches", () => {
  it("matches the home link exactly only", () => {
    expect(navPathMatches("/acme", "/acme")).toBe(true);
    expect(navPathMatches("/acme/deals", "/acme")).toBe(false);
  });

  it("ignores a query string on the href", () => {
    expect(navPathMatches("/acme/deals/7", "/acme/deals?tab=all")).toBe(true);
  });
});

describe("resolveSideNavActive", () => {
  it("picks the most specific href and lists its ancestors", () => {
    expect(resolveSideNavActive(items, "/acme/deals/import")).toEqual({
      id: "deals-import",
      ancestorIds: ["main", "deals"],
    });
  });

  it("finds a detail page under a nested link", () => {
    expect(resolveSideNavActive(items, "/acme/sms/templates/12").ancestorIds).toEqual(["more", "sms"]);
  });

  it("returns nothing without a route", () => {
    expect(resolveSideNavActive(items, undefined).id).toBeNull();
  });
});

describe("findFlaggedActive", () => {
  it("finds an isActive flag at any depth", () => {
    const flagged: NavItemType[] = [
      { type: "group", id: "g", title: "G", children: [{ type: "link", id: "x", title: "X", href: "/x", isActive: true }] },
    ];
    expect(findFlaggedActive(flagged)).toEqual({ id: "x", ancestorIds: ["g"] });
  });
});

describe("containsNavId", () => {
  it("looks through sections and groups", () => {
    expect(containsNavId(items[1], "sms-templates")).toBe(true);
    expect(containsNavId(items[0], "sms-templates")).toBe(false);
  });
});

describe("searchSideNav", () => {
  it("returns nothing for a blank query", () => {
    expect(searchSideNav(items, " ")).toEqual([]);
  });

  it("finds nested links with their trail", () => {
    const [hit] = searchSideNav(items, "templ");
    expect(hit.item.id).toBe("sms-templates");
    expect(hit.trail).toEqual(["More tools", "SMS"]);
  });

  it("uses group keywords only as a fallback", () => {
    expect(searchSideNav(items, "pipeline").map((r) => r.item.id)).toEqual(["deals-table", "deals-import"]);
    expect(searchSideNav(items, "pipeline import").map((r) => r.item.id)).toEqual(["deals-import"]);
  });

  it("ranks title prefixes first", () => {
    expect(searchSideNav(items, "deals").map((r) => r.item.id)).toEqual(["deals-table", "deals-import"]);
  });

  it("skips items the viewer cannot access and includes buttons", () => {
    expect(searchSideNav(items, "secret")).toEqual([]);
    expect(searchSideNav(items, "log out").map((r) => r.item.id)).toEqual(["logout"]);
  });
});

describe("splitNavMatch", () => {
  it("splits around a case-insensitive hit", () => {
    expect(splitNavMatch("Import Deals", "deal")).toEqual(["Import ", "Deal", "s"]);
  });
});

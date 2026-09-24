import Table, { TableView } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import type { Node as PMNode } from "@tiptap/pm/model";
import { readStyleValue, safeColor, sanitizeStyle, splitDeclarations } from "./colorUtils";

/** HTML attributes email templates rely on (role="presentation", cellpadding…). */
const TABLE_HTML_ATTRS = ["width", "cellpadding", "cellspacing", "border", "align", "role", "bgcolor"] as const;
const CELL_HTML_ATTRS = ["width", "align", "valign", "height"] as const;

const htmlAttr = (name: string) => ({
  default: null,
  parseHTML: (el: HTMLElement) => el.getAttribute(name),
  renderHTML: (attrs: Record<string, unknown>) => (attrs[name] ? { [name]: attrs[name] } : {}),
});

const backgroundColorAttr = {
  default: null,
  // bgcolor first: it stays hex, while style colours come back as rgb() after serialising.
  parseHTML: (el: HTMLElement) => el.getAttribute("bgcolor") || readStyleValue(el, "background-color") || null,
  renderHTML: (attrs: Record<string, unknown>) => {
    if (!attrs.backgroundColor) return {};
    const color = safeColor(attrs.backgroundColor, "");
    return color ? { style: `background-color:${color}`, bgcolor: color.startsWith("#") ? color : null } : {};
  },
};

/** Applies preserved attributes to the live <table> the resizable view renders. */
export class TableViewWithAttrs extends TableView {
  /** Style properties this view set, so they can be cleared when the style changes. */
  private appliedProps: string[] = [];

  constructor(node: PMNode, cellMinWidth: number) {
    super(node, cellMinWidth);
    this.applyAttrs(node);
  }

  update(node: PMNode): boolean {
    const ok = super.update(node);
    if (ok) this.applyAttrs(node);
    return ok;
  }

  private applyAttrs(node: PMNode): void {
    TABLE_HTML_ATTRS.forEach((name) => {
      const value = node.attrs[name];
      if (value) this.table.setAttribute(name, String(value));
      else this.table.removeAttribute(name);
    });
    const firstRow = node.firstChild;
    const hasFixedWidths = Boolean(firstRow && firstRow.childCount && firstRow.child(0).attrs.colwidth);
    this.appliedProps.forEach((prop) => this.table.style.removeProperty(prop));
    this.appliedProps = [];
    const style = sanitizeStyle(node.attrs.style);
    if (!style) return;
    splitDeclarations(style).forEach((decl) => {
      const [prop, ...rest] = decl.split(":");
      const property = prop.trim().toLowerCase();
      if (hasFixedWidths && (property === "width" || property === "min-width")) return;
      const raw = rest.join(":").trim();
      const important = /!important$/i.test(raw);
      this.table.style.setProperty(property, raw.replace(/!important$/i, "").trim(), important ? "important" : "");
      this.appliedProps.push(property);
    });
  }
}

export const IHubTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      ...Object.fromEntries(TABLE_HTML_ATTRS.map((name) => [name, htmlAttr(name)])),
    };
  },
}).configure({ resizable: true, View: TableViewWithAttrs, HTMLAttributes: { class: "ihub-te-table" } });

export const IHubTableRow = TableRow.extend({
  addAttributes() {
    return { ...this.parent?.(), bgcolor: htmlAttr("bgcolor") };
  },
});

export const IHubTableCell = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: backgroundColorAttr,
      ...Object.fromEntries(CELL_HTML_ATTRS.map((name) => [name, htmlAttr(name)])),
    };
  },
});

export const IHubTableHeader = TableHeader.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: backgroundColorAttr,
      ...Object.fromEntries(CELL_HTML_ATTRS.map((name) => [name, htmlAttr(name)])),
    };
  },
});

import React from "react";
import { TableColumnType } from "../../../../types";
import { getNestedValue } from "../../../lib/helpFunction";

/**
 * Keys that are preferred, in order, when an object needs to be reduced to a
 * single readable label (e.g. `groups: [{title: "Students", ...}]` -> "Students").
 */
const LABEL_KEYS = [
  "title",
  "name",
  "full_name",
  "label",
  "display_name",
  "username",
  "email",
  "value",
  "slug",
  "id",
];

/** Pull readable text out of a React node so `cell`/function accessors can be exported. */
export const extractTextFromNode = (node: React.ReactNode): string => {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node
      .map(extractTextFromNode)
      .filter((text) => text !== "")
      .join(" ")
      .trim();
  }

  if (React.isValidElement(node)) {
    const props = node.props as {
      children?: React.ReactNode;
      title?: string;
      alt?: string;
      value?: unknown;
    };

    const childText = extractTextFromNode(props?.children);
    if (childText) return childText;

    if (typeof props?.title === "string") return props.title;
    if (typeof props?.alt === "string") return props.alt;
    if (props?.value !== undefined && props?.value !== null) {
      return String(props.value);
    }
  }

  return "";
};

/**
 * Flatten any cell value into a single export-safe string.
 * Arrays become "a | b | c", objects fall back to a label key then JSON.
 */
export const stringifyExportValue = (value: unknown): string => {
  if (value === null || value === undefined) return "";

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  ) {
    return String(value);
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "" : value.toISOString();
  }

  if (Array.isArray(value)) {
    return value
      .map(stringifyExportValue)
      .filter((text) => text !== "")
      .join(" | ");
  }

  if (React.isValidElement(value)) {
    return extractTextFromNode(value);
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    for (const key of LABEL_KEYS) {
      const candidate = record[key];
      if (
        typeof candidate === "string" ||
        typeof candidate === "number" ||
        typeof candidate === "boolean"
      ) {
        return String(candidate);
      }
    }

    try {
      return JSON.stringify(record);
    } catch {
      return "";
    }
  }

  return "";
};

/**
 * Resolve the export value for a single column/row pair.
 *
 * Resolution order:
 * 1. `column.exportValue` — explicit, always wins.
 * 2. String accessor — nested lookup (`user.email` works), falling back to
 *    `cell` when the raw value is empty.
 * 3. Function accessor — invoked, then flattened (React nodes become text).
 * 4. `cell` — invoked, then flattened.
 */
export const resolveColumnExportValue = <T,>(
  row: T,
  column: TableColumnType<T>,
  index: number
): string => {
  if (typeof column.exportValue === "function") {
    return stringifyExportValue(column.exportValue(row, index));
  }

  if (typeof column.accessor === "string") {
    const raw = getNestedValue(row, column.accessor);
    const text = stringifyExportValue(raw);
    if (text !== "") return text;

    return column.cell ? stringifyExportValue(column.cell(row)) : "";
  }

  if (typeof column.accessor === "function") {
    const rendered = column.accessor(row, index);
    const text = stringifyExportValue(rendered);
    if (text !== "") return text;
  }

  return column.cell ? stringifyExportValue(column.cell(row)) : "";
};

/** Columns that should appear in an export (anything not opted out via `exportable: false`). */
export const getExportableColumns = <T,>(
  columns: TableColumnType<T>[]
): TableColumnType<T>[] => columns.filter((column) => column.exportable !== false);

/**
 * Flatten a raw record into `{ header: value }` pairs covering every leaf field,
 * used when `exportOptions.allFields` is enabled so nothing in the API payload is lost.
 */
export const flattenRecord = (
  record: Record<string, any>,
  parentKey = "",
  accumulator: Record<string, string> = {}
): Record<string, string> => {
  Object.keys(record || {}).forEach((key) => {
    const nextKey = parentKey ? `${parentKey}.${key}` : key;
    const value = record[key];

    if (Array.isArray(value)) {
      const hasObjects = value.some(
        (item) => typeof item === "object" && item !== null
      );

      if (!hasObjects) {
        accumulator[nextKey] = stringifyExportValue(value);
        return;
      }

      accumulator[nextKey] = value
        .map((item) => stringifyExportValue(item))
        .filter((text) => text !== "")
        .join(" | ");
      return;
    }

    if (value && typeof value === "object" && !(value instanceof Date)) {
      flattenRecord(value as Record<string, any>, nextKey, accumulator);
      return;
    }

    accumulator[nextKey] = stringifyExportValue(value);
  });

  return accumulator;
};

/** Build headers + rows from every leaf field across the dataset (union of keys, stable order). */
export const buildAllFieldsMatrix = <T,>(
  data: T[]
): { headers: string[]; rows: string[][] } => {
  const flattened = data.map((row) =>
    flattenRecord(row as Record<string, any>)
  );

  const headers: string[] = [];
  flattened.forEach((row) => {
    Object.keys(row).forEach((key) => {
      if (!headers.includes(key)) headers.push(key);
    });
  });

  const rows = flattened.map((row) => headers.map((header) => row[header] ?? ""));

  return { headers, rows };
};

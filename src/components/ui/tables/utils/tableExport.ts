import { TableColumnType, TableExportOptionsType } from "../../../../types";
import {
  buildAllFieldsMatrix,
  getExportableColumns,
  resolveColumnExportValue,
} from "./exportValues";
import { downloadCsv, downloadExcel, downloadPdf } from "./exportWriters";

export type TableExportFormatType = "csv" | "excel" | "pdf";

/**
 * Which fields end up in the file.
 * - `columns` — only the table's visible columns
 * - `all` — only the raw record, flattened to `parent.child` headers
 * - `both` (default) — the visible columns, then every raw field they don't cover
 */
export type TableExportFieldsType = "columns" | "all" | "both";

interface MatrixType {
  headers: string[];
  rows: string[][];
}

interface BuildMatrixParamsType<T> {
  data: T[];
  columns: TableColumnType<T>[];
  showRowNumbers?: boolean;
  rowNumberStartFrom?: number;
  fields?: TableExportFieldsType;
  /** Shorthand kept for backwards compatibility: `true` -> "all", `false` -> "columns". */
  allFields?: boolean;
}

/** Reconcile the `fields` option with the older `allFields` boolean. */
export const resolveFieldsMode = (
  fields?: TableExportFieldsType,
  allFields?: boolean
): TableExportFieldsType => {
  if (fields) return fields;
  if (allFields === true) return "all";
  if (allFields === false) return "columns";
  return "both";
};

/**
 * Matrix from the table's visible columns.
 * Keeps columns with function accessors, resolves dotted accessors, and falls
 * back to `cell` output — so no column is silently dropped from the file.
 */
const buildColumnMatrix = <T,>(
  data: T[],
  columns: TableColumnType<T>[]
): MatrixType => ({
  headers: columns.map((column) => column.header),
  rows: data.map((row, index) =>
    columns.map((column) => resolveColumnExportValue(row, column, index))
  ),
});

/** Raw-record matrix with the fields already carried by a column removed. */
const buildRemainingFieldsMatrix = <T,>(
  data: T[],
  columns: TableColumnType<T>[]
): MatrixType => {
  const covered = new Set(
    columns
      .filter((column) => typeof column.accessor === "string")
      .map((column) => column.accessor as string)
  );

  const { headers, rows } = buildAllFieldsMatrix(data);
  const keptIndexes = headers
    .map((header, index) => ({ header, index }))
    .filter(({ header }) => !covered.has(header));

  return {
    headers: keptIndexes.map(({ header }) => header),
    rows: rows.map((row) => keptIndexes.map(({ index }) => row[index])),
  };
};

/** Prefix a row-number column when `showRowNumbers` is on. */
const withRowNumbers = (
  matrix: MatrixType,
  showRowNumbers: boolean,
  startFrom: number
): MatrixType => {
  if (!showRowNumbers) return matrix;

  return {
    headers: ["#", ...matrix.headers],
    rows: matrix.rows.map((row, index) => [String(index + startFrom), ...row]),
  };
};

/** Turn table data into a headers/rows matrix according to the fields mode. */
export const buildExportMatrix = <T,>({
  data,
  columns,
  showRowNumbers = false,
  rowNumberStartFrom = 1,
  fields,
  allFields,
}: BuildMatrixParamsType<T>): MatrixType => {
  const mode = resolveFieldsMode(fields, allFields);
  const exportColumns = getExportableColumns(columns);

  if (mode === "all") {
    return withRowNumbers(
      buildAllFieldsMatrix(data),
      showRowNumbers,
      rowNumberStartFrom
    );
  }

  const columnMatrix = buildColumnMatrix(data, exportColumns);

  if (mode === "columns") {
    return withRowNumbers(columnMatrix, showRowNumbers, rowNumberStartFrom);
  }

  const extras = buildRemainingFieldsMatrix(data, exportColumns);

  return withRowNumbers(
    {
      headers: [...columnMatrix.headers, ...extras.headers],
      rows: columnMatrix.rows.map((row, index) => [
        ...row,
        ...(extras.rows[index] || []),
      ]),
    },
    showRowNumbers,
    rowNumberStartFrom
  );
};

interface ExportTableDataParamsType<T> extends BuildMatrixParamsType<T> {
  format: TableExportFormatType;
  fileName?: string;
  /** Used as the PDF heading and the Excel sheet name. */
  title?: string;
}

/**
 * Build the matrix for `data` and download it in the requested format.
 * Rejects on failure (missing optional dependency, write error) so callers can
 * surface the problem instead of the button doing nothing.
 */
export const exportTableData = async <T,>({
  format,
  fileName = "table-export",
  title,
  ...matrixParams
}: ExportTableDataParamsType<T>): Promise<void> => {
  // A PDF is a printable document, not a data dump: stick to the visible columns
  // unless the caller explicitly asked for the raw fields.
  const isImplicitMode =
    !matrixParams.fields && matrixParams.allFields === undefined;
  const fields: TableExportFieldsType =
    format === "pdf" && isImplicitMode
      ? "columns"
      : resolveFieldsMode(matrixParams.fields, matrixParams.allFields);

  const { headers, rows } = buildExportMatrix({ ...matrixParams, fields });

  if (!headers.length) {
    throw new Error("Nothing to export: no exportable fields were found.");
  }

  if (format === "excel") {
    await downloadExcel(headers, rows, fileName, title || "Sheet1");
    return;
  }

  if (format === "pdf") {
    await downloadPdf(headers, rows, fileName, title);
    return;
  }

  downloadCsv(headers, rows, fileName);
};

/**
 * Fill in file-generation defaults. Button visibility flags (csv/excel/pdf) are
 * left untouched so the caller keeps control of which buttons render.
 */
export const resolveExportOptions = (
  exportOptions?: TableExportOptionsType
): TableExportOptionsType & {
  fileName: string;
  batchSize: number;
  maxRows: number;
} => ({
  fileName: "table-export",
  batchSize: 100,
  maxRows: 5000,
  ...(exportOptions || {}),
});

import { TableColumnType, TableExportOptionsType } from "../../../../types";
import {
  buildAllFieldsMatrix,
  getExportableColumns,
  resolveColumnExportValue,
} from "./exportValues";
import { downloadCsv, downloadExcel, downloadPdf } from "./exportWriters";

export type TableExportFormatType = "csv" | "excel" | "pdf";

interface BuildMatrixParamsType<T> {
  data: T[];
  columns: TableColumnType<T>[];
  showRowNumbers?: boolean;
  rowNumberStartFrom?: number;
  /** Export every leaf field of the raw record instead of the visible columns. */
  allFields?: boolean;
}

/**
 * Turn table data into a headers/rows matrix.
 * Unlike the previous implementation this keeps columns with function accessors,
 * resolves dotted accessors, and falls back to `cell` output — so no column is
 * silently dropped from the file.
 */
export const buildExportMatrix = <T,>({
  data,
  columns,
  showRowNumbers = false,
  rowNumberStartFrom = 1,
  allFields = false,
}: BuildMatrixParamsType<T>): { headers: string[]; rows: string[][] } => {
  if (allFields) {
    const matrix = buildAllFieldsMatrix(data);

    if (!showRowNumbers) return matrix;

    return {
      headers: ["#", ...matrix.headers],
      rows: matrix.rows.map((row, index) => [
        String(index + rowNumberStartFrom),
        ...row,
      ]),
    };
  }

  const exportColumns = getExportableColumns(columns);

  const headers = [
    ...(showRowNumbers ? ["#"] : []),
    ...exportColumns.map((column) => column.header),
  ];

  const rows = data.map((row, index) => [
    ...(showRowNumbers ? [String(index + rowNumberStartFrom)] : []),
    ...exportColumns.map((column) =>
      resolveColumnExportValue(row, column, index)
    ),
  ]);

  return { headers, rows };
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
  const { headers, rows } = buildExportMatrix(matrixParams);

  if (!headers.length) {
    throw new Error("Nothing to export: no exportable columns were found.");
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

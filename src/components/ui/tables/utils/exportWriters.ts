/**
 * Browser file writers for table exports.
 * CSV is dependency-free; Excel uses `xlsx` and PDF uses `jspdf`, both loaded
 * lazily so tables that never export don't pay the bundle cost.
 */

/** Trigger a browser download for an in-memory blob. */
const downloadBlob = (blob: Blob, fileName: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Give the browser a tick to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/**
 * Escape a single CSV cell: quote when needed, double inner quotes, and
 * neutralise spreadsheet formula injection (`=`, `+`, `-`, `@` prefixes).
 */
export const escapeCsvValue = (value: string): string => {
  const text = value ?? "";
  const isNumeric = text !== "" && !Number.isNaN(Number(text));
  const safeText =
    !isNumeric && /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;

  if (/[",\n\r]/.test(safeText) || safeText !== safeText.trim()) {
    return `"${safeText.replace(/"/g, '""')}"`;
  }

  return safeText;
};

/** Build the CSV text (with UTF-8 BOM so Excel renders accents correctly). */
export const buildCsv = (headers: string[], rows: string[][]): string => {
  const lines = [
    headers.map(escapeCsvValue).join(","),
    ...rows.map((row) => row.map(escapeCsvValue).join(",")),
  ];

  return `\ufeff${lines.join("\r\n")}`;
};

export const downloadCsv = (
  headers: string[],
  rows: string[][],
  fileName: string
): void => {
  const blob = new Blob([buildCsv(headers, rows)], {
    type: "text/csv;charset=utf-8;",
  });

  downloadBlob(blob, `${fileName}.csv`);
};

/** Write a real .xlsx workbook via SheetJS. Throws if `xlsx` cannot be loaded. */
export const downloadExcel = async (
  headers: string[],
  rows: string[][],
  fileName: string,
  sheetName: string = "Sheet1"
): Promise<void> => {
  let XLSX: typeof import("xlsx");

  try {
    XLSX = await import("xlsx");
  } catch (error) {
    throw new Error(
      "Excel export requires the `xlsx` package. Install it with `npm install xlsx`."
    );
  }

  const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  // Size columns to their widest cell so the file is readable on open.
  worksheet["!cols"] = headers.map((header, columnIndex) => {
    const widest = rows.reduce(
      (max, row) => Math.max(max, (row[columnIndex] || "").length),
      header.length
    );
    return { wch: Math.min(Math.max(widest + 2, 10), 60) };
  });

  const workbook = XLSX.utils.book_new();
  // Excel rejects sheet names over 31 chars or containing []:*?/\
  const safeSheetName = sheetName.replace(/[[\]:*?/\\]/g, "").slice(0, 31) || "Sheet1";
  XLSX.utils.book_append_sheet(workbook, worksheet, safeSheetName);

  const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  downloadBlob(blob, `${fileName}.xlsx`);
};

/** Render a paginated landscape table to PDF via jsPDF. Throws if `jspdf` is missing. */
export const downloadPdf = async (
  headers: string[],
  rows: string[][],
  fileName: string,
  title?: string
): Promise<void> => {
  let jsPDFConstructor: typeof import("jspdf").jsPDF;

  try {
    const module = await import("jspdf");
    jsPDFConstructor = module.jsPDF;
  } catch (error) {
    throw new Error(
      "PDF export requires the `jspdf` package. Install it with `npm install jspdf`."
    );
  }

  const doc = new jsPDFConstructor({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  const margin = 24;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const usableWidth = pageWidth - margin * 2;
  const columnWidth = usableWidth / Math.max(headers.length, 1);
  const lineHeight = 11;
  const cellPadding = 4;

  let cursorY = margin;

  if (title) {
    doc.setFontSize(13);
    doc.text(title, margin, cursorY + 10);
    cursorY += 26;
  }

  const drawRow = (cells: string[], isHeader: boolean): void => {
    doc.setFontSize(8);
    doc.setFont("helvetica", isHeader ? "bold" : "normal");

    const wrapped = cells.map((cell) =>
      doc.splitTextToSize(cell || "", columnWidth - cellPadding * 2).slice(0, 4)
    );
    const rowHeight =
      Math.max(...wrapped.map((lines) => lines.length), 1) * lineHeight +
      cellPadding * 2;

    if (cursorY + rowHeight > pageHeight - margin) {
      doc.addPage();
      cursorY = margin;
    }

    if (isHeader) {
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, cursorY, usableWidth, rowHeight, "F");
    }

    wrapped.forEach((lines, columnIndex) => {
      doc.text(
        lines,
        margin + columnIndex * columnWidth + cellPadding,
        cursorY + cellPadding + lineHeight - 3
      );
    });

    doc.setDrawColor(210, 210, 210);
    doc.line(margin, cursorY + rowHeight, margin + usableWidth, cursorY + rowHeight);

    cursorY += rowHeight;
  };

  drawRow(headers, true);
  rows.forEach((row) => drawRow(row, false));

  doc.save(`${fileName}.pdf`);
};

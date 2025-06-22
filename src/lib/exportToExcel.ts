/* eslint-disable @typescript-eslint/no-explicit-any */
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export type Column<T> = {
  header: string;
  key: keyof T;
  width?: number;
};

export async function exportToExcel<T extends Record<string, any>>({
  fileName = 'export.xlsx',
  sheetName = 'Sheet1',
  columns,
  data,
}: {
  fileName?: string;
  sheetName?: string;
  columns: Column<T>[];
  data: T[];
}) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key as string, // ExcelJS expects string
    width: col.width ?? 20,
  }));

  data.forEach((item) => {
    const row: Record<string, any> = {};
    columns.forEach((col) => {
      const value = item[col.key];
      row[col.key as string] =
        Object.prototype.toString.call(value) === '[object Date]'
          ? (value as Date).toLocaleDateString()
          : (value ?? '');
    });
    worksheet.addRow(row);
  });

  // Style headers
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4F46E5' },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });

  // Add borders
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  saveAs(blob, fileName);
}

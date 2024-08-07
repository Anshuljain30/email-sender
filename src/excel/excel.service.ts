import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';

@Injectable()
export class ExcelService {
  async readExcel(
    filePath: string,
  ): Promise<{ name: string; email: string }[]> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.worksheets[0];
    const data = [];

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      const name = row.getCell(1).value;
      const email = row.getCell(2).value;

      data.push({ name, email });
    });

    return data;
  }
}

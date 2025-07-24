import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function ExcelExport({ data, fileName = "grn-details.xlsx" }) {
  const exportToExcel = () => {
    // Convert JSON array to worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GRN Details");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, fileName);
  };

  return (
    <button className="btn btn-secondary" onClick={exportToExcel}>
      Download GRN Excel
    </button>
  );
}

import React, { useEffect, useState } from "react";
import HeaderForm from "./HeaderForm";
import LineItemTable from "./LineItems";
import { createGrn } from "../../api/grnApi";
import * as XLSX from 'xlsx';

export default function GrnForm() {
      const [lineItems, setLineItems] = useState([]);
       const [totals, setTotals] = useState({ subtotal: 0, tax: 0, grandTotal: 0 });
       const [add, setAdd] = useState(true);
const [header, setHeader] = useState({
  grn_number: '',
    invoice_number: '',
    vendor_id: '',
    branch_id: ''
    });
  useEffect(() => {
    const sub = lineItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const tax = lineItems.reduce((sum, item) =>
      sum + ((item.quantity * item.unit_price) * (item.tax_percent / 100)), 0);
    const grand = sub + tax;
    setTotals({ subtotal: sub, tax, grandTotal: grand });
  }, [lineItems]);
const handleExcelUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (evt) => {
    const data = new Uint8Array(evt.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const wsname = workbook.SheetNames[0];
    const ws = workbook.Sheets[wsname];
    const json = XLSX.utils.sheet_to_json(ws, { header: 1 });

    // Assuming first row = headers, next rows = line item data
    const [headerRow, ...rows] = json;
    const mapped = rows.map((r) => ({
      subcategory_id: r[0],
      item_description: r[1],
      quantity: parseFloat(r[2]) || 0,
      unit_price: parseFloat(r[3]) || 0,
      tax_percent: parseFloat(r[4]) || 0,
    }));

    setLineItems(mapped);
  };

  reader.readAsArrayBuffer(file);
};

    const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...header,
       grn_date: new Date().toISOString().split('T')[0], // "YYYY-MM-DD"
      line_items: lineItems
    };
    try{
      console.log('Submitting GRN with payload:', payload);
    await createGrn(payload);
    alert("GRN submitted successfully!");
    setHeader({ invoice_number: '', vendor_id: '', branch_id: '' });
    setLineItems([]);
  }catch (err) {
      console.error('Error in GRN submission:', err);
      alert(err.response?.data?.error || err.message);
  };}
  return (
    <div>
      <h2>Goods Receipt Note Form</h2>
    <form onSubmit={handleSubmit} className="container mt-4">
      {/* <div className="mb-3">
        <label className="form-label">GRN Number</label>
        <input type="text" className="form-control" />
    </div> */}
    <HeaderForm   header={header} setHeader={setHeader} add={add} setAdd={setAdd}/>
     <div className="mb-3">
    <label className="form-label">Upload from Excel</label>
    <input
      type="file"
      accept=".xlsx, .xls"
      onChange={handleExcelUpload}
      className="form-control"
    />
    <small className="form-text text-muted">
      Use the template: Category, Description, Qty, Price, Tax%
    </small>
  </div>

    <LineItemTable lineItems={lineItems} setLineItems={setLineItems} editMode={add}/>
     <div className="mt-4">
          <p><strong>Subtotal:</strong> ₹{totals.subtotal.toFixed(2)}</p>
          <p><strong>Tax:</strong> ₹{totals.tax.toFixed(2)}</p>
          <p><strong>Grand Total:</strong> ₹{totals.grandTotal.toFixed(2)}</p>
        </div>

      <button type="submit" className="btn btn-primary mt-3">Submit</button>
      <button type="reset" className="btn btn-secondary mt-3 ms-2"   onClick={() => {
            setHeader({ grn_number: '', invoice_number: '', vendor_id: '', branch_id: '' });
            setLineItems([]);
          }}>Reset</button>
          
    </form>
    </div>
  );
}
import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate, Form } from "react-router-dom";
import { fetchGrns, updateGrn, deleteGrn } from "../../api/grnApi";
import LineItemTable from "./LineItems";
import { fetchVendors } from "../../api/vendorApi";
import { fetchBranches } from "../../api/branchApi";
import ExcelExport from "../../components/layout/excel/ExcelExport";

export default function GrnDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [grn, setGrn] = useState({ GRNLineItems: [] });
    const [editMode, setEditMode] = useState(false);
        const [totals, setTotals] = useState({ subtotal: 0, tax: 0, grandTotal: 0 });
        const [vendors, setVendors] = useState([]);
  const [branches, setBranches] = useState([]);

//   const [formState, setFormState] = useState(null);

const [form, setForm] = useState({
  grn_number: '',
  vendor_id: '',
  invoice_number: '',
  GRNLineItems: []
}); 



  useEffect(() => {
    const load = async () => {
      const all = await fetchGrns();
    const find=all.find(g => g.id === +id);
    if(find) {
      setGrn(find); 
    };}
    load();
  }, [id])
useEffect(() => {
  if (grn) {
    setForm({
      grn_number: grn.grn_number || '',
      vendor_id: grn.vendor_id || '',
      branch_id: grn.branch_id || '',
      invoice_number: grn.invoice_number || '',
      GRNLineItems: grn.GRNLineItems.map(item => ({
        ...item,
        subcategory_id: item.subcategory_id || ''
      }))
    });
  }
}, [grn]);
useEffect(() => {
  if (!grn?.GRNLineItems) return;
    const sub = grn.GRNLineItems.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const tax = grn.GRNLineItems.reduce((sum, item) =>
      sum + ((item.quantity * item.unit_price) * (item.tax_percent / 100)), 0);
    const grand = sub + tax;
    setTotals({ subtotal: sub, tax, grandTotal: grand });
  }, [grn.GRNLineItems]);
      useEffect(() => {
    fetchVendors().then(setVendors);
    fetchBranches().then(setBranches);
  }, []);


  const handleSave = async () => {
    try {
      console.log("Saving GRN:", form);
      // await updateGrn(id, form);
        await updateGrn(id, {
    ...form,
    line_items: form.GRNLineItems
  });
      alert("Successfully updated!");
      setEditMode(false);
      const refreshed = { ...grn, ...form };
      setGrn(refreshed);
    } catch (e) {
      console.error(e);
      alert("Update failed. Check console.");
    }
  };
  const handleUpdate = async () => {
    console.log("Updating GRN:", grn,id);
    await updateGrn(id, grn);
    alert("Updated!");
    nav("/grns");
  };
    const handleCancel = () => {
    setEditMode(false);
    // reset form
    setForm({
      grn_number: grn.grn_number,
      branch_id: grn.branch_id,
      vendor_id: grn.vendor_id,
      invoice_number: grn.invoice_number,
      GRNLineItems: grn.GRNLineItems.map(item => ({
        ...item,
        subcategory_id: item.subcategory_id
      }))
    });
  };


  const handleDelete = async () => {
    if (window.confirm("Delete this GRN?")) {
      await deleteGrn(id);
      alert("Deleted!");
      nav("/grns");
    }
  };
const handleback= async() =>{
nav('/grns')
}

  if (!grn) return <p>Loading...</p>;
  const exportData = form.GRNLineItems.map(item => ({
    "Subcategory": item.subcategory_id || item.subcategory?.name,
    "Description": item.item_description,
    "Quantity": item.quantity,
    "Unit Price": item.unit_price,
    "Tax %": item.tax_percent,
    "Total":
      (item.quantity * item.unit_price * (1 + item.tax_percent / 100)).toFixed(2),
  }));

  return (
    <div className="container mt-4">
      <h2>GRN Detail: {grn.grn_number}</h2>
      {/* Render your form with inputs bound to `grn` */}
    
      <div className="mb-3">
        <label className="form-label">GRN Number</label>
        <input type="text" className="form-control" value={form.grn_number || ''} readOnly />
        </div>
        <div className="mb-3">
        {/* <label className="form-label">Vendor</label>
        <input type="text" className="form-control" value={form.vendor?.
            name || form.vendor_id||''}  onChange={e => setForm(prev => ({ ...prev, vendor_id: e.target.value }))}
          disabled={!editMode}  />
        </div>
        <div className="mb-3">
        <label className="form-label">Branch</label>
        <input type="text" className="form-control" value={form.branch?.
            name || form.branch_id || ''}   onChange={e => setForm(prev => ({ ...prev, branch_id: e.target.value }))}
          disabled={!editMode}  /> */}
           <label htmlFor="vendor" className="form-label mt-3">Vendor</label>
            <select className="form-select" id="vendor"
              value={form.vendor?.
            name || form.vendor_id||''}
          onChange={e => setForm(prev => ({ ...prev, vendor_id: e.target.value }))}
          disabled={!editMode}  
          >
              <option value="">Select Vendor</option>
              {/* Map through vendors here */}
               {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
              </select>
            <label htmlFor="branch" className="form-label mt-3">Branch</label>
            <select className="form-select" id="branch" 
               value={form.branch?.name || form.branch_id || ''}
          disabled={!editMode}  

          onChange={e => setForm(prev => ({ ...prev, branch_id: e.target.value }))}
          >
                <option value="">Select Branch</option>
                 {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                {/* Map through branches here */}
            </select>
        </div>
        <div className="mb-3">
        <label className="form-label">Invoice Number</label>
        <input type="text" className="form-control" value={form.invoice_number || ''}
          onChange={e => setForm(prev => ({ ...prev, invoice_number: e.target.value }))}
          disabled={!editMode}  />
        </div>
        <LineItemTable lineItems={form.GRNLineItems} setLineItems={(items) => setForm(prev => ({ ...prev, GRNLineItems: items }))} 
        
         editMode={editMode}
          />
{/* { form.GRNLineItems && form.GRNLineItems.length > 0 && (form.GRNLineItems.map((item, idx) => (
        <div key={idx} className="mb-3">
        <div className="mt-4">
        <h5>Line Item {idx + 1}</h5>
        <label className="form-label">Sub-Category</label>   
        <input type="text" className="form-control" value={item.subcategory?.name || item.subcategory_id ||''} readOnly />
        <label className="form-label">Description</label>
        <input type="text" className="form-control" value={item.item_description||''} readOnly />
        <label className="form-label">Quantity</label>
        <input type="number" className="form-control" value={item.quantity||''} readOnly />
        <label className="form-label">Unit Price</label>    
        <input type="number" className="form-control" value={item.unit_price||''} readOnly />
        <label className="form-label">Tax %</label>
        <input type="number" className="form-control" value={item.tax_percent||''} readOnly />
        <label className="form-label">Total</label>
        <input type="number" className="form-control" value={(item.quantity * item.unit_price * (1 + item.tax_percent / 100)).toFixed(2)||'0'} readOnly />
        </div>
        </div>
      )))}   */}
          <div className="mt-4">
          <p><strong>Subtotal:</strong> ₹{totals.subtotal.toFixed(2)}</p>
          <p><strong>Tax:</strong> ₹{totals.tax.toFixed(2)}</p>
          <p><strong>Grand Total:</strong> ₹{totals.grandTotal.toFixed(2)}</p>
        </div>

{!editMode ? (
        <button className="btn btn-primary me-2" onClick={() => setEditMode(true)}>
          Edit
        </button>
      ) : (
        <>
          <button className="btn btn-success me-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-secondary me-2" onClick={handleCancel}>
            Cancel
          </button>
            <div className="mb-3">
        <ExcelExport data={exportData} fileName={`${form.grn_number}.xlsx`} />
      </div>
        </>
      )}
            
        
      {/* <button className="btn btn-primary" onClick={handleUpdate}>
        Update
      </button> */}
      <button className="btn btn-danger ms-2" onClick={handleDelete}>
        Delete
      </button>
      <button className="btn btn-secondary ms-2" onClick={handleback}>
        Back to List    
        </button>
    </div>
  );
}

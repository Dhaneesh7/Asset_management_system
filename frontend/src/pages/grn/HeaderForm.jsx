import React, { useEffect, useState } from "react";
import { fetchVendors } from "../../api/vendorApi";
import { fetchBranches } from "../../api/branchApi";
export default function HeaderForm({ header, setHeader, add, setAdd }) {
  const [vendors, setVendors] = useState([]);
  const [branches, setBranches] = useState([]);
  // const [grn_number,setGrn_number]= useState([]);
  // const [invoice_number,setInvoice_number]=useState([]);
  //   const [selectedVendor, setSelectedVendor] = useState("");
  // const [selectedBranch, setSelectedBranch] = useState("");


  useEffect(() => {
    fetchVendors().then(setVendors);
    fetchBranches().then(setBranches);
  }, []);
  // const handleHeader = () => {
  //   const payload = {
  //     grn_number,
  //     invoice_number,
  //     vendor_id: selectedVendor,
  //     branch_id: selectedBranch,
  //   };
  // }
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Header Form</h2>
      {/* Add form elements here */}

      <div className="mb-3">
        {!add && (
          <>
            <label htmlFor="GRNNumber" className="form-label">GRN Number</label>
            <input
              type="text"
              className="form-control"
              id="GRNNumber"
              value={header.grn_number}
              readOnly
            />
          </>
        )}

        {/* <label htmlFor="GRNNumber" className="form-label">GRN Number</label>
            <input type="text" className="form-control" id="GRNNumber"
            value={header.grn_number}
            disabled={add}
            // onChange={e => setHeader(prev => ({ ...prev, grn_number: e.target.value }))} 
            readOnly/> */}
        {/* <DatePicker
              selected={new Date()}
          
              className="form-control mt-2"
              dateFormat="yyyy-MM-dd"
              placeholderText="Select GRN Date"
              /> */}
        <label htmlFor="invoiceNumber" className="form-label mt-3 " >Invoice Number</label>
        <input type="text" className="form-control" id="invoiceNumber"
          value={header.invoice_number ?? ' '}
          onChange={e => setHeader(prev => ({ ...prev, invoice_number: e.target.value }))}
        />
        <label htmlFor="vendor" className="form-label mt-3">Vendor</label>
        <select className="form-select" id="vendor"
          value={header.vendor_id ?? ''}
          onChange={e => setHeader(prev => ({ ...prev, vendor_id: e.target.value }))}>
          <option value="">Select Vendor</option>
          {/* Map through vendors here */}
          {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
        </select>
        <label htmlFor="branch" className="form-label mt-3">Branch</label>
        <select className="form-select" id="branch"
          value={header.branch_id ?? ''}
          onChange={e => setHeader(prev => ({ ...prev, branch_id: e.target.value }))}>
          <option value="">Select Branch</option>
          {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
          {/* Map through branches here */}
        </select>

      </div>
      {/* <button type="submit" className="btn btn-primary" onClick={handleHeader}>Submit</button> */}

    </div>
  );
}
import React, {  useEffect, useState } from "react";
import { fetchGrns } from "../../api/grnApi";
import { useNavigate } from "react-router-dom";
import { fetchVendors } from "../../api/vendorApi";
import { fetchBranches } from "../../api/branchApi";
export default function GrnList() {
  // const vendors = useSelector(state => state.vendors);
  // const branches = useSelector(state => state.branches);
  const [vendors,setVendors]= useState([]);
const [branches,setBranches]= useState([]);
  const navigate = useNavigate();
    const [grns, setGrns] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
  const [filteredGrns, setFilteredGrns] = useState([]);
    const [error, setError] = useState(null);
  const handleview = (id,e) => {
    e.preventDefault();
    navigate(`/grn/details/${id}`);

  }
  function handlefilter  (e)  {
    e.preventDefault();
    // Implement filter logic here
      const filtered = grns.filter((grn) => {
      return (
        (selectedVendor === "" || grn.vendor_id === parseInt(selectedVendor)) &&
        (selectedBranch === "" || grn.branch_id === parseInt(selectedBranch))
      );
    });
    setFilteredGrns(filtered);
  };
  useEffect(() => {
  async function loadGrns() {
      try {
        const res = await fetchGrns();
        // if (!res.ok) throw new Error(`Error ${res.status}`);
        const Vendor=await fetchVendors();
        const Branch=await fetchBranches();
        setGrns(res);
        setFilteredGrns(res);
        setBranches(Branch);
        setVendors(Vendor);
        setError(null);
      } catch (err) {
        console.error("Error fetching GRNs:", err);
  setError(err.response?.data?.error || err.message);
      }
    }
    loadGrns();
  }, []);
    const handlecreate = () => {
    navigate('/grnform')
  };
useEffect(()=> {
 async function fetchdata(){
try {
      const res = await fetchVendors();
      setVendors(res);
    } catch (err) {
      console.error("Error fetching vendors:", err);
    }
  

    try {
      const res = await fetchBranches();
      setBranches(res);
    } catch (err) {
      console.error("Error fetching branches:", err);
    
  }}
  fetchdata();
}, []);

  return (
    <div>
      <div>  <h2>Goods Receipt Note Management</h2></div>
      {/* Add form + table CRUD here */}

        <div className="d-flex justify-content-between align-items-center mb-3 w-100">
          <div className="d-flex gap-2 w-75">
          
        <select  className="form-control w-25"
            value={selectedVendor}
            onChange={(e) => setSelectedVendor(e.target.value)} >
          <option value="">Select Vendor</option>
          {vendors.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
          {/* Map vendors here */}

        </select>
        <select  className="form-control w-25"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="">Select Branch</option>
          {branches.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
          {/* Map branches here */}
        </select>
        <button className="btn btn-primary" onClick={ handlefilter}>Filter</button>
        </div >
        <div className="text-end items-end w-25">
        <button className="btn btn-success mb-3" onClick={handlecreate}>Create new Grn</button>
        </div>
        </div>
      <div className="container mt-4">
        <h2 className="mb-4">GRN List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">GRN Number</th>
              <th scope="col">Vendor</th>
              <th scope="col">Branch</th>
              <th scope="col">Invoice Number</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through GRN data here */}
            {/* Example row */}
                {filteredGrns.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No GRNs found</td>
              </tr>
            ) : (
              filteredGrns.map(grn => (
                <tr key={grn.id}>
                  <td>{grn.grn_number}</td>
                  <td>
  {vendors.find(v => v.id === grn.vendor_id)?.name || grn.vendor_id}
</td>
<td>
  {branches.find(b => b.id === grn.branch_id)?.name || grn.branch_id}
 </td>
                  {/* <td>{grn.vendor?.name || grn.vendor_id}</td>
                  <td>{grn.branch?.name || grn.branch_id}</td> */} 
                  <td>{grn.invoice_number}</td>
                  <td>
                    {/* Example actions: View / Edit */}
                    <button className="btn btn-sm btn-outline-primary" 
                    onClick={(e) => handleview(grn.id, e)}
                    >View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
          </table>
    </div>
    </div>
  );
}
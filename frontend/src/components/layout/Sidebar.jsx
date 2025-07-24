import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const navigate = useNavigate();

  const handleTransactionChange = (e) => {
    const path = e.target.value;
    if (path) navigate(path);
  };

  return (
    <div className="bg-light border-end" style={{ minHeight: '100vh', width: '220px' }}>
      <div className="list-group list-group-flush">
        <NavLink to="/" className="list-group-item list-group-item-action">Home</NavLink>
        <NavLink to="/assets" className="list-group-item list-group-item-action">Assets</NavLink>
        <NavLink to="/vendors" className="list-group-item list-group-item-action">Vendors</NavLink>
         
        <NavLink to="/branches" className="list-group-item list-group-item-action">Branches</NavLink>
        <NavLink to="/manufacturers" className="list-group-item list-group-item-action">Manufacturers</NavLink><br/>
         <div className="mt-3 px-3">
          <label className="form-label fw-bold">Transactions</label>
          <select className="form-select" onChange={handleTransactionChange}>
            <option value="">Transaction</option>
            <option value="/grns">GRNs</option>
            <option value="/grnform">GRN Form</option>
          </select>
        </div>
        {/* <div  >  <h5 style={{marginLeft:'10px'}}>Transaction</h5>  */}
        {/* <NavLink to="/grns" className="list-group-item list-group-item-action">GRNs</NavLink>
        <NavLink to="/grnform" className="list-group-item list-group-item-action">GRN Form</NavLink> */}
    </div>
      </div>
    
  );
}

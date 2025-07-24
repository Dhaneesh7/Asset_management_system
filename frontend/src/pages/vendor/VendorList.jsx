import React, { useEffect, useState } from 'react';
import { createVendor, fetchVendors,deleteVendor, updateVendor} from '../../api/vendorApi'; // returns array

export default function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [address, setAddress] = useState('');
const [contactPerson, setContactPerson] = useState('');
const [gst_number, setGst_number] = useState('');
const [editingId, setEditingId] = useState(null);


const handleSubmit = async () => {
  const vendorData = { name, email, contact_person: contactPerson, phone, address, gst_number };
  if (editingId) {
    const updated = await updateVendor(editingId, vendorData);
    setVendors(vendors.map(v => v.id === editingId ? updated : v));
  } else {
    const added = await createVendor(vendorData);
    setVendors([...vendors, added]);
  }
  resetForm();
};
const handleDelete = async (id) => {
  if (!window.confirm('Delete this vendor?')) return;
  await deleteVendor(id);
  setVendors(vendors.filter(v => v.id !== id));
};


const handlevendor = async () => {
 try{  const newVendor = { name, email, contact_person: contactPerson , phone, address, gst_number };
    const added = await createVendor(newVendor);
    setVendors([...vendors, added]); // Append new vendor to the list
    setName('');
    setEmail('');
    setContactPerson('');
  } catch (err) {
    console.error('Error adding vendor:', err);
    alert(err.response?.data?.error || err.message);
  }};

  useEffect(() => {
    async function loadVendors() {
      try {
        const data = await fetchVendors(); // JSON array
        console.log('Fetched vendors:', data, Array.isArray(data)); // debugging line
        setVendors(data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    loadVendors();
  }, []);
  const startEdit = (vendor) => {
  setEditingId(vendor.id);
  setName(vendor.name);
  setEmail(vendor.email);
  setContactPerson(vendor.contact_person);
  setPhone(vendor.phone);
  setAddress(vendor.address);
  setGst_number(vendor.gst_number);
};
const resetForm = () => {
  setName(''); setEmail(''); setContactPerson('');
  setPhone(''); setAddress(''); setGst_number('');
  setEditingId(null);
};


  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Vendors</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Contact Person</th><th>Phone</th><th>Address</th><th>GST Number</th><th>actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.length === 0
            ? <tr><td colSpan="4">No vendors found</td></tr>
            : vendors.map(v => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  <td>{v.contact_person}</td>
                  <td>{v.phone}</td>
                  <td>{v.address}</td>
                  <td>{v.gst_number}</td>
         <td>
          <div class="d-grid gap-2">
      <button className='btn btn-primary btn-block w-100' onClick={() => startEdit(v)}>Edit</button>
      <button className='btn btn-primary btn-block w-100' onClick={() => handleDelete(v.id)}>Delete</button>
      </div>
    </td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <div className="mt-3 row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={e=>setName(e.target.value)}/>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email}  onChange={e => setEmail(e.target.value)}/>
        </div>
          <div className="col-md-6 mb-3">
          <label className="form-label">contact_person</label>
          <input type="text" className="form-control" value={contactPerson}  onChange={e => setContactPerson(e.target.value)}/>
        </div>
           <div className="col-md-6 mb-3">
          <label className="form-label">phone</label>
          <input type="tel" className="form-control" value={phone}  onChange={e => setPhone(e.target.value)}/>
        </div>
          <div className="col-md-6 mb-3">
          <label className="form-label">address</label>
          <input type="text" className="form-control" value={address}  onChange={e => setAddress(e.target.value)}/>
        </div>
            <div className="col-md-6 mb-3">
          <label className="form-label">gst_number</label>
          <input type="text" className="form-control" value={gst_number}  onChange={e => setGst_number(e.target.value)}/>
        </div>
        {/* <button className="btn btn-primary"onClick={handlevendor}>Add Vendor</button> */}
        <button className="btn btn-primary" onClick={handleSubmit}>
  {editingId ? 'Update Vendor' : 'Add Vendor'}
</button>

        </div>
    </div>
  );
}

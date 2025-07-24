import React, { useState, useEffect } from 'react';
import { fetchManufacturers, createManufacturer ,updateManufacturer,deleteManufacturer} from '../../api/manufacturerApi';

export default function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    async function loadList() {
      try {
        const list = await fetchManufacturers();
        setManufacturers(list);
      } catch (err) {
        console.error('Error loading manufacturers:', err);
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    }
    loadList();
  }, []);
  const startEdit = (mfr) => {
    setEditingId(mfr.id);
    setName(mfr.name);
    setDescription(mfr.description);
  };
  // const handleAdd = async () => {
  //   try {
  //     const newItem = { name, description };
  //     const added = await createManufacturer(newItem);
  //     setManufacturers(prev => [...prev, added]);
  //     setName('');
  //     setDescription('');
  //   } catch (err) {
  //     console.error('Error adding manufacturer:', err);
  //     alert(err.response?.data?.error || err.message);
  //   }
  // };
    // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this manufacturer?')) return;
    await deleteManufacturer(id);
    setManufacturers((prev) => prev.filter((m) => m.id !== id));
    if (editingId === id) resetForm();
  };
    const resetForm = () => {
    setName('');
    setDescription('');
    setEditingId(null);
  };
  const handleSubmit = async () => {
    const payload = { name, description };

    try {
      if (editingId) {
        const updated = await updateManufacturer(editingId, payload);
        setManufacturers((prev) =>
          prev.map((m) => (m.id === editingId ? updated : m))
        );
      } else {
        const added = await createManufacturer(payload);
        setManufacturers((prev) => [...prev, added]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || err.message);
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Manufacturers</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.length === 0 ? (
            <tr><td colSpan="3">No manufacturers found</td></tr>
          ) : (
            manufacturers.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.name}</td>
                <td>{m.description}</td>
                   <td>
          <div class="d-grid gap-2">
      <button className='btn btn-primary btn-block w-100' onClick={() => startEdit(m)}>Edit</button>
      <button className='btn btn-primary btn-block w-100' onClick={() => handleDelete(m.id)}>Delete</button>
      </div>
    </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="row g-3 align-items-end mt-3">
        <div className="col-md-5">
          <label>Name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-control"
            placeholder="Manufacturer name"
          />
        </div>
        <div className="col-md-5">
          <label>Description</label>
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="form-control"
            placeholder="Short description"
          />
        </div>
        <div className="col-md-2">
            <button
            className="btn btn-success w-100"
            onClick={handleSubmit}
          >
            {editingId ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

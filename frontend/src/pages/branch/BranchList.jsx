import React, { useState, useEffect } from 'react';
import { fetchBranches, createBranch ,updateBranch,deleteBranch} from '../../api/branchApi';

export default function BranchList() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('active');
const [editingId, setEditingId] = useState(null);
  useEffect(() => {
    async function load() {
      try {
        const data = await fetchBranches();
        setBranches(data);
      } catch (err) {
        console.error('Error loading branches:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);
    const startEdit = (b) => {
    setEditingId(b.id);
    setName(b.name);
    setLocation(b.location);
    setCode(b.code);
    setStatus(b.status);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setLocation('');
    setCode('');
    setStatus('active');
  };

const handleSubmit = async () => {
    const payload = { name, location, code, status };

    try {
      if (editingId) {
        const updated = await updateBranch(editingId, payload);
        setBranches(prev =>
          prev.map(b => (b.id === editingId ? updated : b))
        );
      } else {
        const added = await createBranch(payload);
        setBranches(prev => [...prev, added]);
      }
      resetForm();
    } catch (err) {
      console.error('Error saving branch:', err);
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this branch?')) return;
    await deleteBranch(id);
    setBranches(prev => prev.filter(b => b.id !== id));
    if (editingId === id) resetForm();
  };


  if (loading) return <p>Loading branches...</p>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Branches</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Location</th><th>Code</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!branches.length
            ? <tr><td colSpan="5">No branches found</td></tr>
            : branches.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.name}</td>
                <td>{b.location}</td>
                <td>{b.code}</td>
                <td>{b.status}</td>
                          <td>
                  <div className="d-grid gap-2 d-md-flex">
                    <button
                      className="btn btn-sm btn-primary me-md-2"
                      onClick={() => startEdit(b)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(b.id)}
                    >
                      Delete
                    </button>
                  </div>
                  </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="row g-3 align-items-end">
        <div className="col-md-3">
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="form-control" />
        </div>
        <div className="col-md-3">
          <label>Location</label>
          <input value={location} onChange={e => setLocation(e.target.value)} className="form-control" />
        </div>
        <div className="col-md-2">
          <label>Code</label>
          <input value={code} onChange={e => setCode(e.target.value)} className="form-control" />
        </div>
        <div className="col-md-2">
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="form-select">
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
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

import { useEffect, useState } from "react";
import { fetchAssetCategories ,updateAssetCategory,deleteAssetCategory,createAssetCategory} from "../../api/assetcategoryApi";

export default function AssetCategory() {
 
    const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchAssetCategories();
        setCategories(data);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const startEdit = (category) => {
    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description);
    setStatus(category.status);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setStatus('active');
  };

  const handleSubmit = async () => {
    const payload = { name, description, status };

    try {
      if (editingId) {
        const updated = await updateAssetCategory(editingId, payload);
        setCategories(prev =>
          prev.map(c => (c.id === editingId ? updated : c))
        );
      } else {
        const added = await createAssetCategory(payload);
        setCategories(prev => [...prev, added]);
      }
      resetForm();
    } catch (err) {
      console.error('Error saving category:', err);
      alert(err.response?.data?.error || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    await deleteAssetCategory(id);
    setCategories(prev => prev.filter(c => c.id !== id));
    if (editingId === id) resetForm();
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Asset Categories</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Description</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!categories.length
            ? <tr><td colSpan="5">No categories found</td></tr>
            : categories.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>{c.status}</td>
                <td>
                  <div className="d-grid gap-2 d-md-flex">
                    <button
                      className="btn btn-sm btn-primary me-md-2"
                      onClick={() => startEdit(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(c.id)}
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
        <div className="col-md-4">
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} className="form-control" />
        </div>
        <div className="col-md-4">
          <label>Description</label>
          <input value={description} onChange={e => setDescription(e.target.value)} className="form-control" />
        </div>
        <div className="col-md-2">
          <label>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} className="form-select">
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-success w-100" onClick={handleSubmit}>
            {editingId ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
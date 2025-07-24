import React, { useEffect, useState } from 'react';
import { fetchSubcategories } from '../../api/assetcategoryApi';
export default function LineItemTable({ lineItems, setLineItems,editMode }) {
  const [subcategories, setSubcategories] = useState([]);
  useEffect(() => {
    fetchSubcategories().then(setSubcategories);
    
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...lineItems];
    updated[index][field] = field.includes('quantity') || field.includes('unit_price') || field === 'tax_percent'
      ? parseFloat(value) || 0
      : value;
    setLineItems(updated);
  };

  const addRow = () => {
    setLineItems([...lineItems, {
      subcategory_id: '', item_description: '',
      quantity: 1, unit_price: 0, tax_percent: 0
    }]);
  };

  const removeRow = (index) => {
    const updated = [...lineItems];
    updated.splice(index, 1);
    setLineItems(updated);
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between mb-2">
        <h5>Line Items</h5>
        <button type="button" className="btn btn-sm btn-outline-primary" onClick={addRow}
        disabled={!editMode}
        >+ Add Row</button>
      </div>
      <table className="table table-bordered table-sm">
        <thead className="table-light">
          <tr>
            <th>#</th><th>Sub-Category</th><th>Description</th>
            <th>Qty</th><th>Unit Price</th><th>Tax %</th>
            <th>Taxable</th><th>Total</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item, idx) => {
            const taxable = item.quantity * item.unit_price;
            const total = taxable + (taxable * item.tax_percent / 100);
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>
                  {/* <input className="form-control" placeholder="Subcategory ID"
                  value={item.subcategory_id}
                  onChange={e => handleChange(idx, 'subcategory_id', e.target.value)} /> */}
                  <select className="form-select"
                    value={item.subcategory_id}
                    onChange={e => handleChange(idx, 'subcategory_id', e.target.value)}
                    disabled={!editMode}>
                    <option value="">Select Sub-Category</option>
                     {subcategories.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>     ))}
                    {/* Map through subcategories here */}
                    {/* Example options, replace with actual data */}
                    </select>
                  </td>
                <td><input className="form-control"
                  value={item.item_description}
                  onChange={e => handleChange(idx, 'item_description', e.target.value)}
                  disabled={!editMode}
                   /></td>
                <td><input type="number" className="form-control"
                  value={item.quantity}
                  onChange={e => handleChange(idx, 'quantity', e.target.value)}
                  disabled={!editMode}
                   /></td>
                <td><input type="number" className="form-control"
                  value={item.unit_price}
                  onChange={e => handleChange(idx, 'unit_price', e.target.value)}
                  disabled={!editMode}
                  /></td>
                <td><input type="number" className="form-control"
                  value={item.tax_percent}
                  onChange={e => handleChange(idx, 'tax_percent', e.target.value)} 
                  disabled={!editMode}
                  /></td>
                <td>{taxable.toFixed(2)}</td>
                <td>{total.toFixed(2)}</td>
                <td>
                  <button type="button" className="btn btn-sm btn-danger" onClick={() => removeRow(idx)} disabled={!editMode}>🗑️</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

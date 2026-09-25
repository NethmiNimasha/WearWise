import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addClothing } from '../services/clothingService';

const ClothingForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tops',
    color: '',
    style: 'Casual',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addClothing(formData);
      navigate('/wardrobe');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="form-group">
        <label className="form-label">Item Name</label>
        <input required type="text" className="form-control" placeholder="e.g. Vintage Denim Jacket" 
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="form-group mb-0">
          <label className="form-label">Category</label>
          <select className="form-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="Tops">Tops</option>
            <option value="Bottoms">Bottoms</option>
            <option value="Dresses">Dresses</option>
            <option value="Outerwear">Outerwear</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
        <div className="form-group mb-0">
          <label className="form-label">Color</label>
          <input required type="text" className="form-control" placeholder="e.g. Navy Blue" 
            value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="form-group mb-0">
          <label className="form-label">Style</label>
          <select className="form-control" value={formData.style} onChange={e => setFormData({...formData, style: e.target.value})}>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Business">Business</option>
            <option value="Sport">Sport</option>
            <option value="Party">Party</option>
          </select>
        </div>
        <div className="form-group mb-0">
          <label className="form-label">Image URL</label>
          <input type="text" className="form-control" placeholder="https://..." 
            value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-full mt-6" disabled={loading}>
        {loading ? 'Adding...' : 'Add to Wardrobe'}
      </button>
    </form>
  );
};

export default ClothingForm;

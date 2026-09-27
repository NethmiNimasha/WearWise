import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWardrobe, deleteClothing } from '../services/clothingService';
import { Clothing } from '../types/Clothing';
import ClothingCard from '../components/ClothingCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiPlus } from 'react-icons/fi';

const Wardrobe: React.FC = () => {
  const [clothes, setClothes] = useState<Clothing[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteClothing(id);
        setClothes(clothes.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting clothing:', error);
      }
    }
  };

  useEffect(() => {
    const fetchWardrobe = async () => {
      try {
        const data = await getWardrobe();
        setClothes(data);
      } catch (error) {
        console.error('Error fetching wardrobe:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWardrobe();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wardrobe</h1>
          <p className="text-text-secondary">You have {clothes.length} items in your closet.</p>
        </div>
        <Link to="/add-clothing" className="btn btn-primary">
          <FiPlus /> Add Item
        </Link>
      </div>

      {clothes.length === 0 ? (
        <div className="glass p-12 text-center rounded-2xl flex flex-col items-center">
          <div className="text-6xl mb-4">👕</div>
          <h3 className="text-2xl font-semibold mb-2">Your wardrobe is empty!</h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">Start by adding your favorite clothes so our AI can help you plan amazing outfits.</p>
          <Link to="/add-clothing" className="btn btn-primary">Add Your First Item</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clothes.map(item => (
            <ClothingCard key={item.id} clothing={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wardrobe;

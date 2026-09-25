import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClothingForm from '../components/ClothingForm';
import { FiArrowLeft } from 'react-icons/fi';

const AddClothing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in max-w-2xl mx-auto">
      <button onClick={() => navigate('/wardrobe')} className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-8">
        <FiArrowLeft /> Back to Wardrobe
      </button>
      
      <div className="glass p-8 rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">Add New Item</h1>
        <p className="text-text-secondary mb-8">Add details about your clothing piece to help AI make better recommendations.</p>
        
        <ClothingForm />
      </div>
    </div>
  );
};

export default AddClothing;

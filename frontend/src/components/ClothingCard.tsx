import React from 'react';
import { Clothing } from '../types/Clothing';
import { FiTrash2 } from 'react-icons/fi';

interface Props {
  clothing: Clothing;
  onDelete?: (id: number) => void;
}

const ClothingCard: React.FC<Props> = ({ clothing, onDelete }) => {
  return (
    <div className="glass-card overflow-hidden relative">
      <div className="h-48 w-full bg-bg-tertiary relative">
        {clothing.imageUrl ? (
          <img src={clothing.imageUrl} alt={clothing.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-secondary">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 bg-bg-primary bg-opacity-70 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
          {clothing.category}
        </div>
        {onDelete && (
          <button 
            onClick={() => onDelete(clothing.id)}
            className="absolute bottom-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors z-10"
            title="Delete item"
          >
            <FiTrash2 size={16} />
          </button>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 truncate">{clothing.name}</h3>
        <div className="flex flex-wrap gap-2 text-sm text-text-secondary">
          <span className="bg-bg-tertiary px-2 py-1 rounded">{clothing.color}</span>
          <span className="bg-bg-tertiary px-2 py-1 rounded">{clothing.style}</span>
        </div>
      </div>
    </div>
  );
};

export default ClothingCard;

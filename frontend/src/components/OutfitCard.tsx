import React from 'react';
import { Outfit } from '../types/Outfit';
import { FiSun, FiCalendar } from 'react-icons/fi';

interface Props {
  outfit: Outfit;
}

const OutfitCard: React.FC<Props> = ({ outfit }) => {
  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-accent-primary mb-1">Recommended Outfit</h3>
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <span className="flex items-center gap-1"><FiCalendar /> {outfit.occasion}</span>
            <span className="flex items-center gap-1"><FiSun /> {outfit.weather}</span>
          </div>
        </div>
        <span className="px-3 py-1 bg-accent-secondary bg-opacity-20 text-accent-secondary rounded-full text-xs font-semibold">
          {outfit.style}
        </span>
      </div>
      <div className="bg-bg-tertiary bg-opacity-50 p-4 rounded-xl mt-4">
        <p className="text-text-primary leading-relaxed whitespace-pre-wrap">{outfit.recommendation}</p>
      </div>
    </div>
  );
};

export default OutfitCard;

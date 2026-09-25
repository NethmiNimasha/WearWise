import React, { useState, useEffect } from 'react';
import { generateOutfit, getOutfits } from '../services/outfitService';
import { Outfit } from '../types/Outfit';
import OutfitCard from '../components/OutfitCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { BiStar } from 'react-icons/bi';

const OutfitPlanner: React.FC = () => {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [formData, setFormData] = useState({ occasion: '', weather: '', style: '' });

  useEffect(() => {
    const fetchOutfits = async () => {
      try {
        const data = await getOutfits();
        setOutfits(data.reverse()); // Show newest first
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOutfits();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    try {
      const newOutfit = await generateOutfit(formData);
      setOutfits([newOutfit, ...outfits]);
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="glass p-6 rounded-2xl sticky top-28">
          <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <BiStar className="text-accent-primary" /> Ask AI Stylist
          </h2>
          <p className="text-text-secondary mb-6 text-sm">Tell us about your day and we'll pick the perfect outfit from your wardrobe.</p>
          
          <form onSubmit={handleGenerate}>
            <div className="form-group">
              <label className="form-label">Occasion</label>
              <input required type="text" className="form-control" placeholder="e.g. Office meeting, Date night" 
                value={formData.occasion} onChange={e => setFormData({...formData, occasion: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Weather</label>
              <input required type="text" className="form-control" placeholder="e.g. Sunny and warm" 
                value={formData.weather} onChange={e => setFormData({...formData, weather: e.target.value})} />
            </div>
            <div className="form-group">
              <label className="form-label">Preferred Style</label>
              <select className="form-control" value={formData.style} onChange={e => setFormData({...formData, style: e.target.value})}>
                <option value="">Any Style</option>
                <option value="Casual">Casual</option>
                <option value="Business Casual">Business Casual</option>
                <option value="Formal">Formal</option>
                <option value="Streetwear">Streetwear</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full mt-4" disabled={generating}>
              {generating ? 'Generating Magic...' : 'Generate Outfit'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold mb-6">Recent Recommendations</h2>
        {outfits.length === 0 ? (
          <div className="glass-card p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-bg-tertiary flex items-center justify-center mb-4 text-2xl">✨</div>
            <p className="text-lg font-medium">No outfits generated yet.</p>
            <p className="text-text-secondary">Use the AI Stylist panel to create your first outfit!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {outfits.map(outfit => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitPlanner;

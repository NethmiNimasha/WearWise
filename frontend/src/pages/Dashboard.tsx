import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BiStar, BiCloset } from 'react-icons/bi';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Hello, <span className="gradient-text">{user?.name}</span> 👋</h1>
        <p className="text-text-secondary text-lg">What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <Link to="/planner" className="glass-card p-8 flex flex-col items-center text-center group cursor-pointer no-underline text-text-primary">
          <div className="w-20 h-20 rounded-full bg-accent-primary bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BiStar size={40} className="text-accent-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3">AI Outfit Planner</h2>
          <p className="text-text-secondary">Get personalized outfit recommendations based on occasion and weather.</p>
        </Link>

        <Link to="/wardrobe" className="glass-card p-8 flex flex-col items-center text-center group cursor-pointer no-underline text-text-primary">
          <div className="w-20 h-20 rounded-full bg-accent-secondary bg-opacity-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BiCloset size={40} className="text-accent-secondary" />
          </div>
          <h2 className="text-2xl font-bold mb-3">My Wardrobe</h2>
          <p className="text-text-secondary">Manage your clothing items, add new pieces, and organize your closet.</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

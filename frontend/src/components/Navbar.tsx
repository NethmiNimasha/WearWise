import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser } from 'react-icons/fi';
import { BiCloset } from 'react-icons/bi';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass' : 'bg-transparent'} py-4`}>
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <BiCloset size={32} className="text-accent-primary" />
          <span className="text-2xl font-bold gradient-text">WearWise</span>
        </Link>
        
        {user ? (
          <nav className="flex items-center gap-6">
            <Link to="/wardrobe" className={`hover:text-accent-primary transition-colors ${location.pathname === '/wardrobe' ? 'text-accent-primary' : ''}`}>Wardrobe</Link>
            <Link to="/planner" className={`hover:text-accent-primary transition-colors ${location.pathname === '/planner' ? 'text-accent-primary' : ''}`}>AI Planner</Link>
            <div className="flex items-center gap-4 border-l border-border-color pl-6 ml-2">
              <span className="text-text-secondary flex items-center gap-2">
                <FiUser /> {user.name}
              </span>
              <button onClick={handleLogout} className="text-text-secondary hover:text-error transition-colors" title="Logout">
                Logout
              </button>
            </div>
          </nav>
        ) : (
          <nav className="flex items-center gap-4">
            <Link to="/login" className="btn btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;

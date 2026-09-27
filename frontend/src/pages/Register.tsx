import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { register } from '../services/authService';
import { BiCloset } from 'react-icons/bi';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginState } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await register({ name, email, password });
      loginState(data.user, data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="glass p-8 rounded-2xl w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <BiCloset size={48} className="text-accent-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-text-secondary">Start styling with AI today</p>
        </div>
        
        {error && <div className="bg-error bg-opacity-20 text-text-primary p-3 rounded-lg mb-6 text-sm text-center font-medium">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" required className="form-control" placeholder="John Doe" 
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" required className="form-control" placeholder="you@example.com" 
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" required className="form-control" placeholder="••••••••" 
              value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-text-secondary">
          Already have an account? <Link to="/login" className="text-accent-primary hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Wardrobe from './pages/Wardrobe';
import AddClothing from './pages/AddClothing';
import OutfitPlanner from './pages/OutfitPlanner';
import { useAuth } from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;
  
  return <>{children}</>;
}

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="page-wrapper container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/wardrobe" element={<ProtectedRoute><Wardrobe /></ProtectedRoute>} />
          <Route path="/add-clothing" element={<ProtectedRoute><AddClothing /></ProtectedRoute>} />
          <Route path="/planner" element={<ProtectedRoute><OutfitPlanner /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

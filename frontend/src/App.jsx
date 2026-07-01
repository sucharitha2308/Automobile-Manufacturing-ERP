import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Suppliers from './pages/Suppliers';
import Procurement from './pages/Procurement';
import Materials from './pages/Materials';
import Warehouse from './pages/Warehouse';
import Inventory from './pages/Inventory';
import BOM from './pages/BOM';
import Production from './pages/Production';
import Sales from './pages/Sales';
import Reports from './pages/Reports';
import MainLayout from './layouts/MainLayout';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes wrapped in MainLayout */}
            <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="procurement" element={<Procurement />} />
              <Route path="materials" element={<Materials />} />
              <Route path="warehouse" element={<Warehouse />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="bom" element={<BOM />} />
              <Route path="production" element={<Production />} />
              <Route path="sales" element={<Sales />} />
              <Route path="reports" element={<Reports />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

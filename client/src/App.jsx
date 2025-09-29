import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Header from './components/Header';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import OrderStatusPage from './pages/OrderStatusPage';
import CartPage from './pages/CartPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route path="/history" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><OrderStatusPage /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
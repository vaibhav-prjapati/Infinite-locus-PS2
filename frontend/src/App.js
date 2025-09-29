// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ background: '#f0f0f0', padding: '10px', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Menu</Link>
          <Link to="/history">Order History</Link>
        </nav>
        <div style={{ padding: '0 20px' }}>
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/order/:orderId" element={<OrderPage />} />
            <Route path="/history" element={<OrderHistoryPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
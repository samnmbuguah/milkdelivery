import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import AdminOrders from './components/AdminOrders';
import './index.css';

function Hero() {
  return (
    <section className="w-full bg-black text-white py-8 px-4 flex flex-col items-center mb-4">
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 flex items-center gap-2">
        <span role="img" aria-label="milk">🥛</span> FreshDairy Delivery
      </h2>
      <p className="text-white text-base md:text-xl lg:text-2xl max-w-4xl text-center">
        Pure. Local. Delivered Fresh Daily. Kenya's #1 trusted milk delivery service. Fast, affordable, and always fresh!
      </p>
    </section>
  );
}

const App: React.FC = () => {
  // Show hero only on home page
  const location = window.location.pathname;
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <header className="bg-black shadow-md py-4 px-6 flex flex-col items-center">
          <nav className="flex gap-6 w-full justify-center">
            <Link to="/" className="text-white font-semibold hover:underline">Order</Link>
            <Link to="/admin" className="text-white font-semibold hover:underline">Admin</Link>
          </nav>
        </header>
        {location === '/' && <Hero />}
        <main className="flex-1 flex flex-col items-center justify-start py-8 px-4 md:px-8 lg:px-16">
          <div className="w-full max-w-6xl bg-gray-900 text-white rounded-xl shadow-lg p-6 md:p-8 lg:p-12 mx-auto">
            <Routes>
              <Route path="/" element={<OrderForm />} />
              <Route path="/admin" element={<AdminOrders />} />
            </Routes>
          </div>
        </main>
        <footer className="text-center text-xs text-white py-4 opacity-70">
          &copy; {new Date().getFullYear()} FreshDairy Delivery. All rights reserved.
        </footer>
      </div>
    </Router>
  );
};

export default App;

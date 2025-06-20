import React, { useState } from 'react';
import type { OrderCreate } from '../types/order';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useGeolocation } from '../hooks/useGeolocation';
import { createOrder } from '../api/ordersApi';
import OrderSummary from './OrderSummary';
import Toast from './Toast';

const DELIVERY_FEE = 50;
const MILK_PRICE = 70;

const defaultUser = { name: '', phone: '', address: '' };

const OrderForm: React.FC = () => {
  const [user, setUser] = useLocalStorage('milk_user', defaultUser);
  const [liters, setLiters] = useState<number>(1);
  const [showSummary, setShowSummary] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useGeolocation();

  const total = liters * MILK_PRICE + DELIVERY_FEE;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLiters = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLiters(Number(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const order: OrderCreate = {
        ...user,
        liters,
        latitude: location.latitude || undefined,
        longitude: location.longitude || undefined,
      };
      await createOrder(order);
      setOrderSuccess(true);
      setShowSummary(false);
    } catch {
      alert('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] md:items-start md:justify-start md:h-auto">
      <div className="bg-gray-900 shadow-md rounded-xl p-6 w-full max-w-lg mx-auto md:w-3/4 lg:w-1/2">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Order Fresh Milk</h2>

        {/* Price Display */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="text-center">
            <p className="text-white text-lg font-semibold">Milk Price: {MILK_PRICE} sh per liter</p>
            <p className="text-gray-300 text-sm">Delivery Fee: {DELIVERY_FEE} sh</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-white font-medium mb-1">Name</label>
            <input name="name" placeholder="Name" value={user.name} onChange={handleChange} required className="w-full border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-800 text-white" />
          </div>
          <div>
            <label className="block text-white font-medium mb-1">Phone</label>
            <input name="phone" placeholder="Phone" value={user.phone} onChange={handleChange} required className="w-full border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-800 text-white" />
          </div>
          <div>
            <label className="block text-white font-medium mb-1">Address</label>
            <div className="relative">
              <input
                name="address"
                placeholder="Address/Use Current Location"
                value={user.address}
                onChange={handleChange}
                required
                className="w-full border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-800 text-white pr-12"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white rounded-full p-2 hover:bg-gray-800 transition border border-gray-700 w-8 h-8 flex items-center justify-center"
                title="Use Current Location"
                aria-label="Use Current Location"
                onClick={() => {
                  if (location.latitude && location.longitude) {
                    setUser({ ...user, address: `Lat: ${location.latitude}, Lng: ${location.longitude}` });
                  }
                }}
              >
                📍
              </button>
            </div>
          </div>
          <div>
            <label className="block text-white font-medium mb-1">Liters</label>
            <input type="number" min={1} name="liters" placeholder="Liters" value={liters} onChange={handleLiters} required className="w-full border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 bg-gray-800 text-white" />
          </div>
          <button
            type="submit"
            className="bg-black text-white rounded px-3 py-2 font-bold hover:bg-gray-800 transition border border-gray-700"
          >
            Next
          </button>
        </form>
        {showSummary && (
          <OrderSummary
            name={user.name}
            phone={user.phone}
            address={user.address}
            liters={liters}
            total={total}
            onConfirm={handleConfirm}
            onCancel={() => setShowSummary(false)}
            loading={loading}
          />
        )}
        <Toast show={orderSuccess} message="Order placed successfully!" onClose={() => setOrderSuccess(false)} />
      </div>
    </div>
  );
};

export default OrderForm; 
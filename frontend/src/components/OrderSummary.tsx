import React from 'react';

interface Props {
  name: string;
  phone: string;
  address: string;
  liters: number;
  total: number;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const OrderSummary: React.FC<Props> = ({ name, phone, address, liters, total, onConfirm, onCancel, loading }) => (
  <div className="border border-gray-700 rounded-lg p-6 mt-6 bg-gray-800 shadow-md">
    <h3 className="text-xl font-bold text-white mb-4 text-center">Confirm Your Order</h3>
    <div className="space-y-2 text-white">
      <p><b>Name:</b> {name}</p>
      <p><b>Phone:</b> {phone}</p>
      <p><b>Address:</b> {address}</p>
      <p><b>Liters:</b> {liters}</p>
      <p><b>Total:</b> <span className="text-lg font-bold text-green-400">{total} sh</span></p>
    </div>
    <div className="flex gap-4 mt-6 justify-center">
      <button onClick={onConfirm} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition disabled:opacity-60">
        {loading ? 'Placing...' : 'Confirm'}
      </button>
      <button onClick={onCancel} className="bg-gray-600 text-white px-4 py-2 rounded font-semibold hover:bg-gray-700 transition">
        Cancel
      </button>
    </div>
  </div>
);

export default OrderSummary; 
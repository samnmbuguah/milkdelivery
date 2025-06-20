import React, { useEffect, useRef } from 'react';

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

const OrderSummary: React.FC<Props> = ({ name, phone, address, liters, total, onConfirm, onCancel, loading }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  // Trap focus inside modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onCancel}>
      <div
        className="border border-gray-700 rounded-lg p-6 bg-gray-800 shadow-2xl w-full max-w-md mx-auto md:w-3/4 lg:w-1/2 relative"
        onClick={e => e.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-summary-title"
      >
        <h3 id="order-summary-title" className="text-xl font-bold text-white mb-4 text-center">Confirm Your Order</h3>
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
    </div>
  );
};

export default OrderSummary; 
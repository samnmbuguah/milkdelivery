import React, { useState } from 'react';
import { useOrders } from '../hooks/useOrders';
import { updateOrderStatus } from '../api/ordersApi';

const AdminOrders: React.FC = () => {
    const { orders, loading, error, refetch } = useOrders();
    const [updatingOrder, setUpdatingOrder] = useState<number | null>(null);

    const handleAddressClick = (address: string, latitude?: number, longitude?: number) => {
        let url: string;

        if (latitude && longitude) {
            // If we have coordinates, use them for more accurate location
            url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        } else {
            // Otherwise, search for the address
            url = `https://www.google.com/maps/search/${encodeURIComponent(address)}`;
        }

        window.open(url, '_blank');
    };

    const handleCompleteOrder = async (orderId: number) => {
        setUpdatingOrder(orderId);
        try {
            await updateOrderStatus(orderId, 'delivered');
            // Refetch orders to get updated status
            if (refetch) {
                refetch();
            }
        } catch (error) {
            console.error('Failed to update order status:', error);
            alert('Failed to mark order as delivered');
        } finally {
            setUpdatingOrder(null);
        }
    };

    const getStatusBadge = (status: string) => {
        const isPending = status === 'pending';
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${isPending
                ? 'bg-yellow-600 text-yellow-100'
                : 'bg-green-600 text-green-100'
                }`}>
                {isPending ? 'Pending' : 'Delivered'}
            </span>
        );
    };

    if (loading) return <div className="text-center text-white">Loading orders...</div>;
    if (error) return <div className="text-center text-red-400">Error: {error}</div>;

    return (
        <div className="flex items-center justify-center min-h-[60vh] md:items-start md:justify-start md:h-auto">
            <div className="w-full max-w-full md:max-w-4xl lg:max-w-6xl mx-auto bg-gray-900 shadow-md rounded-xl p-2 sm:p-4 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">Current Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-[600px] w-full bg-gray-900 border border-gray-700 rounded-lg shadow-md text-white text-sm md:text-base">
                        <thead className="bg-black">
                            <tr>
                                <th className="px-3 py-2 text-left text-white font-semibold">Name</th>
                                <th className="px-3 py-2 text-left text-white font-semibold">Phone</th>
                                <th className="px-3 py-2 text-left text-white font-semibold">Address</th>
                                <th className="px-3 py-2 text-left text-white font-semibold">Liters</th>
                                <th className="px-3 py-2 text-left text-white font-semibold">Total</th>
                                <th className="px-3 py-2 text-left text-white font-semibold">Status</th>
                                <th className="px-3 py-2 text-left text-white font-semibold">Created At</th>
                                <th className="px-3 py-2 text-left text-white font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="even:bg-gray-800 odd:bg-gray-900">
                                    <td className="px-3 py-2">{order.name}</td>
                                    <td className="px-3 py-2">{order.phone}</td>
                                    <td className="px-3 py-2">
                                        <button
                                            onClick={() => handleAddressClick(order.address, order.latitude, order.longitude)}
                                            className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
                                            title="Click to open in Google Maps"
                                        >
                                            {order.address}
                                        </button>
                                    </td>
                                    <td className="px-3 py-2">{order.liters}</td>
                                    <td className="px-3 py-2">{order.total} sh</td>
                                    <td className="px-3 py-2">{getStatusBadge(order.status)}</td>
                                    <td className="px-3 py-2">{new Date(order.created_at).toLocaleString()}</td>
                                    <td className="px-3 py-2">
                                        {order.status === 'pending' && (
                                            <button
                                                onClick={() => handleCompleteOrder(order.id)}
                                                disabled={updatingOrder === order.id}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-bold text-xs transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm border-none focus:outline-none focus:ring-2 focus:ring-green-400"
                                            >
                                                {updatingOrder === order.id ? 'Updating...' : 'Mark Delivered'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders; 
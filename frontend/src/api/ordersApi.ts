import axios from 'axios';
import type { Order, OrderCreate } from '../types/order';

const API_URL = 'http://localhost:8000';

export const createOrder = async (order: OrderCreate): Promise<Order> => {
  const response = await axios.post(`${API_URL}/orders`, order);
  return response.data;
};

export const fetchOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${API_URL}/admin/orders`);
  return response.data;
};

export const updateOrderStatus = async (orderId: number, status: string): Promise<void> => {
  await axios.put(`${API_URL}/admin/orders/${orderId}/status?status=${status}`);
}; 
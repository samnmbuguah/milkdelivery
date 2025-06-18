export type OrderCreate = {
  name: string;
  phone: string;
  address: string;
  liters: number;
  latitude?: number;
  longitude?: number;
};

export type Order = OrderCreate & {
  id: number;
  total: number;
  status: string;  // "pending" or "delivered"
  created_at: string;
}; 
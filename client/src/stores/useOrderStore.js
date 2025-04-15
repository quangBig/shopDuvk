// useOrderStore.js
import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const useOrderStore = create((set) => ({
    orders: [],
    orderDetail: null,
    deletedOrders: [],
    loading: false,
    error: null,

    createOrder: async (orderData) => {
        try {
            set({ loading: true });
            const response = await axios.post('/api/orders', orderData);
            toast.success('Đơn hàng đã được tạo thành công!');
            return response.data.order;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi tạo đơn hàng');
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    fetchAllOrders: async () => {
        try {
            set({ loading: true });
            const response = await axios.get('/api/orders');
            set({ orders: response.data });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Lỗi khi lấy danh sách đơn hàng' });
        } finally {
            set({ loading: false });
        }
    },

    fetchOrdersByUser: async (userId) => {
        try {
            set({ loading: true });
            const response = await axios.get(`/api/orders/user/${userId}`);
            set({ orders: response.data });
        } catch (error) {
            set({ error: error.response?.data?.message || 'Lỗi khi lấy đơn hàng' });
        } finally {
            set({ loading: false });
        }
    },


    deleteOrder: async (orderId, userId) => {
        try {
            const res = await axios.delete(`/api/orders/${orderId}`);
            // Cập nhật lại orders sau khi hu
            set((state) => ({
                orders: state.orders.filter((order) => order._id !== orderId),
                deletedOrders: [...state.deletedOrders, res.data],
            }));
        } catch (err) {
            console.error("Lỗi khi huỷ đơn hàng:", err);
        }
    },
    // Lấy danh sách đơn hàng theo trạng thái
    fetchOrdersByStatus: async (status) => {
        try {
            set({ loading: true });
            const response = await axios.get(`/api/orders/status/${status}`);
            set({ orders: response.data });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Lỗi khi lấy đơn hàng');
            set({ error: error.response?.data?.message });
        } finally {
            set({ loading: false });
        }
    },

    // Cập nhật trạng thái đơn hàng
    updateOrderStatus: async (orderId, newStatus) => {
        set({ loading: true, error: null });
        try {
            const response = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderStatus: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Failed to update order status');
            }

            const updatedOrder = await response.json();

            set((state) => ({
                orders: state.orders.map(order =>
                    order._id === orderId ? updatedOrder.order : order
                ),
                loading: false,
            }));

            return updatedOrder;
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },
}));

export default useOrderStore;

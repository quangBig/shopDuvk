import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

const useCartStore = create((set, get) => ({
    cart: [], // Danh sách sản phẩm trong giỏ hàng
    loading: false,
    error: null,
    clearCart: () => set({ cart: [] }), // Reset giỏ hàng về trống



    // 🔄 Lấy giỏ hàng từ server
    getCart: async () => {
        try {
            set({ loading: true });
            const response = await axios.get("/cart");
            set({ cart: response.data.items, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Lỗi khi lấy giỏ hàng", loading: false });
        }
    },

    // ➕ Thêm sản phẩm vào giỏ
    addToCart: async (productId, image, name, color, capacity, price, quantity) => {
        try {
            set({ loading: true });
            const response = await axios.post("/cart/add", { productId, image, name, color, capacity, price, quantity });
            set({ cart: response.data.items, loading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || "Lỗi khi thêm sản phẩm", loading: false });
        }
    },


    // 🔄 Cập nhật số lượng sản phẩm trong giỏ
    updateCartItem: async (productId, capacity, color, quantity) => {
        try {
            set({ loading: true });
            const response = await axios.put("/cart/update", { productId, capacity, color, quantity });
            // sản phẩm khi quuantity = 0 thì xóa sản phẩm khỏi giỏ hàng
            if (quantity <= 0) {
                // 🔥 Nếu số lượng bằng 0, gọi `removeCartItem` và dừng luôn
                await get().removeCartItem(productId, capacity, color);
                set({ loading: false });
                return;
            }
            // Cập nhật lại giỏ hàng sau khi cập nhật số lượng


            set((state) => ({
                cart: state.cart.map((item) =>
                    item.productId === productId && item.capacity === capacity && item.color === color
                        ? { ...item, quantity }  // Chỉ cập nhật đúng sản phẩm
                        : item
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Lỗi khi cập nhật số lượng", loading: false });
        }
    },




    // 🗑️ Xóa một sản phẩm khỏi giỏ
    removeCartItem: async (productId, capacity, color) => {
        try {
            set({ loading: true });

            // Gửi request với params & query string
            await axios.delete(`/cart/${productId}`, {
                params: { capacity, color }
            });
            toast.success("Xóa sản phẩm thành công");

            // Cập nhật giỏ hàng sau khi xóa thành công
            set((state) => ({
                cart: state.cart.filter(
                    (item) => !(item.productId === productId && item.capacity === capacity && item.color === color)
                ),
                loading: false,
            }));
        } catch (error) {
            set({ error: error.response?.data?.message || "Lỗi khi xóa sản phẩm", loading: false });
        }
    },




}));

export default useCartStore;

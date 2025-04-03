import { create } from "zustand";

import toast from "react-hot-toast";
import axios from "axios";

export const useProductStore = create((set) => ({
    products: [],
    product: null, // Thêm state để lưu sản phẩm chi tiết
    loading: false,

    setProducts: (products) => set({ products }),

    createProduct: async (productData) => {
        set({ loading: true });

        try {
            const response = await axios.post(`/api/products`, productData);
            return response.data;
        } catch (error) {
            console.error("Error creating product:", error.response?.data?.message || error.message);
            throw error;
        }
    },
    // const res = await axios.post(`/api/products`, productData);

    fetchAllProducts: async () => {
        set({ loading: true });
        try {
            const res = await axios.get("/api/products");
            set({ products: res.data.products, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
            toast.error(error.response?.data?.message || "Lỗi khi tải danh sách sản phẩm");
        }
    },

    fetchProductsByCategory: async (category) => {
        set({ loading: true });
        try {
            const res = await axios.get(`/api/products/category/${category}`);
            set({ products: res.data.products, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch products by category", loading: false });
            toast.error(error.response?.data?.message || "Lỗi khi tải danh sách sản phẩm theo danh mục");
        }
    },

    fetchProductById: async (id) => {
        set({ loading: true });
        try {
            const response = await axios.get(`/api/products/${id}`);
            set({ product: response.data, loading: false });
        } catch (error) {
            console.error("Lỗi khi lấy sản phẩm", error);
            set({ loading: false });
        }
    },
    deleteProduct: async (productId) => {
        set({ loading: true });
        try {
            await axios.delete(`/api/products/${productId}`);
            set((state) => ({
                products: state.products.filter((product) => product._id !== productId),
                loading: false,
            }));
            // toast.success("Xóa sản phẩm thành công");
        } catch (error) {
            set({ loading: false });
            toast.error("Lỗi khi xóa sản phẩm");
        }
    },

    updateProduct: async (productId, updateData) => {
        set({ loading: true });
        try {
            await axios.put(`/api/products/${productId}`, updateData);

            set((state) => ({
                products: state.products.map((product) =>
                    product._id === productId ? { ...product, ...updateData } : product
                ),
                loading: false,
            }));


        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Lỗi khi cập nhật sản phẩm");
        }
    },

    toggleFeaturedProduct: async (productId) => {
        set({ loading: true });
        try {
            const response = await axios.patch(`/api/products/${productId}/toggle-featured`);
            set((prevState) => ({
                products: prevState.products.map((product) =>
                    product._id === productId ? { ...product, isFeatured: response.data.isFeatured } : product
                ),
                loading: false,
            }));
            toast.success("Cập nhật trạng thái sản phẩm nổi bật thành công");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.error || "Lỗi khi cập nhật sản phẩm nổi bật");
        }
    },

    fetchFeaturedProducts: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/api/products/featured");
            set({ products: response.data.products, loading: false });
        } catch (error) {
            set({ error: "Failed to fetch featured products", loading: false });
            console.log("Lỗi khi tải sản phẩm nổi bật:", error);
        }
    },

}));

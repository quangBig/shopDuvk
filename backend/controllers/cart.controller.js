import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// 🛒 Lấy giỏ hàng
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: "Giỏ hàng trống!" });
        }

        // Cập nhật thông tin từ `Product`
        const updatedItems = cart.items.map(item => {
            if (!item.productId) return item; // Nếu sản phẩm bị xóa khỏi DB, giữ nguyên dữ liệu cũ

            return {
                _id: item._id,
                productId: item.productId._id,
                name: item.productId.name, // ✅ Lấy tên từ Product
                image: item.productId.image, // ✅ Lấy ảnh từ Product
                color: item.color,
                capacity: item.capacity,
                price: item.price, // ✅ Giữ giá đã chọn
                quantity: item.quantity
            };
        });

        res.status(200).json({ items: updatedItems });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

// ➕ Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    const { productId, color, capacity, quantity } = req.body;
    const userId = req.user._id;

    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Sản phẩm không tồn tại!" });

        // Tìm giá theo dung lượng đã chọn
        const capacityOption = product.capacities.find(cap => cap.size === capacity);
        if (!capacityOption) return res.status(400).json({ message: "Dung lượng không hợp lệ!" });

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [{
                    productId,
                    name: product.name,  // ✅ Lưu tên sản phẩm
                    image: product.image,  // ✅ Lưu ảnh sản phẩm
                    color,
                    capacity,
                    price: capacityOption.discountedPrice,
                    quantity
                }]
            });
        } else {
            const itemIndex = cart.items.findIndex(item =>
                item.productId.toString() === productId && item.color === color && item.capacity === capacity
            );

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity;
            } else {
                cart.items.push({
                    productId,
                    name: product.name,  // ✅ Lưu tên sản phẩm
                    image: product.image,  // ✅ Lưu ảnh sản phẩm
                    color,
                    capacity,
                    price: capacityOption.discountedPrice,
                    quantity
                });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

// 🔄 Cập nhật số lượng sản phẩm
export const updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Giỏ hàng không tồn tại!" });



        const item = cart.items.find(item => item.productId.toString() === productId);
        if (!item) return res.status(404).json({ message: "Sản phẩm không có trong giỏ hàng!" });

        item.quantity = quantity;
        // item.name = item.productId.name; 
        // item.image = item.productId.image; 
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

// 🗑️ Xóa sản phẩm khỏi giỏ hàng
import mongoose from "mongoose";

export const removeCartItem = async (req, res) => {
    const { productId } = req.params; // Lấy productId từ URL
    const { capacity, color } = req.query; // Lấy capacity, color từ query string
    const userId = req.user.id;

    try {
        const userCart = await Cart.findOne({ userId });

        if (!userCart) {
            return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
        }

        // Kiểm tra nếu sản phẩm có trong giỏ hàng
        const itemExists = userCart.items.some(
            (item) =>
                item.productId.toString() === productId &&
                item.capacity === capacity &&
                item.color === color
        );

        if (!itemExists) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
        }

        // Xóa sản phẩm khỏi giỏ hàng
        userCart.items = userCart.items.filter(
            (item) =>
                item.productId.toString() !== productId ||
                item.capacity !== capacity ||
                item.color !== color
        );

        await userCart.save();
        res.json({ message: "Đã xóa sản phẩm", items: userCart.items });
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        res.status(500).json({ message: "Lỗi khi xóa sản phẩm" });
    }
};


// 🚀 Xóa toàn bộ giỏ hàng
export const clearCart = async (req, res) => {
    const userId = req.user._id;

    try {
        await Cart.findOneAndDelete({ userId });
        res.status(200).json({ message: "Đã xóa giỏ hàng!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!", error });
    }
};

import express from "express";
import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";



const router = express.Router();

router.get("/", protectRoute, getCart); // Lấy giỏ hàng theo số điện thoại okok
router.post("/add", protectRoute, addToCart); // Thêm sản phẩm vào giỏ hàng okok
router.put("/update", protectRoute, updateCartItem); // Cập nhật số lượng sản phẩm ok  
router.delete("/:productId", protectRoute, removeCartItem);// Xóa sản phẩm khỏi giỏ hàng
router.delete("/clear", protectRoute, clearCart); // Xóa toàn bộ giỏ hàng
export default router;

import express from "express";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getFeaturedProducts,
    getProductById,
    getProductsByCategory,

    toggleFeaturedProduct,
    updateProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts); // ok
router.get("/featured", getFeaturedProducts); // hàm lấy danh sách nổi bật
router.get("/category/:category", getProductsByCategory); // ok
// router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct); // ok
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct); // hàm bật trạng thái nổi bật của sản phẩm
router.delete("/:id", protectRoute, adminRoute, deleteProduct); // ok
router.put("/:id", protectRoute, adminRoute, updateProduct);
router.get("/:id", getProductById);

export default router;
import express from "express";
import { createOrder, deleteOrder, getAllOrders, getOrderById, getOrdersByUser, getProductbyStatus, updateOrderStatus } from "../controllers/order.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createOrder); // đã kiểm tra postman
router.get("/", getAllOrders); // đã kiểm tra postman
router.get("/user/:userId", getOrdersByUser); // đã kiểm tra postman
router.get("/detail/:orderId", getOrderById); // đã kiểm tra postman
router.put("/:orderId/status", updateOrderStatus); // đã kiểm tra postman
router.get("/status/:status", getProductbyStatus); // đã kiểm tra postman
router.delete("/:orderId", deleteOrder); // đã kiểm tra postman



export default router;
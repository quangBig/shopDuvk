import Order from "../models/order.model.js";


// Tạo đơn hàng mới
export const createOrder = async (req, res) => {
    try {
        const { userId, items, totalAmount, deliveryMethod, address, paymentMethod } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Giỏ hàng trống!" });
        }

        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            deliveryMethod,
            address,
            paymentMethod,
        });

        await newOrder.save();
        res.status(201).json({ message: "Đơn hàng đã được tạo!", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Lỗi tạo đơn hàng", error: error.message });
    }
};
// Lấy toàn bộ đơn hàng đã đặtđặt
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh sách đơn hàng", error: error.message });
    }
}

// Lấy danh sách đơn hàng theo userId
export const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy đơn hàng", error: error.message });
    }
};

// Lấy chi tiết đơn hàng
export const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findById(orderId);

        if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy đơn hàng", error: error.message });
    }
};



// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { orderStatus } = req.body;

        // Validate order status
        const validStatuses = ["Đang xử lý", "Đang giao hàng", "Đơn hàng hoàn thành", "Đơn hàng hủy"];
        if (!validStatuses.includes(orderStatus)) {
            return res.status(400).json({ message: "Invalid order status" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { orderStatus },
            { new: true }
        ).populate("userId", "name email");

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json({
            message: "Order status updated successfully",
            order: updatedOrder,
        });
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getProductbyStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const orders = await Order.find({ orderStatus: status });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng", error: error.message });
    }
};



export const deleteOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        await Order.findByIdAndDelete(orderId);
        res.status(200).json({ message: "Xóa đơn hàng thành cong!" });
    } catch {
        res.status(500).json({ message: "Lỗi xóa đơn hàng", error: error.message });
    }
}

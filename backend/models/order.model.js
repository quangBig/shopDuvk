import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                name: String,
                price: Number,
                image: String,
                quantity: Number,
                color: String,
                capacity: String,
            },
        ],
        totalAmount: { type: Number, required: true },
        deliveryMethod: { type: String, enum: ["delivery", "store"], required: true },
        address: {
            fullName: String,
            phone: String,
            city: String,
            detailedAddress: String,
        },
        paymentMethod: { type: String, enum: ["cod", "bank", "wallet"], required: true },
        paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
        orderStatus: { type: String, enum: ["Đang xử lý", "Đang giao hàng", "Đơn hàng hoàn thành", "Đơn hàng hủy"], default: "Đang xử lý" },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

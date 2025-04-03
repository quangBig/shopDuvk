import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                // name: { type: String, required: true },  
                // image: { type: String, required: true }, 
                color: { type: String, required: true },
                capacity: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true, min: 1 }
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);


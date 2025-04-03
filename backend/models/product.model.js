import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        Originalprice: { type: Number, required: true },
        Discountedprice: { type: Number, required: true },
        category: { type: String, required: true },
        productLine: { type: String, required: true },
        image: { type: String, required: true },

        colors: { type: [String], required: true },
        capacities: [
            {
                size: { type: String },
                originalPrice: { type: Number },
                discountedPrice: { type: Number },
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
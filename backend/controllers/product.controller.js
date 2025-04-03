import { redis } from "../lib/redis.js";
import Product from "../models/product.model.js";
import cloudinary from "../lib/cloudinary.js";
import removeVietnameseTones from "../utils/removeVietnameseTones.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ products });
    } catch (error) {
        console.log("Error in getAllProducts controller", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featuredProducts");
        if (featuredProducts) {
            return res.json(JSON.parse(featuredProducts));
        }
        if (!featuredProducts) {
            return res.status(404).json({ message: "Featured products not found" });
        }
        await redis.set("featuredProducts", JSON.stringify(featuredProducts));
        res.json({ featuredProducts });
    } catch (error) {
        console.log("Error in getFeaturedProducts controller", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            Originalprice,
            Discountedprice,
            category,
            productLine,
            colors,
            capacities,
            image
        } = req.body;

        if (
            !name ||
            !description ||
            !Originalprice ||
            !Discountedprice ||
            !category ||
            !productLine ||
            !colors ||
            !Array.isArray(colors) ||
            colors.length === 0 ||
            !image
        ) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
        }

        if (Number(Originalprice) < Number(Discountedprice)) {
            return res.status(400).json({ message: "Giá khuyến mãi phải nhỏ hơn giá gốc!" });
        }

        let imageUrl = image;
        if (image.startsWith("data:image")) {
            const imageResponse = await cloudinary.uploader.upload(image, { folder: "products" });
            imageUrl = imageResponse.secure_url;
        }

        const product = await Product.create({
            name,
            description,
            Originalprice: Number(Originalprice),
            Discountedprice: Number(Discountedprice),
            category,
            productLine,
            colors,
            capacities: Array.isArray(capacities) ? capacities : [], // Nếu không có, đặt thành mảng rỗng
            image: imageUrl
        });

        res.status(201).json({ product });
    } catch (error) {
        console.error("Error in createProduct controller:", error.message);
        res.status(500).json({ message: "Lỗi server" });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            Originalprice,
            Discountedprice,
            category,
            colors,
            image,
            productLine,
            capacities
        } = req.body;

        if (
            !name ||
            !description ||
            !Originalprice ||
            !Discountedprice ||
            !category ||
            !productLine ||
            !colors ||
            !Array.isArray(colors) ||
            colors.length === 0
        ) {
            return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin!" });
        }

        if (Number(Originalprice) < Number(Discountedprice)) {
            return res.status(400).json({ message: "Giá khuyến mãi phải nhỏ hơn giá gốc!" });
        }

        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại" });
        }

        let imageUrl = product.image;
        if (image && image !== product.image) {
            if (product.image) {
                const publicId = product.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(`products/${publicId}`);
            }
            const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
            imageUrl = cloudinaryResponse.secure_url;
        }

        const updatedData = {
            name,
            description,
            Originalprice: Number(Originalprice),
            Discountedprice: Number(Discountedprice),
            category,
            colors,
            productLine,
            image: imageUrl,
            capacities: Array.isArray(capacities) ? capacities : product.capacities // Giữ nguyên nếu không có
        };

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json({ product: updatedProduct });
    } catch (error) {
        console.log("Error in updateProduct controller", error.message);
        res.status(500).json({ message: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("deleted image from cloudinary");
            } catch (error) {
                console.log("Error deleting image from cloudinary", error.message);
            }
        }
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log("Error in deleteProduct controller", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.json({ products });
    } catch (error) {
        console.log("Error in getProductsByCategory controller", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const toggleFeaturedProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            product.featured = !product.featured;
            const updatedProduct = await product.save();
            await updateFeaturedProductsCache();
            res.json({ product: updatedProduct });
        }
    } catch (error) {
        console.log("Error in toggleFeaturedProduct controller", error.message);
        res.status(500).json({ message: error.message });
    }
};


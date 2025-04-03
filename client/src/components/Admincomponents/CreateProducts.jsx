import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Chip, IconButton } from "@mui/material";
import { Upload, PlusCircle, Loader, X } from "lucide-react";
import { useProductStore } from "../../stores/useProductStore";
import toast from "react-hot-toast";

const CreatePage = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        Originalprice: "",
        Discountedprice: "",
        category: "",
        productLine: "",
        image: "",
        colors: [],
        capacities: [],
    });

    const [colorInput, setColorInput] = useState("");
    const [capacityInput, setCapacityInput] = useState({
        size: "",
        originalPrice: "",
        discountedPrice: "",
    });

    const { createProduct, loading } = useProductStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name || !product.description || !product.Originalprice || !product.Discountedprice) {
            toast.error("Vui lòng nhập đầy đủ thông tin sản phẩm!");
            return;
        }

        try {
            await createProduct(product);
            toast.success("Sản phẩm đã được tạo thành công!");
            navigate("/products/allProducts"); // Chuyển hướng về trang chính
        } catch (error) {
            toast.error("Lỗi khi tạo sản phẩm!");
            console.error("Lỗi tạo sản phẩm:", error);
        }
    };


    // Xử lý thay đổi các trường nhập liệu
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    // Xử lý upload hình ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProduct((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Thêm màu sắc
    const handleAddColor = () => {
        if (!colorInput.trim()) return;
        setProduct((prev) => ({ ...prev, colors: [...prev.colors, colorInput.trim()] }));
        setColorInput("");
    };

    // Xóa màu sắc
    const handleRemoveColor = (index) => {
        setProduct((prev) => ({
            ...prev,
            colors: prev.colors.filter((_, i) => i !== index),
        }));
    };

    // Thêm biến thể dung lượng



    // Xóa biến thể dung lượng
    const handleRemoveCapacity = (index) => {
        setProduct((prev) => ({
            ...prev,
            capacities: prev.capacities.filter((_, i) => i !== index),
        }));
    };

    // Xử lý submit form
    const handleAddCapacity = () => {
        if (!capacityInput.size && !capacityInput.originalPrice && !capacityInput.discountedPrice) {
            return; // Không thêm nếu không nhập gì
        }

        if (capacityInput.size && (!capacityInput.originalPrice || !capacityInput.discountedPrice)) {
            toast.error("Vui lòng nhập đầy đủ giá nếu đã nhập dung lượng!");
            return;
        }

        setProduct((prev) => ({
            ...prev,
            capacities: [...prev.capacities, capacityInput],
        }));
        setCapacityInput({ size: "", originalPrice: "", discountedPrice: "" });
    };


    return (
        <Box sx={{ maxWidth: 800, mx: "auto", p: 4 }}>
            <Typography variant="h4" gutterBottom>
                Tạo sản phẩm mới
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* Tên sản phẩm */}
                <TextField
                    label="Tên sản phẩm"
                    name="name"
                    fullWidth
                    value={product.name}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />

                {/* Mô tả */}
                <TextField
                    label="Mô tả"
                    name="description"
                    fullWidth
                    multiline
                    rows={4}
                    value={product.description}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />

                {/* Giá gốc và giá khuyến mãi */}
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                        label="Giá gốc"
                        name="Originalprice"
                        fullWidth
                        type="number"
                        value={product.Originalprice}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Giá khuyến mãi"
                        name="Discountedprice"
                        fullWidth
                        type="number"
                        value={product.Discountedprice}
                        onChange={handleChange}
                        required
                    />
                </Box>

                {/* Danh mục và dòng sản phẩm */}
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <TextField
                        label="Danh mục"
                        name="category"
                        fullWidth
                        value={product.category}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Dòng sản phẩm"
                        name="productLine"
                        fullWidth
                        value={product.productLine}
                        onChange={handleChange}
                        required
                    />
                </Box>

                {/* Upload hình ảnh chính */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" gutterBottom>
                        Hình ảnh chính
                    </Typography>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {product.image && (
                        <Box sx={{ mt: 2 }}>
                            <img
                                src={product.image}
                                alt="Preview"
                                style={{ width: 100, height: 100, objectFit: "cover" }}
                            />
                        </Box>
                    )}
                </Box>

                {/* Màu sắc */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" gutterBottom>
                        Màu sắc
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <TextField
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            placeholder="Nhập màu (hex, tên màu...)"
                            fullWidth
                        />
                        <button
                            variant="contained"
                            type="button"
                            className="px-5 py-1 bg-blue-500 text-white rounded-xl"
                            onClick={handleAddColor}
                        >
                            Thêm màu
                        </button>
                    </Box>
                    <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {product.colors.map((color, index) => (
                            <Chip
                                key={index}
                                label={color}
                                onDelete={() => handleRemoveColor(index)}
                                sx={{ backgroundColor: color, color: "white" }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Biến thể dung lượng */}
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1" gutterBottom>
                        Biến thể dung lượng
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                        <TextField
                            label="Dung lượng"
                            name="size"
                            value={capacityInput.size}
                            onChange={(e) =>
                                setCapacityInput({ ...capacityInput, size: e.target.value })
                            }
                            fullWidth
                        />
                        <TextField
                            label="Giá gốc"
                            name="originalPrice"
                            type="number"
                            value={capacityInput.originalPrice}
                            onChange={(e) =>
                                setCapacityInput({ ...capacityInput, originalPrice: e.target.value })
                            }
                            fullWidth
                        />
                        <TextField
                            label="Giá khuyến mãi"
                            name="discountedPrice"
                            type="number"
                            value={capacityInput.discountedPrice}
                            onChange={(e) =>
                                setCapacityInput({ ...capacityInput, discountedPrice: e.target.value })
                            }
                            fullWidth
                        />
                    </Box>
                    <button
                        variant="contained"
                        type="button"
                        className="px-2 py-2 bg-blue-500 text-white rounded-xl"
                        onClick={handleAddCapacity}
                    >
                        Thêm dung lượng
                    </button>
                    <Box sx={{ mt: 2 }}>
                        {product.capacities.map((cap, index) => (
                            <Box
                                key={index}
                                sx={{ display: "flex", gap: 2, alignItems: "center", mb: 1 }}
                            >
                                <Typography>{cap.size}</Typography>
                                <Typography>{cap.originalPrice}</Typography>
                                <Typography>{cap.discountedPrice}</Typography>
                                <IconButton onClick={() => handleRemoveCapacity(index)}>
                                    <X size={16} />
                                </IconButton>
                            </Box>
                        ))}
                    </Box>
                </Box>

                {/* Nút submit */}
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader className="mr-2 h-5 w-5 animate-spin" /> Loading...
                        </>
                    ) : (
                        <>
                            <PlusCircle className="mr-2 h-5 w-5" /> Tạo Sản Phẩm
                        </>
                    )}
                </button>
            </form>
        </Box>

    );
};

export default CreatePage; 
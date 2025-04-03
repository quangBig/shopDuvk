import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    TextField, Button, FormControl, InputLabel, MenuItem, Select, IconButton, Chip
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { FaApple } from "react-icons/fa";
import { useProductStore } from "../../stores/useProductStore";
import toast from "react-hot-toast";
import axios from "axios";

const AllProducts = () => {
    const [searchCategory, setSearchCategory] = useState("Tất cả");
    const { products, loading, fetchAllProducts, deleteProduct, updateProduct } = useProductStore();

    const [openEdit, setOpenEdit] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [colorInput, setColorInput] = useState("");
    const [capacityInput, setCapacityInput] = useState({
        size: "",
        originalPrice: "",
        discountedPrice: "",
    });

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    const uniqueCategories = ["Tất cả", ...new Set(products.map((p) => p.category))];
    const uniqueProductLines = [...new Set(products.map((p) => p.productLine))];

    const handleEditClick = (product) => {
        setSelectedProduct({ ...product });
        setPreviewImage(product.image);
        setOpenEdit(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setImageFile(file);
        }
    };

    const handleAddColor = () => {
        if (!colorInput.trim()) return;
        setSelectedProduct((prev) => ({
            ...prev,
            colors: [...prev.colors, colorInput.trim()],
        }));
        setColorInput("");
    };

    const handleRemoveColor = (index) => {
        setSelectedProduct((prev) => ({
            ...prev,
            colors: prev.colors.filter((_, i) => i !== index),
        }));
    };

    const handleAddCapacity = () => {
        if (!capacityInput.size || !capacityInput.originalPrice || !capacityInput.discountedPrice) {
            toast.error("Vui lòng nhập đầy đủ thông tin dung lượng!");
            return;
        }
        setSelectedProduct((prev) => ({
            ...prev,
            capacities: [...prev.capacities, capacityInput],
        }));
        setCapacityInput({ size: "", originalPrice: "", discountedPrice: "" });
    };

    const handleRemoveCapacity = (index) => {
        setSelectedProduct((prev) => ({
            ...prev,
            capacities: prev.capacities.filter((_, i) => i !== index),
        }));
    };

    const handleUpdateProduct = async () => {
        setIsLoading(true);
        let updatedData = { ...selectedProduct };

        // Upload hình ảnh chính
        if (imageFile) {
            const formData = new FormData();
            formData.append("file", imageFile);
            formData.append("upload_preset", "duckShopUnsigned");
            formData.append("cloud_name", "degzdonnl");

            try {
                const res = await axios.post("https://api.cloudinary.com/v1_1/degzdonnl/image/upload", formData);
                updatedData.image = res.data.secure_url;
            } catch (error) {
                toast.error("Lỗi khi upload ảnh chính");
                setIsLoading(false);
                return;
            }
        }

        // Cập nhật sản phẩm
        try {
            await updateProduct(selectedProduct._id, updatedData);
            toast.success("Cập nhật sản phẩm thành công!");
        } catch (error) {
            toast.error("Lỗi khi cập nhật sản phẩm");
        } finally {
            setIsLoading(false);
            setOpenEdit(false);
            setImageFile(null);
        }
    };

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
        if (confirmDelete) {
            try {
                await deleteProduct(productId);
                toast.success("Xóa sản phẩm thành công!");
                fetchAllProducts();
            } catch (error) {
                toast.error("Lỗi khi xóa sản phẩm");
            }
        }
    };

    const filteredProducts =
        searchCategory === "Tất cả" ? products : products.filter((p) => p.category === searchCategory);

    const formattedRows = filteredProducts.map((product) => ({
        ...product,
        id: String(product._id),
    }));

    const columns = [
        {
            field: "image",
            headerName: "Hình ảnh",
            width: 120,
            renderCell: (params) => (
                <img src={params.value} alt="Product" className="w-12 h-12 object-cover rounded-md" />
            ),
        },
        { field: "name", headerName: "Tên Sản Phẩm", flex: 1 },
        {
            field: "colors",
            headerName: "Màu sản phẩm",
            width: 150,
            renderCell: (params) => (
                <div className="flex flex-wrap gap-1">
                    {params.value.map((color, index) => (
                        <div
                            key={index}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color, border: "1px solid #ccc" }}
                            title={color}
                        ></div>
                    ))}
                </div>
            ),
        },
        { field: "Originalprice", headerName: "Giá gốc", width: 120 },
        { field: "Discountedprice", headerName: "Giá khuyến mại", width: 120 },
        { field: "category", headerName: "Danh Mục", width: 150 },
        { field: "productLine", headerName: "Danh Mục Sản Phẩm", width: 150 },
        {
            field: "actions",
            headerName: "Thao Tác",
            width: 120,
            renderCell: (params) => (
                <div className="flex gap-2">
                    <IconButton color="primary" onClick={() => handleEditClick(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6 mt-5 relative">
            <h2 className="text-xl font-semibold mb-7">Danh sách sản phẩm</h2>

            <FormControl className="mb-4 w-1/3 mt-4">
                <InputLabel className="-mt-2 -ml-3">Chọn danh mục</InputLabel>
                <Select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
                    {uniqueCategories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {loading ? (
                <p className="mt-5">Đang tải sản phẩm...</p>
            ) : (
                <div className="shadow-lg rounded-lg overflow-hidden border border-gray-200 bg-white mt-5">
                    <DataGrid
                        rows={formattedRows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        disableSelectionOnClick
                    />
                </div>
            )}

            <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
                <div className="relative">
                    {isLoading && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 transition-opacity duration-500">
                            <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                        </div>
                    )}
                    <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Tên sản phẩm"
                            name="name"
                            fullWidth
                            margin="dense"
                            value={selectedProduct?.name || ""}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Giá khuyến mãi"
                            name="Discountedprice"
                            type="number"
                            fullWidth
                            margin="dense"
                            value={selectedProduct?.Discountedprice || ""}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Giá gốc"
                            name="Originalprice"
                            type="number"
                            fullWidth
                            margin="dense"
                            value={selectedProduct?.Originalprice || ""}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Mô tả"
                            name="description"
                            fullWidth
                            margin="dense"
                            multiline
                            rows={3}
                            value={selectedProduct?.description || ""}
                            onChange={handleInputChange}
                        />
                        <FormControl fullWidth margin="dense">
                            <InputLabel className="-mt-[6px] -ml-3">Danh mục</InputLabel>
                            <Select
                                name="category"
                                value={selectedProduct?.category || ""}
                                onChange={handleInputChange}
                            >
                                {uniqueCategories
                                    .filter((category) => category !== "Tất cả")
                                    .map((category) => (
                                        <MenuItem key={category} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="dense">
                            <InputLabel className="-mt-[6px] -ml-3">Danh mục sản phẩm</InputLabel>
                            <Select
                                name="productLine"
                                value={selectedProduct?.productLine || ""}
                                onChange={handleInputChange}
                            >
                                {uniqueProductLines.map((line) => (
                                    <MenuItem key={line} value={line}>
                                        {line}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* Thêm màu sắc */}
                        <div className="mt-4">
                            <h3 className="font-medium text-base text-gray-500">Màu sắc</h3>
                            <div className="flex items-center gap-2">
                                <TextField
                                    value={colorInput}
                                    onChange={(e) => setColorInput(e.target.value)}
                                    placeholder="Nhập màu (hex, tên màu...)"
                                    fullWidth
                                />
                                <Button variant="contained" onClick={handleAddColor}>
                                    Thêm màu
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedProduct?.colors?.map((color, index) => (
                                    <Chip
                                        key={index}
                                        label={color}
                                        onDelete={() => handleRemoveColor(index)}
                                        style={{ backgroundColor: color, color: "white" }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Thêm dung lượng */}
                        <div className="mt-4">
                            <h3 className="font-medium text-base text-gray-500">Dung lượng</h3>
                            <div className="grid grid-cols-3 gap-2">
                                <TextField
                                    label="Dung lượng"
                                    value={capacityInput.size}
                                    onChange={(e) => setCapacityInput({ ...capacityInput, size: e.target.value })}
                                />
                                <TextField
                                    label="Giá gốc"
                                    type="number"
                                    value={capacityInput.originalPrice}
                                    onChange={(e) => setCapacityInput({ ...capacityInput, originalPrice: e.target.value })}
                                />
                                <TextField
                                    label="Giá khuyến mãi"
                                    type="number"
                                    value={capacityInput.discountedPrice}
                                    onChange={(e) => setCapacityInput({ ...capacityInput, discountedPrice: e.target.value })}
                                />
                            </div>
                            <Button variant="contained" onClick={handleAddCapacity} className="mt-2">
                                Thêm dung lượng
                            </Button>
                            <div className="mt-2">
                                {selectedProduct?.capacities?.map((cap, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <span>{cap.size}</span>
                                        <span>{cap.originalPrice}</span>
                                        <span>{cap.discountedPrice}</span>
                                        <IconButton onClick={() => handleRemoveCapacity(index)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Upload hình ảnh chính */}
                        <div className="mt-4">
                            <h3 className="font-medium text-base text-gray-500">Hình ảnh chính</h3>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Product preview"
                                    className="w-24 h-24 object-cover mt-2 rounded-md"
                                />
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenEdit(false)}>Hủy</Button>
                        <Button onClick={handleUpdateProduct} variant="contained" color="primary">
                            Lưu
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
};

export default AllProducts;
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaApple, FaCheckCircle } from "react-icons/fa";
import { Rating } from "@mui/material";
import toast from "react-hot-toast";
import useCartStore from "../../stores/useCartStore";
import RelateProduct from "../../components/Products/RelateProduct";
import ProductDescription from "../../components/Products/ProductDescription";
import { useProductStore } from "../../stores/useProductStore";

const ProductDetailPage = () => {
    const { id } = useParams();
    const { product, fetchProductById } = useProductStore();
    const { addToCart } = useCartStore();
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedCapacity, setSelectedCapacity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (id) {
            fetchProductById(id);
            window.scrollTo(0, 0);
        }
    }, [id, fetchProductById]);

    const handleAddToCart = () => {
        if (!selectedCapacity) {
            toast.error("Vui lòng chọn dung lượng sản phẩm!");
            return;
        }
        if (!selectedColor) {
            toast.error("Vui lòng chọn màu sắc sản phẩm!");
            return;
        }
        addToCart(id, product.image, product.name, selectedColor, selectedCapacity.size, selectedCapacity.discountedPrice, 1);
        toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    };

    if (isLoading) {
        return (

            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
                {/* Breadcrumb Skeleton */}
                <div className="h-4 bg-gray-300 rounded-md w-1/3 mb-4 animate-pulse"></div>

                {/* Layout Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    {/* Image Skeleton */}
                    <div className="flex flex-col items-center">
                        <div className="w-[450px] h-[450px] bg-gray-300 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Content Skeleton */}
                    <div>
                        <div className="h-6 bg-gray-300 rounded-md w-2/3 mb-2 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded-md w-1/4 mb-2 animate-pulse"></div>

                        {/* Price Skeleton */}
                        <div className="h-6 bg-gray-300 rounded-md w-1/3 my-4 animate-pulse"></div>

                        {/* Buttons Skeleton */}
                        <div className="h-10 bg-gray-300 rounded-md w-full my-4 animate-pulse"></div>
                        <div className="h-10 bg-gray-300 rounded-md w-full animate-pulse"></div>
                        <div className="h-10 bg-gray-300 rounded-md w-full animate-pulse"></div>
                        <div className="h-10 bg-gray-300 rounded-md w-full my-4 animate-pulse"></div>
                        <div className="h-10 bg-gray-300 rounded-md w-full animate-pulse"></div>
                        <div className="h-10 bg-gray-300 rounded-md w-full animate-pulse"></div>
                    </div>


                    <div className="h-56 bg-gray-300 rounded-md w-[220%]  animate-pulse"></div>

                </div>
            </div>
        );
    }

    if (!product) {
        return <div className="text-center text-red-500 mt-20">Không tìm thấy sản phẩm</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
            <div className="flex items-center gap-2 text-gray-500 text-sm py-2 px-8">
                <Link to="/" className="hover:underline">Trang chủ</Link>
                <span>&gt;</span>
                <Link to={`/${product.category}`} className="hover:underline">{product.category}</Link>
                <span>&gt;</span>
                <span className="font-medium">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                <div className="flex flex-col items-center">
                    <img src={product.image} alt={product.name} className="w-[450px] rounded-lg shadow-md" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                    <Rating value={product.rating || 0} precision={0.5} readOnly size="small" />
                    <span className="text-gray-500 text-sm">({product.reviewCount || 0} đánh giá)</span>

                    <div className="flex flex-col items-start space-y-1">
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-red-500">
                                {selectedCapacity ? selectedCapacity.discountedPrice.toLocaleString("vi-VN") : product.Discountedprice.toLocaleString("vi-VN")} VND
                            </span>
                            {selectedCapacity?.originalPrice && (
                                <span className="text-gray-500 line-through text-base mt-1">
                                    {selectedCapacity.originalPrice.toLocaleString("vi-VN")} VND
                                </span>
                            )}
                        </div>
                        <div className="text-gray-500 text-sm">
                            <p>( Đã bao gồm phí VAT )</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-medium text-gray-500">Dung lượng</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.capacities.map(cap => (
                                <button key={cap.size} onClick={() => setSelectedCapacity(cap)}
                                    className={`px-3 py-1 border rounded-md text-sm ${selectedCapacity?.size === cap.size ? "bg-gray-200" : ""}`}>
                                    {cap.size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="font-medium text-gray-500">Màu sắc</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product.colors.map((color, index) => (
                                <div key={index} onClick={() => setSelectedColor(color)}
                                    className={`w-7 h-7 rounded-full border-2 cursor-pointer ${selectedColor === color ? "border-gray-500" : ""}`}
                                    style={{ backgroundColor: color }}></div>
                            ))}
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 mt-4 shadow-md">
                        <div className="flex items-center gap-2 border-b pb-2">
                            <span className="font-semibold text-lg">🎁 Ưu đãi</span>
                        </div>
                        <p className="text-gray-600 text-sm italic mt-2">
                            (Khuyến mãi dự kiến áp dụng đến <span className="font-semibold">23h59 | 31/3/2025</span>)
                        </p>
                        <div className="mt-3">
                            <h3 className="text-red-500 font-semibold">I. Ưu đãi thanh toán</h3>
                            <ul className="list-none space-y-1 mt-1 text-sm">
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" /> Hỗ trợ trả góp 0% lãi suất, 0 phí (xem chi tiết)
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" /> Giảm đến <span className="font-semibold">400.000đ</span> khi thanh toán qua QR ZaloPay
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" /> Giảm đến <span className="font-semibold">200.000đ</span> khi thanh toán qua Kredivo
                                </li>
                            </ul>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-red-500 font-semibold">II. Ưu đãi mua kèm</h3>
                            <ul className="list-none space-y-1 mt-1 text-sm">
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" /> Ốp chính hãng Apple iPhone 15 series giảm <span className="font-semibold">300.000đ</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" /> Sản phẩm Apple, phụ kiện giảm đến <span className="font-semibold">80%</span> (xem chi tiết)
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" /> Mua combo phụ kiện Non Apple giảm đến <span className="font-semibold">200.000đ</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" /> Giảm <span className="font-semibold">20%</span> khi mua các gói bảo hành (xem chi tiết)
                                </li>
                            </ul>
                        </div>
                        <div className="mt-3">
                            <h3 className="text-red-500 font-semibold">III. Ưu đãi lên đời</h3>
                            <ul className="list-none space-y-1 mt-1 text-sm">
                                <li className="flex items-center gap-2">
                                    <FaCheckCircle className="text-green-500" /> Trợ giá lên đời đến <span className="font-semibold">1.500.000đ</span> (xem chi tiết)
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Nút mua hàng */}
                    <div className="mt-6 space-y-3">
                        <button onClick={handleAddToCart} className="w-full bg-blue-500 text-white py-3 text-lg rounded-md hover:bg-blue-600 transition">
                            Thêm vào giỏ hàng
                        </button>
                        <div className="flex flex-wrap gap-2 w-full">
                            <button className="flex-1 border border-blue-500 text-blue-500 py-3 text-lg rounded-md hover:bg-gray-200 transition">
                                Trả góp 0% qua thẻ
                            </button>
                            <button className="flex-1 border border-blue-500 text-blue-500 py-3 text-lg rounded-md hover:bg-gray-200 transition">
                                Thủ tục đổi mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ProductDescription description={product.description} />
            <RelateProduct />
        </div>
    );
};

export default ProductDetailPage;



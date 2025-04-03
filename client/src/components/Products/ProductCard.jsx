import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductCard = ({ product }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 300); // Giả lập tải dữ liệu
    }, []);

    return (
        <div className="w-full">
            <Link to={`/detailProduct/${product._id}`}>
                <div className="bg-white shadow-md p-4 sm:p-5 rounded-xl border transition-transform duration-300 ease-in-out hover:border-gray-500 hover:scale-105 flex flex-col h-full">
                    {loading ? (
                        <div className="animate-pulse flex flex-col h-full">
                            <div className="flex justify-between">
                                <div className="h-5 w-16 bg-gray-300 rounded-md mb-2"></div>
                                <div className="h-5 w-16 bg-gray-300 rounded-md mb-2"></div>
                            </div>
                            <div className="h-60 bg-gray-300 rounded-lg flex-1"></div>
                            <div className="h-4 w-3/4 bg-gray-300 rounded-md mt-3"></div>
                            <div className="h-4 w-1/2 bg-gray-300 rounded-md mt-2"></div>
                        </div>
                    ) : (
                        <>
                            {/* Giảm giá & Mới */}
                            {/* <div className="flex justify-between items-center mb-2">
                                {product.discount && (
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-md">
                                        Giảm {product.discount}%
                                    </span>
                                )}
                                {product.isNew && (
                                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                                        Mới
                                    </span>
                                )}
                            </div> */}
                            <div className="flex justify-end mt-2">
                                <span className="border border-blue-500 text-blue-500 text-xs px-2 py-1 rounded-md">
                                    Trả góp 0%
                                </span>
                            </div>
                            {/* Ảnh sản phẩm */}
                            <div className="flex justify-center items-center  rounded-lg p-3 min-h-[220px]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-[180px] h-[180px] object-contain transition-all duration-500 ease-in-out hover:brightness-110 hover:contrast-110 hover:saturate-150"
                                />
                            </div>

                            {/* Trả góp */}

                            {/* Thông tin sản phẩm */}
                            <div className="mt-4 min-h-[64px] flex ">
                                <h3 className="font-semibold text-sm sm:text-base ">
                                    {product.name}
                                </h3>
                            </div>

                            {/* Giá sản phẩm - luôn thẳng hàng */}
                            <div className="flex justify-start gap-2 mt-auto">
                                <span className="text-blue-600 font-bold text-lg">{product.Discountedprice?.toLocaleString("vi-VN")}đ</span>
                                <span className="text-gray-500 line-through text-sm mt-[5px]">{product.Originalprice?.toLocaleString("vi-VN")}đ</span>
                            </div>
                        </>
                    )}
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;

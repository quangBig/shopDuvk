import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaApple } from "react-icons/fa";

import BannnerProduct from "../../components/Banner/BannnerProduct";
import BannerFooter from "../../components/Banner/BannerFooter";
import NewsFeed from "../../components/NewFeeds/NewsFeed";
import ProductCard from "../../components/Products/ProductCard";

import { useProductStore } from "../../stores/useProductStore";

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const { products } = useProductStore();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 400);
    }, []);

    // Lọc sản phẩm theo danh mục và giới hạn 4 sản phẩm mỗi danh mục
    const categories = ["iPhone", "iPad", "Mac", "Watch"];
    const filteredProducts = categories.map(category => ({
        category,
        products: products.filter(product => product.category === category).slice(0, 4)
    }));

    return (
        <div className="relative">
            {/* Hiệu ứng loading */}
            {loading && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}

            {/* Banner sản phẩm */}
            <BannnerProduct />

            {/* Danh mục sản phẩm */}
            {filteredProducts.map(({ category, products }) => (
                <div key={category} className="max-w-[1200px] mx-auto px-4 mt-10">
                    {/* Tiêu đề danh mục */}
                    <div className="flex items-center justify-between border-b pb-2">
                        <h2 className="text-2xl sm:text-3xl font-bold">{category}</h2>
                        <Link to={`/${category.toLowerCase()}`} className="hidden sm:block text-blue-500 hover:underline">
                            Xem tất cả {category} &rarr;
                        </Link>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 cursor-pointer mt-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.name} product={product} />
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500">Không có sản phẩm nào.</p>
                        )}
                    </div>

                    {/* Nút xem tất cả (hiện trên mobile) */}
                    <div className="flex justify-center mt-6 sm:hidden">
                        <Link to={`/${category.toLowerCase()}`}>
                            <button className="bg-white text-blue-600 border border-blue-600 font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:text-white hover:scale-105">
                                Xem tất cả {category}
                            </button>
                        </Link>
                    </div>
                </div>
            ))}

            {/* Banner & Tin tức */}
            <BannerFooter />
            <NewsFeed />
        </div>
    );
};

export default HomePage;

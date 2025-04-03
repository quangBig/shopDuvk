import React, { useState } from "react";
import { IoSearch, IoBagOutline, IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { useProductStore } from "../../stores/useProductStore";
import MenuAccount from "./MenuAccount";

import { toast } from "react-toastify"; // Import toast nếu dùng thông báo
import useCartStore from "../../stores/useCartStore";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { user } = useUserStore();
    const { products } = useProductStore();
    const navigate = useNavigate();

    // 🛒 Lấy giỏ hàng
    const { cart } = useCartStore();

    // 🔥 Lọc danh mục sản phẩm duy nhất
    const categoryMenu = [...new Set(products.map((product) => product?.category))];

    // 🔥 Lọc sản phẩm theo từ khóa tìm kiếm
    const filteredProducts = products.filter((product) =>
        product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // 🔍 Xử lý tìm kiếm
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (filteredProducts.length > 0) {
            navigate(`/detailProduct/${filteredProducts[0]._id}`);
        } else {
            toast.error("Không tìm thấy sản phẩm phù hợp!");
        }
        setIsSearchOpen(false);
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center bg-[#515156] bg-opacity-50 backdrop-blur-md shadow-md">
            <header className="w-[100%] max-w-[1200px] text-white px-5 py-4">
                <div className="flex items-center justify-between">
                    {/* 🔥 Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logoapple.jpg" alt="Shopdunk Logo" className="h-8 rounded-full" />
                        <hr className="h-8 w-0.5 bg-black hidden sm:block" />
                        <span className="text-sm hidden sm:block">Authorised Reseller</span>
                    </Link>

                    {/* 🔥 Menu lớn */}
                    <nav className="hidden md:flex items-center gap-6">
                        {categoryMenu.map((category) => (
                            <Link key={category} to={`/${category}`} className="hover:text-black text-base transition">
                                {category}
                            </Link>
                        ))}
                    </nav>

                    {/* 🔥 Icon */}
                    <div className="flex items-center gap-4">
                        {/* 🔍 Icon tìm kiếm */}
                        <button type="button" onClick={() => setIsSearchOpen(true)} className="text-xl hover:text-black transition">
                            <IoSearch />
                        </button>

                        {/* 🛒 Giỏ hàng */}
                        <Link to="/cart">
                            <button className="relative mt-1">
                                <IoBagOutline className="text-xl hover:text-black transition" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white px-1 rounded-full">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        </Link>
                        <MenuAccount />

                        {/* 📱 Menu mobile */}
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
                            <IoMenu />
                        </button>
                    </div>
                </div>

                {/* 🔥 Menu mobile */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 bg-gray-800 rounded-lg p-3">
                        {categoryMenu.map((category) => (
                            <Link key={category} to={`/${category}`} className="block py-2 text-white hover:text-gray-400">
                                {category}
                            </Link>
                        ))}
                    </div>
                )}
            </header>

            {/* 🔥 Overlay khi isSearchOpen = true */}
            {isSearchOpen && (
                <div className="fixed inset-0 -mt-5 ml-[400px] bg-opacity-70 z-50 flex justify-center items-start pt-20">
                    <div className="absolute inset-0" onClick={() => setIsSearchOpen(false)} />

                    {/* Form tìm kiếm */}
                    <form onSubmit={handleSearchSubmit} className="relative bg-white rounded-md p-4 z-50 w-[90%] max-w-xl border border-blue-500" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm sản phẩm..."
                                className="px-3 py-2 w-full border border-gray-300 rounded-l-md focus:outline-none text-black"
                            />
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                                Tìm
                            </button>
                        </div>

                        {/* Gợi ý sản phẩm */}
                        {searchQuery && (
                            <div className="mt-2 bg-white rounded-md shadow max-h-60 overflow-y-auto">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.slice(0, 5).map((product) => (
                                        <Link key={product._id} to={`/detailProduct/${product._id}`} onClick={() => setIsSearchOpen(false)} className="block px-4 py-2 text-black hover:bg-gray-200">
                                            {product.name}
                                        </Link>
                                    ))
                                ) : (
                                    <p className="px-4 py-2 text-gray-500">Không tìm thấy sản phẩm</p>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            )}
        </div>
    );
};

export default Header;

import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Admincomponents/Sidebar';
import MenuAccount from '../../components/Header/MenuAccount';
import AllProducts from '../../components/Admincomponents/AllProducts';
import { FaApple } from 'react-icons/fa6';
import { FiMenu } from 'react-icons/fi';

const AllProduct = () => {
    const [isLoading, setIsloading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsloading(false);
        }, 400);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Loading Animation */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce" />
                </div>
            )}

            {/* Sidebar (ẩn trên mobile, hiện trên desktop) */}
            <div
                className={`fixed inset-y-0 left-0 z-40 bg-white shadow-lg transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                lg:translate-x-0 lg:static w-64`}
            >
                <Sidebar />
            </div>

            {/* Nội dung chính */}
            <div className="flex-1 flex flex-col overflow-auto">
                {/* Header */}
                <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
                    {/* Nút mở sidebar mobile */}
                    <button
                        className="lg:hidden p-2 rounded-md bg-gray-200"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <FiMenu className="text-xl" />
                    </button>
                    <h1 className="text-xl font-semibold flex-1 text-center lg:text-left">
                        Danh sách sản phẩm
                    </h1>
                    <MenuAccount className="w-10 h-10" />
                </div>

                {/* Nội dung trang */}
                <div className="flex-1 overflow-auto p-4">
                    <AllProducts />
                </div>
            </div>
        </div>
    );
};

export default AllProduct;

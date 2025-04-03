import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaApple } from 'react-icons/fa';
import ProductListMac from '../../components/Products/ProductList/ProductListMac';
import CategoryMac from '../../components/Category/CategoryMac';
import { useProductStore } from '../../stores/useProductStore';

const MacPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { products } = useProductStore();
    const [selectedProductLine, setSelectedProductLine] = useState("All");

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }, []);

    return (
        <div className='mt-[80px] flex justify-center'>
            <div className='w-full max-w-[1200px] px-4'>
                {isLoading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                        <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                    </div>
                )}

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-gray-500 text-sm py-2 px-8">
                    <Link to="/" className="hover:underline">Trang chủ</Link>
                    <span>&gt;</span>
                    <p className="cursor-pointer">MacBook</p>
                </div>

                {/* Danh mục sản phẩm */}
                <CategoryMac setSelectedProductLine={setSelectedProductLine} />

                {/* Danh sách sản phẩm */}
                <div className="mt-4">
                    <ProductListMac selectedProductLine={selectedProductLine} />
                </div>
            </div>
        </div>
    );
};

export default MacPage;

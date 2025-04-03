import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductStore } from "../../stores/useProductStore";
import ProductCard from "./ProductCard";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const RelateProduct = () => {
    const { id } = useParams();
    const { products, product, fetchProductById, fetchAllProducts } = useProductStore();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        if (!product || product._id !== id) {
            fetchProductById(id);
        }
        if (products.length === 0) {
            fetchAllProducts();
        }
    }, [id, fetchProductById, fetchAllProducts]);

    useEffect(() => {
        if (product && products.length > 0) {
            const filteredProducts = products.filter(
                (p) => p.category === product.category && p._id !== product._id
            );
            setRelatedProducts(filteredProducts);
        }
    }, [product, products]);

    const totalPages = Math.ceil(relatedProducts.length / productsPerPage);
    const displayedProducts = relatedProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:p-12 py-10">
            {/* Tiêu đề */}
            <div className="text-center">
                <h2 className="text-2xl sm:text-3xl font-bold my-6">Sản phẩm liên quan</h2>
            </div>

            {/* Lưới sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-center mt-4">
                {displayedProducts.length > 0 ? (
                    displayedProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">Không có sản phẩm liên quan.</p>
                )}
            </div>

            {/* Nút chuyển trang */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center mt-6 space-x-4">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 border rounded-md transition ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                            }`}
                    >
                        <GrFormPrevious />
                    </button>
                    <span className="text-sm font-medium">
                        {currentPage} / {totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 border rounded-md transition ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
                            }`}
                    >
                        <MdNavigateNext />
                    </button>
                </div>
            )}
        </div>
    );
};

export default RelateProduct;

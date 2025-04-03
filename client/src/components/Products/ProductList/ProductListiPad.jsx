import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { useProductStore } from "../../../stores/useProductStore";

const ProductListiPad = ({ selectedProductLine }) => {
    const { products } = useProductStore();

    // Lọc sản phẩm thuộc danh mục iPad
    let iPadProducts = products.filter(product => product.category === "iPad");

    // Nếu chọn một dòng sản phẩm cụ thể, tiếp tục lọc
    if (selectedProductLine !== "All") {
        iPadProducts = iPadProducts.filter(product => product.productLine === selectedProductLine);
    }

    return (
        <div className="max-w-[1200px] mx-auto px-4">
            {/* Tiêu đề */}
            <div className="flex items-center justify-center">
                <h2 className="text-2xl sm:text-3xl font-bold my-6">iPad</h2>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 cursor-pointer mt-4">
                {iPadProducts.length > 0 ? (
                    iPadProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">Không có sản phẩm nào.</p>
                )}
            </div>

            {/* Button xem tất cả */}
            {/* <div className="flex justify-center mt-6">
                <Link to="/iPad">
                    <button className="bg-white text-blue-600 border border-blue-600 font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:text-white hover:scale-105">
                        Xem tất cả iPad
                    </button>
                </Link>
            </div> */}
        </div>
    );
};

export default ProductListiPad;

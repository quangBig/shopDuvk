import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { useProductStore } from "../../../stores/useProductStore";

const ProductListWatch = ({ selectedProductLine }) => {
    const { products } = useProductStore();
    let watchProducts = products.filter(product => product.category === "Watch");

    if (selectedProductLine !== "All") {
        watchProducts = watchProducts.filter(product => product.productLine === selectedProductLine);
    }

    return (
        <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex items-center justify-center">
                <h2 className="text-2xl sm:text-3xl font-bold my-6">Apple Watch</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 cursor-pointer mt-4">
                {watchProducts.length > 0 ? (
                    watchProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <p className="text-center col-span-full text-gray-500">Không có sản phẩm nào.</p>
                )}
            </div>

            {/* <div className="flex justify-center mt-6">
                <Link to="/Watch">
                    <button className="bg-white text-blue-600 border border-blue-600 font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:text-white hover:scale-105">
                        Xem tất cả Apple Watch
                    </button>
                </Link>
            </div> */}
        </div>
    );
};

export default ProductListWatch;

import React from "react";
import { useProductStore } from "../../stores/useProductStore";

const CategoryWatch = ({ setSelectedProductLine }) => {
    const { products } = useProductStore();

    const uniqueProductLines = ["All", ...new Set(products.filter(p => p.category === "Watch").map(p => p.productLine))];

    return (
        <div className="flex overflow-x-auto whitespace-nowrap gap-3 p-2 ml-5 md:flex-wrap">
            {uniqueProductLines.map((productLine, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedProductLine(productLine)}
                    className="px-4 py-2 text-xs bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition-all md:text-sm"
                >
                    {productLine}
                </button>
            ))}
        </div>
    );
};

export default CategoryWatch;

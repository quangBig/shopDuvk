import React, { useState } from "react";

const ProductDescription = ({ description }) => {
    const [expanded, setExpanded] = useState(false);

    if (!description) return null; // Nếu không có mô tả, không hiển thị gì

    const lines = description.split("\n");
    const isLongText = lines.length > 20;

    return (
        <div className="border rounded-lg mt-10 shadow-md p-10">
            <h2 className="text-2xl font-semibold mb-4">Mô tả sản phẩm</h2>
            <div className="text-gray-500 space-y-2 px-8">
                {lines.slice(0, expanded ? lines.length : 20).map((line, index) => (
                    <p key={index} className="flex items-start">
                        <span className="mr-2 text-lg">•</span> {line}
                    </p>
                ))}
            </div>

            {/* Nút Xem thêm/Xem bớt */}
            {isLongText && (
                <button
                    className="mt-4 text-blue-500 hover:underline cursor-pointer"
                    onClick={() => {
                        console.log("Trạng thái trước:", expanded);
                        setExpanded(!expanded);
                        console.log("Trạng thái sau:", !expanded);
                    }}
                >
                    {expanded ? "Thu gọn ▲" : "Xem thêm ▼"}
                </button>
            )}
        </div>
    );
};

export default ProductDescription;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbError404 } from "react-icons/tb";
import { FaApple } from "react-icons/fa";

const NotLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsloading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);

        setTimeout(() => {
            setIsloading(false);
        }, 400)

    })

    return (

        <div className="flex flex-col items-center justify-center min-h-screen ">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">

                <div className="flex items-center justify-center">
                    <TbError404 className="text-2xl font-bold" />
                </div>
                <p className="text-gray-700 mt-2">Bạn cần đăng nhập để truy cập trang này.</p>
                <button
                    onClick={() => navigate("/login")}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                >
                    Đăng nhập ngay
                </button>
            </div>
        </div>
    );
};

export default NotLogin;

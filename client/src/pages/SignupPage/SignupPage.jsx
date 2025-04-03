import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaApple } from "react-icons/fa"; // Import logo Apple
import { useUserStore } from "../../stores/useUserStore";
import toast from "react-hot-toast";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false, // Thêm checkbox
    });

    const { signup, loading } = useUserStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreeToTerms) {
            toast.error("Vui lòng đồng ý điều khoản và chính sách");
            return;
        }
        signup(formData);
    };

    return (
        <div className="flex flex-wrap items-center justify-center min-h-screen p-4 mt-20 relative">
            {/* Backdrop loading với logo Apple */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}

            {/* Hình ảnh (ẩn trên mobile) */}
            <div className="hidden md:block md:w-1/2">
                <img src="/LoginPage.jpeg" alt="Signup" />
            </div>

            {/* Form đăng ký */}
            <div className="w-full md:w-1/2 flex justify-center">
                <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-xl">
                    <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                        Đăng ký
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Tên đăng ký:</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập tên của bạn"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Email:</label>
                            <input
                                type="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập email của bạn"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Mật khẩu:</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập mật khẩu"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Nhập lại mật khẩu:</label>
                            <input
                                type="password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập lại mật khẩu"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                        </div>

                        {/* Ô tích đồng ý với điều khoản */}
                        <div className="mb-4 ml-2 flex items-center">
                            <input
                                type="checkbox"
                                className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                checked={formData.agreeToTerms}
                                onChange={(e) =>
                                    setFormData({ ...formData, agreeToTerms: e.target.checked })
                                }
                            />
                            <label className="ml-2 text-gray-700 text-sm">
                                Tôi đồng ý với{" "}
                                <Link to="#" className="text-blue-500 hover:underline">
                                    điều khoản & chính sách
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 flex justify-center items-center"
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Đăng ký"}
                        </button>
                    </form>

                    <p className="mt-4 text-center">
                        Bạn đã có tài khoản?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Đăng nhập tại đây
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;

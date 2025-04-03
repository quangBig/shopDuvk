import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { FaApple } from "react-icons/fa";
import { useUserStore } from "../../stores/useUserStore.js";


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loginWithGoogle, loading } = useUserStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    // Đăng nhập bằng Google
    // const googleLogin = useGoogleLogin({
    //     onSuccess: async (response) => {
    //         await loginWithGoogle(response.credential);
    //     },
    //     onError: () => {
    //         console.error("Login Failed");
    //     },
    // });

    return (
        <>
            <div className="flex flex-wrap items-center justify-center min-h-screen p-4 mt-10 relative">
                {isLoading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <FaApple className="text-white text-6xl animate-bounce" />
                    </div>
                )}

                <div className="hidden md:block md:w-1/2">
                    <img src="/LoginPage.jpeg" alt="Login" />
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-xl">
                        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                            Đăng nhập
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập email của bạn"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Mật khẩu</label>
                                <input
                                    type="password"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Nhập mật khẩu"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 flex justify-center items-center"
                                disabled={loading}
                            >
                                {loading ? "Đang xử lý..." : "Đăng nhập"}
                            </button>
                        </form>

                        <div className="mt-4 text-center">
                            <p className="mb-4">
                                Bạn chưa có tài khoản?{" "}
                                <Link to="/sign-up" className="text-blue-500 hover:underline">
                                    Tạo tài khoản ngay
                                </Link>
                            </p>
                            <hr className="border-gray-300 mb-4" />

                            <div className="flex flex-col md:flex-row justify-center gap-3">
                                <button
                                    // onClick={() => googleLogin()}
                                    className="flex items-center justify-center gap-2 bg-gray-100 text-black px-4 py-3 w-full md:w-1/2 rounded-lg shadow-sm hover:bg-gray-200 transition"
                                >
                                    <FcGoogle className="text-3xl" />
                                    <p className="text-sm"> Đăng nhập với Google </p>
                                </button>

                                <button className="flex items-center justify-center gap-2 bg-gray-100 text-black px-4 py-3 w-full md:w-1/2 rounded-lg shadow-sm hover:bg-gray-200 transition">
                                    <BsFacebook className="text-3xl text-blue-700" />
                                    <p className="text-sm"> Đăng nhập với Facebook </p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;

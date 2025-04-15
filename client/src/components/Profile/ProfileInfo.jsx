import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { FaApple, FaRegUserCircle } from "react-icons/fa";

const ProfileInfo = () => {
    const { user } = useUserStore();
    console.log("user", user);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}
            <h2 className="text-lg font-semibold mb-2 text-center">Hồ sơ của tôi</h2>
            <p className="text-sm text-gray-500 text-center mb-4">
                Quản lý thông tin để bảo mật tài khoản
            </p>

            {/* Avatar & Thông tin */}
            <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6 border rounded-lg p-5 shadow-md w-full">
                {/* Ảnh đại diện */}
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-md"
                    />
                ) : (
                    <FaRegUserCircle className="text-gray-400 text-6xl md:text-7xl" />
                )}

                {/* Thông tin cá nhân */}
                <div className="text-center md:text-left space-y-2 mt-4 md:mt-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                        <p className="text-gray-500">Tên tài khoản:</p>
                        <p className="font-semibold break-all">{user?.name || "Chưa cập nhật"}</p>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                        <p className="text-gray-500">Email:</p>
                        <p className="font-semibold break-all">{user?.email || "Chưa cập nhật"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;

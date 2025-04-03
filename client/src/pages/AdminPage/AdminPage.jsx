import React, { useState } from "react";
import Header from "../../components/Admincomponents/Header";
import DashboardContent from "../../components/Admincomponents/DashboardContent";
import Sidebar from "../../components/Admincomponents/Sidebar";
import MenuAccount from "../../components/Header/MenuAccount";
import { FiMenu } from "react-icons/fi"; // Icon menu cho mobile

const AdminPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar (ẩn khi nhỏ, hiện khi lớn) */}
            <div
                className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:translate-x-0 lg:static w-64`}
            >
                <Sidebar />
            </div>

            {/* Nội dung chính */}
            <div className="flex-1 flex flex-col overflow-auto">
                {/* Header */}
                <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
                    {/* Nút mở sidebar trên mobile */}
                    <button
                        className="lg:hidden p-2 rounded-md bg-gray-200"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <FiMenu className="text-xl" />
                    </button>
                    <h1 className="text-xl font-semibold flex-1 text-center lg:text-left">
                        Bảng điều khiển
                    </h1>
                    <MenuAccount className="w-10 h-10" />
                </div>

                {/* Nội dung Dashboard */}
                <div className="flex-1 overflow-auto p-4">
                    <DashboardContent />
                </div>
            </div>
        </div>
    );
};

export default AdminPage;

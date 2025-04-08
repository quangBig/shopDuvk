import { useEffect, useState } from "react";
import ProfileInfo from "../components/Profile/ProfileInfo";
import OrderList from "../components/Profile/TaskOrder/OrderList";
import { FiChevronDown } from "react-icons/fi";
import ProcessList from "../components/Profile/TaskOrder/ProcessList";
import ShipList from "../components/Profile/TaskOrder/ShipList";
import SuccessList from "../components/Profile/TaskOrder/SuccessList";
import CancelList from "../components/Profile/TaskOrder/CancelList";
import { IoMenu } from "react-icons/io5";
import useOrderStore from "../stores/useOrderStore";
import { FaApple } from "react-icons/fa";

const ProfileLayout = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { orders } = useOrderStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => setIsLoading(false), 400);
    }, []);

    return (
        <div className="flex flex-col md:flex-row bg-white mt-20 h-screen mb-10">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <FaApple className="text-white text-6xl animate-bounce" />
                </div>
            )}

            {/* Nút mở Sidebar trên Mobile */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed -mt-2 left-4 bg-gray-800 text-white p-3 rounded flex items-center z-50"
            >
                <IoMenu className="text-2xl" />
                <span className="ml-2">Menu</span>
            </button>

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-gray-200 shadow-lg p-6 transition-transform duration-300
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:w-1/5`}
            >
                <h2 className="text-xl font-bold mb-6">Tài khoản</h2>
                <ul>
                    <li
                        className={`cursor-pointer p-3 rounded-md ${activeTab === "profile" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                        onClick={() => setActiveTab("profile")}
                    >
                        Hồ sơ
                    </li>
                    <li>
                        <button
                            onClick={() => setIsProductOpen(!isProductOpen)}
                            className="flex items-center justify-between w-full p-3 rounded-md hover:bg-gray-200"
                        >
                            Đơn hàng
                            <FiChevronDown className={`transition-transform ${isProductOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isProductOpen && (
                            <ul className="ml-6 mt-3 space-y-3">
                                {[
                                    { key: "all-orders", label: "Tất cả đơn hàng", filter: () => orders.length },
                                    { key: "process-orders", label: "Đơn hàng đang chờ xử lý", filter: () => orders.filter(order => order.orderStatus === "Đang xử lý").length },
                                    { key: "ship-orders", label: "Đơn hàng đang vận chuyển", filter: () => orders.filter(order => order.orderStatus === "Đang giao hàng").length },
                                    { key: "success-orders", label: "Đơn hàng hoàn thành", filter: () => orders.filter(order => order.orderStatus === "Đơn hàng hoàn thành").length },
                                    { key: "cancel-orders", label: "Đơn hàng đã hủy", filter: () => orders.filter(order => order.orderStatus === "Đơn hàng hủy").length }
                                ].map(({ key, label, filter }) => (
                                    <li key={key} className={`cursor-pointer p-3 rounded-md shadow-md ${activeTab === key ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                                        onClick={() => setActiveTab(key)}>
                                        {label}
                                        <span className="ml-10 bg-red-500 text-xs text-white py-1 px-2 rounded-full">
                                            {filter()}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>

            {/* Nội dung chính */}
            <div className={`w-full md:w-3/4 p-6 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-0 md:ml-0"}`}>
                {activeTab === "profile" && <ProfileInfo />}
                {activeTab === "all-orders" && <OrderList />}
                {activeTab === "process-orders" && <ProcessList />}
                {activeTab === "ship-orders" && <ShipList />}
                {activeTab === "success-orders" && <SuccessList />}
                {activeTab === "cancel-orders" && <CancelList />}
            </div>
        </div>
    );
};

export default ProfileLayout;
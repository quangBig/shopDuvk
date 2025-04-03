import { use, useEffect, useState } from "react";
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar trên mobile
    const { orders } = useOrderStore();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }, []);


    return (
        <div className="flex flex-col md:flex-row h-screen bg-white mt-20">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}
            {/* Nút mở Sidebar trên Mobile */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden p-3 bg-gray-800 text-white rounded mb-4 flex items-center self-start ml-4"
            >
                <IoMenu className="text-2xl" />
                <span className="ml-2">Menu</span>
            </button>

            {/* Sidebar */}
            <div className={`w-full md:w-1/5 ml-5 mt-5 bg-gray-200 shadow-lg p-6 transition-all duration-300
                ${isSidebarOpen ? "block" : "hidden"} md:block`}
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
                            className={`flex items-center justify-between w-full cursor-pointer p-3 rounded-md ${activeTab.startsWith("orders") ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                        >
                            Đơn hàng
                            <FiChevronDown className={`transition-transform ${isProductOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isProductOpen && (
                            <ul className="ml-6 mt-3 space-y-3">
                                <li className={`cursor-pointer shadow-md p-3 rounded-md ${activeTab === "all-orders" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                                    onClick={() => setActiveTab("all-orders")}>
                                    Tất cả đơn hàng
                                    <span className="ml-10 bg-red-500 text-xs text-white py-1 px-2  rounded-full">
                                        {orders.length}
                                    </span>
                                </li>
                                <li className={`cursor-pointer shadow-md p-3 rounded-md ${activeTab === "process-orders" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                                    onClick={() => setActiveTab("process-orders")}>

                                    Đơn hàng đang chờ xử lý
                                    <span className="ml-10 bg-red-500 text-xs text-white py-1 px-2  rounded-full">
                                        {orders.filter(order => order.orderStatus === "Đang xử lý").length}
                                    </span>
                                </li>
                                <li className={`cursor-pointer shadow-md p-3 rounded-md ${activeTab === "ship-orders" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                                    onClick={() => setActiveTab("ship-orders")}>
                                    Đơn hàng đang vận chuyển
                                    <span className="ml-10 bg-red-500 text-xs text-white py-1 px-2  rounded-full">
                                        {orders.filter(order => order.orderStatus === "Đang giao hàng").length}
                                    </span>
                                </li>
                                <li className={`cursor-pointer shadow-md p-3 rounded-md ${activeTab === "success-orders" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                                    onClick={() => setActiveTab("success-orders")}>
                                    Đơn hàng hoàn thành
                                    <span className="ml-10 bg-red-500 text-xs text-white py-1 px-2  rounded-full">
                                        {orders.filter(order => order.orderStatus === "Đơn hàng hoàn thành").length}
                                    </span>
                                </li>
                                <li className={`cursor-pointer shadow-md p-3 rounded-md ${activeTab === "cancel-orders" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                                    onClick={() => setActiveTab("cancel-orders")}>
                                    Đơn hàng đã hủy
                                    <span className="ml-10 bg-red-500 text-xs text-white py-1 px-2  rounded-full">
                                        {orders.filter(order => order.orderStatus === "Đơn hàng hủy").length}
                                    </span>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div >

            {/* Nội dung */}
            < div className="w-full md:w-3/4 p-6" >
                {activeTab === "profile" && <ProfileInfo />}
                {activeTab === "all-orders" && <OrderList />}
                {activeTab === "process-orders" && <ProcessList />}
                {activeTab === "ship-orders" && <ShipList />}
                {activeTab === "success-orders" && <SuccessList />}
                {activeTab === "cancel-orders" && <CancelList />}
            </div >
        </div >
    );
};

export default ProfileLayout;

import { useEffect, useState } from "react";
import { FaApple } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import { TbMoneybag } from "react-icons/tb";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import { useProductStore } from "../../stores/useProductStore";
import useOrderStore from "../../stores/useOrderStore";

const DashboardContent = () => {
    const data = [
        { name: "Mon", sales: 50 },
        { name: "Tue", sales: 400 },
        { name: "Wed", sales: 60 },
        { name: "Thu", sales: 100 },
        { name: "Fri", sales: 30 },
        { name: "Sat", sales: 50 },
        { name: "Sun", sales: 500 },
    ];
    const { products } = useProductStore();
    const { orders, fetchOrdersByUser, deleteOrder } = useOrderStore();
    console.log(orders);


    const listContactDashboard = [
        {
            name: "Tổng số khách hàng",
            icon: <FiUser className=" bg-gray-500 text-white p-2 rounded-full text-3xl" />,
            quanlity: orders.length,
        },
        {
            name: "Tổng số sản phẩm",
            icon: <LuShoppingCart className=" bg-gray-500 text-white p-2 rounded-full text-3xl" />,
            quanlity: products.length,
        },
        {
            name: "Tổng doanh thu",
            icon: <TbMoneybag className=" bg-gray-500 text-white p-2 rounded-full text-3xl" />,
            quanlity: "1,250",
        }
    ];
    const [isLoading, setIsloading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);

        setTimeout(() => {
            setIsloading(false);
        }, 700)

    })
    return (
        <div className="p-6">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}
            {/* <h2 className="text-2xl font-semibold mb-4">Welcome to Admin Dashboard</h2> */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {
                    listContactDashboard.map((item, index) => (

                        <div className=" text-gray-500 p-3 rounded-lg shadow-md" key={index}>
                            <div className=" mb-2 ">
                                {item.icon}
                            </div>

                            <h3 className="text-base font-semibold text-black">{item.name}</h3>
                            <p className="text-base text-black">{item.quanlity}</p>

                        </div>

                    ))
                }
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className=" text-gray-500 p-3 rounded-lg shadow-md">
                    <div className=" mb-2">
                        <FiUser className=" bg-gray-500 text-white p-2 rounded-full text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Total Custormers</h3>
                    <p className="text-lg text-black">1,250</p>

                </div>
                <div className=" text-gray-500 p-3 rounded-lg shadow-md">
                    <div className=" mb-2">
                        <LuShoppingCart className=" bg-gray-500 text-white p-2 rounded-full text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Total Product</h3>
                    <p className="text-lg text-black">1,250</p>
                </div>
                <div className=" text-gray-500 p-3 rounded-lg shadow-md">
                    <div className=" mb-2">
                        <TbMoneybag className=" bg-gray-500 text-white p-2 rounded-full text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-black">Budget</h3>
                    <p className="text-lg text-black">1,250 VND</p>
                </div>
                <div className=" text-gray-500 p-3 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-black">New Messages</h3>
                    <p className="text-2xl text-black">89</p>
                </div>

            </div> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-semibold mb-4">Biểu đồ thống kê</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="sales" stroke="#4F46E5" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardContent;

import { useEffect, useState } from "react";
import useOrderStore from "../../../stores/useOrderStore";
import { useUserStore } from "../../../stores/useUserStore";
import toast from "react-hot-toast";
import { FaApple } from "react-icons/fa";

const OrderList = () => {
    const { orders, fetchOrdersByUser, deleteOrder } = useOrderStore();
    const { user } = useUserStore();
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 2;
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }, []);

    useEffect(() => {
        if (user?._id) {
            fetchOrdersByUser(user._id);
        }
    }, [user, fetchOrdersByUser]);

    const handleCancelOrder = async (orderId) => {
        try {
            await deleteOrder(orderId);
            toast.success("Đã hủy đơn hàng thành công");
            fetchOrdersByUser(user._id);
        } catch (error) {
            toast.error("Hủy đơn hàng thất bại: " + error.message);
        }
    };

    // Calculate pagination
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full -mt-7 ">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}
            <h2 className="text-lg font-semibold mb-4 text-start">Tất cả các đơn hàng</h2>

            {orders.length === 0 ? (
                <p className="text-gray-500 text-center">Bạn chưa có đơn hàng nào.</p>
            ) : (
                <>
                    {/* Display only current page orders */}
                    {currentOrders.map((order) => (
                        <div key={order._id} className="border rounded-lg p-4 shadow-md mb-4 ">
                            <div className="flex justify-between items-center pb-2">
                                <div>
                                    <p className="text-gray-700">Mã đơn hàng: {order._id}</p>
                                    <p className="text-gray-700">Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div>
                                    <span className={`font-medium ${order.orderStatus === "Đơn hàng hủy" ? "text-red-500" :
                                        order.orderStatus === "Đơn hàng hoàn thành" ? "text-green-500" :
                                            "text-yellow-500"
                                        }`}>
                                        {order.orderStatus}
                                    </span>
                                </div>
                            </div>

                            {order.items.map((item) => (
                                <div key={item._id} className="flex flex-col sm:flex-row items-center mt-4 gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded shadow"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/80";
                                        }}
                                    />
                                    <div className="flex-1 text-center sm:text-left">
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-gray-500 text-sm">Phân loại: {item.capacity}, {item.color}</p>
                                        <p className="text-gray-500 text-sm">x{item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-red-500 font-semibold">₫{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="border-t mt-4 pt-4">
                                <div className="flex flex-col sm:flex-row justify-between items-center">
                                    <p className="text-lg font-semibold text-red-500">
                                        Thành tiền: ₫{order.totalAmount.toLocaleString()}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                                        {order.orderStatus === "Đơn hàng hủy" && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="border border-gray-400 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                            >
                                                Mua lại
                                            </button>
                                        )}
                                        {order.orderStatus === "Đơn hàng hoàn thành" && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="border border-gray-400 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                            >
                                                Mua lại
                                            </button>
                                        )}
                                        {order.orderStatus === "Đang xử lý" && (
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="border border-gray-400 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                            >
                                                Hủy đơn hàng
                                            </button>
                                        )}

                                        <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition">
                                            Liên Hệ Người Bán
                                        </button>
                                        <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition">
                                            Xem Chi Tiết
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Pagination controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-12">
                            <nav className="inline-flex rounded-md shadow">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    &laquo;
                                </button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => paginate(i + 1)}
                                        className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    &raquo;
                                </button>
                            </nav>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default OrderList;
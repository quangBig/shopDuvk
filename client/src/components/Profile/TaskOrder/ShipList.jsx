import { useEffect, useState } from "react";
import useOrderStore from "../../../stores/useOrderStore";
import { useUserStore } from "../../../stores/useUserStore";
import { FaApple } from "react-icons/fa";

const ShipList = () => {
    const { orders } = useOrderStore();
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

    // Lọc danh sách đơn hàng đang giao
    const filteredOrders = orders.filter(order => order.orderStatus === "Đang giao hàng");

    // Tính toán phân trang
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 max-w-full mx-auto">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Đơn hàng đang giao</h2>
            {filteredOrders.length === 0 ? (
                <p className="text-gray-500 text-center">Bạn chưa có đơn hàng nào đang giao.</p>
            ) : (
                <>
                    {currentOrders.map((order) => (
                        <div key={order._id} className="border rounded-lg p-4 shadow-md mb-4">
                            <div className="flex justify-between items-center pb-2">
                                <div>
                                    <p className="text-gray-600">Mã đơn: {order._id}</p>
                                    <p className="text-gray-700">Dự kiến ngày giao hàng từ 2 - 3 ngày</p>
                                </div>
                                <span className="text-red-500 font-medium">{order.orderStatus}</span>
                            </div>

                            {order.items.map((item, index) => (
                                <div key={index} className="flex items-center mt-4 border-b pb-4">
                                    <img
                                        src={item.image || "https://via.placeholder.com/80"}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="ml-4 flex-1">
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-gray-500 text-sm">Số lượng: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        {item.originalPrice && (
                                            <p className="text-gray-400 line-through">₫{item.originalPrice.toLocaleString()}</p>
                                        )}
                                        <p className="text-red-500 font-semibold">₫{item.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4 pt-4 flex justify-between items-center">
                                <p className="text-lg font-semibold text-red-500">Thành tiền: ₫{order.totalAmount.toLocaleString()}</p>
                                <div className="flex space-x-3">
                                    <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-100">Liên Hệ Người Bán</button>
                                    <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition">
                                        Xem Chi Tiết
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

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
                                        className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'
                                            }`}
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

export default ShipList;

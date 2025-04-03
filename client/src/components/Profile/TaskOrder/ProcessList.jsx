import { useEffect, useState } from "react";
import useOrderStore from "../../../stores/useOrderStore";
import { useUserStore } from "../../../stores/useUserStore";
import { FaApple } from "react-icons/fa";
// import useOrderStore from "../store/orderStore";

const ProcessList = () => {
    const { orders, deleteOrder } = useOrderStore();
    const { user } = useUserStore();

    // console.log("deletedOrders", deletedOrders);
    console.log("orders", orders);
    // useEffect(() => {
    //     if (user?._id) {
    //         deleteOrder(user._id);
    //     }
    // }, [deleteOrder, user?._id]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-4 max-w-full mx-auto">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}
            < h2 className="text-xl font-semibold mb-4 text-gray-700" > Đơn hàng đang xử lý</h2 >
            {
                orders.length === 0 ? (
                    <p className="text-gray-500 text-center">Bạn chưa có đơn hàng nào bị hủy.</p>
                ) : (
                    orders.map((order) => (
                        order.orderStatus === "Đang xử lý" && (
                            <div key={order._id} className="border rounded-lg p-4 shadow-md mb-4">
                                {/* Trạng thái đơn hàng */}
                                <div className="flex justify-between items-center  pb-2">
                                    <div>
                                        <p className="text-gray-600">Mã đơn: {order._id}</p>
                                        <p className="text-gray-700">Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
                                    </div>
                                    <span className="text-red-500 font-medium">{order.orderStatus}</span>
                                </div>

                                {/* Danh sách sản phẩm */}
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

                                {/* Tổng tiền & Hành động */}
                                <div className="border-t mt-4 pt-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-center">
                                        <p className="text-lg font-semibold text-red-500">
                                            Thành tiền: ₫{order.totalAmount.toLocaleString()}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                                            {order.orderStatus !== "canceled" && (
                                                <button
                                                    onClick={() => handleDeleteOrder(order._id)}
                                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                                >
                                                    Hủy đơn hàng
                                                </button>
                                            )}
                                            <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded">
                                                Liên Hệ Người Bán
                                            </button>
                                            <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded">
                                                Xem Chi Tiết
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))
                )
            }
        </div >
    );
};

export default ProcessList;

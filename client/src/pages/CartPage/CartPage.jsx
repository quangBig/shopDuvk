import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../stores/useCartStore";
import { MdDelete } from "react-icons/md";
import useOrderStore from "../../stores/useOrderStore";
import toast from "react-hot-toast";
import { useUserStore } from "../../stores/useUserStore";
import { FaApple } from "react-icons/fa6";

const CartPage = () => {
    const [selectedDelivery, setSelectedDelivery] = useState("delivery");
    const [agreed, setAgreed] = useState(false);
    const { cart, getCart, removeCartItem, updateCartItem, clearCart } = useCartStore();
    const { createOrder, orders, loading } = useOrderStore();
    const { user } = useUserStore();
    const navigate = useNavigate();
    console.log(user, "user");

    console.log(orders, "orders");

    const handleCheckout = async () => {
        if (!agreed) {
            toast.error("Bạn phải đồng ý với điều khoản trước khi đặt hàng!");
            return;
        }

        const nameInput = document.querySelector('input[placeholder="Họ và Tên"]');
        const phoneInput = document.querySelector('input[placeholder="Số điện thoại"]');
        const citySelect = document.querySelector('select');
        const addressInput = document.querySelector('input[placeholder="Địa chỉ cụ thể"]');
        const paymentInput = document.querySelector('input[name="payment"]:checked');

        const customerName = nameInput?.value || "";
        const phone = phoneInput?.value || "";
        const city = citySelect?.value || "";
        const detailedAddress = selectedDelivery === "delivery"
            ? addressInput?.value || ""
            : "Nhận tại cửa hàng";
        const paymentMethod = paymentInput?.value || "cod";

        if (!customerName || !phone || (selectedDelivery === "delivery" && (!city || !detailedAddress))) {
            toast.error("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        if (cart.length === 0) {
            toast.error("Giỏ hàng trống không thể đặt hàng!");
            return;
        }

        const orderData = {
            userId: user._id,
            items: cart.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                color: item.color,
                image: item.image,
                capacity: item.capacity,
            })),
            totalAmount: totalPrice,
            deliveryMethod: selectedDelivery,
            address: {
                fullName: customerName,
                phone,
                city,
                detailedAddress,
            },
            paymentMethod,
            orderStatus: "Đang xử lý",
        };

        try {
            const newOrder = await createOrder(orderData);

            // ✅ Clear cart và gọi lại getCart để cập nhật UI
            clearCart();        // xóa trong store Zustand
            navigate("/")

            // gọi lại giỏ hàng từ backend hoặc local để cập nhật UI

            // Thông báo thành công
            // toast.success("Đặt hàng thành công! Giỏ hàng đã được reset.");

            // Optional: chuyển trang xác nhận
            // navigate(`/order/${newOrder._id}`);
        } catch (error) {
            console.error("Lỗi đặt hàng:", error);
            toast.error(error.response?.data?.message || "Lỗi khi tạo đơn hàng");
        }
    };




    console.log(cart, "cart");


    useEffect(() => {
        getCart();
    }, [getCart]);



    useEffect(() => {
        console.log("Cập nhật giỏ hàng:", cart);
    }, [cart]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0);
        setTimeout(() => {
            setIsLoading(false);
        }, 400);
    }, []);


    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-24 sm:mt-28">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-xl font-semibold">Giỏ hàng của bạn</h2>
                <Link to="/" className="text-blue-500 text-sm">Về trang chủ</Link>
            </div>

            {/* Cart Items */}
            {cart.length > 0 ? (
                cart.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 mb-4 border-b pb-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg" />
                        <div className="flex-1 text-center sm:text-left">
                            <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                            <span className="text-gray-500 text-xs sm:text-sm">{item.color} - {item.capacity}</span>
                            <div className="flex gap-2 items-center justify-center sm:justify-start mt-2">
                                <button
                                    className="p-1 border border-gray-500 rounded-full"
                                    onClick={() => updateCartItem(item.productId, item.capacity, item.color, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="p-1 border border-gray-500 rounded-full"
                                    onClick={() => updateCartItem(item.productId, item.capacity, item.color, item.quantity + 1)}
                                >
                                    +
                                </button>


                            </div>
                        </div>
                        <span className="font-medium text-gray-700 text-sm sm:text-base">{(item.price * item.quantity).toLocaleString()}đ</span>
                        <button
                            className="text-red-500"
                            onClick={() => removeCartItem(item.productId, item.capacity, item.color)}
                        >
                            <MdDelete />
                        </button>

                    </div>
                ))
            ) : (
                <p className="text-center">Giỏ hàng trống</p>
            )}

            {/* Customer Info */}
            <div className="mt-6">
                <h3 className="font-semibold mb-2">Thông tin khách hàng</h3>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <input type="text" placeholder="Họ và Tên" className="w-full sm:w-1/2 p-2 border rounded-md" />
                    <input type="text" placeholder="Số điện thoại" className="w-full sm:w-1/2 p-2 border rounded-md" />
                </div>
            </div>

            {/* Delivery Method */}
            <div className="mt-6">
                <h3 className="font-semibold mb-2">Hình thức nhận hàng</h3>
                <div className="flex gap-4 mb-4">
                    <button
                        className={`p-2 border rounded-md flex-1 ${selectedDelivery === "delivery" ? "border-blue-500 text-blue-600" : ""}`}
                        onClick={() => setSelectedDelivery("delivery")}
                    >
                        Giao tận nơi
                    </button>
                    <button
                        className={`p-2 border rounded-md flex-1 ${selectedDelivery === "store" ? "border-blue-500 text-blue-600" : ""}`}
                        onClick={() => setSelectedDelivery("store")}
                    >
                        Nhận tại cửa hàng
                    </button>
                </div>
                {selectedDelivery === "delivery" && (
                    <div className="flex flex-col gap-2">
                        <select className="p-2 border rounded-md">
                            <option value="">Chọn tỉnh, thành phố</option>
                            <option>Hà Nội</option>
                            <option>TP. Hồ Chí Minh</option>
                            <option>An Giang</option>
                            <option>Bà Rịa - Vũng Tàu</option>
                            <option>Bắc Giang</option>
                            <option>Bắc Kạn</option>
                            <option>Bạc Liêu</option>
                            <option>Bắc Ninh</option>
                            <option>Bến Tre</option>
                            <option>Bình Định</option>
                            <option>Bình Dương</option>
                            <option>Bình Phước</option>
                            <option>Bình Thuận</option>
                            <option>Cà Mau</option>
                            <option>Cần Thơ</option>
                            <option>Cao Bằng</option>
                            <option>Đà Nẵng</option>
                            <option>Đắk Lắk</option>
                            <option>Đắk Nông</option>
                            <option>Điện Biên</option>
                            <option>Đồng Nai</option>
                            <option>Đồng Tháp</option>
                            <option>Gia Lai</option>
                            <option>Hà Giang</option>
                            <option>Hà Nam</option>
                            <option>Hà Tĩnh</option>
                            <option>Hải Dương</option>
                            <option>Hải Phòng</option>
                            <option>Hậu Giang</option>
                            <option>Hòa Bình</option>
                            <option>Hưng Yên</option>
                            <option>Khánh Hòa</option>
                            <option>Kiên Giang</option>
                            <option>Kon Tum</option>
                            <option>Lai Châu</option>
                            <option>Lâm Đồng</option>
                            <option>Lạng Sơn</option>
                            <option>Lào Cai</option>
                            <option>Long An</option>
                            <option>Nam Định</option>
                            <option>Nghệ An</option>
                            <option>Ninh Bình</option>
                            <option>Ninh Thuận</option>
                            <option>Phú Thọ</option>
                            <option>Phú Yên</option>
                            <option>Quảng Bình</option>
                            <option>Quảng Nam</option>
                            <option>Quảng Ngãi</option>
                            <option>Quảng Ninh</option>
                            <option>Quảng Trị</option>
                            <option>Sóc Trăng</option>
                            <option>Sơn La</option>
                            <option>Tây Ninh</option>
                            <option>Thái Bình</option>
                            <option>Thái Nguyên</option>
                            <option>Thanh Hóa</option>
                            <option>Thừa Thiên Huế</option>
                            <option>Tiền Giang</option>
                            <option>Trà Vinh</option>
                            <option>Tuyên Quang</option>
                            <option>Vĩnh Long</option>
                            <option>Vĩnh Phúc</option>
                            <option>Yên Bái</option>
                        </select>

                        <input type="text" placeholder="Địa chỉ cụ thể" className="p-2 border rounded-md" />
                    </div>
                )}
                {/* Payment Method */}
                <div className="mt-6">
                    <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="payment"
                                value="cod"
                                // checked={paymentMethod === "cod"}
                                // onChange={() => setPaymentMethod("cod")}
                                className="mr-2"
                            />
                            Thanh toán khi nhận hàng (COD)
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="payment"
                                value="bank"
                                // checked={paymentMethod === "bank"}
                                // onChange={() => setPaymentMethod("bank")}
                                className="mr-2"
                            />
                            Chuyển khoản ngân hàng
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="payment"
                                value="wallet"
                                // checked={paymentMethod === "wallet"}
                                // onChange={() => setPaymentMethod("wallet")}
                                className="mr-2"
                            />
                            Ví điện tử (Momo, ZaloPay, VNPay)
                        </label>

                    </div>
                </div>

            </div>

            {/* Total Price */}
            <div className="mt-6 flex justify-between font-semibold text-lg">
                <span>Tổng tiền:</span>
                <span className="text-red-500">{totalPrice.toLocaleString()}đ</span>
            </div>

            {/* Agree Terms */}
            <div className="mt-4 flex items-center">
                <input type="checkbox" id="agree" className="mr-2" checked={agreed} onChange={() => setAgreed(!agreed)} />
                <label htmlFor="agree" className="text-sm">
                    Tôi đã đọc và đồng ý với điều khoản và điều kiện
                </label>
            </div>

            {/* Checkout Button */}
            <button
                className={`mt-6 w-full py-2 rounded-md text-white font-semibold ${agreed && !loading ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
                    }`}
                disabled={!agreed || loading}
                onClick={handleCheckout}
            >
                {loading ? 'Đang xử lý...' : 'Tiến hành đặt hàng'}
            </button>
        </div>
    );
};

export default CartPage;

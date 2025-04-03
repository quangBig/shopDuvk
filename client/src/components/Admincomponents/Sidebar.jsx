import { FiHome, FiSettings, FiUser, FiChevronDown } from "react-icons/fi";
import { FaProductHunt } from "react-icons/fa6";
import { IoBagAdd } from "react-icons/io5";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useState } from "react";

const listItemMenu = [
    { to: "/secret-dashboard", label: "Bảng điều khiển", icon: <FiHome /> },
    { to: "/customers-dashboard", label: "Khách hàng", icon: <FiUser /> },
    { to: "/settings-dashboard", label: "Cài đặt", icon: <FiSettings /> }
];


const Sidebar = () => {
    const [isProductOpen, setIsProductOpen] = useState(false);

    return (

        <div className="w-64 h-[200%] bg-gray-900 text-white p-5 flex flex-col">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 mb-5">
                <img src="/logoapple.jpg" alt="Shopdunk Logo" className="h-8 rounded-full" />
                <hr className="h-8 w-0.5 bg-gray-500 hidden sm:block" />
                <span className="text-sm hidden sm:block">Authorised Reseller</span>
            </Link>

            {/* Danh sách menu */}
            <ul className="space-y-4">
                {listItemMenu.map((item, index) => (
                    <li key={index}>
                        <Link to={item.to} className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
                            {item.icon} {item.label}
                        </Link>
                    </li>
                ))}

                {/* Product Dropdown */}
                <li>
                    <button
                        onClick={() => setIsProductOpen(!isProductOpen)}
                        className="w-full flex items-center justify-between p-2 hover:bg-gray-800 rounded"
                    >
                        <span className="flex items-center gap-2">
                            <LuShoppingCart /> Sản phẩm
                        </span>
                        <FiChevronDown className={`transition-transform ${isProductOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isProductOpen && (
                        <ul className="ml-6 mt-2 space-y-2">
                            <li>
                                <Link to="/products/allProducts" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
                                    <FaProductHunt /> Tất cả sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link to="/products/createProducts" className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded">
                                    <IoBagAdd /> Tạo thêm sản phẩm
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </div>

    );
};

export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { IoLogoTiktok } from "react-icons/io5";
import { SiZalo } from "react-icons/si";

const Footer = () => {
    return (
        <div className="pt-10">
            <footer className="bg-[#1d1d1f] text-white py-10">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* Logo và giới thiệu */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2 cursor-pointer">
                            <img src="/logoapple.jpg" alt="Shopdunk Logo" className="h-8 rounded-full" />
                            <hr className="h-8 w-0.5 bg-gray-400 hidden sm:block" />
                            <span className="text-sm hidden sm:block">Authorised Reseller</span>
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Năm 2020, ShopDunk trở thành đại lý ủy quyền của Apple. Chúng tôi phát triển chuỗi cửa hàng tiêu chuẩn và Apple Mono Store nhằm mang đến trải nghiệm tốt nhất về sản phẩm và dịch vụ của Apple cho người dùng Việt Nam.
                        </p>

                        {/* Social Media */}
                        <div className="flex space-x-4">
                            <a href="#" className="border border-gray-400 rounded-full p-2 hover:bg-gray-600 transition">
                                <FaFacebookF className="text-blue-600" />
                            </a>
                            <a href="#" className="border border-gray-400 rounded-full p-2 hover:bg-gray-600 transition">
                                <IoLogoTiktok className="text-white" />
                            </a>
                            <a href="#" className="border border-gray-400 rounded-full p-2 hover:bg-gray-600 transition">
                                <SiZalo className="text-blue-600" />
                            </a>
                            <a href="#" className="border border-gray-400 rounded-full p-2 hover:bg-gray-600 transition">
                                <FaYoutube className="text-red-500" />
                            </a>
                        </div>
                    </div>

                    {/* Thông tin */}
                    <div>
                        <h3 className="text-lg font-semibold">Thông tin</h3>
                        <ul className="mt-2 space-y-2 text-gray-400 text-sm">
                            <li><a href="#">Newsfeed</a></li>
                            <li><a href="#">Giới thiệu</a></li>
                            <li><a href="#">Check IMEI</a></li>
                            <li><a href="#">Phương thức thanh toán</a></li>
                            <li><a href="#">Thuê điểm bán lẻ</a></li>
                            <li><a href="#">Bảo hành và sửa chữa</a></li>
                            <li><a href="#">Tuyển dụng</a></li>
                            <li><a href="#">Đảm bảo chất lượng, khiếu nại</a></li>
                            <li><a href="#">Tra cứu hóa đơn điện tử</a></li>
                        </ul>
                    </div>

                    {/* Chính sách */}
                    <div>
                        <h3 className="text-lg font-semibold">Chính sách</h3>
                        <ul className="mt-2 space-y-2 text-gray-400 text-sm">
                            <li><a href="#">Thu cũ đổi mới</a></li>
                            <li><a href="#">Giao hàng</a></li>
                            <li><a href="#">Đổi trả</a></li>
                            <li><a href="#">Bảo hành</a></li>
                            <li><a href="#">Hủy giao dịch</a></li>
                            <li><a href="#">Giải quyết khiếu nại</a></li>
                            <li><a href="#">Bảo mật thông tin</a></li>
                            <li><a href="#">Hướng dẫn thanh toán qua VNPAY</a></li>
                        </ul>
                    </div>

                    {/* Liên hệ */}
                    <div>
                        <h3 className="text-lg font-semibold">Liên hệ</h3>
                        <ul className="mt-2 space-y-2 text-gray-400 text-sm">
                            <li>Mua hàng: <a href="tel:19006626" className="text-blue-400">1900.6626</a></li>
                            <li>Bảo hành: <a href="tel:19008036" className="text-blue-400">1900.8036</a></li>
                            <li>Doanh nghiệp: <a href="tel:0822688668" className="text-blue-400">0822.688.668</a></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between px-6">
                    <div className="text-gray-500 text-xs text-center md:text-left">
                        <p>&copy; 2016 Công ty Cổ Phần HESMAN Việt Nam GPDKKD: 0107465657 do Sở KH & ĐT TP. Hà Nội cấp ngày 08/06/2016.</p>
                        <p>Địa chỉ: Số 76 Thái Hà, phường Trung Liệt, quận Đống Đa, thành phố Hà Nội, Việt Nam</p>
                        <p>Đại diện pháp luật: PHẠM MẠNH HÒA | ĐT: 0247.305.9999 | Email: lienhe@shopdunk.com</p>
                    </div>

                    {/* Bộ Công Thương */}
                    <div className="mt-4 md:mt-0">
                        <img src="https://shopdunk.com/images/uploaded-source/Trang%20ch%E1%BB%A7/Bocongthuong.png" alt="Bộ Công Thương" className="h-10 w-36" />
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

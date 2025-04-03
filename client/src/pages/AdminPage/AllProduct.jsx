import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Admincomponents/Sidebar'
import MenuAccount from '../../components/Header/MenuAccount'
import AllProducts from '../../components/Admincomponents/AllProducts'
import { FaApple } from 'react-icons/fa6'

const AllProduct = () => {
    const [isLoading, setIsloading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);

        setTimeout(() => {
            setIsloading(false);
        }, 400)

    })
    return (
        <div className="flex h-screen">
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-500">
                    <FaApple className="text-white text-6xl animate-bounce opacity-100" />
                </div>
            )}
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Danh sách sản phẩm</h1>
                    <div className="flex items-center gap-4">
                        <MenuAccount className="w-10 h-10" />
                    </div>
                </div>
                <AllProducts />
            </div>
        </div>
    )
}

export default AllProduct

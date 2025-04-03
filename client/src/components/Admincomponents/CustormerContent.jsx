import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { MenuItem, Select, TextField } from "@mui/material";
import useOrderStore from "../../stores/useOrderStore";

// Match these with your backend schema
const statusOptions = [
    { value: "Đang xử lý", label: "Đang xử lý" },
    { value: "Đang giao hàng", label: "Đang giao hàng" },
    { value: "Đơn hàng hoàn thành", label: "Đơn hàng hoàn thành" },
    { value: "Đơn hàng hủy", label: "Đơn hàng hủy" },
];

const CustomerContent = () => {
    const { orders, fetchAllOrders, updateOrderStatus, loading } = useOrderStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [localOrders, setLocalOrders] = useState([]);

    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    useEffect(() => {
        if (orders) {
            setLocalOrders(
                orders.map((order) => ({
                    id: order._id,
                    name: order.address?.fullName || "Khách hàng ẩn danh",
                    phone: order.address?.phone || "Không có SĐT",
                    address: order.address?.detailedAddress || "Không có địa chỉ",
                    totalAmount: order.totalAmount.toLocaleString('vi-VN') + '₫',
                    orderStatus: order.orderStatus,
                    products: order.items.map((item) => item.name).join(", "),
                    productImages: order.items.map((item) => item.image),
                    createdAt: new Date(order.createdAt).toLocaleDateString('vi-VN'),
                }))
            );
        }
    }, [orders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrderStatus(orderId, newStatus);
            // Update local state optimistically
            setLocalOrders(prev => prev.map(order =>
                order.id === orderId ? { ...order, orderStatus: newStatus } : order
            ));
        } catch (error) {
            console.error("Failed to update order status:", error);
            // Optionally show error notification
        }
    };

    const filteredCustomers = localOrders.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.phone.includes(searchTerm)
    );

    const columns = [
        { field: "id", headerName: "Mã đơn hàng", width: 150 },
        { field: "name", headerName: "Họ và tên", width: 180 },
        { field: "phone", headerName: "Số điện thoại", width: 140 },
        { field: "address", headerName: "Địa chỉ", width: 300, flex: 1 },
        { field: "totalAmount", headerName: "Tổng tiền", width: 120 },
        { field: "createdAt", headerName: "Ngày đặt", width: 120 },
        {
            field: "products",
            headerName: "Sản phẩm",
            width: 400,
            flex: 1,
            renderCell: (params) => (
                <div className="line-clamp-2">
                    {params.value}
                </div>
            )
        },
        {
            field: "productImages",
            headerName: "Hình ảnh",
            width: 120,
            renderCell: (params) => (
                <div className="flex gap-2">
                    {params.value?.slice(0, 2).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Sản phẩm"
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                                e.target.src = '/placeholder-product.jpg';
                            }}
                        />
                    ))}
                    {params.value?.length > 2 && (
                        <div className="w-10 h-12 bg-gray-100 rounded flex items-center justify-center text-xs">
                            +{params.value.length - 2}
                        </div>
                    )}
                </div>
            ),
        },
        {
            field: "orderStatus",
            headerName: "Trạng thái",
            width: 200,
            renderCell: (params) => (
                <Select
                    value={params.row.orderStatus}
                    onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
                    size="small"
                    disabled={loading}
                    className="text-black font-semibold rounded px-[2px] py-[2px]"
                    sx={{
                        width: '100%',
                        '& .MuiSelect-select': {
                            fontWeight: 'bold',
                            padding: '3px 8px',
                            margin: '0 4px',
                            // color: getStatusColor(params.row.orderStatus),
                        }
                    }}
                >
                    {
                        statusOptions.map((option) => (
                            <MenuItem
                                key={option.value}
                                value={option.value}
                                sx={{ color: getStatusColor(option.value) }}
                            >
                                {option.label}
                            </MenuItem>
                        ))
                    }
                </Select >
            ),
        },
    ];

    // Helper function to get color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Đơn hàng hoàn thành':
                return '#10B981'; // green
            case 'Đang giao hàng':
                return '#3B82F6'; // blue
            case 'Đơn hàng hủy':
                return '#EF4444'; // red
            default:
                return '#F59E0B'; // yellow (for processing)
        }
    };

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h1 className="text-xl font-bold text-gray-800 mb-4">Quản lý đơn hàng</h1>

                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                    <TextField
                        label="Tìm kiếm theo tên hoặc SĐT"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        size="small"
                        fullWidth
                        sx={{ maxWidth: 400 }}
                    />
                </div>

                <div className="rounded-lg border border-gray-200 overflow-hidden">
                    <DataGrid
                        rows={filteredCustomers}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[5, 10, 20]}
                        disableSelectionOnClick
                        autoHeight
                        loading={loading}
                        sx={{
                            '& .MuiDataGrid-cell': {
                                py: 1,
                            },
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#F3F4F6',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomerContent;
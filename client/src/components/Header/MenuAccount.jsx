import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const MenuAccount = () => {
    const { user, logout } = useUserStore();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
        handleClose();
        navigate("/");
    };

    return (
        <div className="flex  items-center -ml-4">
            <Button
                id="account-menu-button"
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                {user ? (
                    <img src="/userdf.jpg" alt="" className="w-7 h-7 rounded-full" />
                ) : (
                    <FiUser className="text-xl text-white hover:text-black" />
                )}
            </Button>
            <Menu
                id="account-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                {user
                    ? [].concat(
                        <MenuItem key="profile" onClick={handleClose}>
                            <Link to="/profile" className="text-black">Hồ sơ</Link>
                        </MenuItem>,
                        user.role === "admin" && [
                            <div key="divider1" className="flex items-center justify-center p-2">
                                <hr className="h-[1px] w-[90%] bg-gray-400" />
                            </div>,
                            <MenuItem key="dashboard" onClick={handleClose}>
                                <Link to="/secret-dashboard" className="text-black">Dashboard</Link>
                            </MenuItem>
                        ],
                        <div key="divider2" className="flex items-center justify-center p-2">
                            <hr className="h-[1px] w-[90%] bg-gray-400" />
                        </div>,
                        <MenuItem key="logout" onClick={handleLogout}>Đăng xuất</MenuItem>
                    )
                    : [].concat(
                        <MenuItem key="signup" onClick={handleClose}>
                            <Link to="/sign-up" className="text-black">Tạo tài khoản ngay</Link>
                        </MenuItem>,
                        <div key="divider3" className="flex items-center justify-center p-2">
                            <hr className="h-[1px] w-[90%] bg-gray-400" />
                        </div>,
                        <MenuItem key="login" onClick={handleClose}>
                            <Link to="/login" className="text-black">Đăng nhập</Link>
                        </MenuItem>
                    )}
            </Menu>
        </div>
    );
};

export default MenuAccount;

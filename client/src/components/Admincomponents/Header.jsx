import { FiBell, FiUser } from "react-icons/fi";
import MenuAccount from "../Header/MenuAccount";

const Header = () => {
    return (
        <div className="w-full bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-4">
                <MenuAccount className="w-10 h-10" />
            </div>
        </div>
    );
};

export default Header;

import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Bus,
  Users,
  Ticket,
  LogOut
} from "lucide-react";
import { logoutUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Buses", icon: <Bus size={20} />, path: "/admin/buses" },
    { name: "Bookings", icon: <Ticket size={20} />, path: "/admin/view-bookings" },
    { name: "Users", icon: <Users size={20} />, path: "/admin/view-users" },
  ];
 const dispatch=useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 flex flex-col">
      
      {/* LOGO */}
      <div className="flex items-center mb-10">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        <span className="ml-2 text-xl font-bold">ApnaBus Admin</span>
      </div>

      {/* MENU ITEMS */}
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* FOOTER WITH LOGOUT BUTTON */}
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition text-white font-medium"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}

export default AdminSidebar;

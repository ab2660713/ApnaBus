import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Bus,
  Users,
  Ticket,
  Settings,
} from "lucide-react";

function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    { name: "Buses", icon: <Bus size={20} />, path: "/admin/buses" },
    { name: "Bookings", icon: <Ticket size={20} />, path: "/admin/view-bookings" },
    { name: "Users", icon: <Users size={20} />, path: "/admin/view-users" },
  
  ];
  

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 hidden lg:block">
      <div className="flex items-center mb-8">
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

      <nav className="space-y-2">
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

      <div className="fixed bottom-4 right-4 w-64">
  <div className="bg-white shadow-lg rounded-lg p-4 flex items-center gap-3">
    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
      A
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-900">Admin User</p>
      <p className="text-xs text-gray-500">admin@apnabus.com</p>
    </div>
  </div>
</div>

    </aside>
  );
}

export default AdminSidebar;

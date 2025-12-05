import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <AdminSidebar />

      {/* Right side content */}
      <div className="flex-1 ml-0 md:ml-64 p-6 bg-gray-50 min-h-screen">
        {children}
      </div>
    </div>
  );
}

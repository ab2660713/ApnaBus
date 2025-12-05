import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import AdminSidebar from "../components/AdminSidebar";
import { Banknote, Ticket, Bus, Users, Plus, Edit, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [buses, setBuses] = useState([]);
const navigate=useNavigate()
  const token = localStorage.getItem("token");
  const deleteBus = async (id) => {
    if (!confirm("Are you sure you want to delete this bus?")) return;
  
    try {
      await axios.delete(`/api/admin/bus/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setBuses(buses.filter((b) => b._id !== id));
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };
  
  
  // FETCH STATS
  const fetchStats = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard-stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.log("Stats Error:", err);
    }
  };

  // FETCH BUSES
  const fetchBuses = async () => {
    try {
      const res = await axios.get("/api/admin/buses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBuses(res.data);
    } catch (err) {
      console.log("Bus Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchBuses();
  }, []);

  return (
    <div className="flex bg-gray-100">
      {/* SIDEBAR */}
      <div className="sticky top-0 h-screen">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back, Admin!</p>

        {/* STATS SECTION */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="shadow-md p-5">
              <CardContent className="flex justify-between items-center p-0">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold">
                    ₹{stats.totalRevenue || 0}
                  </h3>
                </div>
                <Banknote className="text-green-600 w-10 h-10" />
              </CardContent>
            </Card>

            <Card className="shadow-md p-5">
              <CardContent className="flex justify-between items-center p-0">
                <div>
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
                </div>
                <Ticket className="text-blue-600 w-10 h-10" />
              </CardContent>
            </Card>

            <Card className="shadow-md p-5">
              <CardContent className="flex justify-between items-center p-0">
                <div>
                  <p className="text-sm text-gray-500">Active Buses</p>
                  <h3 className="text-2xl font-bold">{stats.activeBuses}</h3>
                </div>
                <Bus className="text-yellow-600 w-10 h-10" />
              </CardContent>
            </Card>

            <Card className="shadow-md p-5">
              <CardContent className="flex justify-between items-center p-0">
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                </div>
                <Users className="text-purple-600 w-10 h-10" />
              </CardContent>
            </Card>
          </div>
        )}

        {/* RECENT BUSES */}
        <Card className="shadow-md mb-10">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">All Buses</h2>

              <Link
                to="/admin/bus"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
              >
                <Plus className="w-5 h-5" /> Add Bus
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left">Name</th>
                    <th className="py-3 text-left">Route</th>
                    <th className="py-3 text-left">Type</th>
                    <th className="py-3 text-left">Seats</th>
                    <th className="py-3 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus._id} className="border-b hover:bg-gray-50">
                      <td className="py-3">{bus.name}</td>
                      <td className="py-3">
                        {bus.pickupLocation} → {bus.dropLocation}
                      </td>
                      <td className="py-3">{bus.busType}</td>
                      <td className="py-3">{bus.totalSeats}</td>

                      <td className="py-3">
                        <div className="flex gap-3">

                          {/* EDIT BUTTON */}
                          
                          <button
                              onClick={() => navigate(`/admin/bus/${bus._id}`)}
                              className="text-blue-600 hover:text-blue-800 "
                            >
                              <Edit className="w-5 h-5" />
                              
                            </button>

                          {/* DELETE BUTTON */}
                          <button
  onClick={() => deleteBus(bus._id)}
  className="text-red-600 hover:text-red-800"
>
  <Trash className="w-5 h-5" />
</button>


                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default AdminDashboard;

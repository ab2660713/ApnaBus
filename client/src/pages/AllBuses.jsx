// src/pages/AllBuses.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Edit, Plus } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AllBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
const {id}=useParams()
  const authHeader = { 
    headers: { Authorization: `Bearer ${token}` } 
  };

  
  useEffect(() => {
    getAllBuses();
  }, []);
  async function getAllBuses() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/buses", authHeader);
      setBuses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching buses:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">All Buses</h1>
            <p className="text-sm text-gray-600">Manage buses — view or edit.</p>
          </div>

          <Link
            to="/admin/bus/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={16} /> Add Bus
          </Link>
        </div>

        <Card>
          <CardContent>
            {loading ? (
              <div className="py-6 text-center text-gray-600">Loading buses...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-3">Name</th>
                      <th className="py-3">Route</th>
                      <th className="py-3">Type</th>
                      <th className="py-3">Seats</th>
                      <th className="py-3">Rating</th>
                      <th className="py-3">Fare</th>
                      <th className="py-3">Active</th>
                      <th className="py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {buses.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-gray-500">
                          No buses found.
                        </td>
                      </tr>
                    ) : (
                      buses.map((bus) => (
                        <tr key={bus._id} className="border-b hover:bg-gray-50">
                          <td className="py-4 font-medium">{bus.name}</td>

                          <td className="py-4 text-gray-600">
                            {bus.pickupLocation} → {bus.dropLocation}
                          </td>

                          <td className="py-4">
                            {bus.busType === "ac"
                              ? "AC"
                              : bus.busType === "non-ac"
                              ? "Non-AC"
                              : "Sleeper"}
                          </td>

                          <td className="py-4">
                            {bus.availableSeats}/{bus.totalSeats}
                          </td>
                          <div className="flex items-center">
  <span>⭐</span>
  <span className="ml-1">{bus.rating}</span>
</div>

                          <td className="py-4">₹{bus.fare}</td>

                          <td className="py-4">
                            <Badge
                              className={
                                bus.isActive
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                            >
                              {bus.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </td>

                          <td className="py-4">
                            <button
                              onClick={() => navigate(`/admin/bus/${bus._id}`)}
                              className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                              <Edit className="w-5 h-5" />
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

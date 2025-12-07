import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import { Card, CardContent } from "../components/ui/card";
import { Eye, Pencil } from "lucide-react";
import { toast } from "react-toastify";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const [editData, setEditData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (booking) => {
    setEditData({
      _id: booking._id,
      status: booking.status,
      ticketCount: booking.ticketCount
    });
    setIsOpen(true);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const authHeader = {
    headers: { Authorization: `Bearer ${token}` }
  };

  async function fetchBookings() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/view-bookings", authHeader);

      setBookings(Array.isArray(data.bookings) ? data.bookings : data);

    } catch (err) {
      console.error("Fetch bookings failed", err);
    } finally {
      setLoading(false);
    }
  }

  const updateBooking = async () => {
    try {
      const res = await axios.put(
        `/api/booking/${editData._id}`,
        {
          status: editData.status,
          ticketCount: editData.ticketCount
        },
        authHeader
      );

      toast.success("Booking Updated Successfully!");

      // 🔥 UI me real-time update
      setBookings((prev) =>
        prev.map((b) =>
          b._id === editData._id ? { ...b, ...editData } : b
        )
      );

      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Booking!");
    }
  };

  // 🔥 Status Badge Component
  const StatusBadge = ({ status }) => {
    const style = {
      accepted: "bg-green-100 text-green-700 border border-green-300",
      pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
      rejected: "bg-red-100 text-red-700 border border-red-300"
    };

    return (
      <span
        className={`px-3 py-1 text-sm font-semibold rounded-full ${style[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">All Bookings</h1>
          <p className="text-gray-600 mt-1">
            Full list of all users & their bus bookings.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent>
            {loading ? (
              <div className="text-center py-6 text-gray-500">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border rounded-lg">
                  <thead>
                    <tr className="bg-gray-100 border-b text-left">
                      {[
                        "Booking ID",
                        "User",
                        "Bus Name",
                        "Tickets",
                        "Amount",
                        "Date",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="py-3 px-4 text-gray-700 font-semibold uppercase text-xs"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr>
                        <td
                          colSpan="8"
                          className="py-6 text-center text-gray-500"
                        >
                          No bookings found
                        </td>
                      </tr>
                    ) : (
                      bookings.map((b) => (
                        <tr
                          key={b._id}
                          className="border-b hover:bg-gray-50 transition"
                        >
                          <td className="py-3 px-4 font-medium text-gray-700">
                            #{b._id.slice(-6)}
                          </td>

                          <td className="py-3 px-4 text-gray-700">
                            {b.user?.name || "Unknown"}
                          </td>

                          <td className="py-3 px-4 text-gray-700">
                            {b.bus?.name || "—"}
                          </td>

                          <td className="py-3 px-4 text-gray-700">
                            {b.ticketCount}
                          </td>

                          <td className="py-3 px-4 text-gray-700 font-semibold">
                            ₹{(b.bus?.fare || 0) * b.ticketCount}
                          </td>

                          <td className="py-3 px-4 text-gray-700">
                            {new Date(b.date).toLocaleString()}
                          </td>

                          <td className="py-3 px-4">
                            <StatusBadge status={b.status} />
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex gap-3 items-center">

                              <Eye className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer" />

                              {b.status !== "accepted" && (
                                <button
                                  onClick={() => handleEdit(b)}
                                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow"
                                >
                                  <Pencil size={14} />
                                  Edit
                                </button>
                              )}
                            </div>
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

        {/* EDIT MODAL */}
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate-fadeIn">
              <h2 className="text-xl font-bold mb-4">Edit Booking</h2>

              <label className="block mb-1 font-medium">Status</label>
              <select
                value={editData.status}
                onChange={(e) =>
                  setEditData({ ...editData, status: e.target.value })
                }
                className="w-full border p-2 rounded mb-4"
              >
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>

              <label className="block mb-1 font-medium">Ticket Count</label>
              <input
                type="number"
                className="w-full border p-2 rounded mb-4"
                value={editData.ticketCount}
                onChange={(e) =>
                  setEditData({ ...editData, ticketCount: e.target.value })
                }
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={updateBooking}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

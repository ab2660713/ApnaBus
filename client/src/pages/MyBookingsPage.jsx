import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";

function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("/api/booking/my-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data);
    } catch (err) {
      console.log("❌ ERROR LOADING BOOKINGS ", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(`/api/booking/cancel/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.log("❌ Cancel Error: ", err);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Header />

      {/* PAGE HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-14 shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-white tracking-wide">
          ✨ My Bookings
        </h1>
        <p className="text-center text-indigo-100 mt-2 text-lg">
          All your travel plans in one place 🚍
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  {/* 🔄 REFRESH BUTTON */}
  <button
    onClick={fetchBookings}
    className="mb-6 px-5 py-3 bg-blue-600 text-white font-bold rounded-xl shadow hover:bg-blue-700 transition"
  >
    Refresh Bookings 🔄
  </button>
        {bookings.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-gray-600 text-lg font-medium">
              You have no bookings yet 😕
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-3xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100"
              >
                {/* TOP ROW */}
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {b.bus?.name || "Bus Deleted"}
                  </h2>

                  <span
                    className={`px-4 py-1.5 text-sm rounded-full font-bold capitalize shadow-sm ${
                      b.status === "cancelled"
                        ? "bg-red-200 text-red-800"
                        : b.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : "bg-green-200 text-green-800"
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                {/* LOCATIONS */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                  <p className="text-lg">
                    <span className="font-bold">From: </span>
                    {b.bus?.pickupLocation || "N/A"}
                  </p>

                  <p className="text-lg">
                    <span className="font-bold">To: </span>
                    {b.bus?.dropLocation || "N/A"}
                  </p>
                </div>

                {/* DETAILS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <p className="text-gray-800">
                    <span className="font-semibold">Available Seats:</span>{" "}
                    {b.bus?.availableSeats ?? "N/A"}
                  </p>

                  <p className="text-gray-800">
                    <span className="font-semibold">Arrival Time:</span>{" "}
                    {b.bus?.arrivalTime ?? "N/A"}
                  </p>

                  <p className="text-gray-800">
                    <span className="font-semibold">Total Seats:</span>{" "}
                    {b.bus?.totalSeats ?? "N/A"}
                  </p>

                  <p className="text-gray-800">
                    <span className="font-semibold">Booking Date:</span>{" "}
                    {new Date(b.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* SEPARATOR */}
                <div className="border-t my-6" />

                {/* SEATS */}
                <p className="text-lg">
                  <span className="font-semibold">Your Seats:</span>{" "}
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-lg font-bold shadow-sm">
                    {b.ticketCount}
                  </span>
                </p>

                {/* CANCEL BUTTON */}
                {b.status !== "cancelled" && (
                  <button
                    onClick={() => cancelBooking(b._id)}
                    className="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl font-bold tracking-wide shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300"
                  >
                    Cancel Booking ❌
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
}

export default MyBookingsPage;

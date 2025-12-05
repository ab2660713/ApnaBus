import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PaymentSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Extract with fallback
  const booking = state?.booking;
  const bus = state?.bus;
  const passenger = state?.passenger;
  const selectedSeats = state?.selectedSeats || [];
  const totalFare = state?.totalFare || 0;

  // Redirect if no state
 // Redirect if no state
useEffect(() => {
    if (!booking || !bus || !passenger) {
      navigate("/");
    }
  }, [booking, bus, passenger, navigate]);
  
  
  // 👉 SEAT LOCK API CALL (Paste this here)
  useEffect(() => {
    if (!bus || selectedSeats.length === 0) return;
  
    const lockSeats = async () => {
      try {
        await axios.put("/api/bus/book-seats", {
          busId: bus._id,
          seats: selectedSeats,
        });
  
        console.log("Seats locked successfully");
      } catch (error) {
        console.log("❌ Failed to lock seats:", error);
      }
    };
  
    lockSeats();
  }, [bus, selectedSeats]);
   // Prevent render before redirect

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-700 mb-6">
          Your booking has been confirmed. Here are your details:
        </p>

        {/* QR Code */}
        <img
          src="/qr-sample.png"
          alt="Booking QR Code"
          className="w-48 h-48 mx-auto mb-4 border p-2 rounded-xl"
        />

        <div className="text-left space-y-2">
          <p>
            <strong>Bus:</strong> {bus?.name || "N/A"}
          </p>
          <p>
            <strong>Route:</strong> {bus?.pickupLocation || "N/A"} ➝ {bus?.dropLocation || "N/A"}
          </p>
          <p>
            <strong>Seats:</strong> {selectedSeats.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Passenger:</strong> {passenger?.name || "N/A"} ({passenger?.age || "-"} yrs, {passenger?.gender || "-"})
          </p>
          {passenger?.phone && (
            <p>
              <strong>Phone:</strong> {passenger.phone}
            </p>
          )}
          {passenger?.email && (
            <p>
              <strong>Email:</strong> {passenger.email}
            </p>
          )}
          <p className="text-lg font-bold text-green-700">
            Total Paid: ₹{totalFare || 0}
          </p>
        </div>

        <button
          onClick={() => navigate("/my-bookings")}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccessPage;

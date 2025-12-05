import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function CheckoutPage() {
  const { state } = useLocation();
  const bus = state?.bus;
  const selectedSeats = state?.selectedSeats || [];
  const totalFare = state?.totalFare || 0;
const navigate=useNavigate()
  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };
  const handlePay = async () => {
    if (!passenger.name || !passenger.age || !passenger.gender || !passenger.phone) {
      return alert("Please fill all details");
    }
  
    try {
      const token = localStorage.getItem("token");
  
      // Correct route: POST /api/booking/:bsid
      const res = await axios.post(
        `/api/booking/${bus._id}`,
        {
          ticketCount: selectedSeats.length
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Go to payment page
      navigate("/payment", {
        state: {
          booking: res.data,
          bus,
          selectedSeats,
          totalFare,
          passenger,
        }
      });
  
    } catch (err) {
      console.log("❌ Booking Error", err);
      alert("Booking failed");
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        
        {/* LEFT - Passenger Form */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Passenger Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <select
              name="gender"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email (optional)"
              className="border p-3 rounded-lg"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* RIGHT - Summary */}
        <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-20">
          <h2 className="text-xl font-semibold mb-3">Booking Summary</h2>

          <p className="text-gray-700">
            <strong>Bus:</strong> {bus?.name}
          </p>

          <p className="text-gray-700 mt-1">
            <strong>Route:</strong> {bus?.pickupLocation} ➝ {bus?.dropLocation}
          </p>

          <p className="text-gray-700 mt-1">
            <strong>Seats:</strong> {selectedSeats.join(", ")}
          </p>

          <p className="text-gray-700 mt-1">
            <strong>Fare per seat:</strong> ₹{bus?.fare}
          </p>

          <hr className="my-3" />

          <p className="text-2xl font-bold text-green-700">
            Total: ₹{totalFare}
          </p>

          <button
            onClick={handlePay}
            className="w-full mt-5 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

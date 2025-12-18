import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../components/Header";

function BusDetailsPage() {
  const { id } = useParams();
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);

  const [seatStatus, setSeatStatus] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  // Fetch bus details
  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axios.get(`/api/bus/${id}`);
        setBus(res.data);

        const total = res.data.totalSeats;
        const booked = res.data.bookedSeats || [];
        const locked = res.data.lockedSeats || [];

        // Mark booked + locked + available
        const initial = Array.from({ length: total }, (_, i) => {
          const seatNum = i + 1;
          if (booked.includes(seatNum)) return "booked";
          if (locked.includes(seatNum)) return "locked";
          return "available";
        });

        setSeatStatus(initial);
      } catch (error) {
        console.log("❌ Error fetching bus →", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBus();
  }, [id]);

  // Select seat (with backend lock)
  const toggleSeat = async (index) => {
    const seatNumber = index + 1;

    // Prevent selecting booked/locked seats
    if (seatStatus[index] === "booked" || seatStatus[index] === "locked") {
      alert(`Seat ${seatNumber} is not available.`);
      return;
    }

    // 4 seat limit
    if (seatStatus[index] === "available" && selectedSeats.length >= 4) {
      alert("You can select a maximum of 4 seats.");
      return;
    }

    // ⛔ CALL BACKEND TO LOCK SEAT
    try {
      const res = await axios.post("/api/bus/lock-seat", {
        busId: bus._id,
        seatNumber,
      
      });

      if (!res.data.success) {
        alert(`Seat ${seatNumber} is already locked or booked.`);
        return;
      }
    } catch (err) {
      alert("Seat unavailable or someone locked it before you.");
      return;
    }

    // Update UI
    setSeatStatus((prev) =>
      prev.map((v, i) => (i === index ? (v === "selected" ? "available" : "selected") : v))
    );

    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const getColor = (s) =>
    s === "available"
      ? "bg-gray-200 hover:bg-blue-100 cursor-pointer"
      : s === "selected"
      ? "bg-blue-600 text-white cursor-pointer"
      : s === "locked"
      ? "bg-yellow-400 cursor-not-allowed"
      : "bg-gray-500 cursor-not-allowed"; // booked seat

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!bus) return <p className="text-center mt-10">Bus not found</p>;

  const seatsPerRow = 4;
  const rows = Math.ceil(bus.totalSeats / seatsPerRow);
  const totalFare = selectedSeats.length * bus.fare;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-6xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8">
        {/* LEFT */}
        <div className="flex-1">

          {/* Bus Card */}
          <div className="relative overflow-hidden rounded-2xl p-6 md:p-8 shadow-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
            <h1 className="text-3xl md:text-4xl font-extrabold">{bus.name}</h1>

            <p className="text-lg md:text-xl mt-3">
              {bus.pickupLocation} ➝ {bus.dropLocation}
            </p>

            <p className="mt-3 text-white/80">
              Type: <span className="font-semibold">{bus.busType.toUpperCase()}</span>
            </p>

            <p className="mt-2 text-white/80">
              Departure: <span className="font-semibold">{bus.departureTime}</span> | Arrival:{" "}
              <span className="font-semibold">{bus.arrivalTime}</span>
            </p>

            <p className="mt-6 text-3xl font-extrabold text-yellow-300">
              ₹{bus.fare} <span className="text-sm text-white/80">/seat</span>
            </p>
          </div>

          {/* Seat Layout */}
          <div className="bg-white shadow-md rounded-xl p-6 mt-6">
            <h3 className="text-lg font-semibold mb-4">Select Your Seats</h3>

            {/* Legends */}
            <div className="flex gap-6 flex-wrap mb-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-gray-200 rounded" /> Available
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-blue-600 rounded" /> Selected
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-yellow-400 rounded" /> Locked
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-gray-500 rounded" /> Booked
              </div>
            </div>

            {/* Driver */}
            <div className="w-full flex justify-center mb-4">
              <div className="bg-lime-300 px-5 py-2 rounded-t-lg text-sm font-medium">
                Driver
              </div>
            </div>

            {/* Seats Grid */}
            <div className="flex justify-center overflow-x-auto">
              <div className="grid gap-2">
                {Array.from({ length: rows }).map((_, row) => (
                  <div key={row} className="flex gap-2 justify-center">
                    {Array.from({ length: seatsPerRow }).map((_, col) => {
                      const index = row * seatsPerRow + col;
                      if (index >= bus.totalSeats) return null;

                      return (
                        <div
                          key={col}
                          onClick={() => toggleSeat(index)}
                          className={`w-10 h-10 md:w-12 md:h-12 rounded flex items-center justify-center 
                                      font-medium transition 
                                      ${getColor(seatStatus[index])}
                                      ${col === 1 ? "mr-5" : ""}`}
                        >
                          {index + 1}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected seats */}
            {selectedSeats.length > 0 && (
              <p className="text-center text-lg font-semibold mt-6">
                Selected Seats: {selectedSeats.join(", ")}
              </p>
            )}

            <p className="text-center text-2xl font-bold text-green-700 mt-3">
              Total Fare: ₹{totalFare}
            </p>
          </div>
        </div>

        {/* RIGHT Summary */}
        <div className="w-full md:w-80">
          <div className="bg-white shadow-lg rounded-xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">Payment Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Fare per seat</span>
              <span>₹{bus.fare}</span>
            </div>

            <div className="flex justify-between mb-2">
              <span>Selected Seats</span>
              <span>{selectedSeats.length}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total Price</span>
              <span>₹{totalFare}</span>
            </div>

            <button
              onClick={() => {
                if (selectedSeats.length === 0) {
                  alert("❗ Please select at least 1 seat.");
                  return;
                }

                navigate("/checkout", {
                  state: {
                    bus,
                    selectedSeats,
                    totalFare,
                  },
                });
              }}
              className="mt-5 w-full bg-cyan-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-cyan-700 transition"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusDetailsPage;

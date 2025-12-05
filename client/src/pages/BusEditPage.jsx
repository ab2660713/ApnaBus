import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";

export default function BusEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState({
    name: "",
    registration: "",
    model: "",
    totalSeats: "",
    availableSeats: "",
    busType: "",
    pickupLocation: "",
    dropLocation: "",
    departureTime: "",
    arrivalTime: "",
    fare: "",
    rating:0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const token = localStorage.getItem("token"); // FIXED
      
        const res = await axios.get(`/api/admin/bus/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setBus(res.data);
        setLoading(false);
  
      } catch (err) {
        console.log("FETCH BUS ERROR →", err);
        setLoading(false);
      }
    };
  
    fetchBus();
  }, [id]);
  
  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const token = localStorage.getItem("token");
  
      await axios.put(`/api/admin/bus/${id}`, bus, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      navigate("/admin/buses");
  
    } catch (err) {
      console.log("UPDATE ERROR →", err);
      alert("Unauthorized - Admin token missing");
    }
  };
  

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 pb-20 md:pb-0">
    <Header />
    <MobileNav />
  
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Edit Bus</h1>
  
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Bus Name</label>
          <input type="text" name="name" value={bus.name} onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Registration</label>
            <input type="text" name="registration" value={bus.registration} onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Model</label>
            <input type="text" name="model" value={bus.model} onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Total Seats</label>
            <input type="number" name="totalSeats" value={bus.totalSeats} onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Available Seats</label>
            <input type="number" name="availableSeats" value={bus.availableSeats} onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Bus Type</label>
          <select name="busType" value={bus.busType} onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="ac">AC</option>
            <option value="non-ac">Non AC</option>
            <option value="sleeper">Sleeper</option>
          </select>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Pickup Location</label>
            <input type="text" name="pickupLocation" value={bus.pickupLocation} onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Drop Location</label>
            <input type="text" name="dropLocation" value={bus.dropLocation} onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Departure Time</label>
            <input type="text" name="departureTime" value={bus.departureTime} onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
  
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Arrival Time</label>
            <input type="text" name="arrivalTime" value={bus.arrivalTime} onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>
        <div>
  <label className="block font-semibold">Rating</label>
  <input
    type="number"
    name="rating"
    min="0"
    max="5"
    step="0.1"
    className="border p-2 w-full rounded"
    value={bus.rating}
    onChange={handleChange}
  />
</div>

        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-1">Fare (₹)</label>
          <input type="number" name="fare" value={bus.fare} onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
  
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-md"
        >
          Update Bus
        </button>
      </form>
    </div>
  </div>
  
  );
}

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import renderStars from "../components/ui/RenderStar";

function SearchResultsPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const from = query.get("from");
  const to = query.get("to");
  const date = query.get("date");
 const {id}=useParams()
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const load = async () => {
      try {
        if (from && to ) {
          // USER SEARCHED → Load filtered buses
          const res = await axios.get(`/api/bus/search?from=${from}&to=${to}&date=${date}`);
          setBuses(res.data);
        } else {
          // USER DIRECTLY OPENED /buses → Load all buses
          const res = await axios.get("/api/bus");
          setBuses(res.data);
        }
      } catch (err) {
        console.log("Error →", err);
      }
      setLoading(false);
    };
  
    load();
  }, [from, to, date]);
  
  const navigate=useNavigate()
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
  
      <div className="max-w-5xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">
          Buses from {from} → {to}
        </h1>
        <p className="text-gray-600 mb-8 text-lg">Date: {date}</p>
  
        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        ) : buses.length === 0 ? (
          <p className="text-center text-red-600 text-xl font-semibold">
            No buses found
          </p>
        ) : (
          buses.map((bus) => (
            <div
              key={bus._id}
              className="bg-white border shadow-md p-6 rounded-2xl mb-6 hover:shadow-xl transition"
            >
              {/* Bus Name + Type */}
              <div className="flex justify-between items-center mb-3">
              <div>
    <h2 className="text-xl font-bold text-gray-900">{bus.name}</h2>
    <p className="text-sm text-gray-500 capitalize">
      {bus.busType} bus • {bus.totalSeats} seats
    </p>

    {/* Rating */}
    <div className="flex items-center text-yellow-500 font-bold text-sm mt-1">
      {renderStars(bus.rating)}
      <span className="text-gray-600 ml-2 text-sm">({bus.rating})</span>
    </div>
  </div>
  
                <div className="text-right">
                  <p className="text-xl font-semibold text-green-600">
                    ₹{bus.fare}
                  </p>
                  <p className="text-sm text-gray-500">per seat</p>
                </div>
              </div>
  
              {/* Route & Time */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                
                {/* Left Side: Route */}
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">{bus.pickupLocation}</p>
                    <p className="text-sm text-gray-500">{bus.departureTime}</p>
                  </div>
  
                  <div className="flex-1 border-t-2 border-gray-300 mx-2"></div>
  
                  <div className="text-center">
                    <p className="font-semibold text-gray-800">{bus.dropLocation}</p>
                    <p className="text-sm text-gray-500">{bus.arrivalTime}</p>
                  </div>
                </div>
  
                {/* Right Side: Seats + Button */}
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700">
                    Seats Available:{" "}
                    <span className="font-bold text-blue-600">{bus.availableSeats}</span>
                  </p>
  
                  <button
                    className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-xl font-medium text-sm hover:bg-blue-700 transition"
                    onClick={() => navigate(`/bus/${bus._id}`)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
  
      
    </div>
  );
  
}

export default SearchResultsPage;

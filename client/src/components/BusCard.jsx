import { useNavigate } from "react-router-dom";


function BusCard({ bus }) {
  
  const navigate=useNavigate()
  
  console.log("NAVIGATING WITH ID →", bus._id);

  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{bus.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{bus.busType}</p>

          <div className="flex items-center mt-3">
            <span className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {bus.rating}
            </span>
            <span className="ml-4 text-sm text-gray-600">{bus.reviews} reviews</span>
          </div>
        </div>

        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col md:items-center">
          <div className="flex items-center justify-between md:flex-col md:items-end">
            <div className="text-left md:text-right">
              <p className="text-sm text-gray-500">Departure</p>
              <p className="text-lg font-semibold">{bus.departureTime}</p>
            </div>

            <div className="mx-4 hidden md:block">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500">Arrival</p>
              <p className="text-lg font-semibold">{bus.arrivalTime}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between md:justify-end w-full md:w-auto">
            <div className="text-left md:text-right mr-4">
              <p className="text-sm text-gray-500">Starting from</p>
              <p className="text-2xl font-bold text-blue-600">₹{bus.fare}</p>
            </div>

            <div className="text-right">
  <p className="text-sm text-green-600 font-medium">{bus.availableSeats} seats</p>
  <button 
    onClick={() => navigate(`/bus/${bus._id}`)}
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  >
    View Seats
  </button>
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusCard;

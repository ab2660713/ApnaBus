import { useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";

function AddBusPage() {
  const [form, setForm] = useState({
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
    rating:"",
    isActive: true,
  });

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      ...form,
      availableSeats: form.totalSeats, // Default available = total
    };

    try {
      await axios.post("/api/admin/bus", finalData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Bus Added Successfully!");

      setForm({
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
        rating:form.rating,
        isActive: true,
      });

    } catch (err) {
      console.log(err);
      alert("Failed to add bus");
    }
  };

  return (
    <div className="flex bg-gray-100">
      <div className="sticky top-0 h-screen">
        <AdminSidebar />
      </div>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">Add New Bus</h1>

        <div className="bg-white p-8 shadow-lg rounded-xl max-w-2xl">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

            {/* Bus Name */}
            <div className="col-span-2">
              <label className="font-medium">Bus Name</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            {/* Registration */}
            <div>
              <label className="font-medium">Registration Number</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={form.registration}
                onChange={(e) => setForm({ ...form, registration: e.target.value })}
                required
              />
            </div>

            {/* Model */}
            <div>
              <label className="font-medium">Model</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={form.model}
                onChange={(e) => setForm({ ...form, model: e.target.value })}
                required
              />
            </div>

            {/* Pickup */}
            <div>
              <label className="font-medium">Pickup Location</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={form.pickupLocation}
                onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })}
                required
              />
            </div>

            {/* Drop */}
            <div>
              <label className="font-medium">Drop Location</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={form.dropLocation}
                onChange={(e) => setForm({ ...form, dropLocation: e.target.value })}
                required
              />
            </div>

            {/* Bus Type */}
            <div>
              <label className="font-medium">Bus Type</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={form.busType}
                onChange={(e) => setForm({ ...form, busType: e.target.value })}
                required
              >
                <option value="">Select Type</option>
                <option value="ac">AC</option>
                <option value="non-ac">Non-AC</option>
                <option value="sleeper">Sleeper</option>
                <option value="seater">Seater</option>
              </select>
            </div>

            {/* Total Seats */}
            <div>
              <label className="font-medium">Total Seats</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg"
                value={form.totalSeats}
                onChange={(e) =>
                  setForm({
                    ...form,
                    totalSeats: e.target.value,
                    availableSeats: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Fare */}
            <div>
              <label className="font-medium">Fare (₹)</label>
              <input
                type="number"
                className="w-full p-3 border rounded-lg"
                value={form.fare}
                onChange={(e) => setForm({ ...form, fare: e.target.value })}
                required
              />
            </div>
            <div>
  <label className="font-medium">Rating (0 - 5)</label>
  <input
    type="number"
    step="0.1"
    min="0"
    max="5"
    className="w-full p-3 border rounded-lg"
    value={form.rating}
    onChange={(e) => setForm({ ...form, rating: e.target.value })}
    required
  />
</div>

            {/* Departure */}
            <div>
              <label className="font-medium">Departure Time</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="e.g. 6:00 AM"
                value={form.departureTime}
                onChange={(e) => setForm({ ...form, departureTime: e.target.value })}
                required
              />
            </div>

            {/* Arrival */}
            <div>
              <label className="font-medium">Arrival Time</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="e.g. 7:00 PM"
                value={form.arrivalTime}
                onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
                required
              />
            </div>

            {/* Is Active Toggle */}
            <div className="col-span-2">
              <label className="font-medium">Active Status</label>
              <select
                className="w-full p-3 border rounded-lg"
                value={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.value === "true" })}
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Add Bus
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddBusPage;

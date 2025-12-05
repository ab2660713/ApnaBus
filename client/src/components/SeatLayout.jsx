import { useState } from "react";

function SeatLayout({ totalSeats = 40, bookedSeats = [] }) {
  const seatsPerRow = 4;
  const rows = Math.ceil(totalSeats / seatsPerRow);

  const initial = Array.from({ length: totalSeats }, (_, i) =>
    bookedSeats.includes(i + 1) ? "booked" : "available"
  );

  const [seatStatus, setSeatStatus] = useState(initial);

  const toggleSeat = (index) => {
    if (seatStatus[index] === "booked") return;

    setSeatStatus((prev) =>
      prev.map((val, i) =>
        i === index ? (val === "selected" ? "available" : "selected") : val
      )
    );
  };

  const getColor = (s) =>
    s === "available"
      ? "bg-gray-200 hover:bg-blue-100 cursor-pointer"
      : s === "selected"
      ? "bg-blue-600 text-white cursor-pointer"
      : "bg-gray-400 cursor-not-allowed";

  const selectedSeats = seatStatus
    .map((s, i) => (s === "selected" ? i + 1 : null))
    .filter(Boolean);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Select Your Seats</h3>

      {/* Legend */}
      <div className="mb-6 flex gap-4 text-sm">
        {[
          ["bg-gray-200", "Available"],
          ["bg-blue-600", "Selected"],
          ["bg-gray-400", "Booked"],
        ].map(([color, label]) => (
          <div className="flex items-center" key={label}>
            <div className={`w-6 h-6 rounded mr-2 ${color}`}></div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Driver */}
      <div className="w-full flex justify-center mb-4">
        <div className="bg-gray-300 px-4 py-2 rounded-t-lg text-center">
          Driver
        </div>
      </div>

      {/* SEAT GRID */}
      <div className="flex justify-center">
        <div className="grid gap-2">
          {Array.from({ length: rows }).map((_, row) => (
            <div key={row} className="flex gap-2">
              {Array.from({ length: seatsPerRow }).map((_, col) => {
                const seatIndex = row * seatsPerRow + col;

                if (seatIndex >= totalSeats) return null;

                return (
                  <div
                    key={col}
                    onClick={() => toggleSeat(seatIndex)}
                    className={`w-10 h-10 rounded flex items-center justify-center text-sm font-medium transition ${getColor(
                      seatStatus[seatIndex]
                    )} ${col === 1 ? "mr-4" : ""}`}
                  >
                    {seatIndex + 1}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* SELECTED */}
      {selectedSeats.length > 0 && (
        <div className="mt-5 text-center text-lg font-semibold">
          Selected Seats: {selectedSeats.join(", ")}
        </div>
      )}
    </div>
  );
}

export default SeatLayout;

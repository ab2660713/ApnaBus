const Bus = require("../models/busModel")

const getBuses = async (req, res) => {
    const allBuses = await Bus.find()
    
    res.status(200).json(allBuses)
}

const getBus = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ msg: "Bus Not Found" });
    }

    res.json(bus);
  } catch (err) {
    return res.status(500).json({ msg: "Server Error", error: err.message });
  }
}

const searchBuses = async (req, res) => {
    try {
      const { from, to } = req.query;
  
      if (!from || !to) {
        return res.status(400).json({ msg: "Please provide from & to" });
      }
  
      const buses = await Bus.find({
        pickupLocation: { $regex: new RegExp(from, "i") },
        dropLocation: { $regex: new RegExp(to, "i") }
      });
  
      res.json(buses);
  
    } catch (err) {
      console.log("SEARCH ERROR →", err);
      res.status(500).json({ msg: "Server Error", error: err.message });
    }
  };
   const bookSeats = async (req, res) => {
    try {
      const { busId, seats } = req.body;
  
      if (!busId || !seats) {
        return res.status(400).json({ error: "BusId and seats are required" });
      }
  
      const bus = await Bus.findById(busId);
      if (!bus) {
        return res.status(404).json({ error: "Bus not found" });
      }
  
      // Check if any selected seat is already booked
      const alreadyBooked = seats.some(seat =>
        bus.bookedSeats.includes(seat)
      );
  
      if (alreadyBooked) {
        return res.status(400).json({
          error: "Some seats are already booked by another user"
        });
      }
  
      // Add seats to bookedSeats
      bus.bookedSeats.push(...seats);
      await bus.save();
  
      return res.json({
        success: true,
        message: "Seats booked successfully!",
        bookedSeats: bus.bookedSeats
      });
    } catch (error) {
      return res.status(500).json({ error: "Server error", details: error.message });
    }
  };
const checkSeatAvailability = async (req, res) => {
    try {
      const { busId, seat } = req.body;
  
      const bus = await Bus.findById(busId);
  
      if (!bus) return res.status(404).json({ error: "Bus not found" });
  
      // agar seat booked hai → block kar do
      if (bus.bookedSeats.includes(seat)) {
        return res.json({ available: false });
      }
  
      return res.json({ available: true });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  };
 
const  lockSeat = async (req, res) => {
    try {
      const { busId, seatNumber } = req.body;
  
      const bus = await Bus.findById(busId);
      if (!bus) return res.json({ success: false, msg: "Bus not found" });
  
      // If already booked → deny
      if (bus.bookedSeats.includes(seatNumber)) {
        return res.json({ success: false, msg: "Seat already BOOKED" });
      }
  
      // If locked by another user → deny
      if (bus.lockedSeats.includes(seatNumber)) {
        return res.json({ success: false, msg: "Seat already LOCKED" });
      }
  
      // Otherwise lock seat
      bus.lockedSeats.push(seatNumber);
      await bus.save();
  
      return res.json({ success: true, msg: "Seat locked successfully" });
  
    } catch (err) {
      console.log("Lock Seat Error:", err);
      return res.status(500).json({ success: false, msg: "Server error" });
    }
  };
  

module.exports = { getBuses, getBus,searchBuses,bookSeats,checkSeatAvailability,lockSeat }
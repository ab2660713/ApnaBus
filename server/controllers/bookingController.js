import Booking from "../models/bookingModel.js"
import Bus from "../models/busModel.js"

export const addBooking = async (req, res) => {


    const { ticketCount } = req.body;

    // Validate ticket count
    if (!ticketCount || ticketCount <= 0) {
        res.status(400);
        throw new Error("Please enter valid ticket count!");
    }


    // Check if seats available
    const bus = await Bus.findById(req.params.bsid)

    if (!bus) {
        res.status(404)
        throw new Error('Bus Not Found!')
    }

    if (bus.availableSeats<ticketCount) {
        res.status(400)
        throw new Error('Seats not available')
    }


    //    Book Seats
    const booking = await Booking.create({
        user: req.user._id,
        bus: bus._id,
        ticketCount,
        status:"pending"
    })

    if (!booking) {
        res.status(500)
        throw new Error('Booking Failed!')
    }

    res.status(201).json(booking)



}
export const updateBooking = async (req, res) => {
    try {
      const { status, ticketCount } = req.body;
  
      const updated = await Booking.findByIdAndUpdate(
        req.params.id,
        { status, ticketCount },
        { new: true }
      ).populate("bus").populate("user");
  
      if (!updated) {
        return res.status(404).json({ message: "Booking not found!" });
      }
  
      res.status(200).json({
        message: "Booking updated successfully!",
        booking: updated
      });
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error updating booking!" });
    }
  };
export const getBooking = async (req, res) => {

    const booking = await Booking.findById(req.params.bid)

    if (!booking) {
        res.status(404)
        throw new Error('Booking Not Found!!')
    }

    res.status(200).json(booking)

}
export const cancelBooking = async (req, res) => {

    const booking = await Booking.findById(req.params.bid);

    if (!booking) {
        res.status(404);
        throw new Error('Booking Not Found!');
    }

    // 👉 If bus does NOT exist -> allow cancellation
    const bus = await Bus.findById(booking.bus);

    if (!bus) {
        const deletedBusCancel = await Booking.findByIdAndUpdate(
            req.params.bid,
            { status: "cancelled" },
            { new: true }
        );

        return res.status(200).json({
            message: "Bus no longer exists. Booking cancelled successfully.",
            booking: deletedBusCancel,
        });
    }

    // 👉 For existing bus, allow always (even if accepted)
    await Bus.findByIdAndUpdate(
        booking.bus,
        { availableSeats: bus.availableSeats + booking.ticketCount },
        { new: true }
    );

    const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.bid,
        { status: "cancelled" },
        { new: true }
    ).populate("bus").populate("user");

    if (!updatedBooking) {
        res.status(400);
        throw new Error("Booking Not Updated!");
    }

    res.status(200).json(updatedBooking);
};

export const getAllMyBookings = async (req, res) => {

    const myBookings = await Booking.find({ user: req.user._id })
    .populate("bus")
    .populate("user")
    .sort({ createdAt: -1 });

    if (!myBookings) {
        res.status(404)
        throw new Error('Bookings Not Found!!')
    }

    res.status(200).json(myBookings)

}

// ADMIN: View all bookings with user + bus populated
export const viewAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("user")
        .populate("bus")
        .sort({ createdAt: -1 });
  
      res.status(200).json({ bookings });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to load bookings!" });
    }
  };
  
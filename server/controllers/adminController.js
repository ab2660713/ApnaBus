const Bus = require("../models/busModel")
const User = require("../models/userModel")
const Booking = require("../models/bookingModel")

const addBus = async (req, res) => {

    const {
        name,
        model,
        totalSeats,
        availableSeats,
        busType,
        pickupLocation,
        dropLocation,
        arrivalTime,
        departureTime,
        fare,
        rating,
        registration
    } = req.body

    if (
        !name ||
        !model ||
        totalSeats == null ||
        availableSeats == null ||
        !busType ||
        !pickupLocation ||
        !dropLocation ||
        !arrivalTime ||
        !departureTime ||
        !fare ||
        !rating||
        !registration
    ) {
        res.status(400)
        throw new Error('Please Fill All Details!!')
    }

    // Check if bus already exists
    const busExist = await Bus.findOne({ registration })

    if (busExist) {
        res.status(400)
        throw new Error('Bus Already Exists')
    }


    // Create Bus
    let bus = await Bus.create({
        name,
        model,
        totalSeats, availableSeats,
        busType,
        pickupLocation,
        dropLocation,
        arrivalTime,
        departureTime,
        fare,
        rating,
        registration
    })

    if (!bus) {
        res.status(500)
        throw new Error('Bus Not Created')
    }



    res.status(201).json(bus)
}
const getDashboardStats = async (req, res) => {
    try {
        // Total Revenue
        const revenue = await Booking.aggregate([
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        const totalBookings = await Booking.countDocuments();
        const totalUsers = await User.countDocuments();
        const activeBuses = await Bus.countDocuments({ isActive: true });

        res.status(200).json({
            totalRevenue: revenue[0]?.total || 0,
            totalBookings,
            totalUsers,
            activeBuses
        });

    } catch (error) {
        res.status(500)
        throw new Error(error.message);
    }
};

const updateBus = async (req, res) => {

    const updatedBus = await Bus.findByIdAndUpdate(req.params.bsid, req.body, { new: true })

    if (!updatedBus) {
        res.status(500)
        throw new Error('Bus Not Updated')
    }

    res.status(200).json(updatedBus)
}

const getAllUsers = async (req, res) => {
    const users = await User.find()

    if (!users) {
        res.status(404)
        throw new Error('Uers Not Found')
    }


    res.status(200).json(users)
}

const getAllRatings = async (req, res) => {
    const ratings = await Booking.find({ rating: { $gt: 0 } })
        .populate("user")
        .populate("bus");

    if (!ratings) {
        res.status(404);
        throw new Error("No Ratings Found");
    }

    res.status(200).json(ratings);
};


const getAllBookings = async (req, res) => {
    const bookings = await Booking.find().populate('user').populate('bus')

    if (!bookings) {
        res.status(404)
        throw new Error('Bookings Not Found')
    }


    res.status(200).json(bookings)
}

const updateBooking =async (req, res) => {

    const oldBooking = await Booking.findById(req.params.bid)
    if (!oldBooking) {
        res.status(404)
        throw new Error('No Booking Found')
    }

    const bus = await Bus.findById(oldBooking.bus)
    if (!bus) {
        res.status(404)
        throw new Error('Bus Not Found')
    }

    // update booking first
    const updatedBooking = await Booking.findByIdAndUpdate(
        req.params.bid,
        req.body,
        { new: true }
    ).populate('user').populate('bus')

    if (!updatedBooking) {
        res.status(400)
        throw new Error('Booking Not Updated!')
    }

    // Fix seat count logic
    const seatDiff =
        (oldBooking.ticketCount || 0) -
        (updatedBooking.ticketCount || 0)

    await Bus.findByIdAndUpdate(
        oldBooking.bus,
        { availableSeats: bus.availableSeats + seatDiff },
        { new: true }
    )

    res.status(200).json(updatedBooking)
}
const deleteBus = async (req, res) => {
    try {
      const bus = await Bus.findByIdAndDelete(req.params.id);
  
      if (!bus) return res.status(404).json({ msg: "Bus not found" });
  
      res.json({ msg: "Bus deleted" });
    } catch (err) {
      res.status(500).json({ msg: "Delete error", error: err.message });
    }
  }
const updateUser = async (req, res) => {


    const user = await User.findById(req.params.uid)

    if (!user) {
        res.status(404)
        throw new Error('User Not Found!')
    }


    const updatedUser = await User.findByIdAndUpdate(req.params.uid, req.body, { new: true })

    if (!updatedUser) {
        res.status(400)
        throw new Error('User cannot be updated')
    }


    res.status(200).json(updatedUser)
}



module.exports = { addBus, updateBus, getAllUsers, getAllRatings, getAllBookings,deleteBus, updateBooking, updateUser ,getDashboardStats}
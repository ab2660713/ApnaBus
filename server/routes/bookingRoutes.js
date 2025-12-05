import express from "express";
import { addBooking, cancelBooking, getAllMyBookings, getBooking } from '../controllers/bookingController.js'
import protect  from "../middleware/authMiddleware.js"



const router = express.Router()


router.get('/my-bookings', protect, getAllMyBookings)
router.get('/:bid', protect, getBooking)
router.post('/:bsid', protect, addBooking)
router.put('/:bid', protect, cancelBooking)

router.patch("/cancel/:bid", protect, cancelBooking);



export default router
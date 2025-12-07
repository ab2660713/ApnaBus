import express from "express";
import {
  addBus,
  updateBus,
  updateBooking,
  updateUser,
  getAllUsers,
  getAllRatings,
  getAllBookings,
  getDashboardStats,
  deleteBus
} from "../controllers/adminController.js";

import adminProtect from "../middleware/adminMiddleware.js";

import {
  getBuses,
  getBus
} from "../controllers/busController.js";
import { viewAllBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post('/bus', adminProtect, addBus);
router.put('/bus/:bsid', adminProtect, updateBus);
router.put('/booking/:bid', adminProtect, updateBooking);
router.put('/user/:uid', adminProtect, updateUser);
router.get('/buses', adminProtect, getBuses);
router.get('/bus/:id', adminProtect, getBus);
router.get('/dashboard-stats', adminProtect, getDashboardStats);
router.delete('/bus/:id', adminProtect, deleteBus);
router.get("/admin/view-bookings", adminProtect, viewAllBookings);

router.get('/view-users', adminProtect, getAllUsers);
router.get('/view-ratings', adminProtect, getAllRatings);
router.get('/view-bookings', adminProtect, getAllBookings);

export default router;

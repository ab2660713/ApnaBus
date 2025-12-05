const express = require('express')
const { addBus, updateBus, updateBooking, updateUser, getAllUsers, getAllRatings, getAllBookings, getDashboardStats, deleteBus } = require('../controllers/adminController')
const adminProtect = require('../middleware/adminMiddleware')
const { getBuses, getBus } = require('../controllers/busController')


const router = express.Router()

router.post('/bus', adminProtect, addBus)

router.put('/bus/:bsid', adminProtect, updateBus)
router.put('/booking/:bid', adminProtect, updateBooking)
router.put('/user/:uid', adminProtect, updateUser)
router.get('/buses',adminProtect,getBuses)
router.get("/bus/:id",adminProtect,getBus)
router.get("/dashboard-stats", adminProtect, getDashboardStats);
router.delete("/bus/:id", adminProtect,deleteBus);

router.get('/view-users', adminProtect, getAllUsers)
router.get('/view-ratings', adminProtect, getAllRatings)
router.get('/view-bookings', adminProtect, getAllBookings)


module.exports = router
const express = require('express')
const { getBuses, getBus, searchBuses, bookSeats, checkSeatAvailability, lockSeat } = require('../controllers/busController')

const router = express.Router()

router.get("/search", searchBuses);
router.get("/", getBuses)
router.get("/:id", getBus)
router.put("/book-seats", bookSeats);
router.post("/check-seat", lockSeat);

module.exports = router


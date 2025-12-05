import express from "express";
import { getBuses, getBus, searchBuses, bookSeats, checkSeatAvailability, lockSeat }  from '../controllers/busController.js'

const router = express.Router()

router.get("/search", searchBuses);
router.get("/", getBuses)
router.get("/:id", getBus)
router.put("/book-seats", bookSeats);
router.post("/check-seat", lockSeat);

export default router


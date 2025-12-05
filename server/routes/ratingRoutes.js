import express from "express";
import { getRatings, addRating }  from '../controllers/ratingController.js'
import protect  from "../middleware/authMiddleware.js"


const router = express.Router()

router.get("/:bsid", getRatings)
router.post("/:bsid", protect, addRating)


export default router

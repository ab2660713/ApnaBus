import express from "express";
const router = express.Router();
import { getRoutes } from "../controllers/routeController.js"

router.get("/", getRoutes);

export default router

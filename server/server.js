import express from "express";
import colors from "colors";
import connectDB from "./config/dbConfig.js";
import errorHandler from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fix __dirname for ES Modules
const __dirname = path.resolve();

// ---------------- PRODUCTION MODE ----------------
if (process.env.NODE_ENV === "production") {

    app.use(express.static(path.join(__dirname, "client/dist")));

    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "dist","index.html"));
    });

} else {

    app.get("/", (req, res) => {
        res.send("API IS RUNNING... (development mode)");
    });

}

// ---------------- API ROUTES ----------------
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import routeRoutes from "./routes/routeRoute.js";

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/bus", busRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/routes", routeRoutes);

// Error Handler
app.use(errorHandler);

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT : ${PORT}`.bgBlue.black);
});

import mongoose from "mongoose";
const routeSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
});

export default mongoose.model("Route", routeSchema);

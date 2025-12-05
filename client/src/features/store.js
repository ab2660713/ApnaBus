import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth/authSlice";   // <-- Ye missing tha!
import admin from "./admin/adminSlice"
import bus from "./bus/busSlice"
import rating from "./rating/ratingSlice"
// import { Home } from "lucide-react";
import routes from "./route/routeSlice"
const store = configureStore({
  reducer: {
    auth,admin,bus,rating ,routes // <-- Yeh reducer naam authSlice ka exported reducer hoga
  },
});

export default store;

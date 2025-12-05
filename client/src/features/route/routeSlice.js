import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRoutes = createAsyncThunk(
  "routes/getAll",
  async () => {
    const res = await axios.get("/api/routes");
    return res.data;
  }
);

const routeSlice = createSlice({
  name: "routes",
  initialState: {
    routes: [],
    routeLoading: false,
    routeError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getRoutes.pending, state => {
        state.routeLoading = true;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.routeLoading = false;
        state.routes = action.payload;
      })
      .addCase(getRoutes.rejected, state => {
        state.routeLoading = false;
        state.routeError = true;
      });
  }
});

export default routeSlice.reducer;

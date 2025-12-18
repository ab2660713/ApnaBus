import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    allBookings: [],
    allUsers: [],
    adminLoading: false,
    adminSuccess: false,
    adminError: false,
    adminErrorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBookings.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allBookings = action.payload;
        state.adminError = false;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.adminLoading = true;
        state.adminSuccess = false;
        state.adminError = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = true;
        state.allUsers = action.payload;
        state.adminError = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.adminLoading = false;
        state.adminSuccess = false;
        state.adminError = true;
        state.adminErrorMessage = action.payload;
      });
  },
});

export default adminSlice.reducer;

export const updateBookingStatus = createAsyncThunk(
  "booking/updateStatus",
  async ({ id, status, ticketCount, token }, thunkAPI) => {
    // console.log(id, status, ticketCount, token);

    try {
      const res = await adminService.updateBooking(
        id,
        { status, ticketCount },
        token
      );

      return res.data.booking;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Error");
    }
  }
);

export const getAllBookings = createAsyncThunk(
  "ADMIN/FETCH/BOOKINGS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.fetchAllBookings(token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "ADMIN/FETCH/USERS",
  async (_, thunkAPI) => {
    let token = thunkAPI.getState().auth.user.token;
    try {
      return await adminService.fetchAllUsers(token);
    } catch (error) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

// Get All Bookings
export const getAllBookings = createAsyncThunk(
  "booking/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getAllBookings(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

// Get Single Booking
export const getSingleBooking = createAsyncThunk(
  "booking/getSingle",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.getSingleBooking(id, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

// Create Booking
export const createBooking = createAsyncThunk(
  "booking/create",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookingService.createBooking(formData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);



// Delete Booking
export const deleteBooking = createAsyncThunk(
  "booking/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      await bookingService.deleteBooking(id, token);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
    }
  }
);

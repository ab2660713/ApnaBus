import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBookings,
  getSingleBooking,
  createBooking,
  deleteBooking,
  
} from "./bookingThunk";

const initialState = {
  bookings: [],
  booking: null,
  bookingLoading: false,
  bookingSuccess: false,
  bookingError: false,
  bookingErrorMessage: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingState: (state) => {
      state.bookingLoading = false;
      state.bookingSuccess = false;
      state.bookingError = false;
      state.bookingErrorMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // Get All
      .addCase(getAllBookings.pending, (state) => {
        state.bookingLoading = true;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.bookingLoading = false;
        state.bookingSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError = true;
        state.bookingErrorMessage = action.payload;
      })

      // Get One
      .addCase(getSingleBooking.pending, (state) => {
        state.bookingLoading = true;
      })
      .addCase(getSingleBooking.fulfilled, (state, action) => {
        state.bookingLoading = false;
        state.bookingSuccess = true;
        state.booking = action.payload;
      })
      .addCase(getSingleBooking.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError = true;
        state.bookingErrorMessage = action.payload;
      })

      // Create
      .addCase(createBooking.pending, (state) => {
        state.bookingLoading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookingLoading = false;
        state.bookingSuccess = true;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError = true;
        state.bookingErrorMessage = action.payload;
      })

      

      // Delete
      .addCase(deleteBooking.pending, (state) => {
        state.bookingLoading = true;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookingLoading = false;
        state.bookingSuccess = true;
        state.bookings = state.bookings.filter(
          (b) => b._id !== action.payload
        );
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.bookingLoading = false;
        state.bookingError = true;
        state.bookingErrorMessage = action.payload;
      });
  },
});

export const { resetBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;

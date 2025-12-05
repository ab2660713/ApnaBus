import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import busService from "./busService";

// ----------- GET ALL BUSES -----------
export const getAllBuses = createAsyncThunk(
  "bus/getAll",
  async (_, thunkAPI) => {
    try {
      return await busService.fetchAllBuses();
    } catch (error) {
      const message = error?.response?.data?.msg || "Failed to fetch buses";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ----------- GET SINGLE BUS -----------
export const getBus = createAsyncThunk(
    "FETCH/BUS",
    async (id, thunkAPI) => {
        try {
            return await busService.fetchBus(id);
        } catch (error) {
            const message =
                error?.response?.data?.msg || "Failed to fetch bus details";
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const busSlice = createSlice({
  name: "bus",
  initialState: {
    buses: [],
    bus: null,

    busLoading: false,
    busSuccess: false,
    busError: false,
    busErrorMessage: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // -------- ALL BUSES --------
      .addCase(getAllBuses.pending, (state) => {
        state.busLoading = true;
      })
      .addCase(getAllBuses.fulfilled, (state, action) => {
        state.busLoading = false;
        state.buses = action.payload;
      })
      .addCase(getAllBuses.rejected, (state, action) => {
        state.busLoading = false;
        state.busError = true;
        state.busErrorMessage = action.payload;
      })

      // -------- SINGLE BUS --------
      .addCase(getBus.pending, (state) => {
        state.busLoading = true;
        state.bus = null;
      })
      .addCase(getBus.fulfilled, (state, action) => {
        state.busLoading = false;
        state.bus = action.payload;
      })
      .addCase(getBus.rejected, (state, action) => {
        state.busLoading = false;
        state.busError = true;
        state.busErrorMessage = action.payload;
      });
  },
});

export default busSlice.reducer;

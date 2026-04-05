import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const backendURL = "https://api.cheberel.kg"; 
const backendURL = "http://localhost:8000";
export const fetchBannerData = createAsyncThunk(
  "business/banner_list",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/business/banner_list/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBannerData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBannerData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.data = payload;
    });
    builder.addCase(fetchBannerData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export const {} = bannerSlice.actions;
export default bannerSlice.reducer;

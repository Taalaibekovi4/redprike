import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const fetchPopularData = createAsyncThunk(
  "products/fetchPopularData",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendURL}/products/product_popular/?page=${page}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const popularSlice = createSlice({
  name: "popular",
  initialState: {
    popular: null,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPopularData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchPopularData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.popular = payload;
    });
    builder.addCase(fetchPopularData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export const {} = popularSlice.actions;
export default popularSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getSearch = createAsyncThunk(
  "search/getSearch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // `https://api.cheberel.kg/products/product_list/?search=${data}`
        `${backendURL}/products/product_list/?search=${data}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    data: [],
  },
  status: null,
  error: null,
  extraReducers: (builder) => {
    builder
      .addCase(getSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSearch.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export default searchSlice.reducer;

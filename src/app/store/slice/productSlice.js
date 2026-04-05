import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const fetchProductData = createAsyncThunk(
  "products/product_detail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendURL}/products/product_detail/${id}/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductData.fulfilled, (state, { payload }) => {
      state.product = payload;
      state.loading = false;
    });
    builder.addCase(fetchProductData.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;

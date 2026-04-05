import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const fetchBrandsData = createAsyncThunk(
  "business/shop_list",
  async (page, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${backendURL}/business/shop_list/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBrandFilterData = createAsyncThunk(
  "products/product_shop_list",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendURL}/products/product_shop_list/${id}/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProduktData = createAsyncThunk(
  "products/product_list",
  async (count, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendURL}/products/product_list/?page=${count}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const brandsSlice = createSlice({
  name: "brand",
  initialState: {
    products: [],
    brandId: null,
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBrandsData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBrandsData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.data = payload;
    });
    builder.addCase(fetchBrandsData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
    builder.addCase(fetchBrandFilterData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchBrandFilterData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.brandId = payload;
    });
    builder.addCase(fetchBrandFilterData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
    builder.addCase(fetchProduktData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProduktData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.products = [...state.products, ...payload.results];
    });
    builder.addCase(fetchProduktData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export const {} = brandsSlice.actions;
export default brandsSlice.reducer;

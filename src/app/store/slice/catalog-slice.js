import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const fetchCatalogData = createAsyncThunk(
  "catalog/fetchCatalogData",
  async (data, { rejectWithValue }) => {
    const min_price = data[0];
    const max_price = data[1];
    const categoryId = data[2];
    const page = data[3];
  const idSord = data[4];
    const params = {};
    if (min_price) params["min_price"] = min_price;
    if (max_price) params["max_price"] = max_price;
    if (categoryId) params["category_id"] = categoryId;
    if (idSord) params["order_by"] = idSord;
    if (page) params["page"] = page;

    let urlParams = new URLSearchParams(params);
    try {
      const response = await fetch(
        `${backendURL}/products/product_list/?${urlParams.toString()}`
      );
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const fetchCatalogData2 = createAsyncThunk(
  "catalog/fetchCatalogData2",
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${backendURL}/products/product_list/?page=${page}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCategoryListData = createAsyncThunk(
  "catalog/fetchCategoryListData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${backendURL}/products/category_list/`);
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    data: null,
    dataFilter: null,
    count: null,
    categoryData: {
      data: null,
      status: null,
      error: null,
    },
  },
  status: null,
  error: null,
  reducers: {
    filterData: (state, action) => {
      state.data = [action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCatalogData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCatalogData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.data = payload;
    });
    builder.addCase(fetchCatalogData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
    builder.addCase(fetchCategoryListData.pending, (state) => {
      state.categoryData.status = "loading";
    });
    builder.addCase(fetchCategoryListData.fulfilled, (state, { payload }) => {
      state.categoryData.status = "succeeded";
      state.categoryData.data = payload;
    });
    builder.addCase(fetchCategoryListData.rejected, (state, { payload }) => {
      state.categoryData.status = "failed";
      state.categoryData.error = payload;
    });
    builder.addCase(fetchCatalogData2.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCatalogData2.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.data = payload;
    });
    builder.addCase(fetchCatalogData2.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export const { filterData } = catalogSlice.actions;
export default catalogSlice.reducer;

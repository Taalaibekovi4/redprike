import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const fetchCategoryData = createAsyncThunk(
  "products/category_list",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendURL}/products/category_list/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCategoryPopularData = createAsyncThunk(
  "products/getCategoryData",
  async (datas, { rejectWithValue }) => {
    const page = datas[0];
    const categoryId = datas[1];
    try {
      const response = await axios.get(
        `${backendURL}/products/product_list/?page=${page}&category_id=${categoryId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    categoryId: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategoryData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.category = payload.results;
    });
    builder.addCase(fetchCategoryData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
    builder.addCase(getCategoryPopularData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getCategoryPopularData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.categoryId = payload;
    });
    builder.addCase(getCategoryPopularData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;

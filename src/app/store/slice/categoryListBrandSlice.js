import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const getCategoryListBrandSlice = createAsyncThunk(
  "categoryListBrand/getCategoryListBrandSlice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${backendURL}/products/category_list_brand/`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const categoryListBrandSlice = createSlice({
  name: "categoryListBrand",
  initialState: {
    data: null,
  },
  status: null,
  error: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryListBrandSlice.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoryListBrandSlice.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.data = payload;
      })
      .addCase(getCategoryListBrandSlice.rejected, (state, { payload }) => {
        state.status = "failed";
        state.error = payload;
      });
  },
});
export const {} = categoryListBrandSlice.actions;
export default categoryListBrandSlice.reducer;

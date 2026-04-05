import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";

export const fetchBanerFilterData = createAsyncThunk(
  "baner/baner_filter",
  async (data, { rejectWithValue }) => {
    try {
      const params = {};

      if (data.categoryId !== "all") params["category_id"] = data.categoryId;
      if (data.page !== null) params["page"] = data.page;
      if (data.brand !== null) params["shop_id"] = data.brand;
      let urlParams = new URLSearchParams(params);
      const response = await axios.get(
        `${backendURL}/products/product_list/?${urlParams.toString()}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const banerSlice = createSlice({
  name: "baner",
  initialState: {
    data: null,
  },
  satus: null,
  error: null,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBanerFilterData.pending, (state) => {
      state.satus = "loading";
    });

    builder.addCase(fetchBanerFilterData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.satus = "succeeded";
    });

    builder.addCase(fetchBanerFilterData.rejected, (state, action) => {
      state.satus = "failed";
      state.error = action.payload;
    });
  },
});

export default banerSlice.reducer;

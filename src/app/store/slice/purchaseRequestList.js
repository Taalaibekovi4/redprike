import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendURL = "https://api.cheberel.kg";
// const backendURL = "http://localhost:8000";
export const fetchPurchaseRequestList = createAsyncThunk(
  "purchaseRequestList/fetchPurchaseRequestList",
  async (rejectWithValue) => {
    try {
      const token = localStorage.getItem("userToken")?.replaceAll('"', "");
      const response = await axios.get(
        // `https://api.cheberel.kg/auth/purchase_request_list/`,
        `${backendURL}/auth/purchase_request_list/`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchPurchaseRequestListById = createAsyncThunk(
  "purchaseRequestList/fetchPurchaseRequestListById",
  async (rejectWithValue) => {
    try {
      const token = localStorage.getItem("userToken")?.replaceAll('"', "");
      const response = await axios.get(
        // `https://api.cheberel.kg/auth/purchase_request_list/?search=213`,
        `${backendURL}/auth/purchase_request_list/?search=213`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const purchaseRequestListSlice = createSlice({
  name: "purchaseRequestList",
  initialState: {
    data: [],
    status: null,
    error: null,
  },
  reducers: {
    setPurchaseRequestList: (state, action) => {
      const arr = [action.payload];
      return (state.data = [...arr]?.data?.results?.sort((a, b) => {
        return b.sent_at - a.sent_at;
      })[0]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseRequestList.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPurchaseRequestList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPurchaseRequestList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchPurchaseRequestListById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPurchaseRequestListById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPurchaseRequestListById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPurchaseRequestList } = purchaseRequestListSlice.actions;
export default purchaseRequestListSlice.reducer;

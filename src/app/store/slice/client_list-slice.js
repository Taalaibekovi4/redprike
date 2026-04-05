import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const getClientList = createAsyncThunk(
  "clientList/getClientList",
  async (rejectWithValue) => {
    try {
      const toket = localStorage.getItem("userToken")?.replaceAll('"', "");

      const response = await axios(`${backendURL}/auth/client_list/`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${toket}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.status);
    }
  }
);

export const getClientListSearch = createAsyncThunk(
  "clientList/getClientListSearch",
  async (data, { rejectWithValue }) => {
    try {
      const toket = localStorage.getItem("userToken")?.replaceAll('"', "");

      const response = await axios(
        `${backendURL}/auth/client_list/?search=${data}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${toket}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

const clientListSlice = createSlice({
  name: "clientList",
  initialState: {
    data: null,
  },
  status: null,
  error: null,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClientList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getClientList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getClientListSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getClientListSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getClientListSearch.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {} = clientListSlice.actions;
export default clientListSlice.reducer;

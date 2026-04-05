import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleModal, handleTabClick } from "./modalSlice";
// const backendURL = "https://api.cheberel.kg";  
const backendURL = "http://localhost:8000";

export const fetchRecover = createAsyncThunk(
  "auth/send_code",
  async ({ phone }, { rejectWithValue, dispatch }) => {
    const number = phone.replace(/\D/g, "");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${backendURL}/auth/send_code/`,
        {
          phone: number,
        },
        config
      );
      console.log(response.data);
      dispatch(handleTabClick(6));
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const recoverSlice = createSlice({
  name: "recover",
  initialState: {
    loading: false,
    phone: null,
    error: null,
    success: false,
  },
  reducers: {
    sendCodePhone: (state, action) => {
      state.phone = action.payload;
    },

    recoverError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecover.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecover.fulfilled, (state, action) => {
      state.loading = false;
      state.phone = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchRecover.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { sendCodePhone, recoverError } = recoverSlice.actions;
export default recoverSlice.reducer;

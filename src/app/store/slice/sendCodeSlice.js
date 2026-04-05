import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import axios from "axios";
import { handleModal, handleTabClick } from "./modalSlice";
import { userProfile } from "./signInSlice";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const userSendCode = createAsyncThunk(
  "auth/send_code",
  async (phone, { rejectWithValue, dispatch }) => {
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

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const sendCodeSlice = createSlice({
  name: "sendCode",
  initialState: {
    loading: false,
    sendCode: null,
    error: null,
  },
  reducers: {
    autoLogin: (state, action) => {
      state.userInfo = action.payload;
    },
    autoError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSendCode.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userSendCode.fulfilled, (state, action) => {
      state.loading = false;
      state.userToken = action.payload;
    });

    builder.addCase(userSendCode.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { autoLogin, autoError } = sendCodeSlice.actions;
export default sendCodeSlice.reducer;

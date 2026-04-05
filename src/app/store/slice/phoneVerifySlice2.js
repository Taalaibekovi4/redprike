import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import axios from "axios";
import { handleModal, handleTabClick } from "./modalSlice";
import { userProfile } from "./signInSlice";
import { toast } from "react-toastify";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const userPhoneVerify2 = createAsyncThunk(
  "auth/phone-verify",
  async (data, { rejectWithValue, dispatch }) => {
    const number = data.phone.replace(/\D/g, "");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `${backendURL}/auth/phone-verify/`,
        {
          phone: number,
          code: data.code,
        },
        config
      );
      dispatch(phoneVerify(data.code));
      dispatch(handleTabClick(4));
      return response;
    } catch (error) {
      toast.error(`${error?.response?.data?.Сообщение}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue(error);
    }
  }
);

const phoneVerifySlice2 = createSlice({
  name: "phoneVerify2",
  initialState: {
    loading: false,
    phone: null,
    code: null,
    error: null,
  },
  reducers: {
    phoneVerify: (state, action) => {
      state.code = action.payload;
    },
    phoneVerifyError2: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userPhoneVerify2.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userPhoneVerify2.fulfilled, (state, action) => {
      state.loading = false;
      state.phone = action.payload;
    });

    builder.addCase(userPhoneVerify2.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { phoneVerify, phoneVerifyError2 } = phoneVerifySlice2.actions;
export default phoneVerifySlice2.reducer;

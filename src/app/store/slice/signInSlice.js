import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import axios from "axios";
import { handleModal } from "./modalSlice";
import { ToastContainer, toast } from "react-toastify";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const userSignIn = createAsyncThunk(
  "auth/login/",
  async ({ login, password }, { rejectWithValue, dispatch }) => {
    const number = login.replace(/\D/g, "");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const data = await axios.post(
        `${backendURL}/auth/login/`,
        {
          phone: number,
          password: password,
        },
        config
      );
      toast.success("Успешно выполнен вход", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(userProfile(data.data.tokens.access));
      localStorage.setItem(
        "userToken",
        JSON.stringify(data.data.tokens.access)
      );
      dispatch(handleModal(false));
      return data;
    } catch (error) {
      toast.error(`${error?.response?.data?.detail}`, {
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

export const userProfile = createAsyncThunk(
  "auth/detail_profile",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.get(`${backendURL}/auth/detail_profile/`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${id}`,
        },
      });
      const userData = response;
      dispatch(autoLogin(userData));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    loading: false,
    userInfo: null,
    userToken: null,
    error: null,
  },
  reducers: {
    autoLogin: (state, action) => {
      state.userInfo = action.payload.data;
    },
    autoError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userSignIn.fulfilled, (state, action) => {
      state.loading = false;
      state.userToken = action.payload.data.tokens.access;
    });

    builder.addCase(userSignIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.response;
    });
  },
});
export const { autoLogin, autoError } = signInSlice.actions;
export default signInSlice.reducer;

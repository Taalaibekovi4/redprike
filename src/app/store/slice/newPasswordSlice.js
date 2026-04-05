import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useEffect } from "react";
import axios from "axios";
import { handleModal, handleTabClick } from "./modalSlice";
import { userProfile } from "./signInSlice";
import { toast } from "react-toastify";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const fetchNewPassword = createAsyncThunk(
  "auth/set_new_password",
  async (data, { rejectWithValue, dispatch }) => {
    // const number = data.phone.replace(/\D/g, "");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.patch(
        `${backendURL}/auth/set_new_password/`,
        {
          phone: data.phone,
          code: data.code,
          password: data.password,
          password2: data.password,
        },
        config
      );
      toast.success("Успешно изменен пароль", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("userToken", JSON.stringify(data.token));
      dispatch(userProfile(data.token));
      dispatch(handleModal(false));
      return response;
    } catch (error) {
      toast.error(`${error?.response?.data?.non_field_errors[0]}`, {
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

const newPasswordSlice = createSlice({
  name: "newpassword",
  initialState: {
    loading: false,
    token: "",
    phone: "",
    error: null,
  },
  reducers: {
    autoChange: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNewPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchNewPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(fetchNewPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const { autoChange } = newPasswordSlice.actions;
export default newPasswordSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { userProfile } from "./signInSlice";
// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const postPhone = createAsyncThunk(
  "questionnaire/postPhone",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${backendURL}/auth/phone-verify/`,
        data
      );
      dispatch(userProfile(response?.data?.tokens?.access));
      localStorage.setItem(
        "userToken",
        JSON.stringify(response?.data?.tokens?.access)
      );
      toast.success("Пользователь успешно создан", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return response;
    } catch (error) {
      toast.error("Неверный код", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return rejectWithValue(error.response.status);
    }
  }
);

const testSlice = createSlice({
  name: "test",
  initialState: {
    status: null,
    error: null,
    data: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postPhone.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(postPhone.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(postPhone.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default testSlice.reducer;

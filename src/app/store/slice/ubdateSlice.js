import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userProfile } from "./signInSlice";
// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const updateAvatarDate = createAsyncThunk(
  "auth/update_avatar",
  async function (selectedFile, { rejectWithValue, dispatch }) {
    try {
      const token = localStorage.getItem("userToken")?.replaceAll('"', "");
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      const response = await axios.patch(
        `${backendURL}/auth/update_profile/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(userProfile(token));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateFullNameDate = createAsyncThunk(
  "auth/update_full_name",
  async function (data, { rejectWithValue, dispatch }) {
    console.log(data);
    try {
      const token = localStorage.getItem("userToken")?.replaceAll('"', "");
      const response = await axios.patch(
        `${backendURL}/auth/update_profile/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(userProfile(token));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ubdateSlice = createSlice({
  name: "ubdate",
  initialState: {
    fullName: null,
    photo: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateAvatarDate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAvatarDate.fulfilled, (state, action) => {
      state.photo = action.payload;
      state.loading = false;
    });
    builder.addCase(updateAvatarDate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(updateFullNameDate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFullNameDate.fulfilled, (state, action) => {
      state.fullName = action.payload;
      state.loading = false;
    });
    builder.addCase(updateFullNameDate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const {} = ubdateSlice.actions;
export default ubdateSlice.reducer;

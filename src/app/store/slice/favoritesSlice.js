import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const fetchFavoritesData = createAsyncThunk(
  "auth/favorites_front_list",
  async (page, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken")?.replaceAll('"', "");
      const response = await axios.get(
        `${backendURL}/auth/favorites_front_list/`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchFavoritesPatchData = createAsyncThunk(
  "auth/favorites_add_delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("userToken")?.replaceAll('"', "");
      const response = await axios.patch(
        `${backendURL}/auth/favorites_add_delete/`,
        { product_id: id },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      {
        response.data === "added" &&
          toast.success("Товар добавлен в избранное", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
      }

      dispatch(fetchFavoritesData());
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    dataId: null,
    favorites: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavoritesData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchFavoritesData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.favorites = payload;
    });
    builder.addCase(fetchFavoritesData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
    builder.addCase(fetchFavoritesPatchData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchFavoritesPatchData.fulfilled, (state, { payload }) => {
      state.status = "succeeded";
      state.dataId = payload;
    });
    builder.addCase(fetchFavoritesPatchData.rejected, (state, { payload }) => {
      state.status = "failed";
      state.error = payload;
    });
  },
});

export const { FilterData } = favoritesSlice.actions;
export default favoritesSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const fetchStoriesData = createAsyncThunk(
  "business/stories_shop_list",
  async (page, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken")?.replaceAll('"', "");
      const response = await axios.get(
        `${backendURL}/business/stories_shop_list/`,
        {
          headers: {
            accept: "application/json",
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchStoriesViemData = createAsyncThunk(
  "business/stories_view",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken")?.replaceAll('"', "");
      const response = await axios.get(
        `${backendURL}/business/stories_view/${id}/`,
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

const storiesSlice = createSlice({
  name: "stories",
  initialState: {
    viem: false,
    stories: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStoriesData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStoriesData.fulfilled, (state, { payload }) => {
      state.stories = payload;
      state.loading = false;
    });
    builder.addCase(fetchStoriesData.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchStoriesViemData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchStoriesViemData.fulfilled, (state, { payload }) => {
      state.viem = payload.is_view;
      state.loading = false;
    });
    builder.addCase(fetchStoriesViemData.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const {} = storiesSlice.actions;
export default storiesSlice.reducer;

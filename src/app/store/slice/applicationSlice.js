import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userProfile } from "./signInSlice";
// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";

export const applicationDate = createAsyncThunk(
  "auth/purchase_request_list",
  async function (page, { rejectWithValue, dispatch }) {
    try {
      const response = await axios.patch(
        `${backendURL}/auth/purchase_request_list/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// export const updateFullNameDate = createAsyncThunk(
//   "auth/update_full_name",
//   async function (data, { rejectWithValue, dispatch }) {
//     const name = data.first_name + " " + data.last_name + "" + data.surname;
//     try {
//       const token = localStorage.getItem("userToken")?.replaceAll('"', "");
//       const response = await axios.patch(
//         `${backendURL}/auth/update_profile/`,
//         { full_name: name },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       dispatch(userProfile(token));
//       console.log(response);
//       return response;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error);
//     }
//   }
// );

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    application: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(applicationDate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(applicationDate.fulfilled, (state, action) => {
      state.application = action.payload;
      state.loading = false;
    });
    builder.addCase(applicationDate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export const {} = applicationSlice.actions;
export default applicationSlice.reducer;

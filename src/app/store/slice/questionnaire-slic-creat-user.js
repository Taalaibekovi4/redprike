import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const backendURL = "https://api.cheberel.kg";  
const backendURL = "http://localhost:8000";
export const postPhoneVerify1 = createAsyncThunk(
  "questionnaire/postPhoneVerify1",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${backendURL}/auth/phone-verify/`,
        data
      );
      localStorage.setItem(
        "userToken",
        JSON.stringify(response.data.tokens.access)
      );
      dispatch(userProfile(response.data.tokens.access));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
export const postPhoneVerifyAgent1 = createAsyncThunk(
  "questionnaire/postPhoneVerifyAgent1",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${backendURL}/auth/phone-verify/`,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);

const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState: {
    data: null,
  },
  status: null,
  error: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postPhoneVerify1.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      })
      .addCase(postPhoneVerify1.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postPhoneVerifyAgent1.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "succeeded";
      });
  },
});

export default questionnaireSlice.reducer;

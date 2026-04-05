import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const getQuestionnaire = createAsyncThunk(
  "questionnaire/getQuestionnaire",
  async (rejectWithValue) => {
    try {
      const toket = localStorage.getItem("userToken")?.replaceAll('"', "");
      const response = await axios(`${backendURL}/auth/questionnaire/`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${toket}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
export const getQuestionnaireAgentId = createAsyncThunk(
  "questionnaire/getQuestionnaireAgentId",
  async (data, { rejectWithValue }) => {
    try {
      const toket = localStorage.getItem("userToken")?.replaceAll('"', "");

      const response = await axios(
        `${backendURL}/auth/questionnaire/?questionnaire_id=${data}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${toket}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
export const putDataQuestionnaire = createAsyncThunk(
  "questionnaire/putDataQuestionnaire",

  async (data, { rejectWithValue }) => {
    try {
      const toket = localStorage.getItem("userToken")?.replaceAll('"', "");

      const response = await axios(`${backendURL}/auth/questionnaire/`, {
        method: "PUT",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${toket}`,
        },
        data,
      });
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
const questionnaireGetSlice = createSlice({
  name: "questionnaireGetSlice",
  initialState: {
    data: null,
  },
  status: null,
  error: null,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestionnaire.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuestionnaire.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getQuestionnaire.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getQuestionnaireAgentId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getQuestionnaireAgentId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getQuestionnaireAgentId.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export default questionnaireGetSlice.reducer;

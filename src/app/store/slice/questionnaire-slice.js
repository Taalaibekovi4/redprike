import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { userProfile } from "./signInSlice";

import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
export const postDataQuestionnaire = createAsyncThunk(
  "questionnaire/postDataQuestionnaire",
  async (data, { rejectWithValue, dispatch }) => {
    function removeMask(number) {
      return number.replace(/[\s\-\(\)\+]/g, "");
    }
    data.password_face = data.password_face[0];
    data.password_back = data.password_back[0];
    data.phone = removeMask(data.phone);
    data.guarantor_phone_2 = removeMask(data.guarantor_phone_2);
    data.guarantor_phone_1 = removeMask(data.guarantor_phone_1);

    try {
      const response = await axios.post(
        `${backendURL}/auth/create_questionnaire/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(postSendCode(data));

      return response.data;
    } catch (error) {
      toast.error("Ползователь или анкета с таким номером уже существует", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue(error.response.status);
    }
  }
);
export const postDataQuestionnaireAgent = createAsyncThunk(
  "questionnaire/postDataQuestionnaireAgent",
  async (data, { rejectWithValue, dispatch }) => {
    function removeMask(number) {
      return number.replace(/[\s\-\(\)\+]/g, "");
    }

    data.password_face = data.password_face[0];
    data.password_back = data.password_back[0];
    data.phone = removeMask(data.phone);
    data.guarantor_phone_2 = removeMask(data.guarantor_phone_2);
    data.guarantor_phone_1 = removeMask(data.guarantor_phone_1);
    // data.guarantor_full_name_2 = Number(data.guarantor_full_name_2);

    try {
      const toket = localStorage.getItem("userToken")?.replaceAll('"', "");
      const response = await axios.post(
        `${backendURL}/auth/create_questionnaire/`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${toket}`,
          },
        }
      );
      dispatch(postSendCode(data));

      return response.data;
    } catch (error) {
      toast.error("Ползователь или анкета с таким номером уже существует", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue(error.response.status);
    }
  }
);
export const postSendCode = createAsyncThunk(
  "questionnaire/postSendCode",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendURL}/auth/send_code/`, {
        phone: data.phone,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.status);
    }
  }
);
export const postPhoneVerify = createAsyncThunk(
  "questionnaire/postPhoneVerify",
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
      toast.success("Пользователь успешно создан", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(userProfile(response.data.tokens.access));

      return response.data;
    } catch (error) {
      toast.error("Неверный код", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue(error.response.status);
    }
  }
);

export const postPhoneVerifyAgent = createAsyncThunk(
  "questionnaire/postPhoneVerify",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${backendURL}/auth/phone-verify/`,
        data
      );
      toast.success("Пользователь успешно создан", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return response.data;
    } catch (error) {
      toast.error("неверный код", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return rejectWithValue(error.response.status);
    }
  }
);
const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState: {
    data: null,
  },
  sendCode: {
    status: null,
    error: null,
    data: null,
  },
  createUsers: false,
  status: null,
  error: null,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(postDataQuestionnaire.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postDataQuestionnaire.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(postDataQuestionnaire.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(postSendCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postSendCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(postSendCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    builder

      .addCase(postPhoneVerify.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postPhoneVerify.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.createUsers = true;
      })
      .addCase(postPhoneVerify.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(postDataQuestionnaireAgent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postDataQuestionnaireAgent.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(postDataQuestionnaireAgent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {} = questionnaireSlice.actions;
export default questionnaireSlice.reducer;

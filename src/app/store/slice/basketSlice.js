import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const backendURL = "https://api.cheberel.kg";
const backendURL = "http://localhost:8000";
import { ToastContainer, toast } from "react-toastify";
import { handleBasketModal } from "./modalSlice";

export const fetchBasketPostData = createAsyncThunk(
  "products/cart_create",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const token = localStorage.getItem("randomToken")?.replaceAll('"', "");
      const response = await axios.post(
        `${backendURL}/products/cart_create/`,
        {
          product_variations: id,
          product_count: 1,
          device_id: token,
        },
        config
      );
      toast.success(`Товар добавлен в корзину`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(fetchBasketData());
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBasketItem = createAsyncThunk(
  "products/cart_delete",
  async (itemId, { rejectWithValue, dispatch }) => {
    console.log(itemId);
    try {
      const response = await axios.delete(
        `${backendURL}/products/cart_delete/${itemId}`
      );
      dispatch(fetchBasketData());
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAllBasketItem = createAsyncThunk(
  "products/cart_all_delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("randomToken")?.replaceAll('"', "");
      const userToken = localStorage.getItem("userToken")?.replaceAll('"', "");

      const authorizationHeader =
        userToken !== undefined ? `Bearer ${userToken}` : null;
      const config = {
        headers: {
          accept: "application/json",
          Authorization: authorizationHeader,
        },
      };
      const response = await axios.delete(
        `${backendURL}/products/cart_all_delete/?device_id=${token}`,
        {
          config,
        }
      );
      dispatch(fetchBasketData());
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const fetchBasketData = createAsyncThunk(
  "products/cart_list",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("randomToken")?.replaceAll('"', "");
      const userToken = localStorage.getItem("userToken")?.replaceAll('"', "");

      const authorizationHeader =
        userToken !== undefined ? `Bearer ${userToken}` : null;
      const config = {
        headers: {
          accept: "application/json",
          Authorization: authorizationHeader,
        },
      };
      const response = await axios.get(
        `${backendURL}/products/cart_list/?device_id=${token}`,
        {
          config,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBasketUpdate = createAsyncThunk(
  "products/cart_update",
  async (data, { rejectWithValue, dispatch }) => {
    console.log(data);
    if (data.plus === false && data.product_count === 1) {
      dispatch(deleteBasketItem(data?.product_id));
    } else {
      try {
        const response = await axios.patch(
          `${backendURL}/products/cart_update/${data?.product_id}`,
          {
            product_count: data.plus
              ? data.product_count + 1
              : data.product_count - 1,
          }
        );

        dispatch(fetchBasketData());
        return response.data;
      } catch (error) {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  }
);

export const fetchBasketSubmitData = createAsyncThunk(
  "products/submit_purchase_request",
  async (data, { rejectWithValue, dispatch }) => {
    const sanitizedData = removeCircularReferences(data);
    try {
      const token = localStorage.getItem("userToken")?.replaceAll('"', "");
      const randomToken = localStorage
        .getItem("randomToken")
        ?.replaceAll('"', "");
      const response = await axios.post(
        `${backendURL}/products/submit_purchase_request/`,
        {
          ...sanitizedData,
          device_id: randomToken,
        },
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`${response?.data?.message}`, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(fetchBasketData());
      dispatch(handleBasketModal(true));
      return response;
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(`${error.response?.data?.message}`, {
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
      return rejectWithValue(error?.response?.data);
    }
  }
);

function removeCircularReferences(obj) {
  const seen = new WeakSet();
  return JSON.parse(
    JSON.stringify(obj, function (key, value) {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    })
  );
}

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basket: null,
    data: null,
    loading: false,
    error: null,
    submitBasket: {
      data: null,
      loading: false,
      error: null,
    },
  },

  reducers: {
    autoError: (state, action) => {
      state.submitBasket.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBasketPostData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBasketPostData.fulfilled, (state, { payload }) => {
      state.basket = payload;
      state.loading = false;
    });
    builder.addCase(fetchBasketPostData.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchBasketData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBasketData.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.loading = false;
    });
    builder.addCase(fetchBasketData.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(fetchBasketSubmitData.pending, (state) => {
      state.submitBasket.loading = true;
    });
    builder.addCase(fetchBasketSubmitData.fulfilled, (state, { payload }) => {
      state.submitBasket.data = payload;
      state.submitBasket.loading = false;
    });
    builder.addCase(fetchBasketSubmitData.rejected, (state, { payload }) => {
      state.submitBasket.loading = false;
      state.submitBasket.error = payload;
    });
  },
});

export const { autoError } = basketSlice.actions;
export default basketSlice.reducer;

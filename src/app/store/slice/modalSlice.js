import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    search: 1,
    basketModal: false,
    tap: 1,
    value: 1,
    modal: false,
    profil: 1,
  },
  reducers: {
    handleSearchModal: (state, action) => {
      state.search = action.payload;
    },
    handleBasketModal: (state, action) => {
      state.basketModal = action.payload;
    },
    handleTabProfil: (state, action) => {
      state.tap = action.payload;
    },
    handleTabClick: (state, action) => {
      state.value = action.payload;
    },
    handleModal: (state, action) => {
      state.modal = action.payload;
    },
    handleProfil: (state, action) => {
      state.profil = action.payload;
    },
  },
});
export const {
  handleTabClick,
  handleModal,
  handleProfil,
  handleTabProfil,
  handleBasketModal,
  handleSearchModal,
} = modalSlice.actions;
export default modalSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import popularSlice from "./slice/popularSlice";
import brandsSlice from "./slice/brandsSlice";
import bannerSlice from "./slice/bannerSlice";
import categorySlice from "./slice/categorySlice";
import productSlice from "./slice/productSlice";
import basketSlice from "./slice/basketSlice";
import modalSlice from "./slice/modalSlice";
import catalogslice from "./slice/catalog-slice";
import signInSlice from "./slice/signInSlice";
import storiesSlice from "./slice/storiesSlice";
import ubdateSlice from "./slice/ubdateSlice";
import favoritesSlice from "./slice/favoritesSlice";
import newPasswordSlice from "./slice/newPasswordSlice";
import phoneVerifySlice2 from "./slice/phoneVerifySlice2";
import recoverSlice from "./slice/recoverSlice";
import sendCodeSlice from "./slice/sendCodeSlice";
import applicationSlice from "./slice/applicationSlice";
import questionnaireSlice from "./slice/questionnaire-slice";
import questionnaireGetSlice from "./slice/questionnaire-get";
import clientListSlice from "./slice/client_list-slice";
import categoryListBrandSlice from "./slice/categoryListBrandSlice";
import banerSlice from "./slice/banerFIlterData";
import purchaseRequestListSlice from "./slice/purchaseRequestList";
import searchSlice from "./slice/search-slice";
import questionnaireSliced from "./slice/questionnaire-slic-creat-user";
import testSlice from  "./slice/test-slice";
const store = configureStore({
  reducer: {
    popular: popularSlice,
    brand: brandsSlice,
    banner: bannerSlice,
    category: categorySlice,
    product: productSlice,
    basket: basketSlice,
    modal: modalSlice,
    signIn: signInSlice,
    catalog: catalogslice,
    recover: recoverSlice,
    sendCode: sendCodeSlice,
    phoneVerify2: phoneVerifySlice2,
    newpassword: newPasswordSlice,
    stories: storiesSlice,
    favorites: favoritesSlice,
    ubdate: ubdateSlice,
    questionna: questionnaireSlice,
    questionnaireGetSlice,
    clientListSlice,
    categoryListBrandSlice,
    banerSlice,
    purchaseRequestListSlice,
    searchSlice,
    questionnaireSliced,
    testSlice
  },
});

export default store;

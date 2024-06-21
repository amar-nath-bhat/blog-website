import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice";
import likeSliceReducer from "./likeSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    like: likeSliceReducer,
  },
});

export default store;

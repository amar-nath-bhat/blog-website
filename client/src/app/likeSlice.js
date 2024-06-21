import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
};

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    like: (state) => {
      state.status = true;
    },
    unlike: (state) => {
      state.status = false;
    },
  },
});

export const { like, unlike } = likeSlice.actions;
export default likeSlice.reducer;

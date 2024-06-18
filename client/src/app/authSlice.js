import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  username: "",
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    _login: (state, action) => {
      state.status = true;
      state.username = action.payload.username;
      state.name = action.payload.name;
    },
    _logout: (state) => {
      state.status = false;
      state.username = "";
      state.name = "";
    },
  },
});

export const { _login, _logout } = authSlice.actions;
export default authSlice.reducer;

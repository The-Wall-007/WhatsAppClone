import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  userData: null,
  didTryAutoLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authentication: (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      state.userData = payload.userData;
      state.didTryAutoLogin = true;
    },
    setDidTryAutoLogin: (state) => {
      state.didTryAutoLogin = true;
    },
    logout: (state) => {
      state.token = null;
      state.userData = null;
      state.didTryAutoLogin = false;
    },
    updateLoggedInUserData: (state, action) => {
      const { newData } = action.payload;
      state.userData = { ...state.userData, ...newData };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  authentication,
  setDidTryAutoLogin,
  logout,
  updateLoggedInUserData,
} = authSlice.actions;

export default authSlice.reducer;

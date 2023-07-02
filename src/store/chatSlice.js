import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatsData: {},
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatsData: (state, action) => {
      state.chatsData = action.payload.chatsData;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChatsData } = chatSlice.actions;

export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messagesData: {},
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setChatMessages: (state, action) => {
      const existingMessage = state.messagesData;

      const { chatId, messagesData } = action.payload;

      existingMessage[chatId] = messagesData;

      state.messagesData = existingMessage;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChatMessages } = messagesSlice.actions;

export default messagesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storedUsers: {},
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setStoredUsers: (state, action) => {
      const newUsers = action.payload.newUsers;
      const existingUsers = state.storedUsers;

      const userArray = Object.values(newUsers);
      for (i = 0; i < userArray.length; i++) {
        const userData = userArray[i];
        existingUsers[userData.userId] = userData;
      }

      state.storedUsers = existingUsers;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStoredUsers } = userSlice.actions;

export default userSlice.reducer;

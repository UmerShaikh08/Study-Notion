import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setProfile(state, action) {
      initialState = action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;

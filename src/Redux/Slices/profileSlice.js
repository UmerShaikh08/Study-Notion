import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  loading: false,
  showSidebar: true,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setShowSidebar(state, action) {
      state.showSidebar = !action.payload;
    },
  },
});

export const { setUser, setLoading, setShowSidebar } = profileSlice.actions;
export default profileSlice.reducer;

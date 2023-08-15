import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: localStorage.getItem("totalItems")
    ? localStorage.getItem("totalItems")
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setItem(state, action) {
      state.items.push(action.payload);
    },
    removeItem(state, action) {
      state.items.pop();
    },
    clearItems(state, action) {
      state.items.length = 0;
    },
  },
});

export const { setItem, removeItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;

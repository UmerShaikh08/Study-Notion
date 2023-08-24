import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart") ? localStorage.getItem("cart") : [],
  totalItems: localStorage.getItem("totalItems")
    ? localStorage.getItem("totalItems")
    : 0,
  totalPrice: localStorage.getItem("totalPrice")
    ? localStorage.getItem("totalPrice")
    : 0,
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const course = action.payload;

      const index = state.cart.findIndex((item) => item._id === course._id);

      // check course already in cart or not
      if (index >= 0) {
        toast.error("Course already in cart");
        return;
      }

      //  add course in array
      state.cart.push(course);
      state.totalItems++;
      state.totalPrice += course.price;

      // store in local storage
      localStorage.setItem("cart", state.cart);
      localStorage.setItem("totalPrice", state.totalPrice);
      localStorage.setItem("totalItems", state.totalItems);
    },
    removeItemFromCart(state, action) {
      const course = action.payload;

      const idx = state.cart.findIndex((item) => item._id === course._id);

      if (idx >= 0) {
        // remove item
        state.totalItems--;
        state.totalPrice -= state.cart[idx].price;
        state.cart.splice(idx, 1);

        // store in local storage
        localStorage.setItem("cart", state.cart);
        localStorage.setItem("totalPrice", state.totalPrice);
        localStorage.setItem("totalItems", state.totalItems);
      }
    },

    clearCart(state, action) {
      state.cart = [];
      state.totalItems = 0;
      state.totalPrice = 0;

      // store in local storage
      localStorage.setItem("cart", state.cart);
      localStorage.setItem("totalPrice", state.totalPrice);
      localStorage.setItem("totalItems", state.totalItems);
    },
  },
});

export const { addToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

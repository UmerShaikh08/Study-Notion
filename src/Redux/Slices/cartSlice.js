import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalPrice: localStorage.getItem("totalPrice")
    ? JSON.parse(localStorage.getItem("totalPrice"))
    : 0,
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const course = action.payload;
      const index = state.cart.findIndex((item) => item._id === course._id);

      if (index >= 0) {
        // If the course is already in the cart, do not modify the quantity
        toast.error("Course already in cart");
        return;
      }
      // If the course is not in the cart, add it to the cart
      state.cart.push(course);
      // Update the total quantity and price
      state.totalItems++;
      state.totalPrice += course.price;
      // Update to localstorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
      // show toast
      toast.success("Course added to cart");
    },
    removeItemFromCart: (state, action) => {
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
    clearCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
      state.totalItems = 0;
      // Update to localstorage
      localStorage.removeItem("cart");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("totalItems");
    },
  },
});

export const { addToCart, removeItemFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

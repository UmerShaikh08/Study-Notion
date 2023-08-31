import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import profileSlice from "./Slices/profileSlice";
import cartSlice from "./Slices/cartSlice";
import courseSlice from "./Slices/courseSlice";
import viewCourseSlice from "./Slices/viewCourseSlice";

const Store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    cart: cartSlice,
    course: courseSlice,
    viewCourse: viewCourseSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default Store;

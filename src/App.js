import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Otp from "./pages/Otp";
import OpenRoute from "./components/auth/OpenRoute";
import About from "./pages/About";
import MyProfile from "./components/Dashboard/MyProfile";
import Logout from "./components/Dashboard/Logout";
import Dashboard from "./pages/Dashboard";
import Setting from "./components/Dashboard/setting/Setting";

function App() {
  return (
    <div className="w-screen  min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element=<Home /> />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />{" "}
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />{" "}
            </OpenRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />{" "}
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />{" "}
            </OpenRoute>
          }
        />

        <Route
          path="/verify-otp"
          element={
            <OpenRoute>
              <Otp />{" "}
            </OpenRoute>
          }
        />

        <Route path="/about" element=<About /> />

        <Route path="/dashboard" element=<Dashboard />>
          {" "}
          <Route path="/dashboard/my-profile" element=<MyProfile /> />
          <Route path="/dashboard/logout" element=<Logout /> />
          <Route path="/dashboard/purchase-history" element=<Logout /> />
          <Route path="/dashboard/enrolled-courses" element=<Logout /> />
          <Route path="/dashboard/cart" element=<Logout /> />
          <Route path="/dashboard/setting" element=<Setting /> />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

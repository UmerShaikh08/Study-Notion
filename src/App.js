import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Otp from "./pages/Otp";

function App() {
  return (
    <div className="w-screen  min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/login" element=<Login /> />
        <Route path="/signup" element=<Signup /> />
        <Route path="/forgot-password" element=<ForgotPassword /> />
        <Route path="/update-password/:id" element=<UpdatePassword /> />
        <Route path="/verify-otp" element=<Otp /> />
      </Routes>
    </div>
  );
}

export default App;

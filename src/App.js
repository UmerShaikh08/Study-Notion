import "./App.css";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Otp from "./pages/Otp";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

// common
import Navbar from "./components/common/Navbar";

// Auth routes
import OpenRoute from "./components/auth/OpenRoute";
import StudentRoute from "./components/auth/StudentRoute";
import InstructorRoute from "./components/auth/InstructorRoute";
import PrivateRoute from "./components/auth/PrivateRoute";

// profile or profile sidebar
import MyProfile from "./components/Dashboard/MyProfile";
import Setting from "./components/Dashboard/setting/Setting";
import EnrolledCourse from "./components/Dashboard/EnrolledCourse";
import Cart from "./components/Dashboard/cart/Cart";
import AddCourse from "./components/Dashboard/New Course/AddCourse";
import MyCourse from "./components/Dashboard/my course/MyCourse";
import EditCourse from "./components/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CoursePage from "./pages/CoursePage";

function App() {
  return (
    <div className="w-screen min-h-screen max-w-[100vw] bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/catalog/:catalogName" element=<Catalog /> />
        <Route path="/about" element=<About /> />
        <Route path="/course/:id" element=<CoursePage /> />

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

        <Route
          path="/dashboard"
          element=<PrivateRoute>
            {" "}
            <Dashboard />
          </PrivateRoute>
        >
          {" "}
          <Route path="/dashboard/my-profile" element=<MyProfile /> />
          <Route path="/dashboard/setting" element=<Setting /> />
          {/* Student routes */}
          <Route
            path="/dashboard/cart"
            element=<StudentRoute>
              {" "}
              <Cart />{" "}
            </StudentRoute>
          />
          <Route
            path="/dashboard/enrolled-courses"
            element=<StudentRoute>
              <EnrolledCourse />
            </StudentRoute>
          />
          {/* instructor routes */}
          <Route
            path="/dashboard/add-course"
            element=<InstructorRoute>
              <AddCourse />
            </InstructorRoute>
          />
          <Route
            path="/dashboard/my-courses"
            element=<InstructorRoute>
              <MyCourse />
            </InstructorRoute>
          />
          <Route
            path="/dashboard/edit-course/:id"
            element=<InstructorRoute>
              <EditCourse />
            </InstructorRoute>
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

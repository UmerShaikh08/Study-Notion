"use client";
import "./App.css";
import Loader from "./components/common/Loader";
import Navbar from "./components/common/Navbar";
import LoadingBar from "react-top-loading-bar";
import { lazy } from "react";
import { Suspense } from "react";
import { setProgress } from "./Redux/Slices/loadingbarSlice";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Auth routes
import OpenRoute from "./components/auth/OpenRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import StudentRoute from "./components/auth/StudentRoute";
import InstructorRoute from "./components/auth/InstructorRoute";

// profile or profile sidebar
import Cart from "./components/Dashboard/cart/Cart";
import Catalog from "./pages/Catalog";
import Setting from "./components/Dashboard/setting/Setting";
import MyCourse from "./components/Dashboard/my course/MyCourse";
import VideoPlay from "./components/video page/VideoPlay";
import NotFound from "./pages/NotFound";
import MyProfile from "./components/Dashboard/MyProfile";
import CoursePage from "./pages/CoursePage";
import EditCourse from "./components/Dashboard/EditCourse/EditCourse";
import ContactUsPage from "./pages/ContactUsPage";
import EnrolledCourse from "./components/Dashboard/EnrolledCourse";
import InstructorDashboard from "./components/Dashboard/InstructorDashboard";

//  code splitting
const Otp = lazy(() => import("./pages/Otp"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const AddCourse = lazy(() =>
  import("./components/Dashboard/New Course/AddCourse")
);

function App() {
  const { progress } = useSelector((store) => store.loadingBar);

  const dispatch = useDispatch();
  return (
    <div className="w-screen min-h-screen max-w-[100vw] bg-richblack-900 flex flex-col font-inter">
      {/* Loading bar */}
      <LoadingBar
        color="#eccf0d"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <Navbar setProgress={setProgress} />

      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/catalog/:catalogName" element=<Catalog /> />
        <Route path="/about" element=<About /> />
        <Route path="/course/:id" element=<CoursePage /> />
        <Route path="/contact" element=<ContactUsPage /> />
        <Route path="*" element={<NotFound />} />

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
              <Suspense fallback=<Loader />>
                <ForgotPassword />{" "}
              </Suspense>
            </OpenRoute>
          }
        />

        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <Suspense fallback=<Loader />>
                <UpdatePassword />{" "}
              </Suspense>
            </OpenRoute>
          }
        />

        <Route
          path="/verify-otp"
          element={
            <OpenRoute>
              <Suspense fallback=<Loader />>
                <Otp />{" "}
              </Suspense>
            </OpenRoute>
          }
        />

        {/* dashboard routes */}
        <Route
          path="/dashboard"
          element=<PrivateRoute>
            {" "}
            <Suspense fallback=<Loader />>
              <Dashboard />
            </Suspense>
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
              <Suspense fallback=<Loader />>
                <AddCourse />
              </Suspense>
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
          <Route
            path="/dashboard/instructor"
            element=<InstructorRoute>
              <InstructorDashboard />
            </InstructorRoute>
          />
        </Route>

        {/* video routes */}
        <Route
          path="/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
          element=<StudentRoute>
            <Suspense fallback=<Loader />>
              <VideoPage />
            </Suspense>
          </StudentRoute>
        >
          <Route
            path="/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
            element=<VideoPlay />
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

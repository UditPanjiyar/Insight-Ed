import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./Pages/UpdatePassword";
import VerifyEmail from "./Pages/VerifyEmail";
import About from "./Pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./Pages/Dashboard";
import Error from "./Pages/Error";
import Setting from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import ContactUs from "./Pages/ContactUs";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse.jsx/EditCourse";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import Cart from "./components/core/Dashboard/Cart/index";
import ViewCourse from "./Pages/ViewCourse"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard"

function App() {
  const user = useSelector((state) => state.profile.user);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/catalog/:catalog" element={<Catalog />} />

        {/* <Route path="/courses/:courseId" element={<CourseDetails />} /> */}

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/update-password/:id" element={<UpdatePassword />} />

        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* 1 ******** */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Setting />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              {/* <Route path="dashboard/cart" element={<Cart />} /> */}
              {/* <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              /> */}
              {/* <Route
                path="dashboard/purchase-history"
                element={<PurchaseHistory />}
              /> */}
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
              {/* <Route
                path="dashboard/instructor"
                element={<InstructorDashboard />}
              /> */}
            </>
          )}

          {/* {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/admin-panel" element={<AdminPannel />} />
            </>
          )} */}
        </Route>

        {/* 2 ************ */}

        <Route element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        } >

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (

            <Route
              path="/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
              element={<VideoDetails />}
            />


          )}

        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;

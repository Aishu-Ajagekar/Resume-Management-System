// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import CandidateDashboard from "./components/CandidateDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ApplicationsByJob from "./pages/admin/AppliedJobs";
import Navbar from "./pages/Navbar";
import PageNotFound from "./components/PageNotFound";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import Dashboard from "./pages/admin/AdminHome";
import JobApplicationsChart from "./pages/admin/JobApplicationsChart";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
        <Route path="/admin/applied-jobs" element={<ApplicationsByJob />} />
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>

        <Route path="/home" element={<Home />} />
        <Route path="/admin/home" element={<Dashboard />} />
        <Route path="/admin/job-applications-chart" element={<JobApplicationsChart />} />
      </Routes>
      <ToastContainer
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
      />
    </Router>
  );
}

export default App;

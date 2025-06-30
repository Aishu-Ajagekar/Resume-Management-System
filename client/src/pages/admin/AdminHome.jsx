import React from "react";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
      <h2 className="text-center mb-5 fw-bold text-success">Welcome Admin 👨‍💼</h2>

      <div className="row w-100 justify-content-center gap-3">
        <Link to="/admin/dashboard" className="btn btn-outline-dark btn-lg col-md-3 d-flex align-items-center justify-content-center gap-2 shadow">
          <i className="bi bi-speedometer2"></i> Admin Dashboard
        </Link>

        <Link to="/admin/job-applications-chart" className="btn btn-outline-primary btn-lg col-md-3 d-flex align-items-center justify-content-center gap-2 shadow">
          <i className="bi bi-pie-chart-fill"></i> Pie Chart
        </Link>

        <Link to="/admin/applied-jobs" className="btn btn-outline-success btn-lg col-md-3 d-flex align-items-center justify-content-center gap-2 shadow">
          <i className="bi bi-clipboard-check-fill"></i> Applied Jobs
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;

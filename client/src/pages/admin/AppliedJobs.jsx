import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [applications, setApplications] = useState([]);

  // Fetch all job titles
  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("🔐 Token:", token);

      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/jobs/admin/jobs`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // console.log("📦 Jobs Response:", data.jobs);
      setJobs(data.jobs || []);
    } catch (err) {
      console.error(
        "❌ Error loading jobs:",
        err?.response?.data || err.message
      );
      toast.error("Failed to load job titles");
    }
  };

  // Fetch applications for selected job
  const fetchApplications = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/jobapplication/admin/applications/job/${jobId}`,
        {
          headers: {
            Authorization: token, // ✅ FIXED
          },
        }
      );
      setApplications(data.applications || []);
    } catch (err) {
      console.error(
        "❌ Error loading applications:",
        err?.response?.data || err.message
      );
      toast.error("Failed to load applications");
    }
  };

  // Handle status update
  const handleStatusUpdate = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/jobapplication/admin/update-status/${applicationId}`,
        { status },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success(data.message);
      fetchApplications(selectedJobId);
    } catch (err) {
      console.error(
        "❌ Status update failed:",
        err?.response?.data || err.message
      );
      toast.error("Failed to update application status");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobChange = (e) => {
    const jobId = e.target.value;
    setSelectedJobId(jobId);
    if (jobId) {
      fetchApplications(jobId);
    } else {
      setApplications([]);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Applied Job List </h2>
      {/* Job Dropdown */}
      <div className="mb-3">
        <label className="form-label">Select Job Position:</label>
        <select
          className="form-select"
          value={selectedJobId}
          onChange={handleJobChange}
        >
          <option value="">-- Select a Job --</option>
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title}
              </option>
            ))
          ) : (
            <option disabled>No job positions found</option>
          )}
        </select>
      </div>

      {/* Applications Table */}
      {applications.length > 0 ? (
        <table className="table table-bordered table-striped mt-4">
          <thead className="table-dark">
            <tr>
              <th>Candidate</th>
              <th>Email</th>
              <th>Status</th>
              <th>Resume</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.candidate?.name}</td>
                <td>{app.candidate?.email}</td>
                <td>
                  <span
                    className={`badge bg-${
                      app.status === "Shortlisted"
                        ? "success"
                        : app.status === "Rejected"
                        ? "danger"
                        : "secondary"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <a
                    href={`http://localhost:7878/api/v1/file/${app.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </td>
                {/* <td>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-sm btn-success me-2"
                      onClick={() => handleStatusUpdate(app._id, "Shortlisted")}
                    >
                      Shortlist
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleStatusUpdate(app._id, "Rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </td> */}

                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className={`btn btn-sm me-2 ${
                        app.status === "Rejected" ||
                        app.status === "Shortlisted"
                          ? "btn-secondary"
                          : "btn-success"
                      }`}
                      onClick={() => handleStatusUpdate(app._id, "Shortlisted")}
                      disabled={
                        app.status === "Rejected" ||
                        app.status === "Shortlisted"
                      }
                    >
                      Shortlist
                    </button>

                    <button
                      className={`btn btn-sm  ${
                        app.status === "Shortlisted" ||
                        app.status === "Rejected"
                          ? "btn-secondary"
                          : "btn-danger"
                      }`}
                      onClick={() => handleStatusUpdate(app._id, "Rejected")}
                      disabled={
                        app.status === "Shortlisted" ||
                        app.status === "Rejected"
                      }
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : selectedJobId ? (
        <p className="text-muted">No applications found for this job.</p>
      ) : null}
    </div>
  );
};

export default AppliedJobs;

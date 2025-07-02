import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState("");
  const [applications, setApplications] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // ✅ For individual button loading

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/jobs/admin/jobs`,
        { headers: { Authorization: token } }
      );
      setJobs(data.jobs || []);
    } catch (err) {
      toast.error("Failed to load job titles");
    }
  };

  const fetchApplications = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/jobapplication/admin/applications/job/${jobId}`,
        { headers: { Authorization: token } }
      );
      setApplications(data.applications || []);
    } catch (err) {
      toast.error("Failed to load applications");
    }
  };

  const handleStatusUpdate = async (applicationId, status) => {
    if (loadingId) return;
    setLoadingId(applicationId); // ✅ Show spinner only for clicked row

    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/jobapplication/admin/update-status/${applicationId}`,
        { status },
        { headers: { Authorization: token } }
      );
      toast.success(data.message);
      fetchApplications(selectedJobId);
    } catch (err) {
      toast.error("Failed to update application status");
    } finally {
      setLoadingId(null);
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
    <div className="container my-5">
      <h2 className="mb-4 text-center text-md-start">Applied Job List</h2>

      <div className="mb-3">
        <label className="form-label">Select Job Position:</label>
        <select
          className="form-select"
          value={selectedJobId}
          onChange={handleJobChange}
        >
          <option value="">-- Select a Job --</option>
          {jobs.length > 0 ? (
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

      {applications.length > 0 ? (
        <div className="table-responsive mt-4">
          <table className="table table-bordered table-striped">
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
                      href={`${import.meta.env.VITE_API_URL}/api/v1/file/${app.resume}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        className={`btn btn-sm ${
                          app.status === "Shortlisted" || app.status === "Rejected"
                            ? "btn-secondary"
                            : "btn-success"
                        }`}
                        onClick={() => handleStatusUpdate(app._id, "Shortlisted")}
                        disabled={
                          loadingId === app._id ||
                          app.status === "Shortlisted" ||
                          app.status === "Rejected"
                        }
                      >
                        {loadingId === app._id ? "Please wait..." : "Shortlist"}
                      </button>

                      <button
                        className={`btn btn-sm ${
                          app.status === "Shortlisted" || app.status === "Rejected"
                            ? "btn-secondary"
                            : "btn-danger"
                        }`}
                        onClick={() => handleStatusUpdate(app._id, "Rejected")}
                        disabled={
                          loadingId === app._id ||
                          app.status === "Shortlisted" ||
                          app.status === "Rejected"
                        }
                      >
                        {loadingId === app._id ? "Please wait..." : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : selectedJobId ? (
        <p className="text-muted">No applications found for this job.</p>
      ) : null}
    </div>
  );
};

export default AppliedJobs;

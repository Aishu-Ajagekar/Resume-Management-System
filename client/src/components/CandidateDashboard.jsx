import React, { useEffect, useState } from "react";
import { getJobs } from "../services/jobApi";
import API from "../services/api";
import { toast } from "react-toastify";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getJobs();
        setJobs(res.data.jobs);
      } catch (error) {
        toast.error("Failed to load jobs");
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await API.get("/jobApplication/my-applications", {
          headers: { Authorization: token },
        });
        setAppliedJobIds(res.data.appliedJobIds);
      } catch (error) {
        toast.error("Could not load applied jobs.");
      }
    };
    fetchAppliedJobs();
  }, []);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleApply = async (jobId) => {
    if (!resumeFile) {
      return toast.warning("Please select a resume file first");
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/jobApplication/apply/${jobId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      toast.success("Applied successfully!");
      setAppliedJobIds((prev) => [...prev, jobId]);
      setSelectedJobId(null);
      setResumeFile(null);
    } catch (error) {
      toast.error("Failed to apply. Try again.");
    }
  };

  return (
    <div className="container-fluid px-3 py-4">
      <h2 className="mb-4 text-center text-md-start">Available Jobs</h2>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Requirements</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.title}</td>
                  <td>{job.description}</td>
                  <td>{job.requirements}</td>
                  <td>
                    {selectedJobId === job._id ? (
                      <div className="d-flex flex-column gap-2">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="form-control form-control-sm"
                          onChange={handleFileChange}
                        />
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleApply(job._id)}
                          >
                            Submit
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => {
                              setSelectedJobId(null);
                              setResumeFile(null);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : appliedJobIds.includes(job._id) ? (
                      <button className="btn btn-sm btn-secondary" disabled>
                        Applied
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => setSelectedJobId(job._id)}
                      >
                        Apply
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;

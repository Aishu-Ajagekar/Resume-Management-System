import React, { useEffect, useState } from "react";
import { getJobs, createJob, deleteJob, updateJob } from "../services/jobApi";
import { toast } from "react-toastify";

const AdminJobDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    requirements: "",
  });
  const [editJobId, setEditJobId] = useState(null);

  // Pagination states
  const jobsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const loadJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data.jobs);
    } catch (err) {
      toast.error("Error loading jobs");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSubmit = async () => {
    const { title, description, requirements } = newJob;
    if (!title || !description || !requirements) {
      return toast.error("Please fill all fields");
    }

    try {
      if (editJobId) {
        await updateJob(editJobId, newJob);
        toast.success("Job updated");
        setEditJobId(null);
      } else {
        await createJob(newJob);
        toast.success("Job created");
      }
      setNewJob({ title: "", description: "", requirements: "" });
      loadJobs();
    } catch (err) {
      toast.error("Error saving job");
    }
  };

  const handleEdit = (job) => {
    setNewJob({
      title: job.title,
      description: job.description,
      requirements: job.requirements,
    });
    setEditJobId(job._id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      toast.success("Job deleted");
      loadJobs();
    } catch (err) {
      toast.error("Error deleting job");
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="container-fluid px-3 py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-2">
        <h2 className="text-center text-md-start">Admin Job Dashboard</h2>
      </div>

      {/* Job Form */}
      <div className="card p-3 mb-4">
        <h5 className="mb-3">{editJobId ? "Edit Job" : "Create Job"}</h5>

        <input
          type="text"
          placeholder="Title"
          className="form-control mb-3"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="form-control mb-3"
          rows={2}
          style={{ resize: "none" }}
          value={newJob.description}
          onChange={(e) =>
            setNewJob({ ...newJob, description: e.target.value })
          }
        />

        <textarea
          placeholder="Requirements"
          className="form-control mb-3"
          rows={2}
          style={{ resize: "none" }}
          value={newJob.requirements}
          onChange={(e) =>
            setNewJob({ ...newJob, requirements: e.target.value })
          }
        />

        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          {editJobId ? "Update Job" : "Create Job"}
        </button>
      </div>

      {/* Job Table */}
      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Requirements</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentJobs.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>
                  {Array.isArray(job.requirements)
                    ? job.requirements.join(", ")
                    : job.requirements}
                </td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(job)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {jobs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No jobs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
        <button
          className="btn btn-sm btn-outline-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ⬅ Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn btn-sm btn-outline-primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default AdminJobDashboard;

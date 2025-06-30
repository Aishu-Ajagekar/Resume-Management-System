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

  // Create or Update Job
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

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="container mt-2">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Admin Job Dashboard</h2>
       
      </div>

      <div className="card p-3 mb-4 ">
        <h5>{editJobId ? "Edit Job" : "Create Job"}</h5>
        <input
          type="text"
          placeholder="Title"
          className="form-control my-2"
          value={newJob.title}
          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="form-control my-2"
          rows={2}
          style={{ resize: "none" }}
          value={newJob.description}
          onChange={(e) =>
            setNewJob({ ...newJob, description: e.target.value })
          }
        />

        <textarea
          placeholder="Requirements"
          className="form-control my-2"
          style={{ resize: "none" }}
          value={newJob.requirements}
          onChange={(e) =>
            setNewJob({ ...newJob, requirements: e.target.value })
          }
        />
        <button className="btn btn-primary mt-2 w-100" onClick={handleSubmit}>
          {editJobId ? "Update Job" : "Create Job"}
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
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
                {job.requirements && Array.isArray(job.requirements)
                  ? job.requirements.join(", ")
                  : job.requirements}
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-sm btn-warning me-2"
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
              <td colSpan="4" className="text-center">
                No jobs available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between">
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

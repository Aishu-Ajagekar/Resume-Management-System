





// import React, { useEffect, useState } from "react";
// import { getJobs } from "../services/jobApi";
// import API from "../services/api";
// import { toast } from "react-toastify";
// import axios from "axios";

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const [selectedJobId, setSelectedJobId] = useState(null);
//   const [resumeFile, setResumeFile] = useState(null);
//   const [appliedJobIds, setAppliedJobIds] = useState([]); // ✅ Track applied jobs

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await getJobs();
//         setJobs(res.data.jobs);
//       } catch (error) {
//         toast.error("Failed to load jobs");
//       }
//     };
//     fetchJobs();
//   }, []);

//   const handleFileChange = (e) => {
//     setResumeFile(e.target.files[0]);
//   };

//   const handleApply = async (jobId) => {
//     if (!resumeFile) {
//       return toast.warning("Please select a resume file first");
//     }

//     const formData = new FormData();
//     formData.append("resume", resumeFile);

//     const token = localStorage.getItem("token");

//     try {
//       await axios.post(
//         `http://localhost:7878/api/v1/jobApplication/apply/${jobId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: token,
//           },
//         }
//       );

//       toast.success("Applied successfully!");
//       setAppliedJobIds((prev) => [...prev, jobId]); // ✅ Mark job as applied
//       setSelectedJobId(null);
//       setResumeFile(null);
//     } catch (error) {
//       toast.error("Failed to apply. Try again.");
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Available Jobs</h2>

//       <table className="table table-bordered">
//         <thead className="table-light">
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Requirements</th>
//             <th>Apply</th>
//           </tr>
//         </thead>
//         <tbody>
//           {jobs.length > 0 ? (
//             jobs.map((job) => (
//               <tr key={job._id}>
//                 <td>{job.title}</td>
//                 <td>{job.description}</td>
//                 <td>{job.requirements}</td>
//                 <td>
//                   {/* ✅ Resume upload and submit view */}
//                   {selectedJobId === job._id ? (
//                     <div>
//                       <input
//                         type="file"
//                         accept=".pdf,.doc,.docx"
//                         className="form-control form-control-sm mb-1"
//                         onChange={handleFileChange}
//                       />
//                       <div className="d-flex align-items-center">
//                         <button
//                           className="btn btn-sm btn-success me-2"
//                           onClick={() => handleApply(job._id)}
//                         >
//                           Submit
//                         </button>
//                         <button
//                           className="btn btn-sm btn-secondary"
//                           onClick={() => {
//                             setSelectedJobId(null);
//                             setResumeFile(null);
//                           }}
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </div>
//                   ) : appliedJobIds.includes(job._id) ? (
//                     // ✅ Already applied button
//                     <button className="btn btn-sm btn-secondary" disabled>
//                       Applied
//                     </button>
//                   ) : (
//                     // ✅ Show Apply button
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => setSelectedJobId(job._id)}
//                     >
//                       Apply
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4" className="text-center">
//                 No jobs found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default JobList;



import React, { useEffect, useState } from "react";
import { getJobs } from "../services/jobApi";
import API from "../services/api";
import { toast } from "react-toastify";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState([]); // ✅ Track applied jobs

  // ✅ Fetch all jobs
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

  // ✅ Fetch applied job IDs for this candidate
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await API.get("/jobApplication/my-applications", {
          headers: {
            Authorization: token,
          },
        });
        setAppliedJobIds(res.data.appliedJobIds); // ✅ Save applied job IDs
      } catch (error) {
        console.error("Error fetching applied jobs", error);
        toast.error("Could not load applied jobs.");
      }
    };

    fetchAppliedJobs();
  }, []);

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  // ✅ Handle Apply submit
  const handleApply = async (jobId) => {
    if (!resumeFile) {
      return toast.warning("Please select a resume file first");
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);

    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:7878/api/v1/jobApplication/apply/${jobId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      toast.success("Applied successfully!");
      setAppliedJobIds((prev) => [...prev, jobId]); // ✅ Update state
      setSelectedJobId(null);
      setResumeFile(null);
    } catch (error) {
      toast.error("Failed to apply. Try again.");
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Jobs</h2>

      <table className="table table-bordered">
        <thead className="table-light">
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
                  {/* ✅ Resume upload and submit view */}
                  {selectedJobId === job._id ? (
                    <div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="form-control form-control-sm mb-1"
                        onChange={handleFileChange}
                      />
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-success me-2"
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
                    // ✅ Already applied
                    <button className="btn btn-sm btn-secondary" disabled>
                      Applied
                    </button>
                  ) : (
                    // ✅ Show Apply
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
              <td colSpan="4" className="text-center">
                No jobs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;

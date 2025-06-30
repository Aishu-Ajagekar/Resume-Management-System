// // src/pages/Signup.jsx
// import { useState } from "react";
// import { toast } from "react-toastify";
// // import API from "../services/api";
// import axios from "axios";

// function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "candidate",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // await API.post("/auth/v1/signup", form);
//       await axios.post(`${process.env.VITE_API_URL}/api/v1/auth/signup`, form);
//       toast.success("Signup successful! Please login.");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Signup failed");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           type="text"
//           placeholder="Name"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="email"
//           type="email"
//           placeholder="Email"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//           className="form-control mb-2"
//         />
//         <select
//           name="role"
//           onChange={handleChange}
//           className="form-control mb-2"
//         >
//           <option value="role">Role</option>
//           <option value="candidate">Candidate</option>
//           <option value="admin">Admin</option>
//         </select>
//         <button className="btn btn-primary">Signup</button>
//       </form>
//     </div>
//   );
// }

// export default Signup;

// src/pages/Signup.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
    answer: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:7878/api/v1/auth/signup";
      console.log("urlllll", url);
      console.log("form", form);
      await axios.post(url, form);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message, "signup Failed");
    }
  };

  return (
    <div className="container py-4">
      <div className="row align-items-center">
        {/* Left Side: Image */}
        <div className="col-md-6 text-center">
          <img
            src="/images/signup.jpg"
            alt="Signup"
            className="img-fluid rounded"
          />
        </div>

        {/* Right Side: Signup Form */}
        <div className="col-md-6">
          <h2 className="mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label ">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                autoComplete="off"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                autoComplete="off"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                
                className="form-control"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Security Answer</label>
              <input
                type="text"
                name="answer"
                autoComplete="off"
                className="form-control"
                placeholder="Enter sport name"
                value={form.answer}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                name="role"
                className="form-control"
                value={form.role}
                onChange={handleChange}
              >
                {/* <option value="">-- Select Role --</option> */}
                <option value="candidate">Candidate</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn"
              style={{ backgroundColor: "#007CFF", color: "white" }}
            >
              Register
            </button>
          </form>

          <p className="mt-3">
            Already have an account? <a href="/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

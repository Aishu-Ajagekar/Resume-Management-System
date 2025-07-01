
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
    securityQuestion: "",
    answer: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/v1/auth/signup`;
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
    <div className="container py-2">
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

            {/* <div className="mb-3">
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
            </div> */}

            <div className="mb-3">
              <label className="form-label">Security Question</label>
              <select
                name="securityQuestion"
                className="form-select"
                value={form.securityQuestion}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a question --</option>
                <option value="What is your pet's name?">
                  What is your pet's name?
                </option>
                <option value="What is your favorite color?">
                  What is your favorite color?
                </option>
                <option value="What city were you born in?">
                  What city were you born in?
                </option>
                <option value="What is your favorite sport?">
                  What is your favorite sport?
                </option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Your Answer</label>
              <input
                type="text"
                name="answer"
                autoComplete="off"
                className="form-control"
                placeholder="Enter your answer"
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

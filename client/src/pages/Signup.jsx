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

  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_API_URL}/api/v1/auth/signup`;
      await axios.post(url, form);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      const msg = err?.response?.data?.message || "Signup failed. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-3">
      <div className="row align-items-center">
        {/* Left Side: Image */}
        <div className="col-md-6 mb-3 mb-md-0 text-center">
          <img
            src="/images/signup.jpg"
            alt="Signup"
            className="img-fluid rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>

        {/* Right Side: Signup Form */}
        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-4">
            <h2 className="mb-4 text-center">Sign Up</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
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
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Security Question</label>
                <select
                  name="securityQuestion"
                  className="form-select"
                  value={form.securityQuestion}
                  onChange={handleChange}
                  required
                  disabled={loading}
                >
                  {/* <option value="">-- Select a question --</option>
                  <option value="What is your pet's name?">
                    What is your pet's name?
                  </option>
                  <option value="What is your favorite color?">
                    What is your favorite color?
                  </option>
                  <option value="What city were you born in?">
                    What city were you born in?
                  </option> */}
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
                  className="form-control"
                  placeholder="Enter your answer"
                  value={form.answer}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  name="role"
                  className="form-select"
                  value={form.role}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="candidate">Candidate</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn"
                  style={{ backgroundColor: "#007CFF", color: "white" }}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>

            <p className="mt-3 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-primary text-decoration-none">
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

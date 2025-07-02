import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // prevent double click

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/login`,
        { email, password }
      );

      toast.success("Login successful!");

      // Store token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      // Redirect based on user role
      const role = res.data.user.role;
      if (role === "admin") {
        navigate("/admin/home");
      } else if (role === "candidate") {
        navigate("/candidate/dashboard");
      } else {
        toast.error("Unknown user role.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src="/images/login.jpg"
            alt="Login"
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-6">
          <h2 className="mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#D268CC", color: "white" }}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#D268CC", color: "white" }}
                onClick={() => navigate("/forgot-password")}
                disabled={loading}
              >
                Forgot Password
              </button>
            </div>
          </form>
          <p className="mt-3">
            Don't have an account? <a href="/signup">Create an account</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !answer) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true); // ✅ Start loading
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`,
        { email, newPassword, answer }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error(
        error?.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="container py-4">
      <div className="row align-items-center">
        {/* Image - hidden on small devices */}
        <div className="col-md-6 d-none d-md-block text-center">
          <img
            src="/images/forgot-password.jpg"
            alt="Forgot Password"
            className="img-fluid rounded"
          />
        </div>

        {/* Form - Full width on small devices */}
        <div className="col-12 col-md-6">
          <h2 className="mb-4">Reset Password</h2>
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
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Security Answer</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your favorite sport"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <p className="mt-3 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-decoration-none">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

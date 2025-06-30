// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [answer, setAnswer] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`,
//         { email, newPassword, answer }
//       );
//       if (res && res.data.success) {
//         toast.success(res.data.message);
//         setTimeout(() => {
//           navigate("/login");
//         }, 5000);

//         //localStorage.setItem("auth", JSON.stringify(res.data));
//       } else {
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("something went wrong");
//     }
//     console.log(import.meta.env.VITE_API_URL);
//   };

//   return (
//     <>
//       <div className="container py-4">
//         <div className="row align-items-center">
//           {/* Left Side: Image */}
//           <div className="col-md-6 text-center">
//             <img
//               src="/images/forgot-password.jpg"
//               alt="Login"
//               className="img-fluid rounded"
//             />
//           </div>

//           {/* Right Side: Login Form */}
//           <div className="col-md-6 ">
//             <h2 className="mb-4">Reset Password</h2>
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label">Email</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">New Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   placeholder="Enter password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-3">
//                 <label className="form-label">Enter Answer</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Enter favorite sports name"
//                   value={answer}
//                   onChange={(e) => setAnswer(e.target.value)}
//                   required
//                 />
//               </div>

//               <button type="submit" className="btn btn-primary">
//                 Reset Password
//               </button>
//             </form>
//             <p className="mt-3">
//               Don't have an account? <a href="/register">Create an account</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !newPassword || !answer) {
      toast.error("All fields are required");
      return;
    }

    try {
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
    }
  };

  return (
    <>
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img
              src="/images/forgot-password.jpg"
              alt="Forgot Password"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
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
              <button type="submit" className="btn btn-primary">
                Reset Password
              </button>
            </form>
            <p className="mt-3">
              Don’t have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

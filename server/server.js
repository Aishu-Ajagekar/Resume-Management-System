const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db");
const cors = require("cors");
const path = require("path");

dotenv.config();
dbConnect();

const app = express();
app.use(cors({
   origin: "https://resume-management-system-frontend.onrender.com", 
  credentials: true
}));
app.use(express.json());
// app.use("/uploads", express.static("uploads"));

app.use(
  "/uploads/resumes",
  express.static(path.join(__dirname, "uploads/resumes"))
);

const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoutes);

const jobRoutes = require("./routes/jobRoutes");
app.use("/api/v1/jobs", jobRoutes);

const JobApplication = require("./routes/jobApplicationRoutes");
app.use("/api/v1/jobapplication", JobApplication);

const fileRoute = require('./routes/fileRoute');
app.use('/api/v1', fileRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

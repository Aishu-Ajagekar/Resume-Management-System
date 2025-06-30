// routes/jobApplicationRoutes.js
const express = require("express");
const {
  applyJobController,
  getApplicationsByCandidate,
  getApplicationsByJob,
  updateApplicationStatus,
  getAppliedJobIdsByCandidate,
  getApplicationCountPerJob,
} = require("../controllers/jobApplicationController.js");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware.js");
const upload = require("../middlewares/upload.js");

const router = express.Router();

// Candidate applies for a job
router.post(
  "/apply/:jobId",
  requireSignIn,
  upload.single("resume"),
  applyJobController
);

// Get candidate's applications
// router.get("/my-applications", requireSignIn, getApplicationsByCandidate);

router.get("/my-applications", requireSignIn, getAppliedJobIdsByCandidate);

router.get("/admin/applications/job/:jobId", requireSignIn, isAdmin, getApplicationsByJob);

router.put("/admin/update-status/:applicationId", requireSignIn, isAdmin, updateApplicationStatus);

router.get(
  "/admin/job-applications-count",
  getApplicationCountPerJob
);

module.exports = router;

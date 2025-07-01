// controllers/jobApplicationController.js
const JobApplication = require("../models/JobApplication");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

exports.applyJobController = async (req, res) => {
  try {
    const { jobId } = req.params;
    console.log(jobId);

    // Check if resume file exists
    if (!req.file) {
      return res
        .status(400)
        .send({ success: false, message: "Resume file is missing!" });
    }

    console.log("Uploaded File:", req.file);

    const resumePath = req.file.filename;

    const application = new JobApplication({
      job: jobId,
      candidate: req.user._id,
      resume: resumePath,
    });

    await application.save();
    res.status(201).send({ success: true, message: "Applied successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Application failed" });
  }
};

exports.getApplicationsByCandidate = async (req, res) => {
  try {
    const apps = await JobApplication.find({
      candidate: req.user._id,
    }).populate("job");
    res.status(200).send({ success: true, applications: apps });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Failed to fetch applications" });
  }
};

exports.getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await JobApplication.find({ job: jobId })
      .populate("candidate", "name email")
      .populate("job", "title");

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications by job",
    });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await JobApplication.findById(applicationId)
      .populate("candidate", "name email")
      .populate("job", "title");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Application ${status} and email sent.`,
    });

    // Prepare email text
    const emailText = `Hi ${application.candidate.name},

Your application for the position of ${application.job.title} has been ${status}.

Thank you for your interest.

Best regards`;

    try {
      // Attempt to send the email
      await sendEmail(
        application.candidate.email,
        "Application Status Update",
        emailText
      );
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // You can optionally log this or notify admin
    }

    // Send final response to client
    // res.status(200).json({
    //   success: true,
    //   message: `Application marked as ${status}. Email is sent.`,
    // });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};


//  Get applied job IDs for current candidate
exports.getAppliedJobIdsByCandidate = async (req, res) => {
  try {
    const applications = await JobApplication.find({ candidate: req.user._id });
    const appliedJobIds = applications.map((app) => app.job.toString());

    res.status(200).json({
      success: true,
      appliedJobIds,
    });
  } catch (error) {
    console.error("Error fetching applied jobs", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applied job IDs",
    });
  }
};


// ✅ Get count of applications per job title (for admin chart)
exports.getApplicationCountPerJob = async (req, res) => {
  try {
    const result = await JobApplication.aggregate([
      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "jobDetails"
        }
      },
      { $unwind: "$jobDetails" },
      {
        $group: {
          _id: "$jobDetails.title",
          candidates: { $sum: 1 }
        }
      },
      {
        $project: {
          job: "$_id",
          candidates: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error("Error getting applications per job", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch application counts"
    });
  }
};

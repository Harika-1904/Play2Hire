import express from "express";
import {
  registerRecruiter,
  loginRecruiter,
  getTopCandidates,
  sendInvite,
  getLearnerNotifications,
  getRecruiterInvites,
  updateInviteStatus
} from "../controllers/recruiterController.js";

const router = express.Router();

// 🔐 AUTH
router.post("/register", registerRecruiter);
router.post("/login", loginRecruiter);
// 👨‍💻 DATA
router.get("/top-candidates", getTopCandidates);

// 📩 INVITES
router.post("/send-invite", sendInvite);
router.get("/notifications/:learnerEmail", getLearnerNotifications);

// 🔥 NEW (Recruiter sent invites)
router.get("/sent/:recruiterEmail", getRecruiterInvites);
router.put("/update-invite/:id", updateInviteStatus);

export default router;
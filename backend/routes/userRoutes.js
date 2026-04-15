import express from "express";
import User from "../models/User.js";
import {
  registerUser,
  loginUser,
  updateScore,
  getLeaderboard,

  // ✅ ADD THESE IMPORTS
  sendInvite,
  getRecruiterInvites,
  getLearnerInvites

} from "../controllers/userController.js";

const router = express.Router();

// ✅ EXISTING ROUTES (UNCHANGED)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/score", updateScore);
router.post("/update-score", updateScore);
router.get("/leaderboard", getLeaderboard);

router.get("/me/:email", async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  res.json(user);
});

// ✅ NEW ROUTES (INVITE SYSTEM)

// Send invite (Recruiter)
router.post("/send-invite", sendInvite);

// Recruiter invites page
router.get("/recruiter-invites/:email", getRecruiterInvites);

// Learner notifications
router.get("/learner-invites/:email", getLearnerInvites);

export default router;
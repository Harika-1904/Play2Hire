import express from "express";
import Invite from "../models/Invite.js"; // ✅ IMPORTANT
import {
  sendInvite,
  getInvites,
  getRecruiterInvites,
  updateInviteStatus
} from "../controllers/InviteControllers.js";
const router = express.Router();
// ✅ SEND INVITE
router.post("/send", sendInvite);
// ✅ GET INVITES FOR LEARNER
router.get("/learner/:email", async (req, res) => {
  try {
    const invites = await Invite.find({
      learnerEmail: req.params.email
    }).sort({ createdAt: -1 });
    res.json(invites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ GET INVITES FOR RECRUITER
router.get("/recruiter/:email", async (req, res) => {
  try {
    const invites = await Invite.find({
      recruiterEmail: req.params.email
    }).sort({ createdAt: -1 });

    res.json(invites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// ✅ UPDATE STATUS (ACCEPT / REJECT)
router.put("/status", async (req, res) => {
  try {
    const { id, status } = req.body;
    const updated = await Invite.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
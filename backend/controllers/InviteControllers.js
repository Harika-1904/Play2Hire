import Invite from "../models/Invite.js";
import User from "../models/User.js";

// ✅ SEND INVITE
export const sendInvite = async (req, res) => {
  try {
    const { learnerName, learnerEmail, message } = req.body;

    // ✅ Recruiter must exist in DB
    const recruiter = await User.findOne({ email: req.body.recruiterEmail });

    if (!recruiter) {
      return res.status(404).json({ msg: "Recruiter not found ❌" });
    }

    let learner;

    if (learnerEmail) {
      learner = await User.findOne({ email: learnerEmail });
    }

    if (!learner && learnerName) {
      learner = await User.findOne({ name: learnerName });
    }

    if (!learner) {
      return res.status(404).json({ msg: "Learner not found ❌" });
    }

    const invite = new Invite({
      recruiterEmail: recruiter.email, // ✅ FIXED
      learnerEmail: learner.email,
      learnerName: learner.name,
      message,
    });

    await invite.save();

    res.json({ msg: "Invite sent ✅", invite });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET INVITES FOR LEARNER
export const getInvites = async (req, res) => {
  try {
    const invites = await Invite.find({
      learnerEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(invites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET INVITES FOR RECRUITER
export const getRecruiterInvites = async (req, res) => {
  try {
    const invites = await Invite.find({
      recruiterEmail: req.params.email,
    }).sort({ createdAt: -1 });

    res.json(invites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE STATUS (ACCEPT / REJECT)
export const updateInviteStatus = async (req, res) => {
  try {
    const { id, status } = req.body;

    const invite = await Invite.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(invite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
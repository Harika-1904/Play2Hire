import User from "../models/User.js";
import Notification from "../models/Notification.js";
import Recruiter from "../models/Recruiter.js";

// 🔹 REGISTER
export const registerRecruiter = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await Recruiter.findOne({ email });
    if (exists) {
      return res.json({ message: "Recruiter already exists" });
    }

    const recruiter = await Recruiter.create({
      name,
      email,
      password,
    });

    res.json({ message: "Registered Successfully", user: recruiter });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 LOGIN
export const loginRecruiter = async (req, res) => {
  try {
    const { email, password } = req.body;

    const recruiter = await Recruiter.findOne({ email, password });

    if (!recruiter) {
      return res.json({ message: "Invalid Credentials" });
    }

    res.json({ message: "Login Success", user: recruiter });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Top Candidates
export const getTopCandidates = async (req, res) => {
  try {
    const topCandidates = await User.find().sort({ totalScore: -1 }).limit(10);
    res.json(topCandidates);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 Send Invite
export const sendInvite = async (req, res) => {
  try {
    const { recruiterName, recruiterEmail, learnerEmail } = req.body;

    console.log("Invite Data:", req.body); // 🔥 debug

    const message = `${recruiterName} invited you to apply for a job`;

    const notification = new Notification({
      learnerEmail,
      recruiterName,
      recruiterEmail,
      message,
    });

    await notification.save();

    res.json({ msg: "Invite sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Learner Notifications
export const getLearnerNotifications = async (req, res) => {
  try {
    const { learnerEmail } = req.params;

    const notifications = await Notification.find({
      learnerEmail: learnerEmail.trim(),
    }).sort({ date: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Recruiter Sent Invites (NEW 🔥)
export const getRecruiterInvites = async (req, res) => {
  try {
    const { recruiterEmail } = req.params;

    const invites = await Notification.find({
      recruiterEmail: recruiterEmail.trim(),
    }).sort({ date: -1 });

    res.json(invites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// 🔥 ACCEPT / REJECT
// 🔥 UPDATE INVITE STATUS (Accept / Reject)
export const updateInviteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Notification.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
import User from "../models/User.js";
import Invite from "../models/Invite.js";
// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.json({ message: "User already exists" });
    // ✅ role default learner
    const user = new User({
      name,
      email,
      password,
      role: role || "learner"
    });

    await user.save();

    res.json({ message: "User Registered Successfully ✅", user });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ message: "User not found" });

    if (user.password !== password) return res.json({ message: "Wrong password" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
// UPDATE SCORE + STREAK
export const updateScore = async (req, res) => {
  try {
    const { email, score, module } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found ❌" });
    }

    // ✅ MODULE SCORE UPDATE
    if (!user.moduleScores) {
      user.moduleScores = {};
    }

    user.moduleScores[module] =
      (user.moduleScores[module] || 0) + score;

    // ✅ TOTAL SCORE UPDATE
    user.totalScore = (user.totalScore || 0) + score;

    // 🔥 =========================
    // 🔥 STREAK LOGIC START
    // 🔥 =========================

    const today = new Date().toDateString();

    if (!user.lastActiveDate) {
      user.streak = 1;
    } else {
      const lastDate = new Date(user.lastActiveDate).toDateString();

      const diffDays =
        (new Date(today) - new Date(lastDate)) /
        (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        user.streak = (user.streak || 0) + 1; // ✅ continue streak
      } else if (diffDays > 1) {
        user.streak = 1; // ❌ reset streak
      }
      // same day → no change
    }

    user.lastActiveDate = new Date();

    // 🔥 =========================
    // 🔥 STREAK LOGIC END
    // 🔥 =========================

    await user.save();

    res.json({
      msg: "Score & Streak updated ✅",
      totalScore: user.totalScore,
      moduleScores: user.moduleScores,
      streak: user.streak,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
// ✅ LEADERBOARD (ONLY LEARNERS)
export const getLeaderboard = async (req, res) => {
  try {
    // ✅ only learners + correct sorting
    const users = await User.find({ role: "learner" }).sort({ totalScore: -1 });

    const defaultUsers = [
      { name: "Harika", totalScore: 100, streak: 5 },
      { name: "Divya", totalScore: 50, streak: 3 },
      { name: "Madhu", totalScore: 20, streak: 1 },
    ];

    const merged = users.map(u => ({
      name: u.name,
      totalScore: u.totalScore,
      streak: u.streak || 0
    }));

    defaultUsers.forEach(d => {
      if (!merged.find(u => u.name === d.name)) {
        merged.push(d);
      }
    });

    merged.sort((a, b) => b.totalScore - a.totalScore);

    res.json(merged);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ SEND INVITE (Recruiter)
export const sendInvite = async (req, res) => {
  try {
    const { recruiterEmail, learnerEmail, learnerName, message } = req.body;

    const invite = new Invite({
      recruiterEmail,
      learnerEmail,
      learnerName,
      message
    });

    await invite.save();

    res.json({ msg: "Invite sent ✅", invite });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ✅ Recruiter Invites Page
export const getRecruiterInvites = async (req, res) => {
  try {
    const { email } = req.params;

    const invites = await Invite.find({ recruiterEmail: email })
      .sort({ createdAt: -1 });

    res.json(invites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ✅ Learner Dashboard Notifications
export const getLearnerInvites = async (req, res) => {
  try {
    const { email } = req.params;

    const invites = await Invite.find({ learnerEmail: email })
      .sort({ createdAt: -1 });

    res.json(invites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
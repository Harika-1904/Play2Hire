import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "learner" },
  totalScore: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: Date },
  moduleScores: {
    html: { type: Number, default: 0 },
    css: { type: Number, default: 0 },
    js: { type: Number, default: 0 },
    aptitude: { type: Number, default: 0 },
    hr: { type: Number, default: 0 },
    softskills: { type: Number, default: 0 },
  }
});
export default mongoose.model("User", userSchema);
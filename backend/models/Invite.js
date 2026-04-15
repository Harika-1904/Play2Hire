import mongoose from "mongoose";
const inviteSchema = new mongoose.Schema({
  recruiterEmail: String,
  learnerEmail: String,
  // ✅ ADD THIS
  learnerName: String,
  message: String,
  status: {
    type: String,
    default: "Pending",
  },
  // ✅ ADD THIS (for sorting)
  createdAt: {
    type: Date,
    default: Date.now
  }
});
export default mongoose.model("Invite", inviteSchema);
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  learnerEmail: String,
  recruiterName: String,
  recruiterEmail: String,
  message: String,
  date: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

export default mongoose.model("Notification", notificationSchema);
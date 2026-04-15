import mongoose from "mongoose";
const recruiterSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});
export default mongoose.model("Recruiter", recruiterSchema);
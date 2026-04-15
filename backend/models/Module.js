import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});

const subModuleSchema = new mongoose.Schema({
  title: String,
  content: String,
  quiz: [quizSchema],
});

const moduleSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true }, // e.g. "html"
  subModules: [subModuleSchema],
});

export default mongoose.model("Module", moduleSchema);

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Module from "./models/Module.js";
import userRoutes from "./routes/userRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import inviteRoutes from "./routes/InviteRoutes.js";
import moduleRoutes from "./routes/moduleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/invites", inviteRoutes);
app.use("/api/modules", moduleRoutes);

// Connect to MongoDB Atlas and seed default data
connectDB().then(async () => {
  // ── Seed default users ──────────────────────────────────────────────
  const defaultUsers = [
    { name: "Harika", email: "harika@gmail.com", password: "12345678", totalScore: 100, streak: 5 },
    { name: "Divya",  email: "divya@gmail.com",  password: "12345678", totalScore: 50,  streak: 3 },
    { name: "Madhu",  email: "madhu@gmail.com",  password: "12345678", totalScore: 20,  streak: 1 },
  ];

  for (let user of defaultUsers) {
    const exists = await User.findOne({ email: user.email });
    if (!exists) {
      await User.create(user);
      console.log(`🔥 Default user seeded: ${user.name}`);
    } else {
      console.log(`⏭️  User already exists: ${user.name}`);
    }
  }

  // ── Seed default modules (creates "modules" collection in Atlas) ─────
  const defaultModules = [
    {
      name: "html",
      subModules: [
        { title: "Introduction to HTML", content: "<p>HTML is the standard markup language for web pages.</p>", quiz: [{ question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language"], answer: "Hyper Text Markup Language" }] },
        { title: "HTML Elements", content: "<p>HTML elements are the building blocks of HTML pages.</p>", quiz: [] },
      ],
    },
    {
      name: "css",
      subModules: [
        { title: "Introduction to CSS", content: "<p>CSS is used to style and layout web pages.</p>", quiz: [{ question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System"], answer: "Cascading Style Sheets" }] },
        { title: "CSS Selectors", content: "<p>CSS selectors are used to select HTML elements to style.</p>", quiz: [] },
      ],
    },
    {
      name: "js",
      subModules: [
        { title: "Introduction to JavaScript", content: "<p>JavaScript is a programming language for the web.</p>", quiz: [{ question: "JavaScript runs on?", options: ["Browser", "Database"], answer: "Browser" }] },
        { title: "Variables & Data Types", content: "<p>JavaScript supports var, let, and const for variable declarations.</p>", quiz: [] },
      ],
    },
    {
      name: "aptitude",
      subModules: [
        { title: "Quantitative Aptitude", content: "<p>Covers arithmetic, algebra, and number systems.</p>", quiz: [{ question: "What is 15% of 200?", options: ["25", "30", "35"], answer: "30" }] },
        { title: "Logical Reasoning", content: "<p>Covers patterns, sequences, and logical deductions.</p>", quiz: [] },
      ],
    },
    {
      name: "hr",
      subModules: [
        { title: "HR Interview Basics", content: "<p>Learn how to answer common HR interview questions confidently.</p>", quiz: [{ question: "Tell me about yourself — what should you focus on?", options: ["Personal life", "Professional background & skills"], answer: "Professional background & skills" }] },
        { title: "Behavioral Questions", content: "<p>Use the STAR method: Situation, Task, Action, Result.</p>", quiz: [] },
      ],
    },
    {
      name: "softskills",
      subModules: [
        { title: "Communication Skills", content: "<p>Effective communication is key in the workplace.</p>", quiz: [{ question: "Active listening means?", options: ["Waiting to speak", "Fully concentrating on the speaker"], answer: "Fully concentrating on the speaker" }] },
        { title: "Team Work", content: "<p>Collaboration and mutual respect drive team success.</p>", quiz: [] },
      ],
    },
  ];

  for (let mod of defaultModules) {
    const exists = await Module.findOne({ name: mod.name });
    if (!exists) {
      await Module.create(mod);
      console.log(`📚 Module seeded: ${mod.name}`);
    } else {
      console.log(`⏭️  Module already exists: ${mod.name}`);
    }
  }
});

app.get("/", (req, res) => res.send("Play2Hire API Running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
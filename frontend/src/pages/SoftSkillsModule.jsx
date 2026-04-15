import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
function SoftSkillsModule() {
  const navigate = useNavigate();
  return (
    <div className="module-page">
      <Navbar /><br></br><br></br>
      <h1>💼 Soft Skills Training</h1>
      <h3>📌 Important Skills</h3>
      <ul>
        <li>🗣 Communication</li>
        <li>🤝 Teamwork</li>
        <li>🧠 Problem Solving</li>
        <li>⏱ Time Management</li>
      </ul>
      <h3>💡 Tips</h3>
      <p>
        Improve your communication, stay confident, manage time well, and work effectively in teams.
      </p>
      <button
        className="start-btn"
        onClick={() => navigate("/game/softskills")}
      >
        Finish Module & Play Game 🎮
      </button>
    </div>
  );
}
export default SoftSkillsModule;
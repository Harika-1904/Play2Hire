import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
function HRInterviewModule() {
  const navigate = useNavigate();
  return (
    <div className="module-page">
      <Navbar /><br></br><br></br>
      <h1>🤝 HR Interview Preparation</h1>

      <h3>📌 Important Topics</h3>
      <ul>
        <li>Tell me about yourself</li>
        <li>Strengths & Weaknesses</li>
        <li>Why should we hire you?</li>
        <li>Handling pressure</li>
      </ul>

      <h3>💡 Tips</h3>
      <p>
        Always be confident, honest, and clear. Use real-life examples while answering.
      </p>

      <button
        className="start-btn"
        onClick={() => navigate("/game/hr")}
      >
        Finish Module & Play Game 🎮
      </button>
    </div>
  );
}
export default HRInterviewModule;
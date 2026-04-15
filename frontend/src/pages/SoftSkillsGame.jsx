import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  { id: 1, text: "Speaking clearly in interview", match: "Communication" },
  { id: 2, text: "Working with team members", match: "Teamwork" },
  { id: 3, text: "Finding solution to issue", match: "Problem Solving" },
  { id: 4, text: "Completing tasks on time", match: "Time Management" },
];

const answersData = [
  "Communication",
  "Teamwork",
  "Problem Solving",
  "Time Management",
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function SoftSkillsGame() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(shuffle(answersData));
  const [score, setScore] = useState(0);
  const [matched, setMatched] = useState([]);


  const handleDrop = (q, e) => {
    const dragged = e.dataTransfer.getData("text");

    if (dragged === q.match && !matched.includes(q.id)) {
      setMatched((prev) => [...prev, q.id]);
      setScore((prev) => prev + 10);

      // remove used answer
      setAnswers((prev) => prev.filter((ans) => ans !== dragged));
    }
  };

  const handleDragStart = (e, ans) => {
    e.dataTransfer.setData("text", ans);
  };

  // 🔥 GAME COMPLETE → SAVE SCORE
 useEffect(() => {
  if (matched.length !== questions.length) return;

  const saveScore = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    await fetch("http://localhost:5000/api/users/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        score: score,
        module: "softskills",
      }),
    });

    // 🔥 FORCE EVENT EVERY TIME
    window.dispatchEvent(
      new CustomEvent("scoreUpdated", {
        detail: { time: Date.now() },
      })
    );
  };

  saveScore();
}, [matched, score]); // ✅ FIX

  return (
    <div className="match-container">
      <h2>🎮 Soft Skills Match Game</h2>

      <div className="match-box">
        {/* LEFT */}
        <div className="left">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`item drop-zone ${
                matched.includes(q.id) ? "matched" : ""
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(q, e)}
            >
              {q.text}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="right">
          {answers.map((ans, i) => (
            <div
              key={i}
              className="item draggable"
              draggable
              onDragStart={(e) => handleDragStart(e, ans)}
            >
              {ans}
            </div>
          ))}
        </div>
      </div>

      <h3>Score: {score}</h3>

      {matched.length === questions.length && (
        <h2>🎉 Game Over!</h2>
      )}

      <div className="result-buttons">
        <button
          className="btn retry"
          onClick={() => window.location.reload()}
        >
          🔁 Retry
        </button>

        <button
          className="btn home"
          onClick={() => navigate("/learner-dashboard")}
        >
          🏠 Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default SoftSkillsGame;
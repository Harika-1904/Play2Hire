import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const questions = [
  { id: 1, text: "Tell me about yourself", match: "Professional intro" },
  { id: 2, text: "Strengths", match: "Skills with examples" },
  { id: 3, text: "Why hire you", match: "Show your value" },
];

const answersData = [
  "Professional intro",
  "Skills with examples",
  "Show your value",
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}
function HRGame() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(shuffle(answersData));
  const [score, setScore] = useState(0);
  const [matched, setMatched] = useState([]);


  const handleDrop = (q, e) => {
    const draggedAnswer = e.dataTransfer.getData("text");

    if (draggedAnswer === q.match && !matched.includes(q.id)) {
      setMatched([...matched, q.id]);
      setScore(score + 10);

      // remove used answer
      setAnswers(answers.filter((ans) => ans !== draggedAnswer));
    }
  };

  const handleDragStart = (e, ans) => {
    e.dataTransfer.setData("text", ans);
  };

  // 🔥 GAME COMPLETE → SAVE SCORE TO BACKEND
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
        module: "hr",
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
      <h2>🎮 Drag & Match Game</h2>

      <div className="match-box">
        
        {/* LEFT QUESTIONS */}
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

        {/* RIGHT ANSWERS */}
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

      <h3 className="score">Score: {score}</h3>

      {matched.length === questions.length && (
        <h2 className="game-over">🎉 Game Over!</h2>
      )}

      <div className="result-buttons">
        <button className="btn retry" onClick={() => window.location.reload()}>
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

export default HRGame;
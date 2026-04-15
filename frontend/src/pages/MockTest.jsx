import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  { question: "HTML stands for?", options: ["Hyper Text Markup Language", "Home Tool", "Links"], answer: 0 },
  { question: "CSS used for?", options: ["Styling", "Logic", "DB"], answer: 0 },
  { question: "JS is?", options: ["Language", "Tool", "DB"], answer: 0 },
  { question: "2 + 2 = ?", options: ["3", "4", "5"], answer: 1 },
  { question: "HR checks?", options: ["Skills", "Luck", "Nothing"], answer: 0 },
];

function MockTest() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [finished, setFinished] = useState(false);


  const navigate = useNavigate();

  // TIMER
  useEffect(() => {
    if (time > 0 && !finished) {
      const t = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(t);
    } else if (time === 0) {
      setFinished(true);
    }
  }, [time, finished]);

  const handleAnswer = (i) => {
    let newScore = score;

    if (i === questions[index].answer) {
      newScore = score + 10;
      setScore(newScore);
    } else {
      newScore = score - 5;
      setScore(newScore);
    }

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  // ✅ SAVE SCORE TO BACKEND
  useEffect(() => {
    if (!finished) return; // only run when quiz is complete
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
        }),
      });

      console.log("Mock score saved:", score);
      // ✅ Notify dashboard to re-fetch scores
      window.dispatchEvent(new CustomEvent("scoreUpdated", { detail: { ts: Date.now() } }));
    };

    saveScore();
  }, [finished]);

  // BADGE
  const getBadge = () => {
    if (score >= 40) return "🏆 Expert";
    if (score >= 20) return "⭐ Skilled";
    return "🔰 Beginner";
  };

  return (
    <div className="mock-container">
      {!finished ? (
        <div className="mock-card">

          {/* PROGRESS BAR */}
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(index / questions.length) * 100}%` }}
            ></div>
          </div>

          <h3>⏱ {time}s</h3>
          <h3>{questions[index].question}</h3>

          {questions[index].options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(i)}>
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="result-card">
          <h1>🎉 Test Completed</h1>
          <h2>Score: {score}</h2>
          <h3>{getBadge()}</h3>
<div className="result-buttons">
          <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <button className="btn retry" onClick={() => window.location.reload()}>🔁 Retake test</button>

            <button className="btn home" onClick={() => navigate("/learner-dashboard")}>🏠 Back to Dashboard</button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}

export default MockTest;
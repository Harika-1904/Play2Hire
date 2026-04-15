import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const questions = [
    {
      question: "What does HTML stand for?",
      options: [
        "High Text Machine Language",
        "Hyper Text Markup Language",
        "Hyper Tool Markup Language",
        "Hyper Text Machine Learner",
,        "None"
      ],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "Which tag is used for paragraph?",
      options: ["<h3>", "<h1>","<p>", "<div>", "<span>"],
      answer: "<p>"
    },
    {
      question: "Which tag is used for image?",
      options: ["<marquee>", "<a>", "<p>","<img>", "<h1>"],
      answer: "<img>"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    if (option === questions[current].answer) {
      setScore(score + 10);
    }

    const next = current + 1;

    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };
useEffect(() => {
  if (!showResult) return;

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
        module: "html" // 👈 change per file
      }),
    });

    window.dispatchEvent(
      new CustomEvent("scoreUpdated", {
        detail: { time: Date.now() },
      })
    );
  };

  saveScore();
}, [showResult, score]); // ✅ IMPORTANT
  return (
    <div className="quiz-container">
{showResult ? (
  <div className="result">

    <h2>🎉 Quiz Completed</h2>

    <h3>Your Score: {score}</h3>

    {/* Performance Message */}
    {score >= 30 ? (
      <p className="good">🔥 Excellent Performance!</p>
    ) : score >= 20 ? (
      <p className="avg">👍 Good Job!</p>
    ) : (
      <p className="bad">😅 Keep Practicing!</p>
    )}

    {/* Buttons */}
    <div className="result-buttons">

      <button 
        className="btn retry"
        onClick={() => window.location.reload()}
      >
        🔁 Retry Quiz
      </button>

      <button 
        className="btn home"
        onClick={() => navigate("/learner-dashboard")}
      >
        🏠 Back to Dashboard
      </button>

    </div>

  </div>
): (
        <>
          <h2>{questions[current].question}</h2>

          {questions[current].options.map((opt, index) => (
            <button 
              key={index} 
              className="quiz-btn"
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
export default Quiz;
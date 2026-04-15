import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function QuizCss() {
  const navigate = useNavigate();

  const questions = [
    {
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "How to select a class in CSS?",
      options: [".classname", "#idname", "elementname"],
      answer: ".classname"
    },
    {
      question: "Which property changes text color?",
      options: ["color", "font-size", "background-color"],
      answer: "color"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (option) => {
    setScore(prevScore => {
      const updatedScore =
        option === questions[current].answer ? prevScore + 10 : prevScore;

      const next = current + 1;

      if (next < questions.length) {
        setCurrent(next);
      } else {
        setShowResult(true);
      }

      return updatedScore;
    });
  };

  // 🔥 FIXED USEEFFECT
  useEffect(() => {
    if (!showResult) return;

    const saveScore = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      await fetch("http://localhost:5000/api/users/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          score: score,
          module: "css"
        })
      });

      // ✅ FORCE UPDATE EVENT
      window.dispatchEvent(
        new CustomEvent("scoreUpdated", {
          detail: { time: Date.now() }
        })
      );
    };

    saveScore();
  }, [showResult, score]); // ✅ IMPORTANT FIX

  return (
    <div className="quiz-container">
      {showResult ? (
        <div className="result">
          <h2>🎉 Quiz Completed</h2>
          <p>Your Score: {score}</p>

          {score >= 25 ? (
            <p className="good">🔥 Excellent Performance!</p>
          ) : score >= 15 ? (
            <p className="avg">👍 Good Job!</p>
          ) : (
            <p className="bad">😅 Keep Practicing!</p>
          )}

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
      ) : (
        <>
          <h2>{questions[current].question}</h2>

          {questions[current].options.map((opt, i) => (
            <button
              key={i}
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

export default QuizCss;
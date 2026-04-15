import { useState, useEffect } from "react";

function QuizJs() {
  const questions = [
    {
      question: "Which keyword declares a block-scoped variable?",
      options: ["var", "let", "function"],
      answer: "let"
    },
    {
      question: "Which symbol is used for comments in JS?",
      options: ["//", "/* */", "#"],
      answer: "//"
    },
    {
      question: "How do you declare a function?",
      options: ["function myFunc(){}", "func myFunc(){}", "define myFunc(){}"],
      answer: "function myFunc(){}"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
const [submitted, setSubmitted] = useState(false);
  const handleAnswer = (option) => {
    setScore(prev => {
      const updatedScore = option === questions[current].answer ? prev + 10 : prev;
      const next = current + 1;
      if(next < questions.length) setCurrent(next);
      else setShowResult(true);
      return updatedScore;
    });
  };
useEffect(() => {
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
        score: score
      })
    });

    setSubmitted(true);
  };

  if (showResult && !submitted) {
    saveScore();
  }
}, [showResult, submitted, score]);
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
            <button className="btn retry" onClick={() => window.location.reload()}>🔁 Retry Quiz</button>
            <button className="btn home" onClick={() => window.location.href="/learner-dashboard"}>🏠 Back to Dashboard</button>
          </div>
        </div>
      ) : (
        <>
          <h2>{questions[current].question}</h2>
          {questions[current].options.map((opt,i) => (
            <button key={i} className="quiz-btn" onClick={()=>handleAnswer(opt)}>
              {opt}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

export default QuizJs;
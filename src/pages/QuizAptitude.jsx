import { useState, useEffect } from "react";

function QuizAptitude() {
  const questions = [
    {
      question: "Find the next number: 2, 4, 8, 16, ?",
      options: ["18", "32", "24"],
      answer: "32"
    },
    {
      question: "If all Bloops are Razzies and all Razzies are Lazzies, are all Bloops Lazzies?",
      options: ["Yes", "No", "Cannot Determine"],
      answer: "Yes"
    },
    {
      question: "What is 15% of 200?",
      options: ["20", "25", "30"],
      answer: "30"
    }
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
const [submitted, setSubmitted] = useState(false);
const user = JSON.parse(localStorage.getItem("user"));
console.log(user);
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
          {questions[current].options.map((opt,i)=>(
            <button key={i} className="quiz-btn" onClick={()=>handleAnswer(opt)}>{opt}</button>
          ))}
        </>
      )}
    </div>
  );
}

export default QuizAptitude;
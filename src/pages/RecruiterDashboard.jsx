import { useEffect, useState } from "react";
import RecruiterNavbar from "../components/RecruiterNavbar";
function getBadge(score) {
  if (score >= 80) return "🏆 Expert";
  if (score >= 50) return "⭐ Skilled";
  return "🔰 Beginner";
}
export default function RecruiterDashboard() {
  const [learners, setLearners] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users/leaderboard")
      .then(res => res.json())
      .then(data => {
        setLearners(data);
      });
  }, []);
  // 🔥 STRONGEST SKILL CALCULATION
  const getStrongSkill = (score) => {
    if (score >= 80) return "Full Stack 🚀";
    if (score >= 50) return "Frontend 💻";
    return "Beginner 🌱";
  };
  // 🔥 SEND INVITE
  const sendInvite = async (email) => {
    await fetch("http://localhost:5000/api/invites/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        recruiterEmail: "recruiter@gmail.com",
        learnerEmail: email,
        message: "You are shortlisted 🚀",
      }),
    });
    alert("Invite Sent ✅");
  };
  return (
    <>
      <RecruiterNavbar />
      <div className="dashboard">
        <h1>👔 Recruiter Dashboard</h1>
        <div className="modules-container">
          {learners.map((l, i) => {
            const score = l.totalScore || 0;
            return (
              <div
                key={i}
                className="card"
                style={{
                  marginBottom: "15px",
                  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                }}
              >
                <h3>{l.name}</h3>
                <p>Email: {l.email}</p>
                <p>
                  Score: {score} {getBadge(score)}
                </p>
                <p>
                  Strong Skill: {getStrongSkill(score)}
                </p>
                {/* 🔥 PROGRESS BAR */}
                <div
                  style={{
                    backgroundColor: "#ddd",
                    height: "15px",
                    marginTop: "5px",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(score, 100)}%`,
                      backgroundColor:
                        score >= 80
                          ? "gold"
                          : score >= 50
                          ? "lightgreen"
                          : "red",
                      height: "15px",
                    }}
                  ></div>
                </div>
                <button
                  className="btn"
                  style={{ marginTop: "10px" }}
                  onClick={() => sendInvite(l.email || l.learnerEmail)}
                >
                  Send Invite 📩
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
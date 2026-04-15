import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const modules = ["html", "css", "js", "aptitude", "hr", "softskills"];

const moduleRoutes = {
  html: "/module/html",
  css: "/module/css",
  js: "/module/js",
  aptitude: "/module/aptitude",
  hr: "/module/hr",
  softskills: "/module/softskills",
};

const modDisplay = {
  html: "HTML",
  css: "CSS",
  js: "JavaScript",
  aptitude: "Aptitude",
  hr: "HR",
  softskills: "Soft Skills",
};

function getBadge(score) {
  if (score === 100) return "🏆 Expert";
  if (score >= 50) return "⭐ Skilled";
  return "🔰 Beginner";
}

function LearnerDashboard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("Guest");
  const [moduleScores, setModuleScores] = useState({});
  const [isExisting, setIsExisting] = useState(false);

  const handleContinue = (mod) => {
    navigate(moduleRoutes[mod]);
  };

  const handleExistingUser = () => {
    setIsExisting(true); // ✅ ONLY STATE
  };

  useEffect(() => {
    const init = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      setUsername(user.name);

      try {
        const res = await fetch("http://localhost:5000/api/users/leaderboard");
        const users = await res.json();

        const currentUser = users.find((u) => u.email === user.email);

        if (currentUser) {
          const score = currentUser.totalScore || 0;

          setModuleScores({
            html: score,
            css: score,
            js: score,
            aptitude: score,
            hr: score,
            softskills: score,
          });
        }
      } catch (err) {
        console.log("Error:", err);
      }
    };

    init();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <br /><br />

      <h1>
        {isExisting
          ? `Welcome back, ${username} 👋`
          : "Let's Build Something Smart 🧠"}
      </h1>

      {/* ✅ BUTTONS */}
      {!isExisting && (
        <div className="toggle-buttons">
          <button
            className="toggle-btn new-user-btn active"
            onClick={() => navigate("/path")}
          >
            New User
          </button>

          <button
            className="toggle-btn old-user-btn"
            onClick={handleExistingUser}
          >
            Existing User
          </button>
        </div>
      )}

      {/* ✅ MODULES */}
      {isExisting && (
        <div className="modules-container">
          {modules.map((mod) => {
            const score = moduleScores[mod] || 0;

            return (
              <div
                key={mod}
                className="card"
                style={{
                  marginBottom: "15px",
                  background: "linear-gradient(135deg, #6366f1, #06b6d4)",
                }}
              >
                <h4>{modDisplay[mod]}</h4>

                <p>
                  Score: {score} {getBadge(score)}
                </p>

                <div style={{ backgroundColor: "#ffffff", height: "15px" }}>
                  <div
                    style={{
                      width: `${Math.min(score, 100)}%`,
                      backgroundColor:
                        score === 100
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
                  onClick={() => handleContinue(mod)}
                  style={{ marginTop: "10px" }}
                >
                  Continue {modDisplay[mod]}
                </button>
              </div>
            );
          })}

          <div
            className="card"
            style={{
              marginTop: "20px",
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
            }}
          >
            <button className="btn" onClick={() => navigate("/mocktest")}>
              Take Mock Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearnerDashboard;
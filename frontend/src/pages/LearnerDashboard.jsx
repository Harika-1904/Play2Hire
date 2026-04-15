import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

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
  if (score >= 80) return "🏆 Expert";
  if (score >= 40) return "⭐ Intermediate";
  return "🔰 Beginner";
}

function LearnerDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [username, setUsername] = useState("Guest");
  const [moduleScores, setModuleScores] = useState({});
  const [isExisting, setIsExisting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // ✅ forces re-fetch on every quiz submit

  const handleContinue = (mod) => {
    navigate(moduleRoutes[mod]);
  };

 useEffect(() => {
  const init = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    setUsername(user.name);

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/me/${user.email}`,
        { cache: "no-store" } // ✅ IMPORTANT FIX
      );

      const currentUser = await res.json();

      if (currentUser) {
        const scores = currentUser.moduleScores || {
          html: 0,
          css: 0,
          js: 0,
          aptitude: 0,
          hr: 0,
          softskills: 0,
        };

        setModuleScores({ ...scores }); // ✅ FORCE RE-RENDER

        if (
          currentUser.totalScore > 0 ||
          Object.values(scores).some((v) => v > 0)
        ) {
          setIsExisting(true);
        }
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };

  init();

  const handleScoreUpdated = () => {
    setRefreshKey((k) => k + 1);
  };

  window.addEventListener("scoreUpdated", handleScoreUpdated);

  return () => {
    window.removeEventListener("scoreUpdated", handleScoreUpdated);
  };
}, [refreshKey]); // ✅ re-runs whenever refreshKey changes

  return (
    <div className="dashboard">
      <Navbar />
      <br /><br />

      <h1>
        {isExisting
          ? `${t("welcome_back")} ${username} 👋`
          : t("build_smart")}
      </h1>

      {!isExisting && (
        <div className="toggle-buttons">
          <button
            className="toggle-btn new-user-btn active"
            onClick={() => navigate("/path")}
          >
            {t("new_user")}
          </button>

          <button
            className="toggle-btn old-user-btn"
            onClick={() => setIsExisting(true)}
          >
            {t("existing_user")}
          </button>
        </div>
      )}

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
                  background:
                    "linear-gradient(135deg, #6366f1, #06b6d4)",
                }}
              >
                <h4>{modDisplay[mod]}</h4>

                <p>
                  {t("score")} {score} {getBadge(score)}
                </p>

                <div
                  style={{
                    backgroundColor: "#ddd",
                    height: "15px",
                    borderRadius: "5px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(score, 100)}%`,
                      backgroundColor:
                        score >= 80
                          ? "gold"
                          : score >= 40
                          ? "lightgreen"
                          : "red",
                      height: "15px",
                      transition:
                        "width 0.8s ease-in-out, background-color 0.8s ease-in-out",
                    }}
                  ></div>
                </div>

                <button
                  className="btn"
                  onClick={() => handleContinue(mod)}
                  style={{ marginTop: "10px" }}
                >
                  {t("continue")} {modDisplay[mod]}
                </button>
              </div>
            );
          })}

          <div
            className="card"
            style={{
              marginTop: "20px",
              background:
                "linear-gradient(135deg, #6366f1, #06b6d4)",
              width: "auto",
              maxWidth: "600px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "15px",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button
                className="btn"
                style={{ margin: 0 }}
                onClick={() => navigate("/mocktest")}
              >
                {t("take_mock_test")}
              </button>
              <button
                className="btn"
                style={{ backgroundColor: "#8b5cf6", margin: 0 }}
                onClick={() => navigate("/game/js-memory")}
              >
                {t("play_memory_game")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LearnerDashboard;
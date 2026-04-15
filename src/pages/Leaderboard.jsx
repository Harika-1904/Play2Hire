import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function getSkill(score) {
  if (score >= 60) return "🏆 Expert";
  if (score >= 30) return "⭐ Skilled";
  return "🔰 Beginner";
}

function Leaderboard() {
  const [users, setUsers] = useState([]);

  const loadLeaderboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/leaderboard");
      const data = await res.json();
      setUsers(data.sort((a,b) => b.totalScore - a.totalScore));
    } catch (err) {
      console.log("Error fetching leaderboard:", err);
    }
  };

  useEffect(() => {
  loadLeaderboard();

  const interval = setInterval(loadLeaderboard, 2000); // ✅ auto refresh
  return () => clearInterval(interval);

}, []);
  return (
    <div className="dashboard">
      <Navbar /><br /><br />
      <h1>🏆 Leaderboard</h1>
      {users.length > 0 ? (
        users.map((user, i) => (
          <p key={i} style={{ color: "white", fontWeight: "bold" }}>
            #{i+1} {user.name} - {getSkill(user.totalScore)} 🔥 Streak: {user.streak || 0}
          </p>
        ))
      ) : (
        <p style={{ color: "white" }}>No users found</p>
      )}
    </div>
  );
}

export default Leaderboard;
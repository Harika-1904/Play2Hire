import RecruiterNavbar from "../components/RecruiterNavbar";
import { useState } from "react";

function getSkill(score) {
  if (score >= 80) return "🏆 Expert";
  if (score >= 50) return "⭐ Skilled";
  return "🔰 Beginner";
}

export default function RecruiterProfile() {
  // Mock recruiter profile data
  const [profile] = useState({
    name: "Ravi Kumar",
    email: "ravi.recruiter@example.com",
    role: "Recruiter",
    skills: {
      sourcing: 85,
      interviewing: 70,
      negotiation: 60,
    }
  });

  const strongestSkill = Object.entries(profile.skills).sort((a,b)=>b[1]-a[1])[0][0].toUpperCase();

  return (
    <>
      <RecruiterNavbar />
      <div className="dashboard">
        <h1>👤 Recruiter Profile</h1>

        <div className="card" style={{ maxWidth:"400px", margin:"40px auto" }}>
          <h3>{profile.name}</h3>
          <p>Email: <a href={`mailto:${profile.email}`} style={{color:"#10b981"}}>{profile.email}</a></p>
          <p>Role: {profile.role}</p>
          <p>Strongest Skill: {strongestSkill}</p>

          <div className="stats">
            {Object.entries(profile.skills).map(([skill, score], idx) => (
              <div key={idx} style={{ marginBottom:"12px" }}>
                <p style={{marginBottom:"5px"}}>{skill.toUpperCase()}: {getSkill(score)}</p>
                <div className="progress-bar">
                  <div 
                    className={`progress ${score >= 80 ? "expert" : score >=50 ? "skilled" : "beginner"}`}
                    style={{width: `${score}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
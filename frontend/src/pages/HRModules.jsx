import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function HRModules() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar /><br></br><br></br><br></br><br></br><br></br>
      <h1 style={{color:"white",textAlign:"center"}}>💼 HR Skills</h1>
        {/* HR Interview */}
        <div className="learning-card">
          <h2>🤝 HR Interview</h2>
          <p>Prepare for HR questions</p>

          <button onClick={() => navigate("/module/hr")}>
            Start Learning
          </button>
        </div>

        {/* Soft Skills */}
        <div className="learning-card">
          <h2>🧠 Soft Skills</h2>
          <p>Improve communication & teamwork</p>

          <button onClick={() => navigate("/module/softskills")}>
            Start Learning
          </button>
        </div>
</div>
     
   
    
  );
}

export default HRModules;
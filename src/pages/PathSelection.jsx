import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PathSelection() {
  const navigate = useNavigate();

  return (
    <div className="learning-container">
<Navbar /><br></br><br></br>
      <h1>Choose Your Learning Path</h1>

      {/* Technical */}
      <div className="learning-card">
        <h3>💻 Technical Skills</h3>
        <p>HTML, CSS, JavaScript, Aptitude</p>

        <button onClick={() => navigate("/technical")}>
          Select Technical
        </button>
      </div>

     
      <div className="learning-card">
        <h3>🧑‍💼 HR Preparation</h3>
        <p>Interview questions, communication skills</p>

        <button onClick={() => navigate("/hr")}>
          Select HR
        </button>
      </div>
      <div className="learning-card">
        <h3>🧠Mock Test</h3>
        <p>Test your Skills</p>
        <button onClick={() => navigate("/mocktest")}>
      Start Mock Test 🚀
</button>
</div>
    </div>
  );
}

export default PathSelection;
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function AptitudeModule() {
  const navigate = useNavigate();

  return (
    <div className="module-container">
  <Navbar /><br></br><br></br>
      <h1>🧠 Aptitude Basics</h1>

      <div className="module-content">
        <h3>Topics Covered</h3>
        <ul>
          <li>Logical Reasoning</li>
          <li>Quantitative Aptitude</li>
          <li>Verbal Ability</li>
        </ul>

        <button
          className="btn start"
          onClick={() => navigate("/quiz/aptitude")}
    >
          Complete Module & Start Quiz 🚀
        </button>
      </div>
    </div>
  );
}
export default AptitudeModule;
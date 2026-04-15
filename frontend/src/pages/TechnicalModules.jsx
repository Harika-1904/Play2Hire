import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function TechnicalModules() {
  const navigate = useNavigate();
  return (
    <div className="learning-container1">
      <Navbar /><br></br><br></br>
      <h1>💻 Technical Modules</h1>
      {/* HTML */}
      <div className="learning-card">
        <h3>HTML Basics</h3>
        <p>Learn structure of web pages</p>
        <button onClick={() => navigate("/module/html")}>
          Start Module
        </button>
      </div>
      {/* CSS */}
      <div className="learning-card">
        <h3>CSS Basics</h3>
        <p>Style your website beautifully</p>
        <button onClick={() => navigate("/module/css")}>
          Start Module
        </button>
      </div>
      {/* JavaScript */}
      <div className="learning-card">
        <h3>JavaScript Basics</h3>
        <p>Make your website interactive</p>
        <button onClick={() => navigate("/module/js")}>
          Start Module
        </button>
      </div>
      {/* Aptitude */}
      <div className="learning-card">
        <h3>Aptitude</h3>
        <p>Improve problem-solving skills</p>
        <button onClick={() => navigate("/module/aptitude")}>
          Start Module
        </button>
      </div>

    </div>
  );
}
export default TechnicalModules;
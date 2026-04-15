import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function JsModule() {
  const navigate = useNavigate();

  return (
    <div className="module-container">
      <Navbar /><br></br><br></br>
      <h1>💻 JavaScript Basics</h1>

      <div className="module-content">
        <h3>What is JavaScript?</h3>
        <p>JS is a programming language to make web pages interactive.</p>

        <h3>Variables</h3>
        <ul>
          <li>var, let, const</li>
        </ul>

        <h3>Functions</h3>
        <ul>
          <li>function myFunc() {}</li>
        </ul>

        <button
          className="btn start"
          onClick={() => navigate("/quiz/js")}
        >
          Complete Module & Start Quiz 🚀
        </button>
      </div>
    </div>
  );
}
export default JsModule;
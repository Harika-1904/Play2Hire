import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function CssModule() {
  const navigate = useNavigate();

  return (
    <div className="module-container">
      <Navbar /><br></br><br></br>
      <h1>🎨 CSS Basics</h1>

      <div className="module-content">
        <h3>What is CSS?</h3>
        <p>CSS (Cascading Style Sheets) is used to style HTML pages.</p>

        <h3>Selectors</h3>
        <ul>
          <li>Element selector → div, p, h1</li>
          <li>Class selector → .classname</li>
          <li>ID selector → #idname</li>
        </ul>

        <h3>Properties</h3>
        <ul>
          <li>color → changes text color</li>
          <li>font-size → changes font size</li>
          <li>background-color → changes background color</li>
        </ul>

        <button
          className="btn start"
          onClick={() => navigate("/quiz/css")}
        >
          Complete Module & Start Quiz 🚀
        </button>
      </div>
    </div>
  );
}

export default CssModule;
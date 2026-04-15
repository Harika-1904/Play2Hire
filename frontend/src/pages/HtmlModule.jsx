import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
function HtmlModule() {
  const navigate = useNavigate();
  return (
    <div className="module-container">
      <Navbar /><br></br><br></br>
      <h1>📘 HTML Basics</h1>
      <div className="module-content">
        <h3>What is HTML?</h3>
        <p>HTML is used to structure web pages.</p>
        <h3>Basic Tags</h3>
        <ul>
          <li>&lt;h1&gt; → Heading</li>
          <li>&lt;p&gt; → Paragraph</li>
          <li>&lt;a&gt; → Link</li>
          <li>&lt;img&gt; → Image</li>
        </ul>
        <h3>Example</h3>
        <p>&lt;h1&gt;Hello World&lt;/h1&gt;</p>
      </div>
      <button 
  className="btn start"
  onClick={() => navigate("/quiz/html")}
>
  Complete Module & Start Quiz 🚀
</button>
    </div>
  );
}
export default HtmlModule;
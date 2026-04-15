import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import LearnerLogin from "./pages/LearnerLogin";
import RecruiterLogin from "./pages/RecruiterLogin";
import LearnerRegister from "./pages/LearnerRegister";
import RecruiterRegister from "./pages/RecruiterRegister";
import LearnerDashboard from "./pages/LearnerDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PathSelection from "./pages/PathSelection";
import TechnicalModules from "./pages/TechnicalModules";
import HtmlModule from "./pages/HtmlModule";
import Quiz from "./pages/QuizPage";
import CssModule from "./pages/CssModule";
import QuizCss from "./pages/QuizCss";
import JsModule from "./pages/JsModule";
import QuizJs from "./pages/QuizJs";
import AptitudeModule from "./pages/AptitudeModule";
import QuizAptitude from "./pages/QuizAptitude";
import HRInterviewModule from "./pages/HRInterviewModule";
import HRGame from "./pages/HRGame";
import HRModules from "./pages/HRModules";
import SoftSkillsModule from "./pages/SoftSkillsModule";
import SoftSkillsGame from "./pages/SoftSkillsGame";
import MockTest from "./pages/MockTest";
import Leaderboard from "./pages/Leaderboard";
import RecruiterProfile from "./pages/RecruiterProfile";
import RecruiterInvites from "./pages/RecruiterInvites";
import JsMemoryGame from "./pages/JsMemoryGame";
import Roadmap from "./pages/Roadmap";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learner-login" element={<LearnerLogin />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/learner-register" element={<LearnerRegister />} />
       <Route path="/recruiter-register" element={<RecruiterRegister />} />
       <Route path="/learner-dashboard" element={<LearnerDashboard />} />
       <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
       <Route path="/path" element={<PathSelection />} />
       <Route path="/technical" element={<TechnicalModules />} />
        <Route path="/module/html" element={<HtmlModule />} />
        <Route path="/mocktest" element={<MockTest/>}/>
       <Route path="/quiz/html" element={<Quiz/>}/>
        <Route path="/module/css" element={<CssModule />} />
       <Route path="/quiz/css" element={<QuizCss/>}/>
        <Route path="/module/js" element={<JsModule />} />
        <Route path="/quiz/js" element={<QuizJs/>}/>
        <Route path="/game/js-memory" element={<JsMemoryGame />} />
        <Route path="/module/aptitude" element={<AptitudeModule />} />
       <Route path="/quiz/aptitude" element={<QuizAptitude/>}/>
       <Route path="/hr" element={<HRModules/>}/>
        <Route path="/module/hr" element={<HRInterviewModule />} />
        <Route path="/game/hr" element={<HRGame />} />
        <Route path="/module/softskills" element={<SoftSkillsModule />} />
<Route path="/game/softskills" element={<SoftSkillsGame />} />
<Route path="/leaderboard" element={<Leaderboard />} />
  <Route path="/recruiter-profile" element={<RecruiterProfile />} />
<Route path="/recruiter-invites" element={<RecruiterInvites />} />
<Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </div>
  );
}
export default App;





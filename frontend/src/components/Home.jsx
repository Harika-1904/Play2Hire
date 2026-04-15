import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="home">
      <Navbar /><br></br>
      <div className="hero">
        <h1>PLAY2HIRE</h1>
        <p>{t('sub_title')}</p>
        <div className="buttons">
          <button 
            className="btn start"
            onClick={() => navigate("/learner-login")}
          >
            {t('start_learning')}
          </button>
          <button 
            className="btn recruit"
            onClick={() => navigate("/recruiter-login")}
          >
            {t('recruiter_login')}
          </button>
        </div>
      </div>

      <div className="leaderboard">
        <h2>{t('top_players')}</h2>
        <div className="player">
          <span>🥇 Harika</span>
          <span>🔥 Streak:5</span>
        </div>
        <div className="player">
          <span>🥈 Divya</span>
          <span>🔥 Streak:3</span>
        </div>
        <div className="player">
          <span>🥉 Madhu</span>
          <span>🔥 Streak:1</span>
        </div>
      </div>

      <footer className="footer">
        <p>{t('about')}</p>
      </footer>
    </div>
  );
}

export default Home;
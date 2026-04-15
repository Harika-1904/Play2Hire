import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import './Roadmap.css';
import { useTranslation } from "react-i18next";

const HexNode = ({ left, top, label, icon, type, onClick }) => {
  const isTerminus = type === 'start' || type === 'finish';
  
  return (
    <div 
      className={`hex-wrapper ${type}`}
      style={{ left: `${left}px`, top: `${top}px` }}
      onClick={onClick}
    >
      <div className="hex-outer">
        <div className="hex-inner">
          <div className="hex-icon" style={{ fontSize: isTerminus ? '32px' : '45px' }}>{icon}</div>
          {label && <div className="hex-label">{label}</div>}
        </div>
      </div>
    </div>
  );
};

function Roadmap() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="roadmap-page">
      <Navbar />
      
      <div className="roadmap-header">
        <h1>🌐 {t('roadmap')}</h1>
        <p>Interactive Sci-Fi Tech Tree</p>
      </div>

      <div className="map-scroll-container">
        <div className="map-container">
          
          {/* Top Row Zig-Zag (L to R) */}
          <HexNode left={0} top={0} icon="🏁" label="START" type="start" />
          <HexNode left={180} top={104} icon="</>" label="HTML" type="module" onClick={() => navigate('/module/html')} />
          <HexNode left={360} top={0} icon="🎨" label="CSS" type="module" onClick={() => navigate('/module/css')} />
          <HexNode left={540} top={104} icon="⚡" label="JAVASCRIPT" type="module" onClick={() => navigate('/module/js')} />

          {/* Bottom Row Zig-Zag (R to L) */}
          {/* Aptitude drops straight down from JS */}
          <HexNode left={540} top={312} icon="🧠" label="APTITUDE" type="module" onClick={() => navigate('/module/aptitude')} />
          <HexNode left={360} top={208} icon="🤝" label="HR" type="module" onClick={() => navigate('/module/hr')} />
          <HexNode left={180} top={312} icon="🗣️" label="SOFT SKILLS" type="module" onClick={() => navigate('/module/softskills')} />
          <HexNode left={0} top={208} icon="🏆" label="FINISH" type="finish" />
          
        </div>
      </div>

    </div>
  );
}

export default Roadmap;

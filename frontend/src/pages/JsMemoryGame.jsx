import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";

const cardData = [
  { id: 1, text: "let", matchId: 1 },
  { id: 2, text: "Block Scope Var", matchId: 1 },
  { id: 3, text: "const", matchId: 2 },
  { id: 4, text: "Constant Value", matchId: 2 },
  { id: 5, text: "function()", matchId: 3 },
  { id: 6, text: "Reusable Code", matchId: 3 },
  { id: 7, text: "=>", matchId: 4 },
  { id: 8, text: "Arrow Function", matchId: 4 },
];

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function JsMemoryGame() {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [flippedIndex, setFlippedIndex] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setCards(shuffle(cardData));
  }, []);

  const handleCardClick = (index) => {
    if (flippedIndex.length === 2 || flippedIndex.includes(index) || matchedPairs.includes(cards[index].matchId)) return;

    const newFlipped = [...flippedIndex, index];
    setFlippedIndex(newFlipped);

    if (newFlipped.length === 2) {
      const match1 = cards[newFlipped[0]].matchId;
      const match2 = cards[newFlipped[1]].matchId;

      if (match1 === match2) {
        setMatchedPairs((prev) => [...prev, match1]);
        setScore((prev) => prev + 25);
        setFlippedIndex([]);
      } else {
        setTimeout(() => setFlippedIndex([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedPairs.length !== 4) return;
    const saveScore = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      await fetch("http://localhost:5000/api/users/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, score: score, module: "js" })
      });
      // ✅ Notify dashboard to re-fetch scores
      window.dispatchEvent(new CustomEvent("scoreUpdated", { detail: { ts: Date.now() } }));
    };

    saveScore();
  }, [matchedPairs, score]);

  return (
    <div className="dashboard" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar />
      <h2 style={{marginTop: '20px', color: 'white'}}>🧠 JavaScript Memory Match</h2>
      <h3 style={{color: '#10b981', marginBottom: '30px'}}>Score: {score}</h3>
      
      <div style={{
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 150px)', 
        gap: '15px', 
        justifyContent: 'center', 
        margin: '20px auto'
      }}>
        {cards.map((card, index) => {
          const isFlipped = flippedIndex.includes(index) || matchedPairs.includes(card.matchId);
          return (
            <div 
              key={index} 
              onClick={() => handleCardClick(index)}
              style={{
                width: '150px', height: '150px',
                backgroundColor: isFlipped ? (matchedPairs.includes(card.matchId) ? '#10b981' : '#4f46e5') : '#1f2937',
                color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '10px',
                cursor: 'pointer',
                textAlign: 'center', padding: '10px',
                fontSize: '1em', fontWeight: 'bold',
                transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                transition: 'transform 0.4s ease-in-out, background-color 0.4s',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                userSelect: 'none'
              }}
            >
              <div style={{ transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)' }}>
                  {isFlipped ? card.text : "?"}
              </div>
            </div>
          )
        })}
      </div>
      
      {matchedPairs.length === 4 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>🎉 You Win!</h2>
          <div style={{display:'flex', gap:'10px', justifyContent:'center'}}>
            <button className="btn retry" onClick={() => window.location.reload()}>🔁 Retry</button>
            <button className="btn" onClick={() => navigate("/learner-dashboard")}>🏠 Back to Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
}
export default JsMemoryGame;

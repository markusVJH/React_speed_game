import React from 'react';
import './GameOver.css';

const GameOver = ({ score, onClose }) => {
  return (
    <div className="overlay">
      <div className="popup">
        <h2>Game Over!</h2>
        <p>Final score: {score}</p>
        <button className="close-btn" onClick={onClose}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default GameOver;

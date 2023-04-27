import React from 'react';
import './GameOver.css';

const GameOver = ({ score, onClose }) => {
  let message;
if(score < 5){
  message = 'You can do better!';
} else if(score < 10) {
  message = 'Not bad. Keep going!';
} else if (score < 20) {
  message = 'Good! Can you reach 20?';
} else {
  message = 'Fantastic!';
}
  return (
    <div className="overlay">
      <div className="popup">
        <h2>Game Over!</h2>
        <p className="score">Final score: {score}</p>
        <p className="message">{message}</p>
        <button className="btn close" onClick={onClose}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default GameOver;

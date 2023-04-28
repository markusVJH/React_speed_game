import React from 'react';
import './GameOver.css';

const GameOver = ({ highScoreEasy, highScoreMedium, highScoreHard, score, onClose, difficulty }) => {
  let message;
if(score === 0){
  message = '🤡';
} else if(score < 5) {
  message = 'You can do better!';
} else if(score < 10) {
  message = 'Not bad. Keep going!';
} else if (score < 15) {
  message = 'Nice!';
} else {
  message = 'Fantastic! :)';
}
let highScoreDisplay;
if (difficulty === 'easy'){
  highScoreDisplay = highScoreEasy;
} else if (difficulty === 'medium'){
  highScoreDisplay = highScoreMedium;
} else if (difficulty === 'hard'){
  highScoreDisplay = highScoreHard;
}
  return (
    <div className="overlay">
      <div className="popup">
        <h2>Game Over!</h2>
        <p className="score">Final score: {score}</p>
        <p className="highScore">All time High Score: {highScoreDisplay}</p>
        <p className="message">{message}</p>
        <button className="btn close" onClick={onClose}>
          Play again
        </button>
      </div>
    </div>
  );
};

export default GameOver;

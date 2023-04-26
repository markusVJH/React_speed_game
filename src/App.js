import React, { Component } from 'react';
import Circle from './components/Circle';
import './App.css';
import GameOver from './components/GameOver';
import scoreSound from './scoreSound.wav';

class App extends Component {
  state = {
    score: 0,
    current: null,
    pace: 1000,
    colors: ['darkblue', 'darkred', 'darkgreen', '#8B8000'],
    showGameOver: false,
    rounds: 0,
    gameRunning: false,
    clicked: [false, false, false, false],
    soundEffect: new Audio(scoreSound),
    circleAmount: null,
    selectedDifficulty: null
  };

  easyHandler = () => {
    this.setState({ 
      circleAmount: 3,
      selectedDifficulty: 'easy',
      });
  };
  mediumHandler = () => {
    this.setState({ 
      circleAmount: 4,
      selectedDifficulty: 'medium',
      });
  }
  hardHandler = () => {
    this.setState({ 
     circleAmount: 5,
     selectedDifficulty: 'hard',
     });
  }

  clickHandler = (circleId) => {
    if (this.state.current === circleId - 1) {
      if (!this.state.clicked[circleId - 1]) {
        this.state.soundEffect.pause();
        this.state.soundEffect.play();
        this.setState((prevState) => ({
          score: prevState.score + 1,
          rounds: 0,
          clicked: {
            ...prevState.clicked,
            [circleId - 1]: true
          },
        }));
      }
    } else {
      this.setState((prevState) => ({
        rounds: prevState.rounds + 1
      }));
      this.endGame();
    }
  };
  
  
  nextActive = () => {
    let nextActive;
    do {
      nextActive = Math.floor(Math.random() * this.state.circleAmount);
    } while (nextActive === this.state.current);
    this.setState((prevState) => ({
      current: nextActive,
      pace: prevState.pace - 30,
      rounds: prevState.rounds + 1,
      gameRunning: true,
      clicked: [false, false, false, false]
    }));
    this.timeoutId = setTimeout(this.nextActive, this.state.pace);
    if (this.state.rounds === 5) {
      this.endGame();
    }
  };

  endGame = () => {
    clearTimeout(this.timeoutId);
    this.setState({ 
      showGameOver: true,
      gameRunning: false,
      rounds: 0,
      current: null
     });
  };

  handleClose = () => {
    this.setState({ 
      showGameOver: false,
      score: 0,
      pace: 1000
    });
  };

  startGame = () => {
    this.nextActive();
  };

  render() {
    const { circleAmount } = this.state;
    const circles = Array.from({ length: circleAmount }, (_, index) => index + 1);
    const { selectedDifficulty } = this.state;
    let startDisplay = {display: 'none'}

    if (selectedDifficulty !== null) {
      startDisplay = {display: 'block'}
    }


    return (
      <div className="main">
        <header>
          <h1>SPEED GAME!</h1>
        </header>
        <div className="difficulty">
          <h3>Select difficulty!</h3>
          <button className={`btn diff easy 
          ${selectedDifficulty === 'easy' ? 'active' : ''}`}
          onClick={this.easyHandler} disabled={this.state.gameRunning}>Easy</button>
          <button className={`btn diff medium 
          ${selectedDifficulty === 'medium' ? 'active' : ''}`}
          onClick={this.mediumHandler} disabled={this.state.gameRunning}>Medium</button>
          <button className={`btn diff hard 
          ${selectedDifficulty === 'hard' ? 'active' : ''}`}
          onClick={this.hardHandler} disabled={this.state.gameRunning}>Hard</button>
        </div>
        <p style={startDisplay}>Current score: {this.state.score}</p>
        <div className="circles">
          {circles.map((circleId, index) => (
            <Circle
              key={index}
              id={circleId}
              color={this.state.colors[index]}
              active={this.state.current === index}
              clicks={() => this.clickHandler(circleId)}
              gameRunning={this.state.gameRunning}
             clicked={this.state.clicked[index]}
            />
          ))}
        </div>
        {this.state.showGameOver && (
          <GameOver score={this.state.score} onClose={this.handleClose} />
        )}
        <div className="buttons" style={startDisplay} >
        <button className="btn start" id="startButton"
                onClick={this.startGame} 
                style={{display: this.state.gameRunning ? "none" : "block"}}
                >
          Start Game
        </button>
        <button className="btn last" id="endButton" 
                onClick={this.endGame} 
                style={{display: this.state.gameRunning ? "block" : "none"}}>
          End Game
        </button>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Circle from './Circle';
import './App.css';
import GameOver from './GameOver';

class App extends Component {
  state = {
    score: 0,
    current: 0,
    pace: 1000,
    colors: ['blue', 'red', 'green', 'yellow'],
    showGameOver: false,
    rounds: 0,
    gameRunning: false
  };

  clickHandler = (circleId) => {
    if (this.state.current === circleId - 1) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
        rounds: 0
      }));
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
      nextActive = Math.floor(Math.random() * 4);
    } while (nextActive === this.state.current);
    this.setState((prevState) => ({
      current: nextActive,
      pace: prevState.pace - 30,
      rounds: prevState.rounds + 1,
      gameRunning: true
    }));
    this.timeoutId = setTimeout(this.nextActive, this.state.pace);
    console.log({ nextActive });
    if (this.state.rounds === 5) {
      this.endGame();
    }
  };

  endGame = () => {
    clearTimeout(this.timeoutId);
    this.setState({ showGameOver: true });
  };

  handleClose = () => {
    this.setState({ showGameOver: false });
  };

  startGame = () => {
    this.nextActive();
  };

  render() {
    const circles = [1, 2, 3, 4];

    return (
      <div className="main">
        <header>
          <h1>SPEED GAME!</h1>
          <h2>How fast can you go without failing?</h2>
          <h3>Click the highlighted circles!</h3>
        </header>
        <p>Current score: {this.state.score}</p>
        <div className="circles">
          {circles.map((circleId, index) => (
            <Circle
              key={index}
              id={circleId}
              color={this.state.colors[index]}
              active={this.state.current === index}
              clicks={() => this.clickHandler(circleId)}
            />
          ))}
        </div>
        {this.state.showGameOver && (
          <GameOver score={this.state.score} onClose={this.handleClose} />
        )}
        <button className="btn start" id="startButton" onClick={this.startGame} disabled={this.state.gameRunning}>
          Start Game
        </button>
        <button className="btn last" id="endButton" onClick={this.endGame}>
          End Game
        </button>
      </div>
    );
  }
}

export default App;

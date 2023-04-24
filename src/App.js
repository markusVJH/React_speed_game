import React, { Component } from 'react';
import Circle from './Circle';

class App extends Component {
  state = {
    score: 0,
    current: 0,
    pace: 1000,
  }

  clickHandler = (circleId) => {
    console.log(`Clicked on circle ${circleId}`);
    this.setState((prevState) => ({ score: prevState.score +1}));
    
  };

  nextActive = () => {
    let nextActive;
    do {
      nextActive = Math.floor(Math.random() * 4);
    } while (nextActive === this.state.current);
    this.setState((prevState) => ({ current: nextActive, pace: prevState.pace - 30 }));
    this.timeoutId = setTimeout(this.nextActive, this.state.pace);
    console.log({ nextActive });
  };
  
  endGame = () => {
    clearTimeout(this.timeoutId);
  }

  startGame = () => {
    this.nextActive();
  }

  render() {
    const circles = [0,1,2,3]

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
          <Circle key={index} id={circleId} clicks={() => this.clickHandler(circleId)} current={this.state.current}/>
           ))}
        </div>

        <button className="btn start" id="startButton" onClick={this.startGame}>Start Game</button>
        <button className="btn last" id="endButton" onClick={this.endGame}>End Game</button>
      </div>
    );
  }
}

export default App;
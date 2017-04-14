import React, { Component } from 'react';
import './Game.css';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.changeStrict = this.changeStrict.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

//Starts/restarts the game
  start() {
    this.props.start();
  }

//Switches on/off strict mode
  changeStrict() {
    this.props.changeStrict();
  }

//passes user input back to app and plays a sound on button press
  handleClick(x) {
    const sound0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
    const sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
    const sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
    const sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
    switch(x) {
      case 0:
        sound0.play();
        break;
      case 1:
        sound1.play();
        break;
      case 2:
        sound2.play();
        break;
      case 3:
        sound3.play();
        break;
    };
    this.props.clickButton(x);
  }

  render() {
    const redStyle = { backgroundColor: this.props.color[0] };
    const blueStyle = { backgroundColor: this.props.color[1] };
    const greenStyle = { backgroundColor: this.props.color[2] };
    const yellowStyle = { backgroundColor: this.props.color[3] };

    return (
      <div className="container">
        <div className="title">
          <h1 className="title">Follow Me!</h1>
        </div>
        <div className="buttonRow">
          <div>
            <button className="btn game-button" style={redStyle} onClick={() => this.handleClick(0)}></button>
          </div>
          <div>
            <button className="btn game-button" style={blueStyle} onClick={() => this.handleClick(1)}></button>
          </div>
        </div>
        <div className="buttonRow">
          <div>
            <button className="btn game-button" style={greenStyle} onClick={() => this.handleClick(2)}></button>
          </div>
          <div>
            <button className="btn game-button" style={yellowStyle} onClick={() => this.handleClick(3)}></button>
          </div>
        </div>
        <div className="buttonRow">
          <button className="btn function-button" onClick={() => this.changeStrict()}>{(this.props.strict === true ? "Strict" : "Easy")}</button>
          <button className="btn function-button" onClick={() => this.start()}>Start!</button>
        </div>
        <div className="info">
          <h3 className="step text-center">Step: {this.props.step}</h3>
          <h5 className="byline">A FreeCodeCamp project by <a href="https://dstewart1673.github.io" target="_blank">Daniel Stewart</a></h5>
        </div>
      </div>
    )
  }
}

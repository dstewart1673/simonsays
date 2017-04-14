import React, { Component } from 'react';
import './App.css';
import { rando } from "./rando.js";
import Game from "./Game.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequence: [],
      strict: false,
      colors: ["#ff0000", "#0055ff", "#39ff33", "#ffff00"],
      player: false,
      playerStep: 0
    };
    this.increment = this.increment.bind(this);
    this.start = this.start.bind(this);
    this.blinky = this.blinky.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.allBlink = this.allBlink.bind(this);
    this.gameWin = this.gameWin.bind(this);
    this.strictToggle = this.strictToggle.bind(this);
    this.nextBlink = this.nextBlink.bind(this);
  }

  //adds another step to the sequence
  increment() {
    let seq = this.state.sequence;
    seq.push(rando());
    const st = seq.length;
    this.setState({
      sequence: seq,
    });
    this.blinky(st, seq);
  }

//Starts game
  start() {
    const seq = this.state.sequence;
    if (seq.length === 0) {
      this.increment();
    } else {
      this.setState({
        sequence: [],
        strict: false,
        colors: ["#ff0000", "#0055ff", "#39ff33", "#ffff00"],
        player: false,
        playerStep: 0
      });
      setTimeout(() => {
        this.increment();
      }, 500);
    };
  }

  //toggles the strict feature
  strictToggle() {
    this.setState({ strict: (this.state.strict === false ? true : false )});
  }

//Iterates through the sequence, passing the current button to nextBlink
  blinky(step, sequence) {
    for (let i = 0; i < step; i++) {
      this.nextBlink(sequence[i], i);
    };
    this.setState({ player: true });
  }

//Blinks the button it is passed
  nextBlink(seq, i) {
    const baseColors = ["#ff0000", "#0055ff", "#39ff33", "#ffff00"];
    setTimeout(() => {
      let newColors = baseColors.slice(0);
      switch (seq) {
        case 0:
          newColors[0] = "#000000";
          const sound0 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
          sound0.play();
          break;
        case 1:
          newColors[1] = "#000000";
          const sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
          sound1.play();
          break;
        case 2:
          newColors[2] = "#000000";
          const sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
          sound2.play();
          break;
        case 3:
          newColors[3] = "#000000";
          const sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
          sound3.play();
          break;
        default:
          break;
      };
      this.setState({ colors: newColors }, () => {
        setTimeout(() => {
          const seql = this.state.sequence;
          this.setState({ colors: baseColors, player: (i === seql.length - 1 ? true : false) });
        }, 750)
      });
    }, 1000 * (i + 1));
  }

//Blinks all buttons at once if user is incorrect
  allBlink() {
    for (let x = 1; x < 4; x++) {
      setTimeout(() => {
        const originColors = this.state.colors;
        this.setState({ colors: ["#000000", "#000000", "#000000", "#000000"]});
        setTimeout(() => {
          this.setState({ colors: originColors });
        }, 500)
      }, 1000 * x);
    };
  }

//Checks to see if user input is correct
  handleClick(val) {
    const gameStep = this.state.sequence.length;
    let playerStep = this.state.playerStep;
    if (this.state.player && playerStep <= gameStep) {
      if (val === this.state.sequence[playerStep]) {
        if (playerStep < gameStep - 1) {
          playerStep++;
          this.setState({ playerStep: playerStep });
        } else {
          if (gameStep < 20) {
            this.setState({
              playerStep: 0,
              player: false
            });
            this.increment();
          } else {
            this.gameWin();
          }
        }
      } else {
        if (this.state.strict) {
          this.setState({
            sequence: [],
            step: 0,
            player: false,
            playerStep: 0
          });
          this.allBlink();
        } else {
          this.setState({ playerStep: 0, player: false });
          this.allBlink();
          //may need to put this in a setTimeout or promise to avoid overlap
          this.blinky(this.state.sequence.length, this.state.sequence);
        }
      }
    }
  }

//Called if user wins game, resets and shows circle of blinking buttons
  gameWin() {
    this.setState({
      sequence: [],
      step: 0,
      player: false,
      playerStep: 0
    });
    for (let x = 0; x < 5; x++) {
      setTimeout(() => {
        this.setState({ colors: ["#000000", "#0055ff", "#39ff33", "#ffff00"]});
        setTimeout(() => {
          this.setState({ colors: ["#ff0000", "#000000", "#39ff33", "#ffff00"] });
          setTimeout(() => {
            this.setState({ colors: ["#ff0000", "#0055ff", "#000000", "#ffff00"] });
            setTimeout(() => {
              this.setState({ colors: ["#ff0000", "#0055ff", "#39ff33", "#000000"] });
              setTimeout(() => {
                this.setState({ colors: ["#ff0000", "#0055ff", "#39ff33", "#ffff00"] });
              }, 499)
            }, 500);
          }, 500);
        }, 500);
      }, 2000 * x);
    };
  }

  render() {
    return (
      <div className="App">
        <Game start={this.start} changeStrict={this.strictToggle} clickButton={this.handleClick} strict={this.state.strict} color={this.state.colors} step={this.state.sequence.length} />
      </div>
    );
  }
}

export default App;

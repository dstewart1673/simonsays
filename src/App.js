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
      step: 0,
      colors: ["#ff0000", "#0055ff", "#39ff33", "#ffff00"],
      player: false,
      playerStep: 1
    };
    this.increment = this.increment.bind(this);
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
    console.log(seq);
    const st = seq.length;
    this.setState({
      sequence: seq,
      step: st
    });
    this.blinky();
  }

  //toggles the strict feature
  strictToggle() {
    this.setState({ strict: (this.state.strict === false ? true : false )});
  }

  //add a way to set player to true
  blinky() {
    console.log("did it");
    for (let i = 0; i < this.state.step; i++) {
      console.log("borp!");
      this.nextBlink(i);
    };
  }

  nextBlink(i) {
    setTimeout(() => {
      let box = this.state.sequence[i];
      const baseColors = this.state.colors[box];
      let newColors = baseColors;
      switch (box) {
        case 0:
          newColors[0] = "#000000";
          break;
        case 1:
          newColors[1] = "#000000";
          break;
        case 2:
          newColors[2] = "#000000";
          break;
        case 3:
          newColors[3] = "#000000";
          break;
        default:
          break;
      };
      this.setState({ colors: newColors });
      setTimeout(() => {
        this.setState({ colors: baseColors });
        var stepnum = this.state.step;
        if (i === stepnum - 1) {
          this.setState({ player: true });
        };
      }, 1000);
    }, 2000 * (i + 1));
  }

  allBlink() {
    function blink(i) {
      setTimeout(function() {
        const originColors = this.state.colors;
        this.setState({ colors: ["#000000", "#000000", "#000000", "#000000"]});
        setTimeout(function() {
          this.setState({ colors: originColors });
        }, 500)
      }, 1000 * i);
    }

    for (let x = 1; x < 4; x++) {
      blink(x);
    };
  }

  handleClick(val) {
    const gameStep = this.state.step;
    let playerStep = this.state.playerStep;
    if (this.state.player && playerStep <= gameStep) {
      if (val === this.state.sequence[playerStep]) {
        if (playerStep < gameStep) {
          playerStep++;
          this.setState({ playerStep: playerStep });
        } else {
          if (gameStep < 20) {
            this.setState({
              playerStep: 1,
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
            playerStep: 1
          });
          this.allBlink();
        } else {
          this.setState({ player: false });
          this.allBlink();
          //may need to put this in a setTimeout or promise to avoid overlap
          this.blinky();
        }
      }
    }
  }

  gameWin() {
    this.setState({
      sequence: [],
      step: 0,
      player: false,
      playerStep: 1
    });
    function roundBlink(i) {
      setTimeout(function() {
        this.setState({ colors: ["#000000", "#0055ff", "#39ff33", "#ffff00"]});
        setTimeout(function() {
          this.setState({ colors: ["#ff0000", "#000000", "#39ff33", "#ffff00"] });
          setTimeout(function() {
            this.setState({ colors: ["#ff0000", "#0055ff", "#000000", "#ffff00"] });
            setTimeout(function() {
              this.setState({ colors: ["#ff0000", "#0055ff", "#39ff33", "#000000"] });
              setTimeout(function() {
                this.setState({ colors: ["#ff0000", "#0055ff", "#39ff33", "#ffff00"] });
              }, 499)
            }, 500);
          }, 500);
        }, 500);
      }, 2000 * i);
    }
    for (let x = 0; x < 5; x++) {
      roundBlink(x);
    };
  }

  render() {
    return (
      <div className="App">
        <h1>WORKS!</h1>
        <Game start={this.increment} changeStrict={this.strictToggle} clickButton={this.handleClick} strict={this.state.strict} color={this.state.colors} step={this.state.step} />
      </div>
    );
  }
}

export default App;

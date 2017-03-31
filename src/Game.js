import React, { Component } from 'react';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
    this.changeStrict = this.changeStrict.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  start() {
    this.props.start();
  }

  changeStrict() {
    this.props.changeStrict();
  }

  handleClick(x) {
    this.props.clickButton(x);
  }

  render() {
    const redStyle = { backgroundColor: this.props.color[0], width: '20px', height: '20px' };
    const blueStyle = { backgroundColor: this.props.color[1], width: '20px', height: '20px' };
    const greenStyle = { backgroundColor: this.props.color[2], width: '20px', height: '20px' };
    const yellowStyle = { backgroundColor: this.props.color[3], width: '20px', height: '20px' };

    return (
      <div>
        <div className="red" style={redStyle} onClick={() => this.handleClick(0)}>
        </div>
        <div className="blue" style={blueStyle} onClick={() => this.handleClick(1)}>
        </div>
        <div className="green" style={greenStyle} onClick={() => this.handleClick(2)}>
        </div>
        <div className="yellow" style={yellowStyle} onClick={() => this.handleClick(3)}>
        </div>
        <div className="info">
          <button className="btn strictToggle" onClick={() => this.changeStrict()}>{(this.props.strict === true ? "Strict" : "Not Strict")}</button>
          <button className="btn-start" onClick={() => this.start()}>Start!</button>
          <h3 className="step">{this.props.step}</h3>
        </div>
      </div>
    )
  }
}

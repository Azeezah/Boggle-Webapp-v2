import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Game from './Game';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {playing:false}
  }
  startPlaying = () => {this.setState({playing:true})}
  stopPlaying = () => {this.setState({playing:false})}

  render() {
    const startButton = (<button onClick={this.startPlaying}>Start</button>)
    const stopButton = (<button onClick={this.stopPlaying}>Home</button>)
    return (
      <div>
        { this.state.playing ? stopButton : startButton }
        { this.state.playing ? <Game /> : null }
      </div>
    );
  }
}

export default App;

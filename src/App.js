import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Game from './Game';
import LoginButton from './LoginButton.js';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {playing:false, user:null}
  }
  startPlaying = () => {this.setState({playing:true})}
  stopPlaying = () => {this.setState({playing:false})}

  render() {
    const startButton = (<button onClick={this.startPlaying}>Start</button>)
    const stopButton = (<button onClick={this.stopPlaying}>Home</button>)
    const user = this.state.user;
    return (
      <div class="app">
      <center>
        <h1 class="appTitle">BOGGLE</h1>
        <LoginButton setUser={(user)=>this.setState({user:user})} />
        {user != null && <p>Welcome, {user.displayName} ({user.email})</p>}
        { this.state.playing ? stopButton : startButton }
        { this.state.playing ? <Game /> : null }
      </center>
      </div>
    );
  }
}

export default App;

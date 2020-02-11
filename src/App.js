import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Game from './Game';
import LoginButton from './LoginButton.js';
import firebase from 'firebase';
import firebaseApp from './firebase.js';

 const db = firebaseApp.firestore();

 db.settings({
   timestampsInSnapshots: true
 });
function toBoard(str) {
  let arr = str.split("")
  return [arr.slice(0,5), arr.slice(5,10), arr.slice(10,15), arr.slice(15,20), arr.slice(20,25)]
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {playing:false, user:null, board:null, loadChallenge:false}
  }
  startPlaying = () => {this.setState({playing:true})}
  stopPlaying = () => {this.setState({playing:false})}
  playEasy = () => {
    db.collection("boards").doc("easy").get()
      .then((doc) => {
        this.setState({board:toBoard(doc.data().elems), playing:true})
      })
      .catch((error) => {console.log("Err getting easy board: ", error)})
  }
  playMedium = () => {
    db.collection("boards").doc("medium").get()
      .then((doc) => {
        this.setState({board:toBoard(doc.data().elems), playing:true})
      })
      .catch((error) => {console.log("Err getting medium board: ", error)})
  }
  playHard = () => {
    db.collection("boards").doc("hard").get()
      .then((doc) => {
        this.setState({board:toBoard(doc.data().elems), playing:true})
      })
      .catch((error) => {console.log("Err getting hard board: ", error)})
  }
  render() {
    const startButton = (<button onClick={this.startPlaying}>Start</button>)
    const stopButton = (<button onClick={this.stopPlaying}>Home</button>)
    const user = this.state.user;
    const loadChallengesButton = (<button onClick={this.stopPlaying}>Home</button>)

    const diffButtons =(<>
      <br /><button onClick={this.playEasy}>Easy</button>
      <br /><button onClick={this.playMedium}>Medium</button>
      <br /><button onClick={this.playHard}>Hard</button>
    </>)
    return (
      <div class="app">
      <center>
        <h1 class="appTitle">BOGGLE</h1>
        <LoginButton setUser={(user)=>this.setState({user:user})} />
        {user != null && <p>Welcome, {user.displayName} ({user.email})</p>}
        { this.state.playing ? stopButton : startButton }
        { this.state.playing ? <Game grid={this.state.board} /> : null }
        <button onClick={()=>{this.setState({loadChallenge:!this.state.loadChallenge})}}>Load Challenge</button>
        { !this.state.playing && this.state.loadChallenge ? diffButtons : null }
      </center>
      </div>
    );
  }
}

export default App;

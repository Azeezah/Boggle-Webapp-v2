import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Game from './Game';
import LoginButton from './LoginButton.js';
import firebase from 'firebase';
import firebaseApp from './firebase.js';
import Leaderboard from './Leaderboard';

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
    this.state = {
      playing:false, user:null, board:{}, loadChallenge:false,
      boards:{
        easy:{highscore:12},
        medium:{highscore:12},
        hard:{highscore:12}
      },
      highscores:[]
    }
    db.collection("boards").get().then((snapshot) => {
      snapshot.docs.forEach((doc)=>{
        let name = doc._key.path.segments[6]
        this.state.boards[name].highscore = doc.data().highscore
        this.state.boards[name].grid = toBoard(doc.data().elems)
        this.state.boards[name].name = name
      })
    })
    db.collection("scores").get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.data().score) {
          this.state.highscores.push(doc.data())
        }
      })
      this.state.highscores.sort((a, b) => (a.score < b.score) ? 1 : -1)
      this.setState({highscores:this.state.highscores.slice(0,5)})
    })
  }
  startPlaying = () => {this.setState({playing:true})}
  stopPlaying = () => {this.setState({playing:false})}
  playEasy = () => {
    this.setState({board:this.state.boards.easy, playing:true})
  }
  playMedium = () => {
    this.setState({board:this.state.boards.medium, playing:true})
  }
  playHard = () => {
    this.setState({board:this.state.boards.hard, playing:true})
  }
  render() {
    const startButton = (<button onClick={this.startPlaying}>Start</button>)
    const stopButton = (<button onClick={this.stopPlaying}>Home</button>)
    const user = this.state.user;
    const diffButtons =(<>
      <br /><button onClick={this.playEasy}>Easy</button>Highscore: {this.state.boards.easy.highscore}
      <br /><button onClick={this.playMedium}>Medium</button>Highscore: {this.state.boards.medium.highscore}
      <br /><button onClick={this.playHard}>Hard</button>Highscore: {this.state.boards.hard.highscore}
    </>)
    return (
      <div className="app">
      <center>
        <h1 className="appTitle">BOGGLE</h1>
        <LoginButton setUser={(user)=>this.setState({user:user})} />
        {user != null && <p>Welcome, {user.displayName} ({user.email})</p>}
        { this.state.playing ? stopButton : startButton }
        { this.state.playing ? <Game board={this.state.board} user={user? user.displayName : null} /> : null }
        { this.state.playing ? null : <button onClick={()=>{this.setState({loadChallenge:!this.state.loadChallenge})}}>Load Challenge</button> }
        { !this.state.playing && this.state.loadChallenge ? diffButtons : null }
        { this.state.playing ? null : <Leaderboard scores={this.state.highscores} />}
      </center>
      </div>
    );
  }
}

export default App;

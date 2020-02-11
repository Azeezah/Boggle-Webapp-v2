import React, {Component} from 'react';
import Board from './Board';
import findAllSolutions from'./boggle_solver';
import valid_words from './full-wordlist';
import Score from './Score';
import Timer from './Timer';
import firebase from 'firebase';

// Returns a random 5x5 board, using the official letter distribution.
function RandomGrid() {
   // prettier-ignore
   const dice = ["AAAFRS", "AAEEEE", "AAFIRS", "ADENNN", "AEEEEM",
                 "AEEGMU", "AEGMNN", "AFIRSY", "BJKQXZ", "CCNSTW",
                 "CEIILT", "CEILPT", "CEIPST", "DHHNOT", "DHHLOR",
                 "DHLNOR", "DDLNOR", "EIIITT", "EMOTTT", "ENSSSU",
                 "FIPRSY", "GORRVW", "HIPRRY", "NOOTUW", "OOOTTU"];
   let chars = dice.map(cube => cube[Math.floor(Math.random() * cube.length)]);
   chars.sort(() => Math.random() - 0.5); // Shuffle the letters.

   const SIZE = 5;
   let grid = [];
   for (let row = 0; row < SIZE; row++) {
     grid[row] = [];
     for (let col = 0; col < SIZE; ++col) {
       grid[row][col] = chars[SIZE * row + col];
       if (grid[row][col] === "Q") grid[row][col] = "Qu";
     }
   }
   return grid;
}

function saveToScoreboard(nickname, score, difficulty) {
  const db = firebase.firestore()
  if (["easy", "medium", "hard"].includes(difficulty)) {
    db.collection("boards").doc(difficulty).get().then(
      (doc) => {
      db.collection("boards").doc(difficulty).set({
        elems: doc.data().elems,
        highscore: Math.max(doc.data().highscore, score),
      })
    })
  }
  db.collection("scores").doc(Math.random().toString()).set({
    score: score,
    nickname: nickname,
  })
}

function generateEponym() {
  const adjectives = ["Eponymous", "Anonymous", "Claustrophobic", "Unidentified", "Unnamed", "Unknown", "Incognito", "Mysterious", "Compiler"]
  const names = ["Johann", "Sebastian", "Bach", "George", "Frideric", "Handel", "Cornelius", "Hop", "Gunther", "Jacob", "Wenceslaus"]
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const name = names[Math.floor(Math.random() * names.length)]
  return adj + " " + name
}

class Game extends Component {
  constructor(props) {
    super(props);
    const grid = RandomGrid()
    const solutions = new Set(findAllSolutions(grid, valid_words['words']))
    const anonymous = generateEponym()
    this.state = {
      user: this.props.user || anonymous,
      guess: '',
      correctGuesses: [],
      guesses: [],
      grid: this.props.board.grid || grid,
      allSolutions: solutions,
      scoredWords:[],
      isFinished:false,
      seconds: 30,
    };
    setTimeout(this.finishGame, this.state.seconds*1000)
  }
  changeGuess = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  submitGuess = (e) => {
    e.preventDefault();
    const guess = this.state.guess
    const guesses = this.state.guesses
    const correctGuesses = this.state.correctGuesses
    const allSolutions = this.state.allSolutions
    if (guesses.includes(guess)) {
      alert("You said that already!");
    }
    else if (allSolutions.has(guess)) {
      this.setState({correctGuesses:[...correctGuesses, guess]})
    }
    this.setState({guesses:[...guesses, guess]})
    this.setState({guess: ''})
  }

  finishGame = () => {
    const allSolutions = this.state.allSolutions
    const correctGuesses = this.state.correctGuesses
    var scoredWords = []
    for (var word of allSolutions) {
      if (correctGuesses.includes(word)) {
        scoredWords.push({correct:true, text:word})
      } else {
        scoredWords.push({correct:false, text:word})
      }
    }
    this.setState({scoredWords:scoredWords})
    this.setState({isFinished:true})
    const score = correctGuesses.map((a)=>a.length).reduce((a, b)=>a+b)
    saveToScoreboard(this.state.user, score, (this.props.board ? this.props.board.name : null))
  }
  render() {
    const correctGuesses = this.state.correctGuesses.map((item, key)=>
      <span>{item}<br /></span>
    );
    const isFinished = this.state.isFinished;
    const scoredWords = this.state.scoredWords;

    return (
      <div>
        <Timer seconds={this.state.seconds} />
        <Board board={this.state.grid}/>
        <button onClick={this.finishGame}>Stop</button>
        <form autocomplete="off">
          <input
            name='guess'
            value={this.state.guess}
            onChange={(e) => this.changeGuess(e)} />
          <button hidden onClick={(e) => this.submitGuess(e)}>Guess</button>
        </form>
        {isFinished ? <Score words={scoredWords} /> : correctGuesses}
      </div>
    )
  }
}

export default Game;

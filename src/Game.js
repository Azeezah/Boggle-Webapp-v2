import React, {Component} from 'react';
import Board from './Board';
import findAllSolutions from'./boggle_solver';
import valid_words from './full-wordlist';

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

class Game extends Component {
  constructor(props) {
    super(props);
    const grid = RandomGrid()
    const solutions = new Set(findAllSolutions(grid, valid_words['words']))
    this.state = {
      guess: '',
      guesses: ["cat", "dogs"],
      grid: grid,
      allSolutions: solutions
    };
  }
  changeGuess = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  submitGuess = (e) => {
    e.preventDefault();
    const guess = this.state.guess
    const guesses = this.state.guesses
    const allSolutions = this.state.allSolutions
    if (allSolutions.has(guess)) {
      this.setState({guesses:([...guesses, guess])})
    }
    this.setState({guess: ''})
  }

  render() {
    const guesses = this.state.guesses.map((item, key)=>
      <span>{item}<br /></span>
    );

    return (
      <div>
        <Board board={this.state.grid}/>
        <form autocomplete="off">
          <input
            name='guess'
            value={this.state.guess}
            onChange={(e) => this.changeGuess(e)} />
          <button hidden onClick={(e) => this.submitGuess(e)}>Guess</button>
        </form>
        {guesses}
      </div>
    )
  }
}

export default Game;

import React, {Component} from 'react';
import Board from './Board';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: '',
      guesses: ["cat", "dogs"]
    };
  }
  changeGuess = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  submitGuess = (e) => {
    e.preventDefault();
    const guesses = this.state.guesses
    this.setState({guesses:([...guesses, this.state.guess])})
    this.setState({guess: ''})
  }

  render() {
    const guesses = this.state.guesses.map((item, key)=>
      <span>{item}<br /></span>
    );

    return (
      <div>
        <Board />
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

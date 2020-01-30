import React, {Component,} from 'react';
import Board from './Board';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guess: ''
    };
  }
  changeGuess = (e) => {
    this.setState({[e.target.name]:e.target.value})
  }
  submitGuess = (e) => {
    e.preventDefault();
    this.setState({guess: ''})
  }

  render() {
    return (
      <div>
        <Board />
        <form>
          <input
            name='guess'
            value={this.state.guess}
            onChange={(e) => this.changeGuess(e)} />
          <button hidden onClick={(e) => this.submitGuess(e)}>Guess</button>
        </form>
      </div>
    )
  }
}

export default Game;

import React, { Component } from 'react';
//import logo from './logo.svg';
import './Game.css';

var board = [['a', 'b', 'c'],['d', 'e', 'f'],['g', 'h', 'i']]

class Game extends Component {
  render() {
    return (
      <div className="Game">
      <table>
      {board.map((row, i) => {
        return (
          <tr>
          {row.map((elem, j)=>{
            return <td key={i}>{elem}</td>
          })}
          </tr>)})}
      </table>
      </div>
    );
  }
}

export default Game;

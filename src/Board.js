import React, { Component } from 'react';
//import logo from './logo.svg';
import './Board.css';

// var board = [['a', 'b', 'c'],['d', 'e', 'f'],['g', 'h', 'i']]

// Returns a random 5x5 board, using the official letter distribution.
export function RandomGrid() {
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

var board = RandomGrid()

class Board extends Component {
  render() {
    return (
      <div className="Board">
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

export default Board;

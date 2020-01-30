import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  render() {
    const board = this.props.board;
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

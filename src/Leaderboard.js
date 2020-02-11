import React, { Component } from 'react';

class Leaderboard extends Component {
  render() {
    const scores = this.props.scores;
    return (<>
      { scores.length > 0 ? <h2>Leaderboard</h2> : null }
      <table>
      {scores.map((elem, i) => {
        return (
          <tr>
            <td key={i}>{elem.nickname}</td>
            <td key={i}>{elem.score}</td>
          </tr>)})}
      </table>
    </>);
  }
}

export default Leaderboard;

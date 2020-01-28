/*
Click button,
open board
play again
show words found
 */

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextInput from './Board';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <TextInput />
        </header>
      </div>
    );
  }
}

export default App;

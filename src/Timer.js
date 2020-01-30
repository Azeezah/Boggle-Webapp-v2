 import React, { Component } from 'react';
 import './Score.css';

 class Timer extends Component {
   constructor(props) {
    super(props);
    this.state = { secondsLeft: this.props.seconds }
    setInterval(this.decrement, 1000)  // 1 second
   }
   decrement = () => {
     this.setState({secondsLeft:this.state.secondsLeft ? this.state.secondsLeft - 1 : 0})
   }
   render() {
     return (
       <div class="timer">
         { this.state.secondsLeft
           ? <span>You have {this.state.secondsLeft} seconds left.</span>
           : <span>Time's Up!</span>
         }
       </div>
     );
   }
 }

 export default Timer;

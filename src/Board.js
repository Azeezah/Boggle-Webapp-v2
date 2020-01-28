import React from 'react';

function TextInput() {
  function getUserInput() {
    const resp = prompt("jajaja");
    console.log(resp);
  }
  return (
    <button onClick={()=>getUserInput()}>
      Get Input
    </button>
  );
}

export default TextInput;

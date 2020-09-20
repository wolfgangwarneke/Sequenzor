import React from 'react';
import './Sequenzor.css';
import SequenzorSynth from './SequenzorSynth.js';

function Sequenzor() {
  const sequenzorSynth = SequenzorSynth();
  let count = 0;
  return (
    <div className="Sequenzor">
        <h1>Sequenzor!</h1>
        <button onClick={() => sequenzorSynth.play(count++ % 4)}>Play Tone...</button>
    </div>
  );
}

export default Sequenzor;

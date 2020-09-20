import React from 'react';
import './Sequenzor.css';
import SequenzorLogic from './SequenzorLogic';
import SequenzorSynth from './SequenzorSynth.js';

function Sequenzor() {
  const sequenzorSynth = SequenzorSynth();
  const sequenzorLogic = SequenzorLogic(sequenzorSynth);
  const events = sequenzorLogic.getEvents();
  const buttons = [
    <button onClick={events[0]}>One</button>,
    <button onClick={events[1]}>Two</button>,
    <button onClick={events[2]}>Three</button>,
    <button onClick={events[3]}>Four</button>
  ];

  return (
    <div className="Sequenzor">
        <h1>Sequenzor!</h1>
        <div>
            {buttons}
        </div>
    </div>
  );
}

export default Sequenzor;

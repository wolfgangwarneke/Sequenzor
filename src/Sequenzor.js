import React from 'react';
import './Sequenzor.css';
import SequenzorLogic from './SequenzorLogic';
import SequenzorSynth from './SequenzorSynth.js';
import Pad from './Pad.js';

function Sequenzor() {
  const sequenzorSynth = SequenzorSynth();
  const sequenzorLogic = SequenzorLogic(sequenzorSynth);
  const events = sequenzorLogic.getEvents();
  window.addEventListener('keydown', e => {
    switch (e.key) {
      case 'q':
        events[0]();
        break;
      case 'w':
        events[1]();
        break;
      case 'a':
        events[2]();
        break;
      case 's':
        events[3]();
        break;
      default:
        break;
    }
  })

  return (
    <div className="Sequenzor">
        <h1>Sequenzor!</h1>
        <div>
          <Pad onClick={events[0]} color="green" letter="q" />
          <Pad onClick={events[1]} color="red" letter="w" />
          <Pad onClick={events[2]} color="yellow" letter="a" />
          <Pad onClick={events[3]} color="blue" letter="s" />
        </div>
    </div>
  );
}

export default Sequenzor;

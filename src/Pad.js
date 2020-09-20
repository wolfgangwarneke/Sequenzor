import React from 'react';
import './Pad.css';

const Pad = ({ color, onClick, letter }, b, c) => {
    // console.log(b);
    // console.log(c);
    return (
        <div onClick={onClick} className={`Pad Pad-${color}`}>
            {letter}
        </div>
    );
};

export default Pad;
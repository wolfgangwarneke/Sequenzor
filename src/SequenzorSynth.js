const SequenzorSynth = () => {
    // create web audio api context
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const playTone = option => {
        var oscillator = audioCtx.createOscillator();

        const pitch = [65.41, 77.78, 98, 130.81][option];
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime); // value in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        setInterval(() => oscillator.stop(), 150);
    };
    return ({
        play: option => playTone(option)
    });
};

export default SequenzorSynth;

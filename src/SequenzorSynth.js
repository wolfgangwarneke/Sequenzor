const SequenzorSynth = () => {
    // create web audio api context
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const playTone = option => {
        var oscillator = audioCtx.createOscillator();

        const pitch = option <= 4 ? [65.41, 77.78, 98, 130.81][option] : option;
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime); // value in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();
        setInterval(() => oscillator.stop(), 150);
    };
    return ({
        play: option => playTone(option),
        playWinTune: () => {
            for (let i = 200, j = 1; i < 2000; i += 100, j++) {
                const interval = setInterval(() => {
                    playTone(i);
                    clearInterval(interval);
                }, j * 100 + 200);
            }
        },
        playLoseTune: () => {
            for (let i = 2000, j = 1; i >= 200; i -= 50 + (i * 0.15), j++) {
                const interval = setInterval(() => {
                    playTone(i);
                    clearInterval(interval);
                }, j * 100 + 200);
            }
        }
    });
};

export default SequenzorSynth;

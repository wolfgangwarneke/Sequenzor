const SequenzorSynth = () => {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const biquadFilter = audioCtx.createBiquadFilter();
    biquadFilter.connect(audioCtx.destination);

    biquadFilter.type = 'lowpass';
    biquadFilter.frequency.setValueAtTime(2700, audioCtx.currentTime);
    
    const playTone = option => {
        var oscillator = audioCtx.createOscillator();

        const pitch = option <= 4 ? [65.41, 77.78, 98, 130.81][option] : option;
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime); // value in hertz
        oscillator.connect(biquadFilter);
        oscillator.start();
        setInterval(() => oscillator.stop(), 150);
    };
    return ({
        play: option => playTone(option),
        playWinTune: () => {
            // start at 200Hz and increase by 100Hz each iteration
            for (let i = 200, j = 1; i < 2000; i += 100, j++) {
                const interval = setInterval(() => {
                    playTone(i);
                    clearInterval(interval);
                }, j * 100 + 200);
            }
        },
        playLoseTune: () => {
            // start at 2000Hz and decrease by 50Hz plus a 15% portion of the previous frequency
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

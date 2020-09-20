const SequenzorLogic = (sequenzorSynth) => {
    const sequence = [0, 1, 2, 3];
    let playing = false;
    let computerIsPlaying = false;
    let curIdx = 0;

    const playSequence = () => {
      computerIsPlaying = true;
      for (let i = 0; i < sequence.length; i++) {
          const interval = setInterval(() => {
            sequenzorSynth.play(i);
            if (i === sequence.length - 1) {
                computerIsPlaying = false;
            }
            clearInterval(interval);
          }, (i+1) * 300);
      };
    };

    const startPlaying = () => {
        playing = true;
        playSequence();
    };
    const stopPlaying = () => {
        playing = false;
        curIdx = 0;
    };

    const checkWinLoseState = (num) => {
        const toneWasCorrect = num === sequence[curIdx++];
        if (!toneWasCorrect) {
            console.log('You lose.');
            stopPlaying();
        } else if (curIdx === sequence.length) {
            console.log('You win!');
            stopPlaying();
        }
    };

    const takeTurn = num => {
      if (computerIsPlaying) {
        console.log('STOP RUSHING ME! Wait for your turn...');
        return;
      }
      if (curIdx < sequence.length) {
        sequenzorSynth.play(num);
        checkWinLoseState(num);
      }
    };

    const handlePress = num => {
        if (!playing) startPlaying();
        else takeTurn(num);
    };

    return {
        start: () => {
            sequence.length = 0;

        },
        getEvents: () => {
            const events = [];
            for (let i = 0; i < 4; i++) {
              events.push(() => handlePress(i));
            }
            return events;
        }
    };
};

export default SequenzorLogic;
const SequenzorLogic = (sequenzorSynth) => {
    const MAX_SEQUENCE = 10;
    const sequence = [];
    let playing = false;
    let computerIsPlaying = false;
    let curIdx = 0;

    window.printGameState = () => {
        console.log(sequence);
        console.log('Playing', playing);
        console.log('Computer Is Playing', computerIsPlaying);
        console.log('curIdx', curIdx);
    };

    const addEntryToSequence = () => {
        const entryNum = Math.floor(Math.random() * 4);
        sequence.push(entryNum);
    };

    const playSequence = () => {
      computerIsPlaying = true;
      for (let i = 0; i < sequence.length; i++) {
          const interval = setInterval(() => {
            sequenzorSynth.play(sequence[i]);
            if (i === sequence.length - 1) {
                computerIsPlaying = false;
            }
            clearInterval(interval);
          }, (i+1) * 300);
      };
    };

    const startPlaying = () => {
        playing = true;
        addEntryToSequence();
        playSequence();
    };
    const stopPlaying = shouldContinue => {
        playing = false;
        curIdx = 0;
        if (!shouldContinue) {
            sequence.length = 0;
        }
    };

    const checkWinLoseState = (num) => {
        const toneWasCorrect = num === sequence[curIdx];
        if (!toneWasCorrect) {
            console.log('You lose.');
            sequenzorSynth.playLoseTune();
            stopPlaying();
        } else if (curIdx === sequence.length - 1) {
            console.log('You win!');
            stopPlaying(true);
            if (sequence.length < MAX_SEQUENCE) {
                setTimeout(() => startPlaying(), 300);
            } else {
                sequenzorSynth.playWinTune();
                stopPlaying();
            }
        } else {
            console.log('...correct...');
            curIdx++;
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
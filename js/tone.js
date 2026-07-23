// Simon Game — Sounds via Tone.js
// Include Tone.js first: <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>
// Then include this file. Call Simon.init() once on the user's first click/tap
// (browsers block audio until a user gesture).

const Simon = (() => {
  let synth, noiseSynth, bgLoop;

  function init() {
    if (synth) return; // already set up

    // Main synth for the 4 color tones
    synth = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.3 },
    }).toDestination();

    // Noise synth for failure sound
    noiseSynth = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: { attack: 0.01, decay: 0.3, sustain: 0 },
    }).toDestination();

    Tone.start();
  }

  // --- 4 color tones (classic Simon frequencies) ---
  const colorNotes = {
    1: "E4",
    2: "C#4",
    3: "E3",
    4: "A3",
  };

  function playColor(color, duration = "8n") {
    const note = colorNotes[color];
    if (note) synth.triggerAttackRelease(note, duration);
  }

  // --- Success sound: quick ascending arpeggio ---
  function playSuccess() {
    const now = Tone.now();
    ["C5", "E5", "G5"].forEach((note, i) => {
      synth.triggerAttackRelease(note, "16n", now + i * 0.08);
    });
  }

  // --- Failure sound: harsh noise burst + low buzz ---
  function playFailure() {
    noiseSynth.triggerAttackRelease("8n");
    synth.triggerAttackRelease("C2", "4n");
  }

  // --- Start button sound: short confident blip ---
  function playStart() {
    const now = Tone.now();
    synth.triggerAttackRelease("G3", "16n", now);
    synth.triggerAttackRelease("C4", "8n", now + 0.1);
  }

  // --- Level up sound: rising triad ---
  function playLevelUp() {
    const now = Tone.now();
    ["C4", "E4", "G4", "C5"].forEach((note, i) => {
      synth.triggerAttackRelease(note, "16n", now + i * 0.06);
    });
  }

  // --- Background loop: soft ambient pulse ---
  function startBackgroundLoop() {
    if (bgLoop) return;
    const padSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 1, decay: 0.5, sustain: 0.4, release: 2 },
      volume: -18,
    }).toDestination();

    const chords = [["C3", "E3", "G3"], ["A2", "C3", "E3"]];
    let i = 0;

    bgLoop = new Tone.Loop((time) => {
      padSynth.triggerAttackRelease(chords[i % chords.length], "2n", time);
      i++;
    }, "2m").start(0);

    Tone.Transport.start();
  }

  function stopBackgroundLoop() {
    if (bgLoop) {
      bgLoop.stop();
      bgLoop.dispose();
      bgLoop = null;
      Tone.Transport.stop();
    }
  }

  return {
    init,
    playColor,        // Simon.playColor('green' | 'red' | 'blue' | 'yellow')
    playStart,         // Simon.playStart()
    playSuccess,       // Simon.playSuccess()
    playFailure,       // Simon.playFailure()
    playLevelUp,       // Simon.playLevelUp()
    startBackgroundLoop,
    stopBackgroundLoop,
  };
})();
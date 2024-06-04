let audioContext;
let audioElement;
let isPlaying = false;
let manuallyPaused = false;

function createAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioElement = new Audio("audio/bg-audio.m4a");
  const source = audioContext.createMediaElementSource(audioElement);
  source.connect(audioContext.destination);

  audioElement.volume = 0.7;
  audioElement.loop = true;
}

document.querySelector(".audio-btn").addEventListener("click", function () {
  const audioBtn = document.querySelector(".audio-btn");

  if (!audioContext) {
    createAudio();
  }

  if (isPlaying) {
    audioBtn.textContent = "play audio";
    audioElement.pause();
    manuallyPaused = true;
  } else {
    audioElement
      .play()
      .then(() => {
        audioBtn.textContent = "pause audio";
        isPlaying = true;
        manuallyPaused = false;
      })
      .catch((err) => {
        console.error("Audio playback error:", err);
      });
  }
  isPlaying = !isPlaying;
});

document.body.addEventListener("mouseover", function () {
  if (!audioContext) {
    createAudio();
  }

  if (!isPlaying && !manuallyPaused) {
    audioElement
      .play()
      .then(() => {
        isPlaying = true;
        document.querySelector(".audio-btn").textContent = "pause audio";
      })
      .catch((err) => {
        console.error("Audio playback error:", err);
      });
  }
});

//The old code:

// let audioContext;
// let audioElement;
// let isPlaying = false;

// function createAudio() {
//   audioContext = new (window.AudioContext || window.webkitAudioContext)();
//   audioElement = new Audio("audio/bg-audio.m4a");
//   const source = audioContext.createMediaElementSource(audioElement);
//   source.connect(audioContext.destination);

//   audioElement.volume = 0.7;
//   audioElement.loop = true;
// }

// document.querySelector(".audio-btn").addEventListener("click", function () {
//   const audioBtn = document.querySelector(".audio-btn");

//   if (!audioContext) {
//     createAudio();
//   }

//   if (isPlaying) {
//     audioBtn.textContent = "play audio";
//     audioElement.pause();
//   } else {
//     audioElement
//       .play()
//       .then(() => {
//         audioBtn.textContent = "pause audio";
//         isPlaying = true;
//       })
//       .catch((err) => {
//         console.error("Audio playback error:", err);
//       });
//   }
//   isPlaying = !isPlaying;
// });

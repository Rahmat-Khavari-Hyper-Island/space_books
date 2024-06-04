let audioContext;
let audioElement;

const audioBtn = document.querySelector(".audio-btn");
let isPlaying = false;

function createAudio() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  audioElement = new Audio("audio/bg-audio.m4a");
  const source = audioContext.createMediaElementSource(audioElement);
  source.connect(audioContext.destination);

  audioElement.volume = 0.7;
  audioElement.loop = true;
}

createAudio();

audioBtn.addEventListener("click", function () {
  if (isPlaying) {
    audioBtn.textContent = "play audio";
    audioElement.pause();
  } else {
    audioBtn.textContent = "pause audio";
    audioElement.play();
  }
  isPlaying = !isPlaying;
});

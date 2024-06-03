// script.js
let audioContext;
let audioElement;

// Function to create audio context and element and play audio
function startAudio() {
  // Create audio context
  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  // Attempt to resume the audio context
  if (audioContext.state === "suspended") {
    audioContext
      .resume()
      .then(() => {
        console.log("Audio context resumed successfully");
      })
      .catch((error) => {
        console.log("Error resuming audio context:", error);
      });
  }

  // Create audio element
  audioElement = new Audio("audio/bg-audio.m4a");
  const source = audioContext.createMediaElementSource(audioElement);
  source.connect(audioContext.destination);

  // Set volume to half
  audioElement.volume = 0.4;

  // Enable looping
  audioElement.loop = true;

  // Play audio
  audioElement
    .play()
    .then(() => {
      console.log("Audio playback started successfully");
    })
    .catch(function (error) {
      console.log("Error playing audio:", error);
    });

  // Remove event listener to prevent multiple audio playbacks
  document.body.removeEventListener("mouseover", startAudio);
}

// Start audio playback when the user hovers over the body of the page
document.body.addEventListener("mouseover", startAudio);

window.onload = function () {
  window.scrollTo(0, 0);
};

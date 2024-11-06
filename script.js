let time = 1500; // 25 minutes in seconds
let breakTime = 300; // 5 minutes in seconds
let isRunning = false;
let isBreak = false;
let timerInterval;

let sessionsCompleted = 0;
let focusedMinutes = 0;
let breaksTaken = 0;

const timeDisplay = document.getElementById("time");
const sessionsDisplay = document.getElementById("sessions");
const focusedMinutesDisplay = document.getElementById("focused-minutes");
const breaksDisplay = document.getElementById("breaks");
const container = document.getElementById("container");

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(updateTimer, 1000);
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  isBreak = false;
  time = 1500;
  timeDisplay.textContent = formatTime(time);
  document.getElementById("timer-label").textContent = "Focus Time";
}

function updateTimer() {
  if (time > 0) {
    time--;
    timeDisplay.textContent = formatTime(time);
  } else {
    clearInterval(timerInterval);
    isRunning = false;

    if (isBreak) {
      isBreak = false;
      time = 1500;
      document.getElementById("timer-label").textContent = "Focus Time";
      focusedMinutes += 25;
      sessionsCompleted++;
    } else {
      isBreak = true;
      time = breakTime;
      document.getElementById("timer-label").textContent = "Break Time";
      breaksTaken++;
    }

    updateStats();
    startTimer(); // Start the next session automatically
  }
}

function updateStats() {
  sessionsDisplay.textContent = sessionsCompleted;
  focusedMinutesDisplay.textContent = focusedMinutes;
  breaksDisplay.textContent = breaksTaken;
}

// Toggle mute functionality
function toggleMute() {
     const audio = document.getElementById('sea-audio');
     const muteButton = document.getElementById('mute-button');
   
     // Toggle the muted property
     audio.muted = !audio.muted;
   
     // Update button text
     muteButton.textContent = audio.muted ? 'Unmute Sound' : 'Mute Sound';
   }
   
// Make the container draggable
let offsetX, offsetY;
container.addEventListener("mousedown", (e) => {
  offsetX = e.clientX - container.getBoundingClientRect().left;
  offsetY = e.clientY - container.getBoundingClientRect().top;

  function onMouseMove(event) {
    container.style.left = `${event.clientX - offsetX}px`;
    container.style.top = `${event.clientY - offsetY}px`;
  }
  // Lower the volume of the sea sound to 30%
  document.querySelector('audio').volume = 0.5;

  document.addEventListener("mousemove", onMouseMove);

  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", onMouseMove);
  }, { once: true });
});

resetTimer(); // Initialize the timer display

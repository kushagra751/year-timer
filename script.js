// script.js - Vector Line UI (Black & White) - Complete Consolidated Code

// DOM Elements
const loadingText = document.getElementById("loading-percent");
const loadingProgress = document.getElementById("loading-progress");
const loadingScreen = document.getElementById("loading-screen");
const mainContent = document.getElementById("main-content");
const bootSound = document.getElementById("boot-sound");
const consoleDiv = document.getElementById("console-messages");

// Console Messages Configuration
const messages = [
  "Initializing HUD...",
  "Calibrating sensors...",
  "Loading Time Matrix...",
  "Connecting to mainframe...",
  "Preparing orbital data...",
  "System boot complete."
];

let messageIndex = 0;
let charIndex = 0;

// Utility Functions
function format(n) {
  return String(n).padStart(2, "0");
}

// Console Message Typing Effect
function typeMessage() {
  if (messageIndex < messages.length) {
    const current = messages[messageIndex];
    consoleDiv.textContent += current[charIndex] || '';
    charIndex++;
    
    if (charIndex < current.length) {
      setTimeout(typeMessage, 30); // Adjusted timing for better readability
    } else {
      consoleDiv.textContent += '\n';
      charIndex = 0;
      messageIndex++;
      setTimeout(typeMessage, 200); // Pause between messages
    }
  }
}

// Loading Screen Animation
function initializeLoadingScreen() {
  // Start typing messages
  typeMessage();
  
  // Loading progress animation
  let percent = 0;
  const loadingInterval = setInterval(() => {
    percent++;
    loadingText.textContent = percent + "%";
    loadingProgress.style.width = percent + "%";
    
    // Play boot sound at 10%
    if (percent === 10) {
      bootSound.play().catch(e => {
        console.log("Audio autoplay prevented:", e);
      });
    }
    
    // Complete loading at 100%
    if (percent >= 100) {
      clearInterval(loadingInterval);
      setTimeout(() => {
        loadingScreen.style.display = "none";
        mainContent.style.display = "block";
      }, 500); // Small delay for better UX
    }
  }, 50); // Adjusted timing for smoother animation
}

// Timer Update Functions
function updateTimers() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

  const totalMs = end - start;
  const elapsedMs = now - start;
  const remainingMs = end - now;

  // Calculate time passed
  const h1 = Math.floor(elapsedMs / (1000 * 60 * 60));
  const m1 = Math.floor((elapsedMs / (1000 * 60)) % 60);
  const s1 = Math.floor((elapsedMs / 1000) % 60);

  document.getElementById("passed-time").textContent = `${format(h1)}:${format(m1)}:${format(s1)}`;

  // Calculate time left
  const h2 = Math.floor(remainingMs / (1000 * 60 * 60));
  const m2 = Math.floor((remainingMs / (1000 * 60)) % 60);
  const s2 = Math.floor((remainingMs / 1000) % 60);

  document.getElementById("left-time").textContent = `${format(h2)}:${format(m2)}:${format(s2)}`;

  // Update orbital progress
  const percent = (elapsedMs / totalMs) * 100;
  const progressElement = document.getElementById("orbit-progress");
  const percentElement = document.getElementById("percent-text");
  
  if (progressElement) {
    progressElement.style.strokeDashoffset = 879.64 * (1 - percent / 100);
  }
  
  if (percentElement) {
    percentElement.textContent = `${percent.toFixed(2)}%`;
  }

  // Calculate days left
  const oneDay = 24 * 60 * 60 * 1000;
  const daysLeft = Math.floor(remainingMs / oneDay);
  const daysElement = document.getElementById("days-left");
  
  if (daysElement) {
    daysElement.textContent = daysLeft;
  }
}

// Wireframe Background Functions
function drawWireBackground() {
  const canvas = document.getElementById("bgCanvas");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;

    const step = 50;
    
    // Draw vertical lines
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    
    // Draw horizontal lines
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  drawLines();
  
  // Handle window resize
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawLines();
  });
}

// Initialization Functions
function initializeApp() {
  // Initialize wireframe background
  drawWireBackground();
  
  // Start loading sequence
  initializeLoadingScreen();
  
  // Start timer updates
  updateTimers();
  setInterval(updateTimers, 1000);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle visibility change to pause/resume when tab is not active
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateTimers(); // Update immediately when tab becomes visible
  }
});

// Optional: Add click to enable audio (for browsers that block autoplay)
document.addEventListener('click', () => {
  if (bootSound.paused) {
    bootSound.play().catch(e => {
      console.log("Audio play failed:", e);
    });
  }
}, { once: true });

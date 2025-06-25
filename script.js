// VANTA Background Setup (NET effect)
VANTA.NET({
  el: "#vanta-bg",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x00ffc3,
  backgroundColor: 0x0e0e11,
  points: 12.00,
  maxDistance: 20.00,
  spacing: 15.00
});

// Format time numbers
function format(n) {
  return String(n).padStart(2, "0");
}

// Update timers function
function updateTimers() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

  const totalMs = end - start;
  const elapsedMs = now - start;
  const remainingMs = end - now;

  // Time Passed
  const h1 = Math.floor(elapsedMs / (1000 * 60 * 60));
  const m1 = Math.floor((elapsedMs / (1000 * 60)) % 60);
  const s1 = Math.floor((elapsedMs / 1000) % 60);

  document.getElementById("countdown-passed").textContent =
    `${format(h1)}:${format(m1)}:${format(s1)}`;

  const percentPassed = (elapsedMs / totalMs) * 100;
  document.getElementById("percent-passed").textContent =
    `${percentPassed.toFixed(2)}% Completed`;

  const offsetPassed = 942.48 * (1 - percentPassed / 100);
  document.getElementById("progress-passed").style.strokeDashoffset = offsetPassed;

  // Time Left
  const h2 = Math.floor(remainingMs / (1000 * 60 * 60));
  const m2 = Math.floor((remainingMs / (1000 * 60)) % 60);
  const s2 = Math.floor((remainingMs / 1000) % 60);

  document.getElementById("countdown-left").textContent =
    `${format(h2)}:${format(m2)}:${format(s2)}`;

  const percentLeft = 100 - percentPassed;
  document.getElementById("percent-left").textContent =
    `${percentLeft.toFixed(2)}% Remaining`;

  const offsetLeft = 942.48 * (1 - percentLeft / 100);
  document.getElementById("progress-left").style.strokeDashoffset = offsetLeft;
}

// Start the timer loop
updateTimers();
setInterval(updateTimers, 1000);

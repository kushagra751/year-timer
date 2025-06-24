function updateCountdown() {
  const now = new Date();
  const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59);
  const totalMs = endOfYear - new Date(now.getFullYear(), 0, 1);
  const remainingMs = endOfYear - now;

  const hours = Math.floor(remainingMs / (1000 * 60 * 60));
  const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingMs / 1000) % 60);

  // Format time
  const format = (n) => String(n).padStart(2, '0');
  document.getElementById("countdown").textContent =
    `${format(hours)}:${format(minutes)}:${format(seconds)}`;

  // Update circular progress
  const percentPassed = 1 - (remainingMs / totalMs);
  const offset = 565.48 * (1 - percentPassed);
  document.getElementById("progress").style.strokeDashoffset = offset.toFixed(2);
}

// Initial render
updateCountdown();
setInterval(updateCountdown, 1000);

// Theme toggle
const toggleBtn = document.getElementById("toggle-theme");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

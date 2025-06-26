// script.js - Vector Line UI (Black & White)

function format(n) {
  return String(n).padStart(2, "0");
}

function updateTimers() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

  const totalMs = end - start;
  const elapsedMs = now - start;
  const remainingMs = end - now;

  const h1 = Math.floor(elapsedMs / (1000 * 60 * 60));
  const m1 = Math.floor((elapsedMs / (1000 * 60)) % 60);
  const s1 = Math.floor((elapsedMs / 1000) % 60);

  document.getElementById("passed-time").textContent = `${format(h1)}:${format(m1)}:${format(s1)}`;

  const h2 = Math.floor(remainingMs / (1000 * 60 * 60));
  const m2 = Math.floor((remainingMs / (1000 * 60)) % 60);
  const s2 = Math.floor((remainingMs / 1000) % 60);

  document.getElementById("left-time").textContent = `${format(h2)}:${format(m2)}:${format(s2)}`;

  const percent = (elapsedMs / totalMs) * 100;
  document.getElementById("orbit-progress").style.strokeDashoffset = 879.64 * (1 - percent / 100);
  document.getElementById("percent-text").textContent = `${percent.toFixed(2)}%`;

  const oneDay = 24 * 60 * 60 * 1000;
  const daysLeft = Math.floor(remainingMs / oneDay);
  document.getElementById("days-left").textContent = daysLeft;
}

function drawWireBackground() {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  function drawLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.lineWidth = 1;

    const step = 50;
    for (let x = 0; x < canvas.width; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  drawLines();
  window.addEventListener("resize", drawWireBackground);
}

drawWireBackground();
updateTimers();
setInterval(updateTimers, 1000);

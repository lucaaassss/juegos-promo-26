// =============================================
//  JUEGOS PROMO 26 — PROGRAMACIÓN
//  app.js
// =============================================

// ── Función principal de descarga ──────────
function descargar(btn) {
  const card = btn.closest('.game-card');
  const fileUrl  = card.dataset.file;   // ruta del archivo
  const fileName = card.dataset.name;   // nombre al descargar
  const bar = card.querySelector('.download-progress');

  // Animación de carga
  bar.style.width = '0%';
  btn.disabled = true;
  btn.querySelector('span:last-child').textContent = 'DESCARGANDO...';

  // Simula progreso visual mientras se dispara la descarga real
  let prog = 0;
  const interval = setInterval(() => {
    prog += Math.random() * 18 + 8;
    if (prog >= 90) prog = 90;
    bar.style.width = prog + '%';
  }, 120);

  // Dispara la descarga real del navegador
  const link = document.createElement('a');
  link.href = fileUrl;
  if (fileUrl.startsWith('http')) {
    link.target = '_blank';
    link.rel = 'noopener';
  } else {
    link.download = fileName;
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Termina la animación
  setTimeout(() => {
    clearInterval(interval);
    bar.style.width = '100%';
    btn.classList.add('done');
    btn.querySelector('.btn-icon').textContent = '✓';
    btn.querySelector('span:last-child').textContent = '¡LISTO!';

    // Resetea después de 3s
    setTimeout(() => {
      bar.style.width = '0%';
      btn.classList.remove('done');
      btn.disabled = false;
      btn.querySelector('.btn-icon').textContent = '↓';
      btn.querySelector('span:last-child').textContent = 'DESCARGAR';
    }, 3000);
  }, 1200);
}

// ── Numeración automática de las cards ─────
document.querySelectorAll('.game-card').forEach((card, i) => {
  card.setAttribute('data-num', String(i + 1).padStart(2, '0'));
});

// ── Partículas en canvas ────────────────────
(function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 1.5 + 0.3;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.alpha = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.6 ? '#06b6d4' : '#7c3aed';
  }

  Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0) this.x = W;
    if (this.x > W) this.x = 0;
    if (this.y < 0) this.y = H;
    if (this.y > H) this.y = 0;
  };

  Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  function init() {
    resize();
    const count = Math.floor((W * H) / 8000);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', init);
  init();
  loop();
})();

// ── Efecto parallax suave en el hero ───────
document.addEventListener('mousemove', e => {
  const glow = document.querySelector('.hero-glow');
  if (!glow) return;
  const cx = (e.clientX / window.innerWidth  - 0.5) * 30;
  const cy = (e.clientY / window.innerHeight - 0.5) * 20;
  glow.style.transform = `translate(calc(-50% + ${cx}px), calc(-60% + ${cy}px))`;
});

// ── Animación de entrada de las cards ──────
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.game-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, box-shadow 0.3s, border-color 0.3s`;
  observer.observe(card);
});

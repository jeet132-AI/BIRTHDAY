// ---------- ambient: stars ----------
const starsBox = document.getElementById('stars');

function makeStars(count = 70) {
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    const r = Math.random();
    s.className = 'star' + (r > 0.8 ? ' gold' : r > 0.6 ? ' pink' : '');
    const size = Math.random() * 2.5 + 1;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.setProperty('--dur', (Math.random() * 3 + 2.5) + 's');
    s.style.setProperty('--delay', (Math.random() * 4) + 's');
    s.style.setProperty('--max', (Math.random() * 0.5 + 0.5).toFixed(2));
    starsBox.appendChild(s);
  }
}

// ---------- floating hearts (rise up) ----------
const heartsBox = document.getElementById('hearts');
const HEARTS = ['❤️', '💗', '💖', '🌸', '✨', '💕'];

function spawnHeart() {
  const h = document.createElement('div');
  h.className = 'float-heart';
  h.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
  h.style.left = Math.random() * 100 + 'vw';
  h.style.setProperty('--size', (Math.random() * 14 + 12) + 'px');
  h.style.setProperty('--dur', (Math.random() * 4 + 6) + 's');
  h.style.setProperty('--delay', '0s');
  h.style.setProperty('--sway', (Math.random() * 80 - 40) + 'px');
  h.style.setProperty('--max', (Math.random() * 0.5 + 0.4).toFixed(2));
  heartsBox.appendChild(h);
  setTimeout(() => h.remove(), 10500);
}

// ---------- flower petals falling ----------
const petalsBox = document.getElementById('petals');
const PETALS = ['🌸', '🌺', '💮', '🏵️', '🌷', '✨'];

function spawnPetal() {
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.setProperty('--size', (Math.random() * 12 + 14) + 'px');
  p.style.setProperty('--dur', (Math.random() * 5 + 7) + 's');
  p.style.setProperty('--delay', '0s');
  p.style.setProperty('--sway', (Math.random() * 120 - 60) + 'px');
  p.style.setProperty('--max', (Math.random() * 0.4 + 0.6).toFixed(2));
  petalsBox.appendChild(p);
  setTimeout(() => p.remove(), 13000);
}

// ---------- confetti (page 7) ----------
const confettiBox = document.getElementById('confetti');
const CONF_COLORS = ['#f9c5d5', '#d4af37', '#f0d98a', '#a8bf97', '#fff8ef', '#e89aaa'];

function spawnConfetti(n = 40) {
  for (let i = 0; i < n; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece' + (Math.random() > 0.6 ? ' round' : '');
    c.style.left = Math.random() * 100 + 'vw';
    c.style.setProperty('--w', (Math.random() * 6 + 6) + 'px');
    c.style.setProperty('--h', (Math.random() * 6 + 8) + 'px');
    c.style.setProperty('--c', CONF_COLORS[Math.floor(Math.random() * CONF_COLORS.length)]);
    c.style.setProperty('--dur', (Math.random() * 1.8 + 2.4) + 's');
    c.style.setProperty('--sway', (Math.random() * 160 - 80) + 'px');
    confettiBox.appendChild(c);
    setTimeout(() => c.remove(), 5200);
  }
}

makeStars();
setTimeout(() => {
  spawnHeart();
  setInterval(spawnHeart, 1400);
}, 2500);

let petalTimer = setInterval(spawnPetal, 2600);
let petalsBoosted = false;
function boostPetals() {
  if (petalsBoosted) return;
  petalsBoosted = true;
  clearInterval(petalTimer);
  spawnPetal(); spawnPetal();
  petalTimer = setInterval(spawnPetal, 900);
}

// ---------- page navigation (7 pages) ----------
const pages = {
  1: document.getElementById('page1'),
  2: document.getElementById('page2'),
  3: document.getElementById('page3'),
  4: document.getElementById('page4'),
  5: document.getElementById('page5'),
  6: document.getElementById('page6'),
  7: document.getElementById('page7'),
  8: document.getElementById('page8'),
  9: document.getElementById('page9'),
};
let current = 1;
const music = document.getElementById('bgMusic');
let musicStarted = false;

function startMusic() {
  if (musicStarted) return;
  musicStarted = true;
  music.volume = 0.6;
  music.play().catch(() => {});
}

function heartBurst(n = 12) {
  for (let i = 0; i < n; i++) setTimeout(spawnHeart, i * 120);
}

function showPage(n) {
  if (n === current || !pages[n]) return;
  const from = pages[current];
  const to = pages[n];
  document.body.dataset.page = String(n);

  from.classList.add('fade-out');
  setTimeout(() => {
    from.classList.add('hidden');
    from.classList.remove('active');
    from.scrollTop = 0;
    to.classList.remove('hidden');
    to.scrollTop = 0;
    void to.offsetWidth; // restart .fade-in animations
    requestAnimationFrame(() => to.classList.add('active'));
    current = n;
    if (n >= 2) boostPetals();
    if (n === 3) startThanksSequence();
    if (n === 5) startMeaningSequence();
    if (n === 6) startLetter();
    if (n === 8) resetCandle();
    if (n === 9) startFinale();
  }, 650);
}

// ---------- page 3: one-by-one thanks ----------
const thanksLines = Array.from(document.querySelectorAll('.thanks-line'));
let thanksTimers = [];

function startThanksSequence() {
  thanksTimers.forEach(clearTimeout);
  thanksTimers = [];
  thanksLines.forEach((el) => el.classList.remove('show'));
  thanksLines.forEach((el, i) => {
    const t = setTimeout(() => {
      el.classList.add('show');
      spawnHeart();
    }, 600 + i * 1100);
    thanksTimers.push(t);
  });
}

// ---------- page 5: MOM IS... words one by one ----------
const meaningLines = Array.from(document.querySelectorAll('.meaning-line'));
const meaningEnd = document.getElementById('meaningEnd');
let meaningTimers = [];

function startMeaningSequence() {
  meaningTimers.forEach(clearTimeout);
  meaningTimers = [];
  meaningLines.forEach((el) => el.classList.remove('show'));
  meaningEnd.classList.remove('show');
  meaningLines.forEach((el, i) => {
    const t = setTimeout(() => {
      el.classList.add('show');
      spawnHeart();
      spawnPetal();
    }, 500 + i * 1000);
    meaningTimers.push(t);
  });
  meaningTimers.push(setTimeout(() => meaningEnd.classList.add('show'), 500 + meaningLines.length * 1000));
}

// ---------- page 6: typewriter letter ----------
const LETTER_LINES = [
  'Dear Mom,',
  '',
  'I may not always say it,',
  'but I want you to know...',
  '',
  'You are one of the greatest',
  'blessings in my life.',
  '',
  'Everything I am today has',
  'a little piece of you in it.',
  '',
  'I love you, Mom.',
];
const letterText = document.getElementById('letterText');
const letterSign = document.getElementById('letterSign');
const letterCursor = document.getElementById('letterCursor');
let letterTimer = null;

function startLetter() {
  clearInterval(letterTimer);
  letterText.textContent = '';
  letterSign.classList.add('hidden');
  letterCursor.style.display = 'inline';
  const full = LETTER_LINES.join('\n');
  let i = 0;
  letterTimer = setInterval(() => {
    letterText.textContent = full.slice(0, ++i);
    if (i % 6 === 0) pages[6].scrollTop = pages[6].scrollHeight;
    if (i >= full.length) {
      clearInterval(letterTimer);
      letterCursor.style.display = 'none';
      letterSign.classList.remove('hidden');
      heartBurst(6);
    }
  }, 55);
}

// ---------- page 4: lightbox ----------
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbMsg = document.getElementById('lbMsg');

document.querySelectorAll('.polaroid').forEach((fig) => {
  fig.addEventListener('click', () => {
    lbImg.src = fig.dataset.full;
    // if second photo missing, fall back to first photo
    lbImg.onerror = () => { lbImg.onerror = null; lbImg.src = 'images/FIRSTPIC.jpg'; };
    lbMsg.textContent = fig.dataset.msg || '';
    lightbox.classList.remove('hidden');
  });
});
document.getElementById('lbClose').addEventListener('click', (e) => {
  e.stopPropagation();
  lightbox.classList.add('hidden');
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.classList.add('hidden');
});

// ---------- page 7: gift ----------
const giftClosed = document.getElementById('giftClosed');
const giftOpen = document.getElementById('giftOpen');
let giftOpened = false;

document.getElementById('giftBtn').addEventListener('click', () => {
  if (giftOpened) return;
  giftOpened = true;
  giftClosed.style.display = 'none';
  giftOpen.classList.remove('hidden');
  heartBurst(20);
  spawnConfetti(60);
  setTimeout(() => spawnConfetti(40), 900);
  const rain = setInterval(() => spawnConfetti(25), 2200);
  giftOpen.dataset.rain = rain;
});

// ---------- buttons ----------
document.getElementById('openBtn').addEventListener('click', () => {
  startMusic();
  heartBurst();
  showPage(2);
});
document.getElementById('nextBtn2').addEventListener('click', () => { heartBurst(8); showPage(3); });
document.getElementById('backBtn2').addEventListener('click', () => showPage(1));
document.getElementById('backBtn3').addEventListener('click', () => showPage(2));
document.getElementById('nextBtn3').addEventListener('click', () => { heartBurst(8); showPage(4); });
document.getElementById('backBtn4').addEventListener('click', () => showPage(3));
document.getElementById('nextBtn4').addEventListener('click', () => { heartBurst(8); showPage(5); });
document.getElementById('backBtn5').addEventListener('click', () => showPage(4));
document.getElementById('nextBtn5').addEventListener('click', () => { heartBurst(8); showPage(6); });
document.getElementById('backBtn6').addEventListener('click', () => showPage(5));
document.getElementById('nextBtn6').addEventListener('click', () => { heartBurst(8); showPage(7); });
document.getElementById('backBtn7').addEventListener('click', () => showPage(6));
document.getElementById('nextBtn7').addEventListener('click', () => { heartBurst(8); showPage(8); });
document.getElementById('backBtn8').addEventListener('click', () => showPage(7));
document.getElementById('nextBtn8').addEventListener('click', () => { heartBurst(8); showPage(9); });
document.getElementById('backBtn9').addEventListener('click', () => showPage(8));
document.getElementById('replayLetter').addEventListener('click', startLetter);
document.getElementById('replayAll').addEventListener('click', () => {
  if (giftOpen.dataset.rain) clearInterval(giftOpen.dataset.rain);
  giftOpened = false;
  giftOpen.classList.add('hidden');
  giftClosed.style.display = '';
  showPage(1);
});

// ---------- page 8: blow the candle ----------
const candle = document.getElementById('candle');
const smoke = document.getElementById('smoke');
const wishBefore = document.getElementById('wishBefore');
const wishAfter = document.getElementById('wishAfter');
let candleOut = false;

function resetCandle() {
  candleOut = false;
  candle.classList.remove('off');
  smoke.classList.add('hidden');
  wishBefore.classList.remove('hidden');
  wishAfter.classList.add('hidden');
  document.getElementById('blowBtn').textContent = 'Blow Candle 💨';
}

document.getElementById('blowBtn').addEventListener('click', () => {
  if (candleOut) return;
  candleOut = true;
  const btn = document.getElementById('blowBtn');
  btn.textContent = '💨 ...';
  // puff of air, then flame goes off
  heartBurst(4);
  setTimeout(() => {
    candle.classList.add('off');
    smoke.classList.remove('hidden');
    wishBefore.classList.add('hidden');
    wishAfter.classList.remove('hidden');
    spawnConfetti(50);
    heartBurst(15);
    setTimeout(() => spawnConfetti(30), 800);
  }, 450);
});
document.getElementById('relightBtn').addEventListener('click', resetCandle);

// ---------- page 9: finale fireworks ----------
const fireworksBox = document.getElementById('fireworks');
const FW_COLORS = ['#f9c5d5', '#f0d98a', '#d4af37', '#a8bf97', '#ffffff', '#ff8fa3'];
const FW_EMOJI = ['🎆', '🎇', '✨', '❤️', '🎂'];
let finaleRain = null;

function spawnBurst(xPct, yPct, big = false) {
  const burst = document.createElement('div');
  burst.className = 'fw-burst';
  burst.style.left = xPct + 'vw';
  burst.style.top = yPct + 'vh';
  const count = big ? 16 : 10;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'fw-spark';
    const ang = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = (big ? 90 : 60) + Math.random() * 50;
    s.style.setProperty('--dx', Math.cos(ang) * dist + 'px');
    s.style.setProperty('--dy', Math.sin(ang) * dist + 'px');
    s.style.setProperty('--c', FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)]);
    s.style.setProperty('--dur', (Math.random() * 0.6 + 0.9) + 's');
    burst.appendChild(s);
  }
  const e = document.createElement('div');
  e.className = 'fw-emoji';
  e.textContent = FW_EMOJI[Math.floor(Math.random() * FW_EMOJI.length)];
  burst.appendChild(e);
  fireworksBox.appendChild(burst);
  setTimeout(() => burst.remove(), 1800);
}

function fireworkShow() {
  spawnBurst(15 + Math.random() * 70, 12 + Math.random() * 30, Math.random() > 0.5);
  if (Math.random() > 0.4) setTimeout(() => spawnBurst(15 + Math.random() * 70, 12 + Math.random() * 30), 300);
}

const finalLines = Array.from(document.querySelectorAll('#finalLines p'));
let finalTimers = [];

function startFinale() {
  finalTimers.forEach(clearTimeout);
  finalTimers = [];
  if (finaleRain) clearInterval(finaleRain);
  finalLines.forEach((el) => el.classList.remove('show'));
  finalLines.forEach((el, i) => {
    finalTimers.push(setTimeout(() => el.classList.add('show'), 500 + i * 900));
  });
  fireworkShow();
  heartBurst(10);
  spawnConfetti(40);
  finaleRain = setInterval(() => {
    fireworkShow();
    if (Math.random() > 0.6) spawnHeart();
  }, 2200);
}

document.getElementById('replayFinal').addEventListener('click', () => {
  fireworkShow();
  setTimeout(fireworkShow, 350);
  spawnConfetti(50);
  heartBurst(12);
});

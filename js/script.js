// Inicializar iconos Lucide
lucide.createIcons();

/* ==========================================
   CONFIGURACIÓN PERSONALIZABLE
   ========================================== */

// 1. FECHA EN LA QUE EMPEZARON (Año, Mes-1, Día)
// NOTA: El mes va de 0 a 11. Ejemplo: Enero = 0, Febrero = 1, Marzo = 2, etc.
const START_DATE = new Date(2023, 1, 14, 0, 0, 0); // Ejemplo: 14 Feb 2023

/* ==========================================
   1. ANIMACIÓN DEL SOBRE Y NAVEGACIÓN
   ========================================== */
const openBtn = document.getElementById('open-envelope-btn');
const letterContent = document.getElementById('letter-content');

openBtn.addEventListener('click', () => {
  envelopeScreen.classList.add('hidden');
  letterContent.classList.remove('hidden');
  
  // Iniciar audio ambiente suave de fondo opcional
  initAudio();
  
  // Crear efecto de papel confeti/corazones al abrir
  createBurstHearts();
});
/* ==========================================
   CONFIGURACIÓN DE ACCESO
   ========================================== */
// CONFIGURÁ AQUÍ LA CONTRASEÑA CORRECTA (puedes poner la fecha de ustedes, una palabra clave, etc.)
const CORRECT_PASSWORD = "Foxy"; // <-- Cambia esto por tu contraseña secreta

const loginForm = document.getElementById('login-form');
const loginScreen = document.getElementById('login-screen');
const envelopeScreen = document.getElementById('envelope-screen');
const errorMsg = document.getElementById('error-msg');
const userNameInput = document.getElementById('user-name');
const userPasswordInput = document.getElementById('user-password');
const welcomeMessage = document.getElementById('welcome-message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const enteredPassword = userPasswordInput.value.trim().toLowerCase();
  const userName = userNameInput.value.trim();

  if (enteredPassword === CORRECT_PASSWORD.toLowerCase()) {
    // Si la contraseña es correcta, ocultamos login y mostramos el sobre
    loginScreen.classList.add('hidden');
    envelopeScreen.classList.remove('hidden');
    
    // Personalizamos el mensaje del sobre con su nombre si lo escribió
    if (userName) {
      welcomeMessage.textContent = `Para ${userName} ❤️`;
    }
    
    // Recargamos los iconos para que aparezca el candado/corazones si hace falta
    lucide.createIcons();
  } else {
    // Si es incorrecta, mostramos el aviso de error
    errorMsg.classList.remove('hidden');
    userPasswordInput.value = '';
  }
});
/* ==========================================
   3. TARJETAS INTERACTIVAS (3D FLIP)
   ========================================== */
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

/* ==========================================
   4. EFECTOS INTERACTIVOS (BESOS Y ABRAZOS)
   ========================================== */
const kissBtn = document.getElementById('kiss-btn');
const hugBtn = document.getElementById('hug-btn');

kissBtn.addEventListener('click', () => {
  spawnFloatingEmojis(['💋', '😘', '💖', '✨']);
});

hugBtn.addEventListener('click', () => {
  spawnFloatingEmojis(['🫂', '🤍', '🧸', '🌸']);
});

function spawnFloatingEmojis(emojis) {
  for (let i = 0; i < 15; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = 'fixed';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.bottom = '-20px';
    el.style.fontSize = (Math.random() * 20 + 20) + 'px';
    el.style.zIndex = '9999';
    el.style.pointerEvents = 'none';
    el.style.transition = 'transform 3s cubic-bezier(0.25, 1, 0.5, 1), opacity 3s';
    
    document.body.appendChild(el);

    setTimeout(() => {
      el.style.transform = `translateY(-${Math.random() * 80 + 80}vh) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = '0';
    }, 50);

    setTimeout(() => el.remove(), 3000);
  }
}

/* ==========================================
   5. BOTÓN MOVIDIZO ("Mmm, un poquito")
   ========================================== */
const runawayBtn = document.getElementById('love-no');
const loveLotBtn = document.getElementById('love-a-lot');

runawayBtn.addEventListener('mouseover', moveButton);
runawayBtn.addEventListener('touchstart', moveButton);

function moveButton() {
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 100;
  runawayBtn.style.transform = `translate(${x}px, ${y}px)`;
}

loveLotBtn.addEventListener('click', () => {
  alert('¡Lo sabía! Yo también te amo con todo mi corazón 🥰❤️');
  createBurstHearts();
});

/* ==========================================
   6. CANVAS DE FONDO (CORAZONES FLOTANTES)
   ========================================== */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let hearts = [];

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Heart {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = height + Math.random() * 100;
    this.size = Math.random() * 12 + 8;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.swing = Math.random() * 0.02;
    this.swingAngle = Math.random() * Math.PI * 2;
  }

  update() {
    this.y -= this.speed;
    this.swingAngle += this.swing;
    this.x += Math.sin(this.swingAngle) * 0.5;

    if (this.y < -20) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = '#fb7185';
    ctx.beginPath();
    const topCurveHeight = this.size * 0.3;
    ctx.moveTo(this.x, this.y + topCurveHeight);
    ctx.bezierCurveTo(
      this.x, this.y, 
      this.x - this.size / 2, this.y, 
      this.x - this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x - this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
      this.x, this.y + this.size, 
      this.x, this.y + this.size
    );
    ctx.bezierCurveTo(
      this.x, this.y + this.size, 
      this.x + this.size / 2, this.y + (this.size + topCurveHeight) / 2, 
      this.x + this.size / 2, this.y + topCurveHeight
    );
    ctx.bezierCurveTo(
      this.x + this.size / 2, this.y, 
      this.x, this.y, 
      this.x, this.y + topCurveHeight
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

// Crear 25 corazones de fondo
for (let i = 0; i < 25; i++) {
  hearts.push(new Heart());
}

function animateCanvas() {
  ctx.clearRect(0, 0, width, height);
  hearts.forEach(heart => {
    heart.update();
    heart.draw();
  });
  requestAnimationFrame(animateCanvas);
}

animateCanvas();

function createBurstHearts() {
  spawnFloatingEmojis(['💖', '💗', '❤️', '✨', '🌸']);
}

/* ==========================================
   REPRODUCTOR DE MÚSICA (MULTIPLES CANCIONES)
   ========================================== */
const musicBtn = document.getElementById('music-toggle');
const nextSongBtn = document.getElementById('next-song-btn');
const bgAudio = document.getElementById('bg-audio');
const songTitleElem = document.getElementById('song-title');

// Lista con tus canciones y los nombres que querés mostrar
const playlist = [
  { src: 'audio/canción.mp3.mp3', title: 'Amor' },
  { src: 'audio/cancion2.mp3', title: 'Te amo' },
  { src: 'audio/cancion3.mp3', title: 'Hermoso' },
  { src: 'audio/cancion4.mp3', title: 'AMORCITO FNAF' }
];

let currentSongIndex = 0;
let isPlaying = false;

// Cargar la primera canción
function loadSong(index) {
  bgAudio.src = playlist[index].src;
  songTitleElem.textContent = playlist[index].title;
  bgAudio.load();
}

loadSong(currentSongIndex);

// Botón Reproducir / Pausar
musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgAudio.pause();
    isPlaying = false;
    musicBtn.style.opacity = '0.7';
  } else {
    bgAudio.play().catch(error => {
      console.log("Error al reproducir audio:", error);
    });
    isPlaying = true;
    musicBtn.style.opacity = '1';
  }
});

// Botón Siguiente Canción
nextSongBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  
  if (isPlaying) {
    bgAudio.play().catch(error => console.log(error));
  }
});

// Cuando termina una canción, pasa automáticamente a la siguiente
bgAudio.addEventListener('ended', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(currentSongIndex);
  bgAudio.play();
});
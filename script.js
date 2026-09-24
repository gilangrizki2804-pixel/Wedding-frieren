/**
 * THE WEDDING OF HIMMEL & FRIEREN - PIXEL ART DIGITAL INVITATION
 * Interactive Logic, Audio Synthesis, Animations & Modal System
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. WEB AUDIO SYNTHESIZER (8-BIT RETRO RPG AUDIO ENGINE)
  // =========================================================================
  class RetroAudioEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
      this.bgmPlaying = false;
      this.bgmTimer = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    // Play 8-bit blip / select sound
    playBlip(freq = 600, duration = 0.06, type = 'square') {
      if (this.isMuted) return;
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    }

    // Chest Opening Fanfare
    playChestFanfare() {
      if (this.isMuted) return;
      this.init();
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4 to C6
      const noteDuration = 0.08;
      
      notes.forEach((freq, idx) => {
        const startTime = this.ctx.currentTime + (idx * noteDuration);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    }

    // Accelerating Magic Circle Mana Hum / Vortex Sound
    playMagicVortex(duration = 3.8) {
      if (this.isMuted) return;
      this.init();
      const now = this.ctx.currentTime;
      
      // Dual oscillator for rich magical chorus
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sine';

      // Accelerating pitch sweep
      osc1.frequency.setValueAtTime(120, now);
      osc1.frequency.exponentialRampToValueAtTime(880, now + duration);

      osc2.frequency.setValueAtTime(122, now);
      osc2.frequency.exponentialRampToValueAtTime(1320, now + duration);

      // Lowpass opening up with mana intensity
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(4500, now + duration);

      // Volume swell
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.linearRampToValueAtTime(0.15, now + duration * 0.8);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    }

    // Modal Dialog open chime
    playDialogChime() {
      if (this.isMuted) return;
      this.init();
      const notes = [440, 554.37, 659.25];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + (idx * 0.05);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.16);
      });
    }

    // Success / Confirm sound
    playSuccess() {
      if (this.isMuted) return;
      this.init();
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const t = this.ctx.currentTime + (idx * 0.07);
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.08, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.22);
      });
    }

    // Procedural Gentle Medieval Fantasy Background Music
    startBGM() {
      if (this.bgmPlaying || this.isMuted) return;
      this.init();
      this.bgmPlaying = true;
      
      // Relaxing Frieren-esque arpeggiated acoustic melody
      const melody = [
        { note: 293.66, dur: 0.4 }, // D4
        { note: 329.63, dur: 0.4 }, // E4
        { note: 392.00, dur: 0.8 }, // G4
        { note: 440.00, dur: 0.4 }, // A4
        { note: 493.88, dur: 0.4 }, // B4
        { note: 587.33, dur: 1.2 }, // D5
        { note: 523.25, dur: 0.4 }, // C5
        { note: 493.88, dur: 0.4 }, // B4
        { note: 440.00, dur: 0.8 }, // A4
        { note: 392.00, dur: 0.8 }, // G4
        { note: 329.63, dur: 0.4 }, // E4
        { note: 293.66, dur: 1.4 }, // D4
      ];

      let noteIdx = 0;
      const playNext = () => {
        if (!this.bgmPlaying) return;
        const current = melody[noteIdx];
        
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(current.note, now);
          
          // Soft attack & gentle release
          gain.gain.setValueAtTime(0.0001, now);
          gain.gain.linearRampToValueAtTime(0.045, now + 0.06);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + current.dur + 0.2);
          
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          
          osc.start(now);
          osc.stop(now + current.dur + 0.25);
        } catch (e) {
          // AudioCtx might be handling states
        }

        noteIdx = (noteIdx + 1) % melody.length;
        this.bgmTimer = setTimeout(playNext, current.dur * 850);
      };

      playNext();
    }

    stopBGM() {
      this.bgmPlaying = false;
      if (this.bgmTimer) {
        clearTimeout(this.bgmTimer);
        this.bgmTimer = null;
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.isMuted) {
        this.stopBGM();
      } else {
        this.startBGM();
      }
      return !this.isMuted;
    }
  }

  const audio = new RetroAudioEngine();


  // =========================================================================
  // 2. MAGICAL PETALS & MANA PARTICLES (CANVAS)
  // =========================================================================
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(initial = false) {
      this.x = Math.random() * canvas.width;
      this.y = initial ? Math.random() * canvas.height : -20;
      this.size = Math.random() * 5 + 3;
      this.speedY = Math.random() * 0.8 + 0.5;
      this.speedX = Math.sin(Math.random() * Math.PI) * 0.5;
      this.angle = Math.random() * 360;
      this.spin = (Math.random() - 0.5) * 1.5;
      this.opacity = Math.random() * 0.6 + 0.3;
      // Blue moon weeds (Frieren blue/cyan) or golden mana sparks
      const isBlue = Math.random() > 0.3;
      this.color = isBlue ? 'rgba(100, 216, 255,' : 'rgba(255, 215, 120,';
    }
    update() {
      this.y += this.speedY;
      this.x += Math.sin(this.angle * Math.PI / 180) * 0.7;
      this.angle += this.spin;
      if (this.y > canvas.height + 20) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle * Math.PI / 180);
      ctx.fillStyle = `${this.color} ${this.opacity})`;
      // Draw petal shape
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 40; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();


  // =========================================================================
  // 3. LANDING SCREEN CHEST & MAGIC CIRCLE SEQUENCE
  // =========================================================================
  const introScreen = document.getElementById('introScreen');
  const mainScreen = document.getElementById('mainScreen');
  const chestStage = document.getElementById('chestStage');
  const chestClosedImg = document.getElementById('chestClosedImg');
  const chestOpenImg = document.getElementById('chestOpenImg');
  const magicCircleWrapper = document.getElementById('magicCircleWrapper');
  const frierenSpeech = document.getElementById('frierenSpeech');
  const chestPrompt = document.getElementById('chestPrompt');
  const teleportFlash = document.getElementById('teleportFlash');
  const replayIntroBtn = document.getElementById('replayIntroBtn');

  let isOpeningChest = false;

  function openChestSequence() {
    if (isOpeningChest) return;
    isOpeningChest = true;

    // 1. Play chest open fanfare & blip
    audio.playChestFanfare();

    // 2. Hide prompt
    chestPrompt.style.opacity = '0';
    chestPrompt.style.pointerEvents = 'none';

    // 3. Switch chest visual: closed -> open with Frieren
    chestClosedImg.classList.remove('visible');
    chestClosedImg.classList.add('hidden');
    chestOpenImg.classList.remove('hidden');
    chestOpenImg.classList.add('visible');

    // 4. Show Frieren speech bubble
    setTimeout(() => {
      frierenSpeech.classList.add('show');
    }, 200);

    // 5. Activate magic circle spinning and acceleration
    setTimeout(() => {
      magicCircleWrapper.classList.add('active');
      magicCircleWrapper.classList.add('spinning');
      audio.playMagicVortex(3.6);
    }, 400);

    // 6. Flash white & transition to main screen
    setTimeout(() => {
      teleportFlash.classList.add('flash-now');
    }, 3200);

    // 7. Swap screens
    setTimeout(() => {
      introScreen.classList.remove('active');
      mainScreen.classList.add('active');
      
      // Auto-start gentle BGM
      audio.startBGM();
      updateMusicBtnState(true);

      // Center camera on the bride and groom
      setTimeout(() => {
        centerOnCharacter('himmel-frieren');
      }, 100);

      // Fade out flash
      setTimeout(() => {
        teleportFlash.classList.remove('flash-now');
        isOpeningChest = false;
      }, 500);
    }, 3800);
  }

  chestStage.addEventListener('click', openChestSequence);
  chestStage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openChestSequence();
    }
  });

  // Replay Chest Intro Button
  replayIntroBtn.addEventListener('click', () => {
    audio.playBlip(700, 0.08);
    // Reset chest elements
    magicCircleWrapper.classList.remove('spinning', 'active');
    frierenSpeech.classList.remove('show');
    chestOpenImg.classList.remove('visible');
    chestOpenImg.classList.add('hidden');
    chestClosedImg.classList.remove('hidden');
    chestClosedImg.classList.add('visible');
    chestPrompt.style.opacity = '1';
    isOpeningChest = false;

    // Switch screens
    mainScreen.classList.remove('active');
    introScreen.classList.add('active');
    window.location.hash = '';
  });


  // =========================================================================
  // 4. BGM & SOUND TOGGLE
  // =========================================================================
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  const musicIcon = document.getElementById('musicIcon');
  const musicLabel = document.getElementById('musicLabel');

  function updateMusicBtnState(isPlaying) {
    if (isPlaying) {
      musicIcon.textContent = '🎵';
      musicLabel.textContent = 'Musik: ON';
      musicToggleBtn.style.borderColor = 'var(--color-border-light-gold)';
    } else {
      musicIcon.textContent = '🔇';
      musicLabel.textContent = 'Musik: OFF';
      musicToggleBtn.style.borderColor = '#64748b';
    }
  }

  musicToggleBtn.addEventListener('click', () => {
    const isNowPlaying = audio.toggleMute();
    updateMusicBtnState(isNowPlaying);
  });


  // =========================================================================
  // 5. PIN TOGGLE (SHOW / HIDE CHARACTER BADGES)
  // =========================================================================
  const togglePinsBtn = document.getElementById('togglePinsBtn');
  let pinsVisible = true;

  togglePinsBtn.addEventListener('click', () => {
    audio.playBlip(550, 0.05);
    pinsVisible = !pinsVisible;
    if (pinsVisible) {
      document.body.classList.remove('hide-pins');
      togglePinsBtn.querySelector('.btn-label').textContent = 'Penanda: ON';
    } else {
      document.body.classList.add('hide-pins');
      togglePinsBtn.querySelector('.btn-label').textContent = 'Penanda: OFF';
    }
  });


  // =========================================================================
  // 6. CHARACTER DIALOG DATA & MODAL SYSTEM
  // =========================================================================
  const dialogBackdrop = document.getElementById('dialogBackdrop');
  const dialogWindow = document.getElementById('dialogWindow');
  const dialogCloseBtn = document.getElementById('dialogCloseBtn');
  const dialogActionBtn = document.getElementById('dialogActionBtn');
  const dialogHeaderIcon = document.getElementById('dialogHeaderIcon');
  const dialogSpeaker = document.getElementById('dialogSpeaker');
  const dialogRole = document.getElementById('dialogRole');
  const dialogPortraitImg = document.getElementById('dialogPortraitImg');
  const portraitPlate = document.getElementById('portraitPlate');
  const dialogSpeechText = document.getElementById('dialogSpeechText');
  const dialogExtraContent = document.getElementById('dialogExtraContent');

  let typewriterTimer = null;

  // Typewriter effect function
  function typeWriter(text, element, speed = 18) {
    if (typewriterTimer) clearInterval(typewriterTimer);
    element.textContent = '';
    let i = 0;
    typewriterTimer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        // Play soft typewriter blip occasionally
        if (i % 4 === 0) {
          audio.playBlip(900 + (Math.random() * 150), 0.02, 'sine');
        }
        i++;
      } else {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
      }
    }, speed);
  }

  // Toast Notification Helper
  function showToast(message) {
    let toast = document.querySelector('.rpg-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'rpg-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // Pre-loaded Guest Wishes (stored in localStorage)
  const defaultWishes = [
    { name: "Eisen", status: "Hadir", text: "Selamat untuk Himmel dan Frieren! Aku sudah tidak sabar mencicipi daging panggangnya." },
    { name: "Fern", status: "Hadir", text: "Melihat Tuan Himmel dan Nona Frieren tersenyum bersama adalah anugerah terbesar bagi kami." },
    { name: "Stark", status: "Hadir", text: "Semoga bahagia selalu! Aku berjanji tidak akan membuat keributan di acara nanti!" },
    { name: "Flamme", status: "Doa", text: "Sihir terindah di dunia adalah cinta yang tulus dan setia hingga akhir masa." }
  ];

  function getStoredWishes() {
    try {
      const data = localStorage.getItem('frieren_wedding_wishes');
      return data ? JSON.parse(data) : defaultWishes;
    } catch (e) {
      return defaultWishes;
    }
  }

  function saveWish(newWish) {
    try {
      const wishes = getStoredWishes();
      wishes.unshift(newWish);
      localStorage.setItem('frieren_wedding_wishes', JSON.stringify(wishes));
    } catch (e) {
      console.error(e);
    }
  }

  // Character Profiles & Information Content
  const characterData = {
    'himmel-frieren': {
      icon: '💍',
      speaker: 'Himmel & Frieren',
      role: 'Sang Mempelai Pengantin',
      portrait: 'assets/avatar_himmel.png',
      plate: 'Himmel & Frieren',
      speech: 'Setelah 10 tahun perjalanan mengarungi benua dan mengalahkan Raja Iblis, sebuah petualangan baru yang teramat indah dimulai di hadapan kalian semua. Terima kasih telah hadir dan menjadi bagian dari kisah abadi kami.',
      renderContent: () => `
        <div class="info-card">
          <div class="info-card-title">⚜️ MEMPELAI PRIA & WANITA</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Mempelai Pria</span>
              <span class="info-value">Himmel The Hero</span>
              <span style="font-size: 11.5px; color: var(--color-text-muted);">Putra dari Keluarga Pahlawan Kerajaan</span>
            </div>
            <div class="info-item">
              <span class="info-label">Mempelai Wanita</span>
              <span class="info-value">Frieren The Mage</span>
              <span style="font-size: 11.5px; color: var(--color-text-muted);">Penyihir Elf, Murid dari Flamme</span>
            </div>
          </div>
        </div>

        <div class="info-card">
          <div class="info-card-title">⏳ HITUNG MUNDUR HARI PERNIKAHAN</div>
          <div class="countdown-container" id="modalCountdown">
            <div class="countdown-box"><span class="countdown-num" id="cdDays">00</span><span class="countdown-unit">Hari</span></div>
            <div class="countdown-box"><span class="countdown-num" id="cdHours">00</span><span class="countdown-unit">Jam</span></div>
            <div class="countdown-box"><span class="countdown-num" id="cdMins">00</span><span class="countdown-unit">Menit</span></div>
            <div class="countdown-box"><span class="countdown-num" id="cdSecs">00</span><span class="countdown-unit">Detik</span></div>
          </div>
        </div>

        <div class="button-row">
          <button class="rpg-btn btn-action" onclick="window.openCharacterDialog('heiter')">📜 Jadwal Pemberkatan</button>
          <button class="rpg-btn btn-secondary" onclick="window.openCharacterDialog('fern')">💌 Konfirmasi Kehadiran (RSVP)</button>
        </div>
      `,
      onMounted: () => startCountdown()
    },

    'heiter': {
      icon: '📜',
      speaker: 'Pendeta Heiter',
      role: 'Uskup & Pemimpin Pemberkatan',
      portrait: 'assets/avatar_heiter.png',
      plate: 'Heiter',
      speech: 'Sebagai hamba Sang Dewi (dan penikmat anggur pesta), aku merasa terhormat memimpin ikrar suci ini. Semoga Sang Dewi senantiasa melimpahkan cinta, kesehatan, dan kebahagiaan abadi bagi Himmel dan Frieren!',
      renderContent: () => `
        <div class="info-card">
          <div class="info-card-title">⛪ PEMBERKATAN PERNIKAHAN (HOLY MATRIMONY)</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Hari & Tanggal</span>
              <span class="info-value">Sabtu, 24 Oktober 2026</span>
            </div>
            <div class="info-item">
              <span class="info-label">Waktu Ibadah</span>
              <span class="info-value">09:00 - 11:00 WIB</span>
            </div>
            <div class="info-item" style="grid-column: 1 / -1;">
              <span class="info-label">Tempat Acara</span>
              <span class="info-value">Katedral Agung Ibu Kota Kerajaan (Holy Royal Cathedral)</span>
              <span style="font-size: 12px; color: var(--color-text-muted);">Jl. Katedral Kerajaan No. 1, Ibu Kota Suci</span>
            </div>
          </div>
        </div>

        <div class="button-row">
          <a class="rpg-btn btn-action" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Himmel+%26+Frieren&dates=20261024T020000Z/20261024T040000Z&details=Pemberkatan+Pernikahan+Himmel+dan+Frieren&location=Katedral+Agung+Ibu+Kota" target="_blank" rel="noopener">📅 Simpan ke Google Calendar</a>
          <button class="rpg-btn btn-secondary" onclick="window.openCharacterDialog('sein')">📍 Buka Denah Lokasi</button>
        </div>
      `
    },

    'eisen': {
      icon: '🍗',
      speaker: 'Prajurit Eisen',
      role: 'Ksatria & Penanggung Jawab Jamuan',
      portrait: 'assets/avatar_eisen.png',
      plate: 'Eisen',
      speech: 'Pertarungan sengit di masa lalu telah kita menangkan! Sekarang saatnya kita merayakan pesta besar! Daging panggang lezat dan hidangan terlezat telah disiapkan. Jangan biarkan ada piring yang kosong!',
      renderContent: () => `
        <div class="info-card">
          <div class="info-card-title">🎉 PESTA RESEPSI & JAMUAN KERAJAAN</div>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Hari & Tanggal</span>
              <span class="info-value">Sabtu, 24 Oktober 2026</span>
            </div>
            <div class="info-item">
              <span class="info-label">Waktu Resepsi</span>
              <span class="info-value">12:00 WIB - Selesai</span>
            </div>
            <div class="info-item">
              <span class="info-label">Lokasi Jamuan</span>
              <span class="info-value">Royal Banquet Hall (Sayap Barat)</span>
            </div>
            <div class="info-item">
              <span class="info-label">Dress Code</span>
              <span class="info-value" style="color: var(--color-mana-blue);">Royal Blue / Earth Tone / Formal</span>
            </div>
          </div>
        </div>

        <div class="info-card">
          <div class="info-card-title">🛡️ CATATAN & PROTOKOL TAMU</div>
          <ul style="font-size: 12.5px; color: var(--color-text-muted); padding-left: 18px; line-height: 1.6;">
            <li>Mohon hadir 15 menit sebelum acara dimulai.</li>
            <li>Senjata perang (pedang dan kapak) harap dititipkan di pos penjaga depan gerbang.</li>
            <li>Dipersilakan menikmati hidangan dan mengabadikan foto kenangan.</li>
          </ul>
        </div>

        <div class="button-row">
          <button class="rpg-btn btn-action" onclick="window.openCharacterDialog('fern')">💌 Konfirmasi Kehadiran</button>
          <button class="rpg-btn btn-secondary" onclick="window.openCharacterDialog('grimoire')">📖 Kirim Amplop / Hadiah</button>
        </div>
      `
    },

    'stark': {
      icon: '⚔️',
      speaker: 'Stark & Rekan Pengelana',
      role: 'Sahabat Perjalanan',
      portrait: 'assets/avatar_stark.png',
      plate: 'Stark',
      speech: 'Aku sempat sangat gugup saat datang ke katedral semegah ini... tapi melihat senyuman Tuan Himmel dan Nona Frieren di pelaminan, aku sadar ini adalah momen paling membahagiakan dalam sejarah perjalanan kita!',
      renderContent: () => `
        <div class="info-card">
          <div class="info-card-title">📜 KISAH PERJALANAN CINTA (OUR STORY TIMELINE)</div>
          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12.5px;">
            <div style="border-left: 2px solid var(--color-border-gold); padding-left: 10px;">
              <span style="font-family: var(--font-pixel); font-size: 8.5px; color: var(--color-border-light-gold);">TAHUN KE-0 • AWAL PERTEMUAN</span>
              <p style="color: #cbd5e1; margin-top: 2px;">Pertemuan pertama sang pahlawan dan penyihir di desa awal, memulai petualangan 10 tahun menumpas kegelapan.</p>
            </div>
            <div style="border-left: 2px solid var(--color-mana-blue); padding-left: 10px;">
              <span style="font-family: var(--font-pixel); font-size: 8.5px; color: var(--color-mana-blue);">TAHUN KE-5 • CINCIN BUNGA TERATAI CERMIN</span>
              <p style="color: #cbd5e1; margin-top: 2px;">Himmel mempersembahkan cincin bermotif Bunga Teratai Kaca (Mirror Lotus), lambang cinta sejati yang tak lekang oleh waktu.</p>
            </div>
            <div style="border-left: 2px solid #4ade80; padding-left: 10px;">
              <span style="font-family: var(--font-pixel); font-size: 8.5px; color: #4ade80);">HARI INI • JANJI SUCI DI ALTAR</span>
              <p style="color: #cbd5e1; margin-top: 2px;">Dua hati bersatu dalam ikatan suci pernikahan, disaksikan oleh sahabat setia dari seluruh penjuru negeri.</p>
            </div>
          </div>
        </div>

        <div class="button-row">
          <button class="rpg-btn btn-action" onclick="window.openCharacterDialog('himmel-frieren')">💍 Profil Mempelai</button>
        </div>
      `
    },

    'fern': {
      icon: '💌',
      speaker: 'Fern & Methode',
      role: 'Penyambut Tamu & RSVP',
      portrait: 'assets/avatar_fern.png',
      plate: 'Fern',
      speech: 'Selamat datang. Merupakan suatu kehormatan besar bagi kami menerima kehadiran Anda. Mohon berkenan meluangkan waktu sejenak untuk mengisi formulir konfirmasi kehadiran di bawah ini.',
      renderContent: () => `
        <div class="info-card">
          <div class="info-card-title">📝 KONFIRMASI KEHADIRAN (RSVP)</div>
          <form class="rpg-form" id="rsvpForm">
            <div class="form-group">
              <label class="form-label" for="guestName">NAMA LENGKAP PENGELANA / TAMU</label>
              <input type="text" id="guestName" class="rpg-input" placeholder="Contoh: Fern / Nama Anda..." required>
            </div>

            <div class="form-group">
              <label class="form-label">APAKAH ANDA DAPAT MENGHADIRI ACARA?</label>
              <div class="attendance-options">
                <label class="radio-pill">
                  <input type="radio" name="attendance" value="Hadir" checked>
                  <span>✨ Siap Hadir</span>
                </label>
                <label class="radio-pill">
                  <input type="radio" name="attendance" value="Ragu">
                  <span>⏳ Masih Ragu</span>
                </label>
                <label class="radio-pill">
                  <input type="radio" name="attendance" value="Maaf Tidak Bisa">
                  <span>🍃 Berhalangan</span>
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="guestCount">JUMLAH TAMU</label>
              <select id="guestCount" class="rpg-select">
                <option value="1 Orang">1 Orang</option>
                <option value="2 Orang">2 Orang</option>
                <option value="3+ Orang">3+ Orang (Keluarga)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="guestWish">DOA RESTU & UCAPAN</label>
              <textarea id="guestWish" class="rpg-textarea" rows="3" placeholder="Tuliskan ucapan dan doa hangat untuk kedua mempelai..." required></textarea>
            </div>

            <button type="submit" class="rpg-btn btn-action" style="align-self: flex-start; margin-top: 4px;">
              ✉️ Kirim Konfirmasi &amp; Doa
            </button>
          </form>
        </div>

        <div class="info-card">
          <div class="info-card-title">📖 UCAPAN DARI PARA TAMU</div>
          <div class="wishes-feed" id="modalWishesFeed">
            <!-- Dynamically populated -->
          </div>
        </div>
      `,
      onMounted: () => {
        setupRSVPForm();
        renderWishesFeed();
      }
    },

    'sein': {
      icon: '📍',
      speaker: 'Sein Sang Pendeta Pengembara',
      role: 'Pemandu & Navigasi',
      portrait: 'assets/avatar_sein.png',
      plate: 'Sein',
      speech: 'Bahkan pengelana yang gemar tersesat sepertiku pun tidak akan melewatkan pernikahan bersejarah ini. Gunakan peta ini agar kalian tiba tepat waktu tanpa harus bertanya ke penduduk desa!',
      renderContent: () => `
        <div class="info-card">
          <div class="info-card-title">🗺️ LOKASI & DENAH ACARA</div>
          <div class="info-grid">
            <div class="info-item" style="grid-column: 1 / -1;">
              <span class="info-label">Alamat Lengkap</span>
              <span class="info-value">Katedral Agung Ibu Kota Kerajaan</span>
              <span style="font-size: 12.5px; color: var(--color-text-muted);">Jl. Katedral Kerajaan No. 1, Pusat Kota (Depan Alun-Alun Pahlawan)</span>
            </div>
          </div>
          
          <!-- Embedded Google Map -->
          <div style="margin-top: 12px; border-radius: 6px; overflow: hidden; border: 2px solid var(--color-border-dark-gold); height: 180px;">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126920.28212134591!2d106.759478!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e49fe3ddb3%3A0x73d5b778b96a24c3!2sGereja%20Katedral%20Jakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
              width="100%" 
              height="100%" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>

        <div class="button-row">
          <a class="rpg-btn btn-action" href="https://maps.google.com/?q=Gereja+Katedral+Jakarta" target="_blank" rel="noopener">🗺️ Buka Rute di Google Maps</a>
          <button class="rpg-btn btn-secondary" onclick="window.copyAddress()">📋 Salin Alamat</button>
        </div>
      `
    },

    'grimoire': {
      icon: '📖',
      speaker: 'Grimoire Hadiah & Tanda Kasih',
      role: 'Amplop Digital & Buku Tamu',
      portrait: 'assets/avatar_grimoire.png',
      plate: 'Grimoire',
      speech: 'Bagi para pengelana dan kerabat yang berkenan mengirimkan tanda kasih dan berkat dari kejauhan, Grimoire ini siap mencatat setiap doa serta kado kebahagiaan untuk kedua mempelai.',
      renderContent: () => `
        <div class="info-card">
          <div class="info-card-title">💳 AMPLOP DIGITAL (TRANSFER BANK & E-WALLET)</div>
          <p style="font-size: 12px; color: var(--color-text-muted); margin-bottom: 10px;">
            Doa restu Anda merupakan hadiah terindah bagi kami. Jika berkenan memberikan tanda kasih, Anda dapat menggunakan rekening di bawah ini:
          </p>

          <div class="bank-card">
            <div class="bank-info">
              <span class="bank-name">BANK CENTRAL ASIA (BCA)</span>
              <span class="bank-number">1234-5678-90</span>
              <span class="bank-owner">a.n. Himmel &amp; Frieren</span>
            </div>
            <button class="rpg-btn btn-sm" onclick="window.copyToClipboard('1234567890', 'Nomor rekening BCA berhasil disalin!')">
              📋 Salin
            </button>
          </div>

          <div class="bank-card">
            <div class="bank-info">
              <span class="bank-name">BANK MANDIRI</span>
              <span class="bank-number">9876-5432-10</span>
              <span class="bank-owner">a.n. Himmel</span>
            </div>
            <button class="rpg-btn btn-sm" onclick="window.copyToClipboard('9876543210', 'Nomor rekening Mandiri berhasil disalin!')">
              📋 Salin
            </button>
          </div>
        </div>

        <div class="info-card">
          <div class="info-card-title">📦 PENGIRIMAN KADO FISIK</div>
          <div class="info-item">
            <span class="info-label">Alamat Kediaman</span>
            <span class="info-value">Wisma Pahlawan Kerajaan, Jl. Mawar No. 4, Ibu Kota Suci (Penerima: Himmel / Frieren)</span>
          </div>
          <button class="rpg-btn btn-secondary" style="margin-top: 8px;" onclick="window.copyToClipboard('Wisma Pahlawan Kerajaan, Jl. Mawar No. 4, Ibu Kota Suci (Penerima: Himmel / Frieren)', 'Alamat kado fisik berhasil disalin!')">
            📋 Salin Alamat Kado
          </button>
        </div>
      `
    },

    'banner': {
      icon: '✨',
      speaker: 'Keluarga Besar Kerajaan',
      role: 'Sambutan Hangat',
      portrait: 'assets/avatar_himmel.png',
      plate: 'Sambutan',
      speech: 'Dengan segala kerendahan hati dan rasa syukur kepada Sang Dewi, kami menyambut kehadiran seluruh kerabat dan sahabat pengelana dalam perayaan ikrar suci ini.',
      renderContent: () => `
        <div class="info-card" style="text-align: center; padding: 20px 14px;">
          <h3 style="font-family: var(--font-royal); font-size: 1.4rem; color: #ffeed3; margin-bottom: 6px;">
            The Wedding of Himmel &amp; Frieren
          </h3>
          <p style="font-family: var(--font-pixel); font-size: 8px; color: var(--color-border-light-gold); margin-bottom: 14px;">
            24 OKTOBER 2026 • KATEDRAL KERAJAAN
          </p>
          <p style="font-size: 13px; color: #cbd5e1; line-height: 1.6; max-width: 440px; margin: 0 auto;">
            "Waktu mungkin terus mengalir seperti sungai, namun kenangan dan cinta sejati akan tetap hidup selamanya di dalam hati."
          </p>
        </div>
        <div class="button-row" style="justify-content: center;">
          <button class="rpg-btn btn-action" onclick="window.openCharacterDialog('himmel-frieren')">💍 Lihat Profil Pengantin</button>
          <button class="rpg-btn btn-secondary" onclick="window.openCharacterDialog('fern')">💌 Isi RSVP</button>
        </div>
      `
    }
  };

  // Open Character Dialog Modal
  function openCharacterDialog(charKey) {
    const data = characterData[charKey];
    if (!data) return;

    audio.playDialogChime();
    centerOnCharacter(charKey);

    // Set Header
    dialogHeaderIcon.textContent = data.icon;
    dialogSpeaker.textContent = data.speaker;
    dialogRole.textContent = data.role;

    // Set Portrait
    dialogPortraitImg.src = data.portrait;
    portraitPlate.textContent = data.plate;

    // Set Speech with typewriter
    typeWriter(data.speech, dialogSpeechText, 18);

    // Set Body Extra Content
    dialogExtraContent.innerHTML = data.renderContent();

    // Call hook if available
    if (data.onMounted) {
      data.onMounted();
    }

    // Open Modal
    dialogBackdrop.classList.add('open');
    dialogBackdrop.setAttribute('aria-hidden', 'false');

    // Update bottom dock active state
    document.querySelectorAll('.dock-item').forEach(btn => {
      if (btn.dataset.character === charKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Close Character Dialog Modal
  function closeCharacterDialog() {
    audio.playBlip(400, 0.04);
    dialogBackdrop.classList.remove('open');
    dialogBackdrop.setAttribute('aria-hidden', 'true');
    if (typewriterTimer) {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
    }
    // Set dock item to map
    document.querySelectorAll('.dock-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === 'map');
    });
  }

  dialogCloseBtn.addEventListener('click', closeCharacterDialog);
  dialogActionBtn.addEventListener('click', closeCharacterDialog);
  dialogBackdrop.addEventListener('click', (e) => {
    if (e.target === dialogBackdrop) {
      closeCharacterDialog();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialogBackdrop.classList.contains('open')) {
      closeCharacterDialog();
    }
  });

  // Attach hotspots clicks on the map
  document.querySelectorAll('.char-hotspot').forEach(hotspot => {
    hotspot.addEventListener('click', () => {
      if (hasMovedFar) return;
      const charKey = hotspot.dataset.character;
      openCharacterDialog(charKey);
    });
  });

  // Attach banner overlay click
  const bannerOverlay = document.getElementById('bannerOverlay');
  if (bannerOverlay) {
    bannerOverlay.addEventListener('click', () => {
      if (hasMovedFar) return;
      openCharacterDialog('banner');
    });
  }

  // Attach bottom dock buttons
  document.querySelectorAll('.dock-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const charKey = btn.dataset.character;
      if (charKey) {
        openCharacterDialog(charKey);
      } else if (btn.dataset.target === 'map') {
        closeCharacterDialog();
      }
    });
  });

  // Expose to window for inline onclick handlers
  window.openCharacterDialog = openCharacterDialog;

  window.copyToClipboard = (text, successMsg = 'Teks berhasil disalin!') => {
    audio.playSuccess();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg);
      }).catch(() => {
        fallbackCopy(text, successMsg);
      });
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  window.copyAddress = () => {
    window.copyToClipboard('Katedral Agung Ibu Kota Kerajaan, Jl. Katedral Kerajaan No. 1, Ibu Kota Suci', 'Alamat Katedral berhasil disalin!');
  };

  function fallbackCopy(text, msg) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(msg);
  }

  // Countdown timer logic
  function startCountdown() {
    const targetDate = new Date('2026-10-24T09:00:00+07:00').getTime();

    function update() {
      const daysEl = document.getElementById('cdDays');
      const hoursEl = document.getElementById('cdHours');
      const minsEl = document.getElementById('cdMins');
      const secsEl = document.getElementById('cdSecs');
      if (!daysEl) return;

      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        daysEl.textContent = '00';
        hoursEl.textContent = '00';
        minsEl.textContent = '00';
        secsEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, '0');
      hoursEl.textContent = String(hours).padStart(2, '0');
      minsEl.textContent = String(mins).padStart(2, '0');
      secsEl.textContent = String(secs).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
  }

  // Setup RSVP Form in Modal
  function setupRSVPForm() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('guestName').value.trim();
      const attendance = form.querySelector('input[name="attendance"]:checked').value;
      const count = document.getElementById('guestCount').value;
      const wish = document.getElementById('guestWish').value.trim();

      if (!name || !wish) return;

      audio.playSuccess();

      const newWish = {
        name: name,
        status: `${attendance} (${count})`,
        text: wish
      };

      saveWish(newWish);
      renderWishesFeed();

      showToast('Terima kasih! Konfirmasi & doa Anda telah tercatat ✨');
      form.reset();
    });
  }

  function renderWishesFeed() {
    const feed = document.getElementById('modalWishesFeed');
    if (!feed) return;
    const wishes = getStoredWishes();
    feed.innerHTML = wishes.map(w => `
      <div class="wish-item">
        <div class="wish-author">
          <span>${w.name}</span>
          <span class="wish-status">${w.status}</span>
        </div>
        <div class="wish-text">${w.text}</div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 7. MAP ZOOM, DRAG-PAN & CAMERA CENTERING
  // =========================================================================
  const mapViewport = document.getElementById('mapViewport');
  const mapCanvasWrapper = document.getElementById('mapCanvasWrapper');
  const zoomInBtn = document.getElementById('zoomInBtn');
  const zoomOutBtn = document.getElementById('zoomOutBtn');
  const centerMapBtn = document.getElementById('centerMapBtn');

  const zoomWidths = [700, 860, 1080, 1360];
  let zoomIndex = 1;

  function updateZoom(newIdx) {
    zoomIndex = Math.max(0, Math.min(zoomWidths.length - 1, newIdx));
    mapCanvasWrapper.style.width = zoomWidths[zoomIndex] + 'px';
    audio.playBlip(500 + zoomIndex * 100, 0.04);
  }

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => updateZoom(zoomIndex + 1));
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => updateZoom(zoomIndex - 1));
  if (centerMapBtn) centerMapBtn.addEventListener('click', () => centerOnCharacter('himmel-frieren'));

  function centerOnCharacter(charKey) {
    const hotspot = document.querySelector(`.char-hotspot[data-character="${charKey}"]`);
    if (!hotspot || !mapViewport) return;

    const hpRect = hotspot.getBoundingClientRect();
    const vpRect = mapViewport.getBoundingClientRect();

    const scrollLeftTarget = mapViewport.scrollLeft + (hpRect.left + hpRect.width / 2) - (vpRect.left + vpRect.width / 2);
    const scrollTopTarget = mapViewport.scrollTop + (hpRect.top + hpRect.height / 2) - (vpRect.top + vpRect.height / 2);

    mapViewport.scrollTo({
      left: Math.max(0, scrollLeftTarget),
      top: Math.max(0, scrollTopTarget),
      behavior: 'smooth'
    });
  }
  window.centerOnCharacter = centerOnCharacter;

  // Mouse & Touch Pan Handling
  let isPanning = false;
  let startX = 0, startY = 0;
  let scrollStartLeft = 0, scrollStartTop = 0;
  let hasMovedFar = false;

  if (mapViewport) {
    // Mouse Drag
    mapViewport.addEventListener('mousedown', (e) => {
      if (e.target.closest('.map-hud-controls')) return;
      isPanning = true;
      hasMovedFar = false;
      startX = e.pageX;
      startY = e.pageY;
      scrollStartLeft = mapViewport.scrollLeft;
      scrollStartTop = mapViewport.scrollTop;
    });

    window.addEventListener('mouseup', () => {
      isPanning = false;
      setTimeout(() => { hasMovedFar = false; }, 60);
    });

    mapViewport.addEventListener('mousemove', (e) => {
      if (!isPanning) return;
      const walkX = e.pageX - startX;
      const walkY = e.pageY - startY;
      if (Math.hypot(walkX, walkY) > 6) {
        hasMovedFar = true;
      }
      mapViewport.scrollLeft = scrollStartLeft - walkX;
      mapViewport.scrollTop = scrollStartTop - walkY;
    });

    // Touch Drag (for mobile smartphones)
    mapViewport.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1 || e.target.closest('.map-hud-controls')) return;
      isPanning = true;
      hasMovedFar = false;
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
      scrollStartLeft = mapViewport.scrollLeft;
      scrollStartTop = mapViewport.scrollTop;
    }, { passive: true });

    mapViewport.addEventListener('touchmove', (e) => {
      if (!isPanning || e.touches.length > 1) return;
      const walkX = e.touches[0].pageX - startX;
      const walkY = e.touches[0].pageY - startY;
      if (Math.hypot(walkX, walkY) > 8) {
        hasMovedFar = true;
      }
      mapViewport.scrollLeft = scrollStartLeft - walkX;
      mapViewport.scrollTop = scrollStartTop - walkY;
    }, { passive: true });

    mapViewport.addEventListener('touchend', () => {
      isPanning = false;
      setTimeout(() => { hasMovedFar = false; }, 80);
    }, { passive: true });
  }

  // Support direct URL hash navigation (e.g., #main or #heiter or #open-preview)
  function checkHashRouting() {
    const hash = window.location.hash.replace('#', '');
    if (!hash) return;
    if (hash === 'open-preview') {
      chestPrompt.style.opacity = '0';
      chestClosedImg.classList.remove('visible');
      chestClosedImg.classList.add('hidden');
      chestOpenImg.classList.remove('hidden');
      chestOpenImg.classList.add('visible');
      frierenSpeech.classList.add('show');
      magicCircleWrapper.classList.add('active', 'spinning');
    } else if (hash === 'main') {
      introScreen.classList.remove('active');
      mainScreen.classList.add('active');
      setTimeout(() => centerOnCharacter('himmel-frieren'), 200);
    } else if (characterData && characterData[hash]) {
      introScreen.classList.remove('active');
      mainScreen.classList.add('active');
      setTimeout(() => openCharacterDialog(hash), 250);
    }
  }
  checkHashRouting();
  window.addEventListener('hashchange', checkHashRouting);

});


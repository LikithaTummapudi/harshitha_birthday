/**
 * sounds.js - Sound Effects Manager for Harshitha's Birthday Website
 * 
 * Features:
 * - NO background music (as requested).
 * - High-quality procedural Web Audio API synthesis for zero-dependency immediate audio!
 * - Optional MP3 loader that checks assets/sounds/ for custom audio files.
 * - Sound toggle button with localStorage persistence.
 * - Safe handling of browser autoplay restrictions and missing files.
 */

class SoundManager {
    constructor() {
        this.muted = localStorage.getItem('harshitha_sound_muted') === 'true';
        this.audioCtx = null;
        this.mp3Cache = {};
        this.soundFiles = {
            'click': 'assets/sounds/button-click.mp3',
            'flip': 'assets/sounds/page-flip.mp3',
            'blow': 'assets/sounds/candle-blow.mp3',
            'confetti': 'assets/sounds/confetti.mp3',
            'correct': 'assets/sounds/correct-answer.mp3',
            'retry': 'assets/sounds/retry.mp3',
            'envelope': 'assets/sounds/envelope-open.mp3',
            'sticker': 'assets/sounds/sticker-pop.mp3',
            'chaos': 'assets/sounds/chaos.mp3'
        };

        this.initToggleUI();
    }

    /**
     * Initializes the Web Audio context on the first user interaction.
     */
    initContext() {
        if (!this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
            }
        }
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
            this.audioCtx.resume();
        }
    }

    /**
     * Set up the floating sound toggle button in the DOM.
     */
    initToggleUI() {
        document.addEventListener('DOMContentLoaded', () => {
            const toggleBtn = document.getElementById('sound-toggle-btn');
            if (toggleBtn) {
                this.updateToggleButton(toggleBtn);
                toggleBtn.addEventListener('click', () => {
                    this.toggleMute();
                    this.updateToggleButton(toggleBtn);
                    if (!this.muted) {
                        this.play('click');
                    }
                });
            }
        });
    }

    updateToggleButton(btn) {
        if (this.muted) {
            btn.innerHTML = '🔇 <span class="sound-label">Sound: OFF</span>';
            btn.setAttribute('aria-label', 'Sound muted. Click to turn sound on.');
            btn.classList.add('is-muted');
        } else {
            btn.innerHTML = '🔊 <span class="sound-label">Sound: ON</span>';
            btn.setAttribute('aria-label', 'Sound playing. Click to mute sound.');
            btn.classList.remove('is-muted');
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('harshitha_sound_muted', this.muted);
        return this.muted;
    }

    /**
     * Play a sound effect by name.
     * Tries MP3 first if loaded; falls back smoothly to procedural Web Audio.
     */
    play(soundName) {
        if (this.muted) return;
        this.initContext();

        const mp3Path = this.soundFiles[soundName];
        if (mp3Path) {
            const audio = new Audio(mp3Path);
            audio.volume = 0.55;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // MP3 not found or blocked: Fall back to Web Audio synth!
                    this.playProcedural(soundName);
                });
                return;
            }
        }

        this.playProcedural(soundName);
    }

    /**
     * Web Audio API procedural sound synthesis for all scrapbooking effects.
     */
    playProcedural(type) {
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;

        try {
            switch (type) {
                case 'click': {
                    // Crisp, gentle mechanical click
                    const osc = this.audioCtx.createOscillator();
                    const gain = this.audioCtx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(600, now);
                    osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);
                    gain.gain.setValueAtTime(0.3, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
                    osc.connect(gain);
                    gain.connect(this.audioCtx.destination);
                    osc.start(now);
                    osc.stop(now + 0.05);
                    break;
                }
                case 'flip': {
                    // Soft paper rustle / whoosh
                    const bufferSize = this.audioCtx.sampleRate * 0.15;
                    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
                    const output = buffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
                    }
                    const whiteNoise = this.audioCtx.createBufferSource();
                    whiteNoise.buffer = buffer;
                    const filter = this.audioCtx.createBiquadFilter();
                    filter.type = 'bandpass';
                    filter.frequency.setValueAtTime(1200, now);
                    filter.frequency.exponentialRampToValueAtTime(400, now + 0.15);
                    const gain = this.audioCtx.createGain();
                    gain.gain.setValueAtTime(0.2, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                    whiteNoise.connect(filter);
                    filter.connect(gain);
                    gain.connect(this.audioCtx.destination);
                    whiteNoise.start(now);
                    break;
                }
                case 'blow': {
                    // Breathy air gust extinguishing candle
                    const bufferSize = this.audioCtx.sampleRate * 0.35;
                    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
                    const output = buffer.getChannelData(0);
                    for (let i = 0; i < bufferSize; i++) {
                        output[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * i / bufferSize);
                    }
                    const noise = this.audioCtx.createBufferSource();
                    noise.buffer = buffer;
                    const filter = this.audioCtx.createBiquadFilter();
                    filter.type = 'lowpass';
                    filter.frequency.setValueAtTime(800, now);
                    filter.frequency.exponentialRampToValueAtTime(180, now + 0.35);
                    const gain = this.audioCtx.createGain();
                    gain.gain.setValueAtTime(0.35, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                    noise.connect(filter);
                    filter.connect(gain);
                    gain.connect(this.audioCtx.destination);
                    noise.start(now);
                    break;
                }
                case 'confetti': {
                    // Sparkly cheerful magical chime cascade
                    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
                    freqs.forEach((freq, idx) => {
                        const noteTime = now + (idx * 0.06);
                        const osc = this.audioCtx.createOscillator();
                        const gain = this.audioCtx.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(freq, noteTime);
                        gain.gain.setValueAtTime(0.18, noteTime);
                        gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.3);
                        osc.connect(gain);
                        gain.connect(this.audioCtx.destination);
                        osc.start(noteTime);
                        osc.stop(noteTime + 0.3);
                    });
                    break;
                }
                case 'correct': {
                    // Happy triumph harp / celebration
                    const notes = [587.33, 739.99, 880.00, 1174.66]; // D-F#-A-D major
                    notes.forEach((f, i) => {
                        const t = now + (i * 0.08);
                        const osc = this.audioCtx.createOscillator();
                        const gain = this.audioCtx.createGain();
                        osc.type = 'sine';
                        osc.frequency.setValueAtTime(f, t);
                        gain.gain.setValueAtTime(0.25, t);
                        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
                        osc.connect(gain);
                        gain.connect(this.audioCtx.destination);
                        osc.start(t);
                        osc.stop(t + 0.4);
                    });
                    break;
                }
                case 'retry': {
                    // Playful, cute "boing" wobble
                    const osc = this.audioCtx.createOscillator();
                    const gain = this.audioCtx.createGain();
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(320, now);
                    osc.frequency.exponentialRampToValueAtTime(200, now + 0.25);
                    gain.gain.setValueAtTime(0.25, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                    osc.connect(gain);
                    gain.connect(this.audioCtx.destination);
                    osc.start(now);
                    osc.stop(now + 0.25);
                    break;
                }
                case 'envelope': {
                    // Crisp paper slide & flap unfold
                    const osc = this.audioCtx.createOscillator();
                    const gain = this.audioCtx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(440, now);
                    osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
                    gain.gain.setValueAtTime(0.15, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                    osc.connect(gain);
                    gain.connect(this.audioCtx.destination);
                    osc.start(now);
                    osc.stop(now + 0.2);
                    break;
                }
                case 'sticker': {
                    // Satisfying high-pitched bubble pop
                    const osc = this.audioCtx.createOscillator();
                    const gain = this.audioCtx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(400, now);
                    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);
                    gain.gain.setValueAtTime(0.25, now);
                    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                    osc.connect(gain);
                    gain.connect(this.audioCtx.destination);
                    osc.start(now);
                    osc.stop(now + 0.08);
                    break;
                }
                case 'chaos': {
                    // Energetic retro arpeggio burst
                    for (let i = 0; i < 12; i++) {
                        const t = now + (i * 0.05);
                        const osc = this.audioCtx.createOscillator();
                        const gain = this.audioCtx.createGain();
                        osc.type = i % 2 === 0 ? 'square' : 'sawtooth';
                        const randomPitch = 300 + (Math.random() * 800);
                        osc.frequency.setValueAtTime(randomPitch, t);
                        gain.gain.setValueAtTime(0.1, t);
                        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
                        osc.connect(gain);
                        gain.connect(this.audioCtx.destination);
                        osc.start(t);
                        osc.stop(t + 0.1);
                    }
                    break;
                }
            }
        } catch (e) {
            // Audio context silently handled
        }
    }
}

// Global sounds instance
window.soundManager = new SoundManager();

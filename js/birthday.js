/**
 * birthday.js - Interactive Candle Blowing Ceremony & Continuous Floating Photo Atmosphere
 * 
 * Major Fixes & Upgrades:
 * - Direct interactive candle blowing:
 *   - Prominent "💨 Blow out the candles!" button.
 *   - Tapping/clicking anywhere on the cake or candles triggers the blow action.
 * - Polished Candle-Blowing Animation:
 *   - Flame flickers and leans away from airflow.
 *   - Flame smoothly shrinks down with amber glow reduction.
 *   - Delicate smoke wisp curls and rises upward.
 *   - Soft blow sound effect for each candle.
 *   - Live counter badge ("3 candles lit" -> "2" -> "1" -> "All blown out!").
 * - Automatic smooth transition to grand reveal immediately after final candle is extinguished.
 * - Centered Cake Ceremony Scene horizontally and vertically in available viewport.
 * - Continuous organic floating photo atmosphere with 8x dense multi-wave confetti engine.
 * - Clean lifecycle hooks (`onEnter`, `onLeave`) and explicit replay button.
 */
 
// ==========================================
// 📸 BIRTHDAY PHOTOS CONFIGURATION
// ==========================================
const BIRTHDAY_PHOTOS_CONFIG = [
    {
        id: "birthday-solo-01",
        title: "The Iconic Solo",
        category: "solo",
        src: "assets/images/photo1.jpeg",
        placeholder: "assets/images/photo1.jpeg",
        baseRotation: -7,
        floatDuration: "8.8s",
        orbitVariant: "float-orbit-1",
        tapePosition: "top-center",
        posDesktop: { top: "5%", left: "2%" }
    },
    {
        id: "birthday-solo-02",
        title: "Pure Sunshine",
        category: "solo",
        src: "assets/images/photo2.jpeg",
        placeholder: "assets/images/photo2.jpeg",
        baseRotation: 6,
        floatDuration: "11.4s",
        orbitVariant: "float-orbit-2",
        tapePosition: "top-right",
        posDesktop: { top: "6%", right: "1.5%" }
    },
    {
        id: "birthday-together-01",
        title: "Partners in Crime",
        category: "together",
        src: "assets/images/photo10.jpeg",
        placeholder: "assets/images/photo10.jpeg",
        baseRotation: -4,
        floatDuration: "9.8s",
        orbitVariant: "float-orbit-3",
        tapePosition: "top-left",
        posDesktop: { top: "44%", left: "1%" }
    },
    {
        id: "birthday-together-02",
        title: "Always Us",
        category: "together",
        src: "assets/images/photo4.jpeg",
        placeholder: "assets/images/photo4.jpeg",
        baseRotation: 7,
        floatDuration: "12.2s",
        orbitVariant: "float-orbit-4",
        tapePosition: "top-right",
        posDesktop: { top: "42%", right: "1%" }
    },
    {
        id: "birthday-group-01",
        title: "The Whole Gang",
        category: "group",
        src: "assets/images/photo3.jpeg",
        placeholder: "assets/images/photo3.jpeg",
        baseRotation: -6,
        floatDuration: "8.2s",
        orbitVariant: "float-orbit-5",
        tapePosition: "top-center",
        posDesktop: { top: "78%", left: "2.5%" }
    },
    {
        id: "birthday-group-02",
        title: "Unforgettable Days",
        category: "group",
        src: "assets/images/photo11.jpeg",
        placeholder: "assets/images/photo11.jpeg",
        baseRotation: 5,
        floatDuration: "10.6s",
        orbitVariant: "float-orbit-6",
        tapePosition: "top-right",
        posDesktop: { top: "76%", right: "2%" }
    }
];

class BirthdayCelebration {
    constructor() {
        this.sequenceCompleted = false;
        this.isBlowing = false;
        this.candlesRemaining = 3;
        this.activeTimers = [];
        this.confettiCanvas = null;
        this.confettiCtx = null;
        this.particles = [];
        this.particlePool = [];
        this.animFrameId = null;
        this.ambientSpawnInterval = null;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.confettiCanvas = document.getElementById('confetti-canvas');
            if (this.confettiCanvas) {
                this.confettiCtx = this.confettiCanvas.getContext('2d');
                this.resizeCanvas();
                window.addEventListener('resize', () => this.resizeCanvas());
            }

            this.renderPhotoSlots();
            this.setupInteractiveControls();
        });
    }

    setupInteractiveControls() {
        const blowBtn = document.getElementById('blow-candles-btn');
        const cakeContainer = document.getElementById('birthday-cake-container');
        const replayBtn = document.getElementById('replay-cake-btn');

        // 1. Explicit "Blow out the candles" Button
        if (blowBtn) {
            blowBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.blowOutCandlesSequentially();
            });
        }

        // 2. Direct Tap / Click on the Cake Container or Candles
        if (cakeContainer) {
            cakeContainer.addEventListener('click', () => {
                this.blowOutCandlesSequentially();
            });
        }

        // 3. Individual Candle Taps
        ['candle-1', 'candle-2', 'candle-3'].forEach(id => {
            const candleEl = document.getElementById(id);
            if (candleEl) {
                candleEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.blowOutCandlesSequentially();
                });
            }
        });

        // 4. Replay Celebration Button
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                this.replaySequence();
            });
        }
    }

    startSequence() {
        if (!this.sequenceCompleted && this.candlesRemaining === 3) {
            const ceremonyScene = document.getElementById('cake-ceremony-scene');
            if (ceremonyScene) {
                ceremonyScene.style.display = 'flex';
            }
        }
    }

    onEnter() {
        if (this.sequenceCompleted) {
            const revealScene = document.getElementById('birthday-reveal-scene');
            const ceremonyScene = document.getElementById('cake-ceremony-scene');
            if (revealScene) revealScene.style.display = 'block';
            if (ceremonyScene) ceremonyScene.style.display = 'none';
        }
    }

    onLeave() {
        this.stopConfetti();
    }

    resizeCanvas() {
        if (!this.confettiCanvas) return;
        this.confettiCanvas.width = window.innerWidth;
        this.confettiCanvas.height = window.innerHeight;
    }

    renderPhotoSlots() {
        const container = document.getElementById('birthday-photo-collage');
        if (!container) return;
        container.innerHTML = '';

        BIRTHDAY_PHOTOS_CONFIG.forEach((photo, index) => {
            // Outer positioning slot wrapper (places photo in coordinate space)
            const slot = document.createElement('div');
            slot.className = `floating-polaroid-slot slot-${photo.category}`;
            slot.id = `slot-${photo.id}`;

            // Position outer slot organically in surrounding atmosphere
            if (photo.posDesktop) {
                if (photo.posDesktop.top) slot.style.top = photo.posDesktop.top;
                if (photo.posDesktop.left) slot.style.left = photo.posDesktop.left;
                if (photo.posDesktop.right) slot.style.right = photo.posDesktop.right;
                if (photo.posDesktop.bottom) slot.style.bottom = photo.posDesktop.bottom;
            }

            // Inner drifting card (executes continuous 3D floating keyframes)
            const card = document.createElement('div');
            card.className = `floating-birthday-polaroid ${photo.orbitVariant} ${photo.category}`;
            card.id = photo.id;
            card.style.setProperty('--base-rotation', `${photo.baseRotation}deg`);
            card.style.setProperty('--float-duration', photo.floatDuration);
            card.style.animationDuration = photo.floatDuration;
            card.style.animationDelay = `-${(index * 1.7) % 8}s`;

            // Washi tape decorator
            const tape = document.createElement('div');
            tape.className = `washi-tape ${photo.tapePosition}`;

            // Image element with fallback
            const img = document.createElement('img');
            img.src = photo.src;
            img.alt = photo.title;
            img.loading = "lazy";
            img.onerror = () => {
                img.src = photo.placeholder;
            };

            // Handwritten caption
            const caption = document.createElement('div');
            caption.className = 'polaroid-caption';
            caption.textContent = photo.title;

            card.appendChild(tape);
            card.appendChild(img);
            card.appendChild(caption);
            slot.appendChild(card);
            container.appendChild(slot);
        });
    }

    /**
     * Executes the polished sequential candle blowout animation
     */
    blowOutCandlesSequentially() {
        if (this.isBlowing || this.candlesRemaining === 0) return;
        this.isBlowing = true;

        const blowBtn = document.getElementById('blow-candles-btn');
        const countBadge = document.getElementById('candle-count-indicator');

        if (blowBtn) {
            blowBtn.disabled = true;
            blowBtn.innerHTML = '💨 Blowing... ✨';
            blowBtn.classList.add('blowing-active');
        }

        // Extinguish Candle 1
        this.extinguishSingleCandle(1, () => {
            this.candlesRemaining = 2;
            if (countBadge) countBadge.textContent = '2 candles lit';

            // Extinguish Candle 2 after 450ms
            this.addTimer(() => {
                this.extinguishSingleCandle(2, () => {
                    this.candlesRemaining = 1;
                    if (countBadge) countBadge.textContent = '1 candle lit';

                    // Extinguish Candle 3 after 450ms
                    this.addTimer(() => {
                        this.extinguishSingleCandle(3, () => {
                            this.candlesRemaining = 0;
                            if (countBadge) countBadge.textContent = 'All candles blown out! 🎂✨';

                            // AUTOMATIC TRANSITION to Grand Reveal Scene after 650ms
                            this.addTimer(() => {
                                this.transitionToGrandReveal();
                            }, 650);
                        });
                    }, 450);
                });
            }, 450);
        });
    }

    extinguishSingleCandle(candleNum, onComplete) {
        const flame = document.getElementById(`candle-flame-${candleNum}`);
        const smoke = document.getElementById(`candle-smoke-${candleNum}`);

        if (flame) {
            // 1. React to airflow: bend away
            flame.classList.add('blowing-bend');
            window.soundManager.play('blow');

            // 2. Smoothly shrink & extinguish with ember glow
            this.addTimer(() => {
                flame.classList.remove('blowing-bend');
                flame.classList.add('extinguishing-smooth');

                // 3. Delicate smoke wisp rises and curls upward
                if (smoke) {
                    smoke.classList.add('smoke-rising');
                }

                this.addTimer(() => {
                    flame.classList.add('extinguished');
                    if (typeof onComplete === 'function') {
                        onComplete();
                    }
                }, 320);
            }, 180);
        } else if (typeof onComplete === 'function') {
            onComplete();
        }
    }

    /**
     * Smoothly transitions from the centered candle ceremony to the grand reveal scene
     */
    transitionToGrandReveal() {
        const ceremonyScene = document.getElementById('cake-ceremony-scene');
        const revealScene = document.getElementById('birthday-reveal-scene');
        const greetingSection = document.getElementById('birthday-greeting-card');
        const collageSection = document.getElementById('birthday-photo-collage');

        // Play celebration audio
        window.soundManager.play('confetti');

        // Smooth transition between scenes
        if (ceremonyScene) {
            ceremonyScene.classList.add('fade-out');
            this.addTimer(() => {
                ceremonyScene.style.display = 'none';
                ceremonyScene.classList.remove('fade-out');

                if (revealScene) {
                    revealScene.style.display = 'block';
                    revealScene.classList.add('fade-in');
                }

                // 8x Multi-Wave Confetti Explosion
                this.triggerMultiWaveConfetti();

                // Reveal greeting banner with spring pop-in
                if (greetingSection) {
                    greetingSection.classList.add('visible', 'pop-in');
                }

                // Activate continuous organic floating Polaroids
                if (collageSection) {
                    collageSection.classList.add('visible', 'floating-active');
                }

                // Reveal scrapbook navigation bar
                this.revealNavigation();

                this.sequenceCompleted = true;
                this.isBlowing = false;
            }, 400);
        }
    }

    replaySequence() {
        if (this.isBlowing) return;
        this.clearAllTimers();
        this.stopConfetti();

        const ceremonyScene = document.getElementById('cake-ceremony-scene');
        const revealScene = document.getElementById('birthday-reveal-scene');
        const blowBtn = document.getElementById('blow-candles-btn');
        const countBadge = document.getElementById('candle-count-indicator');
        const greetingSection = document.getElementById('birthday-greeting-card');
        const collageSection = document.getElementById('birthday-photo-collage');

        // Hide reveal scene
        if (revealScene) {
            revealScene.style.display = 'none';
            revealScene.classList.remove('fade-in');
        }

        if (greetingSection) greetingSection.classList.remove('visible', 'pop-in');
        if (collageSection) collageSection.classList.remove('visible', 'floating-active');

        // Reset all candle flames and smoke wisps
        [1, 2, 3].forEach(num => {
            const flame = document.getElementById(`candle-flame-${num}`);
            const smoke = document.getElementById(`candle-smoke-${num}`);
            if (flame) {
                flame.setAttribute('class', 'candle-flame');
            }
            if (smoke) {
                smoke.setAttribute('class', 'candle-smoke');
            }
        });

        // Reset ceremony controls
        this.candlesRemaining = 3;
        this.isBlowing = false;
        this.sequenceCompleted = false;

        if (blowBtn) {
            blowBtn.disabled = false;
            blowBtn.innerHTML = '💨 Blow out the candles!';
            blowBtn.classList.remove('blowing-active');
        }

        if (countBadge) {
            countBadge.textContent = '3 candles lit';
        }

        // Show centered ceremony scene
        if (ceremonyScene) {
            ceremonyScene.style.display = 'flex';
            ceremonyScene.classList.add('fade-in');
        }

        window.soundManager.play('flip');
    }

    addTimer(fn, delay) {
        const id = setTimeout(fn, delay);
        this.activeTimers.push(id);
        return id;
    }

    clearAllTimers() {
        this.activeTimers.forEach(id => clearTimeout(id));
        this.activeTimers = [];
        if (this.ambientSpawnInterval) {
            clearInterval(this.ambientSpawnInterval);
            this.ambientSpawnInterval = null;
        }
    }

    revealNavigation() {
        const nav = document.getElementById('scrapbook-navbar');
        if (nav) {
            nav.classList.add('navbar-revealed', 'fade-in');
        }
    }

    // ==========================================
    // 🎆 25X DENSE MULTI-WAVE CONFETTI SYSTEM
    // ==========================================
    triggerMultiWaveConfetti() {
        if (!this.confettiCanvas || !this.confettiCtx) return;

        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReducedMotion) {
            // Calm alternative for reduced-motion
            this.spawnConfettiBurst(window.innerWidth / 2, -20, 50, { speed: 3, gravity: 0.1 });
            return;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Wave 1: Central Celebratory Explosion (Blowout moment)
        this.spawnConfettiBurst(width / 2, height * 0.45, 650, {
            speed: 22,
            spread: 360,
            gravity: 0.32
        });

        // Wave 2: Dual High-Powered Bottom Cannons
        this.addTimer(() => {
            // Lower-Left Cannon shooting upward-right
            this.spawnConfettiBurst(60, height - 50, 420, {
                speed: 30,
                angle: -50,
                spread: 55,
                gravity: 0.28
            });
            // Lower-Right Cannon shooting upward-left
            this.spawnConfettiBurst(width - 60, height - 50, 420, {
                speed: 30,
                angle: -130,
                spread: 55,
                gravity: 0.28
            });
        }, 220);

        // Wave 3: High-Altitude Ceiling Drop across Entire Screen Width
        this.addTimer(() => {
            for (let i = 0; i < 480; i++) {
                this.particles.push(this.createParticle(
                    Math.random() * width,
                    -30 - Math.random() * 120,
                    (Math.random() - 0.5) * 6,
                    Math.random() * 5 + 2.5,
                    0.24
                ));
            }
        }, 480);

        // Wave 4: Mid-Height Lateral Inward Blasts (Stars, Hearts, & Ribbons)
        this.addTimer(() => {
            this.spawnConfettiBurst(0, height * 0.42, 280, {
                speed: 24,
                angle: -18,
                spread: 45,
                gravity: 0.26,
                shapeOverride: ['star', 'heart', 'ribbon', 'streamer']
            });
            this.spawnConfettiBurst(width, height * 0.42, 280, {
                speed: 24,
                angle: -162,
                spread: 45,
                gravity: 0.26,
                shapeOverride: ['star', 'heart', 'ribbon', 'streamer']
            });
        }, 750);

        // Wave 5: Follow-up Central Fireworks Climax
        this.addTimer(() => {
            this.spawnConfettiBurst(width / 2, height * 0.3, 300, {
                speed: 16,
                spread: 360,
                gravity: 0.25,
                shapeOverride: ['star', 'circle', 'streamer']
            });
        }, 1200);

        // Wave 6: Dense Continuous Ambient Cascade Across the Viewport
        if (!this.ambientSpawnInterval) {
            this.ambientSpawnInterval = setInterval(() => {
                if (this.particles.length < 2200) {
                    const spawnCount = window.innerWidth < 768 ? 16 : 28;
                    for (let i = 0; i < spawnCount; i++) {
                        // Alternate between top drop and side drift
                        const fromSide = Math.random() < 0.25;
                        const spawnX = fromSide 
                            ? (Math.random() < 0.5 ? -10 : width + 10) 
                            : Math.random() * width;
                        const spawnY = fromSide ? Math.random() * (height * 0.6) : -20;
                        const vx = fromSide 
                            ? (spawnX < 0 ? Math.random() * 4 + 1 : -Math.random() * 4 - 1)
                            : (Math.random() - 0.5) * 3.5;

                        this.particles.push(this.createParticle(
                            spawnX,
                            spawnY,
                            vx,
                            Math.random() * 3.5 + 1.8,
                            0.20
                        ));
                    }
                }
            }, 100);
        }

        if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
        this.animateConfetti();
    }

    spawnConfettiBurst(originX, originY, count, opts = {}) {
        const speed = opts.speed || 18;
        const spread = (opts.spread || 360) * (Math.PI / 180);
        const baseAngle = ((opts.angle || 0) - 90) * (Math.PI / 180);
        const gravity = opts.gravity || 0.32;

        for (let i = 0; i < count; i++) {
            const angle = baseAngle + (Math.random() - 0.5) * spread;
            const velocity = (Math.random() * 0.75 + 0.25) * speed;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            this.particles.push(this.createParticle(originX, originY, vx, vy, gravity, opts.shapeOverride));
        }
    }

    createParticle(x, y, vx, vy, gravity, shapeOverride = null) {
        const colors = [
            '#A8C9F0', '#6D96CC', '#34557F', '#DCEBFA', 
            '#FCE38A', '#F8F5F0', '#FFFFFF', '#E3B337', 
            '#B8CBE8', '#EADBC8', '#F7D6D0', '#7CA5D8'
        ];
        const shapes = shapeOverride || ['rectangle', 'square', 'ribbon', 'star', 'heart', 'circle', 'streamer'];
        
        let p = this.particlePool.pop();
        if (!p) {
            p = {};
        }

        p.x = x;
        p.y = y;
        p.vx = vx;
        p.vy = vy;
        p.gravity = gravity;
        p.size = Math.random() * 7 + 5;
        p.color = colors[Math.floor(Math.random() * colors.length)];
        p.shape = shapes[Math.floor(Math.random() * shapes.length)];
        p.rotation = Math.random() * 360;
        p.rotationSpeed = (Math.random() - 0.5) * 10;
        p.wobble = Math.random() * 10;
        p.wobbleSpeed = Math.random() * 0.12 + 0.06;
        p.ribbonPhase = Math.random() * Math.PI;
        p.opacity = 1;
        p.decay = Math.random() * 0.0022 + 0.001;
        p.streamerHistory = p.shape === 'streamer' ? [] : null;

        return p;
    }

    animateConfetti() {
        if (!this.confettiCtx || !this.confettiCanvas) return;
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

        let activeCount = 0;
        const ctx = this.confettiCtx;
        const width = this.confettiCanvas.width;
        const height = this.confettiCanvas.height;

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            if (p.opacity > 0.02 && p.y < height + 60 && p.x > -60 && p.x < width + 60) {
                activeCount++;
                p.x += p.vx + Math.sin(p.wobble) * 0.9;
                p.y += p.vy;
                p.vy += p.gravity;
                p.vx *= 0.988;
                p.rotation += p.rotationSpeed;
                p.wobble += p.wobbleSpeed;
                p.ribbonPhase += 0.12;
                p.opacity -= p.decay;

                if (p.streamerHistory) {
                    p.streamerHistory.unshift({ x: p.x, y: p.y });
                    if (p.streamerHistory.length > 5) p.streamerHistory.pop();
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = p.color;
                ctx.strokeStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.opacity);

                if (p.shape === 'rectangle') {
                    const flipScale = Math.cos(p.ribbonPhase);
                    ctx.fillRect(-p.size / 2, (-p.size * 0.4) * flipScale, p.size, (p.size * 0.8) * Math.abs(flipScale));
                } else if (p.shape === 'square') {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                } else if (p.shape === 'circle') {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2.2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.shape === 'ribbon') {
                    const ribbonWidth = Math.sin(p.ribbonPhase) * p.size;
                    ctx.fillRect(-ribbonWidth / 2, -p.size * 1.6, ribbonWidth, p.size * 3.2);
                } else if (p.shape === 'star') {
                    this.drawStar(ctx, 0, 0, 5, p.size * 0.85, p.size * 0.4);
                } else if (p.shape === 'heart') {
                    this.drawHeart(ctx, 0, 0, p.size * 0.85);
                } else if (p.shape === 'streamer') {
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.quadraticCurveTo(Math.sin(p.ribbonPhase) * 12, -p.size * 1.5, 0, -p.size * 3);
                    ctx.stroke();
                }

                ctx.restore();
            } else {
                // Recycle particle into pool
                const recycled = this.particles.splice(i, 1)[0];
                if (this.particlePool.length < 500) {
                    this.particlePool.push(recycled);
                }
            }
        }

        if (activeCount > 0) {
            this.animFrameId = requestAnimationFrame(() => this.animateConfetti());
        }
    }

    drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
        let rot = (Math.PI / 2) * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }

    drawHeart(ctx, x, y, size) {
        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + (size + topCurveHeight) / 1.4, x, y + size);
        ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 1.4, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
        ctx.closePath();
        ctx.fill();
    }

    stopConfetti() {
        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }
        if (this.ambientSpawnInterval) {
            clearInterval(this.ambientSpawnInterval);
            this.ambientSpawnInterval = null;
        }
        this.particles = [];
        if (this.confettiCtx && this.confettiCanvas) {
            this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
        }
    }

    // ==========================================
    // 🚪 VIEW LIFECYCLE HOOKS
    // ==========================================
    onEnter() {
        const ceremonyScene = document.getElementById('cake-ceremony-scene');
        const revealScene = document.getElementById('birthday-reveal-scene');
        const greetingSection = document.getElementById('birthday-greeting-card');
        const collageSection = document.getElementById('birthday-photo-collage');

        if (this.sequenceCompleted) {
            // Already revealed: show reveal scene and resume floating photos
            if (ceremonyScene) ceremonyScene.style.display = 'none';
            if (revealScene) revealScene.style.display = 'block';
            if (greetingSection) greetingSection.classList.add('visible');
            if (collageSection) collageSection.classList.add('visible', 'floating-active');
        } else {
            // Not revealed yet: show centered ceremony scene ready for blowing
            if (ceremonyScene) {
                ceremonyScene.style.display = 'flex';
            }
            if (revealScene) {
                revealScene.style.display = 'none';
            }
        }
    }

    onLeave() {
        this.clearAllTimers();
        this.stopConfetti();
        this.isBlowing = false;
    }
}

window.birthdayCelebration = new BirthdayCelebration();

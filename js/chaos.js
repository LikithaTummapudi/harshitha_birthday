/**
 * chaos.js - Stage 8: High-Energy Chaos Sequence & Centered Blurred Finale
 * 
 * Major Redesign Features:
 * - 6-Second Multi-Wave Chaotic Frenzy:
 *   - Multi-directional confetti cannons.
 *   - Flying paper scraps, bows, hearts, and stars.
 *   - Rapid Polaroid wobbling & spinning.
 *   - Controlled camera shake & screen tilt.
 *   - Bouncing oversized nickname banners ("DEMOGORGAN!", "HACHIGA!", "BULUGU!!").
 *   - Surprise pop-up alert badges.
 * - Instant Abrupt Halt at 6.00s:
 *   - All timers and temporary elements cleared.
 *   - Audio halted.
 * - Centered Blurred Final Reveal Overlay:
 *   - Smooth Gaussian blur applied to background scrapbook.
 *   - Translucent darkened backdrop.
 *   - Centered cream paper scrap in the exact center of the viewport.
 *   - Warm, quiet fade-in of final message:
 *     "I love you, that's all."
 *     "Tata, byee! ♡"
 *     "— your bestie 💙"
 */

// ==========================================
// 💥 FINAL CHAOS MESSAGE CONFIGURATION
// ==========================================
const FINAL_FINALE_MESSAGE = {
    line1: "I love you, that's all.",
    line2: "Tata, byee! ♡",
    signature: "— your bestie 💙"
};

class ChaosExperience {
    constructor() {
        this.isChaosActive = false;
        this.chaosFinished = false;
        this.activeTimers = [];
        this.spawnIntervals = [];
        this.temporaryElements = [];
        this.nicknames = ["DEMOGORGAN! 😈", "HACHIGA! 💨", "BULUGU!! ✨", "DEMOGORGAN!", "HACHIGA!", "BULUGU!!"];
        this.surpriseBadges = [
            "⚠️ UNHINGED BESTIE ALERT ⚠️",
            "CHAOS OVERLOAD 💥",
            "FUTURE KIDS ARE JUDGING US 📹",
            "SYSTEM MELTDOWN: TOO MUCH SILLINESS 🚨"
        ];
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const chaosBtn = document.getElementById('chaos-trigger-btn');
            const closeFinaleBtn = document.getElementById('close-finale-overlay-btn');

            if (chaosBtn) {
                chaosBtn.addEventListener('click', () => this.triggerChaos());
            }

            if (closeFinaleBtn) {
                closeFinaleBtn.addEventListener('click', () => {
                    this.dismissFinaleOverlay();
                });
            }
        });
    }

    addTimer(fn, delay) {
        const id = setTimeout(fn, delay);
        this.activeTimers.push(id);
        return id;
    }

    triggerChaos() {
        if (this.isChaosActive || this.chaosFinished) return;
        this.isChaosActive = true;

        const chaosBtn = document.getElementById('chaos-trigger-btn');
        if (chaosBtn) {
            chaosBtn.disabled = true;
            chaosBtn.classList.add('chaos-pressed');
        }

        // Play initial chaos sound
        window.soundManager.play('chaos');

        const mainContainer = document.querySelector('.scrapbook-app-container') || document.body;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // 1. Initial Shockwave: Camera Shake & Screen Tilt
        if (!prefersReducedMotion) {
            mainContainer.classList.add('chaos-screen-shake');
            document.querySelectorAll('.scrapbook-polaroid-item, .scrapbook-memory-cluster').forEach(el => {
                el.classList.add('chaos-polaroid-spin');
            });
        }

        // 2. Multi-Directional Confetti Cannon Bursts
        if (window.birthdayCelebration) {
            window.birthdayCelebration.triggerMultiWaveConfetti();
        }

        // 3. Escalating Spawn Wave (Nicknames, Flying Paper, Emojis)
        if (!prefersReducedMotion) {
            const burstInterval = setInterval(() => {
                if (this.isChaosActive) {
                    this.spawnFlyingItem();
                    this.spawnFlyingPaperScrap();
                }
            }, 180);
            this.spawnIntervals.push(burstInterval);

            // Staggered Bouncing Nickname Banners
            const nicknameInterval = setInterval(() => {
                if (this.isChaosActive) {
                    this.spawnNicknameBanner();
                }
            }, 450);
            this.spawnIntervals.push(nicknameInterval);

            // Surprise visual interruption alerts
            this.addTimer(() => {
                if (this.isChaosActive) {
                    this.spawnSurpriseAlert();
                    window.soundManager.play('chaos');
                }
            }, 1800);

            this.addTimer(() => {
                if (this.isChaosActive) {
                    this.spawnSurpriseAlert();
                    if (window.birthdayCelebration) {
                        window.birthdayCelebration.triggerMultiWaveConfetti();
                    }
                }
            }, 3600);
        }

        // 4. EXACTLY 6.00 SECONDS: Sudden Quiet Halt & Centered Finale Reveal!
        this.addTimer(() => {
            this.endChaosAndShowCenteredFinale();
        }, 6000);
    }

    spawnNicknameBanner() {
        const text = this.nicknames[Math.floor(Math.random() * this.nicknames.length)];
        const badge = document.createElement('div');
        badge.className = 'chaos-nickname-badge pop-in';
        badge.textContent = text;
        
        // Random viewport coordinates
        const x = Math.random() * (window.innerWidth - 220) + 20;
        const y = Math.random() * (window.innerHeight - 120) + 40;
        const rot = Math.random() * 40 - 20;
        
        badge.style.left = `${x}px`;
        badge.style.top = `${y}px`;
        badge.style.setProperty('--badge-rot', `${rot}deg`);

        document.body.appendChild(badge);
        this.temporaryElements.push(badge);
    }

    spawnSurpriseAlert() {
        const text = this.surpriseBadges[Math.floor(Math.random() * this.surpriseBadges.length)];
        const alertBox = document.createElement('div');
        alertBox.className = 'chaos-surprise-alert pop-in';
        alertBox.textContent = text;
        alertBox.style.left = '50%';
        alertBox.style.top = `${Math.random() * 40 + 20}%`;
        alertBox.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 10 - 5}deg)`;

        document.body.appendChild(alertBox);
        this.temporaryElements.push(alertBox);
    }

    spawnFlyingItem() {
        const items = ['💙', '✨', '⭐', '🎈', '🎉', '💫', '🌸', '🧸', '🎀', '💌'];
        const emoji = document.createElement('div');
        emoji.className = 'chaos-flying-item';
        emoji.textContent = items[Math.floor(Math.random() * items.length)];
        emoji.style.left = `${Math.random() * window.innerWidth}px`;
        emoji.style.top = `${Math.random() * window.innerHeight}px`;
        emoji.style.fontSize = `${Math.random() * 32 + 24}px`;

        document.body.appendChild(emoji);
        this.temporaryElements.push(emoji);
    }

    spawnFlyingPaperScrap() {
        const scrap = document.createElement('div');
        scrap.className = 'chaos-flying-paper-scrap';
        scrap.style.left = `${Math.random() * window.innerWidth}px`;
        scrap.style.top = `${Math.random() * window.innerHeight}px`;
        scrap.style.setProperty('--swirl-rot', `${Math.random() * 720 - 360}deg`);

        document.body.appendChild(scrap);
        this.temporaryElements.push(scrap);
    }

    stopChaos() {
        this.isChaosActive = false;

        // Clear all timers and intervals
        this.activeTimers.forEach(id => clearTimeout(id));
        this.activeTimers = [];
        this.spawnIntervals.forEach(id => clearInterval(id));
        this.spawnIntervals = [];

        // Remove temporary elements
        this.temporaryElements.forEach(el => el.remove());
        this.temporaryElements = [];

        // Remove screen shake and polaroid wobble
        const mainContainer = document.querySelector('.scrapbook-app-container') || document.body;
        mainContainer.classList.remove('chaos-screen-shake');

        document.querySelectorAll('.scrapbook-polaroid-item, .scrapbook-memory-cluster').forEach(el => {
            el.classList.remove('chaos-polaroid-spin');
        });

        if (window.birthdayCelebration) {
            window.birthdayCelebration.stopConfetti();
        }
    }

    endChaosAndShowCenteredFinale() {
        // Complete halt
        this.stopChaos();
        this.chaosFinished = true;

        // Apply smooth blur to underlying scrapbook background
        const stageScrapbook = document.getElementById('stage-scrapbook');
        if (stageScrapbook) {
            stageScrapbook.classList.add('scrapbook-blurred-background');
        }

        // Reveal the Dedicated Centered Final Reveal Overlay
        const overlay = document.getElementById('finale-centered-overlay');
        const msgLine1 = document.getElementById('finale-msg-line1');
        const msgLine2 = document.getElementById('finale-msg-line2');
        const msgSign = document.getElementById('finale-msg-sign');

        if (msgLine1) msgLine1.textContent = FINAL_FINALE_MESSAGE.line1;
        if (msgLine2) msgLine2.textContent = FINAL_FINALE_MESSAGE.line2;
        if (msgSign) msgSign.textContent = FINAL_FINALE_MESSAGE.signature;

        if (overlay) {
            overlay.style.display = 'flex';
            void overlay.offsetWidth; // trigger reflow
            overlay.classList.add('overlay-active', 'fade-in');
        }
    }

    dismissFinaleOverlay() {
        const overlay = document.getElementById('finale-centered-overlay');
        const stageScrapbook = document.getElementById('stage-scrapbook');

        if (overlay) {
            overlay.classList.remove('overlay-active');
            overlay.style.display = 'none';
        }

        if (stageScrapbook) {
            stageScrapbook.classList.remove('scrapbook-blurred-background');
        }
    }
}

window.chaosExperience = new ChaosExperience();

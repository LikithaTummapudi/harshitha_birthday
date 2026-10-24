/**
 * password.js - Stage 1 (Secret Password Entrance) & Stage 2 (Suspense Screen)
 * 
 * Password: 2510
 * Handles playful feedback, enter key, show/hide password, and clean navigation to suspense & birthday views.
 */

class PasswordGate {
    constructor() {
        this.SECRET_PASS = "2510";
        this.isTransitioning = false;
        this.playfulErrors = [
            "Nope, try again, detective! 🔍",
            "Think harder, Demogorgan! 🧐",
            "Wrong code, Hachiga! Try again! 💭",
            "Not quite, Bulugu! Give it another shot ✨",
            "Are you sure you know your bestie's secrets? 😭"
        ];
        this.errorIndex = 0;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            const passInput = document.getElementById('pass-input');
            const unlockBtn = document.getElementById('unlock-btn');
            const toggleEyeBtn = document.getElementById('toggle-password-visibility');
            const suspenseBtn = document.getElementById('suspense-btn');

            if (passInput) {
                passInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        this.validatePassword();
                    }
                });
            }

            if (unlockBtn) {
                unlockBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.validatePassword();
                });
            }

            if (toggleEyeBtn && passInput) {
                toggleEyeBtn.addEventListener('click', () => {
                    const isPass = passInput.getAttribute('type') === 'password';
                    passInput.setAttribute('type', isPass ? 'text' : 'password');
                    toggleEyeBtn.textContent = isPass ? '🙈' : '👁️';
                    toggleEyeBtn.setAttribute('aria-label', isPass ? 'Hide password' : 'Show password');
                });
            }

            if (suspenseBtn) {
                suspenseBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.proceedToCakeReveal();
                });
            }
        });
    }

    validatePassword() {
        if (this.isTransitioning) return;

        const passInput = document.getElementById('pass-input');
        const feedbackEl = document.getElementById('password-feedback');
        const lockCard = document.getElementById('password-card');

        if (!passInput || !feedbackEl) return;

        const val = passInput.value.trim();

        if (val === this.SECRET_PASS) {
            this.isTransitioning = true;
            window.soundManager.play('correct');
            feedbackEl.textContent = "Access Granted! Opening diary... ♡";
            feedbackEl.className = "diary-feedback success";
            
            if (lockCard) {
                lockCard.classList.add('unlocked-anim');
            }

            setTimeout(() => {
                this.showSuspenseScreen();
                this.isTransitioning = false;
            }, 1000);
        } else {
            window.soundManager.play('retry');
            const errorMsg = this.playfulErrors[this.errorIndex % this.playfulErrors.length];
            this.errorIndex++;
            feedbackEl.textContent = errorMsg;
            feedbackEl.className = "diary-feedback error shake-anim";

            // Temporary shake effect
            if (lockCard) {
                lockCard.classList.remove('shake-anim');
                void lockCard.offsetWidth; // trigger reflow
                lockCard.classList.add('shake-anim');
            }

            passInput.focus();
            passInput.select();
        }
    }

    showSuspenseScreen() {
        if (window.mainApp) {
            window.mainApp.navigateTo('stage-suspense');
        }
    }

    proceedToCakeReveal() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        window.soundManager.play('click');

        if (window.mainApp) {
            window.mainApp.navigateTo('stage-birthday');
        }

        setTimeout(() => {
            this.isTransitioning = false;
            if (window.birthdayCelebration) {
                window.birthdayCelebration.startSequence();
            }
        }, 300);
    }
}

window.passwordGate = new PasswordGate();

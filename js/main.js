/**
 * main.js - Core Application Orchestrator & Strict View Lifecycle Manager
 * 
 * Provides:
 * - Real view separation: guarantees only ONE view is visible at any time.
 * - Explicit lifecycle hooks: `onEnter()` and `onLeave()` for each view.
 * - Birthday scene cleanup: terminates confetti loops & timers when navigating away.
 * - Letter gating: prevents access to letter until all 5 quiz questions are passed.
 * - Global navigation management.
 * - Testing helper: `resetBirthdayWebsite()`.
 */

class MainApp {
    constructor() {
        this.currentViewId = 'stage-entrance';
        this.isQuizPassed = false;
        this.isLetterUnlocked = false;
        
        // Registry of view lifecycle handlers
        this.viewHandlers = {};
        
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.registerDefaultHandlers();
            this.setupNavigation();
        });
    }

    registerViewHandler(viewId, handlers) {
        this.viewHandlers[viewId] = handlers;
    }

    registerDefaultHandlers() {
        // Birthday view lifecycle
        this.registerViewHandler('stage-birthday', {
            onEnter: () => {
                if (window.birthdayCelebration) {
                    window.birthdayCelebration.onEnter();
                }
            },
            onLeave: () => {
                if (window.birthdayCelebration) {
                    window.birthdayCelebration.onLeave();
                }
            }
        });

        // Scrapbook view lifecycle
        this.registerViewHandler('stage-scrapbook', {
            onEnter: () => {
                if (window.interactiveScrapbook) {
                    window.interactiveScrapbook.onEnter();
                }
            },
            onLeave: () => {
                if (window.chaosExperience) {
                    window.chaosExperience.stopChaos();
                }
                if (window.interactiveScrapbook) {
                    window.interactiveScrapbook.closeModal();
                }
            }
        });

        // Quiz view lifecycle
        this.registerViewHandler('stage-quiz', {
            onEnter: () => {},
            onLeave: () => {}
        });

        // Letter view lifecycle
        this.registerViewHandler('stage-letter', {
            onEnter: () => {
                if (window.secretLetter) {
                    window.secretLetter.onEnter();
                }
            },
            onLeave: () => {}
        });
    }

    checkExistingSession() {
        if (this.isQuizPassed) {
            this.unlockLetter();
        }
    }

    setupNavigation() {
        const navBirthday = document.getElementById('nav-item-birthday');
        const navQuiz = document.getElementById('nav-item-quiz');
        const navLetter = document.getElementById('nav-item-letter');
        const navScrapbook = document.getElementById('nav-item-scrapbook');

        if (navBirthday) {
            navBirthday.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo('stage-birthday');
            });
        }

        if (navQuiz) {
            navQuiz.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo('stage-quiz');
            });
        }

        if (navLetter) {
            navLetter.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo('stage-letter');
            });
        }

        if (navScrapbook) {
            navScrapbook.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo('stage-scrapbook');
            });
        }
    }

    /**
     * Strictly transitions from the current view to target view with cleanup
     */
    navigateTo(targetViewId) {
        if (this.currentViewId === targetViewId) return;

        // Security gate check for letter
        if (targetViewId === 'stage-letter' && !this.isQuizPassed) {
            alert("🔒 The secret letter is sealed! You must complete the 5-question Friendship Quiz first.");
            this.navigateTo('stage-quiz');
            return;
        }

        window.soundManager.play('flip');

        const currentEl = document.getElementById(this.currentViewId);
        const targetEl = document.getElementById(targetViewId);

        // 1. Call onLeave lifecycle hook on the outgoing view
        const oldHandler = this.viewHandlers[this.currentViewId];
        if (oldHandler && typeof oldHandler.onLeave === 'function') {
            oldHandler.onLeave();
        }

        // 2. Hide current view completely
        if (currentEl) {
            currentEl.classList.remove('active', 'fade-in');
            currentEl.style.display = 'none';
        }

        // 3. Show target view completely
        if (targetEl) {
            targetEl.style.display = 'block';
            // Trigger reflow for clean CSS transition
            void targetEl.offsetWidth;
            targetEl.classList.add('active', 'fade-in');
        }

        this.currentViewId = targetViewId;
        this.updateActiveNavTab(targetViewId);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 4. Call onEnter lifecycle hook on the incoming view
        const newHandler = this.viewHandlers[targetViewId];
        if (newHandler && typeof newHandler.onEnter === 'function') {
            newHandler.onEnter();
        }
    }

    updateActiveNavTab(viewId) {
        document.querySelectorAll('.scrapbook-nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        if (viewId === 'stage-birthday') {
            document.getElementById('nav-item-birthday')?.classList.add('active');
        } else if (viewId === 'stage-quiz') {
            document.getElementById('nav-item-quiz')?.classList.add('active');
        } else if (viewId === 'stage-letter') {
            document.getElementById('nav-item-letter')?.classList.add('active');
        } else if (viewId === 'stage-scrapbook') {
            document.getElementById('nav-item-scrapbook')?.classList.add('active');
        }
    }

    unlockLetter() {
        this.isLetterUnlocked = true;
        this.isQuizPassed = true;
        
        // Reveal Letter nav button if present
        const navLetter = document.getElementById('nav-item-letter');
        if (navLetter) {
            navLetter.style.display = 'flex';
        }

        // Enable button in quiz completed state
        const letterPrompt = document.getElementById('quiz-unlock-letter-btn');
        if (letterPrompt) {
            letterPrompt.style.display = 'inline-block';
        }
    }
}

window.mainApp = new MainApp();

/**
 * Developer & Testing Helper:
 * Run `resetBirthdayWebsite()` in the browser DevTools Console to test the full flow from scratch!
 */
window.resetBirthdayWebsite = function() {
    localStorage.removeItem('harshitha_quiz_passed');
    localStorage.removeItem('harshitha_quiz_step');
    localStorage.removeItem('harshitha_letter_unlocked');
    localStorage.removeItem('harshitha_sound_muted');
    alert("Website progress reset! Reloading page...");
    window.location.reload();
};

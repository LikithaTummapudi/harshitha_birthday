/**
 * quiz.js - Stage 5: Friendship Quiz ("Do You Really Know Me?")
 * 
 * Strict Requirements:
 * - Exactly 5 questions with verified questions and answers.
 * - One question at a time with visual progress bar.
 * - Wrong answers never reveal the correct answer and allow unlimited retries.
 * - Quiz must be 100% completed to unlock the secret letter.
 * - Progress is saved to localStorage.
 */

// ==========================================
// 📝 QUIZ QUESTIONS & ANSWERS CONFIGURATION
// ==========================================
const QUIZ_DATA = [
    {
        id: 1,
        question: "What's my favourite colour?",
        options: [
            "White",
            "Beige",
            "Black",
            "Lavender"
        ],
        correctAnswer: "White",
        correctFeedback: "YAYYY, you know me too well! White is always pure peace ♡",
        wrongFeedback: "NOPE, Demogorgan! Not that colour... Think again! 😭"
    },
    {
        id: 2,
        question: "What do I follow the most?",
        options: [
            "Go with the flow",
            "Delulu is the solulu",
            "Nothing is impossible",
            "You can do it"
        ],
        correctAnswer: "Go with the flow",
        correctFeedback: "Spot on, Hachiga! 'Go with the flow' is my ultimate life mantra 🌊",
        wrongFeedback: "Ahem... nice guess, but that's not what I live by! Try again! 🧐"
    },
    {
        id: 3,
        question: "How would you describe me?",
        options: [
            "Beautiful & kind",
            "Crazy & fun",
            "Talented & intelligent",
            "All of the above"
        ],
        correctAnswer: "All of the above",
        correctFeedback: "Awww, YES! Obviously all of the above! You're the sweetest bestie 🥺💙",
        wrongFeedback: "Why pick just one when you know it's everything?! Choose wisely, Bulugu! ✨"
    },
    {
        id: 4,
        question: "What will you do when you're sad?",
        options: [
            "Keep everything to yourself",
            "Distract yourself and pretend you're fine",
            "Wait for me to notice something is wrong",
            "Come to me"
        ],
        correctAnswer: "Come to me",
        correctFeedback: "Always, ALWAYS come to me! I'm always right here for you ♡",
        wrongFeedback: "Wrong answer! You never have to suffer alone or hide it from me. Pick the right one! 🫂"
    },
    {
        id: 5,
        question: "What is our goal?",
        options: [
            "Travel the world before settling down",
            "Start a business together",
            "Meet every weekend, no matter what",
            "To get a job in the same city and enjoy each and every moment together"
        ],
        correctAnswer: "To get a job in the same city and enjoy each and every moment together",
        correctFeedback: "YES!! To get a job in the same city and enjoy every single moment together! 🏙️🎉",
        wrongFeedback: "That would be nice, but you know our REAL master plan! Guess again! 😭"
    }
];

class FriendshipQuiz {
    constructor() {
        this.currentIndex = 0;
        this.selectedOption = null;
        this.isCompleted = false;

        // Clean session: remove persistent quiz progress on load while keeping sound preference
        try {
            localStorage.removeItem('harshitha_quiz_passed');
            localStorage.removeItem('harshitha_quiz_step');
            localStorage.removeItem('harshitha_letter_unlocked');
        } catch (e) {}

        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderQuestion();
            this.updateProgressBar();

            const checkBtn = document.getElementById('quiz-check-btn');
            const nextBtn = document.getElementById('quiz-next-btn');
            const unlockLetterBtn = document.getElementById('quiz-unlock-letter-btn');

            if (checkBtn) {
                checkBtn.addEventListener('click', () => this.checkAnswer());
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.goToNextQuestion());
            }

            if (unlockLetterBtn) {
                unlockLetterBtn.addEventListener('click', () => {
                    window.soundManager.play('click');
                    if (window.mainApp) {
                        window.mainApp.navigateTo('stage-letter');
                    }
                });
            }

            // If already completed in past session, show completion banner directly
            if (this.isCompleted) {
                this.showCompletionState();
            }
        });
    }

    renderQuestion() {
        const qData = QUIZ_DATA[this.currentIndex];
        const numLabel = document.getElementById('quiz-question-number');
        const textLabel = document.getElementById('quiz-question-text');
        const optionsList = document.getElementById('quiz-options-list');
        const feedbackBox = document.getElementById('quiz-feedback-box');
        const checkBtn = document.getElementById('quiz-check-btn');
        const nextBtn = document.getElementById('quiz-next-btn');

        if (!qData || !textLabel || !optionsList) return;

        // Reset UI controls
        this.selectedOption = null;
        if (checkBtn) {
            checkBtn.disabled = true;
            checkBtn.style.display = 'inline-block';
        }
        if (nextBtn) {
            nextBtn.style.display = 'none';
        }
        if (feedbackBox) {
            feedbackBox.className = 'quiz-feedback-box hidden';
            feedbackBox.textContent = '';
        }

        numLabel.textContent = `Question ${this.currentIndex + 1} of ${QUIZ_DATA.length}`;
        textLabel.textContent = qData.question;

        optionsList.innerHTML = '';
        qData.options.forEach((optText, i) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option-btn';
            btn.type = 'button';
            btn.innerHTML = `<span class="option-marker">${String.fromCharCode(65 + i)}</span> <span class="option-text">${optText}</span>`;
            
            btn.addEventListener('click', () => {
                window.soundManager.play('click');
                // Remove active from others
                optionsList.querySelectorAll('.quiz-option-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.selectedOption = optText;
                if (checkBtn) checkBtn.disabled = false;
            });

            optionsList.appendChild(btn);
        });

        this.updateProgressBar();
    }

    checkAnswer() {
        if (!this.selectedOption) return;

        const qData = QUIZ_DATA[this.currentIndex];
        const feedbackBox = document.getElementById('quiz-feedback-box');
        const checkBtn = document.getElementById('quiz-check-btn');
        const nextBtn = document.getElementById('quiz-next-btn');

        if (this.selectedOption === qData.correctAnswer) {
            // Correct Answer!
            window.soundManager.play('correct');
            feedbackBox.className = 'quiz-feedback-box success-msg pop-in';
            feedbackBox.textContent = qData.correctFeedback;

            if (checkBtn) checkBtn.style.display = 'none';

            // Check if this was the final question
            if (this.currentIndex === QUIZ_DATA.length - 1) {
                this.isCompleted = true;
                setTimeout(() => {
                    this.showCompletionState();
                }, 1000);
            } else {
                if (nextBtn) {
                    nextBtn.style.display = 'inline-block';
                    nextBtn.focus();
                }
            }
        } else {
            // Incorrect Answer!
            window.soundManager.play('retry');
            feedbackBox.className = 'quiz-feedback-box error-msg shake-anim';
            feedbackBox.textContent = qData.wrongFeedback;

            // Deselect and re-prompt retry
            this.selectedOption = null;
            if (checkBtn) checkBtn.disabled = true;
            const activeBtn = document.querySelector('.quiz-option-btn.selected');
            if (activeBtn) activeBtn.classList.remove('selected');
        }
    }

    goToNextQuestion() {
        if (this.currentIndex < QUIZ_DATA.length - 1) {
            this.currentIndex++;
            window.soundManager.play('flip');
            this.renderQuestion();
        }
    }

    updateProgressBar() {
        const bar = document.getElementById('quiz-progress-fill');
        if (bar) {
            const percentage = ((this.currentIndex + (this.isCompleted ? 1 : 0)) / QUIZ_DATA.length) * 100;
            bar.style.width = `${percentage}%`;
        }
    }

    showCompletionState() {
        const quizCard = document.getElementById('quiz-active-card');
        const completeCard = document.getElementById('quiz-completed-card');

        if (quizCard) quizCard.style.display = 'none';
        if (completeCard) {
            completeCard.style.display = 'block';
            completeCard.classList.add('pop-in');
        }

        // Trigger celebratory chime
        window.soundManager.play('confetti');

        // Unlock letter in app state and update nav
        if (window.mainApp) {
            window.mainApp.unlockLetter();
        }
    }
}

window.friendshipQuiz = new FriendshipQuiz();

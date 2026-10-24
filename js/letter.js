/**
 * letter.js - Stage 6: Secret Letter & Envelope Opening
 * 
 * Features:
 * - 3D CSS envelope unfolding animation with blue heart wax seal.
 * - Sliding and unfolding of textured cream stationery.
 * - Single source of truth for the letter text.
 * - Button to continue to the Scrapbook.
 * - Strict verification: ensures the quiz was solved before opening.
 * - Lifecycle support: `onEnter()`.
 */

// ==========================================
// 💌 THE BIRTHDAY LETTER CONTENT
// ==========================================
const BIRTHDAY_LETTER_DATA = {
    recipient: "To my Harshitha, my Hachiga, my Bulugu, my favourite Demogorgan ♡",
    paragraphs: [
        "I honestly don't even know where to begin. How do I fit so many memories, so many laughs, so many stupid little moments, and so much love into one letter?",

        "When I think about us, I don't just think about the big moments. I think about the random pictures, the uncontrollable laughter, the things that probably wouldn't make sense to anyone else, and the little memories that somehow became some of my favourites. From our first picture at Puja's house to secretly taking selfies under the desk during corona, from freshers and fests to farewell — every little piece of our story means something to me.",

        "And the fact that we actually filmed a video for our future kids? 😭 Imagine explaining all our nonsense to them one day. I genuinely hope we get to sit together years from now, watch that video, laugh at how ridiculous we were, and realise that we really did grow up together.",

        "I hope life gives you all the happiness you deserve. I hope you achieve everything you've dreamed of, find reasons to smile even on difficult days, and never feel like you have to face everything alone. And when life gets confusing or exhausting, I hope you remember that you have me — someone who wants to see you win, who will celebrate your smallest achievements, and who will always be rooting for you.",

        "And one thing I really, really want for us? I hope we get that job in the same city. I hope our NPTEL outing plans turn into countless actual outings, our random conversations turn into late-night memories, and our 'one day' plans slowly become our everyday life. I want us to experience all those ordinary little moments together that we'll probably end up missing the most someday.",

        "Thank you for being you, for being part of my life, and for giving me memories I'll carry with me for a very long time. No matter how much things change, I hope we never lose the silly, chaotic, completely-us kind of friendship we have.",

        "Happy birthday, Harshitha. Keep being the beautiful, crazy, funny, talented person you are. Keep dreaming big, keep laughing loudly, and please never stop being my Hachiga and Bulugu. And Demogorgan, don't even think about becoming normal now. It's too late for that. 😭",

        "Here's to more pictures, more inside jokes, more adventures, more embarrassing moments, and hopefully a future where we're in the same city, annoying each other in person instead of just making plans about it.",

        "I love you, bestie. More than this little website could ever explain. ♡"
    ],
    closing: "Forever your partner in crime,",
    signature: "Your bestie 💙"
};

class SecretLetter {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderLetterContent();

            const envelope = document.getElementById('cream-envelope');
            const openPromptBtn = document.getElementById('open-envelope-btn');
            const continueScrapbookBtn = document.getElementById('letter-to-scrapbook-btn');

            if (envelope) {
                envelope.addEventListener('click', () => this.openEnvelope());
            }
            if (openPromptBtn) {
                openPromptBtn.addEventListener('click', () => this.openEnvelope());
            }
            if (continueScrapbookBtn) {
                continueScrapbookBtn.addEventListener('click', () => {
                    window.soundManager.play('click');
                    if (window.mainApp) {
                        window.mainApp.navigateTo('stage-scrapbook');
                    }
                });
            }
        });
    }

    renderLetterContent() {
        const recipientEl = document.getElementById('letter-recipient');
        const bodyEl = document.getElementById('letter-body');
        const closingEl = document.getElementById('letter-closing');
        const signEl = document.getElementById('letter-signature');

        if (recipientEl) recipientEl.textContent = BIRTHDAY_LETTER_DATA.recipient;

        if (bodyEl) {
            bodyEl.innerHTML = '';
            BIRTHDAY_LETTER_DATA.paragraphs.forEach(p => {
                const pEl = document.createElement('p');
                pEl.textContent = p;
                bodyEl.appendChild(pEl);
            });
        }

        if (closingEl) closingEl.textContent = BIRTHDAY_LETTER_DATA.closing;
        if (signEl) signEl.textContent = BIRTHDAY_LETTER_DATA.signature;
    }

    openEnvelope() {
        if (this.isOpen) return;

        // Security check: is the quiz passed in the active session?
        const isQuizPassed = window.mainApp ? window.mainApp.isQuizPassed : false;
        if (!isQuizPassed) {
            alert("Psst! You need to complete our Friendship Quiz first to unlock this secret letter! 🔒");
            if (window.mainApp) {
                window.mainApp.navigateTo('stage-quiz');
            }
            return;
        }

        this.isOpen = true;
        window.soundManager.play('envelope');

        const envelopeWrapper = document.getElementById('envelope-wrapper');
        const letterStationery = document.getElementById('letter-stationery');
        const openPromptBtn = document.getElementById('open-envelope-btn');
        const continueBtnContainer = document.getElementById('letter-continue-container');

        if (envelopeWrapper) {
            envelopeWrapper.classList.add('envelope-opened');
        }

        if (openPromptBtn) {
            openPromptBtn.style.display = 'none';
        }

        setTimeout(() => {
            if (letterStationery) {
                letterStationery.classList.add('stationery-revealed', 'unfold-anim');
            }
            window.soundManager.play('flip');
            
            setTimeout(() => {
                if (continueBtnContainer) {
                    continueBtnContainer.classList.add('fade-in');
                    continueBtnContainer.style.display = 'block';
                }
            }, 800);
        }, 600);
    }

    onEnter() {
        // If already opened previously, preserve open state
        if (this.isOpen) {
            const letterStationery = document.getElementById('letter-stationery');
            const openPromptBtn = document.getElementById('open-envelope-btn');
            const continueBtnContainer = document.getElementById('letter-continue-container');

            if (letterStationery) letterStationery.classList.add('stationery-revealed');
            if (openPromptBtn) openPromptBtn.style.display = 'none';
            if (continueBtnContainer) continueBtnContainer.style.display = 'block';
        }
    }
}

window.secretLetter = new SecretLetter();

# 🎂 Harshitha's Secret Birthday Website 💙

A personal, responsive, interactive blue scrapbook diary and friendship museum built for my best friend, Harshitha.

---

## 1. Project Overview

This website is a digital blue scrapbook diary and interactive memory museum designed to celebrate Harshitha's birthday. It features a genuine physical junk journal aesthetic, continuous organic floating photo animations, an 8x dense multi-wave confetti engine, a gated friendship quiz, and a centered blurred final reveal overlay.

### The 8 Stages of the Experience:
1. **Secret Password Entrance:** A locked diary entrance screen requiring passcode `2510` with playful hints.
2. **Suspense Screen:** A quiet, anticipation-building screen before the reveal.
3. **Birthday Cake Reveal:** An illustrated cake with 3 animated candles that extinguish one-by-one with sound effects, followed by a multi-wave confetti explosion and continuous floating Polaroids.
4. **Living Floating Photo Atmosphere:** The central birthday greeting anchored cleanly while 10 Polaroids gently float, drift, bob, and sway around it like memories caught in a breeze. (Includes a `✨ Replay Cake Reveal` button).
5. **Friendship Quiz ("Do You Really Know Me?"):** A 5-question friendship quiz with progress tracking and playful feedback. All 5 questions must be answered correctly to unlock the secret letter.
6. **Secret Letter:** A 3D cream envelope with a blue wax seal that unfolds into a heartfelt handwritten letter on textured stationery.
7. **Authentic Junk Journal Scrapbook:** 3 spreads containing the 9 physical memories in exact sequence, featuring real torn paper substrates (lined notebook paper, graph paper, lavender scraps), washi tape, brass paperclips, pushpins, handwritten margin annotations with arrows, and an interactive 3D flip card modal.
8. **Final Chaos Button & Centered Finale:** A tempting `⚠️ DO NOT PRESS ⚠️` button triggering an escalated 6-second frenzy of wobbling Polaroids, flying paper scraps, multi-directional confetti, and bouncing nickname banners (*"DEMOGORGAN!"*, *"HACHIGA!"*, *"BULUGU!!"*). At exactly 6.0s, it cuts instantly to silence, blurs the scrapbook background, and presents the quiet cream paper note in the **exact center of the viewport**:
   > *"I love you, that's all."*  
   > *"Tata, byee! ♡"*  
   > *"— your bestie 💙"*

---

## 2. Folder Structure

```
harshitha_birthday/
│
├── index.html                    # Main HTML5 entry point with strict view isolation
├── README.md                     # Comprehensive documentation guide
│
├── css/
│   ├── style.css                 # Colors, typography, torn paper clip-paths, floating orbits, layout
│   ├── animations.css            # Multi-wave confetti, harmonic drift keyframes, chaos frenzy
│   └── responsive.css            # Tailored mobile (<600px), tablet, and desktop viewports
│
├── js/
│   ├── main.js                   # View State Manager with onEnter/onLeave lifecycle hooks
│   ├── sounds.js                 # Procedural Web Audio API synth + MP3 loader & mute toggle
│   ├── password.js               # Passcode gate (2510) & suspense transition
│   ├── birthday.js               # 8x multi-wave confetti engine & continuous floating photos
│   ├── quiz.js                   # 5-question quiz logic & letter locking gate
│   ├── letter.js                 # 3D envelope opening & verbatim letter
│   ├── scrapbook.js              # Layered physical junk journal & 3D flip card modal
│   └── chaos.js                  # 6s chaos frenzy & centered blurred final reveal overlay
│
└── assets/
    ├── images/
    │   ├── birthday/
    │   │   ├── solo/             # 4 solo placeholders (birthday-solo-01 to 04)
    │   │   ├── group/            # 3 group placeholders (birthday-group-01 to 03)
    │   │   └── together/         # 3 together placeholders (birthday-together-01 to 03)
    │   ├── scrapbook/            # 9 memory placeholders (scrapbook-01 to 09)
    │   ├── stickers/             # SVG decorative stickers (ribbon, paperclip, pin, stamp, tape)
    │   └── textures/             # Paper textures
    ├── sounds/                   # Optional custom MP3 audio files
    └── fonts/                    # Optional local fonts
```

---

## 3. Technologies Used

- **HTML5:** Semantic, accessible layout with strict view isolation.
- **CSS3:** Custom properties (variables), `clip-path: polygon(...)` for real torn paper edges, 3D perspective transforms, harmonic floating `@keyframes`, and backdrop blur filters.
- **Vanilla JavaScript (ES6+):** Pure browser JavaScript with zero dependencies, build steps, or npm packages.
- **Web Audio API:** Native procedural sound synthesizer for clicks, chimes, pops, candle blow, and chaos effects with zero external audio assets required.
- **HTML5 Canvas:** Native physics-based multi-wave confetti engine (ribbons, stars, hearts, streamers, rectangles).

---

## 4. How to Open and Run the Website Locally

No Node.js, npm, backend, or database is required!

### Option A: Double-Click
Simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option B: Local Web Server (Recommended)
If you have Python installed, open your terminal / PowerShell in the `harshitha_birthday` directory and run:
```bash
python -m http.server 8000
```
Then open your browser at:
```
http://localhost:8000
```

---

## 5. Real View / Section Separation

The website uses a strict **View Lifecycle Manager** (`js/main.js`):
- When on **Birthday**: Only the birthday scene, cake, central greeting, and floating photos exist.
- When on **Letter**: Only the letter and envelope are visible. Birthday confetti, photos, and cake are completely stopped, wiped, and hidden.
- When on **Scrapbook**: Only the physical junk journal is displayed.
- When navigating away from Birthday, all active timers and canvas animation frame loops are stopped via `onLeave()`.
- Returning to Birthday shows the stable celebratory floating state without replaying the candle sequence. To replay, click the **"✨ Replay Cake Reveal"** button!

---

## 6. How to Replace Birthday Reveal Photos

There are 10 photo slots in the birthday reveal stage:
- 4 Solo photos: `assets/images/birthday/solo/`
- 3 Group photos: `assets/images/birthday/group/`
- 3 Together photos: `assets/images/birthday/together/`

### Steps:
1. Copy your real image files (in `.jpg` or `.png` format) into the matching directory.
2. Open [`js/birthday.js`](file:///c:/Users/likitha/OneDrive/Desktop/Git%20Projects/harshitha_birthday/js/birthday.js).
3. At the top of the file, locate the `BIRTHDAY_PHOTOS_CONFIG` array.
4. Update the `src` attribute for each photo to point to your new filename:
```javascript
{
    id: "birthday-solo-01",
    title: "The Iconic Solo",
    category: "solo",
    src: "assets/images/birthday/solo/my_real_photo_1.jpg", // <-- Change this filename!
    placeholder: "assets/images/birthday/solo/birthday-solo-01.svg",
    baseRotation: -5,
    floatDuration: "8.5s",
    orbitVariant: "float-orbit-1",
    tapePosition: "top-center"
}
```
*Note: If a file is missing or not yet added, the website automatically displays an attractive labeled SVG placeholder, so images will never appear broken!*

---

## 7. How to Replace the Nine Scrapbook Photos

All 9 scrapbook photographs are stored in:
`assets/images/scrapbook/`

### Steps:
1. Place your 9 photos into `assets/images/scrapbook/`.
2. Name them `scrapbook-01.jpg`, `scrapbook-02.jpg`, ..., `scrapbook-09.jpg` (or any custom name).
3. Open [`js/scrapbook.js`](file:///c:/Users/likitha/OneDrive/Desktop/Git%20Projects/harshitha_birthday/js/scrapbook.js).
4. Update the `src` property inside `SCRAPBOOK_MEMORIES_DATA` to your photo filenames.

---

## 8. How to Edit the Nine Captions & Margin Annotations

Open [`js/scrapbook.js`](file:///c:/Users/likitha/OneDrive/Desktop/Git%20Projects/harshitha_birthday/js/scrapbook.js) and find `SCRAPBOOK_MEMORIES_DATA`.
Each entry contains:
- `caption`: The text shown on the front of the Polaroid.
- `noteOnBack`: The secret handwritten note revealed when flipping the Polaroid in the lightbox modal.
- `annotation`: The handwritten margin comment with arrow (e.g. *"where it all began! 🥹"*, *"we were so unserious 💀"*).
- `dateTag`: The decorative badge in the corner.

```javascript
{
    id: "scrapbook-01",
    caption: "Our first picture in Puja's house",
    noteOnBack: "Where the chaos officially began! Who knew we'd end up this inseparable? 🏡✨",
    src: "assets/images/scrapbook/scrapbook-01.jpg",
    placeholder: "assets/images/scrapbook/scrapbook-01.svg",
    dateTag: "Chapter 1",
    rotation: -3,
    spread: "spread-1",
    tapeStyle: "tape-floral-top-left",
    pinType: "paperclip-gold",
    annotation: "where it all began! 🥹",
    arrowClass: "arrow-down-right"
}
```

---

## 9. How to Change the Password

1. Open [`js/password.js`](file:///c:/Users/likitha/OneDrive/Desktop/Git%20Projects/harshitha_birthday/js/password.js).
2. Near line 11, change:
```javascript
this.SECRET_PASS = "2510"; // Change to any password string you want!
```
3. To customize the playful wrong-password error responses, edit the `this.playfulErrors` array directly below it.

---

## 10. How to Edit Quiz Questions and Answers

Open [`js/quiz.js`](file:///c:/Users/likitha/OneDrive/Desktop/Git%20Projects/harshitha_birthday/js/quiz.js) and find `QUIZ_DATA` at line 14:
```javascript
{
    id: 1,
    question: "What's my favourite colour?",
    options: ["White", "Beige", "Black", "Lavender"],
    correctAnswer: "White",
    correctFeedback: "YAYYY, you know me too well! White is always pure peace ♡",
    wrongFeedback: "NOPE, Demogorgan! Not that colour... Think again! 😭"
}
```

---

## 11. How to Edit the Birthday Letter

Open [`js/letter.js`](file:///c:/Users/likitha/OneDrive/Desktop/Git%20Projects/harshitha_birthday/js/letter.js) and locate `BIRTHDAY_LETTER_DATA`:
- `recipient`: The opening header.
- `paragraphs`: An array of text paragraphs. Add or edit any paragraph freely.
- `closing`: E.g. *"Forever your partner in crime,"*
- `signature`: E.g. *"Your bestie 💙"*

---

## 12. How to Replace or Disable Sound Effects

### Replacing Sounds with Custom MP3s
The website uses an automatic dual-mode sound engine:
1. It looks for matching MP3 files in `assets/sounds/`:
   - `button-click.mp3`
   - `page-flip.mp3`
   - `candle-blow.mp3`
   - `confetti.mp3`
   - `correct-answer.mp3`
   - `retry.mp3`
   - `envelope-open.mp3`
   - `sticker-pop.mp3`
   - `chaos.mp3`
2. If an MP3 file is not present, it **automatically synthesizes** the sound effect procedurally using the Web Audio API.

To add real MP3s, simply drop your MP3 files with the names above into `assets/sounds/`!

### Disabling / Muting
Users can click the floating sound toggle button (`🔊 Sound: ON` / `🔇 Sound: OFF`) at the top right of the screen anytime.

---

## 13. How to Edit the Final Chaos Button Message

Open [`js/chaos.js`](file:///c:/Users/likitha/OneDrive/Desktop/Git%20Projects/harshitha_birthday/js/chaos.js) and find `FINAL_FINALE_MESSAGE` at line 20:
```javascript
const FINAL_FINALE_MESSAGE = {
    line1: "I love you, that's all.",
    line2: "Tata, byee! ♡",
    signature: "— your bestie 💙"
};
```

---

## 14. How to Reset localStorage for Testing

The website saves quiz completion, letter unlock, and mute preferences in browser `localStorage`.
To test the website fresh from the beginning:
1. Open the website in your browser.
2. Press `F12` (or Right-Click -> Inspect) to open Developer Tools.
3. Switch to the **Console** tab.
4. Type:
```javascript
resetBirthdayWebsite()
```
5. Press `Enter`. The page will clear stored data and reload from the password entrance!

---

## 15. How to Deploy to GitHub Pages

1. Push this folder to a GitHub repository (e.g. `harshitha-birthday`).
2. Go to your repository on GitHub.
3. Click **Settings** ➔ **Pages** (under the "Code and automation" section).
4. Under **Build and deployment** ➔ **Branch**, select `main` (or `master`) and folder `/ (root)`.
5. Click **Save**.
6. Within 1-2 minutes, GitHub will provide a live public link (e.g. `https://<username>.github.io/harshitha-birthday/`).

Because all asset paths are relative, the site works immediately on GitHub Pages without any changes!

---

## 16. Security Notice Regarding Password

> ⚠️ **Important Note:**
> The password gate (`2510`) is a playful, romantic front-end surprise interaction designed for delight. It is validated in client-side JavaScript. This is intentional for a zero-backend personal gift, but should not be considered cryptographic or secure authentication.

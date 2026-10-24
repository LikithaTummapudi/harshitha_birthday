/**
 * scrapbook.js - One Giant Continuous Authentic Physical Scrapbook
 * 
 * Features:
 * - One Giant Scrapbook Page: A continuous, edge-to-edge textured paper canvas.
 * - All 9 Memories Scattered Asymmetrically in exact source order with exact captions preserved.
 * - Camera Roll Film Strip: Authentic horizontal film strip with sprocket holes and 4 photo thumbnails.
 * - Shared-Memory Ephemera Objects:
 *   - McDonald's logo sticker
 *   - Movie theater ticket stub
 *   - School board cutout
 *   - Cute pencil pouch cutout
 *   - Vibrant oil pastels box (essential shared memory!)
 *   - School benches cutout
 *   - PVP college crest badge
 * - Densely Packed Filler Details:
 *   - Handwritten sticky notes with friendship facts and nicknames (Hachiga, Bulugu, Demogorgan).
 *   - Torn paper substrates (lined notebook, graph paper, lavender scrap).
 *   - Washi tapes, push pins, paperclips, ribbon bows, and stamps.
 *   - Hand-drawn SVG doodle arrows pointing between memories.
 * - Interactive: Lightbox modal on photo click, toast reveals on sticker tap, unfolding secret note.
 */

// ==========================================
// 📖 SCRAPBOOK MEMORIES CONFIGURATION
// ==========================================
const SCRAPBOOK_MEMORIES_DATA = [
    {
        id: "scrapbook-01",
        caption: "Our first picture in Puja's house",
        noteOnBack: "Where the chaos officially began! Who knew we'd end up this inseparable? 🏡✨",
        src: "assets/images/photo15.jpeg",
        placeholder: "assets/images/photo15.jpeg",
        dateTag: "Chapter 1",
        rotation: -4,
        tapeStyle: "tape-floral-top-left",
        pinType: "paperclip-gold",
        annotation: "where it all began! 🥺",
        arrowClass: "arrow-down-right"
    },
    {
        id: "scrapbook-02",
        caption: "Our all time corona fav pic, secretly taking a selfie under the desk without getting caught.",
        noteOnBack: "The adrenaline rush was insane! Best ninja selfie masters in class 😷🤳",
        src: "assets/images/photo7.jpeg",
        placeholder: "assets/images/photo7.jpeg",
        dateTag: "Corona Era",
        rotation: 5,
        tapeStyle: "tape-striped-right",
        pinType: "pin-orange",
        annotation: "we were so unserious 💀",
        arrowClass: "arrow-up-left"
    },
    {
        id: "scrapbook-03",
        caption: "It's our freshers",
        noteOnBack: "Look at us all dressed up and pretending to be mature adults haha! 🎓💙",
        src: "assets/images/photo16.jpeg",
        placeholder: "assets/images/photo16.jpeg",
        dateTag: "Freshers Day",
        rotation: -3,
        tapeStyle: "tape-blue-top",
        pinType: "ribbon-bow-blue",
        annotation: "pretending to be adults lol 👗",
        arrowClass: "arrow-left-down"
    },
    {
        id: "scrapbook-04",
        caption: "It was on my birthdayyy",
        noteOnBack: "You made my birthday so unforgettable. Having you there made it 1000x brighter 🎂✨",
        src: "assets/images/photo14.jpeg",
        placeholder: "assets/images/photo14.jpeg",
        dateTag: "Birthdayyy",
        rotation: 4,
        tapeStyle: "tape-dotted-left",
        pinType: "ribbon-bow-blue",
        annotation: "one of my favs ♡",
        arrowClass: "arrow-down-left"
    },
    {
        id: "scrapbook-05",
        caption: "It's our farewell, I miss those days",
        noteOnBack: "So many tears, so many hugs, so much nostalgia. But our story never ended there! 🥺🌸",
        src: "assets/images/photo13.jpeg",
        placeholder: "assets/images/photo13.jpeg",
        dateTag: "Farewell Day",
        rotation: -4,
        tapeStyle: "tape-striped-right",
        pinType: "paperclip-gold",
        annotation: "why were we like this 😭",
        arrowClass: "arrow-up-right"
    },
    {
        id: "scrapbook-06",
        caption: "Enjoyed a lot in this fest",
        noteOnBack: "Running around, screaming the lyrics, eating junk food until our stomachs hurt! 🎊💃",
        src: "assets/images/photo4.jpeg",
        placeholder: "assets/images/photo4.jpeg",
        dateTag: "Fest Madness",
        rotation: 3,
        tapeStyle: "tape-floral-top-left",
        pinType: "pin-orange",
        annotation: "STOPPPP HAHAHA 😂",
        arrowClass: "arrow-left-up"
    },
    {
        id: "scrapbook-07",
        caption: "Our funny workshop moment",
        noteOnBack: "We were supposed to code seriously, but we spent 90% of the time giggling at memes 💻😂",
        src: "assets/images/photo17.jpeg",
        placeholder: "assets/images/photo17.jpeg",
        dateTag: "Workshop Chaos",
        rotation: -3,
        tapeStyle: "tape-blue-left",
        pinType: "paperclip-gold",
        annotation: "supposed to code, giggled for hours 💻",
        arrowClass: "arrow-down-right"
    },
    {
        id: "scrapbook-08",
        caption: "Remember? We filmed a video for our future kids on this day",
        noteOnBack: "I swear if our future kids laugh at our hairstyles, we will disown them! 📹👶",
        src: "assets/images/photo12.jpeg",
        placeholder: "assets/images/photo12.jpeg",
        dateTag: "Future Kids Video",
        rotation: 4,
        tapeStyle: "tape-dotted-right",
        pinType: "ribbon-bow-blue",
        annotation: "core memory unlocked 📹",
        arrowClass: "arrow-up-left"
    },
    {
        id: "scrapbook-09",
        caption: "Our NPTEL outing plan",
        noteOnBack: "The plan that sparked a million future adventures! City job together is next on the list 🗺️✈️",
        src: "assets/images/photo5.jpeg",
        placeholder: "assets/images/photo5.jpeg",
        dateTag: "NPTEL Era",
        rotation: -3,
        tapeStyle: "tape-striped-top",
        pinType: "pin-orange",
        annotation: "our master plan begins! 🗺️✨",
        arrowClass: "arrow-left-down"
    }
];

// ==========================================
// 🎞️ CAMERA ROLL FILM STRIP DATA
// ==========================================
const CAMERA_ROLL_FRAMES = [
    {
        id: "roll-1",
        src: "assets/images/photo10.jpeg",
        placeholder: "assets/images/photo10.jpeg",
        caption: "Bestie Duo"
    },
    {
        id: "roll-2",
        src: "assets/images/photo9.jpeg",
        placeholder: "assets/images/photo9.jpeg",
        caption: "Always Us"
    },
    {
        id: "roll-3",
        src: "assets/images/photo8.jpeg",
        placeholder: "assets/images/photo8.jpeg",
        caption: "The Gang"
    },
    {
        id: "roll-4",
        src: "assets/images/photo11.jpeg",
        placeholder: "assets/images/photo11.jpeg",
        caption: "Fest Memories"
    }
];

// ==========================================
// 🎨 SHARED-MEMORY EPHEMERA DATA
// ==========================================
const SHARED_EPHEMERA_DATA = [
    {
        id: "ephemera-pvp",
        title: "PVP Siddhartha Crest",
        src: "assets/images/stickers/pvp-logo.svg",
        rotation: -4,
        note: "PVP Campus: Where our iconic duo officially assembled! 🎓💙",
        badgeText: "PVPSIT Era"
    },
    {
        id: "ephemera-board",
        title: "School Chalkboard",
        src: "assets/images/stickers/school-board.svg",
        rotation: 4,
        note: "Hachiga + Bulugu = 100% pure chaos! Maths was strictly illegal 🚫✏️",
        badgeText: "Classroom Notes"
    },
    {
        id: "ephemera-bench",
        title: "School Benches",
        src: "assets/images/stickers/school-bench.svg",
        rotation: -3,
        note: "Back bench giggles and plotting our future life plans! 🏫💭",
        badgeText: "Back Bench Squad"
    },
    {
        id: "ephemera-pastels",
        title: "Oil Pastels Box",
        src: "assets/images/stickers/oil-pastels.svg",
        rotation: -5,
        note: "Our legendary oil pastels memory! Hands full of color and endless laughter 🖍️🎨",
        badgeText: "Core Memory 🎨"
    },
    {
        id: "ephemera-mcd",
        title: "McDonald's Sticker",
        src: "assets/images/stickers/mcdonalds-sticker.svg",
        rotation: 6,
        note: "Late-night McFlurry & French Fries runs after exams! 🍟🍦",
        badgeText: "Post-College McD"
    },
    {
        id: "ephemera-ticket",
        title: "Cinema Ticket Stub",
        src: "assets/images/stickers/movie-ticket.svg",
        rotation: -4,
        note: "Admit One to crying laughing in the movie theatre! 🎬🍿",
        badgeText: "Movie Nights"
    },
    {
        id: "ephemera-pouch",
        title: "Pencil Pouch",
        src: "assets/images/stickers/pencil-pouch.svg",
        rotation: 5,
        note: "Full of colorful gel pens, folded notes, and zero erasers! 🖊️✨",
        badgeText: "Bestie Stationery"
    }
];

// ==========================================
// 🌸 NEW PINTEREST-INSPIRED EPHEMERA DATA
// ==========================================
const NEW_EPHEMERA_DATA = [
    {
        id: "ephemera-whale",
        title: "Cute Animated Whale",
        src: "assets/images/stickers/cute-whale.svg",
        rotation: -5,
        note: "Spouting love and happiness! You're oceans of fun 🐳💙",
        badgeText: "Cute Whale 🐳"
    },
    {
        id: "ephemera-flower-vintage",
        title: "Vintage Botanical Flowers",
        src: "assets/images/stickers/vintage-flowers.svg",
        rotation: 6,
        note: "Pinterest aesthetic: Friends who bloom together, stay together! 🌸✨",
        badgeText: "Wildflowers 🌸"
    },
    {
        id: "ephemera-teddy",
        title: "Cuddly Teddy Bear",
        src: "assets/images/stickers/teddy-bear.svg",
        rotation: -4,
        note: "A warm squishy bear hug whenever life gets too chaotic! 🧸♡",
        badgeText: "Bestie Hugs 🧸"
    },
    {
        id: "ephemera-glasses",
        title: "Cute Spectacles",
        src: "assets/images/stickers/cute-eyeglasses.svg",
        rotation: 5,
        note: "Looking smart while doing the most unhinged things in class 👓👀",
        badgeText: "Class Nerd 👓"
    },
    {
        id: "ephemera-ice-cream",
        title: "Pastel Soft Serve",
        src: "assets/images/stickers/ice-cream.svg",
        rotation: -3,
        note: "Treating ourselves because surviving another semester is hard work! 🍦😋",
        badgeText: "Sweet Tooth 🍦"
    },
    {
        id: "ephemera-pizza",
        title: "Cheesy Pizza Slice",
        src: "assets/images/stickers/pizza-slice.svg",
        rotation: 4,
        note: "You have a pizza my heart forever! Extra cheese guaranteed 🍕🧀",
        badgeText: "Pizza Night 🍕"
    },
    {
        id: "ephemera-burger",
        title: "Juicy Burger",
        src: "assets/images/stickers/burger.svg",
        rotation: -6,
        note: "Post-college cravings: burgers, gossip, and endless laughter 🍔🍟",
        badgeText: "Burger Cravings 🍔"
    },
    {
        id: "ephemera-bow",
        title: "Aesthetic Coquette Bow",
        src: "assets/images/stickers/decorative-bow.svg",
        rotation: 5,
        note: "Tied together forever by fate, laughter, and inside jokes 🎀💙",
        badgeText: "Bestie Bow 🎀"
    },
    {
        id: "ephemera-bus",
        title: "Friendship Mini-Bus",
        src: "assets/images/stickers/mini-bus.svg",
        rotation: -4,
        note: "Honk honk! Road trip playlist on max volume, wind in our hair 🚌🎶",
        badgeText: "Road Trip 🚌"
    },
    {
        id: "ephemera-rickshaw",
        title: "Auto-Rickshaw",
        src: "assets/images/stickers/auto-rickshaw.svg",
        rotation: 4,
        note: "'Bhaiya Vijayawada chalo!' Hanging on for dear life on every turn 🛺💨",
        badgeText: "Auto Rides 🛺"
    },
    {
        id: "ephemera-road",
        title: "Winding Road Scrap",
        src: "assets/images/stickers/winding-road.svg",
        rotation: -3,
        note: "The road ahead is full of adventures, and we're conquering it together 🛣️✨",
        badgeText: "Adventures Ahead 🛣️"
    }
];

// ==========================================
// 📝 RANDOM FRIENDSHIP FACTS & STICKY NOTES
// ==========================================
const STICKY_NOTES_DATA = [
    {
        text: "Demogorgan in her natural habitat 😈",
        rotation: -4,
        colorClass: "note-yellow"
    },
    {
        text: "Hachiga's laugh can be heard 3 blocks away! 😂",
        rotation: 3,
        colorClass: "note-pink"
    },
    {
        text: "Bulugu is officially the sweetest bestie in the universe ♡",
        rotation: -3,
        colorClass: "note-blue"
    },
    {
        text: "Goal locked: Jobs in the same city, flat together, unlimited fun! 🏙️✨",
        rotation: 4,
        colorClass: "note-mint"
    },
    {
        text: "Secret fact: We can communicate full paragraphs using only eye rolls 👀",
        rotation: -5,
        colorClass: "note-lavender"
    },
    {
        text: "Oil pastels disaster: never forget the colorful mess! 🖍️✨",
        rotation: 3,
        colorClass: "note-yellow"
    },
    {
        text: "Future kids: If you're watching that video, your mom was chaotic! 📹👶",
        rotation: -2,
        colorClass: "note-pink"
    },
    {
        text: "If lost or confused, please immediately return to Harshitha 📌",
        rotation: 4,
        colorClass: "note-blue"
    }
];

const STICKER_NOTES = [
    "Demogorgan mode: ACTIVATED! 😈",
    "Hachiga's laugh can be heard 3 blocks away! 😂",
    "Bulugu is officially the world's sweetest bestie ♡",
    "Warning: Extreme goofiness ahead! ⚠️",
    "Promise: We WILL get a job in the same city! 🏙️✨",
    "Future kids: If you're watching that video, your mom was chaotic! 📹"
];

class InteractiveScrapbook {
    constructor() {
        this.activeModalPhoto = null;
        this.isFlipped = false;
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.renderContinuousCanvas();
            this.initModalControls();
            this.initSecretStickers();
            this.initUnfoldNotes();
        });
    }

    /**
     * Renders one continuous, densely filled physical scrapbook canvas
     */
    renderContinuousCanvas() {
        const container = document.getElementById('scrapbook-continuous-canvas');
        if (!container) return;
        container.innerHTML = '';

        // Helper: Create a Memory Polaroid Item
        const createPolaroidElement = (item, index) => {
            const memoryWrapper = document.createElement('div');
            memoryWrapper.className = `scrapbook-memory-cluster cluster-${index + 1}`;
            memoryWrapper.style.setProperty('--card-rotation', `${item.rotation}deg`);

            // 1. Layered Background Paper Substrates
            const paperScrap = document.createElement('div');
            if (index % 3 === 0) {
                paperScrap.className = 'substrate-paper torn-lined-paper';
            } else if (index % 3 === 1) {
                paperScrap.className = 'substrate-paper torn-graph-paper';
            } else {
                paperScrap.className = 'substrate-paper torn-lavender-scrap';
            }

            // 2. Polaroid Element
            const polaroid = document.createElement('div');
            polaroid.className = `scrapbook-polaroid-item ${item.tapeStyle}`;
            polaroid.id = item.id;

            // Decorative Washi Tape & Hardware
            const tape = document.createElement('div');
            tape.className = 'washi-tape-strip';

            const hardware = document.createElement('div');
            hardware.className = `hardware-accent ${item.pinType}`;

            const stamp = document.createElement('span');
            stamp.className = 'scrapbook-date-tag';
            stamp.textContent = item.dateTag;

            // Image container
            const imgContainer = document.createElement('div');
            imgContainer.className = 'polaroid-img-wrapper';

            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.caption;
            img.loading = "lazy";
            img.onerror = () => {
                img.src = item.placeholder;
            };

            imgContainer.appendChild(img);

            // Caption Box
            const captionBox = document.createElement('div');
            captionBox.className = 'polaroid-caption-box';
            
            const captionText = document.createElement('p');
            captionText.className = 'polaroid-handwritten-caption';
            captionText.textContent = item.caption;

            const clickHint = document.createElement('span');
            clickHint.className = 'polaroid-click-hint';
            clickHint.textContent = "🔍 tap to enlarge & flip";

            captionBox.appendChild(captionText);
            captionBox.appendChild(clickHint);

            polaroid.appendChild(tape);
            polaroid.appendChild(hardware);
            polaroid.appendChild(stamp);
            polaroid.appendChild(imgContainer);
            polaroid.appendChild(captionBox);

            // 3. Margin Handwritten Annotation with Doodled Arrow
            const annotationBox = document.createElement('div');
            annotationBox.className = `margin-annotation-tag ${item.arrowClass}`;
            annotationBox.innerHTML = `
                <span class="annotation-text">${item.annotation}</span>
                <span class="annotation-arrow">➔</span>
            `;

            memoryWrapper.appendChild(paperScrap);
            memoryWrapper.appendChild(polaroid);
            memoryWrapper.appendChild(annotationBox);

            polaroid.addEventListener('click', () => {
                window.soundManager.play('click');
                this.openModal(item);
            });

            return memoryWrapper;
        };

        // Helper: Create an Ephemera Object Sticker
        const createEphemeraElement = (ephemera, customClass = '') => {
            const wrapper = document.createElement('div');
            wrapper.className = `scrapbook-ephemera-item ${ephemera.id} ${customClass}`.trim();
            wrapper.style.setProperty('--ephemera-rot', `${ephemera.rotation}deg`);

            const pin = document.createElement('div');
            pin.className = 'ephemera-pin-tack';

            const img = document.createElement('img');
            img.src = ephemera.src;
            img.alt = ephemera.title;
            img.className = 'ephemera-graphic';

            const badge = document.createElement('span');
            badge.className = 'ephemera-badge';
            badge.textContent = ephemera.badgeText;

            wrapper.appendChild(pin);
            wrapper.appendChild(img);
            wrapper.appendChild(badge);

            wrapper.addEventListener('click', (e) => {
                e.stopPropagation();
                window.soundManager.play('sticker');
                this.showStickerPopup(wrapper, ephemera.note);
            });

            return wrapper;
        };

        // Helper: Create a Handwritten Sticky Note
        const createStickyNoteElement = (note, index) => {
            const noteEl = document.createElement('div');
            noteEl.className = `scrapbook-sticky-note ${note.colorClass} sticky-${index + 1}`;
            noteEl.style.setProperty('--note-rot', `${note.rotation}deg`);

            const pin = document.createElement('div');
            pin.className = 'sticky-pin';

            const text = document.createElement('p');
            text.className = 'sticky-text';
            text.textContent = note.text;

            noteEl.appendChild(pin);
            noteEl.appendChild(text);

            noteEl.addEventListener('click', (e) => {
                e.stopPropagation();
                window.soundManager.play('flip');
                this.showStickerPopup(noteEl, note.text);
            });

            return noteEl;
        };

        // Helper: Create a Scrapbook Doodle Element
        const createDoodleElement = (src, alt, rotation = 0, customClass = '') => {
            const doodle = document.createElement('div');
            doodle.className = `scrapbook-doodle-item ${customClass}`;
            doodle.style.setProperty('--doodle-rot', `${rotation}deg`);

            const img = document.createElement('img');
            img.src = src;
            img.alt = alt;
            img.loading = "lazy";

            doodle.appendChild(img);
            return doodle;
        };

        // Helper: Create the Photographic Camera Roll Film Strip
        const createFilmStripElement = () => {
            const stripContainer = document.createElement('div');
            stripContainer.className = 'scrapbook-camera-roll-strip';

            // Washi tape holding down the ends
            const tapeLeft = document.createElement('div');
            tapeLeft.className = 'washi-tape-strip film-tape-left';

            const tapeRight = document.createElement('div');
            tapeRight.className = 'washi-tape-strip film-tape-right';

            // Header label
            const label = document.createElement('div');
            label.className = 'film-strip-header-label';
            label.innerHTML = '<span>🎞️ CAMERA ROLL MEMORIES • UNFILTERED FRIENDSHIP</span>';

            // Film body with sprocket holes
            const filmBody = document.createElement('div');
            filmBody.className = 'film-body-container';

            // Top Sprocket Track
            const sprocketsTop = document.createElement('div');
            sprocketsTop.className = 'sprocket-holes-track';
            for (let i = 0; i < 16; i++) {
                const hole = document.createElement('span');
                hole.className = 'sprocket-hole';
                sprocketsTop.appendChild(hole);
            }

            // Photo frames track
            const framesTrack = document.createElement('div');
            framesTrack.className = 'film-frames-track';

            CAMERA_ROLL_FRAMES.forEach((frame) => {
                const frameEl = document.createElement('div');
                frameEl.className = 'film-single-frame';

                const frameImg = document.createElement('img');
                frameImg.src = frame.src;
                frameImg.alt = frame.caption;
                frameImg.loading = "lazy";
                frameImg.onerror = () => {
                    frameImg.src = frame.placeholder;
                };

                const frameCap = document.createElement('span');
                frameCap.className = 'film-frame-caption';
                frameCap.textContent = frame.caption;

                frameEl.appendChild(frameImg);
                frameEl.appendChild(frameCap);
                framesTrack.appendChild(frameEl);
            });

            // Bottom Sprocket Track
            const sprocketsBottom = document.createElement('div');
            sprocketsBottom.className = 'sprocket-holes-track';
            for (let i = 0; i < 16; i++) {
                const hole = document.createElement('span');
                hole.className = 'sprocket-hole';
                sprocketsBottom.appendChild(hole);
            }

            filmBody.appendChild(sprocketsTop);
            filmBody.appendChild(framesTrack);
            filmBody.appendChild(sprocketsBottom);

            stripContainer.appendChild(tapeLeft);
            stripContainer.appendChild(label);
            stripContainer.appendChild(filmBody);
            stripContainer.appendChild(tapeRight);

            return stripContainer;
        };

        // ==========================================
        // 🏗️ BUILD THE CONTINUOUS SCRAPBOOK COMPOSITION
        // ==========================================

        // SECTION 1: TOP SPREAD MEMORIES (Photos 1, 2 + Whale + PVP + Glasses + Stars)
        const section1 = document.createElement('div');
        section1.className = 'scrapbook-dense-flow-zone zone-1';

        section1.appendChild(createStickyNoteElement(STICKY_NOTES_DATA[0], 0));
        section1.appendChild(createPolaroidElement(SCRAPBOOK_MEMORIES_DATA[0], 0)); // Photo 1
        section1.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[0], 'sticker-scatter-whale')); // Cute Blue Animated Whale 🐳
        section1.appendChild(createEphemeraElement(SHARED_EPHEMERA_DATA[0])); // PVP Logo
        section1.appendChild(createDoodleElement('assets/images/stickers/doodle-stars.svg', 'Sparkle Stars', -8, 'doodle-stars'));
        section1.appendChild(createStickyNoteElement(STICKY_NOTES_DATA[1], 1));
        section1.appendChild(createPolaroidElement(SCRAPBOOK_MEMORIES_DATA[1], 1)); // Photo 2
        section1.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[3], 'sticker-scatter-glasses')); // Cute Spectacles 👓

        container.appendChild(section1);

        // SECTION 2: CAMERA ROLL FILM STRIP & CLASSROOM NOSTALGIA (Board, Bow, Film, Bus, Benches, Auto, Road)
        const section2 = document.createElement('div');
        section2.className = 'scrapbook-dense-flow-zone zone-film-and-school';

        section2.appendChild(createEphemeraElement(SHARED_EPHEMERA_DATA[1])); // School Board
        section2.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[7], 'sticker-scatter-bow')); // Coquette Decorative Bow 🎀
        section2.appendChild(createFilmStripElement()); // Camera Roll Strip
        section2.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[8], 'sticker-scatter-bus')); // Friendship Mini-Bus 🚌
        section2.appendChild(createEphemeraElement(SHARED_EPHEMERA_DATA[2])); // School Benches
        section2.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[9], 'sticker-scatter-rickshaw')); // Auto-Rickshaw 🛺
        section2.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[10], 'sticker-scatter-road')); // Winding Road Scrap 🛣️
        section2.appendChild(createStickyNoteElement(STICKY_NOTES_DATA[2], 2));

        container.appendChild(section2);

        // SECTION 3: MID-ERA MEMORIES & OIL PASTELS (Photos 3, 4 + Flowers + Oil Pastels + Ice Cream + Teddy)
        const section3 = document.createElement('div');
        section3.className = 'scrapbook-dense-flow-zone zone-2';

        section3.appendChild(createPolaroidElement(SCRAPBOOK_MEMORIES_DATA[2], 2)); // Photo 3 (Freshers)
        section3.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[1], 'sticker-scatter-flowers')); // Vintage Botanical Flowers 🌸
        section3.appendChild(createEphemeraElement(SHARED_EPHEMERA_DATA[3])); // Oil Pastels Box (Essential memory!)
        section3.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[4], 'sticker-scatter-ice-cream')); // Pastel Soft Serve Ice Cream 🍦
        section3.appendChild(createStickyNoteElement(STICKY_NOTES_DATA[5], 5)); // Pastels memory note
        section3.appendChild(createDoodleElement('assets/images/stickers/doodle-hearts.svg', 'Sweet Hearts', 6, 'doodle-hearts'));
        section3.appendChild(createPolaroidElement(SCRAPBOOK_MEMORIES_DATA[3], 3)); // Photo 4 (Birthday)
        section3.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[2], 'sticker-scatter-teddy')); // Cuddly Teddy Bear 🧸

        container.appendChild(section3);

        // SECTION 4: FAREWELL, MCDONALD'S & MOVIE NIGHTS (Photos 5, 6 + McD + Burger + Movie Ticket + Pizza)
        const section4 = document.createElement('div');
        section4.className = 'scrapbook-dense-flow-zone zone-3';

        section4.appendChild(createStickyNoteElement(STICKY_NOTES_DATA[3], 3)); // Goal note
        section4.appendChild(createPolaroidElement(SCRAPBOOK_MEMORIES_DATA[4], 4)); // Photo 5 (Farewell)
        section4.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[6], 'sticker-scatter-burger')); // Juicy Burger 🍔
        
        // Pinned McDo & Movie stub authentic 2-item ephemera pair
        const outingCluster = document.createElement('div');
        outingCluster.className = 'outing-ephemera-cluster';
        outingCluster.appendChild(createEphemeraElement(SHARED_EPHEMERA_DATA[4])); // McDonald's
        outingCluster.appendChild(createEphemeraElement(SHARED_EPHEMERA_DATA[5])); // Movie Ticket
        section4.appendChild(outingCluster);

        section4.appendChild(createDoodleElement('assets/images/stickers/doodle-stars.svg', 'Fest Stars', 10, 'doodle-stars'));
        section4.appendChild(createPolaroidElement(SCRAPBOOK_MEMORIES_DATA[5], 5)); // Photo 6 (Fest)
        section4.appendChild(createEphemeraElement(NEW_EPHEMERA_DATA[5], 'sticker-scatter-pizza')); // Cheesy Pizza Slice 🍕

        container.appendChild(section4);

        // SECTION 5: WORKSHOP, FUTURE PLANS & PENCIL POUCH (Photos 7, 8, 9 + Pencil Pouch + Doodles)
        const section5 = document.createElement('div');
        section5.className = 'scrapbook-dense-flow-zone zone-4';

        section5.appendChild(createEphemeraElement(SHARED_EPHEMERA_DATA[6])); // Pencil Pouch
        section5.appendChild(createPolaroidElement(SCRAPBOOK_MEMORIES_DATA[6], 6)); // Photo 7 (Workshop)
        section5.appendChild(createDoodleElement('assets/images/stickers/doodle-hearts.svg', 'Memory Hearts', -6, 'doodle-hearts'));
        section5.appendChild(createStickyNoteElement(STICKY_NOTES_DATA[4], 4)); // Eye roll note
        section5.appendChild(createPolaroidElement(SCRAPBOOK_MEMORIES_DATA[7], 7)); // Photo 8 (Future Kids Video)
        section5.appendChild(createDoodleElement('assets/images/stickers/doodle-stars.svg', 'Outing Stars', 4, 'doodle-stars'));
        section5.appendChild(createStickyNoteElement(STICKY_NOTES_DATA[6], 6)); // Kids note
        section5.appendChild(createPolaroidElement(SCRAPBOOK_MEMORIES_DATA[8], 8)); // Photo 9 (NPTEL Outing)
        section5.appendChild(createStickyNoteElement(STICKY_NOTES_DATA[7], 7)); // Return to Harshitha

        container.appendChild(section5);
    }

    initModalControls() {
        const modal = document.getElementById('scrapbook-modal');
        const closeBtn = document.getElementById('scrapbook-modal-close');
        const flipBtn = document.getElementById('scrapbook-modal-flip');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (flipBtn) {
            flipBtn.addEventListener('click', () => this.toggleFlip());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    openModal(item) {
        this.activeModalPhoto = item;
        this.isFlipped = false;

        const modal = document.getElementById('scrapbook-modal');
        const modalImg = document.getElementById('modal-polaroid-img');
        const modalCaption = document.getElementById('modal-polaroid-caption');
        const modalBackNote = document.getElementById('modal-polaroid-back-note');
        const modalTag = document.getElementById('modal-polaroid-tag');
        const polaroid3d = document.getElementById('modal-polaroid-card');

        if (!modal) return;

        if (modalImg) {
            modalImg.src = item.src;
            modalImg.alt = item.caption;
            modalImg.onerror = () => {
                modalImg.src = item.placeholder;
            };
        }

        if (modalCaption) modalCaption.textContent = item.caption;
        if (modalBackNote) modalBackNote.textContent = item.noteOnBack;
        if (modalTag) modalTag.textContent = item.dateTag;

        if (polaroid3d) {
            polaroid3d.classList.remove('is-flipped');
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    toggleFlip() {
        const polaroid3d = document.getElementById('modal-polaroid-card');
        if (!polaroid3d) return;

        this.isFlipped = !this.isFlipped;
        window.soundManager.play('flip');
        
        if (this.isFlipped) {
            polaroid3d.classList.add('is-flipped');
        } else {
            polaroid3d.classList.remove('is-flipped');
        }
    }

    closeModal() {
        const modal = document.getElementById('scrapbook-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            window.soundManager.play('click');
        }
    }

    initSecretStickers() {
        const stickers = document.querySelectorAll('.interactive-sticker');
        stickers.forEach((sticker, i) => {
            sticker.addEventListener('click', (e) => {
                e.stopPropagation();
                window.soundManager.play('sticker');
                const note = STICKER_NOTES[i % STICKER_NOTES.length];
                this.showStickerPopup(sticker, note);
            });
        });
    }

    showStickerPopup(stickerEl, text) {
        const existing = document.querySelector('.sticker-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'sticker-toast pop-in';
        toast.innerHTML = `<span class="toast-heart">💙</span> ${text}`;

        const rect = stickerEl.getBoundingClientRect();
        toast.style.left = `${Math.min(window.innerWidth - 260, Math.max(10, rect.left - 40))}px`;
        toast.style.top = `${Math.max(10, rect.top - 60)}px`;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 400);
        }, 2800);
    }

    initUnfoldNotes() {
        const notes = document.querySelectorAll('.unfolding-paper-note');
        notes.forEach(note => {
            note.addEventListener('click', () => {
                window.soundManager.play('flip');
                note.classList.toggle('unfolded');
            });
        });
    }

    onEnter() {}

    onLeave() {
        this.closeModal();
    }
}

window.interactiveScrapbook = new InteractiveScrapbook();

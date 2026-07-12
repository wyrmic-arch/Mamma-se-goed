import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'content.json');

const DEFAULT_CONTENT = {
  "hero": {
    "backgroundImage": "/photos/porch-rocking-chairs.jpg",
    "tagline": "Every chapter of life deserves a <em>song</em>.",
    "subtitle": "Country & Americana storytelling for women who've lived, loved, lost, and kept choosing themselves. Leave the porch light on."
  },
  "porchLight": {
    "quote": "Leave the porch light on.",
    "subtitle": "The Ane Wilder North Star"
  },
  "story": {
    "title": "The Artist Behind the Name",
    "image": "/photos/woman-hat-mountains.jpg",
    "paragraphs": [
      "Ane Wilder is a digital storytelling artist creating country and Americana music rooted in real life — the messy, beautiful, heartbreaking kind. Her songs are letters to the women who've been through it and came out softer, not harder.",
      "She believes every chapter deserves a song: the front porch mornings, the 2am doubts, the slow walks home, the courage to begin again. Stories that feel like someone left the porch light on for you."
    ],
    "signature": "— Timeless. Feminine. Authentic. Comforting. Country. Literary. You."
  },
  "gallery": {
    "title": "The Visual World of Ane Wilder",
    "subtitle": "Warm mornings, honest pages, golden fields, and the quiet objects that hold a story together.",
    "images": [
      { "src": "/photos/porch-rocking-chairs.jpg", "caption": "The porch at golden hour — where every story begins", "size": "wide" },
      { "src": "/photos/wildflowers-vase.jpg", "caption": "Wildflowers in a jar", "size": "normal" },
      { "src": "/photos/journal-keep-choosing-yourself.jpg", "caption": "Keep choosing yourself", "size": "tall" },
      { "src": "/photos/reading-nook.jpg", "caption": "The reading room", "size": "normal" },
      { "src": "/photos/country-road.jpg", "caption": "Country roads, quiet decisions", "size": "normal" },
      { "src": "/photos/lavender-bundle.jpg", "caption": "Lavender — the brand's signature bloom", "size": "normal" },
      { "src": "/photos/kitchen-interior.jpg", "caption": "The kitchen — where life happens", "size": "normal" },
      { "src": "/photos/website-field.jpg", "caption": "Foregrounds and fields", "size": "wide" },
      { "src": "/photos/social-journal-coffee.jpg", "caption": "Letters and coffee — the daily ritual", "size": "normal" },
      { "src": "/photos/hands-writing.jpg", "caption": "Hands that write the songs", "size": "normal" },
      { "src": "/photos/guitar-by-window.jpg", "caption": "The guitar by the window", "size": "normal" },
      { "src": "/photos/mountain-landscape.jpg", "caption": "Mountains beyond — the road ahead", "size": "normal" }
    ]
  },
  "values": {
    "title": "What She Stands For",
    "subtitle": "Six words that guide every song, every story, every page.",
    "items": [
      { "icon": "🕰️", "title": "Timeless", "description": "Songs that sound like they've always existed. Stories that don't chase trends — they reach for the eternal." },
      { "icon": "🌸", "title": "Feminine", "description": "Unapologetically soft. Power in tenderness. Strength in vulnerability. No armor required." },
      { "icon": "📖", "title": "Authentic", "description": "Real stories, real feelings, real mess. No performance, just honesty that resonates." },
      { "icon": "☕", "title": "Comforting", "description": "Like a warm mug, a knit blanket, a porch light left on. Music that holds you." },
      { "icon": "🏡", "title": "Country", "description": "Roots in the land, the porch, the fields. Americana storytelling passed down and made new." },
      { "icon": "✒️", "title": "Literary", "description": "Lyrics worth reading like prose. Journals that become songs. Songs that become chapters." }
    ]
  },
  "music": {
    "sections": [
      {
        "title": "The Journal Project",
        "image": "/photos/journal-keep-choosing-yourself.jpg",
        "paragraphs": [
          "Every song starts as a scribble in a journal. Real thoughts, unfiltered, written at kitchen tables and on front porches. The journal isn't behind the music — it IS the music.",
          "Each chapter of the Ane Wilder story comes with journal prompts, letters, and reflections designed to help women process their own chapters."
        ],
        "cta": "Start Your Chapter"
      },
      {
        "title": "Music With Roots",
        "image": "/photos/guitar-by-window.jpg",
        "paragraphs": [
          "Country and Americana songs that don't pretend the hard parts don't exist. Heartbreak, healing, the quiet strength of starting over — set to fingerpicked guitar and warm production.",
          "From the porch light ballads to the driving dirt-road anthems, every track is a chapter in a larger story."
        ],
        "cta": "Listen In"
      },
      {
        "title": "The Digital House",
        "image": "/photos/kitchen-interior.jpg",
        "paragraphs": [
          "Ane Wilder's digital home is designed to feel like a house — warm, lived-in, with different rooms for different needs. The porch for community. The library for deep dives. The musical room for listening.",
          "Every corner built to make women feel seen, heard, and less alone."
        ],
        "cta": "Step Inside"
      }
    ]
  },
  "musicFeature": {
    "title": "Songs for Every Chapter",
    "image": "/photos/guitar-by-window.jpg",
    "paragraphs": [
      "Ane Wilder's music lives at the intersection of country storytelling and Americana warmth. Each song is a letter — to a younger self, to a heartbreak, to a hope that hasn't arrived yet.",
      "Production that feels like a room, not a studio. Vocals that sound like they're sitting next to you. Lyrics worth reading on paper."
    ],
    "cta": "Hear the First Single"
  },
  "letters": {
    "title": "Letters from the Porch",
    "subtitle": "The community writes back. Real words from women who found themselves in the songs.",
    "items": [
      { "quote": "\"I played 'Porch Light' three times on the drive home. It felt like she'd been reading my journal. I didn't feel alone anymore.\"", "author": "— Sarah M., Nashville" },
      { "quote": "\"It's the first country album that felt like it was written for women like me. Not the fantasy — the real, tired, still-trying me.\"", "author": "— Joanne K., Austin" },
      { "quote": "\"The journal prompts changed how I process things. I went from scrolling to writing. That's not small.\"", "author": "— Deb R., Asheville" }
    ]
  },
  "contact": {
    "title": "Leave the Porch Light On",
    "subtitle": "Join the community. Get first listens, journal prompts, and letters from Ane.",
    "backgroundImage": "/photos/guitar-by-window.jpg"
  }
};

export function getContent() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    // Fall back to default content (Vercel / fresh install)
    return DEFAULT_CONTENT;
  }
}

export function saveContent(data) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
  return true;
}

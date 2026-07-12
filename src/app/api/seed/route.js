import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const DEFAULT_SECTIONS = [
  {
    type: 'hero',
    order: 0,
    props: {
      tagline: 'Every chapter of life deserves a <em>song</em>.',
      subtitle: "Country & Americana storytelling for women who've lived, loved, lost, and kept choosing themselves. Leave the porch light on.",
      backgroundImage: '',
    },
  },
  {
    type: 'porchLight',
    order: 1,
    props: {
      quote: 'Leave the porch light on.',
      subtitle: 'The Ane Wilder North Star',
    },
  },
  {
    type: 'story',
    order: 2,
    props: {
      title: 'The Artist Behind the Name',
      image: '',
      paragraphs: [
        "Ane Wilder is a digital storytelling artist creating country and Americana music rooted in real life — the messy, beautiful, heartbreaking kind. Her songs are letters to the women who've been through it and came out softer, not harder.",
        'She believes every chapter deserves a song: the front porch mornings, the 2am doubts, the slow walks home, the courage to begin again.',
      ],
      signature: '— Timeless. Feminine. Authentic. Comforting. Country. Literary. You.',
    },
  },
  {
    type: 'gallery',
    order: 3,
    props: {
      title: 'The Visual World of Ane Wilder',
      subtitle: 'Warm mornings, honest pages, golden fields.',
      images: [],
    },
  },
  {
    type: 'values',
    order: 4,
    props: {
      title: 'What She Stands For',
      subtitle: 'Six words that guide every song, every story, every page.',
      items: [
        { icon: '🕰️', title: 'Timeless', description: 'Songs that sound like they have always existed.' },
        { icon: '🌸', title: 'Feminine', description: 'Unapologetically soft. Strength in vulnerability.' },
        { icon: '📖', title: 'Authentic', description: 'Real stories, real feelings, no performance.' },
        { icon: '☕', title: 'Comforting', description: 'Like a warm mug and a porch light left on.' },
        { icon: '🏡', title: 'Country', description: 'Roots in the land, the porch, the fields.' },
        { icon: '✒️', title: 'Literary', description: 'Lyrics worth reading like prose.' },
      ],
    },
  },
  {
    type: 'musicSplit',
    order: 5,
    props: {
      title: 'The Journal Project',
      image: '',
      paragraphs: [
        'Every song starts as a scribble in a journal. Real thoughts, unfiltered, written at kitchen tables and on front porches.',
        'Each chapter of the Ane Wilder story comes with journal prompts, letters, and reflections.',
      ],
      cta: 'Start Your Chapter',
    },
  },
  {
    type: 'musicSplit',
    order: 6,
    props: {
      title: 'Music With Roots',
      image: '',
      paragraphs: [
        'Country and Americana songs that do not pretend the hard parts do not exist.',
        'From the porch light ballads to the driving dirt-road anthems.',
      ],
      cta: 'Listen In',
    },
  },
  {
    type: 'musicSplit',
    order: 7,
    props: {
      title: 'The Digital House',
      image: '',
      paragraphs: [
        'Ane Wilder digital home is designed to feel like a house — warm, lived-in, with different rooms.',
        'Every corner built to make women feel seen, heard, and less alone.',
      ],
      cta: 'Step Inside',
    },
  },
  {
    type: 'musicFeature',
    order: 8,
    props: {
      title: 'Songs for Every Chapter',
      image: '',
      paragraphs: [
        'Ane Wilder music lives at the intersection of country storytelling and Americana warmth.',
        'Production that feels like a room, not a studio. Lyrics worth reading on paper.',
      ],
      cta: 'Hear the First Single',
    },
  },
  {
    type: 'letters',
    order: 9,
    props: {
      title: 'Letters from the Porch',
      subtitle: 'The community writes back.',
      items: [
        { quote: '"I played Porch Light three times on the drive home."', author: '— Sarah M., Nashville' },
        { quote: '"The first country album that felt like it was written for women like me."', author: '— Joanne K., Austin' },
        { quote: '"The journal prompts changed how I process things."', author: '— Deb R., Asheville' },
      ],
    },
  },
  {
    type: 'contact',
    order: 10,
    props: {
      title: 'Leave the Porch Light On',
      subtitle: 'Join the community. Get first listens, journal prompts, and letters from Ane.',
      backgroundImage: '',
    },
  },
]

export async function POST() {
  try {
    const count = await prisma.section.count()
    if (count > 0) {
      return NextResponse.json({ message: 'Sections already exist, skipping seed' })
    }

    for (const section of DEFAULT_SECTIONS) {
      await prisma.section.create({ data: section })
    }

    return NextResponse.json({ success: true, count: DEFAULT_SECTIONS.length })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

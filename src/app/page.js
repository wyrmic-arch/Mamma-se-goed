import prisma from '@/lib/prisma'
import HeroSection from '@/components/sections/HeroSection'
import PorchLightSection from '@/components/sections/PorchLightSection'
import StorySection from '@/components/sections/StorySection'
import GallerySection from '@/components/sections/GallerySection'
import ValuesSection from '@/components/sections/ValuesSection'
import MusicSplitSection from '@/components/sections/MusicSplitSection'
import MusicFeatureSection from '@/components/sections/MusicFeatureSection'
import LettersSection from '@/components/sections/LettersSection'
import ContactSection from '@/components/sections/ContactSection'

const renderers = {
  hero: HeroSection,
  porchLight: PorchLightSection,
  story: StorySection,
  gallery: GallerySection,
  values: ValuesSection,
  musicSplit: MusicSplitSection,
  musicFeature: MusicFeatureSection,
  letters: LettersSection,
  contact: ContactSection,
}

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let sections = []
  try {
    sections = await prisma.section.findMany({ where: { pageId: 'home' }, orderBy: { order: 'asc' } })
  } catch {}

  if (sections.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1EBE0', flexDirection: 'column', gap: 16 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: '#4F4A48' }}>Ane Wilder</h1>
        <p style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.1rem', color: '#B3A497', fontStyle: 'italic' }}>No content yet. Visit the admin panel to add sections.</p>
        <a href="/admin" className="btn btn-primary" style={{ marginTop: 16 }}>Go to Admin</a>
      </div>
    )
  }

  let splitIndex = 0

  return sections.map(section => {
    if (section.type === 'musicSplit') {
      const idx = splitIndex++
      return <MusicSplitSection key={section.id} props={section.props} index={idx} />
    }
    const Renderer = renderers[section.type]
    if (!Renderer) return null
    return <Renderer key={section.id} props={section.props} />
  })
}

import { Mandala, PatternDots } from '@/components/decor/Decorative'

export default function PageHero({ label, title, subtitle }) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16"
      style={{ background: 'linear-gradient(180deg, #450013 0%, #2E0A12 55%, #1C0E04 100%)' }}>
      <PatternDots />
      <Mandala className="absolute -right-32 -top-24 w-96 h-96 opacity-10 pointer-events-none" />
      <Mandala className="absolute -left-32 bottom-0 w-72 h-72 opacity-[0.06] pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="section-label mb-4 justify-center" style={{ color: '#E8C060' }}>{label}</span>
        <h1 className="font-serif text-white mb-4 leading-tight" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}>{title}</h1>
        {subtitle && <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>{subtitle}</p>}
      </div>
    </section>
  )
}

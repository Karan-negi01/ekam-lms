import Link from 'next/link'
import { Mandala, PatternDots } from '@/components/decor/Decorative'

export default function AuthSidePanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between relative overflow-hidden p-12 w-full"
      style={{ background: 'linear-gradient(145deg, #1C0E04 0%, #2E1A0A 100%)' }}>
      <PatternDots />
      <Mandala className="absolute -right-24 -bottom-24 w-96 h-96 opacity-15 pointer-events-none" />
      <Mandala className="absolute -left-32 -top-32 w-72 h-72 opacity-10 pointer-events-none" />

      <Link href="/" className="relative z-10 inline-flex items-center gap-3 w-fit group">
        <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
          <span className="text-white font-display font-bold text-xl">ए</span>
        </div>
        <div>
          <p className="font-display text-xl font-semibold tracking-widest text-white">EKAM</p>
          <p className="text-[10px] tracking-[0.25em] opacity-70" style={{ color: '#D4A843' }}>एकम्</p>
        </div>
      </Link>

      <div className="relative z-10">
        <p className="font-display text-lg tracking-[0.15em] mb-4" style={{ color: '#D4A843' }}>सा विद्या या विमुक्तये</p>
        <h2 className="font-serif text-3xl font-semibold text-white leading-snug mb-4">
          That which liberates,<br />is true knowledge.
        </h2>
        <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Join a community preserving India&apos;s living traditions — classical music, dance, yoga, Sanskrit and sacred arts — passed down through an unbroken lineage of masters.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-4">
        {[['85,000+', 'Students'], ['320+', 'Instructors'], ['1,200+', 'Courses']].map(([v, l], i) => (
          <div key={i}>
            <p className="text-xl font-bold font-serif" style={{ color: '#D4A843' }}>{v}</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{l}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

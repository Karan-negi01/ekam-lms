import { MapPin, Clock, ArrowRight, Heart, Users2, Sparkles, TrendingUp } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'

const perks = [
  { icon: Heart, title: 'Mission You\'ll Believe In', desc: 'Work on something that genuinely matters to millions of families.' },
  { icon: Users2, title: 'Close-Knit Team', desc: 'Small, senior team — your work ships and gets seen, not lost in process.' },
  { icon: Sparkles, title: 'Learn Any Course Free', desc: 'Every employee gets free access to every course on the platform.' },
  { icon: TrendingUp, title: 'Real Ownership', desc: 'Early-stage equity for every full-time hire, not just leadership.' },
]

const openings = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering', location: 'Remote (India)', type: 'Full-time' },
  { title: 'Instructor Success Manager', dept: 'Operations', location: 'New Delhi', type: 'Full-time' },
  { title: 'Video Production Editor', dept: 'Content', location: 'Remote', type: 'Contract' },
  { title: 'Growth Marketing Lead', dept: 'Marketing', location: 'Mumbai / Remote', type: 'Full-time' },
]

export default function CareersPage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <PageHero
        label="Careers"
        title="Help Us Keep a Tradition Alive"
        subtitle="We're a small team building the infrastructure for India's classical arts to reach the next generation."
      />

      {/* Perks */}
      <section className="py-24 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Why Ekam</span>
            <h2 className="section-title text-4xl md:text-5xl">Working Here</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((p, i) => (
              <div key={i} className="rounded-2xl p-6 text-center" style={{ background: '#FFFFFF', border: '1px solid #EDE4D8' }}>
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(140,98,16,0.08)' }}>
                  <p.icon size={20} className="text-ekam-gold" />
                </div>
                <h3 className="text-base font-semibold mb-1.5" style={{ color: '#1C0E04' }}>{p.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#7A6550' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="py-24 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Join Us</span>
            <h2 className="section-title text-4xl md:text-5xl">Open Positions</h2>
          </div>
          <div className="space-y-3">
            {openings.map((role, i) => (
              <a key={i} href={`mailto:careers@ekam.in?subject=${encodeURIComponent('Application: ' + role.title)}`}
                className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-6 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-0.5"
                style={{ border: '1px solid #EDE4D8' }}>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1" style={{ color: '#1C0E04' }}>{role.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs" style={{ color: '#7A6550' }}>
                    <span className="badge badge-gold text-[10px]">{role.dept}</span>
                    <span className="flex items-center gap-1"><MapPin size={11} /> {role.location}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {role.type}</span>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-ekam-gold flex-shrink-0 transition-all group-hover:gap-2.5">
                  Apply <ArrowRight size={14} />
                </span>
              </a>
            ))}
          </div>
          <p className="text-center text-sm mt-10" style={{ color: '#7A6550' }}>
            Don&apos;t see the right role? Write to us anyway at{' '}
            <a href="mailto:careers@ekam.in" className="text-ekam-gold hover:text-ekam-gold-light font-medium">careers@ekam.in</a>
          </p>
        </div>
      </section>
    </div>
  )
}

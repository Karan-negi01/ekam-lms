import Link from 'next/link'
import { ArrowRight, Heart, ShieldCheck, Globe2, Sparkles } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { Mandala } from '@/components/decor/Decorative'

const values = [
  { icon: ShieldCheck, title: 'Authenticity First', desc: 'Every instructor is vetted for lineage and training. We never compromise the integrity of a tradition for convenience.' },
  { icon: Heart, title: 'Guru-Shishya Spirit', desc: 'We build tools around the relationship between teacher and student, not the other way around.' },
  { icon: Globe2, title: 'Access Without Borders', desc: 'A student in Toronto and a student in Thanjavur should have the same access to a living master.' },
  { icon: Sparkles, title: 'Preserve, Don’t Freeze', desc: 'Traditions are living things. We support instructors who teach the classical form with room to breathe.' },
]

const timeline = [
  { year: '2021', text: 'Ekam begins as a WhatsApp group connecting three Hindustani classical teachers with students abroad.' },
  { year: '2022', text: 'First 50 courses recorded and structured into a proper curriculum, spanning music and dance.' },
  { year: '2023', text: 'Yoga, Sanskrit and Vedic studies join the platform; instructor verification process formalized.' },
  { year: '2024', text: 'Crossed 50,000 students; introduced regional language support across Hindi, Tamil and Telugu.' },
  { year: '2025', text: 'Madhubani art, traditional cooking and craft added — eight living traditions, one platform.' },
]

export default function AboutPage() {
  return (
    <div style={{ background: '#FDFAF4' }}>
      <PageHero
        label="Our Story"
        title="Preserving India's Living Traditions"
        subtitle="Ekam exists because a generation of extraordinary teachers had no way to reach students beyond their own city."
      />

      {/* Mission */}
      <section className="py-24 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label mb-4 block justify-center">Our Mission</span>
          <h2 className="section-title text-3xl md:text-4xl mb-6">
            Every classical art form deserves a next generation of students.
          </h2>
          <p className="text-base leading-relaxed" style={{ color: '#6B5744', lineHeight: '1.8' }}>
            India is home to thousands of years of accumulated wisdom in music, dance, yoga, language and craft —
            carried forward not through books, but through direct transmission from teacher to student. As families
            scattered across cities and continents, that chain of transmission started breaking. Ekam was built to
            repair it: to give verified masters a way to teach beyond their own neighbourhood, and to give students
            anywhere in the world honest, structured access to a real lineage — not a diluted version of one.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-4" style={{ background: '#FAF5ED' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">What We Stand For</span>
            <h2 className="section-title text-4xl md:text-5xl">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div key={i} className="rounded-2xl p-7 bg-white flex items-start gap-4" style={{ border: '1px solid #EDE4D8' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(140,98,16,0.08)' }}>
                  <v.icon size={22} className="text-ekam-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold mb-1.5" style={{ color: '#1C0E04' }}>{v.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#7A6550' }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Our Journey</span>
            <h2 className="section-title text-4xl md:text-5xl">From a WhatsApp Group to a Platform</h2>
          </div>
          <div className="space-y-0">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-6 pb-10 relative">
                {i < timeline.length - 1 && (
                  <div className="absolute left-[27px] top-10 bottom-0 w-px" style={{ background: '#EDE4D8' }} />
                )}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 font-serif text-sm font-bold z-10"
                  style={{ background: 'rgba(140,98,16,0.08)', color: '#8C6210' }}>
                  {t.year}
                </div>
                <p className="text-sm leading-relaxed pt-3.5" style={{ color: '#4A3820' }}>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="py-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1C0E04 0%, #2E1A0A 50%, #1C0E04 100%)' }}>
        <Mandala className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-display text-2xl tracking-[0.3em] mb-8" style={{ color: '#C4881A' }}>एकम्</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[['85,000+', 'Students'], ['320+', 'Verified Masters'], ['1,200+', 'Courses'], ['8', 'Traditions']].map(([v, l], i) => (
              <div key={i}>
                <p className="text-3xl font-bold font-serif text-white mb-1">{v}</p>
                <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{l}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/courses" className="btn-gold text-sm px-7 py-3.5">Explore Courses <ArrowRight size={16} /></Link>
            <Link href="/auth/signup?role=instructor"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{ border: '1.5px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.9)' }}>
              Teach on Ekam
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

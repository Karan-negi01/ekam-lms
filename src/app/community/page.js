import Link from 'next/link'
import { MessageCircle, Calendar, Users, Star, ArrowRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { testimonials, instructors } from '@/lib/data'
import { formatNumber } from '@/lib/utils'

const events = [
  { date: '18 Jul', title: 'Live Q&A: Ragas for Beginners', host: 'Pandit Ravishankar Mishra', type: 'Live Session' },
  { date: '25 Jul', title: 'Bharatanatyam Adavu Practice Circle', host: 'Guru Meenakshi Sundaram', type: 'Practice Circle' },
  { date: '2 Aug', title: 'Monthly Ekam Community Meetup', host: 'Ekam Team', type: 'Meetup' },
]

export default function CommunityPage() {
  return (
    <div style={{ background: '#FDFAF4' }}>
      <PageHero
        label="Together"
        title="A Community of Learners & Masters"
        subtitle="85,000+ students, hundreds of instructors, one shared love for India's living traditions."
      />

      {/* Join channels */}
      <section className="py-24 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Join the Conversation</span>
            <h2 className="section-title text-4xl md:text-5xl">Where Students Connect</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: MessageCircle, title: 'Discussion Forum', desc: 'Ask questions, share practice recordings and get feedback from fellow students in every tradition.' },
              { icon: Users, title: 'WhatsApp Circles', desc: 'Small, tradition-specific groups moderated by instructors — for daily riyaz reminders and quick doubts.' },
              { icon: Calendar, title: 'Live Sessions', desc: 'Monthly live Q&As and practice circles hosted directly by Ekam instructors.' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl p-7 text-center" style={{ background: '#FAF5ED', border: '1px solid #EDE4D8' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(140,98,16,0.08)' }}>
                  <c.icon size={22} className="text-ekam-gold" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2" style={{ color: '#1C0E04' }}>{c.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#7A6550' }}>{c.desc}</p>
                <Link href="/auth/signup" className="text-xs font-semibold text-ekam-gold hover:text-ekam-gold-light inline-flex items-center gap-1">
                  Join Free <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="py-24 px-4" style={{ background: '#FAF5ED' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Calendar</span>
            <h2 className="section-title text-4xl md:text-5xl">Upcoming Events</h2>
          </div>
          <div className="space-y-3">
            {events.map((e, i) => (
              <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-white" style={{ border: '1px solid #EDE4D8' }}>
                <div className="w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0" style={{ background: 'rgba(140,98,16,0.08)' }}>
                  <span className="text-xs font-bold text-ekam-gold">{e.date.split(' ')[0]}</span>
                  <span className="text-[10px] text-ekam-muted uppercase">{e.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif font-semibold text-sm" style={{ color: '#1C0E04' }}>{e.title}</p>
                  <p className="text-xs" style={{ color: '#7A6550' }}>Hosted by {e.host}</p>
                </div>
                <span className="badge badge-gold text-[10px] flex-shrink-0">{e.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="py-24 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Voices</span>
            <h2 className="section-title text-4xl md:text-5xl">From Our Community</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <div key={t.id} className="card-elevated p-7">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={13} className={s <= t.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-200'} />)}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: '#4A3820' }}>{t.text}</p>
                <div className="flex items-center gap-3 pt-5" style={{ borderTop: '1px solid #EDE4D8' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1C0E04' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#7A6550' }}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

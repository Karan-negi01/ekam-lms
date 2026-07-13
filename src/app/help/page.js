'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, Compass, CreditCard, PlayCircle, UserCog, Mail, MessageCircle } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'

const topics = [
  {
    id: 'getting-started', icon: Compass, label: 'Getting Started',
    faqs: [
      { q: 'How do I create an Ekam account?', a: 'Click "Join Ekam" in the top navigation, choose Student or Instructor, and fill in your details. You can also use one of the demo login buttons to explore instantly.' },
      { q: 'Is there a mobile app?', a: 'Not yet — Ekam is fully responsive and works well in any mobile browser, and a dedicated app is on our roadmap.' },
      { q: 'Which languages are courses taught in?', a: 'Most courses are in Hindi and English, with several also available in Sanskrit and regional languages depending on the instructor.' },
    ],
  },
  {
    id: 'payments', icon: CreditCard, label: 'Payments & Pricing',
    faqs: [
      { q: 'What payment methods are accepted?', a: 'This is a demo build without live payments integrated yet — enrollment currently works instantly without a real transaction.' },
      { q: 'Can I get a refund?', a: 'Yes, see our Refund Policy for the full window and conditions.' },
      { q: 'Do prices include taxes?', a: 'Listed prices are shown in INR and are the final price a student pays.' },
    ],
  },
  {
    id: 'courses', icon: PlayCircle, label: 'Courses & Learning',
    faqs: [
      { q: 'Do I get lifetime access after enrolling?', a: 'Yes — once enrolled, you can watch, rewatch and revisit every lesson at your own pace, with no expiry.' },
      { q: 'What if a course has downloadable material?', a: 'Instructors can attach PDF study material either for the whole course or per lesson — you\'ll see a download icon next to unlocked lessons.' },
      { q: 'How do I track my progress?', a: 'Open any enrolled course and check the progress bar on the Curriculum tab, or visit My Learning for an overview of every course.' },
    ],
  },
  {
    id: 'account', icon: UserCog, label: 'Account & Instructors',
    faqs: [
      { q: 'How do I become an instructor?', a: 'Sign up with an Instructor account, then use "Create Course" on your dashboard. Our team reviews every submission before it goes live.' },
      { q: 'How is instructor commission decided?', a: 'Admin sets a commission rate individually for each course during review, based on category and reach — you\'ll be notified of the exact rate once approved.' },
      { q: 'Can I change my account email?', a: 'Email changes aren\'t self-serve yet in this build — reach out via Contact Support below.' },
    ],
  },
]

function TopicFaq({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-xl overflow-hidden bg-white" style={{ border: '1px solid #EDE4D8' }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left">
        <span className="text-sm font-medium" style={{ color: '#1C0E04' }}>{item.q}</span>
        <ChevronDown size={15} className="text-ekam-gold flex-shrink-0 transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>
      {isOpen && <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: '#7A6550' }}>{item.a}</div>}
    </div>
  )
}

export default function HelpPage() {
  const [query, setQuery] = useState('')
  const [activeTopic, setActiveTopic] = useState('getting-started')
  const [openFaq, setOpenFaq] = useState(null)

  const current = topics.find(t => t.id === activeTopic)
  const visibleFaqs = query
    ? topics.flatMap(t => t.faqs.filter(f => f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase())))
    : current.faqs

  return (
    <div style={{ background: '#FDFAF4' }}>
      <PageHero label="Support" title="How Can We Help?" subtitle="Search common questions or browse by topic below." />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="relative rounded-xl overflow-hidden bg-white mb-10" style={{ border: '1.5px solid #E2D5C4' }}>
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ekam-muted" />
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search for answers..." className="w-full pl-11 pr-4 py-3.5 bg-transparent text-sm outline-none" style={{ color: '#1C0E04' }} />
        </div>

        {!query && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            {topics.map(t => (
              <button key={t.id} onClick={() => { setActiveTopic(t.id); setOpenFaq(null) }}
                className="rounded-2xl p-4 text-center transition-all"
                style={{
                  background: activeTopic === t.id ? 'rgba(140,98,16,0.08)' : 'white',
                  border: '1.5px solid ' + (activeTopic === t.id ? 'rgba(140,98,16,0.4)' : '#EDE4D8'),
                }}>
                <t.icon size={20} className="mx-auto mb-2 text-ekam-gold" />
                <p className="text-xs font-medium" style={{ color: activeTopic === t.id ? '#8C6210' : '#4A3820' }}>{t.label}</p>
              </button>
            ))}
          </div>
        )}

        <div className="space-y-3 mb-14">
          {visibleFaqs.length === 0 ? (
            <p className="text-center text-sm text-ekam-muted py-10">No results for &ldquo;{query}&rdquo;. Try a different search.</p>
          ) : (
            visibleFaqs.map((item, i) => (
              <TopicFaq key={i} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))
          )}
        </div>

        {/* Contact support */}
        <div className="rounded-2xl p-8 text-center" style={{ background: '#FAF5ED', border: '1px solid #EDE4D8' }}>
          <h3 className="font-serif text-xl font-semibold mb-2" style={{ color: '#1C0E04' }}>Still need help?</h3>
          <p className="text-sm mb-6" style={{ color: '#7A6550' }}>Our support team typically responds within one business day.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="mailto:contact@ekam.in" className="btn-gold text-sm"><Mail size={15} /> Email Support</a>
            <Link href="/community" className="btn-outline text-sm"><MessageCircle size={15} /> Ask the Community</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, ChevronRight, ChevronDown, CheckCircle2, Users, BookOpen, GraduationCap, Globe, Search, PlayCircle, Award } from 'lucide-react'
import CourseCard from '@/components/courses/CourseCard'
import CategoryIcon from '@/components/icons/CategoryIcon'
import { Mandala, PatternDots } from '@/components/decor/Decorative'
import { courses, categories, instructors, stats, testimonials } from '@/lib/data'
import { formatNumber, getPublishedUserCourses } from '@/lib/utils'

const statIcons = {
  'Active Students': Users,
  'Expert Instructors': GraduationCap,
  'Courses Available': BookOpen,
  'Languages': Globe,
}

const faqs = [
  {
    q: 'Do I need any prior experience to start?',
    a: 'Not at all. Every course is tagged by level — Beginner, Intermediate or Advanced — and most traditions offer a dedicated beginner track that starts from the very basics.',
  },
  {
    q: 'Can I learn at my own pace?',
    a: 'Yes. Once enrolled, you get lifetime access to watch, rewatch and revisit lessons whenever you like — there are no deadlines or live-class requirements.',
  },
  {
    q: 'What languages are the courses available in?',
    a: 'Most courses are taught in a mix of Hindi and English, with several also available in regional languages and Sanskrit depending on the tradition.',
  },
  {
    q: 'How do I become an instructor on Ekam?',
    a: 'Sign up with an instructor account, then create your course from your dashboard. Our team reviews every submission for authenticity before it goes live, usually within 48 hours.',
  },
  {
    q: 'Is there a certificate after completion?',
    a: 'Yes, every course awards a certificate of completion once you finish all lessons — recognized by the cultural institutions Ekam partners with.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-2xl overflow-hidden bg-white" style={{ border: '1px solid #EDE4D8' }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="font-serif text-base font-medium" style={{ color: '#1C0E04' }}>{item.q}</span>
        <ChevronDown size={16} className="text-ekam-gold flex-shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#7A6550' }}>
          {item.a}
        </div>
      )}
    </div>
  )
}

export default function HomePage() {
  const featuredCourses = courses.filter(c => c.featured)
  const [newInstructorCourses, setNewInstructorCourses] = useState([])
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    const published = getPublishedUserCourses()
    setNewInstructorCourses(
      [...published].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4)
    )
  }, [])

  return (
    <div style={{ background: '#FDFAF4' }}>

      {/* ════════════════════════════════
           HERO — immersive dark, flows from navbar
      ════════════════════════════════ */}
      <section className="relative overflow-hidden pt-32 pb-20"
        style={{ background: 'linear-gradient(180deg, #450013 0%, #2E0A12 40%, #1C0E04 100%)' }}>
        <PatternDots />
        <Mandala className="absolute left-1/2 top-10 -translate-x-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center animate-fadeUp">
          <span className="section-label mb-6 justify-center" style={{ color: '#E8C060' }}>India&apos;s Premier Cultural Platform</span>

          <p className="font-display text-base tracking-[0.3em] mb-6 opacity-90" style={{ color: '#D4A843' }}>
            ॥ विद्या विनयेन शोभते ॥
          </p>

          <h1 className="font-serif leading-[0.95] mb-6 text-white"
            style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)' }}>
            Discover the <span className="italic" style={{ color: '#E8C060' }}>Soul</span><br />of India
          </h1>

          <p className="text-base leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Learn from India&apos;s most celebrated maestros — classical music, Bharatanatyam, Ashtanga Yoga, Sanskrit, Madhubani art and Vedic wisdom. All in one place.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-14">
            <Link href="/courses" className="btn-gold text-sm px-7 py-3.5">
              Explore Courses <ArrowRight size={16} />
            </Link>
            <Link href="/auth/signup?role=instructor"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{ border: '1.5px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.9)' }}>
              Teach on Ekam
            </Link>
          </div>

          {/* Quick category chips */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <Link key={cat.id} href={`/courses?cat=${cat.id}`}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.75)' }}>
                <CategoryIcon id={cat.id} size={13} />
                {cat.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats band */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s, i) => {
              const Icon = statIcons[s.label] || Users
              return (
                <div key={i} className="rounded-2xl px-4 py-5 text-center"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                  <Icon size={18} className="mx-auto mb-2" style={{ color: '#D4A843' }} />
                  <p className="text-lg font-bold font-serif text-white">{s.value}</p>
                  <p className="text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           HOW IT WORKS
      ════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: '#FAF5ED' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Getting Started</span>
            <h2 className="section-title text-4xl md:text-5xl mb-4">How Ekam Works</h2>
            <p className="max-w-md mx-auto text-base" style={{ color: '#6B5744' }}>
              Three simple steps between you and a living tradition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {[
              { step: '01', icon: Search, title: 'Browse & Choose', desc: 'Explore 1,200+ courses across 8 living traditions and find the art form that speaks to you.' },
              { step: '02', icon: PlayCircle, title: 'Learn from Masters', desc: 'Watch structured video lessons from verified gurus, at your own pace, with lifetime access.' },
              { step: '03', icon: Award, title: 'Practice & Get Certified', desc: 'Track your progress, complete the curriculum, and earn a recognized certificate of completion.' },
            ].map((item, i) => (
              <div key={i} className="relative rounded-2xl p-8 bg-white" style={{ border: '1px solid #EDE4D8' }}>
                <span className="font-serif text-5xl font-semibold block mb-4" style={{ color: 'rgba(140,98,16,0.15)' }}>{item.step}</span>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(140,98,16,0.08)' }}>
                  <item.icon size={22} className="text-ekam-gold" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2" style={{ color: '#1C0E04' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7A6550' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           CATEGORIES
      ════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Traditions</span>
            <h2 className="section-title text-4xl md:text-5xl mb-4">Explore by Art Form</h2>
            <p className="max-w-md mx-auto text-base" style={{ color: '#6B5744' }}>
              Eight living traditions, thousands of years of wisdom.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:auto-rows-[190px]" style={{ gridAutoFlow: 'dense' }}>
            {categories.map(cat => {
              const featured = cat.id === 'yoga'
              return (
                <Link key={cat.id} href={`/courses?cat=${cat.id}`}
                  className={`group relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-white flex flex-col justify-between ${
                    featured ? 'sm:col-span-2 sm:row-span-2' : ''
                  }`}
                  style={{ border: '1px solid #EDE4D8' }}>
                  {featured && (
                    <CategoryIcon id={cat.id} size={180} className="absolute -right-8 -bottom-8 text-ekam-gold opacity-[0.06] pointer-events-none" />
                  )}
                  <div className="relative z-10">
                    <div className={`rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                      featured ? 'w-16 h-16' : 'w-12 h-12'
                    }`} style={{ background: 'rgba(140,98,16,0.08)' }}>
                      <CategoryIcon id={cat.id} size={featured ? 30 : 22} className="text-ekam-gold" />
                    </div>
                    <h3 className={`font-serif font-semibold mb-1 ${featured ? 'text-2xl' : 'text-base'}`} style={{ color: '#1C0E04' }}>
                      {cat.label}
                    </h3>
                    <p className={featured ? 'text-sm mb-2 max-w-[240px]' : 'text-xs mb-3'} style={{ color: '#7A6550' }}>{cat.description}</p>
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[11px] font-semibold text-ekam-gold">{cat.count} courses</span>
                    <ChevronRight size={14} className="text-ekam-gold transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left bg-ekam-gold" />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           FEATURED COURSES
      ════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: '#FAF5ED' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="section-label mb-4 block">Featured</span>
              <h2 className="section-title text-4xl md:text-5xl mb-3">Courses by Masters</h2>
              <p style={{ color: '#6B5744' }}>Handpicked by the Ekam curation team</p>
            </div>
            <Link href="/courses" className="btn-outline self-start md:self-auto whitespace-nowrap">
              View All <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredCourses.map(course => <CourseCard key={course.id} course={course} />)}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           FRESH FROM OUR INSTRUCTORS
      ════════════════════════════════ */}
      {newInstructorCourses.length > 0 && (
        <section className="py-24 px-4" style={{ background: '#FFFFFF' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="section-label mb-4 block">Just Published</span>
                <h2 className="section-title text-4xl md:text-5xl mb-3">Fresh From Our Instructors</h2>
                <p style={{ color: '#6B5744' }}>Newly approved courses from Ekam&apos;s teaching community</p>
              </div>
              <Link href="/courses" className="btn-outline self-start md:self-auto whitespace-nowrap">
                View All <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {newInstructorCourses.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════
           WHY EKAM — split banner
      ════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2"
            style={{ border: '1px solid #E8DDD0', boxShadow: '0 8px 48px rgba(139,94,10,0.08)' }}>

            {/* Left: Dark cultural panel */}
            <div className="relative p-10 md:p-14 overflow-hidden flex flex-col justify-between"
              style={{ background: 'linear-gradient(145deg, #1C0E04 0%, #2E1A0A 100%)' }}>
              <PatternDots />
              <Mandala className="absolute -right-16 -bottom-16 w-64 h-64 opacity-20" />
              <div className="relative z-10">
                <p className="font-display text-3xl tracking-[0.3em] mb-3" style={{ color: '#C4881A' }}>एकम्</p>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4 leading-snug">
                  One Platform,<br />Infinite Traditions
                </h2>
                <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Ekam bridges the sacred and the accessible — every course carries the authenticity of an unbroken lineage.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { v: '1,200+', l: 'Courses' },
                    { v: '320+', l: 'Verified Masters' },
                    { v: '85k+', l: 'Students' },
                    { v: '24+', l: 'Languages' },
                  ].map((s, i) => (
                    <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <p className="text-xl font-bold font-serif" style={{ color: '#D4A843' }}>{s.v}</p>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Benefits list */}
            <div className="p-10 md:p-14 bg-white flex flex-col justify-center">
              <span className="section-label mb-6 block">Why Choose Ekam</span>
              <div className="space-y-6">
                {[
                  { icon: '🎓', title: 'Guru-Shishya Tradition', desc: 'Every instructor is vetted — trained in traditional gurukul or recognized cultural institutions.' },
                  { icon: '🌐', title: 'Learn in Your Language', desc: 'Courses available in Hindi, Sanskrit, regional languages, and English.' },
                  { icon: '📱', title: 'Lifetime Access', desc: 'Learn at your own pace. Your courses are yours forever — watch, rewatch, master.' },
                  { icon: '🏆', title: 'Recognized Certificates', desc: 'Completion certificates acknowledged by cultural institutions across India.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background: 'rgba(140,98,16,0.08)', border: '1px solid rgba(140,98,16,0.12)' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1" style={{ color: '#1C0E04' }}>{item.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: '#7A6550' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <Link href="/courses" className="btn-gold text-sm">Browse Courses</Link>
                <Link href="/auth/signup" className="btn-outline text-sm">Join Free</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           INSTRUCTORS
      ════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: '#FAF5ED' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Maestros</span>
            <h2 className="section-title text-4xl md:text-5xl mb-4">Learn from the Best</h2>
            <p style={{ color: '#6B5744' }}>Custodians of living traditions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Featured maestro — spotlight panel */}
            <div className="lg:col-span-2 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-end"
              style={{ background: 'linear-gradient(145deg, #1C0E04 0%, #2E1A0A 100%)', minHeight: '400px' }}>
              <Mandala className="absolute -right-16 -top-16 w-64 h-64 opacity-15 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-4"
                  style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
                  {instructors[0].initials}
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-2xl font-semibold text-white">{instructors[0].name}</h3>
                  {instructors[0].verified && <CheckCircle2 size={16} style={{ color: '#D4A843' }} />}
                </div>
                <p className="text-sm mb-3" style={{ color: '#D4A843' }}>{instructors[0].title}</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>{instructors[0].bio}</p>
                <div className="flex items-center gap-4 text-xs mb-5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" />{instructors[0].rating}</span>
                  <span>{formatNumber(instructors[0].students)} students</span>
                  <span>{instructors[0].courses} courses</span>
                </div>
                <Link href={`/courses?instructor=${instructors[0].id}`} className="btn-gold text-sm">
                  View Courses <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Rest — compact list rows */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              {instructors.slice(1, 6).map(inst => (
                <Link key={inst.id} href={`/courses?instructor=${inst.id}`}
                  className="group flex items-center gap-4 p-4 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-0.5"
                  style={{ border: '1px solid #EDE4D8' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                    {inst.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-serif font-semibold text-sm truncate" style={{ color: '#1C0E04' }}>{inst.name}</h4>
                      {inst.verified && <CheckCircle2 size={12} className="flex-shrink-0" style={{ color: '#8C6210' }} />}
                    </div>
                    <p className="text-xs truncate" style={{ color: '#8C6210' }}>{inst.title}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-xs flex-shrink-0" style={{ color: '#7A6550' }}>
                    <span className="flex items-center gap-1"><Star size={11} className="fill-amber-500 text-amber-500" />{inst.rating}</span>
                    <span>{formatNumber(inst.students)}</span>
                  </div>
                  <ChevronRight size={15} className="text-ekam-gold flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/instructors" className="btn-outline">Meet All Instructors <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           TESTIMONIALS
      ════════════════════════════════ */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ background: '#FFFFFF' }}>
        <Mandala className="absolute -right-24 top-0 w-80 h-80 opacity-25 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Stories</span>
            <h2 className="section-title text-4xl md:text-5xl mb-4">Voices of Transformation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, idx) => (
              <div key={t.id} className="card-elevated p-7 flex flex-col relative"
                style={idx === 1 ? { background: 'linear-gradient(145deg, #1C0E04, #2E1A0A)', border: '1px solid rgba(196,136,26,0.2)' } : {}}>
                {/* Big quote mark */}
                <div className="font-serif text-7xl leading-none mb-4 select-none"
                  style={{ color: idx === 1 ? 'rgba(196,136,26,0.25)' : 'rgba(140,98,16,0.10)', lineHeight: '0.8' }}>
                  &ldquo;
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={13} className={s <= t.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-200'} />
                  ))}
                </div>

                <p className="text-sm leading-relaxed flex-1 mb-6 italic"
                  style={{ color: idx === 1 ? 'rgba(255,255,255,0.75)' : '#4A3820' }}>
                  {t.text}
                </p>

                <div className="flex items-center gap-3 pt-5"
                  style={{ borderTop: `1px solid ${idx === 1 ? 'rgba(255,255,255,0.08)' : '#EDE4D8'}` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: idx === 1 ? '#FFFFFF' : '#1C0E04' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: idx === 1 ? 'rgba(255,255,255,0.45)' : '#7A6550' }}>{t.location}</p>
                    <p className="text-[11px] font-medium mt-0.5" style={{ color: idx === 1 ? '#D4A843' : '#8C6210' }}>{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           FAQ
      ════════════════════════════════ */}
      <section className="py-24 px-4" style={{ background: '#FAF5ED' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Questions</span>
            <h2 className="section-title text-4xl md:text-5xl mb-4">Frequently Asked</h2>
            <p style={{ color: '#6B5744' }}>Everything you need to know before you begin</p>
          </div>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <FaqItem key={i} item={item} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           CTA BANNER
      ════════════════════════════════ */}
      <section className="py-20 px-4 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1C0E04 0%, #2E1A0A 50%, #1C0E04 100%)' }}>
        <PatternDots />
        <Mandala className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(196,136,26,0.5), transparent)' }} />
        <div className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(196,136,26,0.5), transparent)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="font-display text-2xl tracking-[0.3em] mb-4" style={{ color: '#C4881A' }}>एकम्</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-5 leading-tight">
            Begin Your Cultural<br/>
            <span style={{ color: '#D4A843' }}>Learning Journey</span>
          </h2>
          <p className="mb-8 text-base" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Join 85,000+ students discovering the depth of India&apos;s artistic traditions. Start free, learn forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup" className="btn-gold text-base px-8 py-4 rounded-2xl">
              Start Learning Free <ArrowRight size={18} />
            </Link>
            <Link href="/auth/signup?role=instructor"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300"
              style={{ border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)' }}>
              Become an Instructor
            </Link>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.30)' }}>
            No credit card required · Free courses available · Cancel anytime
          </p>
        </div>
      </section>

    </div>
  )
}

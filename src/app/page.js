'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Star, ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, Users, BookOpen, GraduationCap, Globe, Search, PlayCircle, Award } from 'lucide-react'
import CourseCard from '@/components/courses/CourseCard'
import CourseRow from '@/components/courses/CourseRow'
import CategoryIcon from '@/components/icons/CategoryIcon'
import { courses, categories, instructors, stats, testimonials } from '@/lib/data'
import { formatNumber, formatPrice, getPublishedUserCourses } from '@/lib/utils'

const statIcons = {
  'Active Students': Users,
  'Expert Instructors': GraduationCap,
  'Courses Available': BookOpen,
  'Languages': Globe,
}

const categoryStyles = {
  music:    { bg: '#FDF1E2', icon: '#C2600F' },
  dance:    { bg: '#FCE8D8', icon: '#B8460F' },
  yoga:     { bg: '#FEF6E4', icon: '#A67C0E' },
  art:      { bg: '#FCEADC', icon: '#C4791A' },
  sanskrit: { bg: '#F7EBDD', icon: '#8A5A1E' },
  vedic:    { bg: '#FBEFD6', icon: '#B08A1C' },
  cooking:  { bg: '#FDE9DD', icon: '#C4501A' },
  craft:    { bg: '#F3E7D8', icon: '#6B4423' },
}

const stepColors = [
  { bg: '#FBF3E3', icon: '#8C6210' },
  { bg: '#FDECE7', icon: '#C44015' },
  { bg: '#FCEADC', icon: '#B8460F' },
]

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
    <div className="rounded-xl overflow-hidden bg-white" style={{ border: '1px solid #EDE4D8' }}>
      <button onClick={onToggle} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
        <span className="text-base font-semibold" style={{ color: '#171310' }}>{item.q}</span>
        <ChevronDown size={16} className="text-ekam-gold flex-shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#655D4E' }}>
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
  const heroSlides = courses.filter(c => c.bestseller).slice(0, 3)
  const [heroIdx, setHeroIdx] = useState(0)
  const heroCourse = heroSlides[heroIdx] || courses[0]

  useEffect(() => {
    const published = getPublishedUserCourses()
    setNewInstructorCourses(
      [...published].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4)
    )
  }, [])

  return (
    <div style={{ background: '#FFFFFF' }}>

      {/* ════════════════════════════════
           HERO — full-bleed promo banner, Udemy-style
      ════════════════════════════════ */}
      <section className="pt-24 pb-8 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden"
            style={{ background: 'linear-gradient(120deg, #C4791A 0%, #B8460F 55%, #8C4008 100%)' }}>

            {/* decorative blurred shapes */}
            <div className="absolute -top-24 -right-10 w-72 h-72 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.08)' }} />
            <div className="absolute -bottom-20 left-1/3 w-64 h-64 rounded-full pointer-events-none" style={{ background: 'rgba(255,255,255,0.06)' }} />

            <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,400px)_1fr] gap-8 items-center px-6 sm:px-10 lg:px-12 py-10 lg:py-14">

              {/* LEFT — white callout card */}
              <div className="bg-white rounded-2xl p-7 sm:p-8 shadow-xl animate-fadeUp">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full mb-5"
                  style={{ background: '#FBF3E3', color: '#8C6210' }}>
                  India&apos;s Premier Cultural Platform
                </span>

                <h1 className="font-sans font-extrabold tracking-tight leading-[1.08] mb-4"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', color: '#171310' }}>
                  Learn classical arts from India&apos;s <span style={{ color: '#8C6210' }}>finest masters</span>
                </h1>

                <p className="text-sm leading-relaxed mb-6" style={{ color: '#655D4E' }}>
                  Structured video courses in music, dance, yoga, Sanskrit and more — taught by verified
                  instructors, with lifetime access and a certificate at the end.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link href="/courses" className="btn-gold text-sm px-6 py-3">
                    Explore Courses <ArrowRight size={16} />
                  </Link>
                  <Link href="/auth/signup?role=instructor" className="btn-outline text-sm px-6 py-3">
                    Teach on Ekam
                  </Link>
                </div>
              </div>

              {/* RIGHT — floating course card + icon chips */}
              <div className="hidden lg:block relative h-full min-h-[300px]">
                <div className="absolute top-1/2 -translate-y-1/2 right-4 w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)' }}>
                  <Award size={26} className="text-white" />
                </div>
                <div className="absolute top-10 right-24 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)' }}>
                  <GraduationCap size={22} className="text-white" />
                </div>
                <div className="absolute bottom-10 right-36 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)' }}>
                  <PlayCircle size={22} className="text-white" />
                </div>

                <div className="relative max-w-sm mx-auto rounded-2xl overflow-hidden bg-white animate-fadeUp delay-200"
                  style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
                  <div className="relative h-44 flex items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #452007, #2E1503)' }}>
                    <CategoryIcon id={heroCourse.category} size={150} className="absolute text-white opacity-[0.08] rotate-6 scale-110" />
                    <div className="relative w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)' }}>
                      <CategoryIcon id={heroCourse.category} size={28} className="text-white" />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="badge badge-gold bg-white/95 text-[10px]">⚡ Bestseller</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 rounded-xl px-2.5 py-1">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="fill-amber-500 text-amber-500" />
                        <span className="text-xs font-bold text-amber-600">{heroCourse.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-[10px] tracking-widest text-ekam-gold uppercase font-bold mb-1">{heroCourse.categoryLabel}</p>
                    <p className="text-base font-bold leading-snug mb-2.5" style={{ color: '#171310' }}>{heroCourse.title.split(':')[0]}</p>
                    <div className="flex items-center justify-between pt-2.5" style={{ borderTop: '1px solid #F0EBE0' }}>
                      <span className="text-xs" style={{ color: '#655D4E' }}>{heroCourse.instructor?.name?.split(' ').slice(0, 2).join(' ')}</span>
                      <span className="text-sm font-bold" style={{ color: '#8C6210' }}>{formatPrice(heroCourse.price)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* carousel arrows */}
            <button onClick={() => setHeroIdx((heroIdx - 1 + heroSlides.length) % heroSlides.length)}
              aria-label="Previous"
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <ChevronLeft size={16} style={{ color: '#8C6210' }} />
            </button>
            <button onClick={() => setHeroIdx((heroIdx + 1) % heroSlides.length)}
              aria-label="Next"
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <ChevronRight size={16} style={{ color: '#8C6210' }} />
            </button>
          </div>

          {/* stats strip */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mt-6">
            {stats.map((s, i) => {
              const Icon = statIcons[s.label] || Users
              return (
                <div key={i} className="flex items-center gap-2">
                  <Icon size={16} style={{ color: '#8C6210' }} />
                  <span className="text-sm font-bold" style={{ color: '#171310' }}>{s.value}</span>
                  <span className="text-xs" style={{ color: '#9B9182' }}>{s.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           HOW IT WORKS
      ════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label mb-3 block justify-center">Getting Started</span>
            <h2 className="section-title text-3xl md:text-4xl">How Ekam Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { step: '01', icon: Search, title: 'Browse & Choose', desc: 'Explore 1,200+ courses across 8 living traditions and find the art form that speaks to you.' },
              { step: '02', icon: PlayCircle, title: 'Learn from Masters', desc: 'Watch structured video lessons from verified gurus, at your own pace, with lifetime access.' },
              { step: '03', icon: Award, title: 'Practice & Get Certified', desc: 'Track your progress, complete the curriculum, and earn a recognized certificate of completion.' },
            ].map((item, i) => (
              <div key={i} className="rounded-xl p-7 bg-white transition-all duration-200 hover:-translate-y-1"
                style={{ border: '1px solid #EDE4D8', boxShadow: '0 1px 2px rgba(23,19,16,0.04)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: stepColors[i].bg }}>
                    <item.icon size={19} style={{ color: stepColors[i].icon }} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: '#B8AC96' }}>{item.step}</span>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#171310' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#655D4E' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           CATEGORIES
      ════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label mb-3 block justify-center">Traditions</span>
            <h2 className="section-title text-3xl md:text-4xl mb-3">Explore by Art Form</h2>
            <p className="max-w-md mx-auto text-sm" style={{ color: '#655D4E' }}>
              Eight living traditions, thousands of years of wisdom.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map(cat => {
              const cs = categoryStyles[cat.id] || categoryStyles.music
              return (
                <Link key={cat.id} href={`/courses?cat=${cat.id}`}
                  className="group relative rounded-xl p-5 overflow-hidden transition-all duration-200 hover:-translate-y-1 bg-white flex flex-col justify-between"
                  style={{ border: '1px solid #EDE4D8', boxShadow: '0 1px 2px rgba(23,19,16,0.04)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105"
                    style={{ background: cs.bg }}>
                    <CategoryIcon id={cat.id} size={20} style={{ color: cs.icon }} />
                  </div>
                  <h3 className="text-sm font-bold mb-1" style={{ color: '#171310' }}>{cat.label}</h3>
                  <p className="text-xs mb-3" style={{ color: '#9B9182' }}>{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold" style={{ color: cs.icon }}>{cat.count} courses</span>
                    <ChevronRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: cs.icon }} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: cs.icon }} />
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           FEATURED COURSES
      ════════════════════════════════ */}
      <section className="py-12 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-6 mb-5">
            <h2 className="text-2xl font-extrabold" style={{ color: '#1C0E04' }}>Courses by Masters</h2>
            <Link href="/courses" className="text-sm font-semibold flex items-center gap-1 whitespace-nowrap" style={{ color: '#8C6210' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <CourseRow courses={featuredCourses} />
        </div>
      </section>

      {/* ════════════════════════════════
           FRESH FROM OUR INSTRUCTORS
      ════════════════════════════════ */}
      {newInstructorCourses.length > 0 && (
        <section className="py-12 px-4" style={{ background: '#FFFFFF' }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-6 mb-5">
              <h2 className="text-2xl font-extrabold" style={{ color: '#1C0E04' }}>Fresh From Our Instructors</h2>
              <Link href="/courses" className="text-sm font-semibold flex items-center gap-1 whitespace-nowrap" style={{ color: '#8C6210' }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <CourseRow courses={newInstructorCourses} />
          </div>
        </section>
      )}

      {/* ════════════════════════════════
           WHY EKAM
      ════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 bg-white"
            style={{ border: '1px solid #EDE4D8' }}>

            <div className="relative p-10 md:p-14 flex flex-col justify-center overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #1C0E04 0%, #3B1203 100%)' }}>
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.18) 0%, transparent 70%)' }} />
              <span className="section-label mb-3 block" style={{ color: '#E8C060' }}>Our Promise</span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 leading-snug text-white relative">
                One Platform, Infinite Traditions
              </h2>
              <p className="text-sm leading-relaxed mb-8 relative" style={{ color: 'rgba(255,255,255,0.65)' }}>
                Ekam bridges the sacred and the accessible — every course carries the authenticity of an unbroken lineage.
              </p>
              <div className="grid grid-cols-2 gap-4 relative">
                {[
                  { v: '1,200+', l: 'Courses' },
                  { v: '320+', l: 'Verified Masters' },
                  { v: '85k+', l: 'Students' },
                  { v: '24+', l: 'Languages' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
                    <p className="text-xl font-extrabold" style={{ color: '#E8C060' }}>{s.v}</p>
                    <p className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

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
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: '#FBF3E3' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm mb-1" style={{ color: '#171310' }}>{item.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: '#655D4E' }}>{item.desc}</p>
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
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label mb-3 block justify-center">Maestros</span>
            <h2 className="section-title text-3xl md:text-4xl mb-2">Learn from the Best</h2>
            <p className="text-sm" style={{ color: '#655D4E' }}>Custodians of living traditions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* Featured maestro */}
            <div className="relative lg:col-span-2 rounded-2xl p-8 flex flex-col justify-end overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #1C0E04 0%, #3B1203 100%)', minHeight: '380px' }}>
              <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.16) 0%, transparent 70%)' }} />
              <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-4"
                style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
                {instructors[0].initials}
              </div>
              <div className="relative flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-extrabold text-white">{instructors[0].name}</h3>
                {instructors[0].verified && <CheckCircle2 size={16} style={{ color: '#E8C060' }} />}
              </div>
              <p className="relative text-sm mb-3 font-medium" style={{ color: '#E8C060' }}>{instructors[0].title}</p>
              <p className="relative text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>{instructors[0].bio}</p>
              <div className="relative flex items-center gap-4 text-xs mb-5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <span className="flex items-center gap-1"><Star size={12} className="fill-amber-400 text-amber-400" />{instructors[0].rating}</span>
                <span>{formatNumber(instructors[0].students)} students</span>
                <span>{instructors[0].courses} courses</span>
              </div>
              <Link href={`/courses?instructor=${instructors[0].id}`} className="relative btn-gold text-sm w-fit">
                View Courses <ChevronRight size={14} />
              </Link>
            </div>

            {/* Rest — compact list rows */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              {instructors.slice(1, 6).map(inst => (
                <Link key={inst.id} href={`/courses?instructor=${inst.id}`}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ border: '1px solid #EDE4D8' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                    {inst.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm truncate" style={{ color: '#171310' }}>{inst.name}</h4>
                      {inst.verified && <CheckCircle2 size={12} className="flex-shrink-0" style={{ color: '#8C6210' }} />}
                    </div>
                    <p className="text-xs truncate" style={{ color: '#8C6210' }}>{inst.title}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 text-xs flex-shrink-0" style={{ color: '#655D4E' }}>
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
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label mb-3 block justify-center">Stories</span>
            <h2 className="section-title text-3xl md:text-4xl">Voices of Transformation</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, idx) => {
              const dark = idx === 1
              return (
                <div key={t.id} className="rounded-xl p-7 flex flex-col"
                  style={dark
                    ? { background: 'linear-gradient(145deg, #1C0E04, #3B1203)' }
                    : { background: '#FFFFFF', border: '1px solid #EDE4D8' }}>
                  <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => (
                      <Star key={s} size={13} className={s <= t.rating ? (dark ? 'fill-amber-400 text-amber-400' : 'fill-amber-500 text-amber-500') : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed flex-1 mb-6" style={{ color: dark ? 'rgba(255,255,255,0.8)' : '#3D372C' }}>&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-5" style={{ borderTop: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid #F0EBE0' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold" style={{ color: dark ? '#FFFFFF' : '#171310' }}>{t.name}</p>
                      <p className="text-xs" style={{ color: dark ? 'rgba(255,255,255,0.5)' : '#9B9182' }}>{t.location}</p>
                      <p className="text-[11px] font-medium mt-0.5" style={{ color: dark ? '#E8C060' : '#8C6210' }}>{t.course}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
           FAQ
      ════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label mb-3 block justify-center">Questions</span>
            <h2 className="section-title text-3xl md:text-4xl mb-2">Frequently Asked</h2>
            <p className="text-sm" style={{ color: '#655D4E' }}>Everything you need to know before you begin</p>
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
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto rounded-2xl px-8 py-14 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #B07218 0%, #D4921F 50%, #9A6010 100%)' }}>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4">
            Begin Your Cultural Learning Journey
          </h2>
          <p className="mb-8 text-base max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Join 85,000+ students discovering the depth of India&apos;s artistic traditions. Start free, learn forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold bg-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ color: '#8C6210' }}>
              Start Learning Free <ArrowRight size={16} />
            </Link>
            <Link href="/auth/signup?role=instructor"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
              style={{ border: '1.5px solid rgba(255,255,255,0.5)', color: '#FFFFFF' }}>
              Become an Instructor
            </Link>
          </div>
          <p className="text-xs mt-5" style={{ color: 'rgba(255,255,255,0.65)' }}>
            No credit card required · Free courses available · Cancel anytime
          </p>
        </div>
      </section>

    </div>
  )
}

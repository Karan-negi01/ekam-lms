import Link from 'next/link'
import { ArrowRight, Star, Play, ChevronRight, CheckCircle2, Users, BookOpen, Clock, Zap } from 'lucide-react'
import CourseCard from '@/components/courses/CourseCard'
import { courses, categories, instructors, stats, testimonials } from '@/lib/data'
import { formatNumber, formatPrice } from '@/lib/utils'

/* ── Decorative SVGs ── */
function Mandala({ className = '', opacity = 0.5 }) {
  return (
    <svg viewBox="0 0 300 300" className={className} fill="none">
      {[130, 105, 80, 55, 30].map((r, i) => (
        <circle key={i} cx="150" cy="150" r={r}
          stroke={`rgba(140,98,16,${(0.06 - i * 0.01).toFixed(2)})`} strokeWidth="0.6" />
      ))}
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => (
        <g key={i} transform={`rotate(${deg} 150 150)`}>
          <line x1="150" y1="20" x2="150" y2="50" stroke="rgba(140,98,16,0.12)" strokeWidth="0.6"/>
          <circle cx="150" cy="35" r="2.5" fill="rgba(140,98,16,0.10)"/>
          <polygon points="150,60 147,72 153,72" fill="rgba(140,98,16,0.06)"/>
        </g>
      ))}
      <circle cx="150" cy="150" r="10" fill="rgba(140,98,16,0.12)"/>
      <circle cx="150" cy="150" r="5" fill="rgba(140,98,16,0.22)"/>
    </svg>
  )
}

function PatternDots() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#8C6210"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)"/>
    </svg>
  )
}

const categoryColors = {
  music:   { bg: 'rgba(194,120,24,0.10)', icon: 'rgba(194,120,24,0.18)', border: 'rgba(194,120,24,0.20)', text: '#B06010', label: '#8C4A08' },
  dance:   { bg: 'rgba(196,64,80,0.08)',  icon: 'rgba(196,64,80,0.16)',  border: 'rgba(196,64,80,0.18)',  text: '#C44050', label: '#9A2030' },
  yoga:    { bg: 'rgba(26,120,56,0.08)',  icon: 'rgba(26,120,56,0.15)',  border: 'rgba(26,120,56,0.18)',  text: '#1A7838', label: '#0E5028' },
  art:     { bg: 'rgba(200,100,20,0.08)', icon: 'rgba(200,100,20,0.16)', border: 'rgba(200,100,20,0.18)', text: '#C86414', label: '#9A4808' },
  sanskrit:{ bg: 'rgba(80,60,160,0.07)',  icon: 'rgba(80,60,160,0.14)',  border: 'rgba(80,60,160,0.16)',  text: '#5038A0', label: '#382880' },
  vedic:   { bg: 'rgba(180,130,20,0.08)', icon: 'rgba(180,130,20,0.16)', border: 'rgba(180,130,20,0.18)', text: '#B48214', label: '#8A6008' },
  cooking: { bg: 'rgba(196,48,20,0.08)',  icon: 'rgba(196,48,20,0.14)',  border: 'rgba(196,48,20,0.16)',  text: '#C43014', label: '#9A1C08' },
  craft:   { bg: 'rgba(120,72,30,0.08)',  icon: 'rgba(120,72,30,0.15)',  border: 'rgba(120,72,30,0.18)',  text: '#78481E', label: '#5A3010' },
}

/* ── Mini course card for hero ── */
function HeroCourseChip({ course }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-[0_4px_20px_rgba(139,94,10,0.10)]"
      style={{ border: '1px solid #EDE4D8' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #451a03, #450a0a)' }}>
        {course.thumbnailEmoji}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold truncate" style={{ color: '#1C0E04' }}>{course.title.split(':')[0]}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Star size={10} className="fill-amber-500 text-amber-500" />
          <span className="text-[10px] font-medium text-amber-600">{course.rating}</span>
          <span className="text-[10px]" style={{ color: '#B0A090' }}>· {formatNumber(course.studentCount)} students</span>
        </div>
      </div>
      <div className="ml-auto flex-shrink-0">
        <span className="text-xs font-bold" style={{ color: '#8C6210' }}>{formatPrice(course.price)}</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const featuredCourses = courses.filter(c => c.featured)

  return (
    <div style={{ background: '#FDFAF4' }}>

      {/* ════════════════════════════════
           HERO
      ════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: 'linear-gradient(160deg, #FDFAF4 0%, #F7F0E5 60%, #F0E8D8 100%)' }}>

        <PatternDots />
        <Mandala className="absolute -left-32 top-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-60" />
        <Mandala className="absolute -right-40 top-1/4 w-[360px] h-[360px] opacity-40" />

        {/* top gold line */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(140,98,16,0.4), transparent)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* LEFT */}
            <div className="animate-fadeUp">
              <span className="section-label mb-6 block">India&apos;s Premier Cultural Platform</span>

              <p className="font-display text-ekam-gold text-base tracking-[0.3em] mb-4 opacity-80">
                ॥ विद्या विनयेन शोभते ॥
              </p>

              <h1 className="font-serif leading-[0.92] mb-6"
                style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', color: '#1C0E04' }}>
                Discover<br />the{' '}
                <span className="relative">
                  <span className="gold-text italic">Soul</span>
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 160 6" fill="none">
                    <path d="M0 5 Q80 0 160 5" stroke="#C4881A" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                  </svg>
                </span>
                <br />of India
              </h1>

              <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: '#6B5744', lineHeight: '1.75' }}>
                Learn from India&apos;s most celebrated maestros — classical music, Bharatanatyam, Ashtanga Yoga, Sanskrit, Madhubani art and Vedic wisdom. All in one place.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mb-10">
                <Link href="/courses" className="btn-gold text-sm px-7 py-3.5">
                  Explore Courses <ArrowRight size={16} />
                </Link>
                <Link href="/auth/signup?role=instructor" className="btn-outline text-sm px-7 py-3.5">
                  Teach on Ekam
                </Link>
              </div>

              {/* Trust strip */}
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {stats.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-lg">{s.icon}</span>
                    <div>
                      <span className="text-sm font-bold" style={{ color: '#8C6210' }}>{s.value}</span>
                      <span className="text-xs ml-1.5" style={{ color: '#9B8878' }}>{s.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — floating course chips */}
            <div className="hidden lg:flex flex-col gap-3 relative animate-fadeUp delay-200">
              {/* Decorative card behind */}
              <div className="absolute -right-6 -top-6 w-48 h-48 rounded-3xl opacity-20 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(140,98,16,0.2), rgba(196,64,21,0.1))' }} />

              <div className="relative space-y-3 ml-8">
                {/* Big preview card */}
                <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_40px_rgba(139,94,10,0.12)]"
                  style={{ border: '1px solid #EDE4D8' }}>
                  <div className="relative h-44 flex items-center justify-center overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #3b0a0a, #451a03)' }}>
                    <div className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(212,168,67,0.4) 0%, transparent 60%)' }} />
                    <span className="text-7xl opacity-80 animate-float">{courses[0].thumbnailEmoji}</span>
                    <div className="absolute bottom-3 left-3">
                      <span className="badge badge-gold bg-white/90 text-[10px]">⚡ BESTSELLER</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 rounded-xl px-3 py-1.5">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="fill-amber-500 text-amber-500" />
                        <span className="text-xs font-bold text-amber-600">{courses[0].rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3">
                    <p className="text-[10px] tracking-widest text-ekam-gold uppercase font-semibold mb-0.5">{courses[0].categoryLabel}</p>
                    <p className="text-sm font-semibold leading-snug mb-2" style={{ color: '#1C0E04' }}>{courses[0].title.split(':')[0]}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                          {courses[0].instructor?.initials?.charAt(0)}
                        </div>
                        <span className="text-[11px]" style={{ color: '#7A6550' }}>{courses[0].instructor?.name?.split(' ').slice(0,2).join(' ')}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: '#8C6210' }}>{formatPrice(courses[0].price)}</span>
                    </div>
                  </div>
                </div>

                {/* Small chips */}
                <HeroCourseChip course={courses[2]} />
                <HeroCourseChip course={courses[1]} />

                {/* Floating badge */}
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_24px_rgba(139,94,10,0.14)]"
                  style={{ border: '1px solid #EDE4D8' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(26,92,56,0.10)' }}>
                      <Users size={14} style={{ color: '#1A5C38' }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: '#1C0E04' }}>85,000+</p>
                      <p className="text-[10px]" style={{ color: '#7A6550' }}>learners</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <div className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
            style={{ border: '1.5px solid rgba(140,98,16,0.3)' }}>
            <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: '#8C6210' }} />
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

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.map(cat => {
              const c = categoryColors[cat.id] || categoryColors.music
              return (
                <Link key={cat.id} href={`/courses?cat=${cat.id}`}
                  className="group relative rounded-2xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: c.icon }}>
                    {cat.icon}
                  </div>
                  <h3 className="font-serif text-base font-semibold mb-0.5 transition-colors duration-200"
                    style={{ color: c.label }}>
                    {cat.label}
                  </h3>
                  <p className="text-xs mb-3" style={{ color: c.text, opacity: 0.7 }}>{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold" style={{ color: c.text }}>{cat.count} courses</span>
                    <ChevronRight size={14} className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: c.text }} />
                  </div>
                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: c.text }} />
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {instructors.slice(0, 6).map(inst => (
              <div key={inst.id} className="card-base p-6 group">
                <div className="flex items-start gap-4 mb-4">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #C4881A 0%, #C44015 100%)' }}>
                      {inst.initials}
                    </div>
                    {inst.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center"
                        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                        <CheckCircle2 size={13} style={{ color: '#8C6210' }} />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-semibold text-base leading-tight mb-0.5" style={{ color: '#1C0E04' }}>
                      {inst.name}
                    </h3>
                    <p className="text-xs font-medium mb-2" style={{ color: '#8C6210' }}>{inst.title}</p>
                    <div className="flex items-center gap-3 text-xs" style={{ color: '#7A6550' }}>
                      <span className="flex items-center gap-1">
                        <Star size={11} className="fill-amber-500 text-amber-500" />{inst.rating}
                      </span>
                      <span>·</span>
                      <span>{formatNumber(inst.students)} students</span>
                      <span>·</span>
                      <span>{inst.courses} courses</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed line-clamp-2 mb-4" style={{ color: '#7A6550' }}>{inst.bio}</p>

                <Link href={`/courses?instructor=${inst.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ekam-gold hover:text-ekam-gold-light transition-colors duration-200 group-hover:gap-2">
                  View Courses <ChevronRight size={13} />
                </Link>
              </div>
            ))}
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

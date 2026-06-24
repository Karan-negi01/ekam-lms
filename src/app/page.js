import Link from 'next/link'
import { ArrowRight, Star, Play, ChevronRight, CheckCircle2 } from 'lucide-react'
import CourseCard from '@/components/courses/CourseCard'
import { courses, categories, instructors, stats, testimonials } from '@/lib/data'
import { formatNumber } from '@/lib/utils'

function MandalaDecor({ className = '' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" stroke="rgba(140,98,16,0.12)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="70" stroke="rgba(140,98,16,0.10)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="50" stroke="rgba(140,98,16,0.08)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="30" stroke="rgba(140,98,16,0.06)" strokeWidth="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 100 100)`}>
          <line x1="100" y1="10" x2="100" y2="30" stroke="rgba(140,98,16,0.18)" strokeWidth="0.5" />
          <circle cx="100" cy="20" r="2" fill="rgba(140,98,16,0.12)" />
          <line x1="100" y1="50" x2="100" y2="70" stroke="rgba(140,98,16,0.12)" strokeWidth="0.5" />
          <polygon points="100,75 97,85 103,85" fill="rgba(140,98,16,0.08)" />
        </g>
      ))}
      <circle cx="100" cy="100" r="8" fill="rgba(140,98,16,0.15)" />
      <circle cx="100" cy="100" r="4" fill="rgba(140,98,16,0.30)" />
    </svg>
  )
}

function LotusDecor() {
  return (
    <svg viewBox="0 0 60 40" className="w-16 h-10" fill="none">
      <ellipse cx="30" cy="30" rx="8" ry="15" fill="rgba(140,98,16,0.12)" transform="rotate(-30 30 30)" />
      <ellipse cx="30" cy="30" rx="8" ry="15" fill="rgba(140,98,16,0.12)" transform="rotate(0 30 30)" />
      <ellipse cx="30" cy="30" rx="8" ry="15" fill="rgba(140,98,16,0.12)" transform="rotate(30 30 30)" />
      <ellipse cx="30" cy="30" rx="8" ry="15" fill="rgba(140,98,16,0.08)" transform="rotate(-60 30 30)" />
      <ellipse cx="30" cy="30" rx="8" ry="15" fill="rgba(140,98,16,0.08)" transform="rotate(60 30 30)" />
      <circle cx="30" cy="30" r="5" fill="rgba(140,98,16,0.25)" />
    </svg>
  )
}

export default function HomePage() {
  const featuredCourses = courses.filter(c => c.featured)

  return (
    <div style={{ background: '#FDFAF4' }}>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden cultural-bg pt-20"
        style={{ background: 'linear-gradient(160deg, #FDFAF4 0%, #F5EFE4 50%, #F0E8D8 100%)' }}>

        {/* Subtle radial glows */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 50% at 50% 30%, rgba(140,98,16,0.06) 0%, transparent 70%),
              radial-gradient(ellipse 40% 40% at 15% 60%, rgba(196,64,21,0.04) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 85% 25%, rgba(140,98,16,0.04) 0%, transparent 60%)
            `
          }}
        />

        {/* Mandala decorations */}
        <MandalaDecor className="absolute -left-20 top-1/4 w-64 h-64 opacity-60 animate-float" />
        <MandalaDecor className="absolute -right-20 bottom-1/4 w-64 h-64 opacity-40 animate-float" />
        <MandalaDecor className="absolute left-1/2 -translate-x-1/2 top-10 w-28 h-28 opacity-30" />

        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(140,98,16,0.4), transparent)' }} />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-medium tracking-widest"
            style={{ background: 'rgba(140,98,16,0.08)', border: '1px solid rgba(140,98,16,0.22)', color: '#8C6210' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#C4881A' }} />
            India&apos;s Premier Cultural Learning Platform
          </div>

          {/* Sanskrit shloka */}
          <p className="font-display text-ekam-gold text-lg tracking-[0.3em] mb-4 opacity-75">
            ॥ विद्या विनयेन शोभते ॥
          </p>

          {/* Main heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] mb-6"
            style={{ color: '#1C0E04' }}>
            Discover the{' '}
            <span className="relative inline-block">
              <span className="gold-text">Soul</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M0 6 Q100 0 200 6" stroke="url(#underline-grad)" strokeWidth="1.5" />
                <defs>
                  <linearGradient id="underline-grad" x1="0" y1="0" x2="200" y2="0">
                    <stop offset="0%" stopColor="rgba(140,98,16,0)" />
                    <stop offset="50%" stopColor="#8C6210" />
                    <stop offset="100%" stopColor="rgba(140,98,16,0)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>{' '}
            of India
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: '#7A6550' }}>
            Learn from India&apos;s most celebrated maestros — classical music, dance, yoga, Sanskrit, traditional arts and wisdom traditions. 1,200+ courses. 85,000+ students.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/courses" className="btn-gold text-base px-8 py-4 rounded-xl">
              Explore Courses <ArrowRight size={18} />
            </Link>
            <Link href="#featured" className="btn-outline text-base px-8 py-4 rounded-xl flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(140,98,16,0.12)' }}>
                <Play size={12} className="text-ekam-gold fill-ekam-gold ml-0.5" />
              </div>
              Watch a Preview
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs" style={{ color: '#7A6550' }}>
            {['✓ 1,200+ Expert Courses', '✓ 320+ Certified Instructors', '✓ Lifetime Access', '✓ Certificate of Completion'].map(badge => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-[0.2em]" style={{ color: '#B0A090' }}>SCROLL</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #8C6210, transparent)' }} />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #EDE4D8', borderBottom: '1px solid #EDE4D8' }}>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl mb-1">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-serif font-semibold mb-1" style={{ color: '#8C6210' }}>{stat.value}</div>
                <div className="text-xs tracking-wide uppercase" style={{ color: '#7A6550' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-24 px-4" id="categories" style={{ background: '#FDFAF4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="ornament mb-4">
              <span className="text-sm tracking-[0.3em] text-ekam-gold uppercase font-medium">Traditions</span>
            </div>
            <h2 className="section-title mb-4">Explore by Art Form</h2>
            <p className="max-w-xl mx-auto" style={{ color: '#7A6550' }}>
              Each discipline carries centuries of wisdom, technique, and devotion.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map(cat => (
              <Link key={cat.id} href={`/courses?cat=${cat.id}`} className="group card-base p-5">
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-serif text-base mb-0.5 group-hover:text-ekam-gold transition-colors" style={{ color: '#1C0E04' }}>
                  {cat.label}
                </h3>
                <p className="text-xs mb-2" style={{ color: '#7A6550' }}>{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-ekam-gold">{cat.count} courses</span>
                  <ChevronRight size={14} className="text-ekam-muted group-hover:text-ekam-gold group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES ─── */}
      <section id="featured" className="py-24 px-4" style={{ background: '#F5EFE4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="ornament justify-start mb-4">
                <span className="text-sm tracking-[0.3em] text-ekam-gold uppercase font-medium">Featured</span>
              </div>
              <h2 className="section-title">Courses by Masters</h2>
              <p className="mt-3 max-w-lg" style={{ color: '#7A6550' }}>
                Handpicked courses taught by India&apos;s most celebrated artists and scholars
              </p>
            </div>
            <Link href="/courses" className="btn-outline whitespace-nowrap self-start md:self-auto">
              View All Courses <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY EKAM ─── */}
      <section className="py-24 px-4" style={{ background: '#FDFAF4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative flex items-center justify-center">
              <MandalaDecor className="w-80 h-80 opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <LotusDecor />
                  <p className="font-display text-ekam-gold text-3xl font-semibold mt-4 tracking-widest">एकम्</p>
                  <p className="text-xs mt-1 tracking-[0.3em]" style={{ color: '#7A6550' }}>ONE CULTURE · ONE PLATFORM</p>
                </div>
              </div>
            </div>

            <div>
              <div className="ornament justify-start mb-4">
                <span className="text-sm tracking-[0.3em] text-ekam-gold uppercase font-medium">Why Ekam</span>
              </div>
              <h2 className="section-title mb-6">The Art of Learning,<br />Reimagined</h2>
              <p className="leading-relaxed mb-8" style={{ color: '#7A6550' }}>
                Ekam bridges the gap between ancient wisdom and modern accessibility. Every course is curated for authenticity, taught by masters who have dedicated their lives to their craft.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Verified Maestros', desc: 'Every instructor is personally vetted — trained in traditional gurukul or recognized institutions.' },
                  { title: 'Cultural Authenticity', desc: 'Courses preserve the lineage and oral tradition while making it accessible to modern learners.' },
                  { title: 'Multilingual Content', desc: 'Courses in Hindi, regional languages, and English — learn in the language of the art.' },
                  { title: 'Live & Recorded', desc: 'Attend live sessions with masters or learn at your own pace with lifetime access recordings.' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'rgba(140,98,16,0.12)' }}>
                      <CheckCircle2 size={14} className="text-ekam-gold" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-0.5" style={{ color: '#1C0E04' }}>{item.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: '#7A6550' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <Link href="/about" className="btn-gold">Learn Our Story</Link>
                <Link href="/courses" className="btn-outline">Browse Courses</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INSTRUCTORS ─── */}
      <section className="py-24 px-4" style={{ background: '#F5EFE4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="ornament mb-4">
              <span className="text-sm tracking-[0.3em] text-ekam-gold uppercase font-medium">Maestros</span>
            </div>
            <h2 className="section-title mb-4">Learn from the Best</h2>
            <p className="max-w-xl mx-auto" style={{ color: '#7A6550' }}>
              Our instructors are not just teachers — they are custodians of living traditions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {instructors.slice(0, 6).map(inst => (
              <div key={inst.id} className="card-base p-5">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                    {inst.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif text-sm font-medium" style={{ color: '#1C0E04' }}>{inst.name}</h3>
                        <p className="text-xs text-ekam-gold mt-0.5">{inst.title}</p>
                      </div>
                      {inst.verified && <span className="badge badge-gold text-[9px] flex-shrink-0 ml-2">✓ VERIFIED</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs" style={{ color: '#7A6550' }}>
                      <span className="flex items-center gap-1">
                        <Star size={10} className="fill-ekam-gold text-ekam-gold" />
                        {inst.rating}
                      </span>
                      <span>{formatNumber(inst.students)} students</span>
                      <span>{inst.courses} courses</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed line-clamp-2 mt-3" style={{ color: '#7A6550' }}>{inst.bio}</p>
                <Link href={`/courses?instructor=${inst.id}`}
                  className="inline-flex items-center gap-1 text-xs text-ekam-gold hover:text-ekam-gold-light mt-3 transition-colors">
                  View Courses <ChevronRight size={12} />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/instructors" className="btn-outline">
              Meet All Instructors <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ALL COURSES ─── */}
      <section className="py-24 px-4" style={{ background: '#FDFAF4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="ornament justify-start mb-3">
                <span className="text-sm tracking-[0.3em] text-ekam-gold uppercase font-medium">All Courses</span>
              </div>
              <h2 className="section-title">Begin Your Journey</h2>
            </div>
            <Link href="/courses" className="btn-outline hidden md:inline-flex">See All <ArrowRight size={15} /></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.slice(0, 4).map(course => (
              <CourseCard key={course.id} course={course} compact />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-4" style={{ background: '#F5EFE4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="ornament mb-4">
              <span className="text-sm tracking-[0.3em] text-ekam-gold uppercase font-medium">Stories</span>
            </div>
            <h2 className="section-title mb-4">What Our Students Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <div key={t.id} className="card-base p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} className={s <= t.rating ? 'fill-ekam-gold text-ekam-gold' : 'text-ekam-border'} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-6 italic" style={{ color: '#3D2814' }}>&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid #EDE4D8' }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#1C0E04' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#7A6550' }}>{t.location}</p>
                    <p className="text-xs text-ekam-gold mt-0.5">{t.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-4 relative overflow-hidden" style={{ background: '#FDFAF4' }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(140,98,16,0.05) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(140,98,16,0.3), transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(140,98,16,0.3), transparent)' }} />
        <MandalaDecor className="absolute -right-16 top-1/2 -translate-y-1/2 w-72 h-72 opacity-25" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <LotusDecor />
          <h2 className="section-title mt-4 mb-4">
            Ready to Begin Your<br />
            <span className="gold-text">Cultural Journey?</span>
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: '#7A6550' }}>
            Join 85,000+ students who are discovering the depth and beauty of India&apos;s artistic and philosophical traditions. Start for free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="btn-gold text-base px-8 py-4 rounded-xl">
              Start Learning Free <ArrowRight size={18} />
            </Link>
            <Link href="/auth/signup?role=instructor" className="btn-outline text-base px-8 py-4 rounded-xl">
              Become an Instructor
            </Link>
          </div>
          <p className="text-xs mt-4" style={{ color: '#7A6550' }}>No credit card required. Free courses available.</p>
        </div>
      </section>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  BookOpen, Clock, CheckCircle2, Play, BarChart3, Award,
  TrendingUp, Star, ChevronRight, Search, Filter
} from 'lucide-react'
import { courses } from '@/lib/data'
import { formatNumber } from '@/lib/utils'

function ProgressRing({ pct, size = 56, stroke = 4 }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} stroke="#EDE4D8" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke}
        stroke={pct === 100 ? '#1A5C38' : '#8C6210'}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
    </svg>
  )
}

export default function MyLearningPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [progressMap, setProgressMap] = useState({})
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('ekam_user')
    if (!stored) { router.push('/auth/login?redirect=/my-learning'); return }
    const u = JSON.parse(stored)
    setUser(u)

    // Load enrolled course IDs
    const enrolledIds = JSON.parse(localStorage.getItem('ekam_enrolled') || '[]')
    const enrolled = courses.filter(c => enrolledIds.includes(c.id))
    setEnrolledCourses(enrolled)

    // Load progress for each course
    const pMap = {}
    enrolledIds.forEach(id => {
      const completed = JSON.parse(localStorage.getItem(`ekam_progress_${id}`) || '[]')
      const course = courses.find(c => c.id === id)
      const total = course?.curriculum?.reduce((a, s) => a + s.lessons.length, 0) || 0
      pMap[id] = { completed: completed.length, total, pct: total > 0 ? Math.round((completed.length / total) * 100) : 0 }
    })
    setProgressMap(pMap)
  }, [router])

  const filtered = enrolledCourses.filter(c => {
    const p = progressMap[c.id]
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesSearch) return false
    if (filter === 'in-progress') return p && p.pct > 0 && p.pct < 100
    if (filter === 'completed') return p && p.pct === 100
    if (filter === 'not-started') return !p || p.pct === 0
    return true
  })

  const totalCompleted = Object.values(progressMap).filter(p => p.pct === 100).length
  const totalInProgress = Object.values(progressMap).filter(p => p.pct > 0 && p.pct < 100).length
  const avgProgress = enrolledCourses.length
    ? Math.round(Object.values(progressMap).reduce((a, p) => a + p.pct, 0) / enrolledCourses.length)
    : 0

  const statCards = [
    { label: 'Enrolled', value: enrolledCourses.length, icon: BookOpen, color: '#8C6210', bg: 'rgba(140,98,16,0.08)' },
    { label: 'In Progress', value: totalInProgress, icon: TrendingUp, color: '#C44015', bg: 'rgba(196,64,21,0.08)' },
    { label: 'Completed', value: totalCompleted, icon: Award, color: '#1A5C38', bg: 'rgba(26,92,56,0.08)' },
    { label: 'Avg Progress', value: `${avgProgress}%`, icon: BarChart3, color: '#B07C18', bg: 'rgba(176,124,24,0.08)' },
  ]

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FDFAF4' }}>
      <div className="loader-gold w-8 h-8" />
    </div>
  )

  return (
    <div className="min-h-screen pt-20" style={{ background: '#FDFAF4' }}>
      {/* Hero header */}
      <div style={{ background: 'linear-gradient(to bottom, #F5EFE4, #FDFAF4)', borderBottom: '1px solid #E2D5C4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-px h-4 bg-ekam-gold" />
                <span className="text-xs tracking-widest text-ekam-gold uppercase font-medium">My Learning</span>
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-1" style={{ color: '#1C0E04' }}>
                Welcome back, {user.name?.split(' ')[0]}
              </h1>
              <p className="text-sm" style={{ color: '#7A6550' }}>
                {enrolledCourses.length === 0
                  ? 'Start your first course today'
                  : `You have ${enrolledCourses.length} course${enrolledCourses.length > 1 ? 's' : ''} in progress`}
              </p>
            </div>
            <Link href="/courses" className="btn-gold self-start">
              Browse More Courses <ChevronRight size={15} />
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {statCards.map((s, i) => (
              <div key={i} className="bg-white rounded-xl p-4 flex items-center gap-3"
                style={{ border: '1px solid #E2D5C4', boxShadow: '0 2px 8px rgba(139,94,10,0.05)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: s.bg }}>
                  <s.icon size={18} style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-xl font-semibold font-serif" style={{ color: s.color }}>{s.value}</p>
                  <p className="text-xs" style={{ color: '#7A6550' }}>{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {enrolledCourses.length === 0 ? (
          /* Empty state */
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6"
              style={{ background: 'rgba(140,98,16,0.08)' }}>
              <BookOpen size={40} className="text-ekam-gold" />
            </div>
            <h2 className="font-serif text-2xl mb-3" style={{ color: '#1C0E04' }}>No courses yet</h2>
            <p className="mb-8 max-w-sm mx-auto" style={{ color: '#7A6550' }}>
              Enroll in your first course and start your cultural learning journey today.
            </p>
            <Link href="/courses" className="btn-gold text-base px-8 py-3.5 rounded-xl">
              Explore Courses
            </Link>
          </div>
        ) : (
          <>
            {/* Filter + Search */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1 bg-white rounded-xl overflow-hidden search-glow"
                style={{ border: '1.5px solid #E2D5C4' }}>
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input type="text" placeholder="Search your courses..."
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent text-sm outline-none"
                  style={{ color: '#1C0E04' }} />
              </div>

              <div className="flex gap-1.5 p-1 rounded-xl" style={{ background: '#F5EFE4', border: '1px solid #E2D5C4' }}>
                {[['all','All'],['not-started','Not Started'],['in-progress','In Progress'],['completed','Done']].map(([val, label]) => (
                  <button key={val} onClick={() => setFilter(val)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap"
                    style={{
                      background: filter === val ? 'white' : 'transparent',
                      color: filter === val ? '#8C6210' : '#7A6550',
                      boxShadow: filter === val ? '0 1px 4px rgba(139,94,10,0.10)' : 'none',
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Course grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg font-serif mb-2" style={{ color: '#1C0E04' }}>No courses match</p>
                <p className="text-sm" style={{ color: '#7A6550' }}>Try a different filter or search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(course => {
                  const p = progressMap[course.id] || { completed: 0, total: 0, pct: 0 }
                  const isDone = p.pct === 100
                  const isStarted = p.pct > 0

                  return (
                    <div key={course.id} className="card-base overflow-hidden flex flex-col">
                      {/* Thumbnail */}
                      <div className="relative" style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #451a03, #450a0a)' }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-5xl opacity-70">{course.thumbnailEmoji}</span>
                        </div>
                        {/* Progress bar on top */}
                        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: '#2E1A10' }}>
                          <div className="h-full transition-all duration-500"
                            style={{
                              width: `${p.pct}%`,
                              background: isDone ? '#1A5C38' : 'linear-gradient(to right, #8C6210, #C4881A)'
                            }} />
                        </div>
                        {isDone && (
                          <div className="absolute top-3 right-3">
                            <span className="badge badge-green text-[10px] font-semibold bg-white/90">
                              ✓ COMPLETED
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        {/* Category */}
                        <span className="text-[10px] tracking-widest uppercase text-ekam-gold font-medium mb-1">
                          {course.categoryLabel}
                        </span>

                        {/* Title */}
                        <h3 className="font-serif text-base leading-snug mb-1.5 line-clamp-2" style={{ color: '#1C0E04' }}>
                          {course.title}
                        </h3>

                        {/* Instructor */}
                        <p className="text-xs mb-3" style={{ color: '#7A6550' }}>
                          by {course.instructor?.name}
                        </p>

                        {/* Progress section */}
                        <div className="flex items-center gap-4 mb-4">
                          {/* Ring */}
                          <div className="relative flex-shrink-0">
                            <ProgressRing pct={p.pct} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-[10px] font-bold" style={{ color: isDone ? '#1A5C38' : '#8C6210' }}>
                                {p.pct}%
                              </span>
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-medium" style={{ color: '#3D2814' }}>
                                {isDone ? 'Course Complete!' : isStarted ? 'In Progress' : 'Not Started'}
                              </span>
                              <span className="text-xs" style={{ color: '#7A6550' }}>
                                {p.completed}/{p.total} lessons
                              </span>
                            </div>
                            {/* Bar */}
                            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#EDE4D8' }}>
                              <div className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${p.pct}%`,
                                  background: isDone ? '#1A5C38' : 'linear-gradient(to right, #8C6210, #C4881A)'
                                }} />
                            </div>
                          </div>
                        </div>

                        {/* Course meta */}
                        <div className="flex items-center gap-3 text-xs mb-4" style={{ color: '#7A6550' }}>
                          <span className="flex items-center gap-1">
                            <BookOpen size={11} /> {course.totalLessons} lessons
                          </span>
                          <span style={{ color: '#E2D5C4' }}>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} /> {course.duration}
                          </span>
                          <span style={{ color: '#E2D5C4' }}>•</span>
                          <span className="flex items-center gap-1">
                            <Star size={11} className="fill-ekam-gold text-ekam-gold" /> {course.rating}
                          </span>
                        </div>

                        {/* CTA */}
                        <div className="mt-auto pt-3 flex gap-2" style={{ borderTop: '1px solid #EDE4D8' }}>
                          <Link href={`/courses/${course.id}`}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              isDone ? 'btn-outline' : 'btn-gold'
                            }`}>
                            {isDone ? (
                              <><CheckCircle2 size={14} /> Review Course</>
                            ) : isStarted ? (
                              <><Play size={14} className="fill-white" /> Continue</>
                            ) : (
                              <><Play size={14} className="fill-white" /> Start Learning</>
                            )}
                          </Link>
                          {isDone && (
                            <button className="px-3 py-2.5 rounded-xl text-xs font-medium transition-all"
                              style={{ background: 'rgba(26,92,56,0.08)', border: '1px solid rgba(26,92,56,0.2)', color: '#1A5C38' }}
                              title="Download Certificate">
                              <Award size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

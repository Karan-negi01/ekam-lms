'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Star, Clock, Users, BookOpen, Globe, Award, ChevronDown, ChevronUp,
  Play, Lock, CheckCircle2, ArrowLeft, Share2, Heart, BadgeCheck,
  Zap
} from 'lucide-react'
import { courses } from '@/lib/data'
import { formatPrice, formatNumber, getDiscount } from '@/lib/utils'

export default function CourseDetailPage() {
  const { courseId } = useParams()
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState([0])
  const [activeTab, setActiveTab] = useState('curriculum')
  const [enrolled, setEnrolled] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [user, setUser] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [completedLessons, setCompletedLessons] = useState([])

  const course = courses.find(c => c.id === courseId)

  useEffect(() => {
    const stored = localStorage.getItem('ekam_user')
    if (stored) setUser(JSON.parse(stored))

    const enrolledCourses = JSON.parse(localStorage.getItem('ekam_enrolled') || '[]')
    setEnrolled(enrolledCourses.includes(courseId))

    const wishlistItems = JSON.parse(localStorage.getItem('ekam_wishlist') || '[]')
    setWishlist(wishlistItems.includes(courseId))

    const completed = JSON.parse(localStorage.getItem(`ekam_progress_${courseId}`) || '[]')
    setCompletedLessons(completed)

    const handleScroll = () => setStickyVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [courseId])

  if (!course) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center" style={{ background: '#FDFAF4' }}>
        <div className="text-center">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="font-serif text-2xl text-ekam-cream mb-2">Course not found</h2>
          <p className="text-ekam-muted mb-6">This course doesn&apos;t exist or has been removed.</p>
          <Link href="/courses" className="btn-gold">Browse Courses</Link>
        </div>
      </div>
    )
  }

  const discount = getDiscount(course.originalPrice, course.price)
  const totalLessons = course?.curriculum?.reduce((acc, sec) => acc + sec.lessons.length, 0) || 0

  const handleEnroll = () => {
    if (!user) {
      router.push('/auth/login?redirect=' + encodeURIComponent(`/courses/${courseId}`))
      return
    }
    const enrolledCourses = JSON.parse(localStorage.getItem('ekam_enrolled') || '[]')
    if (!enrolledCourses.includes(courseId)) {
      enrolledCourses.push(courseId)
      localStorage.setItem('ekam_enrolled', JSON.stringify(enrolledCourses))
    }
    setEnrolled(true)
  }

  const handleWishlist = () => {
    const wishlistItems = JSON.parse(localStorage.getItem('ekam_wishlist') || '[]')
    const idx = wishlistItems.indexOf(courseId)
    if (idx > -1) wishlistItems.splice(idx, 1)
    else wishlistItems.push(courseId)
    localStorage.setItem('ekam_wishlist', JSON.stringify(wishlistItems))
    setWishlist(idx === -1)
  }

  const toggleSection = (i) => {
    setExpandedSections(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    )
  }

  const openLesson = (lesson) => {
    setCurrentLesson(lesson)
    // Mark lesson as completed when opened
    if (enrolled) {
      setCompletedLessons(prev => {
        if (prev.includes(lesson.id)) return prev
        const updated = [...prev, lesson.id]
        localStorage.setItem(`ekam_progress_${courseId}`, JSON.stringify(updated))
        return updated
      })
    }
  }

  const totalLessonsCount = course?.curriculum?.reduce((a, s) => a + s.lessons.length, 0) || 0
  const progressPct = totalLessonsCount > 0 ? Math.round((completedLessons.length / totalLessonsCount) * 100) : 0

  const PriceCard = ({ compact = false }) => (
    <div className={`rounded-2xl overflow-hidden ${compact ? '' : 'shadow-card'}`}
      style={{ background: '#FFFFFF', border: '1px solid #E2D5C4' }}>
      {currentLesson && enrolled ? (
        <div className="p-6">
          <div className="video-container rounded-xl overflow-hidden mb-4">
            <iframe
              src={`https://www.youtube.com/embed/${course.videoId}?rel=0&modestbranding=1`}
              title="Course Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-ekam-cream font-medium mb-1">{currentLesson.title}</p>
          <p className="text-xs text-ekam-muted">{currentLesson.duration}</p>
        </div>
      ) : (
        <div className="relative" style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #1a0f0a, #2e1a10)' }}>
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
            <span className="text-5xl">{course.thumbnailEmoji}</span>
            <div className="w-14 h-14 rounded-full bg-ekam-gold/20 backdrop-blur-sm border border-ekam-gold/30 flex items-center justify-center cursor-pointer hover:bg-ekam-gold/30 transition-all">
              <Play size={20} className="text-ekam-gold fill-ekam-gold ml-1" />
            </div>
            <p className="text-xs text-ekam-cream-dim">Preview available</p>
          </div>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-3xl font-semibold text-ekam-gold">{formatPrice(course.price)}</span>
          {course.originalPrice > course.price && (
            <span className="text-lg text-ekam-muted line-through">{formatPrice(course.originalPrice)}</span>
          )}
          {discount > 0 && <span className="badge badge-green text-xs">{discount}% OFF</span>}
        </div>
        <p className="text-xs text-ekam-saffron mb-4 flex items-center gap-1">
          <Zap size={11} /> Limited time offer — ends soon
        </p>

        {enrolled ? (
          <button
            onClick={() => openLesson(course.curriculum?.[0]?.lessons?.[0])}
            className="btn-gold w-full justify-center mb-3 py-3.5 text-base rounded-xl"
          >
            <Play size={16} /> Continue Learning
          </button>
        ) : (
          <>
            <button onClick={handleEnroll} className="btn-gold w-full justify-center mb-3 py-3.5 text-base rounded-xl">
              Enrol Now
            </button>
            <button onClick={handleEnroll} className="btn-outline w-full justify-center mb-3 py-3">
              Try for Free
            </button>
          </>
        )}

        <button
          onClick={handleWishlist}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all ${
            wishlist ? 'text-red-400' : 'text-ekam-muted hover:text-ekam-cream'
          }`}
        >
          <Heart size={15} className={wishlist ? 'fill-red-400' : ''} />
          {wishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </button>

        <div className="mt-4 pt-4 border-t border-ekam-border space-y-2">
          <p className="text-xs text-ekam-muted font-medium tracking-wide uppercase mb-2">This course includes:</p>
          {[
            [Clock, `${course.duration} of video content`],
            [BookOpen, `${course.totalLessons} lessons`],
            [Globe, `Language: ${course.language}`],
            [Award, 'Certificate of completion'],
            [CheckCircle2, 'Lifetime access'],
          ].map(([Icon, text], i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-ekam-cream-dim">
              <Icon size={13} className="text-ekam-gold flex-shrink-0" />
              {text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-2 justify-center">
          <button className="flex items-center gap-1.5 text-xs text-ekam-muted hover:text-ekam-cream transition-colors">
            <Share2 size={13} /> Share
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-16" style={{ background: '#FDFAF4' }}>
      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(to bottom, #F5EFE4, #FDFAF4)', borderBottom: '1px solid #E2D5C4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-xs text-ekam-muted hover:text-ekam-cream mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              {/* Category breadcrumb */}
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-gold text-xs">{course.categoryLabel}</span>
                {course.bestseller && <span className="badge badge-saffron text-xs">⚡ Bestseller</span>}
              </div>

              <h1 className="font-serif text-3xl md:text-4xl text-ekam-cream font-semibold leading-tight mb-4">
                {course.title}
              </h1>

              <p className="text-ekam-muted leading-relaxed mb-6">{course.shortDesc}</p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                <div className="flex items-center gap-1">
                  <Star size={15} className="fill-ekam-gold text-ekam-gold" />
                  <span className="font-semibold text-ekam-gold">{course.rating}</span>
                  <span className="text-ekam-muted">({formatNumber(course.reviewCount)} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-ekam-muted">
                  <Users size={14} />
                  <span>{formatNumber(course.studentCount)} students</span>
                </div>
                <div className="flex items-center gap-1 text-ekam-muted">
                  <Clock size={14} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1 text-ekam-muted">
                  <BookOpen size={14} />
                  <span>{course.totalLessons} lessons</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: '#FFFFFF', border: '1px solid #E2D5C4' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
                  {course.instructor?.initials}
                </div>
                <div>
                  <p className="text-xs text-ekam-muted">Your Instructor</p>
                  <div className="flex items-center gap-2">
                    <p className="font-serif text-ekam-cream font-medium">{course.instructor?.name}</p>
                    {course.instructor?.verified && <BadgeCheck size={14} className="text-ekam-gold" />}
                  </div>
                  <p className="text-xs text-ekam-gold">{course.instructor?.title}</p>
                </div>
                <div className="ml-auto text-right text-xs text-ekam-muted">
                  <p className="text-ekam-gold font-medium">{course.instructor?.rating} ★</p>
                  <p>{formatNumber(course.instructor?.students || 0)} students</p>
                </div>
              </div>
            </div>

            {/* Price Card — desktop sidebar */}
            <div className="hidden lg:block sticky top-24">
              <PriceCard />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky mobile price bar */}
      {stickyVisible && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4 glass"
          style={{ borderTop: '1px solid #E2D5C4' }}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="text-xl font-semibold text-ekam-gold">{formatPrice(course.price)}</span>
              {discount > 0 && <span className="ml-2 text-xs badge badge-green">{discount}% OFF</span>}
            </div>
            <button onClick={handleEnroll} className="btn-gold flex-1 justify-center py-3">
              {enrolled ? 'Continue Learning' : 'Enrol Now'}
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-1 mb-8 overflow-x-auto scrollbar-hide"
              style={{ borderBottom: '1px solid #E2D5C4' }}>
              {[
                ['curriculum', 'Curriculum'],
                ['overview', 'Overview'],
                ['instructor', 'Instructor'],
                ['reviews', 'Reviews'],
              ].map(([tab, label]) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'text-ekam-gold border-ekam-gold'
                      : 'text-ekam-muted border-transparent hover:text-ekam-cream hover:border-ekam-border'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-xl" style={{ color: '#1C0E04' }}>Course Curriculum</h2>
                  <span className="text-xs text-ekam-muted">{course.curriculum?.length} sections • {totalLessonsCount} lessons • {course.duration}</span>
                </div>

                {/* Progress bar (only if enrolled) */}
                {enrolled && (
                  <div className="rounded-xl p-4 mb-5 flex items-center gap-4"
                    style={{ background: 'rgba(140,98,16,0.05)', border: '1px solid rgba(140,98,16,0.15)' }}>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium" style={{ color: '#1C0E04' }}>Your Progress</span>
                        <span className="text-xs font-semibold text-ekam-gold">{completedLessons.length}/{totalLessonsCount} lessons</span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: '#EDE4D8' }}>
                        <div className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${progressPct}%`,
                            background: progressPct === 100 ? '#1A5C38' : 'linear-gradient(to right, #8C6210, #C4881A)'
                          }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-2xl font-semibold font-serif" style={{ color: progressPct === 100 ? '#1A5C38' : '#8C6210' }}>
                        {progressPct}%
                      </span>
                      <p className="text-[10px] text-ekam-muted">Complete</p>
                    </div>
                  </div>
                )}


                <div className="space-y-3">
                  {course.curriculum?.map((section, i) => (
                    <div key={i} className="rounded-xl overflow-hidden"
                      style={{ background: '#FFFFFF', border: '1px solid #E2D5C4' }}>
                      <button
                        onClick={() => toggleSection(i)}
                        className="w-full flex items-center justify-between p-4 hover:bg-ekam-gold/5 transition-all"
                      >
                        <div className="flex items-center gap-3 text-left">
                          <div className="w-6 h-6 rounded-full bg-ekam-gold/15 flex items-center justify-center text-xs font-bold text-ekam-gold flex-shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <p className="font-medium text-ekam-cream text-sm">{section.section}</p>
                            <p className="text-xs text-ekam-muted mt-0.5">{section.lessons.length} lessons</p>
                          </div>
                        </div>
                        {expandedSections.includes(i)
                          ? <ChevronUp size={16} className="text-ekam-muted flex-shrink-0" />
                          : <ChevronDown size={16} className="text-ekam-muted flex-shrink-0" />
                        }
                      </button>

                      {expandedSections.includes(i) && (
                        <div style={{ borderTop: '1px solid #EDE4D8' }}>
                          {section.lessons.map((lesson, j) => {
                            const isCompleted = completedLessons.includes(lesson.id)
                            const isActive = currentLesson?.id === lesson.id
                            const canAccess = lesson.free || enrolled
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => canAccess ? openLesson(lesson) : handleEnroll()}
                                className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all"
                                style={{ background: isActive ? 'rgba(140,98,16,0.06)' : 'transparent' }}
                              >
                                {/* Icon: completed / playing / locked */}
                                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={{
                                    background: isCompleted ? 'rgba(26,92,56,0.12)'
                                      : canAccess ? 'rgba(140,98,16,0.10)'
                                      : '#EDE4D8'
                                  }}>
                                  {isCompleted
                                    ? <CheckCircle2 size={13} style={{ color: '#1A5C38' }} />
                                    : canAccess
                                      ? <Play size={10} className="ml-0.5" style={{ color: '#8C6210', fill: '#8C6210' }} />
                                      : <Lock size={10} className="text-ekam-muted" />
                                  }
                                </div>

                                <div className="flex-1 text-left min-w-0">
                                  <p className="text-xs font-medium truncate"
                                    style={{ color: isActive ? '#8C6210' : isCompleted ? '#1A5C38' : '#3D2814' }}>
                                    {lesson.title}
                                  </p>
                                  {lesson.free && !enrolled && (
                                    <span className="text-[10px] text-ekam-gold">Free preview</span>
                                  )}
                                </div>

                                <span className="text-xs flex-shrink-0" style={{ color: '#7A6550' }}>
                                  {lesson.duration}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-xl text-ekam-cream mb-4">About This Course</h2>
                  <p className="text-ekam-muted leading-relaxed">{course.description}</p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-ekam-cream mb-4">What You&apos;ll Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Foundational techniques of the art form',
                      'Historical and cultural context',
                      'Performance and practical skills',
                      'Theory and philosophy',
                      'Advanced compositions and pieces',
                      'Teaching methodology',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-ekam-cream-dim">
                        <CheckCircle2 size={15} className="text-ekam-gold flex-shrink-0 mt-0.5" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-ekam-cream mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags?.map(tag => (
                      <span key={tag} className="badge badge-muted text-xs">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Instructor Tab */}
            {activeTab === 'instructor' && (
              <div>
                <h2 className="font-serif text-xl text-ekam-cream mb-6">About Your Instructor</h2>
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
                    {course.instructor?.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-serif text-xl text-ekam-cream">{course.instructor?.name}</h3>
                      {course.instructor?.verified && <BadgeCheck size={16} className="text-ekam-gold" />}
                    </div>
                    <p className="text-ekam-gold text-sm mb-3">{course.instructor?.title}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-ekam-muted">
                      <span className="flex items-center gap-1"><Star size={11} className="text-ekam-gold fill-ekam-gold" /> {course.instructor?.rating} Rating</span>
                      <span>{formatNumber(course.instructor?.students || 0)} Students</span>
                      <span>{course.instructor?.courses} Courses</span>
                    </div>
                  </div>
                </div>
                {course.instructor?.bio && (
                  <p className="text-sm text-ekam-muted leading-relaxed">{course.instructor.bio}</p>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h2 className="font-serif text-xl text-ekam-cream mb-6">Student Reviews</h2>
                <div className="flex items-center gap-8 p-6 rounded-xl mb-6"
                  style={{ background: '#FFFFFF', border: '1px solid #E2D5C4' }}>
                  <div className="text-center">
                    <div className="text-5xl font-semibold text-ekam-gold mb-1">{course.rating}</div>
                    <div className="flex gap-0.5 justify-center mb-1">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} size={14} className={s <= Math.round(course.rating) ? 'fill-ekam-gold text-ekam-gold' : 'text-ekam-border'} />
                      ))}
                    </div>
                    <p className="text-xs text-ekam-muted">Course Rating</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5,4,3,2,1].map(stars => {
                      const pct = stars === 5 ? 65 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 2 : 1
                      return (
                        <div key={stars} className="flex items-center gap-2 text-xs">
                          <span className="text-ekam-muted w-4">{stars}</span>
                          <Star size={10} className="text-ekam-gold fill-ekam-gold" />
                          <div className="flex-1 h-1.5 rounded-full bg-ekam-border overflow-hidden">
                            <div className="h-full rounded-full bg-ekam-gold" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-ekam-muted w-6">{pct}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <p className="text-sm text-ekam-muted text-center py-8">
                  {formatNumber(course.reviewCount)} reviews available after enrollment
                </p>
              </div>
            )}
          </div>

          {/* Mobile Price Card */}
          <div className="lg:hidden">
            <PriceCard compact />
          </div>
        </div>
      </div>
    </div>
  )
}

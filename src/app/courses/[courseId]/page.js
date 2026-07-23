'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Star, Clock, Users, BookOpen, Globe, Award, ChevronDown, ChevronUp,
  Play, Lock, CheckCircle2, ArrowLeft, Share2, Heart, BadgeCheck,
  Zap, ListTree, Info, GraduationCap, MessageSquare, FileText, Download, XCircle
} from 'lucide-react'
import { courses as staticCourses } from '@/lib/data'
import {
  formatPrice, formatNumber, getDiscount, getPublishedUserCourses,
  hasCourseAccess, purchaseCourse, subscribe, getSubscription,
  getLessonProgress, markLessonComplete, pushNotification,
} from '@/lib/utils'
import { getFileUrl } from '@/lib/fileStore'
import { addXP, awardBadge, hasBadgeForCourse, getLevelTier, XP_LESSON_VIDEO, XP_LESSON_TEST, XP_COURSE_COMPLETE } from '@/lib/gamification'
import CategoryIcon from '@/components/icons/CategoryIcon'
import { Mandala, PatternDots } from '@/components/decor/Decorative'

function extractYouTubeId(url) {
  if (!url) return null
  if (url.includes('v=')) return url.split('v=')[1]?.split('&')[0]
  if (url.includes('youtu.be/')) return url.split('youtu.be/')[1]?.split('?')[0]
  return null
}

export default function CourseDetailPage() {
  const { courseId } = useParams()
  const router = useRouter()
  const [expandedSections, setExpandedSections] = useState([0])
  const [activeTab, setActiveTab] = useState('curriculum')
  const [enrolled, setEnrolled] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [subscriptionActive, setSubscriptionActive] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [user, setUser] = useState(null)
  const [currentLesson, setCurrentLesson] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [testActive, setTestActive] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [replayKey, setReplayKey] = useState(0)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [completedLessons, setCompletedLessons] = useState([])
  const [course, setCourse] = useState(() => staticCourses.find(c => c.id === courseId))
  const [courseLoaded, setCourseLoaded] = useState(() => !!staticCourses.find(c => c.id === courseId))

  useEffect(() => {
    const resolvedCourse = course || getPublishedUserCourses().find(c => c.id === courseId) || null
    if (!course && resolvedCourse) setCourse(resolvedCourse)
    setCourseLoaded(true)

    const stored = localStorage.getItem('ekam_user')
    const u = stored ? JSON.parse(stored) : null
    setUser(u)

    const enrolledCourses = JSON.parse(localStorage.getItem('ekam_enrolled') || '[]')
    setEnrolled(enrolledCourses.includes(courseId))

    const wishlistItems = JSON.parse(localStorage.getItem('ekam_wishlist') || '[]')
    setWishlist(wishlistItems.includes(courseId))

    if (u && resolvedCourse) {
      setHasAccess(hasCourseAccess(u.id, resolvedCourse))
      setSubscriptionActive(getSubscription(u.id).active)
      setCompletedLessons(getLessonProgress(u.id, courseId))
    }

    const handleScroll = () => setStickyVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])

  if (!courseLoaded) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center" style={{ background: '#FFFFFF' }}>
        <div className="loader-gold w-8 h-8" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center" style={{ background: '#FFFFFF' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(140,98,16,0.08)' }}>
            <BookOpen size={26} className="text-ekam-gold" />
          </div>
          <h2 className="text-2xl text-ekam-cream mb-2">Course not found</h2>
          <p className="text-ekam-muted mb-6">This course doesn&apos;t exist or has been removed.</p>
          <Link href="/courses" className="btn-gold">Browse Courses</Link>
        </div>
      </div>
    )
  }

  const discount = getDiscount(course.originalPrice, course.price)
  const allLessons = course.curriculum?.flatMap(s => s.lessons) || []
  const totalLessonsCount = allLessons.length
  const progressPct = totalLessonsCount > 0 ? Math.round((completedLessons.length / totalLessonsCount) * 100) : 0
  const isSubscriptionCourse = course.pricingModel === 'subscription'

  const isLessonComplete = (lessonId) => completedLessons.some(p => p.lessonId === lessonId)

  const canAccessLesson = (lesson) => {
    if (!hasAccess) return false
    const idx = allLessons.findIndex(l => l.id === lesson.id)
    if (idx <= 0) return true
    return isLessonComplete(allLessons[idx - 1].id)
  }

  const addToMyLearning = () => {
    const enrolledCourses = JSON.parse(localStorage.getItem('ekam_enrolled') || '[]')
    if (!enrolledCourses.includes(courseId)) {
      enrolledCourses.push(courseId)
      localStorage.setItem('ekam_enrolled', JSON.stringify(enrolledCourses))
    }
    setEnrolled(true)
  }

  const handlePurchase = () => {
    if (!user) { router.push('/auth/login?redirect=' + encodeURIComponent(`/courses/${courseId}`)); return }
    purchaseCourse(user.id, courseId)
    setHasAccess(true)
    addToMyLearning()
  }

  const handleSubscribe = () => {
    if (!user) { router.push('/auth/login?redirect=' + encodeURIComponent(`/courses/${courseId}`)); return }
    subscribe(user.id)
    setSubscriptionActive(true)
    if (isSubscriptionCourse) setHasAccess(true)
    addToMyLearning()
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
    if (!user) { router.push('/auth/login?redirect=' + encodeURIComponent(`/courses/${courseId}`)); return }
    if (!canAccessLesson(lesson)) return
    setCurrentLesson(lesson)
    setVideoEnded(false)
    setTestActive(false)
    setTestResult(null)
    setReplayKey(k => k + 1)
  }

  const handleVideoEnded = () => {
    setVideoEnded(true)
    if (user && currentLesson && !isLessonComplete(currentLesson.id)) {
      addXP(user.id, XP_LESSON_VIDEO)
    }
  }

  const handleTestPass = () => {
    const updated = markLessonComplete(user.id, courseId, currentLesson.id)
    setCompletedLessons(updated)
    addXP(user.id, XP_LESSON_TEST)
    setTestActive(false)
    setTestResult({ passed: true })

    const allDone = allLessons.every(l => updated.some(p => p.lessonId === l.id))
    if (allDone && !hasBadgeForCourse(user.id, course.id)) {
      const tier = getLevelTier(course.level)
      awardBadge(user.id, { courseId: course.id, courseTitle: course.title, tier })
      addXP(user.id, XP_COURSE_COMPLETE)
      pushNotification(user.id, {
        type: 'badge',
        title: 'Badge earned!',
        message: `You completed "${course.title}" and earned the ${course.categoryLabel} ${tier} badge.`,
        courseId,
      })
    }
  }

  const handleTestFail = (correctCount, total) => {
    setTestResult({ passed: false, correctCount, total })
    setTestActive(false)
    setVideoEnded(false)
    setReplayKey(k => k + 1)
  }

  const nextLessonToPlay = allLessons.find(l => !isLessonComplete(l.id)) || allLessons[0]

  const introVideoId = course.videoId

  const PriceCard = ({ compact = false }) => (
    <div className={`rounded-2xl overflow-hidden ${compact ? '' : 'shadow-card'}`}
      style={{ background: '#FFFFFF', border: '1px solid #E2D5C4' }}>
      {currentLesson && hasAccess ? (
        <div className="p-6">
          <div className="video-container rounded-xl overflow-hidden mb-4">
            <LessonVideoPlayer key={replayKey} lesson={currentLesson} fallbackVideoId={course.videoId} onEnded={handleVideoEnded} />
          </div>
          <p className="text-sm text-ekam-cream font-medium mb-1">{currentLesson.title}</p>
          <p className="text-xs text-ekam-muted mb-3">{currentLesson.duration}</p>

          {!videoEnded && !testResult && (
            <p className="text-xs text-ekam-muted">Watch the full video to unlock this lesson&apos;s test.</p>
          )}
          {videoEnded && !testActive && !testResult && (
            <button onClick={() => setTestActive(true)} className="btn-gold w-full justify-center">
              Take Test
            </button>
          )}
          {testActive && (
            <LessonTest lesson={currentLesson} onPass={handleTestPass} onFail={handleTestFail} />
          )}
          {testResult?.passed && (
            <div className="p-3 rounded-lg text-xs flex items-center gap-2" style={{ background: 'rgba(184,70,15,0.08)', border: '1px solid rgba(184,70,15,0.25)', color: '#B8460F' }}>
              <CheckCircle2 size={14} /> Passed! Next lesson unlocked.
            </div>
          )}
          {testResult && !testResult.passed && (
            <div className="p-3 rounded-lg text-xs" style={{ background: 'rgba(176,24,24,0.06)', border: '1px solid rgba(176,24,24,0.2)' }}>
              <p style={{ color: '#B01818' }} className="font-medium mb-1 flex items-center gap-1.5">
                <XCircle size={13} /> {testResult.correctCount}/{testResult.total} correct
              </p>
              <p className="text-ekam-muted mb-2">Watch the video again and retake the test to continue.</p>
              <button onClick={() => { setVideoEnded(false); setTestResult(null); setReplayKey(k => k + 1) }}
                className="btn-outline text-xs w-full justify-center py-2">
                Rewatch Video
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: 'linear-gradient(135deg, #1a0f0a, #2e1a10)' }}>
          {introVideoId ? (
            <iframe
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              src={`https://www.youtube.com/embed/${introVideoId}?rel=0&modestbranding=1`}
              title="Intro Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <CategoryIcon id={course.category} size={200} className="absolute inset-0 m-auto text-white opacity-[0.06]" />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
                <div className="w-14 h-14 rounded-full bg-ekam-gold/20 backdrop-blur-sm border border-ekam-gold/30 flex items-center justify-center">
                  <Play size={20} className="text-ekam-gold fill-ekam-gold ml-1" />
                </div>
                <p className="text-xs text-ekam-cream-dim">No preview video available</p>
              </div>
            </>
          )}
        </div>
      )}

      <div className="p-5">
        <div className="flex items-baseline gap-3 mb-1 flex-wrap">
          {isSubscriptionCourse ? (
            <span className="text-xl font-semibold text-ekam-gold">Included in Subscription</span>
          ) : (
            <>
              <span className="text-3xl font-semibold text-ekam-gold">{formatPrice(course.price)}</span>
              {course.originalPrice > course.price && (
                <span className="text-lg text-ekam-muted line-through">{formatPrice(course.originalPrice)}</span>
              )}
              {discount > 0 && <span className="badge badge-gold text-xs">{discount}% OFF</span>}
            </>
          )}
        </div>
        {!isSubscriptionCourse && (
          <p className="text-xs text-ekam-saffron mb-4 flex items-center gap-1">
            <Zap size={11} /> Limited time offer — ends soon
          </p>
        )}

        {hasAccess ? (
          <button
            onClick={() => openLesson(nextLessonToPlay)}
            className="btn-gold w-full justify-center mb-3 py-3.5 text-base rounded-xl"
          >
            <Play size={16} /> Continue Learning
          </button>
        ) : isSubscriptionCourse ? (
          <button onClick={handleSubscribe} className="btn-gold w-full justify-center mb-3 py-3.5 text-base rounded-xl">
            {subscriptionActive ? 'Already Subscribed — Refresh' : 'Subscribe — ₹100/mo'}
          </button>
        ) : (
          <button onClick={handlePurchase} className="btn-gold w-full justify-center mb-3 py-3.5 text-base rounded-xl">
            Buy Now — {formatPrice(course.price)}
          </button>
        )}

        <button
          onClick={handleWishlist}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all ${
            wishlist ? 'text-ekam-rust' : 'text-ekam-muted hover:text-ekam-cream'
          }`}
        >
          <Heart size={15} className={wishlist ? 'fill-ekam-rust' : ''} />
          {wishlist ? 'Saved to Wishlist' : 'Add to Wishlist'}
        </button>

        <div className="mt-4 pt-4 border-t border-ekam-border space-y-2">
          <p className="text-xs text-ekam-muted font-medium tracking-wide uppercase mb-2">This course includes:</p>
          {[
            [Clock, `${course.duration} of video content`],
            [BookOpen, `${totalLessonsCount} lessons`],
            [Globe, `Language: ${course.language}`],
            [Award, 'Certificate & badge on completion'],
            [CheckCircle2, 'Lifetime access'],
            ...(course.studyMaterialType && course.studyMaterialType !== 'none'
              ? [[FileText, course.studyMaterialType === 'single' ? 'Downloadable study material (PDF)' : 'PDF study material per lesson']]
              : []),
          ].map(([Icon, text], i) => (
            <div key={i} className="flex items-center gap-2.5 text-xs text-ekam-cream-dim">
              <Icon size={13} className="text-ekam-gold flex-shrink-0" />
              {text}
            </div>
          ))}
        </div>

        {course.studyMaterialType === 'single' && course.studyMaterialUrl && (
          hasAccess ? (
            <a href={course.studyMaterialUrl} target="_blank" rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{ background: 'rgba(140,98,16,0.08)', border: '1px solid rgba(140,98,16,0.2)', color: '#8C6210' }}>
              <Download size={14} /> Download Study Material
            </a>
          ) : (
            <div className="mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm"
              style={{ background: '#F7F6F3', color: '#9B8878' }}>
              <Lock size={13} /> Study material unlocks after purchase
            </div>
          )
        )}

        <div className="mt-4 flex gap-2 justify-center">
          <button className="flex items-center gap-1.5 text-xs text-ekam-muted hover:text-ekam-cream transition-colors">
            <Share2 size={13} /> Share
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pt-16" style={{ background: '#FFFFFF' }}>
      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ background: '#FFFFFF', borderBottom: '1px solid #E2D5C4' }}>
        <PatternDots />
        <Mandala className="absolute -right-28 -top-24 w-80 h-80 opacity-30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <Link href="/courses" className="inline-flex items-center gap-1.5 text-xs text-ekam-muted hover:text-ekam-cream mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              {/* Category breadcrumb */}
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-gold text-xs">{course.categoryLabel}</span>
                {course.bestseller && <span className="badge badge-saffron text-xs">⚡ Bestseller</span>}
                {isSubscriptionCourse && <span className="badge badge-gold text-xs">Subscription</span>}
              </div>

              <h1 className="text-3xl md:text-4xl text-ekam-cream font-semibold leading-tight mb-4">
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
                  <span>{totalLessonsCount} lessons</span>
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
                    <p className="text-ekam-cream font-medium">{course.instructor?.name}</p>
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
              <span className="text-xl font-semibold text-ekam-gold">
                {isSubscriptionCourse ? 'Subscription' : formatPrice(course.price)}
              </span>
              {!isSubscriptionCourse && discount > 0 && <span className="ml-2 text-xs badge badge-gold">{discount}% OFF</span>}
            </div>
            <button
              onClick={hasAccess ? () => openLesson(nextLessonToPlay) : (isSubscriptionCourse ? handleSubscribe : handlePurchase)}
              className="btn-gold flex-1 justify-center py-3">
              {hasAccess ? 'Continue Learning' : (isSubscriptionCourse ? 'Subscribe' : 'Buy Now')}
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
                ['curriculum', 'Curriculum', ListTree],
                ['overview', 'Overview', Info],
                ['instructor', 'Instructor', GraduationCap],
                ['reviews', 'Reviews', MessageSquare],
              ].map(([tab, label, Icon]) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-px ${
                    activeTab === tab
                      ? 'text-ekam-gold border-ekam-gold'
                      : 'text-ekam-muted border-transparent hover:text-ekam-cream hover:border-ekam-border'
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              ))}
            </div>

            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl" style={{ color: '#1C0E04' }}>Course Curriculum</h2>
                  <span className="text-xs text-ekam-muted">{course.curriculum?.length} sections • {totalLessonsCount} lessons • {course.duration}</span>
                </div>

                {!hasAccess && (
                  <div className="rounded-xl p-4 mb-5 flex items-center gap-3 text-sm"
                    style={{ background: 'rgba(140,98,16,0.05)', border: '1px solid rgba(140,98,16,0.15)', color: '#7A6550' }}>
                    <Lock size={16} className="text-ekam-gold flex-shrink-0" />
                    {isSubscriptionCourse
                      ? "This course is included in Ekam's subscription — subscribe to unlock every lesson."
                      : 'Buy this course to unlock all lessons. Lessons unlock one at a time as you pass each test.'}
                  </div>
                )}

                {/* Progress bar (only if has access) */}
                {hasAccess && (
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
                            background: progressPct === 100 ? '#B8460F' : 'linear-gradient(to right, #8C6210, #C4881A)'
                          }} />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-2xl font-semibold" style={{ color: progressPct === 100 ? '#B8460F' : '#8C6210' }}>
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
                          {section.lessons.map((lesson) => {
                            const isCompleted = isLessonComplete(lesson.id)
                            const isActive = currentLesson?.id === lesson.id
                            const accessible = canAccessLesson(lesson)
                            const sequentiallyLocked = hasAccess && !accessible
                            return (
                              <div key={lesson.id} className="w-full flex items-center gap-2 px-4 py-3 text-sm transition-all"
                                style={{ background: isActive ? 'rgba(140,98,16,0.06)' : 'transparent' }}
                              >
                                <button
                                  onClick={() => openLesson(lesson)}
                                  disabled={sequentiallyLocked}
                                  className="flex items-center gap-3 flex-1 min-w-0 text-left disabled:cursor-not-allowed"
                                >
                                  {/* Icon: completed / playing / locked */}
                                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                                    style={{
                                      background: isCompleted ? 'rgba(184,70,15,0.12)'
                                        : accessible ? 'rgba(140,98,16,0.10)'
                                        : '#EDE4D8'
                                    }}>
                                    {isCompleted
                                      ? <CheckCircle2 size={13} style={{ color: '#B8460F' }} />
                                      : accessible
                                        ? <Play size={10} className="ml-0.5" style={{ color: '#8C6210', fill: '#8C6210' }} />
                                        : <Lock size={10} className="text-ekam-muted" />
                                    }
                                  </div>

                                  <div className="flex-1 text-left min-w-0">
                                    <p className="text-xs font-medium truncate"
                                      style={{ color: isActive ? '#8C6210' : isCompleted ? '#B8460F' : '#3D2814' }}>
                                      {lesson.title}
                                    </p>
                                    {sequentiallyLocked && (
                                      <span className="text-[10px] text-ekam-muted">Complete the previous lesson first</span>
                                    )}
                                  </div>

                                  <span className="text-xs flex-shrink-0" style={{ color: '#7A6550' }}>
                                    {lesson.duration}
                                  </span>
                                </button>

                                {(lesson.materialUrl || lesson.materialFileId) && (
                                  <LessonMaterialLink lesson={lesson} canAccess={accessible} />
                                )}
                              </div>
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
                  <h2 className="text-xl text-ekam-cream mb-4">About This Course</h2>
                  <p className="text-ekam-muted leading-relaxed">{course.description}</p>
                </div>

                <div>
                  <h3 className="text-lg text-ekam-cream mb-4">What You&apos;ll Learn</h3>
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
                  <h3 className="text-lg text-ekam-cream mb-3">Tags</h3>
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
                <h2 className="text-xl text-ekam-cream mb-6">About Your Instructor</h2>
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
                    {course.instructor?.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl text-ekam-cream">{course.instructor?.name}</h3>
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
                <h2 className="text-xl text-ekam-cream mb-6">Student Reviews</h2>
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

// The desktop and mobile PriceCard both mount (CSS just hides one), so
// multiple LessonVideoPlayer instances can try to load the YouTube IFrame
// API at once — a shared queue means they don't clobber each other's
// window.onYouTubeIframeAPIReady callback.
function loadYouTubeAPI(onReady) {
  if (window.YT && window.YT.Player) { onReady(); return }
  window.__ytApiCallbacks = window.__ytApiCallbacks || []
  window.__ytApiCallbacks.push(onReady)
  if (!window.__ytApiLoading) {
    window.__ytApiLoading = true
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.body.appendChild(tag)
    window.onYouTubeIframeAPIReady = () => {
      window.__ytApiCallbacks.forEach(cb => cb())
      window.__ytApiCallbacks = []
    }
  }
}

function LessonVideoPlayer({ lesson, fallbackVideoId, onEnded }) {
  const [fileUrl, setFileUrl] = useState(null)
  const playerRef = useRef(null)
  const containerId = useRef('yt-player-' + Math.random().toString(36).slice(2))

  useEffect(() => {
    if (lesson.videoSource !== 'upload') return
    let active = true
    if (lesson.videoFileId) {
      getFileUrl(lesson.videoFileId).then(url => { if (active) setFileUrl(url) })
    }
    return () => { active = false }
  }, [lesson])

  useEffect(() => {
    if (lesson.videoSource === 'upload') return
    const lessonVideoId = lesson.videoUrl?.includes('v=')
      ? lesson.videoUrl.split('v=')[1]?.split('&')[0]
      : lesson.videoUrl?.includes('youtu.be/') ? lesson.videoUrl.split('youtu.be/')[1]?.split('?')[0] : null
    const videoId = lessonVideoId || fallbackVideoId
    if (!videoId) return

    function createPlayer() {
      playerRef.current = new window.YT.Player(containerId.current, {
        videoId,
        events: {
          onStateChange: (e) => {
            if (e.data === window.YT.PlayerState.ENDED) onEnded()
          },
        },
      })
    }

    let cancelled = false
    loadYouTubeAPI(() => { if (!cancelled) createPlayer() })

    return () => { cancelled = true; try { playerRef.current?.destroy?.() } catch {} }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson])

  if (lesson.videoSource === 'upload') {
    return fileUrl ? (
      <video src={fileUrl} controls onEnded={onEnded}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
    ) : (
      <div style={{ position: 'absolute', inset: 0 }} className="w-full h-full flex items-center justify-center text-xs text-ekam-muted">
        Loading video…
      </div>
    )
  }

  return <div id={containerId.current} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}

function LessonTest({ lesson, onPass, onFail }) {
  const questions = lesson.test || []
  const [qIdx, setQIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correctCount, setCorrectCount] = useState(0)

  useEffect(() => {
    // No test authored for this lesson — treat as an automatic pass.
    if (questions.length === 0) onPass()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (questions.length === 0) return null

  const q = questions[qIdx]

  const submit = () => {
    if (selected === null) return
    const isRight = selected === q.correctIndex
    const nextCorrect = correctCount + (isRight ? 1 : 0)
    if (qIdx + 1 < questions.length) {
      setCorrectCount(nextCorrect)
      setQIdx(qIdx + 1)
      setSelected(null)
    } else if (nextCorrect === questions.length) {
      onPass()
    } else {
      onFail(nextCorrect, questions.length)
    }
  }

  return (
    <div className="p-3 rounded-lg" style={{ background: '#FAFAF4', border: '1px solid #EDE4D8' }}>
      <p className="text-xs text-ekam-muted mb-2">Question {qIdx + 1} of {questions.length}</p>
      <p className="text-sm font-medium mb-3" style={{ color: '#1C0E04' }}>{q.question}</p>
      <div className="space-y-2 mb-3">
        {q.options.map((opt, oIdx) => (
          <label key={oIdx} className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-sm"
            style={{ background: selected === oIdx ? 'rgba(140,98,16,0.08)' : '#FFFFFF', border: '1px solid ' + (selected === oIdx ? '#8C6210' : '#E2D5C4') }}>
            <input type="radio" name={`test-${q.id}`} checked={selected === oIdx} onChange={() => setSelected(oIdx)} className="accent-ekam-gold" />
            {opt}
          </label>
        ))}
      </div>
      <button onClick={submit} disabled={selected === null} className="btn-gold w-full justify-center py-2 text-sm disabled:opacity-50">
        {qIdx + 1 < questions.length ? 'Next' : 'Submit'}
      </button>
    </div>
  )
}

function LessonMaterialLink({ lesson, canAccess }) {
  const [fileUrl, setFileUrl] = useState(null)

  useEffect(() => {
    if (lesson.materialSource === 'upload' && lesson.materialFileId) {
      getFileUrl(lesson.materialFileId).then(setFileUrl)
    }
  }, [lesson])

  const href = lesson.materialSource === 'upload' ? fileUrl : lesson.materialUrl
  if (!canAccess) {
    return (
      <span title="Study material unlocks after purchase" className="flex-shrink-0 text-ekam-muted">
        <FileText size={13} />
      </span>
    )
  }
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer"
      title="Download lesson study material (PDF)"
      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-ekam-gold hover:bg-ekam-gold/10 transition-all">
      <FileText size={13} />
    </a>
  ) : (
    <span className="flex-shrink-0 text-ekam-muted"><FileText size={13} /></span>
  )
}

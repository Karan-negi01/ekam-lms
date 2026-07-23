'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Users, BookOpen, Shield, TrendingUp, CheckCircle2, XCircle,
  Eye, Trash2, Search, Filter, BarChart3, AlertTriangle,
  DollarSign, Star, Globe, Bell, Settings, LogOut, ChevronDown,
  Clock, Badge, Percent, Play
} from 'lucide-react'
import { courses as allCourses, instructors, adminStats } from '@/lib/data'
import { formatPrice, formatNumber, pushNotification } from '@/lib/utils'
import { getFileUrl } from '@/lib/fileStore'
import CategoryIcon from '@/components/icons/CategoryIcon'

const NAV = [
  { id: 'overview', icon: BarChart3, label: 'Overview' },
  { id: 'courses', icon: BookOpen, label: 'All Courses' },
  { id: 'instructors', icon: Users, label: 'Instructors' },
  { id: 'approvals', icon: CheckCircle2, label: 'Pending Approvals' },
  { id: 'students', icon: Globe, label: 'Students' },
  { id: 'revenue', icon: DollarSign, label: 'Revenue' },
]

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [section, setSection] = useState('overview')
  const [pendingCourses, setPendingCourses] = useState([])
  const [allUserCourses, setAllUserCourses] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [commissionRegistry, setCommissionRegistry] = useState({})

  useEffect(() => {
    const stored = localStorage.getItem('ekam_user')
    if (!stored) { router.push('/auth/login'); return }
    const u = JSON.parse(stored)
    if (u.role !== 'admin') { router.push('/'); return }
    setUser(u)

    // Collect all user-submitted courses from localStorage
    const allCoursesList = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('ekam_courses_')) {
        try {
          const courses = JSON.parse(localStorage.getItem(key) || '[]')
          allCoursesList.push(...courses)
        } catch {}
      }
    }
    setAllUserCourses(allCoursesList)
    setPendingCourses(allCoursesList.filter(c => c.status === 'pending'))
    setCommissionRegistry(JSON.parse(localStorage.getItem('ekam_instructor_commissions') || '{}'))
  }, [router])

  const approveCoure = (courseId, commissionPct) => {
    updateCourseStatus(courseId, 'published', commissionPct)

    const course = allUserCourses.find(c => c.id === courseId)
    if (course?.instructor?.id) {
      const registry = { ...commissionRegistry, [course.instructor.id]: commissionPct }
      setCommissionRegistry(registry)
      localStorage.setItem('ekam_instructor_commissions', JSON.stringify(registry))

      pushNotification(course.instructor.id, {
        type: 'approved',
        title: 'Course approved',
        message: `"${course.title}" has been approved and published. Ekam commission for this course is set at ${commissionPct}%.`,
        courseId,
      })
    }
  }

  const rejectCourse = (courseId) => {
    const course = allUserCourses.find(c => c.id === courseId)
    updateCourseStatus(courseId, 'rejected')

    if (course?.instructor?.id) {
      pushNotification(course.instructor.id, {
        type: 'rejected',
        title: 'Course rejected',
        message: `"${course.title}" was not approved. Edit the course and resubmit for review.`,
        courseId,
      })
    }
  }

  const updateCourseStatus = (courseId, status, commissionPct) => {
    const patch = commissionPct != null ? { status, commissionPct } : { status }
    // Update in all instructor localStorage keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith('ekam_courses_')) {
        try {
          let courses = JSON.parse(localStorage.getItem(key) || '[]')
          courses = courses.map(c => c.id === courseId ? { ...c, ...patch } : c)
          localStorage.setItem(key, JSON.stringify(courses))
        } catch {}
      }
    }
    const updated = allUserCourses.map(c => c.id === courseId ? { ...c, ...patch } : c)
    setAllUserCourses(updated)
    setPendingCourses(updated.filter(c => c.status === 'pending'))
  }

  const overviewStats = [
    { label: 'Total Courses', value: adminStats.totalCourses, sub: 'Platform & user courses', icon: BookOpen, color: '#D4A843' },
    { label: 'Active Students', value: formatNumber(adminStats.totalStudents), sub: '+2,400 this month', icon: Users, color: '#E8622A' },
    { label: 'Instructors', value: adminStats.totalInstructors, sub: `${pendingCourses.length} pending approval`, icon: Star, color: '#F0C96A' },
    { label: 'Monthly Revenue', value: adminStats.revenue, sub: adminStats.monthlyGrowth + ' vs last month', icon: TrendingUp, color: '#B8460F' },
  ]

  const filteredCourses = [...allCourses, ...allUserCourses].filter(c =>
    c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFFFF' }}>
      <div className="loader-gold w-8 h-8" />
    </div>
  )

  return (
    <div className="min-h-screen pt-16 flex" style={{ background: '#FFFFFF' }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-ekam-border pt-8 pb-6 px-4 flex-shrink-0"
        style={{ background: '#FFFFFF', minHeight: 'calc(100vh - 64px)', position: 'sticky', top: '64px', height: 'calc(100vh - 64px)' }}>
        <div className="flex items-center gap-3 px-2 mb-8 pb-6 border-b border-ekam-border">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
            {user.name?.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-ekam-cream">{user.name}</p>
            <div className="flex items-center gap-1 text-xs text-ekam-gold mt-0.5">
              <Shield size={10} /> Administrator
            </div>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          {NAV.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setSection(id)}
              className={`sidebar-link w-full relative ${section === id ? 'active' : ''}`}
            >
              <Icon size={16} />
              {label}
              {id === 'approvals' && pendingCourses.length > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-ekam-saffron text-white text-[10px] font-bold flex items-center justify-center">
                  {pendingCourses.length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="border-t border-ekam-border pt-4 space-y-1">
          <Link href="/dashboard" className="sidebar-link">
            <Settings size={16} /> Instructor View
          </Link>
          <Link href="/" className="sidebar-link">
            <Globe size={16} /> View Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {/* Overview */}
        {section === 'overview' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={16} className="text-ekam-gold" />
                  <span className="text-xs tracking-widest text-ekam-gold uppercase font-medium">Admin Panel</span>
                </div>
                <h1 className="text-3xl text-ekam-cream font-semibold">Platform Overview</h1>
              </div>
              <div className="flex items-center gap-2">
                {pendingCourses.length > 0 && (
                  <button onClick={() => setSection('approvals')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm text-ekam-saffron transition-all"
                    style={{ background: 'rgba(232,98,42,0.1)', border: '1px solid rgba(232,98,42,0.3)' }}>
                    <AlertTriangle size={15} />
                    {pendingCourses.length} Pending Approvals
                  </button>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {overviewStats.map((stat, i) => (
                <div key={i} className="card-base p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-ekam-muted tracking-wide uppercase">{stat.label}</p>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${stat.color}15` }}>
                      <stat.icon size={15} style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p className="text-2xl font-semibold mb-1" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-xs text-ekam-muted">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Recent user-submitted courses */}
            {allUserCourses.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl text-ekam-cream">User-Submitted Courses</h2>
                  <button onClick={() => setSection('approvals')} className="text-xs text-ekam-gold hover:text-ekam-gold-light transition-colors">
                    View all →
                  </button>
                </div>
                <div className="space-y-3">
                  {allUserCourses.slice(0, 5).map(course => (
                    <CourseApprovalRow key={course.id} course={course} onApprove={approveCoure} onReject={rejectCourse}
                      defaultCommission={commissionRegistry[course.instructor?.id] ?? 20} />
                  ))}
                </div>
              </div>
            )}

            {/* Platform Courses */}
            <div>
              <h2 className="text-xl text-ekam-cream mb-4">Platform Courses</h2>
              <div className="overflow-hidden rounded-xl" style={{ border: '1px solid #E2D5C4' }}>
                <table className="table-ekam">
                  <thead style={{ background: '#FAFAF4' }}>
                    <tr>
                      <th>Course</th>
                      <th>Instructor</th>
                      <th>Category</th>
                      <th>Students</th>
                      <th>Rating</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody style={{ background: '#FFFFFF' }}>
                    {allCourses.slice(0, 6).map(course => (
                      <tr key={course.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(140,98,16,0.08)' }}>
                              <CategoryIcon id={course.category} size={14} className="text-ekam-gold" />
                            </div>
                            <p className="text-sm text-ekam-cream font-medium line-clamp-1 max-w-[200px]">{course.title}</p>
                          </div>
                        </td>
                        <td className="text-ekam-cream-dim text-sm">{course.instructor?.name}</td>
                        <td><span className="badge badge-gold text-[10px]">{course.categoryLabel}</span></td>
                        <td className="text-ekam-cream-dim">{formatNumber(course.studentCount)}</td>
                        <td>
                          <span className="flex items-center gap-1 text-ekam-gold text-sm">
                            ★ {course.rating}
                          </span>
                        </td>
                        <td className="text-ekam-gold font-medium">{formatPrice(course.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* All Courses */}
        {section === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl text-ekam-cream font-semibold">All Courses</h1>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="input-field pl-9 py-2 text-xs w-64"
                />
              </div>
            </div>

            <div className="overflow-hidden rounded-xl" style={{ border: '1px solid #E2D5C4' }}>
              <table className="table-ekam">
                <thead style={{ background: '#FAFAF4' }}>
                  <tr>
                    <th>Course</th>
                    <th>Instructor</th>
                    <th>Status</th>
                    <th>Students</th>
                    <th>Rating</th>
                    <th>Price</th>
                    <th>Commission</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody style={{ background: '#FFFFFF' }}>
                  {filteredCourses.map(course => {
                    const sc = {
                      published: { bg: 'rgba(184,70,15,0.1)', text: '#B8460F' },
                      pending: { bg: 'rgba(232,98,42,0.1)', text: '#E8622A' },
                      draft: { bg: 'rgba(122,107,82,0.1)', text: '#9B8B6E' },
                    }[course.status || 'published']
                    return (
                      <tr key={course.id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(140,98,16,0.08)' }}>
                              <CategoryIcon id={course.category} size={14} className="text-ekam-gold" />
                            </div>
                            <p className="text-sm text-ekam-cream font-medium line-clamp-1 max-w-[180px]">{course.title}</p>
                          </div>
                        </td>
                        <td className="text-ekam-cream-dim text-sm">{course.instructor?.name}</td>
                        <td>
                          <span className="badge text-[10px] font-medium"
                            style={{ background: sc?.bg, color: sc?.text, border: `1px solid ${sc?.text}40` }}>
                            {(course.status || 'published').toUpperCase()}
                          </span>
                        </td>
                        <td className="text-ekam-cream-dim">{formatNumber(course.studentCount || 0)}</td>
                        <td className="text-ekam-gold">★ {course.rating || '—'}</td>
                        <td className="text-ekam-gold font-medium">{formatPrice(course.price)}</td>
                        <td className="text-ekam-cream-dim text-sm">
                          {course.price === 0 ? '—' : course.commissionPct != null ? `${course.commissionPct}%` : (
                            course.status === 'pending' ? <span className="badge badge-saffron text-[10px]">Pending</span> : '—'
                          )}
                        </td>
                        <td>
                          <div className="flex gap-1">
                            <Link href={`/courses/${course.id}`}
                              className="w-7 h-7 rounded flex items-center justify-center text-ekam-muted hover:text-ekam-gold hover:bg-ekam-gold/10 transition-all">
                              <Eye size={13} />
                            </Link>
                            {course.status === 'pending' && (
                              <button onClick={() => setSection('approvals')}
                                className="px-2 h-7 rounded flex items-center justify-center text-[11px] font-medium text-ekam-gold hover:bg-ekam-gold/10 transition-all whitespace-nowrap">
                                Review →
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Instructors */}
        {section === 'instructors' && (
          <div>
            <h1 className="text-3xl text-ekam-cream font-semibold mb-6">Instructors</h1>
            <div className="overflow-hidden rounded-xl" style={{ border: '1px solid #E2D5C4' }}>
              <table className="table-ekam">
                <thead style={{ background: '#FAFAF4' }}>
                  <tr>
                    <th>Instructor</th>
                    <th>Category</th>
                    <th>Courses</th>
                    <th>Students</th>
                    <th>Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody style={{ background: '#FFFFFF' }}>
                  {instructors.map(inst => (
                    <tr key={inst.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
                            {inst.initials}
                          </div>
                          <div>
                            <p className="text-sm text-ekam-cream font-medium">{inst.name}</p>
                            <p className="text-xs text-ekam-muted">{inst.title}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="badge badge-gold text-[10px]">{inst.category}</span></td>
                      <td className="text-ekam-cream-dim">{inst.courses}</td>
                      <td className="text-ekam-cream-dim">{formatNumber(inst.students)}</td>
                      <td className="text-ekam-gold">★ {inst.rating}</td>
                      <td>
                        <span className={`badge text-[10px] ${inst.verified ? 'badge-green' : 'badge-saffron'}`}>
                          {inst.verified ? '✓ VERIFIED' : 'PENDING'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pending Approvals */}
        {section === 'approvals' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h1 className="text-3xl text-ekam-cream font-semibold">Pending Approvals</h1>
              {pendingCourses.length > 0 && (
                <span className="badge badge-saffron">{pendingCourses.length} pending</span>
              )}
            </div>

            {pendingCourses.length === 0 ? (
              <div className="card-base p-12 text-center">
                <CheckCircle2 size={40} className="text-ekam-gold mx-auto mb-3" />
                <h3 className="text-xl text-ekam-cream mb-2">All Caught Up!</h3>
                <p className="text-ekam-muted">No courses pending review at the moment.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingCourses.map(course => (
                  <CourseApprovalRow key={course.id} course={course} onApprove={approveCoure} onReject={rejectCourse} expanded
                    defaultCommission={commissionRegistry[course.instructor?.id] ?? 20} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Students */}
        {section === 'students' && (
          <div>
            <h1 className="text-3xl text-ekam-cream font-semibold mb-6">Students</h1>
            <div className="card-base p-12 text-center">
              <Users size={40} className="text-ekam-gold mx-auto mb-3" />
              <h3 className="text-xl text-ekam-cream mb-2">Student Management</h3>
              <p className="text-ekam-muted">Student enrollment data and analytics will be available once the platform goes live.</p>
            </div>
          </div>
        )}

        {/* Revenue */}
        {section === 'revenue' && (
          <div>
            <h1 className="text-3xl text-ekam-cream font-semibold mb-6">Revenue Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { label: 'Total Revenue', value: adminStats.revenue, color: '#B8460F' },
                { label: 'This Month', value: '₹3,85,000', color: '#D4A843' },
                { label: 'Instructor Payouts', value: '₹30,80,000', color: '#E8622A' },
              ].map((item, i) => (
                <div key={i} className="card-base p-5">
                  <p className="text-xs text-ekam-muted uppercase tracking-wide mb-2">{item.label}</p>
                  <p className="text-2xl font-semibold" style={{ color: item.color }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="card-base p-8 text-center">
              <TrendingUp size={32} className="text-ekam-gold mx-auto mb-3" />
              <p className="text-ekam-cream font-medium mb-1">Revenue Charts</p>
              <p className="text-ekam-muted text-sm">Detailed revenue analytics and charts will be available after integration with payment gateway.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function CourseApprovalRow({ course, onApprove, onReject, expanded = false, defaultCommission = 20 }) {
  const [approving, setApproving] = useState(false)
  const [commission, setCommission] = useState(defaultCommission)

  return (
    <div className="card-base p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(140,98,16,0.08)' }}>
            <CategoryIcon id={course.category} size={26} className="text-ekam-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base text-ekam-cream font-medium mb-0.5">{course.title}</h3>
            <p className="text-xs text-ekam-gold mb-1">{course.instructor?.name}</p>
            <div className="flex flex-wrap gap-2 text-xs text-ekam-muted mb-1">
              <span>{course.totalLessons} lessons</span>
              <span>•</span>
              <span>{course.level}</span>
              <span>•</span>
              <span>{course.pricingModel === 'subscription' ? 'Subscription' : formatPrice(course.price)}</span>
            </div>
            {course.description && (
              <p className="text-xs text-ekam-muted mt-2 leading-relaxed line-clamp-2">{course.description}</p>
            )}
            {expanded && (
              <div className="mt-3 space-y-1 pt-3" style={{ borderTop: '1px solid #EDE4D8' }}>
                <p className="text-[10px] uppercase tracking-wide text-ekam-muted font-semibold mb-1.5">Videos</p>
                {course.videoUrl && (
                  <a href={course.videoUrl} target="_blank" rel="noreferrer"
                    className="text-xs text-ekam-gold hover:underline flex items-center gap-1.5">
                    <Play size={11} /> Intro / preview video
                  </a>
                )}
                {course.curriculum?.flatMap((section, sIdx) =>
                  section.lessons.map((lesson, lIdx) => (
                    <LessonPreviewLink key={lesson.id || `${sIdx}-${lIdx}`} lesson={lesson} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {!approving && <span className="badge badge-saffron text-[10px]">PENDING</span>}
          <Link href={`/courses/${course.id}`}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-ekam-muted hover:text-ekam-gold hover:bg-ekam-gold/10 transition-all">
            <Eye size={14} />
          </Link>

          {!approving ? (
            <>
              <button onClick={() => setApproving(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{ background: 'rgba(184,70,15,0.1)', border: '1px solid rgba(184,70,15,0.3)', color: '#B8460F' }}>
                <CheckCircle2 size={13} /> Approve
              </button>
              <button onClick={() => onReject(course.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 transition-all"
                style={{ background: 'rgba(139,32,32,0.1)', border: '1px solid rgba(139,32,32,0.3)' }}>
                <XCircle size={13} /> Reject
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(140,98,16,0.06)', border: '1px solid rgba(140,98,16,0.2)' }}>
              <Percent size={12} className="text-ekam-gold" />
              <input
                type="number" min="0" max="100" value={commission}
                onChange={e => setCommission(e.target.value)}
                className="w-12 bg-transparent text-xs text-ekam-cream outline-none"
              />
              <span className="text-xs text-ekam-muted">commission</span>
              <button onClick={() => onApprove(course.id, Math.min(100, Math.max(0, Number(commission) || 0)))}
                className="text-xs font-semibold text-ekam-gold hover:text-ekam-gold-light transition-colors">
                Confirm
              </button>
              <button onClick={() => setApproving(false)} className="text-ekam-muted hover:text-ekam-cream transition-colors">
                <XCircle size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LessonPreviewLink({ lesson }) {
  const [fileUrl, setFileUrl] = useState(null)

  useEffect(() => {
    if (lesson.videoSource === 'upload' && lesson.videoFileId) {
      getFileUrl(lesson.videoFileId).then(setFileUrl)
    }
  }, [lesson.videoSource, lesson.videoFileId])

  if (lesson.videoSource === 'upload') {
    return fileUrl ? (
      <a href={fileUrl} target="_blank" rel="noreferrer" className="text-xs text-ekam-gold hover:underline flex items-center gap-1.5">
        <Play size={11} /> {lesson.title || 'Untitled lesson'} <span className="text-ekam-muted">(uploaded)</span>
      </a>
    ) : (
      <span className="text-xs text-ekam-muted flex items-center gap-1.5">
        <Play size={11} /> {lesson.title || 'Untitled lesson'} (uploaded file — only viewable on the instructor&apos;s browser)
      </span>
    )
  }

  return lesson.videoUrl ? (
    <a href={lesson.videoUrl} target="_blank" rel="noreferrer" className="text-xs text-ekam-gold hover:underline flex items-center gap-1.5">
      <Play size={11} /> {lesson.title || 'Untitled lesson'}
    </a>
  ) : (
    <span className="text-xs text-ekam-muted flex items-center gap-1.5">
      <Play size={11} /> {lesson.title || 'Untitled lesson'} (no video)
    </span>
  )
}

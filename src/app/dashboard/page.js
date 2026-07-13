'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Plus, BookOpen, Users, Star, BarChart3, Video, Edit3, Trash2,
  Eye, Clock, CheckCircle2, AlertCircle, Upload, X, DollarSign,
  TrendingUp, Play, GraduationCap, FileText, Percent
} from 'lucide-react'
import { courses as allCourses, categories } from '@/lib/data'
import { formatPrice, formatNumber } from '@/lib/utils'
import CategoryIcon from '@/components/icons/CategoryIcon'

const EMPTY_LESSON = { title: '', videoUrl: '', duration: '', free: false, materialUrl: '' }

const EMPTY_COURSE = {
  title: '',
  description: '',
  category: 'music',
  price: '',
  level: 'Beginner',
  language: 'Hindi & English',
  videoUrl: '',
  studyMaterialType: 'none',
  studyMaterialUrl: '',
  sections: [{ title: '', lessons: [{ ...EMPTY_LESSON }] }],
}

function SidebarLink({ href, icon: Icon, label, active }) {
  return (
    <Link href={href} className={`sidebar-link ${active ? 'active' : ''}`}>
      <Icon size={16} />
      {label}
    </Link>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeSection, setActiveSection] = useState('overview')
  const [myCourses, setMyCourses] = useState([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [courseForm, setCourseForm] = useState(EMPTY_COURSE)
  const [formStep, setFormStep] = useState(1)
  const [saving, setSaving] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('ekam_user')
    if (!stored) { router.push('/auth/login'); return }
    const u = JSON.parse(stored)
    if (u.role === 'student') { router.push('/'); return }
    setUser(u)

    // Load instructor's courses from localStorage
    const savedCourses = JSON.parse(localStorage.getItem(`ekam_courses_${u.id}`) || '[]')
    setMyCourses(savedCourses)
  }, [router])

  const handleFormChange = (field, value) => {
    setCourseForm(prev => ({ ...prev, [field]: value }))
  }

  const saveCourse = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))

    const newCourse = {
      id: editingCourse?.id || 'my-course-' + Date.now(),
      ...courseForm,
      price: Number(courseForm.price) || 0,
      originalPrice: Number(courseForm.price) || 0,
      category: courseForm.category,
      categoryLabel: categories.find(c => c.id === courseForm.category)?.label || '',
      instructor: { name: user.name, initials: user.name?.slice(0, 2).toUpperCase(), verified: false, id: user.id },
      rating: 0,
      reviewCount: 0,
      studentCount: 0,
      duration: '0 hours',
      totalLessons: courseForm.sections.reduce((acc, s) => acc + s.lessons.length, 0),
      status: 'pending',
      createdAt: editingCourse?.createdAt || new Date().toISOString(),
      thumbnailGradient: 'from-amber-900 via-red-900 to-amber-800',
      bestseller: false,
      featured: false,
      tags: [],
      curriculum: courseForm.sections.map(s => ({
        section: s.title,
        lessons: s.lessons.map(l => ({ ...l, id: 'l-' + Math.random() })),
      })),
      videoId: courseForm.videoUrl?.includes('youtube') ? courseForm.videoUrl.split('v=')[1]?.split('&')[0] : '',
    }

    const updated = editingCourse
      ? myCourses.map(c => c.id === editingCourse.id ? newCourse : c)
      : [...myCourses, newCourse]

    setMyCourses(updated)
    localStorage.setItem(`ekam_courses_${user.id}`, JSON.stringify(updated))
    setSaving(false)
    setShowCreateModal(false)
    setEditingCourse(null)
    setCourseForm(EMPTY_COURSE)
    setFormStep(1)
    setActiveSection('courses')
  }

  const deleteCourse = (courseId) => {
    if (!confirm('Delete this course? This cannot be undone.')) return
    const updated = myCourses.filter(c => c.id !== courseId)
    setMyCourses(updated)
    localStorage.setItem(`ekam_courses_${user.id}`, JSON.stringify(updated))
  }

  const editCourse = (course) => {
    setEditingCourse(course)
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      price: course.price,
      level: course.level,
      language: course.language,
      videoUrl: course.videoUrl || '',
      studyMaterialType: course.studyMaterialType || 'none',
      studyMaterialUrl: course.studyMaterialUrl || '',
      sections: course.sections || [{ title: '', lessons: [{ ...EMPTY_LESSON }] }],
    })
    setFormStep(1)
    setShowCreateModal(true)
  }

  const addSection = () => {
    setCourseForm(prev => ({
      ...prev,
      sections: [...prev.sections, { title: '', lessons: [{ ...EMPTY_LESSON }] }],
    }))
  }

  const addLesson = (sIdx) => {
    setCourseForm(prev => {
      const sections = [...prev.sections]
      sections[sIdx] = {
        ...sections[sIdx],
        lessons: [...sections[sIdx].lessons, { ...EMPTY_LESSON }],
      }
      return { ...prev, sections }
    })
  }

  const updateSection = (sIdx, field, value) => {
    setCourseForm(prev => {
      const sections = [...prev.sections]
      sections[sIdx] = { ...sections[sIdx], [field]: value }
      return { ...prev, sections }
    })
  }

  const updateLesson = (sIdx, lIdx, field, value) => {
    setCourseForm(prev => {
      const sections = [...prev.sections]
      const lessons = [...sections[sIdx].lessons]
      lessons[lIdx] = { ...lessons[lIdx], [field]: value }
      sections[sIdx] = { ...sections[sIdx], lessons }
      return { ...prev, sections }
    })
  }

  const removeLesson = (sIdx, lIdx) => {
    setCourseForm(prev => {
      const sections = [...prev.sections]
      sections[sIdx].lessons = sections[sIdx].lessons.filter((_, i) => i !== lIdx)
      return { ...prev, sections }
    })
  }

  const removeSection = (sIdx) => {
    setCourseForm(prev => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== sIdx),
    }))
  }

  const stats = [
    { label: 'Total Courses', value: myCourses.length, icon: BookOpen, color: '#D4A843' },
    { label: 'Total Students', value: formatNumber(myCourses.reduce((a, c) => a + (c.studentCount || 0), 0)), icon: Users, color: '#E8622A' },
    { label: 'Avg Rating', value: myCourses.length ? (myCourses.reduce((a, c) => a + c.rating, 0) / myCourses.length || 0).toFixed(1) : '—', icon: Star, color: '#F0C96A' },
    { label: 'Est. Revenue', value: formatPrice(myCourses.reduce((a, c) => a + (c.price * c.studentCount || 0), 0)), icon: DollarSign, color: '#4CAF72' },
  ]

  const formatRupees = (n) => `₹${Math.round(n).toLocaleString('en-IN')}`

  const paidCourses = myCourses.filter(c => c.price > 0)
  const grossRevenue = paidCourses.reduce((a, c) => a + c.price * (c.studentCount || 0), 0)
  const totalCommission = paidCourses.reduce((a, c) => {
    const gross = c.price * (c.studentCount || 0)
    return a + (c.commissionPct != null ? gross * (c.commissionPct / 100) : 0)
  }, 0)
  const netPayout = grossRevenue - totalCommission

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FDFAF4' }}>
      <div className="loader-gold w-8 h-8" />
    </div>
  )

  return (
    <div className="min-h-screen pt-16 flex" style={{ background: '#FDFAF4' }}>
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-ekam-border pt-8 pb-6 px-4 flex-shrink-0"
        style={{ background: '#F5EFE4', minHeight: 'calc(100vh - 64px)', position: 'sticky', top: '64px', height: 'calc(100vh - 64px)' }}>
        {/* User info */}
        <div className="flex items-center gap-3 px-2 mb-8 pb-6 border-b border-ekam-border">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
            {user.name?.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-ekam-cream truncate">{user.name}</p>
            <p className="text-xs text-ekam-gold">{user.role === 'admin' ? 'Administrator' : 'Instructor'}</p>
          </div>
        </div>

        <nav className="space-y-1 flex-1">
          {[
            { id: 'overview', icon: BarChart3, label: 'Overview' },
            { id: 'courses', icon: BookOpen, label: 'My Courses' },
            { id: 'create', icon: Plus, label: 'Create Course' },
            { id: 'earnings', icon: TrendingUp, label: 'Earnings' },
            { id: 'students', icon: Users, label: 'Students' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => id === 'create' ? setShowCreateModal(true) : setActiveSection(id)}
              className={`sidebar-link w-full ${activeSection === id ? 'active' : ''}`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        {user.role === 'admin' && (
          <div className="mt-4 pt-4 border-t border-ekam-border">
            <Link href="/admin" className="sidebar-link">
              <Eye size={16} /> Admin Panel
            </Link>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8">
        {/* Overview */}
        {activeSection === 'overview' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl text-ekam-cream font-semibold">Instructor Dashboard</h1>
                <p className="text-ekam-muted mt-1">Welcome back, {user.name?.split(' ')[0]}</p>
              </div>
              <button onClick={() => setShowCreateModal(true)} className="btn-gold">
                <Plus size={16} /> New Course
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="card-base p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs text-ekam-muted tracking-wide uppercase">{stat.label}</p>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${stat.color}15` }}>
                      <stat.icon size={15} style={{ color: stat.color }} />
                    </div>
                  </div>
                  <p className="text-2xl font-semibold" style={{ color: stat.color }}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Recent courses */}
            {myCourses.length > 0 ? (
              <div>
                <h2 className="font-serif text-xl text-ekam-cream mb-4">Your Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myCourses.slice(0, 4).map(course => (
                    <CourseRow key={course.id} course={course} onEdit={editCourse} onDelete={deleteCourse} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="card-base p-12 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(140,98,16,0.08)' }}>
                  <GraduationCap size={28} className="text-ekam-gold" />
                </div>
                <h3 className="font-serif text-xl text-ekam-cream mb-2">Create Your First Course</h3>
                <p className="text-ekam-muted mb-6 max-w-sm mx-auto">
                  Share your expertise with thousands of learners. Create a course in any cultural art form.
                </p>
                <button onClick={() => setShowCreateModal(true)} className="btn-gold">
                  <Plus size={16} /> Create Course
                </button>
              </div>
            )}
          </div>
        )}

        {/* Courses list */}
        {activeSection === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1 className="font-serif text-3xl text-ekam-cream font-semibold">My Courses</h1>
              <button onClick={() => setShowCreateModal(true)} className="btn-gold">
                <Plus size={16} /> New Course
              </button>
            </div>

            {myCourses.length === 0 ? (
              <div className="card-base p-12 text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(140,98,16,0.08)' }}>
                  <BookOpen size={24} className="text-ekam-gold" />
                </div>
                <p className="text-ekam-cream mb-2">No courses yet</p>
                <p className="text-ekam-muted text-sm mb-5">Create your first course to get started</p>
                <button onClick={() => setShowCreateModal(true)} className="btn-gold">
                  <Plus size={16} /> Create Course
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {myCourses.map(course => (
                  <CourseRow key={course.id} course={course} onEdit={editCourse} onDelete={deleteCourse} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Earnings */}
        {activeSection === 'earnings' && (
          <div>
            <h1 className="font-serif text-3xl text-ekam-cream font-semibold mb-8">Earnings</h1>

            {paidCourses.length === 0 ? (
              <div className="card-base p-8 text-center">
                <TrendingUp size={32} className="text-ekam-gold mx-auto mb-3" />
                <p className="text-ekam-cream font-medium mb-1">Revenue Analytics</p>
                <p className="text-ekam-muted text-sm">Earnings dashboard will be available once you have a paid course with students enrolled.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="card-base p-5">
                    <p className="text-xs text-ekam-muted uppercase tracking-wide mb-2">Gross Revenue</p>
                    <p className="text-2xl font-semibold" style={{ color: '#8C6210' }}>{formatRupees(grossRevenue)}</p>
                  </div>
                  <div className="card-base p-5">
                    <p className="text-xs text-ekam-muted uppercase tracking-wide mb-2">Ekam Commission</p>
                    <p className="text-2xl font-semibold" style={{ color: '#E8622A' }}>{formatRupees(totalCommission)}</p>
                  </div>
                  <div className="card-base p-5">
                    <p className="text-xs text-ekam-muted uppercase tracking-wide mb-2">Your Payout</p>
                    <p className="text-2xl font-semibold" style={{ color: '#4CAF72' }}>{formatRupees(netPayout)}</p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl" style={{ border: '1px solid #E2D5C4' }}>
                  <table className="table-ekam">
                    <thead style={{ background: '#FAFAF4' }}>
                      <tr>
                        <th>Course</th>
                        <th>Students</th>
                        <th>Price</th>
                        <th>Commission</th>
                        <th>Your Payout</th>
                      </tr>
                    </thead>
                    <tbody style={{ background: '#FFFFFF' }}>
                      {paidCourses.map(c => {
                        const gross = c.price * (c.studentCount || 0)
                        const payout = c.commissionPct != null ? gross * (1 - c.commissionPct / 100) : null
                        return (
                          <tr key={c.id}>
                            <td className="text-sm text-ekam-cream font-medium line-clamp-1 max-w-[220px]">{c.title}</td>
                            <td className="text-ekam-cream-dim">{formatNumber(c.studentCount || 0)}</td>
                            <td className="text-ekam-gold font-medium">{formatPrice(c.price)}</td>
                            <td className="text-ekam-cream-dim">
                              {c.commissionPct != null ? `${c.commissionPct}%` : (
                                <span className="badge badge-saffron text-[10px]">Pending review</span>
                              )}
                            </td>
                            <td className="text-ekam-gold font-medium">{payout != null ? formatRupees(payout) : '—'}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-ekam-muted mt-3">
                  Commission rates are set individually per course by the Ekam admin team during review, based on category and reach.
                </p>
              </>
            )}
          </div>
        )}

        {/* Students */}
        {activeSection === 'students' && (
          <div>
            <h1 className="font-serif text-3xl text-ekam-cream font-semibold mb-8">My Students</h1>
            <div className="card-base p-8 text-center">
              <Users size={32} className="text-ekam-gold mx-auto mb-3" />
              <p className="text-ekam-cream font-medium mb-1">Student Analytics</p>
              <p className="text-ekam-muted text-sm">Student information will appear here once learners enroll in your courses.</p>
            </div>
          </div>
        )}
      </main>

      {/* Create/Edit Course Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl"
            style={{ background: '#FFFFFF', border: '1px solid #E2D5C4' }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-ekam-border sticky top-0 z-10"
              style={{ background: '#FFFFFF' }}>
              <div>
                <h2 className="font-serif text-xl text-ekam-cream">
                  {editingCourse ? 'Edit Course' : 'Create New Course'}
                </h2>
                <p className="text-xs text-ekam-muted mt-0.5">Step {formStep} of 3</p>
              </div>
              <button onClick={() => { setShowCreateModal(false); setEditingCourse(null); setCourseForm(EMPTY_COURSE); setFormStep(1) }}
                className="text-ekam-muted hover:text-ekam-cream transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-0 px-6 py-3 border-b border-ekam-border">
              {['Basic Info', 'Curriculum', 'Pricing'].map((label, i) => (
                <div key={i} className="flex items-center flex-1">
                  <button
                    onClick={() => setFormStep(i + 1)}
                    className={`flex items-center gap-2 text-xs font-medium transition-colors ${
                      formStep === i + 1 ? 'text-ekam-gold' : formStep > i + 1 ? 'text-ekam-green' : 'text-ekam-muted'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      formStep === i + 1 ? 'bg-ekam-gold text-white' : formStep > i + 1 ? 'bg-green-700 text-white' : 'bg-ekam-border text-ekam-muted'
                    }`}>
                      {formStep > i + 1 ? '✓' : i + 1}
                    </div>
                    <span className="hidden sm:block">{label}</span>
                  </button>
                  {i < 2 && <div className="flex-1 h-px bg-ekam-border mx-2" />}
                </div>
              ))}
            </div>

            <div className="p-6">
              {/* Step 1: Basic Info */}
              {formStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Course Title *</label>
                    <input
                      type="text"
                      value={courseForm.title}
                      onChange={e => handleFormChange('title', e.target.value)}
                      placeholder="e.g. Hindustani Classical Vocal for Beginners"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Description *</label>
                    <textarea
                      value={courseForm.description}
                      onChange={e => handleFormChange('description', e.target.value)}
                      placeholder="Describe what students will learn in this course..."
                      rows={4}
                      className="input-field resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Category</label>
                      <select value={courseForm.category} onChange={e => handleFormChange('category', e.target.value)}
                        className="input-field">
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Level</label>
                      <select value={courseForm.level} onChange={e => handleFormChange('level', e.target.value)}
                        className="input-field">
                        {['Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Beginner to Intermediate'].map(l => (
                          <option key={l} value={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Language</label>
                    <input type="text" value={courseForm.language} onChange={e => handleFormChange('language', e.target.value)}
                      placeholder="e.g. Hindi & English" className="input-field" />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Intro Video URL (YouTube)</label>
                    <input type="url" value={courseForm.videoUrl} onChange={e => handleFormChange('videoUrl', e.target.value)}
                      placeholder="https://youtube.com/watch?v=..." className="input-field" />
                    <p className="text-xs text-ekam-muted mt-1">Paste a YouTube URL for the course preview video</p>
                  </div>
                </div>
              )}

              {/* Step 2: Curriculum */}
              {formStep === 2 && (
                <div className="space-y-4">
                  {/* Study material */}
                  <div className="rounded-xl p-4" style={{ background: '#FAFAF4', border: '1px solid #E2D5C4' }}>
                    <p className="flex items-center gap-1.5 text-xs font-medium text-ekam-cream-dim mb-2">
                      <FileText size={13} className="text-ekam-gold" /> Study Material (PDF)
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 mb-3">
                      {[
                        ['none', 'No PDF material'],
                        ['single', 'One PDF for whole course'],
                        ['per-lesson', 'Separate PDF per lesson'],
                      ].map(([value, label]) => (
                        <button key={value} type="button" onClick={() => handleFormChange('studyMaterialType', value)}
                          className="flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all"
                          style={{
                            background: courseForm.studyMaterialType === value ? '#8C6210' : 'white',
                            border: '1.5px solid ' + (courseForm.studyMaterialType === value ? '#8C6210' : '#E2D5C4'),
                            color: courseForm.studyMaterialType === value ? '#FFFFFF' : '#7A6550',
                          }}>
                          {label}
                        </button>
                      ))}
                    </div>
                    {courseForm.studyMaterialType === 'single' && (
                      <input type="url" value={courseForm.studyMaterialUrl}
                        onChange={e => handleFormChange('studyMaterialUrl', e.target.value)}
                        placeholder="https://drive.google.com/... (link to a PDF)" className="input-field text-xs py-2" />
                    )}
                    {courseForm.studyMaterialType === 'per-lesson' && (
                      <p className="text-xs text-ekam-muted">Add a PDF link for each lesson below, in its own row.</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-ekam-cream text-sm">Course Sections & Lessons</h3>
                    <button onClick={addSection} className="btn-outline text-xs px-3 py-1.5">
                      <Plus size={13} /> Add Section
                    </button>
                  </div>

                  {courseForm.sections.map((section, sIdx) => (
                    <div key={sIdx} className="rounded-xl overflow-hidden"
                      style={{ background: '#FAFAF4', border: '1px solid #E2D5C4' }}>
                      <div className="flex items-center gap-3 p-4 border-b border-ekam-border">
                        <span className="text-xs font-bold text-ekam-gold bg-ekam-gold/15 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                          {sIdx + 1}
                        </span>
                        <input
                          type="text"
                          value={section.title}
                          onChange={e => updateSection(sIdx, 'title', e.target.value)}
                          placeholder={`Section ${sIdx + 1} title...`}
                          className="flex-1 bg-transparent text-sm text-ekam-cream outline-none placeholder:text-ekam-muted"
                        />
                        {courseForm.sections.length > 1 && (
                          <button onClick={() => removeSection(sIdx)} className="text-ekam-muted hover:text-red-400 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>

                      <div className="p-3 space-y-2">
                        {section.lessons.map((lesson, lIdx) => (
                          <div key={lIdx} className="p-3 rounded-lg space-y-2" style={{ background: '#FFFFFF' }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={lesson.title}
                                onChange={e => updateLesson(sIdx, lIdx, 'title', e.target.value)}
                                placeholder="Lesson title"
                                className="input-field text-xs py-2"
                              />
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  value={lesson.videoUrl}
                                  onChange={e => updateLesson(sIdx, lIdx, 'videoUrl', e.target.value)}
                                  placeholder="YouTube URL"
                                  className="input-field text-xs py-2 flex-1"
                                />
                                <input
                                  type="text"
                                  value={lesson.duration}
                                  onChange={e => updateLesson(sIdx, lIdx, 'duration', e.target.value)}
                                  placeholder="MM:SS"
                                  className="input-field text-xs py-2 w-16"
                                />
                                <div className="flex items-center gap-1">
                                  <input type="checkbox" checked={lesson.free} onChange={e => updateLesson(sIdx, lIdx, 'free', e.target.checked)}
                                    id={`free-${sIdx}-${lIdx}`} className="accent-ekam-gold" />
                                  <label htmlFor={`free-${sIdx}-${lIdx}`} className="text-xs text-ekam-muted">Free</label>
                                </div>
                                {section.lessons.length > 1 && (
                                  <button onClick={() => removeLesson(sIdx, lIdx)} className="text-ekam-muted hover:text-red-400">
                                    <X size={14} />
                                  </button>
                                )}
                              </div>
                            </div>
                            {courseForm.studyMaterialType === 'per-lesson' && (
                              <div className="flex items-center gap-2">
                                <FileText size={13} className="text-ekam-gold flex-shrink-0" />
                                <input
                                  type="url"
                                  value={lesson.materialUrl}
                                  onChange={e => updateLesson(sIdx, lIdx, 'materialUrl', e.target.value)}
                                  placeholder="PDF link for this lesson"
                                  className="input-field text-xs py-2 flex-1"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                        <button onClick={() => addLesson(sIdx)} className="text-xs text-ekam-gold hover:text-ekam-gold-light flex items-center gap-1 px-3 py-1.5 transition-colors">
                          <Plus size={12} /> Add Lesson
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Pricing */}
              {formStep === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Course Price (₹)</label>
                    <input
                      type="number"
                      value={courseForm.price}
                      onChange={e => handleFormChange('price', e.target.value)}
                      placeholder="e.g. 1999 (leave 0 for free)"
                      className="input-field text-lg"
                      min="0"
                    />
                    <p className="text-xs text-ekam-muted mt-1">Enter 0 for a free course. For paid courses, Ekam&apos;s team sets a commission rate during review — you&apos;ll see the exact rate once your course is approved.</p>
                  </div>

                  {/* Preview */}
                  <div className="rounded-xl p-5" style={{ background: '#FAFAF4', border: '1px solid #E2D5C4' }}>
                    <p className="text-xs text-ekam-muted uppercase tracking-wide mb-4">Course Preview</p>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-12 rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #F5EFE4, #EDE4D8)' }}>
                        <CategoryIcon id={courseForm.category} size={22} className="text-ekam-gold" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-ekam-cream text-sm font-medium line-clamp-1">
                          {courseForm.title || 'Course Title'}
                        </p>
                        <p className="text-xs text-ekam-gold mt-0.5">{user.name}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-xs text-ekam-muted">
                          <span>{courseForm.sections.reduce((a, s) => a + s.lessons.length, 0)} lessons</span>
                          <span>•</span>
                          <span>{categories.find(c => c.id === courseForm.category)?.label}</span>
                          <span>•</span>
                          <span>{courseForm.level}</span>
                        </div>
                        <p className="text-base font-semibold text-ekam-gold mt-2">
                          {courseForm.price > 0 ? `₹${Number(courseForm.price).toLocaleString('en-IN')}` : 'Free'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-lg text-xs"
                      style={{ background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.15)' }}>
                      <p className="text-ekam-gold font-medium mb-1">📋 Submission Note</p>
                      <p className="text-ekam-muted">Your course will be submitted for review by the Ekam team. It will be published within 48 hours after approval. You&apos;ll receive a notification once it&apos;s live.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-ekam-border">
                <button
                  onClick={() => formStep > 1 ? setFormStep(f => f - 1) : (setShowCreateModal(false), setEditingCourse(null), setCourseForm(EMPTY_COURSE), setFormStep(1))}
                  className="btn-ghost"
                >
                  {formStep > 1 ? '← Previous' : 'Cancel'}
                </button>

                {formStep < 3 ? (
                  <button
                    onClick={() => setFormStep(f => f + 1)}
                    disabled={formStep === 1 && !courseForm.title}
                    className="btn-gold disabled:opacity-50"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={saveCourse}
                    disabled={saving}
                    className="btn-gold disabled:opacity-60"
                  >
                    {saving ? (
                      <span className="flex items-center gap-2"><div className="loader-gold w-4 h-4" /> Saving...</span>
                    ) : (
                      editingCourse ? 'Update Course' : 'Submit for Review'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CourseRow({ course, onEdit, onDelete }) {
  const statusColors = {
    pending: { bg: 'rgba(232,98,42,0.1)', border: 'rgba(232,98,42,0.3)', text: '#E8622A' },
    published: { bg: 'rgba(76,175,114,0.1)', border: 'rgba(76,175,114,0.3)', text: '#4CAF72' },
    draft: { bg: 'rgba(122,107,82,0.1)', border: 'rgba(122,107,82,0.3)', text: '#9B8B6E' },
  }
  const sc = statusColors[course.status] || statusColors.pending

  return (
    <div className="card-base p-4 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(140,98,16,0.08)' }}>
        <CategoryIcon id={course.category} size={22} className="text-ekam-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="font-medium text-ekam-cream text-sm truncate">{course.title}</p>
          <span className="flex-shrink-0 badge text-[10px] font-semibold"
            style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text }}>
            {course.status?.toUpperCase()}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-ekam-muted">
          <span>{course.totalLessons} lessons</span>
          <span>•</span>
          <span>{formatPrice(course.price)}</span>
          <span>•</span>
          <span>{formatNumber(course.studentCount || 0)} students</span>
          {course.studyMaterialType && course.studyMaterialType !== 'none' && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1"><FileText size={11} /> Study material</span>
            </>
          )}
          {course.price > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Percent size={11} />
                {course.commissionPct != null ? `${course.commissionPct}% commission` : 'Commission: pending review'}
              </span>
            </>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        <Link href={`/courses/${course.id}`}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-ekam-muted hover:text-ekam-gold hover:bg-ekam-gold/10 transition-all"
          title="Preview">
          <Eye size={14} />
        </Link>
        <button onClick={() => onEdit(course)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-ekam-muted hover:text-ekam-gold hover:bg-ekam-gold/10 transition-all"
          title="Edit">
          <Edit3 size={14} />
        </button>
        <button onClick={() => onDelete(course.id)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-ekam-muted hover:text-red-400 hover:bg-red-900/20 transition-all"
          title="Delete">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, BookOpen, Heart, Award, LogOut, Save, ShieldCheck, GraduationCap } from 'lucide-react'
import { courses } from '@/lib/data'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [saved, setSaved] = useState(false)
  const [enrolledCount, setEnrolledCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [certCount, setCertCount] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('ekam_user')
    if (!stored) { router.push('/auth/login?redirect=/profile'); return }
    const u = JSON.parse(stored)
    setUser(u)
    setName(u.name || '')

    const enrolled = JSON.parse(localStorage.getItem('ekam_enrolled') || '[]')
    setEnrolledCount(enrolled.length)
    setWishlistCount(JSON.parse(localStorage.getItem('ekam_wishlist') || '[]').length)

    const done = enrolled.filter(id => {
      const course = courses.find(c => c.id === id)
      if (!course) return false
      const progress = JSON.parse(localStorage.getItem(`ekam_progress_${id}`) || '[]')
      return progress.length >= (course.totalLessons || Infinity)
    })
    setCertCount(done.length)
  }, [router])

  const handleSave = () => {
    const updated = { ...user, name }
    localStorage.setItem('ekam_user', JSON.stringify(updated))
    setUser(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => {
    localStorage.removeItem('ekam_user')
    router.push('/')
  }

  const roleMeta = {
    admin: { label: 'Administrator', icon: ShieldCheck, color: '#B01818' },
    instructor: { label: 'Instructor', icon: GraduationCap, color: '#C44015' },
    student: { label: 'Student', icon: User, color: '#8C6210' },
  }

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFFFF' }}>
      <div className="loader-gold w-8 h-8" />
    </div>
  )

  const meta = roleMeta[user.role] || roleMeta.student

  return (
    <div className="min-h-screen pt-24 pb-20 px-4" style={{ background: '#FFFFFF' }}>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <span className="section-label mb-3 block">Account</span>
          <h1 className="text-3xl md:text-4xl font-semibold" style={{ color: '#1C0E04' }}>Your Profile</h1>
        </div>

        {/* Profile card */}
        <div className="card-base p-7 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
            {user.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl font-semibold" style={{ color: '#1C0E04' }}>{user.name}</p>
            <p className="text-sm mb-2" style={{ color: '#7A6550' }}>{user.email}</p>
            <span className="inline-flex items-center gap-1.5 badge text-[10px] font-semibold"
              style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}40`, color: meta.color }}>
              <meta.icon size={11} /> {meta.label}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            ['Enrolled', enrolledCount, BookOpen],
            ['Wishlist', wishlistCount, Heart],
            ['Certificates', certCount, Award],
          ].map(([label, value, Icon], i) => (
            <div key={i} className="card-base p-5 text-center">
              <Icon size={18} className="text-ekam-gold mx-auto mb-2" />
              <p className="text-xl font-semibold" style={{ color: '#1C0E04' }}>{value}</p>
              <p className="text-xs text-ekam-muted">{label}</p>
            </div>
          ))}
        </div>

        {/* Edit form */}
        <div className="card-base p-7 mb-6">
          <h2 className="text-lg font-semibold mb-5" style={{ color: '#1C0E04' }}>Edit Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-field pl-10" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input type="email" value={user.email || ''} disabled className="input-field pl-10 opacity-60 cursor-not-allowed" />
              </div>
            </div>
            <button onClick={handleSave} className="btn-gold">
              <Save size={15} /> {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Quick links */}
        <div className="card-base p-5 mb-6">
          <div className="flex flex-col divide-y" style={{ borderColor: '#EDE4D8' }}>
            {(user.role === 'instructor' || user.role === 'admin') && (
              <Link href="/dashboard" className="flex items-center justify-between py-3 text-sm text-ekam-cream-dim hover:text-ekam-gold transition-colors">
                Instructor Dashboard <span>→</span>
              </Link>
            )}
            <Link href="/my-learning" className="flex items-center justify-between py-3 text-sm text-ekam-cream-dim hover:text-ekam-gold transition-colors">
              My Learning <span>→</span>
            </Link>
            <Link href="/certificates" className="flex items-center justify-between py-3 text-sm text-ekam-cream-dim hover:text-ekam-gold transition-colors">
              My Certificates <span>→</span>
            </Link>
          </div>
        </div>

        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
          style={{ border: '1px solid rgba(176,24,24,0.2)' }}>
          <LogOut size={15} /> Sign Out
        </button>
      </div>
    </div>
  )
}

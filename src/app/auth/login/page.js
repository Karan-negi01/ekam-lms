'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, Lock, Mail } from 'lucide-react'
import AuthSidePanel from '@/components/layout/AuthSidePanel'
import { findUserByEmail, saveUserToDirectory } from '@/lib/utils'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    await new Promise(r => setTimeout(r, 800))
    if (!form.email || !form.password) { setError('Please fill in all fields.'); setLoading(false); return }
    const existing = findUserByEmail(form.email)
    let user
    if (existing) {
      user = { id: existing.id, name: existing.name, email: form.email, role: existing.role }
    } else {
      const isAdmin = form.email.toLowerCase().includes('admin')
      const isInstructor = form.email.toLowerCase().includes('instructor') || form.email.toLowerCase().includes('teacher')
      user = {
        id: 'user-' + Date.now(),
        name: form.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: form.email,
        role: isAdmin ? 'admin' : isInstructor ? 'instructor' : 'student',
      }
    }
    localStorage.setItem('ekam_user', JSON.stringify(user))
    saveUserToDirectory(user)
    setLoading(false)
    router.push(redirect)
  }

  const demoLogin = (role) => {
    const demos = {
      student: { email: 'student@ekam.in', password: 'demo123', role: 'student', name: 'Arjun Verma' },
      instructor: { email: 'instructor@ekam.in', password: 'demo123', role: 'instructor', name: 'Guru Meenakshi' },
      admin: { email: 'admin@ekam.in', password: 'demo123', role: 'admin', name: 'Ekam Admin' },
    }
    const demo = demos[role]
    const user = { id: 'demo-' + role, ...demo }
    localStorage.setItem('ekam_user', JSON.stringify(user))
    saveUserToDirectory(user)
    router.push(role === 'admin' ? '/admin' : role === 'instructor' ? '/dashboard' : '/')
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16 md:pt-20">
      <AuthSidePanel />

      <div className="flex items-center justify-center px-4 py-24 lg:py-16 relative"
        style={{ background: '#FFFFFF' }}>
        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex lg:hidden flex-col items-center gap-2 mb-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)', boxShadow: '0 0 28px rgba(140,98,16,0.25)' }}>
                <span className="font-display font-bold text-3xl text-white">ए</span>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold tracking-widest" style={{ color: '#1C0E04' }}>EKAM</p>
                <p className="text-xs tracking-[0.3em] text-ekam-gold opacity-75">एकम्</p>
              </div>
            </Link>
            <h1 className="text-2xl mb-1" style={{ color: '#1C0E04' }}>Welcome Back</h1>
            <p className="text-sm" style={{ color: '#7A6550' }}>Sign in to continue your learning journey</p>
          </div>

          <div className="rounded-2xl p-6 md:p-8 bg-white"
            style={{ border: '1px solid #E2D5C4', boxShadow: '0 8px 40px rgba(139,94,10,0.10)' }}>

          {/* Demo logins */}
          <div className="mb-6">
            <p className="text-xs text-center mb-3 tracking-wide" style={{ color: '#7A6550' }}>Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'student', label: 'Student', bg: 'rgba(140,98,16,0.07)', border: 'rgba(140,98,16,0.22)', text: '#8C6210' },
                { role: 'instructor', label: 'Instructor', bg: 'rgba(196,64,21,0.07)', border: 'rgba(196,64,21,0.22)', text: '#C44015' },
                { role: 'admin', label: 'Admin', bg: 'rgba(176,24,24,0.07)', border: 'rgba(176,24,24,0.22)', text: '#B01818' },
              ].map(({ role, label, bg, border, text }) => (
                <button key={role} onClick={() => demoLogin(role)}
                  className="px-2 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{ background: bg, border: `1px solid ${border}`, color: text }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="divider-gold mb-6">
            <span className="px-3 text-xs" style={{ color: '#7A6550' }}>or sign in manually</span>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg text-xs text-red-600"
              style={{ background: 'rgba(176,24,24,0.06)', border: '1px solid rgba(176,24,24,0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D2814' }}>Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className="input-field pl-10" required />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium" style={{ color: '#3D2814' }}>Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-ekam-gold hover:text-ekam-gold-light transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password}
                  onChange={handleChange} placeholder="Enter your password" className="input-field pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ekam-muted hover:text-ekam-cream transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-gold w-full justify-center py-3.5 text-base rounded-xl mt-2 disabled:opacity-60">
              {loading ? (
                <div className="flex items-center gap-2"><div className="loader-gold w-4 h-4" /> Signing in...</div>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-5" style={{ color: '#7A6550' }}>
            New to Ekam?{' '}
            <Link href="/auth/signup" className="text-ekam-gold hover:text-ekam-gold-light font-medium transition-colors">
              Create an account
            </Link>
          </p>
        </div>

          <p className="text-center text-xs mt-6" style={{ color: '#7A6550' }}>
            By signing in, you agree to Ekam&apos;s{' '}
            <Link href="/terms" className="text-ekam-gold hover:text-ekam-gold-light transition-colors">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-ekam-gold hover:text-ekam-gold-light transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFFFF' }}><div className="loader-gold w-8 h-8" /></div>}>
      <LoginForm />
    </Suspense>
  )
}

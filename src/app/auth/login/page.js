'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, Lock, Mail } from 'lucide-react'

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

    // Mock auth — check if admin
    const isAdmin = form.email.toLowerCase().includes('admin')
    const isInstructor = form.email.toLowerCase().includes('instructor') || form.email.toLowerCase().includes('teacher')

    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      setLoading(false)
      return
    }

    const user = {
      id: 'user-' + Date.now(),
      name: form.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: form.email,
      role: isAdmin ? 'admin' : isInstructor ? 'instructor' : 'student',
    }

    localStorage.setItem('ekam_user', JSON.stringify(user))
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
    localStorage.setItem('ekam_user', JSON.stringify({ id: 'demo-' + role, ...demo }))
    router.push(role === 'admin' ? '/admin' : role === 'instructor' ? '/dashboard' : '/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 cultural-bg"
      style={{ background: '#080604' }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(212,168,67,0.05) 0%, transparent 70%)' }} />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)', boxShadow: '0 0 30px rgba(212,168,67,0.3)' }}>
              <span className="font-display font-bold text-3xl text-ekam-bg">ए</span>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold tracking-widest text-ekam-cream">EKAM</p>
              <p className="text-xs tracking-[0.3em] text-ekam-gold opacity-70">एकम्</p>
            </div>
          </Link>
          <h1 className="font-serif text-2xl text-ekam-cream mt-6 mb-1">Welcome Back</h1>
          <p className="text-sm text-ekam-muted">Sign in to continue your learning journey</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6 md:p-8"
          style={{ background: '#1C1510', border: '1px solid #2E2215', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>

          {/* Demo logins */}
          <div className="mb-6">
            <p className="text-xs text-ekam-muted text-center mb-3 tracking-wide">Quick Demo Access</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { role: 'student', label: 'Student', color: 'rgba(212,168,67,0.1)', border: 'rgba(212,168,67,0.25)', text: '#D4A843' },
                { role: 'instructor', label: 'Instructor', color: 'rgba(232,98,42,0.1)', border: 'rgba(232,98,42,0.25)', text: '#E8622A' },
                { role: 'admin', label: 'Admin', color: 'rgba(139,32,32,0.15)', border: 'rgba(139,32,32,0.4)', text: '#E05555' },
              ].map(({ role, label, color, border, text }) => (
                <button
                  key={role}
                  onClick={() => demoLogin(role)}
                  className="px-2 py-2 rounded-lg text-xs font-medium transition-all hover:scale-105"
                  style={{ background: color, border: `1px solid ${border}`, color: text }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="divider-gold mb-6">
            <span className="px-3 text-xs text-ekam-muted">or sign in manually</span>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg text-xs text-red-300"
              style={{ background: 'rgba(139,32,32,0.2)', border: '1px solid rgba(139,32,32,0.4)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-medium text-ekam-cream-dim">Password</label>
                <Link href="/auth/forgot-password" className="text-xs text-ekam-gold hover:text-ekam-gold-light transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ekam-muted hover:text-ekam-cream transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center py-3.5 text-base rounded-xl mt-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="loader-gold w-4 h-4" />
                  Signing in...
                </div>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-ekam-muted mt-5">
            New to Ekam?{' '}
            <Link href="/auth/signup" className="text-ekam-gold hover:text-ekam-gold-light font-medium transition-colors">
              Create an account
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-ekam-muted mt-6">
          By signing in, you agree to Ekam&apos;s{' '}
          <Link href="/terms" className="text-ekam-gold hover:text-ekam-gold-light transition-colors">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-ekam-gold hover:text-ekam-gold-light transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#080604' }}><div className="loader-gold w-8 h-8" /></div>}>
      <LoginForm />
    </Suspense>
  )
}

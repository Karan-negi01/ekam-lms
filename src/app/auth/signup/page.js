'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, User, Mail, Lock, GraduationCap, BookOpen } from 'lucide-react'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role') || 'student'

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState(1)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      setLoading(false)
      return
    }

    await new Promise(r => setTimeout(r, 900))

    const user = {
      id: 'user-' + Date.now(),
      name: form.name,
      email: form.email,
      role: form.role,
    }

    localStorage.setItem('ekam_user', JSON.stringify(user))
    setLoading(false)

    if (form.role === 'instructor') {
      router.push('/dashboard')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 cultural-bg"
      style={{ background: '#080604' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(212,168,67,0.05) 0%, transparent 70%)' }} />

      <div className="w-full max-w-md relative z-10 py-8">
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
          <h1 className="font-serif text-2xl text-ekam-cream mt-6 mb-1">Join Ekam</h1>
          <p className="text-sm text-ekam-muted">Start your cultural learning journey today</p>
        </div>

        <div className="rounded-2xl p-6 md:p-8"
          style={{ background: '#1C1510', border: '1px solid #2E2215', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-xs font-medium text-ekam-cream-dim mb-3">I want to join as</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'student', label: 'Student', desc: 'Learn from masters', icon: BookOpen },
                { value: 'instructor', label: 'Instructor', desc: 'Share your expertise', icon: GraduationCap },
              ].map(({ value, label, desc, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, role: value }))}
                  className={`p-4 rounded-xl text-left transition-all ${
                    form.role === value
                      ? 'border-ekam-gold/50 bg-ekam-gold/10'
                      : 'border-ekam-border hover:border-ekam-gold/30 hover:bg-white/5'
                  }`}
                  style={{ border: '1px solid' }}
                >
                  <Icon size={20} className={form.role === value ? 'text-ekam-gold mb-2' : 'text-ekam-muted mb-2'} />
                  <p className={`text-sm font-medium ${form.role === value ? 'text-ekam-gold' : 'text-ekam-cream'}`}>{label}</p>
                  <p className="text-xs text-ekam-muted mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg text-xs text-red-300"
              style={{ background: 'rgba(139,32,32,0.2)', border: '1px solid rgba(139,32,32,0.4)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

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
              <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="input-field pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ekam-muted hover:text-ekam-cream"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ekam-cream-dim mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            {form.role === 'instructor' && (
              <div className="p-3 rounded-lg text-xs text-ekam-cream-dim"
                style={{ background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.2)' }}>
                <p className="text-ekam-gold font-medium mb-1">Instructor Account</p>
                Your profile will be reviewed by the Ekam team. You can start creating courses immediately and they will be published after verification.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full justify-center py-3.5 text-base rounded-xl disabled:opacity-60"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="loader-gold w-4 h-4" />
                  Creating account...
                </div>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-ekam-muted mt-5">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-ekam-gold hover:text-ekam-gold-light font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-ekam-muted mt-4">
          By creating an account, you agree to Ekam&apos;s{' '}
          <Link href="/terms" className="text-ekam-gold hover:text-ekam-gold-light transition-colors">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-ekam-gold hover:text-ekam-gold-light transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#080604' }}><div className="loader-gold w-8 h-8" /></div>}>
      <SignupForm />
    </Suspense>
  )
}

'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, ArrowRight, User, Mail, Lock, GraduationCap, BookOpen } from 'lucide-react'
import AuthSidePanel from '@/components/layout/AuthSidePanel'

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get('role') || 'student'

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: defaultRole })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => { setForm(prev => ({ ...prev, [e.target.name]: e.target.value })); setError('') }

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('')
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); setLoading(false); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); setLoading(false); return }
    await new Promise(r => setTimeout(r, 900))
    const user = { id: 'user-' + Date.now(), name: form.name, email: form.email, role: form.role }
    localStorage.setItem('ekam_user', JSON.stringify(user))
    setLoading(false)
    router.push(form.role === 'instructor' ? '/dashboard' : '/')
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16 md:pt-20">
      <AuthSidePanel />

      <div className="flex items-center justify-center px-4 py-12" style={{ background: '#FDFAF4' }}>
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
            <h1 className="font-serif text-2xl mb-1" style={{ color: '#1C0E04' }}>Join Ekam</h1>
            <p className="text-sm" style={{ color: '#7A6550' }}>Start your cultural learning journey today</p>
          </div>

          <div className="rounded-2xl p-6 md:p-8 bg-white"
            style={{ border: '1px solid #E2D5C4', boxShadow: '0 8px 40px rgba(139,94,10,0.10)' }}>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-xs font-medium mb-3" style={{ color: '#3D2814' }}>I want to join as</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'student', label: 'Student', desc: 'Learn from masters', icon: BookOpen },
                { value: 'instructor', label: 'Instructor', desc: 'Share your expertise', icon: GraduationCap },
              ].map(({ value, label, desc, icon: Icon }) => (
                <button key={value} type="button" onClick={() => setForm(prev => ({ ...prev, role: value }))}
                  className={`p-4 rounded-xl text-left transition-all ${
                    form.role === value ? 'border-ekam-gold/50' : 'hover:border-ekam-gold/25'
                  }`}
                  style={{
                    border: '1.5px solid',
                    borderColor: form.role === value ? 'rgba(140,98,16,0.5)' : '#E2D5C4',
                    background: form.role === value ? 'rgba(140,98,16,0.06)' : 'white',
                  }}>
                  <Icon size={20} className={form.role === value ? 'text-ekam-gold mb-2' : 'mb-2'} style={{ color: form.role === value ? '#8C6210' : '#7A6550' }} />
                  <p className="text-sm font-medium" style={{ color: form.role === value ? '#8C6210' : '#1C0E04' }}>{label}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7A6550' }}>{desc}</p>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-lg text-xs text-red-600"
              style={{ background: 'rgba(176,24,24,0.06)', border: '1px solid rgba(176,24,24,0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D2814' }}>Full Name</label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Your full name" className="input-field pl-10" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D2814' }}>Email Address</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" className="input-field pl-10" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D2814' }}>Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={form.password}
                  onChange={handleChange} placeholder="Minimum 6 characters" className="input-field pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ekam-muted hover:text-ekam-cream transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: '#3D2814' }}>Confirm Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
                <input type="password" name="confirmPassword" value={form.confirmPassword}
                  onChange={handleChange} placeholder="Repeat your password" className="input-field pl-10" required />
              </div>
            </div>

            {form.role === 'instructor' && (
              <div className="p-3 rounded-lg text-xs" style={{ background: 'rgba(140,98,16,0.06)', border: '1px solid rgba(140,98,16,0.18)' }}>
                <p className="font-medium mb-1 text-ekam-gold">Instructor Account</p>
                <p style={{ color: '#7A6550' }}>You can start creating courses immediately. They will go live after Ekam team review within 48 hours.</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="btn-gold w-full justify-center py-3.5 text-base rounded-xl disabled:opacity-60">
              {loading ? (
                <div className="flex items-center gap-2"><div className="loader-gold w-4 h-4" /> Creating account...</div>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm mt-5" style={{ color: '#7A6550' }}>
            Already have an account?{' '}
            <Link href="/auth/login" className="text-ekam-gold hover:text-ekam-gold-light font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: '#FDFAF4' }}><div className="loader-gold w-8 h-8" /></div>}>
      <SignupForm />
    </Suspense>
  )
}

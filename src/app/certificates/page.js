'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Award, CheckCircle2, Search, Download, ShieldCheck, Star } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { courses } from '@/lib/data'

const perks = [
  { icon: ShieldCheck, title: 'Recognized by Institutions', desc: 'Acknowledged by the cultural institutions and gurukuls Ekam partners with across India.' },
  { icon: Award, title: 'Signed by Your Instructor', desc: 'Every certificate carries your instructor’s name and credentials, not just a platform logo.' },
  { icon: CheckCircle2, title: 'Shareable & Verifiable', desc: 'Download as PDF or share a verification link directly on LinkedIn and social profiles.' },
]

export default function CertificatesPage() {
  const [user, setUser] = useState(null)
  const [completed, setCompleted] = useState([])
  const [verifyId, setVerifyId] = useState('')
  const [verifyResult, setVerifyResult] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('ekam_user')
    if (stored) setUser(JSON.parse(stored))

    const enrolled = JSON.parse(localStorage.getItem('ekam_enrolled') || '[]')
    const done = enrolled.filter(id => {
      const course = courses.find(c => c.id === id)
      if (!course) return false
      const progress = JSON.parse(localStorage.getItem(`ekam_progress_${id}`) || '[]')
      return progress.length >= (course.totalLessons || Infinity)
    })
    setCompleted(done)
  }, [])

  const handleVerify = (e) => {
    e.preventDefault()
    const found = courses.find(c => c.id === verifyId.trim())
    setVerifyResult(found ? { valid: true, course: found } : { valid: false })
  }

  return (
    <div style={{ background: '#FFFFFF' }}>
      <PageHero
        label="Recognition"
        title="Certificates That Mean Something"
        subtitle="Complete any course curriculum and earn a certificate signed by your instructor — recognized by our partner institutions."
      />

      {/* Sample certificate visual */}
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #FFFDF8, #FAF3E4)', border: '2px solid #D4A843' }}>
            <div className="absolute inset-3 rounded-2xl pointer-events-none" style={{ border: '1px solid rgba(140,98,16,0.25)' }} />
            <div className="relative text-center">
              <p className="font-display text-sm tracking-[0.3em] mb-2" style={{ color: '#8C6210' }}>एकम् · EKAM</p>
              <p className="text-xs uppercase tracking-widest mb-6" style={{ color: '#9B8878' }}>Certificate of Completion</p>
              <p className="text-sm mb-2" style={{ color: '#7A6550' }}>This certifies that</p>
              <p className="text-3xl mb-2" style={{ color: '#1C0E04' }}>Your Name Here</p>
              <p className="text-sm mb-6" style={{ color: '#7A6550' }}>has successfully completed</p>
              <p className="text-xl italic mb-8" style={{ color: '#8C6210' }}>Hindustani Classical Vocal: From Raga to Performance</p>
              <div className="flex items-center justify-center gap-16">
                <div>
                  <p className="text-sm border-t pt-2" style={{ color: '#1C0E04', borderColor: '#D4A843', minWidth: '140px' }}>Pandit Ravishankar Mishra</p>
                  <p className="text-[10px] mt-1" style={{ color: '#9B8878' }}>Instructor</p>
                </div>
                <Award size={40} className="text-ekam-gold" />
                <div>
                  <p className="text-sm border-t pt-2" style={{ color: '#1C0E04', borderColor: '#D4A843', minWidth: '140px' }}>10 July 2026</p>
                  <p className="text-[10px] mt-1" style={{ color: '#9B8878' }}>Date Issued</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Why It Matters</span>
            <h2 className="section-title text-4xl md:text-5xl">More Than a PDF</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {perks.map((p, i) => (
              <div key={i} className="rounded-2xl p-7 bg-white text-center" style={{ border: '1px solid #EDE4D8' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(140,98,16,0.08)' }}>
                  <p.icon size={22} className="text-ekam-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#1C0E04' }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#7A6550' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Your certificates */}
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-4xl md:text-5xl mb-8 text-center">Your Certificates</h2>
          {!user ? (
            <div className="card-base p-10 text-center">
              <Award size={32} className="text-ekam-gold mx-auto mb-3" />
              <p className="text-ekam-cream font-medium mb-1">Sign in to see your certificates</p>
              <p className="text-ekam-muted text-sm mb-5">Complete a course to earn your first one.</p>
              <Link href="/auth/login" className="btn-gold">Sign In</Link>
            </div>
          ) : completed.length === 0 ? (
            <div className="card-base p-10 text-center">
              <Award size={32} className="text-ekam-gold mx-auto mb-3" />
              <p className="text-ekam-cream font-medium mb-1">No certificates yet</p>
              <p className="text-ekam-muted text-sm mb-5">Finish every lesson in a course to unlock its certificate.</p>
              <Link href="/my-learning" className="btn-gold">Go to My Learning</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {completed.map(id => {
                const course = courses.find(c => c.id === id)
                return (
                  <div key={id} className="card-base p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(140,98,16,0.08)' }}>
                      <Award size={20} className="text-ekam-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-ekam-cream truncate">{course.title}</p>
                      <p className="text-xs text-ekam-muted">Completed</p>
                    </div>
                    <button className="btn-outline text-xs px-3 py-2"><Download size={13} /> Download</button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Verify */}
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-lg mx-auto text-center">
          <span className="section-label mb-4 block justify-center">Verification</span>
          <h2 className="section-title text-4xl md:text-5xl mb-4">Verify a Certificate</h2>
          <p className="text-sm mb-6" style={{ color: '#6B5744' }}>Paste a course ID from a certificate to confirm it was genuinely issued by Ekam.</p>
          <form onSubmit={handleVerify} className="flex gap-2">
            <div className="relative flex-1 rounded-xl overflow-hidden bg-white" style={{ border: '1.5px solid #E2D5C4' }}>
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ekam-muted" />
              <input type="text" value={verifyId} onChange={e => setVerifyId(e.target.value)}
                placeholder="e.g. course-1" className="w-full pl-9 pr-3 py-3 bg-transparent text-sm outline-none" style={{ color: '#1C0E04' }} />
            </div>
            <button type="submit" className="btn-gold px-5">Verify</button>
          </form>
          {verifyResult && (
            <div className="mt-4 p-4 rounded-xl text-left text-sm"
              style={{
                background: verifyResult.valid ? 'rgba(184,70,15,0.08)' : 'rgba(176,24,24,0.06)',
                border: `1px solid ${verifyResult.valid ? 'rgba(184,70,15,0.3)' : 'rgba(176,24,24,0.2)'}`,
                color: verifyResult.valid ? '#B8460F' : '#B01818',
              }}>
              {verifyResult.valid
                ? <>✓ Valid certificate for <strong>{verifyResult.course.title}</strong></>
                : '✕ No certificate found for that course ID.'}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

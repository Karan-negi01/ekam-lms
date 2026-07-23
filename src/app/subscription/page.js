'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Check, Crown, BookOpen, Award, RefreshCw } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CourseCard from '@/components/courses/CourseCard'
import { courses as staticCourses } from '@/lib/data'
import { getPublishedUserCourses, getSubscription, subscribe } from '@/lib/utils'

const PERKS = [
  'Every subscription-tagged course, from every instructor',
  'New subscription courses added every month, no extra cost',
  'Full lesson tests, XP, badges and progress tracking included',
  'Cancel anytime — no long-term commitment',
]

export default function SubscriptionPage() {
  const [user, setUser] = useState(null)
  const [sub, setSub] = useState({ active: false })
  const [subscriptionCourses, setSubscriptionCourses] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('ekam_user')
    const u = stored ? JSON.parse(stored) : null
    setUser(u)
    if (u) setSub(getSubscription(u.id))

    const all = [...staticCourses, ...getPublishedUserCourses()]
    setSubscriptionCourses(all.filter(c => c.pricingModel === 'subscription'))
  }, [])

  const handleSubscribe = () => {
    if (!user) { window.location.href = '/auth/login?redirect=/subscription'; return }
    subscribe(user.id)
    setSub({ active: true, startedAt: new Date().toISOString() })
  }

  return (
    <div style={{ background: '#FFFFFF' }}>
      <PageHero
        label="Ekam Subscription"
        title="One Subscription. Every Tradition."
        subtitle="Unlimited access to every subscription-included course on Ekam — music, dance, yoga, Sanskrit and more — for one flat monthly fee."
      />

      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl p-8 md:p-10 text-center" style={{ background: '#FFFFFF', border: '1px solid #E2D5C4', boxShadow: '0 8px 40px rgba(139,94,10,0.08)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(140,98,16,0.08)' }}>
              <Crown size={26} className="text-ekam-gold" />
            </div>
            <p className="text-sm text-ekam-muted mb-1">Ekam Unlimited</p>
            <p className="mb-6">
              <span className="text-5xl font-extrabold" style={{ color: '#1C0E04' }}>₹100</span>
              <span className="text-ekam-muted"> / month</span>
            </p>

            <div className="space-y-3 mb-8 text-left max-w-sm mx-auto">
              {PERKS.map((perk, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#3D2814' }}>
                  <Check size={16} className="text-ekam-gold flex-shrink-0 mt-0.5" />
                  {perk}
                </div>
              ))}
            </div>

            {sub.active ? (
              <div className="rounded-xl p-4 text-sm flex items-center justify-center gap-2" style={{ background: 'rgba(184,70,15,0.08)', border: '1px solid rgba(184,70,15,0.25)', color: '#B8460F' }}>
                <RefreshCw size={15} /> You&apos;re subscribed — active since {new Date(sub.startedAt).toLocaleDateString('en-IN')}
              </div>
            ) : (
              <button onClick={handleSubscribe} className="btn-gold w-full justify-center py-3.5 text-base rounded-xl">
                Subscribe Now
              </button>
            )}
            <p className="text-xs text-ekam-muted mt-4">Simulated for this demo — no real payment is processed.</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold" style={{ color: '#1C0E04' }}>Included in Your Subscription</h2>
          </div>

          {subscriptionCourses.length === 0 ? (
            <div className="card-base p-10 text-center">
              <BookOpen size={28} className="text-ekam-gold mx-auto mb-3" />
              <p className="text-sm text-ekam-muted">No subscription courses have been published yet — check back soon, or explore our paid courses.</p>
              <Link href="/courses" className="btn-outline inline-flex mt-5 px-6 py-2.5 text-sm">Browse All Courses</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {subscriptionCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

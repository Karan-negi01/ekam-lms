'use client'

import { useState, useEffect } from 'react'
import { Trophy, Zap, Award, Users, Info } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { courses as staticCourses } from '@/lib/data'
import { getAllUsers, getSubscription } from '@/lib/utils'
import { getXP, getBadges, getLevelForXP, tierRank } from '@/lib/gamification'

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

function getSnapshot() {
  try { return JSON.parse(localStorage.getItem('ekam_leaderboard_snapshot') || 'null') } catch { return null }
}

function buildCourseOwnerMap() {
  const owner = {}
  staticCourses.forEach(c => { if (c.instructor?.id) owner[c.id] = c.instructor.id })
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('ekam_courses_')) {
      try {
        const list = JSON.parse(localStorage.getItem(key) || '[]')
        list.forEach(c => { if (c.instructor?.id) owner[c.id] = c.instructor.id })
      } catch {}
    }
  }
  return owner
}

function buildSubscriptionCourseIds() {
  const ids = new Set()
  staticCourses.forEach(c => { if (c.pricingModel === 'subscription') ids.add(c.id) })
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('ekam_courses_')) {
      try {
        JSON.parse(localStorage.getItem(key) || '[]').forEach(c => { if (c.pricingModel === 'subscription') ids.add(c.id) })
      } catch {}
    }
  }
  return ids
}

function computeInstructorEnrollCounts(users) {
  const courseOwner = buildCourseOwnerMap()
  const subCourseIds = buildSubscriptionCourseIds()
  const counts = {}
  users.forEach(u => {
    const purchases = JSON.parse(localStorage.getItem(`ekam_purchases_${u.id}`) || '[]')
    const instructorsForUser = new Set()
    purchases.forEach(p => {
      const instId = courseOwner[p.courseId]
      if (instId) instructorsForUser.add(instId)
    })
    if (getSubscription(u.id).active) {
      subCourseIds.forEach(courseId => {
        const instId = courseOwner[courseId]
        if (instId) instructorsForUser.add(instId)
      })
    }
    instructorsForUser.forEach(instId => {
      counts[instId] = (counts[instId] || 0) + 1
    })
  })
  return counts
}

export default function LeaderboardPage() {
  const [tab, setTab] = useState('students')
  const [students, setStudents] = useState([])
  const [instructors, setInstructors] = useState([])
  const [weekStart, setWeekStart] = useState(null)

  useEffect(() => {
    const users = getAllUsers()

    const studentRows = users
      .filter(u => u.role === 'student')
      .map(u => {
        const xp = getXP(u.id)
        const badges = getBadges(u.id)
        const topTier = badges.reduce((max, b) => Math.max(max, tierRank(b.tier)), 0)
        return { id: u.id, name: u.name, xp, level: getLevelForXP(xp), topTier, badgeCount: badges.length }
      })
      .sort((a, b) => b.level - a.level || b.topTier - a.topTier || b.badgeCount - a.badgeCount)

    const enrollCounts = computeInstructorEnrollCounts(users)
    let snap = getSnapshot()
    const now = Date.now()
    if (!snap || now - new Date(snap.weekStart).getTime() >= WEEK_MS) {
      snap = { weekStart: new Date().toISOString(), enrollSnapshot: { ...enrollCounts } }
      localStorage.setItem('ekam_leaderboard_snapshot', JSON.stringify(snap))
    }
    setWeekStart(snap.weekStart)

    const instructorRows = users
      .filter(u => u.role === 'instructor')
      .map(u => {
        const total = enrollCounts[u.id] || 0
        const weekly = total - (snap.enrollSnapshot?.[u.id] || 0)
        return { id: u.id, name: u.name, total, weekly: Math.max(0, weekly) }
      })
      .sort((a, b) => b.weekly - a.weekly || b.total - a.total)

    setStudents(studentRows)
    setInstructors(instructorRows)
  }, [])

  const rows = tab === 'students' ? students : instructors

  return (
    <div style={{ background: '#FFFFFF' }}>
      <PageHero
        label="Leaderboard"
        title="Top Learners & Instructors"
        subtitle="Rankings reset weekly. Students are ranked by level, then badge tier, then badge count. Instructors are ranked by new students enrolled this week."
      />

      <section className="py-16 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2 mb-6">
            {[['students', 'Students'], ['instructors', 'Instructors']].map(([value, label]) => (
              <button key={value} onClick={() => setTab(value)}
                className="flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: tab === value ? '#8C6210' : 'white',
                  border: '1.5px solid ' + (tab === value ? '#8C6210' : '#E2D5C4'),
                  color: tab === value ? '#FFFFFF' : '#7A6550',
                }}>
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-ekam-muted mb-5 px-1">
            <Info size={13} />
            Rankings reflect accounts used on this device — resets every 7 days
            {weekStart && ` (last reset ${new Date(weekStart).toLocaleDateString('en-IN')})`}.
          </div>

          {rows.length === 0 ? (
            <div className="card-base p-10 text-center">
              <Trophy size={28} className="text-ekam-gold mx-auto mb-3" />
              <p className="text-sm text-ekam-muted">No {tab} yet — be the first to earn a spot on the leaderboard.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {rows.map((row, i) => (
                <div key={row.id} className="card-base p-4 flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: i < 3 ? 'rgba(184,70,15,0.12)' : 'rgba(140,98,16,0.06)', color: i < 3 ? '#B8460F' : '#7A6550' }}>
                    {i + 1}
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                    {row.name?.charAt(0) || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: '#1C0E04' }}>{row.name}</p>
                  </div>
                  {tab === 'students' ? (
                    <div className="flex items-center gap-4 text-xs text-ekam-muted flex-shrink-0">
                      <span className="flex items-center gap-1"><Zap size={12} className="text-ekam-gold" /> Level {row.level}</span>
                      <span className="flex items-center gap-1"><Award size={12} className="text-ekam-gold" /> {row.badgeCount} badges</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4 text-xs text-ekam-muted flex-shrink-0">
                      <span className="flex items-center gap-1"><Users size={12} className="text-ekam-gold" /> +{row.weekly} this week</span>
                      <span>{row.total} total students</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

// XP, levels, and badge-tier helpers. Tunable constants live here so the
// numbers can be retuned in one place later.

export const XP_LESSON_VIDEO = 10
export const XP_LESSON_TEST = 20
export const XP_COURSE_COMPLETE = 50

// Level 1 = 100 XP, Level 2 = 300, Level 3 = 500 ... constant +200/level.
export function levelThreshold(n) {
  return 200 * n - 100
}

export function getLevelForXP(xp) {
  let level = 0
  while (xp >= levelThreshold(level + 1)) level++
  return level
}

export function getLevelProgress(xp) {
  const level = getLevelForXP(xp)
  const currentThreshold = level === 0 ? 0 : levelThreshold(level)
  const nextThreshold = levelThreshold(level + 1)
  const pct = Math.min(100, Math.round(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100))
  return { level, xp, currentThreshold, nextThreshold, pct }
}

const TIER_ORDER = ['Beginner', 'Intermediate', 'Advanced']

export function getLevelTier(courseLevel) {
  const l = (courseLevel || '').toLowerCase()
  if (l.includes('advanced')) return 'Advanced'
  if (l.includes('intermediate')) return 'Intermediate'
  return 'Beginner'
}

export function tierRank(tier) {
  return TIER_ORDER.indexOf(tier) + 1
}

// ---- localStorage-backed XP / badges ----

export function getXP(userId) {
  if (typeof window === 'undefined' || !userId) return 0
  try {
    return JSON.parse(localStorage.getItem(`ekam_xp_${userId}`) || '{"total":0}').total || 0
  } catch {
    return 0
  }
}

export function addXP(userId, amount) {
  if (typeof window === 'undefined' || !userId) return
  const total = getXP(userId) + amount
  localStorage.setItem(`ekam_xp_${userId}`, JSON.stringify({ total }))
  return total
}

export function getBadges(userId) {
  if (typeof window === 'undefined' || !userId) return []
  try {
    return JSON.parse(localStorage.getItem(`ekam_badges_${userId}`) || '[]')
  } catch {
    return []
  }
}

export function hasBadgeForCourse(userId, courseId) {
  return getBadges(userId).some(b => b.courseId === courseId)
}

export function awardBadge(userId, { courseId, courseTitle, tier }) {
  if (typeof window === 'undefined' || !userId) return
  if (hasBadgeForCourse(userId, courseId)) return
  const badges = getBadges(userId)
  badges.unshift({
    id: 'badge-' + Date.now(),
    courseId,
    courseTitle,
    tier,
    earnedAt: new Date().toISOString(),
  })
  localStorage.setItem(`ekam_badges_${userId}`, JSON.stringify(badges))
}

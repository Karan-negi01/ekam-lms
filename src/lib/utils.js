export function formatPrice(price) {
  if (price === 0) return 'Free'
  return `₹${price.toLocaleString('en-IN')}`
}

export function formatNumber(num) {
  if (num >= 10000) return `${(num / 1000).toFixed(0)}k+`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
  return num.toLocaleString('en-IN')
}

export function getDiscount(original, current) {
  return Math.round(((original - current) / original) * 100)
}

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function truncate(str, n) {
  return str.length > n ? str.slice(0, n) + '...' : str
}

export function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

export function getInitials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function formatDuration(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `${m}m`
  if (m === 0) return `${h}h`
  return `${h}h ${m}m`
}

export function getRatingLabel(rating) {
  if (rating >= 4.8) return 'Exceptional'
  if (rating >= 4.5) return 'Highly Rated'
  if (rating >= 4.0) return 'Well Rated'
  return 'Good'
}

// Reads every instructor's locally-saved courses and returns only the ones
// an admin has approved (status === 'published'), so they can be shown
// alongside the static catalog on the homepage / courses pages.
export function getPublishedUserCourses() {
  if (typeof window === 'undefined') return []
  const result = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('ekam_courses_')) {
      try {
        const stored = JSON.parse(localStorage.getItem(key) || '[]')
        result.push(...stored.filter(c => c.status === 'published'))
      } catch {}
    }
  }
  return result
}

// Simple per-user notification inbox, stored in localStorage so instructors
// find out when admin has reviewed their course (e.g. the commission rate
// that was set) without needing a backend/email to deliver the message.
export function getNotifications(userId) {
  if (typeof window === 'undefined' || !userId) return []
  try {
    return JSON.parse(localStorage.getItem(`ekam_notifications_${userId}`) || '[]')
  } catch {
    return []
  }
}

export function pushNotification(userId, notification) {
  if (typeof window === 'undefined' || !userId) return
  const list = getNotifications(userId)
  list.unshift({
    id: 'n-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7),
    read: false,
    createdAt: new Date().toISOString(),
    ...notification,
  })
  localStorage.setItem(`ekam_notifications_${userId}`, JSON.stringify(list))
}

export function markNotificationsRead(userId) {
  if (typeof window === 'undefined' || !userId) return
  const list = getNotifications(userId).map(n => ({ ...n, read: true }))
  localStorage.setItem(`ekam_notifications_${userId}`, JSON.stringify(list))
}

// Fake "accounts table" so the same email always resolves to the same user id
// and role across logins (there's no backend, so without this every fresh
// login minted a new id and the instructor's own courses/notifications/
// commission — all stored under their id — became unreachable).
export function findUserByEmail(email) {
  if (typeof window === 'undefined' || !email) return null
  try {
    const dir = JSON.parse(localStorage.getItem('ekam_users') || '{}')
    return dir[email.toLowerCase()] || null
  } catch {
    return null
  }
}

export function saveUserToDirectory(user) {
  if (typeof window === 'undefined' || !user?.email) return
  try {
    const dir = JSON.parse(localStorage.getItem('ekam_users') || '{}')
    dir[user.email.toLowerCase()] = { id: user.id, name: user.name, role: user.role }
    localStorage.setItem('ekam_users', JSON.stringify(dir))
  } catch {}
}

export function getAllUsers() {
  if (typeof window === 'undefined') return []
  try {
    const dir = JSON.parse(localStorage.getItem('ekam_users') || '{}')
    return Object.values(dir)
  } catch {
    return []
  }
}

// Per-course purchases and platform-wide subscription, namespaced by user id
// so demo accounts sharing one browser don't bleed into each other's access.
export function hasPurchased(userId, courseId) {
  if (typeof window === 'undefined' || !userId) return false
  try {
    const list = JSON.parse(localStorage.getItem(`ekam_purchases_${userId}`) || '[]')
    return list.some(p => p.courseId === courseId)
  } catch {
    return false
  }
}

export function purchaseCourse(userId, courseId) {
  if (typeof window === 'undefined' || !userId) return
  const list = JSON.parse(localStorage.getItem(`ekam_purchases_${userId}`) || '[]')
  if (!list.some(p => p.courseId === courseId)) {
    list.push({ courseId, purchasedAt: new Date().toISOString() })
    localStorage.setItem(`ekam_purchases_${userId}`, JSON.stringify(list))
  }
}

export function getSubscription(userId) {
  if (typeof window === 'undefined' || !userId) return { active: false }
  try {
    return JSON.parse(localStorage.getItem(`ekam_subscription_${userId}`) || '{"active":false}')
  } catch {
    return { active: false }
  }
}

export function subscribe(userId) {
  if (typeof window === 'undefined' || !userId) return
  localStorage.setItem(`ekam_subscription_${userId}`, JSON.stringify({ active: true, startedAt: new Date().toISOString() }))
}

export function hasCourseAccess(userId, course) {
  if (!userId || !course) return false
  if (course.pricingModel === 'subscription') return getSubscription(userId).active
  return hasPurchased(userId, course.id)
}

// Per-user, per-course lesson progress. A lesson is appended only once its
// test is passed 100% — this replaces the old global (non-namespaced)
// ekam_progress_${courseId} key so demo accounts don't share progress.
export function getLessonProgress(userId, courseId) {
  if (typeof window === 'undefined' || !userId || !courseId) return []
  try {
    return JSON.parse(localStorage.getItem(`ekam_progress_${userId}_${courseId}`) || '[]')
  } catch {
    return []
  }
}

export function markLessonComplete(userId, courseId, lessonId) {
  if (typeof window === 'undefined' || !userId || !courseId) return
  const list = getLessonProgress(userId, courseId)
  if (!list.some(p => p.lessonId === lessonId)) {
    list.push({ lessonId, completedAt: new Date().toISOString() })
    localStorage.setItem(`ekam_progress_${userId}_${courseId}`, JSON.stringify(list))
  }
  return list
}

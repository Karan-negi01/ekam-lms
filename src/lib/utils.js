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

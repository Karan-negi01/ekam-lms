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

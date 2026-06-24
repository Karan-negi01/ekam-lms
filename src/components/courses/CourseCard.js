import Link from 'next/link'
import { Star, Clock, Users, BookOpen, BadgeCheck } from 'lucide-react'
import { formatPrice, formatNumber, getDiscount } from '@/lib/utils'

const gradients = {
  'from-amber-900 via-red-900 to-amber-800': 'linear-gradient(135deg, #451a03, #450a0a, #451a03)',
  'from-red-900 via-rose-900 to-pink-900': 'linear-gradient(135deg, #450a0a, #4c0519, #500724)',
  'from-green-900 via-emerald-900 to-teal-900': 'linear-gradient(135deg, #14532d, #064e3b, #134e4a)',
  'from-orange-900 via-amber-900 to-yellow-900': 'linear-gradient(135deg, #431407, #451a03, #422006)',
  'from-purple-900 via-violet-900 to-indigo-900': 'linear-gradient(135deg, #3b0764, #4c1d95, #312e81)',
  'from-pink-900 via-rose-900 to-red-900': 'linear-gradient(135deg, #500724, #4c0519, #450a0a)',
  'from-red-900 via-orange-900 to-amber-900': 'linear-gradient(135deg, #450a0a, #431407, #451a03)',
  'from-yellow-900 via-amber-900 to-orange-900': 'linear-gradient(135deg, #422006, #451a03, #431407)',
}

export default function CourseCard({ course, compact = false }) {
  const discount = getDiscount(course.originalPrice, course.price)
  const grad = gradients[course.thumbnailGradient] || 'linear-gradient(135deg, #1C1510, #2E2215)'

  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <div className="card-base overflow-hidden h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0" style={{ background: grad }} />

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(212,168,67,0.3) 0%, transparent 60%),
                                radial-gradient(circle at 70% 70%, rgba(232,98,42,0.3) 0%, transparent 60%)`,
            }}
          />

          {/* Emoji icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl opacity-60 group-hover:scale-110 transition-transform duration-500 group-hover:opacity-80">
              {course.thumbnailEmoji}
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {course.bestseller && (
              <span className="badge badge-gold text-[10px] font-semibold tracking-wider">⚡ BESTSELLER</span>
            )}
            {course.featured && !course.bestseller && (
              <span className="badge badge-saffron text-[10px]">✦ FEATURED</span>
            )}
          </div>

          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="badge badge-green text-[10px] font-semibold">{discount}% OFF</span>
            </div>
          )}

          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-ekam-gold/90 flex items-center justify-center shadow-gold-strong">
              <div className="w-0 h-0 border-l-[14px] border-l-ekam-bg border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent ml-1" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] tracking-widest uppercase text-ekam-gold font-medium">
              {course.categoryLabel}
            </span>
            <span className="text-ekam-border">•</span>
            <span className="text-[10px] text-ekam-muted">{course.level}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base text-ekam-cream leading-snug mb-2 group-hover:text-ekam-gold transition-colors duration-200 line-clamp-2">
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-ekam-bg flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
              {course.instructor?.initials?.charAt(0) || 'I'}
            </div>
            <span className="text-xs text-ekam-muted truncate">
              {course.instructor?.name}
            </span>
            {course.instructor?.verified && (
              <BadgeCheck size={12} className="text-ekam-gold flex-shrink-0" />
            )}
          </div>

          {/* Rating & stats */}
          <div className="flex items-center gap-3 mb-3 text-xs">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-ekam-gold text-ekam-gold" />
              <span className="font-semibold text-ekam-gold">{course.rating}</span>
              <span className="text-ekam-muted">({formatNumber(course.reviewCount)})</span>
            </div>
            <span className="text-ekam-border">|</span>
            <div className="flex items-center gap-1 text-ekam-muted">
              <Users size={11} />
              <span>{formatNumber(course.studentCount)}</span>
            </div>
            {!compact && (
              <>
                <span className="text-ekam-border">|</span>
                <div className="flex items-center gap-1 text-ekam-muted">
                  <Clock size={11} />
                  <span>{course.duration}</span>
                </div>
              </>
            )}
          </div>

          {!compact && (
            <div className="flex items-center gap-1 text-xs text-ekam-muted mb-3">
              <BookOpen size={11} />
              <span>{course.totalLessons} lessons</span>
              <span className="text-ekam-border mx-1">•</span>
              <span>{course.language}</span>
            </div>
          )}

          {/* Price */}
          <div className="mt-auto pt-3 border-t border-ekam-border flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-ekam-gold">{formatPrice(course.price)}</span>
              {course.originalPrice > course.price && (
                <span className="text-sm text-ekam-muted line-through">{formatPrice(course.originalPrice)}</span>
              )}
            </div>
            <div className="w-8 h-8 rounded-lg bg-ekam-gold/10 group-hover:bg-ekam-gold group-hover:text-ekam-bg text-ekam-gold flex items-center justify-center transition-all duration-300">
              <div className="w-0 h-0 border-l-[8px] border-l-current border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

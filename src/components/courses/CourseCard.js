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
  const grad = gradients[course.thumbnailGradient] || 'linear-gradient(135deg, #3b1f0a, #451a03)'

  return (
    <Link href={`/courses/${course.id}`} className="group block">
      <div className="card-base overflow-hidden h-full flex flex-col">
        {/* Thumbnail */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0" style={{ background: grad }} />
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(212,168,67,0.4) 0%, transparent 60%),
                                radial-gradient(circle at 70% 70%, rgba(232,98,42,0.4) 0%, transparent 60%)`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-5xl opacity-70 group-hover:scale-110 transition-transform duration-500 group-hover:opacity-90">
              {course.thumbnailEmoji}
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            {course.bestseller && (
              <span className="badge badge-gold text-[10px] font-semibold tracking-wider bg-white/90">⚡ BESTSELLER</span>
            )}
            {course.featured && !course.bestseller && (
              <span className="badge badge-saffron text-[10px] bg-white/90">✦ FEATURED</span>
            )}
          </div>

          {discount > 0 && (
            <div className="absolute top-3 right-3">
              <span className="badge badge-green text-[10px] font-semibold bg-white/90">{discount}% OFF</span>
            </div>
          )}

          {/* Play hover overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.35)' }}>
            <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
              <div className="w-0 h-0 border-l-[14px] border-t-[9px] border-b-[9px] ml-1"
                style={{ borderLeftColor: '#8C6210', borderTopColor: 'transparent', borderBottomColor: 'transparent' }} />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Category + level */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] tracking-widest uppercase text-ekam-gold font-medium">{course.categoryLabel}</span>
            <span style={{ color: '#E2D5C4' }}>•</span>
            <span className="text-[10px]" style={{ color: '#7A6550' }}>{course.level}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base leading-snug mb-2 group-hover:text-ekam-gold transition-colors duration-200 line-clamp-2"
            style={{ color: '#1C0E04' }}>
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
              {course.instructor?.initials?.charAt(0) || 'I'}
            </div>
            <span className="text-xs truncate" style={{ color: '#7A6550' }}>{course.instructor?.name}</span>
            {course.instructor?.verified && <BadgeCheck size={12} className="text-ekam-gold flex-shrink-0" />}
          </div>

          {/* Rating & stats */}
          <div className="flex items-center gap-3 mb-3 text-xs">
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-ekam-gold text-ekam-gold" />
              <span className="font-semibold text-ekam-gold">{course.rating}</span>
              <span style={{ color: '#7A6550' }}>({formatNumber(course.reviewCount)})</span>
            </div>
            <span style={{ color: '#E2D5C4' }}>|</span>
            <div className="flex items-center gap-1" style={{ color: '#7A6550' }}>
              <Users size={11} />
              <span>{formatNumber(course.studentCount)}</span>
            </div>
            {!compact && (
              <>
                <span style={{ color: '#E2D5C4' }}>|</span>
                <div className="flex items-center gap-1" style={{ color: '#7A6550' }}>
                  <Clock size={11} />
                  <span>{course.duration}</span>
                </div>
              </>
            )}
          </div>

          {!compact && (
            <div className="flex items-center gap-1 text-xs mb-3" style={{ color: '#7A6550' }}>
              <BookOpen size={11} />
              <span>{course.totalLessons} lessons</span>
              <span style={{ color: '#E2D5C4' }} className="mx-1">•</span>
              <span>{course.language}</span>
            </div>
          )}

          {/* Price */}
          <div className="mt-auto pt-3 flex items-center justify-between" style={{ borderTop: '1px solid #EDE4D8' }}>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-ekam-gold">{formatPrice(course.price)}</span>
              {course.originalPrice > course.price && (
                <span className="text-sm line-through" style={{ color: '#B0A090' }}>{formatPrice(course.originalPrice)}</span>
              )}
            </div>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:bg-ekam-gold"
              style={{ background: 'rgba(140,98,16,0.08)' }}>
              <div className="w-0 h-0 border-l-[8px] border-t-[5px] border-b-[5px] ml-0.5"
                style={{ borderLeftColor: '#8C6210', borderTopColor: 'transparent', borderBottomColor: 'transparent' }} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

import Link from 'next/link'
import { Star, Clock, Users, BookOpen, BadgeCheck, Play } from 'lucide-react'
import { formatPrice, formatNumber, getDiscount } from '@/lib/utils'
import CategoryIcon from '@/components/icons/CategoryIcon'

const thumbGrads = {
  'from-amber-900 via-red-900 to-amber-800': 'linear-gradient(135deg, #451a03 0%, #450a0a 60%, #3b1203 100%)',
  'from-red-900 via-rose-900 to-pink-900':   'linear-gradient(135deg, #450a0a 0%, #4c0519 60%, #500724 100%)',
  'from-green-900 via-emerald-900 to-teal-900':'linear-gradient(135deg, #14532d 0%, #064e3b 60%, #134e4a 100%)',
  'from-orange-900 via-amber-900 to-yellow-900':'linear-gradient(135deg, #431407 0%, #451a03 60%, #422006 100%)',
  'from-purple-900 via-violet-900 to-indigo-900':'linear-gradient(135deg, #3b0764 0%, #4c1d95 60%, #312e81 100%)',
  'from-pink-900 via-rose-900 to-red-900':   'linear-gradient(135deg, #500724 0%, #4c0519 60%, #450a0a 100%)',
  'from-red-900 via-orange-900 to-amber-900':'linear-gradient(135deg, #450a0a 0%, #431407 60%, #451a03 100%)',
  'from-yellow-900 via-amber-900 to-orange-900':'linear-gradient(135deg, #422006 0%, #451a03 60%, #431407 100%)',
}

export default function CourseCard({ course, compact = false }) {
  const discount = getDiscount(course.originalPrice, course.price)
  const grad = thumbGrads[course.thumbnailGradient] || 'linear-gradient(135deg, #2E1A0A, #3B1203)'

  return (
    <Link href={`/courses/${course.id}`} className="group block h-full">
      <div className="card-base overflow-hidden h-full flex flex-col">

        {/* ── Thumbnail ── */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0" style={{ background: grad }} />

          {/* Radial highlight */}
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(ellipse at 30% 35%, rgba(212,168,67,0.22) 0%, transparent 60%)' }} />

          {/* Motif */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <CategoryIcon id={course.category} size={150} className="absolute text-white opacity-[0.07] rotate-6 scale-110" />
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
              style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)' }}>
              <CategoryIcon id={course.category} size={28} className="text-white" />
            </div>
          </div>

          {/* Play button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            style={{ background: 'rgba(0,0,0,0.28)' }}>
            <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play size={16} fill="#8C6210" className="text-ekam-gold ml-0.5" />
            </div>
          </div>

          {/* Badges row */}
          <div className="absolute top-2.5 left-2.5 flex gap-1.5">
            {course.bestseller && (
              <span className="badge badge-gold bg-white/95 text-[10px] shadow-sm">⚡ Bestseller</span>
            )}
            {course.featured && !course.bestseller && (
              <span className="badge badge-saffron bg-white/95 text-[10px] shadow-sm">✦ Featured</span>
            )}
          </div>

          {discount > 0 && (
            <div className="absolute top-2.5 right-2.5">
              <span className="badge badge-green bg-white/95 text-[10px] font-bold shadow-sm">{discount}% OFF</span>
            </div>
          )}

          {/* Category label strip at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-8 flex items-center px-3"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}>
            <span className="text-[9px] tracking-widest uppercase font-bold text-white/80">{course.categoryLabel}</span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-4 flex-1 flex flex-col">

          {/* Title */}
          <h3 className="font-serif font-semibold text-[15px] leading-snug mb-2 line-clamp-2 transition-colors duration-200 group-hover:text-ekam-gold"
            style={{ color: '#1C0E04' }}>
            {course.title}
          </h3>

          {/* Instructor */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-lg flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
              {course.instructor?.initials?.charAt(0) || 'I'}
            </div>
            <span className="text-xs truncate" style={{ color: '#7A6550' }}>
              {course.instructor?.name}
            </span>
            {course.instructor?.verified && (
              <BadgeCheck size={13} className="flex-shrink-0" style={{ color: '#8C6210' }} />
            )}
          </div>

          {/* Rating + students */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Star size={12} fill="#F59E0B" className="text-amber-500" />
              <span className="text-xs font-bold text-amber-600">{course.rating}</span>
              <span className="text-xs" style={{ color: '#B0A090' }}>({formatNumber(course.reviewCount)})</span>
            </div>
            <div className="flex items-center gap-1 text-xs" style={{ color: '#B0A090' }}>
              <Users size={11} />
              <span>{formatNumber(course.studentCount)}</span>
            </div>
            {!compact && (
              <div className="flex items-center gap-1 text-xs" style={{ color: '#B0A090' }}>
                <Clock size={11} />
                <span>{course.duration}</span>
              </div>
            )}
          </div>

          {!compact && (
            <div className="flex items-center gap-1.5 text-xs mb-3" style={{ color: '#B0A090' }}>
              <BookOpen size={11} />
              <span>{course.totalLessons} lessons · {course.language}</span>
            </div>
          )}

          {/* Price row */}
          <div className="mt-auto pt-3 flex items-center justify-between"
            style={{ borderTop: '1px solid #F0E8DC' }}>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-bold" style={{ color: '#8C6210' }}>{formatPrice(course.price)}</span>
              {course.originalPrice > course.price && (
                <span className="text-xs line-through" style={{ color: '#C4B09A' }}>{formatPrice(course.originalPrice)}</span>
              )}
            </div>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ background: 'rgba(140,98,16,0.08)' }}>
              <Play size={12} fill="#8C6210" className="text-ekam-gold ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

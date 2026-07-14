import Link from 'next/link'
import { Star, Play } from 'lucide-react'
import { formatPrice, formatNumber, getDiscount } from '@/lib/utils'
import CategoryIcon from '@/components/icons/CategoryIcon'

const thumbGrads = {
  'from-amber-900 via-red-900 to-amber-800': 'linear-gradient(135deg, #452007 0%, #5C2E0A 60%, #341704 100%)',
  'from-red-900 via-rose-900 to-pink-900':   'linear-gradient(135deg, #4A1F0D 0%, #6B3212 60%, #38150A 100%)',
  'from-green-900 via-emerald-900 to-teal-900':'linear-gradient(135deg, #3D2408 0%, #55350C 60%, #2C1804 100%)',
  'from-orange-900 via-amber-900 to-yellow-900':'linear-gradient(135deg, #4E2A05 0%, #6B3D0C 60%, #391F03 100%)',
  'from-purple-900 via-violet-900 to-indigo-900':'linear-gradient(135deg, #43200A 0%, #5E2F10 60%, #301707 100%)',
  'from-pink-900 via-rose-900 to-red-900':   'linear-gradient(135deg, #4A1C06 0%, #632808 60%, #341303 100%)',
  'from-red-900 via-orange-900 to-amber-900':'linear-gradient(135deg, #3F2308 0%, #58330D 60%, #2E1805 100%)',
  'from-yellow-900 via-amber-900 to-orange-900':'linear-gradient(135deg, #4C2E08 0%, #6B420E 60%, #351F04 100%)',
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
          {course.featured && !course.bestseller && (
            <div className="absolute top-2.5 left-2.5">
              <span className="badge badge-saffron bg-white/95 text-[10px] shadow-sm">✦ Featured</span>
            </div>
          )}

          {discount > 0 && (
            <div className="absolute top-2.5 right-2.5">
              <span className="badge badge-gold bg-white/95 text-[10px] font-bold shadow-sm">{discount}% OFF</span>
            </div>
          )}

          {/* Category label strip at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-8 flex items-center px-3"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55), transparent)' }}>
            <span className="text-[9px] tracking-widest uppercase font-bold text-white/80">{course.categoryLabel}</span>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-3 flex-1 flex flex-col">

          {/* Title */}
          <h3 className="font-bold text-sm leading-snug mb-1 line-clamp-2 transition-colors duration-200 group-hover:text-ekam-gold"
            style={{ color: '#1C0E04' }}>
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-xs truncate mb-1.5" style={{ color: '#6B5D4D' }}>
            {course.instructor?.name}
          </p>

          {/* Rating row — bestseller + stars + count, one line, Udemy-style */}
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            {course.bestseller && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                style={{ background: '#FCEADC', color: '#B8460F' }}>Bestseller</span>
            )}
            <span className="text-xs font-bold" style={{ color: '#B4690A' }}>{course.rating}</span>
            <div className="flex items-center gap-0.5">
              {[0,1,2,3,4].map(i => (
                <Star key={i} size={11} fill="#E5A729" strokeWidth={0} />
              ))}
            </div>
            <span className="text-xs" style={{ color: '#7A6550' }}>({formatNumber(course.reviewCount)})</span>
          </div>

          {!compact && (
            <p className="text-[11px] mb-1.5" style={{ color: '#7A6550' }}>
              {course.duration} · {course.totalLessons} lessons · {course.language}
            </p>
          )}

          {/* Price row */}
          <div className="mt-auto pt-1.5 flex items-center gap-2">
            <span className="text-sm font-extrabold" style={{ color: '#1C0E04' }}>{formatPrice(course.price)}</span>
            {course.originalPrice > course.price && (
              <span className="text-xs line-through" style={{ color: '#B0A090' }}>{formatPrice(course.originalPrice)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

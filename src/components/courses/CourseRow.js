'use client'

import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CourseCard from './CourseCard'

export default function CourseRow({ courses }) {
  const scrollerRef = useRef(null)

  const scroll = (dir) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.9), behavior: 'smooth' })
  }

  return (
    <div className="relative group/row">
      <div ref={scrollerRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ scrollSnapType: 'x mandatory' }}>
        {courses.map(course => (
          <div key={course.id} className="flex-shrink-0 w-[270px] sm:w-[280px]" style={{ scrollSnapAlign: 'start' }}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>

      <button onClick={() => scroll(-1)}
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center bg-white opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
        style={{ border: '1px solid #EAE4D8', boxShadow: '0 4px 16px rgba(20,20,20,0.12)' }}
        aria-label="Scroll left">
        <ChevronLeft size={18} style={{ color: '#171310' }} />
      </button>
      <button onClick={() => scroll(1)}
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center bg-white opacity-0 group-hover/row:opacity-100 transition-opacity duration-200"
        style={{ border: '1px solid #EAE4D8', boxShadow: '0 4px 16px rgba(20,20,20,0.12)' }}
        aria-label="Scroll right">
        <ChevronRight size={18} style={{ color: '#171310' }} />
      </button>
    </div>
  )
}

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Star, CheckCircle2, ChevronRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CategoryIcon from '@/components/icons/CategoryIcon'
import { instructors, categories } from '@/lib/data'
import { formatNumber } from '@/lib/utils'

export default function InstructorsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    let result = [...instructors]
    if (category !== 'all') result = result.filter(i => i.category === category)
    if (query) {
      const q = query.toLowerCase()
      result = result.filter(i => i.name.toLowerCase().includes(q) || i.title.toLowerCase().includes(q))
    }
    return result.sort((a, b) => b.students - a.students)
  }, [query, category])

  return (
    <div style={{ background: '#FDFAF4' }}>
      <PageHero
        label="Maestros"
        title="Meet the Masters of Ekam"
        subtitle="320+ verified instructors carrying forward eight living traditions — each trained under a recognized guru or institution."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Search + filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1 rounded-xl overflow-hidden bg-white" style={{ border: '1.5px solid #E2D5C4' }}>
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ekam-muted" />
            <input type="text" placeholder="Search instructors by name or specialty..."
              value={query} onChange={e => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-transparent text-sm outline-none" style={{ color: '#1C0E04' }} />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-10">
          <button onClick={() => setCategory('all')}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all"
            style={{ background: category === 'all' ? '#8C6210' : 'white', border: '1.5px solid ' + (category === 'all' ? '#8C6210' : '#E2D5C4'), color: category === 'all' ? '#fff' : '#7A6550' }}>
            All Traditions
          </button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setCategory(cat.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{ background: category === cat.id ? '#8C6210' : 'white', border: '1.5px solid ' + (category === cat.id ? '#8C6210' : '#E2D5C4'), color: category === cat.id ? '#fff' : '#7A6550' }}>
              <CategoryIcon id={cat.id} size={13} />
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-ekam-muted mb-5">
          Showing <span className="font-medium" style={{ color: '#1C0E04' }}>{filtered.length}</span> instructors
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(inst => (
              <div key={inst.id} className="card-base p-6 group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #C4881A 0%, #C44015 100%)' }}>
                      {inst.initials}
                    </div>
                    {inst.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                        <CheckCircle2 size={13} style={{ color: '#8C6210' }} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-semibold text-base leading-tight mb-0.5" style={{ color: '#1C0E04' }}>{inst.name}</h3>
                    <p className="text-xs font-medium mb-2" style={{ color: '#8C6210' }}>{inst.title}</p>
                    <div className="flex items-center gap-3 text-xs" style={{ color: '#7A6550' }}>
                      <span className="flex items-center gap-1"><Star size={11} className="fill-amber-500 text-amber-500" />{inst.rating}</span>
                      <span>·</span>
                      <span>{formatNumber(inst.students)} students</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs leading-relaxed line-clamp-3 mb-4" style={{ color: '#7A6550' }}>{inst.bio}</p>
                <Link href={`/courses?instructor=${inst.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-ekam-gold hover:text-ekam-gold-light transition-colors duration-200 group-hover:gap-2">
                  View {inst.courses} Courses <ChevronRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(140,98,16,0.08)' }}>
              <Search size={24} className="text-ekam-gold" />
            </div>
            <h3 className="font-serif text-xl mb-2" style={{ color: '#1C0E04' }}>No instructors found</h3>
            <p style={{ color: '#7A6550' }}>Try a different search or tradition.</p>
          </div>
        )}
      </div>
    </div>
  )
}

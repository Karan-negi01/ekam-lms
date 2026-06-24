'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, List } from 'lucide-react'
import CourseCard from '@/components/courses/CourseCard'
import { courses, categories } from '@/lib/data'
import { formatNumber } from '@/lib/utils'

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced', 'Beginner to Intermediate', 'Beginner to Advanced']
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
]

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('All Levels')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [priceFilter, setPriceFilter] = useState('all')

  const filtered = useMemo(() => {
    let result = [...courses]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.instructor?.name?.toLowerCase().includes(q) ||
        c.tags?.some(t => t.toLowerCase().includes(q)) ||
        c.categoryLabel?.toLowerCase().includes(q)
      )
    }

    if (selectedCategory !== 'all') {
      result = result.filter(c => c.category === selectedCategory)
    }

    if (selectedLevel !== 'All Levels') {
      result = result.filter(c => c.level?.includes(selectedLevel))
    }

    if (priceFilter === 'free') result = result.filter(c => c.price === 0)
    if (priceFilter === 'paid') result = result.filter(c => c.price > 0)

    switch (sortBy) {
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'newest': result.sort((a, b) => b.id.localeCompare(a.id)); break
      case 'price-low': result.sort((a, b) => a.price - b.price); break
      case 'price-high': result.sort((a, b) => b.price - a.price); break
      default: result.sort((a, b) => b.studentCount - a.studentCount)
    }

    return result
  }, [searchQuery, selectedCategory, selectedLevel, sortBy, priceFilter])

  const activeFiltersCount = [
    selectedCategory !== 'all',
    selectedLevel !== 'All Levels',
    priceFilter !== 'all',
  ].filter(Boolean).length

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedLevel('All Levels')
    setPriceFilter('all')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: '#080604' }}>
      {/* Header */}
      <div style={{ background: '#0A0805', borderBottom: '1px solid #1C1510' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-px h-4 bg-ekam-gold" />
              <span className="text-xs tracking-widest text-ekam-gold uppercase font-medium">All Courses</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-ekam-cream font-semibold mb-3">
              Explore Our Courses
            </h1>
            <p className="text-ekam-muted">
              {formatNumber(courses.length)}+ courses taught by India&apos;s finest masters
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search + Sort bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 search-glow rounded-xl overflow-hidden"
            style={{ background: '#1C1510', border: '1px solid #2E2215' }}>
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ekam-muted" />
            <input
              type="text"
              placeholder="Search courses, instructors, topics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-transparent text-sm text-ekam-cream placeholder:text-ekam-muted outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-ekam-muted hover:text-ekam-cream">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 rounded-xl text-sm outline-none cursor-pointer"
              style={{ background: '#1C1510', border: '1px solid #2E2215', color: '#C4B49A' }}
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-ekam-muted pointer-events-none" />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              filtersOpen || activeFiltersCount > 0
                ? 'text-ekam-gold bg-ekam-gold/10 border-ekam-gold/30'
                : 'text-ekam-cream-dim'
            }`}
            style={{ border: '1px solid', borderColor: filtersOpen || activeFiltersCount > 0 ? 'rgba(212,168,67,0.3)' : '#2E2215' }}
          >
            <SlidersHorizontal size={15} />
            Filters
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-ekam-gold text-ekam-bg text-xs font-bold flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* View toggle */}
          <div className="flex rounded-xl overflow-hidden" style={{ border: '1px solid #2E2215' }}>
            {[['grid', Grid3X3], ['list', List]].map(([mode, Icon]) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-2.5 transition-all ${
                  viewMode === mode
                    ? 'bg-ekam-gold/15 text-ekam-gold'
                    : 'text-ekam-muted hover:text-ekam-cream'
                }`}
                style={{ background: viewMode === mode ? 'rgba(212,168,67,0.12)' : 'transparent' }}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* Filters panel */}
        {filtersOpen && (
          <div className="rounded-xl p-5 mb-6 animate-scaleIn"
            style={{ background: '#1C1510', border: '1px solid #2E2215' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category */}
              <div>
                <p className="text-xs tracking-widest text-ekam-gold uppercase font-medium mb-3">Art Form</p>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      selectedCategory === 'all' ? 'text-ekam-gold bg-ekam-gold/10' : 'text-ekam-cream-dim hover:text-ekam-cream hover:bg-white/5'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                        selectedCategory === cat.id ? 'text-ekam-gold bg-ekam-gold/10' : 'text-ekam-cream-dim hover:text-ekam-cream hover:bg-white/5'
                      }`}
                    >
                      <span>{cat.icon} {cat.label}</span>
                      <span className="text-xs text-ekam-muted">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div>
                <p className="text-xs tracking-widest text-ekam-gold uppercase font-medium mb-3">Level</p>
                <div className="space-y-1.5">
                  {levels.map(level => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedLevel === level ? 'text-ekam-gold bg-ekam-gold/10' : 'text-ekam-cream-dim hover:text-ekam-cream hover:bg-white/5'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <p className="text-xs tracking-widest text-ekam-gold uppercase font-medium mb-3">Price</p>
                <div className="space-y-1.5">
                  {[['all', 'All Prices'], ['free', 'Free Courses'], ['paid', 'Paid Courses']].map(([value, label]) => (
                    <button
                      key={value}
                      onClick={() => setPriceFilter(value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        priceFilter === value ? 'text-ekam-gold bg-ekam-gold/10' : 'text-ekam-cream-dim hover:text-ekam-cream hover:bg-white/5'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <div className="mt-4 pt-4 border-t border-ekam-border flex justify-end">
                <button onClick={clearFilters} className="text-xs text-ekam-saffron hover:text-ekam-saffron-light flex items-center gap-1 transition-colors">
                  <X size={12} /> Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-ekam-gold text-ekam-bg'
                : 'text-ekam-cream-dim border border-ekam-border hover:border-ekam-gold/40 hover:text-ekam-cream'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-ekam-gold text-ekam-bg'
                  : 'text-ekam-cream-dim border border-ekam-border hover:border-ekam-gold/40 hover:text-ekam-cream'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-ekam-muted">
            Showing <span className="text-ekam-cream font-medium">{filtered.length}</span> courses
            {selectedCategory !== 'all' && (
              <> in <span className="text-ekam-gold">{categories.find(c => c.id === selectedCategory)?.label}</span></>
            )}
          </p>
          {activeFiltersCount > 0 && (
            <button onClick={clearFilters} className="text-xs text-ekam-saffron hover:text-ekam-saffron-light transition-colors">
              Clear filters
            </button>
          )}
        </div>

        {/* Course Grid */}
        {filtered.length > 0 ? (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
            : 'flex flex-col gap-4'
          }>
            {filtered.map(course => (
              <CourseCard key={course.id} course={course} compact={viewMode === 'list'} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-serif text-xl text-ekam-cream mb-2">No courses found</h3>
            <p className="text-ekam-muted mb-6">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="btn-outline">Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  )
}

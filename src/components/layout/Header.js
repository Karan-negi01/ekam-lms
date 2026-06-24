'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, ChevronDown, BookOpen, LayoutDashboard, Shield, LogOut, User, Bell } from 'lucide-react'

const navLinks = [
  { label: 'Courses', href: '/courses' },
  { label: 'Categories', href: '/courses?view=categories' },
  { label: 'Instructors', href: '/instructors' },
  { label: 'About Ekam', href: '/about' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [user, setUser] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('ekam_user')
    if (stored) setUser(JSON.parse(stored))
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
    setUserMenuOpen(false)
  }, [pathname])

  const handleLogout = () => {
    localStorage.removeItem('ekam_user')
    setUser(null)
    setUserMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ekam-bg/95 backdrop-blur-md border-b border-ekam-border shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
                <span className="text-ekam-bg font-display font-bold text-lg leading-none">ए</span>
              </div>
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: '0 0 20px rgba(212,168,67,0.4)' }}/>
            </div>
            <div>
              <span className="font-display text-xl font-semibold tracking-widest text-ekam-cream">EKAM</span>
              <p className="text-[10px] tracking-[0.2em] text-ekam-gold opacity-80 leading-none">एकम्</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-ekam-gold bg-ekam-gold/10'
                    : 'text-ekam-cream-dim hover:text-ekam-cream hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-ekam-muted hover:text-ekam-gold hover:bg-ekam-gold/10 transition-all duration-200"
            >
              <Search size={18} />
            </button>

            {user ? (
              <>
                {/* Notifications */}
                <button className="w-9 h-9 relative flex items-center justify-center rounded-lg text-ekam-muted hover:text-ekam-gold hover:bg-ekam-gold/10 transition-all duration-200">
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-ekam-saffron"></span>
                </button>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg border border-ekam-border hover:border-ekam-gold/40 transition-all duration-200"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-ekam-bg"
                      style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <ChevronDown size={14} className={`text-ekam-muted transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-xl z-50"
                      style={{ background: '#1C1510', border: '1px solid #2E2215' }}>
                      <div className="px-4 py-3 border-b border-ekam-border">
                        <p className="text-sm font-medium text-ekam-cream">{user.name}</p>
                        <p className="text-xs text-ekam-muted mt-0.5">{user.email}</p>
                        <span className="badge badge-gold mt-1.5 text-[10px]">
                          {user.role === 'admin' ? '⚡ Admin' : user.role === 'instructor' ? '🎓 Instructor' : '👤 Student'}
                        </span>
                      </div>
                      <div className="py-1">
                        {(user.role === 'instructor' || user.role === 'admin') && (
                          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ekam-cream-dim hover:text-ekam-gold hover:bg-ekam-gold/8 transition-all">
                            <LayoutDashboard size={15} /> Dashboard
                          </Link>
                        )}
                        {user.role === 'admin' && (
                          <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ekam-cream-dim hover:text-ekam-gold hover:bg-ekam-gold/8 transition-all">
                            <Shield size={15} /> Admin Panel
                          </Link>
                        )}
                        <Link href="/my-learning" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ekam-cream-dim hover:text-ekam-gold hover:bg-ekam-gold/8 transition-all">
                          <BookOpen size={15} /> My Learning
                        </Link>
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ekam-cream-dim hover:text-ekam-gold hover:bg-ekam-gold/8 transition-all">
                          <User size={15} /> Profile
                        </Link>
                      </div>
                      <div className="border-t border-ekam-border py-1">
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 transition-all">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/login" className="btn-ghost text-sm">Sign In</Link>
                <Link href="/auth/signup" className="btn-gold text-sm">Join Ekam</Link>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-ekam-muted hover:text-ekam-cream"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-scaleIn">
            <div className="relative search-glow rounded-xl overflow-hidden"
              style={{ background: '#1C1510', border: '1px solid #2E2215' }}>
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ekam-muted" />
              <input
                type="text"
                placeholder="Search for courses, instructors, topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-12 py-3.5 bg-transparent text-sm text-ekam-cream placeholder:text-ekam-muted outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ekam-muted hover:text-ekam-cream"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-ekam-border"
          style={{ background: '#120E08' }}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center px-4 py-3 rounded-lg text-sm font-medium text-ekam-cream-dim hover:text-ekam-gold hover:bg-ekam-gold/8 transition-all"
              >
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="pt-3 flex flex-col gap-2 border-t border-ekam-border mt-3">
                <Link href="/auth/login" className="btn-outline w-full justify-center">Sign In</Link>
                <Link href="/auth/signup" className="btn-gold w-full justify-center">Join Ekam</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

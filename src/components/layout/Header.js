'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, ChevronDown, BookOpen, LayoutDashboard, Shield, LogOut, User, Bell, CheckCircle2, XCircle } from 'lucide-react'
import { getNotifications, markNotificationsRead } from '@/lib/utils'

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
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('ekam_user')
    const u = stored ? JSON.parse(stored) : null
    setUser(u)
    setNotifications(u ? getNotifications(u.id) : [])
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
    setUserMenuOpen(false)
    setNotifOpen(false)
  }, [pathname])

  const unreadCount = notifications.filter(n => !n.read).length

  const toggleNotifications = () => {
    setNotifOpen(prev => {
      const next = !prev
      if (next && user && unreadCount > 0) {
        markNotificationsRead(user.id)
        setNotifications(getNotifications(user.id))
      }
      return next
    })
    setUserMenuOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('ekam_user')
    setUser(null)
    setUserMenuOpen(false)
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: '#450013',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.25)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/ekam-logo-crop.png"
              alt="Ekam"
              width={1056}
              height={588}
              priority
              className="h-9 md:h-11 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                style={
                  pathname === link.href
                    ? { color: '#E8C060', background: 'rgba(212,168,67,0.15)' }
                    : { color: 'rgba(255,255,255,0.65)' }
                }
                onMouseEnter={e => { if (pathname !== link.href) { e.currentTarget.style.color = '#FFFFFF'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' } }}
                onMouseLeave={e => { if (pathname !== link.href) { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'transparent' } }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#E8C060'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'transparent' }}
            >
              <Search size={18} />
            </button>

            {user ? (
              <>
                <div className="relative">
                  <button onClick={toggleNotifications}
                    className="w-9 h-9 relative flex items-center justify-center rounded-lg transition-all duration-200"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#E8C060'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'transparent' }}
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-ekam-saffron"></span>
                    )}
                  </button>

                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-xl overflow-hidden shadow-lg z-50 bg-white"
                      style={{ border: '1px solid #E2D5C4', boxShadow: '0 8px 32px rgba(139,94,10,0.12)' }}>
                      <div className="px-4 py-3" style={{ borderBottom: '1px solid #EDE4D8' }}>
                        <p className="text-sm font-medium text-ekam-cream">Notifications</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-ekam-muted text-center py-8 px-4">No notifications yet</p>
                        ) : (
                          notifications.map(n => (
                            <div key={n.id} className="flex items-start gap-3 px-4 py-3"
                              style={{ borderBottom: '1px solid #F5EFE4' }}>
                              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ background: n.type === 'rejected' ? 'rgba(176,24,24,0.1)' : 'rgba(76,175,114,0.12)' }}>
                                {n.type === 'rejected'
                                  ? <XCircle size={14} style={{ color: '#B01818' }} />
                                  : <CheckCircle2 size={14} style={{ color: '#1A5C38' }} />
                                }
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-ekam-cream">{n.title}</p>
                                <p className="text-xs text-ekam-muted mt-0.5 leading-relaxed">{n.message}</p>
                                <p className="text-[10px] text-ekam-muted mt-1">
                                  {new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false) }}
                    className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg transition-all duration-200"
                    style={{ border: '1.5px solid rgba(255,255,255,0.2)' }}
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} style={{ color: 'rgba(255,255,255,0.7)' }} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden shadow-lg z-50 bg-white"
                      style={{ border: '1px solid #E2D5C4', boxShadow: '0 8px 32px rgba(139,94,10,0.12)' }}>
                      <div className="px-4 py-3" style={{ borderBottom: '1px solid #EDE4D8' }}>
                        <p className="text-sm font-medium text-ekam-cream">{user.name}</p>
                        <p className="text-xs text-ekam-muted mt-0.5">{user.email}</p>
                        <span className="badge badge-gold mt-1.5 text-[10px]">
                          {user.role === 'admin' ? '⚡ Admin' : user.role === 'instructor' ? '🎓 Instructor' : '👤 Student'}
                        </span>
                      </div>
                      <div className="py-1">
                        {(user.role === 'instructor' || user.role === 'admin') && (
                          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ekam-muted hover:text-ekam-gold hover:bg-ekam-surface transition-all">
                            <LayoutDashboard size={15} /> Dashboard
                          </Link>
                        )}
                        {user.role === 'admin' && (
                          <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ekam-muted hover:text-ekam-gold hover:bg-ekam-surface transition-all">
                            <Shield size={15} /> Admin Panel
                          </Link>
                        )}
                        <Link href="/my-learning" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ekam-muted hover:text-ekam-gold hover:bg-ekam-surface transition-all">
                          <BookOpen size={15} /> My Learning
                        </Link>
                        <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-ekam-muted hover:text-ekam-gold hover:bg-ekam-surface transition-all">
                          <User size={15} /> Profile
                        </Link>
                      </div>
                      <div className="py-1" style={{ borderTop: '1px solid #EDE4D8' }}>
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-all">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/auth/login" className="btn-ghost text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>Sign In</Link>
                <Link href="/auth/signup" className="btn-gold text-sm">Join Ekam</Link>
              </div>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4 animate-scaleIn">
            <div className="relative search-glow rounded-xl overflow-hidden"
              style={{ border: '1.5px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.06)' }}>
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.5)' }} />
              <input
                type="text"
                placeholder="Search for courses, instructors, topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-12 py-3.5 bg-transparent text-sm text-white placeholder-white/40 outline-none"
              />
              <button onClick={() => setSearchOpen(false)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <X size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', background: '#450013' }}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all"
                style={{ color: 'rgba(255,255,255,0.7)' }}>
                {link.label}
              </Link>
            ))}
            {!user && (
              <div className="pt-3 flex flex-col gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '12px' }}>
                <Link href="/auth/login" className="btn-outline w-full justify-center"
                  style={{ color: '#E8C060', borderColor: 'rgba(255,255,255,0.25)' }}>Sign In</Link>
                <Link href="/auth/signup" className="btn-gold w-full justify-center">Join Ekam</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

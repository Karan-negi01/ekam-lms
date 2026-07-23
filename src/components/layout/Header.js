'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Search, Menu, X, ChevronDown, BookOpen, LayoutDashboard, Shield, LogOut, User, Bell, CheckCircle2, XCircle } from 'lucide-react'
import { getNotifications, markNotificationsRead } from '@/lib/utils'

const navLinks = [
  { label: 'Categories', href: '/courses?view=categories' },
  { label: 'Instructors', href: '/instructors' },
  { label: 'Subscription', href: '/subscription' },
  { label: 'Leaderboard', href: '/leaderboard' },
]

export default function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [user, setUser] = useState(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
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

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(searchQuery.trim() ? `/courses?search=${encodeURIComponent(searchQuery.trim())}` : '/courses')
  }

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-white"
      style={{
        borderBottom: '1px solid #ECE7DD',
        boxShadow: isScrolled ? '0 1px 12px rgba(20,20,20,0.06)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#450013' }}>
              <Image src="/ekam-icon.png" alt="" width={506} height={558} priority className="w-full h-full object-cover" />
            </div>
            <span className="font-sans text-lg font-extrabold tracking-tight hidden sm:block" style={{ color: '#171310' }}>Ekam</span>
          </Link>

          {/* Categories link (desktop) */}
          <nav className="hidden lg:flex items-center gap-1 flex-shrink-0">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap"
                style={pathname === link.href.split('?')[0] ? { color: '#8C6210', background: '#FBF3E3' } : { color: '#4A4438' }}
                onMouseEnter={e => { if (pathname !== link.href.split('?')[0]) e.currentTarget.style.background = '#F5F3EE' }}
                onMouseLeave={e => { if (pathname !== link.href.split('?')[0]) e.currentTarget.style.background = 'transparent' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Persistent search bar */}
          <form onSubmit={handleSearch} className="flex-1 hidden md:block max-w-xl">
            <div className="relative rounded-full overflow-hidden transition-all duration-150"
              style={{ border: '1.5px solid #171310' }}>
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ekam-muted" />
              <input
                type="text"
                placeholder="Search for anything"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-transparent text-sm outline-none"
                style={{ color: '#171310' }}
              />
            </div>
          </form>

          {/* Right side */}
          <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
            <Link href="/auth/signup?role=instructor"
              className="hidden lg:block px-3 py-2 text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap"
              style={{ color: '#4A4438' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F5F3EE' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
              Teach on Ekam
            </Link>

            {user ? (
              <>
                <div className="relative">
                  <button onClick={toggleNotifications}
                    className="w-9 h-9 relative flex items-center justify-center rounded-lg transition-all duration-150"
                    style={{ color: '#5A5346' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#F5F3EE' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: '#C44015' }}></span>
                    )}
                  </button>

                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 max-w-[90vw] rounded-xl overflow-hidden bg-white"
                      style={{ border: '1px solid #EAE4D8', boxShadow: '0 10px 32px rgba(20,20,20,0.10)' }}>
                      <div className="px-4 py-3" style={{ borderBottom: '1px solid #F0EBE0' }}>
                        <p className="text-sm font-bold" style={{ color: '#171310' }}>Notifications</p>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <p className="text-xs text-ekam-muted text-center py-8 px-4">No notifications yet</p>
                        ) : (
                          notifications.map(n => (
                            <div key={n.id} className="flex items-start gap-3 px-4 py-3"
                              style={{ borderBottom: '1px solid #F5F3EE' }}>
                              <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ background: n.type === 'rejected' ? 'rgba(176,24,24,0.1)' : 'rgba(184,70,15,0.12)' }}>
                                {n.type === 'rejected'
                                  ? <XCircle size={14} style={{ color: '#B01818' }} />
                                  : <CheckCircle2 size={14} style={{ color: '#B8460F' }} />
                                }
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold" style={{ color: '#171310' }}>{n.title}</p>
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
                    className="flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-lg transition-all duration-150"
                    style={{ border: '1px solid #EAE4D8' }}
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: 'linear-gradient(135deg, #C4881A, #C44015)' }}>
                      {user.name?.charAt(0) || 'U'}
                    </div>
                    <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} style={{ color: '#5A5346' }} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl overflow-hidden bg-white"
                      style={{ border: '1px solid #EAE4D8', boxShadow: '0 10px 32px rgba(20,20,20,0.10)' }}>
                      <div className="px-4 py-3" style={{ borderBottom: '1px solid #F0EBE0' }}>
                        <p className="text-sm font-bold" style={{ color: '#171310' }}>{user.name}</p>
                        <p className="text-xs text-ekam-muted mt-0.5">{user.email}</p>
                        <span className="badge badge-gold mt-1.5 text-[10px]">
                          {user.role === 'admin' ? 'Admin' : user.role === 'instructor' ? 'Instructor' : 'Student'}
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
                      <div className="py-1" style={{ borderTop: '1px solid #F0EBE0' }}>
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
                <Link href="/auth/login" className="btn-ghost text-sm">Sign In</Link>
                <Link href="/auth/signup" className="btn-gold text-sm">Join Ekam</Link>
              </div>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-150"
              style={{ color: '#5A5346' }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar (always visible below header row on small screens) */}
        <form onSubmit={handleSearch} className="md:hidden pb-3">
          <div className="relative rounded-full overflow-hidden" style={{ border: '1.5px solid #171310' }}>
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ekam-muted" />
            <input
              type="text"
              placeholder="Search for anything"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-transparent text-sm outline-none"
              style={{ color: '#171310' }}
            />
          </div>
        </form>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white" style={{ borderTop: '1px solid #ECE7DD' }}>
          <div className="px-4 py-4 space-y-1">
            <Link href="/courses" className="flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all" style={{ color: '#4A4438' }}>
              Courses
            </Link>
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all"
                style={{ color: '#4A4438' }}>
                {link.label}
              </Link>
            ))}
            <Link href="/auth/signup?role=instructor" className="flex items-center px-4 py-3 rounded-lg text-sm font-semibold transition-all" style={{ color: '#4A4438' }}>
              Teach on Ekam
            </Link>
            {!user && (
              <div className="pt-3 flex flex-col gap-2" style={{ borderTop: '1px solid #ECE7DD', marginTop: '12px' }}>
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

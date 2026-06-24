import Link from 'next/link'
import { Instagram, Youtube, Twitter, Facebook, Mail, Phone } from 'lucide-react'

const footerLinks = {
  explore: [
    { label: 'All Courses', href: '/courses' },
    { label: 'Shastriya Sangeet', href: '/courses?cat=music' },
    { label: 'Nritya Kala', href: '/courses?cat=dance' },
    { label: 'Yoga & Dhyan', href: '/courses?cat=yoga' },
    { label: 'Chitrakala', href: '/courses?cat=art' },
    { label: 'Sanskrit', href: '/courses?cat=sanskrit' },
  ],
  platform: [
    { label: 'Become an Instructor', href: '/auth/signup?role=instructor' },
    { label: 'Admin Dashboard', href: '/admin' },
    { label: 'Instructor Dashboard', href: '/dashboard' },
    { label: 'My Learning', href: '/my-learning' },
    { label: 'Certificates', href: '/certificates' },
  ],
  company: [
    { label: 'About Ekam', href: '/about' },
    { label: 'Our Mission', href: '/about#mission' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'Press', href: '/press' },
  ],
  support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Community', href: '/community' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
  ],
}

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#080604', borderTop: '1px solid #1C1510' }}>
      {/* Top decorative bar */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(to right, transparent, #D4A843, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
        {/* Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #D4A843, #E8622A)' }}>
                <span className="text-ekam-bg font-display font-bold text-xl">ए</span>
              </div>
              <div>
                <span className="font-display text-2xl font-semibold tracking-widest text-ekam-cream">EKAM</span>
                <p className="text-xs tracking-[0.25em] text-ekam-gold opacity-80">एकम् — One in Culture</p>
              </div>
            </Link>
            <p className="text-sm text-ekam-muted leading-relaxed mb-6">
              Ekam is a premium platform dedicated to preserving and sharing India&apos;s rich cultural heritage through expert-led courses in classical arts, music, dance, and philosophy.
            </p>
            <div className="flex items-center gap-1 text-xs text-ekam-muted mb-2">
              <Mail size={13} className="text-ekam-gold" />
              <span>contact@ekam.in</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-ekam-muted">
              <Phone size={13} className="text-ekam-gold" />
              <span>+91 98765 43210</span>
            </div>
          </div>

          <div className="lg:col-span-2">
            <p className="text-sm font-medium text-ekam-cream mb-3">Join 85,000+ learners — get curated cultural content</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-field flex-1"
              />
              <button className="btn-gold whitespace-nowrap">Subscribe</button>
            </div>
            <p className="text-xs text-ekam-muted mt-2">No spam. Unsubscribe anytime. New courses every week.</p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              <span className="text-xs text-ekam-muted tracking-wide">Follow us:</span>
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-ekam-muted hover:text-ekam-gold hover:border-ekam-gold/40 transition-all duration-200"
                  style={{ border: '1px solid #2E2215' }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="divider-gold mb-12">
          <span className="px-4 text-ekam-gold text-sm">✦</span>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-ekam-gold mb-4">
                {key === 'explore' ? 'Explore' : key === 'platform' ? 'Platform' : key === 'company' ? 'Company' : 'Support'}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ekam-muted hover:text-ekam-cream-dim transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-ekam-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ekam-muted text-center md:text-left">
            © {new Date().getFullYear()} Ekam Learning Pvt. Ltd. All rights reserved.
          </p>
          <div className="ornament">
            <span className="text-xs text-ekam-muted tracking-widest">Made with ❤️ for Bharat</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-ekam-muted hover:text-ekam-cream-dim transition-colors">Privacy</Link>
            <span className="text-ekam-border">•</span>
            <Link href="/terms" className="text-xs text-ekam-muted hover:text-ekam-cream-dim transition-colors">Terms</Link>
            <span className="text-ekam-border">•</span>
            <Link href="/sitemap" className="text-xs text-ekam-muted hover:text-ekam-cream-dim transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

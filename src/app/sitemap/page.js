import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import { categories } from '@/lib/data'

const groups = [
  {
    title: 'Explore',
    links: [
      { label: 'All Courses', href: '/courses' },
      ...categories.map(c => ({ label: c.label, href: `/courses?cat=${c.id}` })),
      { label: 'Instructors', href: '/instructors' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Become an Instructor', href: '/auth/signup?role=instructor' },
      { label: 'Instructor Dashboard', href: '/dashboard' },
      { label: 'Admin Panel', href: '/admin' },
      { label: 'My Learning', href: '/my-learning' },
      { label: 'Certificates', href: '/certificates' },
      { label: 'Profile', href: '/profile' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Ekam', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Support & Legal',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Community', href: '/community' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Refund Policy', href: '/refund' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', href: '/auth/login' },
      { label: 'Create Account', href: '/auth/signup' },
    ],
  },
]

export default function SitemapPage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <PageHero label="Navigation" title="Sitemap" subtitle="Every page on Ekam, in one place." />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {groups.map((g, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold mb-4 pb-2" style={{ color: '#1C0E04', borderBottom: '1px solid #EDE4D8' }}>{g.title}</h2>
              <ul className="space-y-2">
                {g.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} className="flex items-center gap-1.5 text-sm text-ekam-muted hover:text-ekam-gold transition-colors group">
                      <ChevronRight size={13} className="text-ekam-gold flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

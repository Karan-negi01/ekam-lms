import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'
import CategoryIcon from '@/components/icons/CategoryIcon'

const posts = [
  {
    category: 'music', categoryLabel: 'Shastriya Sangeet',
    title: 'What Is a Raga, Really? A Beginner\'s Guide to Hindustani Melody',
    excerpt: 'Before you learn your first raga, understand the difference between a raga and a Western scale — and why that distinction changes how you should practice.',
    author: 'Pandit Ravishankar Mishra', readTime: '6 min read', date: '2 Jul 2026',
  },
  {
    category: 'yoga', categoryLabel: 'Yoga & Dhyan',
    title: 'Ashtanga vs Hatha: Choosing Your First Yoga Practice',
    excerpt: 'Every beginner asks this eventually. Here\'s an honest comparison of pace, physical demand and philosophy to help you pick a starting point.',
    author: 'Swami Anandagiri', readTime: '5 min read', date: '28 Jun 2026',
  },
  {
    category: 'dance', categoryLabel: 'Nritya Kala',
    title: 'The Nine Rasas: Emotion as Technique in Bharatanatyam',
    excerpt: 'Abhinaya isn\'t decoration — it\'s the actual grammar of classical dance. A look at how the navarasa shape every gesture on stage.',
    author: 'Guru Meenakshi Sundaram', readTime: '7 min read', date: '20 Jun 2026',
  },
  {
    category: 'sanskrit', categoryLabel: 'Sanskrit',
    title: 'Why Sanskrit Grammar Is Older Than You Think',
    excerpt: 'Panini\'s Ashtadhyayi predates modern linguistics by over two millennia. A short history of the world\'s first formal grammar system.',
    author: 'Prof. Ramesh Shastri', readTime: '8 min read', date: '12 Jun 2026',
  },
  {
    category: 'art', categoryLabel: 'Chitrakala',
    title: 'Reading a Madhubani Painting: Symbols You\'re Probably Missing',
    excerpt: 'Fish, peacocks, the sun — Madhubani art is dense with meaning. A field guide to the motifs and what they represent.',
    author: 'Seema Devi', readTime: '4 min read', date: '5 Jun 2026',
  },
  {
    category: 'cooking', categoryLabel: 'Paaka Vidya',
    title: 'The Five Mother Spice Blends of Regional Indian Cooking',
    excerpt: 'Long before packaged masalas, every region had its own base blend. Here are five worth learning by hand.',
    author: 'Chef Ananya Krishnamurthy', readTime: '5 min read', date: '29 May 2026',
  },
]

export default function BlogPage() {
  return (
    <div style={{ background: '#FDFAF4' }}>
      <PageHero
        label="Ekam Journal"
        title="Stories From the Tradition"
        subtitle="Essays, history and practical notes from the instructors teaching on Ekam."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article key={i} className="card-base overflow-hidden flex flex-col group">
              <div className="relative h-40 flex items-center justify-center overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #3b0a0a, #451a03)' }}>
                <CategoryIcon id={post.category} size={110} className="absolute text-white opacity-[0.08] rotate-6 scale-110" />
                <div className="relative w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.22)' }}>
                  <CategoryIcon id={post.category} size={26} className="text-white" />
                </div>
                <span className="absolute top-3 left-3 badge badge-gold bg-white/95 text-[10px]">{post.categoryLabel}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="font-serif text-lg font-semibold leading-snug mb-2.5 transition-colors group-hover:text-ekam-gold" style={{ color: '#1C0E04' }}>
                  {post.title}
                </h2>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: '#7A6550' }}>{post.excerpt}</p>
                <div className="flex items-center justify-between pt-4 text-xs" style={{ borderTop: '1px solid #F0E8DC', color: '#9B8878' }}>
                  <span>{post.author}</span>
                  <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-14">
          <p className="text-sm mb-4" style={{ color: '#7A6550' }}>More essays are published as our instructors write them.</p>
          <Link href="/courses" className="btn-outline">Browse Courses Instead <ArrowRight size={15} /></Link>
        </div>
      </div>
    </div>
  )
}

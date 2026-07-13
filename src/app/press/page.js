import { Download, Mail, FileText, Image as ImageIcon } from 'lucide-react'
import PageHero from '@/components/layout/PageHero'

const kitItems = [
  { icon: ImageIcon, title: 'Logo Pack', desc: 'Ekam wordmark and mandala icon in light and dark variants, SVG and PNG.' },
  { icon: FileText, title: 'Brand Guidelines', desc: 'Color palette, typography and usage rules for the Ekam identity.' },
  { icon: FileText, title: 'Company Fact Sheet', desc: 'Key numbers, founding story and leadership bios in a single one-pager.' },
]

const facts = [
  ['Founded', '2021'],
  ['Headquarters', 'India'],
  ['Traditions Covered', '8'],
  ['Verified Instructors', '320+'],
  ['Students Worldwide', '85,000+'],
]

export default function PressPage() {
  return (
    <div style={{ background: '#FDFAF4' }}>
      <PageHero
        label="Media"
        title="Press & Media Resources"
        subtitle="Everything a journalist or partner needs to cover Ekam accurately."
      />

      {/* Boilerplate */}
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-3xl mb-5">About Ekam</h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: '#6B5744', lineHeight: '1.8' }}>
            Ekam is a cultural learning platform connecting verified Indian classical instructors with students
            worldwide, across eight living traditions — classical music, dance, yoga, Sanskrit, visual art,
            Vedic studies, traditional cooking and craft. Every instructor is vetted for lineage and training
            before their courses go live.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {facts.map(([label, value], i) => (
              <div key={i} className="rounded-xl p-4 text-center" style={{ background: '#FAF5ED', border: '1px solid #EDE4D8' }}>
                <p className="text-lg font-bold font-serif" style={{ color: '#8C6210' }}>{value}</p>
                <p className="text-[11px]" style={{ color: '#7A6550' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press kit */}
      <section className="py-20 px-4" style={{ background: '#FAF5ED' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="section-label mb-4 block justify-center">Assets</span>
            <h2 className="section-title text-4xl md:text-5xl">Media Kit</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {kitItems.map((item, i) => (
              <div key={i} className="rounded-2xl p-7 bg-white" style={{ border: '1px solid #EDE4D8' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(140,98,16,0.08)' }}>
                  <item.icon size={22} className="text-ekam-gold" />
                </div>
                <h3 className="font-serif text-lg font-semibold mb-2" style={{ color: '#1C0E04' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: '#7A6550' }}>{item.desc}</p>
                <button className="text-xs font-semibold text-ekam-gold hover:text-ekam-gold-light inline-flex items-center gap-1.5">
                  <Download size={13} /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4" style={{ background: '#FFFFFF' }}>
        <div className="max-w-lg mx-auto text-center">
          <h2 className="section-title text-3xl mb-4">Media Inquiries</h2>
          <p className="text-sm mb-6" style={{ color: '#7A6550' }}>For interviews, partnership inquiries or fact-checking, reach our team directly.</p>
          <a href="mailto:press@ekam.in" className="btn-gold text-sm"><Mail size={15} /> press@ekam.in</a>
        </div>
      </section>
    </div>
  )
}

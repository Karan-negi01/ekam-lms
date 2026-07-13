import PageHero from '@/components/layout/PageHero'

const sections = [
  {
    title: '1. Eligibility Window',
    body: 'You may request a full refund within 7 days of enrolling in a paid course, provided you have completed less than 20% of the course curriculum. Requests made after this window, or after crossing the 20% completion mark, are not eligible for a refund.',
  },
  {
    title: '2. How to Request a Refund',
    body: 'Email contact@ekam.in with your registered email address and the course name. Our team will verify your enrollment and progress, and respond within 3 business days.',
  },
  {
    title: '3. Processing Time',
    body: 'Approved refunds are credited back to your original payment method within 7–10 business days, depending on your bank or payment provider.',
  },
  {
    title: '4. Free Courses',
    body: 'Free courses are not eligible for refunds as no payment was made. If you enrolled by mistake, you may simply unenroll from your My Learning page.',
  },
  {
    title: '5. Instructor-Cancelled Courses',
    body: 'If a course is removed from the platform by Ekam or the instructor after you\'ve enrolled, you will receive a full refund automatically, regardless of completion percentage.',
  },
  {
    title: '6. Non-Refundable Cases',
    body: 'Certificates already issued, courses purchased during a promotional bundle after the bundle window closes, and courses where abusive or fraudulent use is detected are not eligible for refunds.',
  },
]

export default function RefundPage() {
  return (
    <div style={{ background: '#FDFAF4' }}>
      <PageHero label="Policy" title="Refund Policy" subtitle="Last updated: 1 July 2026" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl p-6 mb-10 text-sm leading-relaxed" style={{ background: '#FAF5ED', border: '1px solid #EDE4D8', color: '#7A6550' }}>
          This policy applies to all paid courses purchased on Ekam. By enrolling in a course, you agree to the
          terms outlined below. For anything not covered here, contact <a href="mailto:contact@ekam.in" className="text-ekam-gold font-medium">contact@ekam.in</a>.
        </div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="font-serif text-xl font-semibold mb-2" style={{ color: '#1C0E04' }}>{s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#6B5744' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

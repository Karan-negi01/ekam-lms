import PageHero from '@/components/layout/PageHero'

const sections = [
  {
    title: '1. Information We Collect',
    body: 'When you create an account, we collect your name, email address and role (student or instructor). When you enroll in courses, we track your progress, completed lessons and wishlist for the purpose of delivering the learning experience.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use your information to operate your account, track course progress, issue certificates, process instructor submissions and commission calculations, and communicate updates about courses you\'re enrolled in.',
  },
  {
    title: '3. Instructor Data',
    body: 'If you register as an instructor, the courses, curriculum, pricing and study material you submit are reviewed by our admin team before publishing. Your public instructor profile (name, bio, rating) is visible to all students.',
  },
  {
    title: '4. Data Storage',
    body: 'Account and course data is stored securely and is never sold to third parties. You may request deletion of your account and associated data at any time by contacting us.',
  },
  {
    title: '5. Cookies',
    body: 'We use essential cookies and local storage to keep you signed in and remember your preferences. We do not use third-party advertising trackers.',
  },
  {
    title: '6. Your Rights',
    body: 'You can access, correct or delete your personal data at any time from your Profile page, or by emailing contact@ekam.in.',
  },
  {
    title: '7. Changes to This Policy',
    body: 'We may update this policy from time to time. Material changes will be communicated via email or an in-app notification.',
  },
]

export default function PrivacyPage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <PageHero label="Legal" title="Privacy Policy" subtitle="Last updated: 1 July 2026" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl p-6 mb-10 text-sm leading-relaxed" style={{ background: '#FFFFFF', border: '1px solid #EDE4D8', color: '#7A6550' }}>
          Ekam Learning Pvt. Ltd. (&ldquo;Ekam&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy. This
          policy explains what we collect, how we use it, and the choices you have.
        </div>

        <div className="space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-semibold mb-2" style={{ color: '#1C0E04' }}>{s.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#6B5744' }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import PageHero from '@/components/layout/PageHero'

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By creating an account or using Ekam, you agree to be bound by these Terms of Service and our Privacy Policy.',
  },
  {
    title: '2. Account Responsibilities',
    body: 'You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.',
  },
  {
    title: '3. Course Content & Licensing',
    body: 'Enrolling in a course grants you a personal, non-transferable license to view its content for your own learning. Downloading, re-recording or redistributing course videos or study material without permission is prohibited.',
  },
  {
    title: '4. Instructor Submissions',
    body: 'Instructors retain ownership of their course content but grant Ekam a license to host and distribute it to enrolled students. All submissions are subject to admin review before publishing, and Ekam may reject or remove content that violates these terms. A commission rate, set individually per course during review, applies to all paid course revenue.',
  },
  {
    title: '5. Payments & Refunds',
    body: 'Course prices are listed in INR. Refunds are governed by our separate Refund Policy.',
  },
  {
    title: '6. Prohibited Conduct',
    body: 'You may not use Ekam to upload content that infringes intellectual property, misrepresents credentials, or violates applicable law. Ekam reserves the right to suspend accounts that violate these terms.',
  },
  {
    title: '7. Limitation of Liability',
    body: 'Ekam is provided "as is". While we vet instructors for authenticity, we do not guarantee specific learning outcomes.',
  },
  {
    title: '8. Changes to These Terms',
    body: 'We may revise these terms periodically. Continued use of Ekam after changes constitutes acceptance of the updated terms.',
  },
]

export default function TermsPage() {
  return (
    <div style={{ background: '#FFFFFF' }}>
      <PageHero label="Legal" title="Terms of Service" subtitle="Last updated: 1 July 2026" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-2xl p-6 mb-10 text-sm leading-relaxed" style={{ background: '#FFFFFF', border: '1px solid #EDE4D8', color: '#7A6550' }}>
          Please read these terms carefully before using Ekam. They govern your access to and use of the platform,
          whether as a student or an instructor.
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

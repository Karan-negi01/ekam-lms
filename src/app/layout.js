import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: {
    default: 'Ekam — Cultural Learning Platform',
    template: '%s | Ekam',
  },
  description: 'Discover India\'s rich cultural heritage through expert-led courses in classical music, dance, yoga, Sanskrit, traditional arts and more.',
  keywords: ['Indian culture', 'classical music', 'bharatanatyam', 'yoga', 'sanskrit', 'online learning'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: '#FDFAF4' }}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

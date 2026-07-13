/* Hand-drawn line-art motifs for each art form — used in place of emoji
   on category tiles and course thumbnails, so the visual language is
   consistent and specific to Ekam rather than generic emoji glyphs. */

const paths = {
  // Tabla pair, viewed from above, with syahi (tuning paste) centers
  music: (
    <>
      <circle cx="14" cy="21" r="9" />
      <circle cx="14" cy="21" r="3.5" fill="currentColor" fillOpacity="0.18" stroke="none" />
      <circle cx="27" cy="16" r="6.5" />
      <circle cx="27" cy="16" r="2.5" fill="currentColor" fillOpacity="0.18" stroke="none" />
    </>
  ),
  // Dancer in a raised-arm pose
  dance: (
    <>
      <circle cx="20" cy="9" r="3" />
      <path d="M20 12v10" />
      <path d="M20 22l-7 9M20 22l7 9" />
      <path d="M20 15.5l-7-3M20 15.5l7-3" />
    </>
  ),
  // Seated meditation figure
  yoga: (
    <>
      <circle cx="20" cy="9" r="3" />
      <path d="M20 12v6" />
      <path d="M20 18c-5.5 0-10 4.5-10 10h20c0-5.5-4.5-10-10-10Z" />
      <path d="M13 24l-3.5 3M27 24l3.5 3" />
    </>
  ),
  // Paintbrush stroke with a dot of colour
  art: (
    <>
      <path d="M11 29l15-15a2.6 2.6 0 0 1 3.7 3.7L14.5 32.5 8 34l2.5-6.5Z" />
      <circle cx="27" cy="10" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  // Devanagari अ — first letter of the Sanskrit alphabet
  sanskrit: (
    <text x="20" y="28" fontSize="25" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="'Cormorant Garamond', serif">अ</text>
  ),
  // Om — the seed syllable of Vedic tradition
  vedic: (
    <text x="20" y="29" fontSize="26" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="'Cormorant Garamond', serif">ॐ</text>
  ),
  // Thali bowl with rising steam
  cooking: (
    <>
      <path d="M8 19h24c0 7.2-4.3 13-12 13S8 26.2 8 19Z" />
      <path d="M15.5 19c0-3 1-5 1.8-7M24.5 19c0-3-1-5-1.8-7" />
    </>
  ),
  // Handmade clay vase
  craft: (
    <>
      <path d="M15 9h10l-1 6.5c3 2.2 4.5 5.3 4.5 9 0 5.2-4.2 9.5-8.5 9.5S11 30.7 11 25.5c0-3.7 1.5-6.8 4.5-9L15 9Z" />
      <path d="M14.5 9h11" />
    </>
  ),
}

export default function CategoryIcon({ id, size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[id] || paths.music}
    </svg>
  )
}

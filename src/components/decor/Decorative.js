/* Shared cultural-motif decorations — used across pages for consistent texture. */

export function Mandala({ className = '' }) {
  return (
    <svg viewBox="0 0 300 300" className={className} fill="none">
      {[130, 105, 80, 55, 30].map((r, i) => (
        <circle key={i} cx="150" cy="150" r={r}
          stroke={`rgba(140,98,16,${(0.06 - i * 0.01).toFixed(2)})`} strokeWidth="0.6" />
      ))}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
        <g key={i} transform={`rotate(${deg} 150 150)`}>
          <line x1="150" y1="20" x2="150" y2="50" stroke="rgba(140,98,16,0.12)" strokeWidth="0.6" />
          <circle cx="150" cy="35" r="2.5" fill="rgba(140,98,16,0.10)" />
          <polygon points="150,60 147,72 153,72" fill="rgba(140,98,16,0.06)" />
        </g>
      ))}
      <circle cx="150" cy="150" r="10" fill="rgba(140,98,16,0.12)" />
      <circle cx="150" cy="150" r="5" fill="rgba(140,98,16,0.22)" />
    </svg>
  )
}

export function PatternDots() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="#8C6210" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  )
}

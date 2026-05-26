interface LogoProps {
  variant?: 'light' | 'dark'
  size?: number
}

export default function Logo({ variant = 'dark', size = 38 }: LogoProps) {
  const textColor = variant === 'light' ? '#ffffff' : '#1a1f2e'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

      {/* Icon mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Blue rounded background */}
        <rect width="38" height="38" rx="10" fill="#3C83F7" />

        {/* Catalogue lines - full width */}
        <rect x="8" y="8"  width="22" height="3" rx="1.5" fill="white" />
        <rect x="8" y="14" width="16" height="3" rx="1.5" fill="white" />
        <rect x="8" y="20" width="19" height="3" rx="1.5" fill="white" />
        <rect x="8" y="26" width="13" height="3" rx="1.5" fill="white" />

        {/* Faded right extensions */}
        <rect x="24" y="14" width="6"  height="3" rx="1.5" fill="rgba(255,255,255,0.35)" />
        <rect x="21" y="20" width="9"  height="3" rx="1.5" fill="rgba(255,255,255,0.35)" />
        <rect x="17" y="26" width="13" height="3" rx="1.5" fill="rgba(255,255,255,0.35)" />
      </svg>

      {/* Wordmark */}
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={{
          fontSize: size * 0.53,
          fontWeight: 800,
          color: textColor,
          letterSpacing: '-0.5px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1
        }}>
          Kat
        </span>
        <span style={{
          fontSize: size * 0.53,
          fontWeight: 800,
          color: '#3C83F7',
          letterSpacing: '-0.5px',
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1
        }}>
          log
        </span>
      </div>

    </div>
  )
}
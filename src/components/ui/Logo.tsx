interface LogoProps {
  variant?: 'light' | 'dark'
  size?: number
}

export default function Logo({ variant = 'dark', size = 36 }: LogoProps) {
  const fontSize = size * 0.5

  return (
    <div className="flex items-center gap-2.5">

      {/* Icon mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="36" height="36" rx="10" className="fill-primary" />
        <rect x="9" y="9" width="8" height="7" rx="2" className="fill-white" />
        <rect x="9" y="20" width="8" height="7" rx="2" className="fill-white" />
        <rect x="19" y="9" width="8" height="18" rx="2" className="fill-white/25" />
        <rect x="17" y="13" width="10" height="4" rx="2" className="fill-white" />
        <rect x="17" y="20" width="10" height="4" rx="2" className="fill-white" />
      </svg>

      {/* Wordmark */}
      <div className="flex items-center" style={{ fontSize, lineHeight: 1 }}>
        <span
          className={`font-bold tracking-tight ${variant === 'light' ? 'text-white' : 'text-text'}`}
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Brand
        </span>
        <span
          className="font-bold tracking-tight text-primary"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          Hub
        </span>
      </div>

    </div>
  )
}

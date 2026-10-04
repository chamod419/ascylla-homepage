import './AscyllaLogo.css'

type AscyllaLogoProps = {
  className?: string
}

export default function AscyllaLogo({
  className = '',
}: AscyllaLogoProps) {
  return (
    <a
      href="/"
      className={`ascylla-brand ${className}`.trim()}
      aria-label="Ascylla home"
    >
      <img
        className="ascylla-brand__image"
        src="/brand/ascylla-logo.png"
        alt="Ascylla"
        width={212}
        height={44}
      />
    </a>
  )
}
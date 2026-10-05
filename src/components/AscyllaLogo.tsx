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
        className="ascylla-brand__mark"
        src="/brand/ascylla-mark-transparent.png"
        alt=""
        width="44"
        height="38"
      />

      <span className="ascylla-brand__name">
        ASCYLLA
      </span>
    </a>
  )
}
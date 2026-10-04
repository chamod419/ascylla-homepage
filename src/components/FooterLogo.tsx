import { useEffect, useRef, useState } from 'react'
import './FooterLogo.css'

export default function FooterLogo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let visible = true

    function syncPlayback() {
      container!.dataset.inactive = String(
        !visible || document.hidden,
      )
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    })

    observer.observe(container)
    document.addEventListener('visibilitychange', syncPlayback)
    syncPlayback()

    return () => {
      observer.disconnect()
      document.removeEventListener(
        'visibilitychange',
        syncPlayback,
      )
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="ascylla-footer-logo"
      data-paused={paused}
    >
      <a
        className="ascylla-footer-logo__link"
        href="/"
        aria-label="Ascylla home"
      >
        <span
          className="ascylla-footer-logo__mark"
          aria-hidden="true"
        >
          <span className="ascylla-footer-logo__colour" />
          <span className="ascylla-footer-logo__shine" />
        </span>

        <span
          className="ascylla-footer-logo__wordmark"
          aria-hidden="true"
        >
          {/* ASCYLLA */}
        </span>
      </a>

      {/* <button
        type="button"
        className="ascylla-footer-logo__toggle"
        aria-label="Pause logo animation"
        aria-pressed={paused}
        title={paused ? 'Resume logo animation' : 'Pause logo animation'}
        onClick={() => setPaused((current) => !current)}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          {paused ? (
            <path d="M8 5v14l11-7L8 5Z" />
          ) : (
            <path d="M6 5h4v14H6V5Zm8 0h4v14h-4V5Z" />
          )}
        </svg>
      </button> */}
    </div>
  )
}
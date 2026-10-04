import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import '../styles/expo-bottom.css'
import './ClosingCta.css'

const serviceAreas = [
  'Web & mobile',
  'AI solutions',
  'System integrations',
  'Cloud & DevOps',
]

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlaybackIcon({ paused }: { paused: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {paused ? (
        <path
          d="m9 5 11 7-11 7Z"
          fill="currentColor"
        />
      ) : (
        <>
          <rect
            x="6"
            y="5"
            width="4"
            height="14"
            rx="1"
            fill="currentColor"
          />

          <rect
            x="14"
            y="5"
            width="4"
            height="14"
            rx="1"
            fill="currentColor"
          />
        </>
      )}
    </svg>
  )
}

export default function ClosingCta() {
  const headingId = useId()

  const sectionRef = useRef<HTMLElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<number | null>(null)

  const [paused, setPaused] = useState(false)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const reveal = revealRef.current

    if (!section || !reveal) return

    // Local constants remain defined inside the callbacks below.
    const sectionElement = section
    const revealElement = reveal

    const preference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    let frameId = 0
    let previousTime: number | null = null

    const initialBounds = sectionElement.getBoundingClientRect()

    let inView =
      initialBounds.bottom > 0 &&
      initialBounds.top < window.innerHeight

    function readProgress() {
      if (preference.matches) return 1

      const top = sectionElement.getBoundingClientRect().top
      const distance = Math.max(window.innerHeight * 0.85, 1)

      return Math.max(
        0,
        Math.min(1, (window.innerHeight - top) / distance),
      )
    }

    let progress = progressRef.current ?? readProgress()

    function paint() {
      const remaining = 1 - progress

      revealElement.style.transform =
        `translate3d(0, ${remaining * 300}px, 0) ` +
        `scale(${1 + remaining * 0.6})`

      progressRef.current = progress
    }

    function canAnimate() {
      return (
        inView &&
        !document.hidden &&
        !preference.matches &&
        !paused
      )
    }

    function stopFrame() {
      cancelAnimationFrame(frameId)
      frameId = 0
      previousTime = null
    }

    function update(now: number) {
      frameId = 0

      if (!canAnimate()) {
        previousTime = null
        return
      }

      const target = readProgress()

      const delta =
        previousTime === null
          ? 1 / 60
          : Math.min((now - previousTime) / 1000, 0.05)

      previousTime = now

      progress +=
        (target - progress) * (1 - Math.exp(-16 * delta))

      if (Math.abs(target - progress) < 0.0005) {
        progress = target
      }

      paint()

      if (progress !== target) {
        frameId = requestAnimationFrame(update)
      } else {
        previousTime = null
      }
    }

    function schedule() {
      if (frameId || !canAnimate()) return

      frameId = requestAnimationFrame(update)
    }

    function syncPlayback() {
      const running = canAnimate()

      // Controls the CSS animations inside the section.
      sectionElement.dataset.running = String(running)

      if (preference.matches) {
        stopFrame()
        progress = 1
        paint()
        return
      }

      if (running) {
        schedule()
      } else {
        stopFrame()
      }
    }

    function handlePositionChange() {
      const bounds = sectionElement.getBoundingClientRect()

      inView =
        bounds.bottom > 0 &&
        bounds.top < window.innerHeight

      syncPlayback()
    }

    const observer =
      'IntersectionObserver' in window
        ? new IntersectionObserver(([entry]) => {
            inView = entry.isIntersecting
            syncPlayback()
          })
        : null

    if (preference.matches) {
      progress = 1
    }

    paint()
    syncPlayback()
    observer?.observe(sectionElement)

    window.addEventListener(
      'scroll',
      handlePositionChange,
      { passive: true },
    )
    window.addEventListener('resize', handlePositionChange)

    document.addEventListener(
      'visibilitychange',
      syncPlayback,
    )
    preference.addEventListener('change', syncPlayback)

    return () => {
      stopFrame()
      observer?.disconnect()

      sectionElement.dataset.running = 'false'

      window.removeEventListener(
        'scroll',
        handlePositionChange,
      )
      window.removeEventListener(
        'resize',
        handlePositionChange,
      )
      document.removeEventListener(
        'visibilitychange',
        syncPlayback,
      )
      preference.removeEventListener(
        'change',
        syncPlayback,
      )
    }
  }, [paused])

  return (
    <div className="ascylla-closing expo-bottom">
      <section
        ref={sectionRef}
        className="closing-cta"
        aria-labelledby={headingId}
      >
        <div
          className="closing-cta__art"
          aria-hidden="true"
        >
          <div className="closing-cta__glow" />

          <div className="closing-cta__orbit closing-cta__orbit--outer" />

          <div className="closing-cta__orbit closing-cta__orbit--inner" />
        </div>

        <div className="expo-bottom__container closing-cta__content">
          <div
            className="closing-cta__emblem"
            aria-hidden="true"
          >
            <div
              ref={revealRef}
              className="closing-cta__reveal"
            >
              <div className="closing-cta__shape">
                <div className="closing-cta__surface" />

                <div className="closing-cta__mark">
                  <div className="closing-cta__mark-colour" />
                  <div className="closing-cta__mark-shine" />
                </div>
              </div>
            </div>
          </div>

          <p className="closing-cta__eyebrow">
            Your next chapter starts here
          </p>

          <h2 id={headingId}>
            Have an idea?
            <br />
            <span>Let’s build it.</span>
          </h2>

          <p className="closing-cta__description">
            From a new product to a better-connected business,
            let’s talk about what you want to create.
          </p>

          <div className="closing-cta__actions">
            <a
              className="closing-cta__button"
              href="https://www.ascylla.com/contact"
            >
              Discuss your project
              <ArrowIcon />
            </a>

            <a
              className="closing-cta__email"
              href="mailto:sales@ascylla.com"
            >
              sales@ascylla.com
            </a>
          </div>

          <button
            type="button"
            className="closing-cta__playback"
            aria-label="Pause closing section animations"
            aria-pressed={paused}
            onClick={() => setPaused((current) => !current)}
          >
            <PlaybackIcon paused={paused} />

            <span>
              {paused ? 'Resume motion' : 'Pause motion'}
            </span>
          </button>
        </div>
      </section>

      <div className="closing-trust">
        <ul
          className="closing-trust__set"
          aria-label="Ascylla service areas"
        >
          {serviceAreas.map((service) => (
            <li
              className="closing-trust__badge"
              key={service}
            >
              <span
                className="closing-trust__dot"
                aria-hidden="true"
              />

              {service}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
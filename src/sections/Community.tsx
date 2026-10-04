import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import '../styles/expo-bottom.css'
import './Community.css'

type CapabilityKind = 'apps' | 'ai' | 'integrations' | 'cloud'

const capabilities: {
  kind: CapabilityKind
  title: string
  detail: string
}[] = [
  {
    kind: 'apps',
    title: 'Web & mobile.',
    detail: 'Built around you.',
  },
  {
    kind: 'ai',
    title: 'AI solutions.',
    detail: 'Designed for impact.',
  },
  {
    kind: 'integrations',
    title: 'Connected systems.',
    detail: 'Working together.',
  },
  {
    kind: 'cloud',
    title: 'Cloud foundations.',
    detail: 'Ready to scale.',
  },
]

const services: {
  kind: CapabilityKind
  category: string
  title: string
  description: string
  href: string
}[] = [
  {
    kind: 'apps',
    category: 'Software Development',
    title: 'Build your next product.',
    description:
      'Web and mobile applications shaped around your users, your workflows, and your business goals.',
    href: 'https://www.ascylla.com/services/software-development',
  },
  {
    kind: 'ai',
    category: 'AI Consultancy',
    title: 'Find the right role for AI.',
    description:
      'Explore practical AI opportunities and define a clear direction for bringing them into your business.',
    href: 'https://www.ascylla.com/services/ai-consultancy',
  },
  {
    kind: 'integrations',
    category: 'Integrations',
    title: 'Make your systems work together.',
    description:
      'Connect applications and data through integrations that support your existing business processes.',
    href: 'https://www.ascylla.com/services/integrations',
  },
  {
    kind: 'cloud',
    category: 'Cloud & DevOps',
    title: 'Create a foundation for growth.',
    description:
      'Bring cloud infrastructure, deployment pipelines, and observability into one delivery approach.',
    href: 'https://www.ascylla.com/services/cloud-devops',
  },
  {
    kind: 'integrations',
    category: 'Data Engineering',
    title: 'Turn data into useful insight.',
    description:
      'Build data pipelines and analytics foundations that help your teams make informed decisions.',
    href: 'https://www.ascylla.com/services/data-engineering',
  },
  {
    kind: 'apps',
    category: 'Quality Assurance',
    title: 'Release with confidence.',
    description:
      'Support software quality with test automation, performance testing, and security validation.',
    href: 'https://www.ascylla.com/services/quality-assurance',
  },
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

function CapabilityIcon({ kind }: { kind: CapabilityKind }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {kind === 'apps' && (
        <>
          <rect x="7" y="12" width="42" height="30" rx="5" />
          <path d="M8 21h40M22 42v9m-8 0h21" />
          <rect
            className="capability-icon__moving"
            x="39"
            y="27"
            width="17"
            height="28"
            rx="4"
            fill="var(--capability-surface)"
          />
          <path d="M46 49h3" />
          <circle cx="13" cy="17" r="1" fill="currentColor" />
        </>
      )}

      {kind === 'ai' && (
        <>
          <rect x="19" y="19" width="26" height="26" rx="7" />
          <path
            d="M25 12v7m14-7v7M25 45v7m14-7v7
               M12 25h7m-7 14h7m26-14h7m-7 14h7"
          />
          <path
            className="capability-icon__spark"
            d="m32 25 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Z"
            fill="currentColor"
            stroke="none"
          />
        </>
      )}

      {kind === 'integrations' && (
        <>
          <path
            className="capability-icon__connection"
            d="M17 17h15v30h15M17 47h15V17h15"
            strokeDasharray="4 5"
          />
          <rect x="7" y="7" width="18" height="18" rx="5" />
          <rect x="39" y="7" width="18" height="18" rx="5" />
          <rect x="7" y="39" width="18" height="18" rx="5" />
          <rect x="39" y="39" width="18" height="18" rx="5" />
          <circle cx="32" cy="32" r="4" fill="currentColor" />
        </>
      )}

      {kind === 'cloud' && (
        <>
          <path
            d="M19 43h27a10 10 0 0 0 1-20
               15 15 0 0 0-29-1 11 11 0 0 0 1 21Z"
          />
          <g className="capability-icon__moving">
            <path d="M32 50V30m-7 7 7-7 7 7" />
          </g>
        </>
      )}
    </svg>
  )
}

export default function Community() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let visible = false

    function syncPlayback() {
      root!.dataset.inactive = String(
        !visible || document.hidden,
      )
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    })

    observer.observe(root)
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
      ref={rootRef}
      className="ascylla-community community expo-bottom"
      data-paused={paused}
    >
      <section
        className="community-stats"
        aria-labelledby="ascylla-capabilities-heading"
      >
        <div className="ascylla-community__container expo-bottom__container">
          <div className="ascylla-community__intro">
            <h2
              id="ascylla-capabilities-heading"
              className="ascylla-community__eyebrow"
            >
              Built for your next chapter
            </h2>

            <button
              type="button"
              className="ascylla-community__playback"
              aria-label="Pause capability animations"
              aria-pressed={paused}
              onClick={() => setPaused((current) => !current)}
            >
              <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
              {paused ? 'Resume' : 'Pause'}
            </button>
          </div>

          <ul className="community-stats__list">
            {capabilities.map((capability, index) => (
              <li
                key={capability.kind}
                className="community-stat"
                style={
                  { '--motion-delay': `${index * -0.7}s` } as CSSProperties
                }
              >
                <span className="community-stat__title">
                  {capability.title}
                </span>

                <span
                  className={`community-stat__art community-stat__art--${capability.kind}`}
                  aria-hidden="true"
                >
                  <CapabilityIcon kind={capability.kind} />
                </span>

                <span className="community-stat__detail">
                  {capability.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="community-social"
        aria-labelledby="community-heading"
      >
        <div className="ascylla-community__container expo-bottom__container">
          <div className="community-heading">
            <div className="community-heading__copy">
              <p className="ascylla-community__eyebrow">
                What we can build together
              </p>

              <h2 id="community-heading">
                Your idea. Our expertise.
              </h2>

              <p>
                From the first conversation to your next release,
                <br className="ascylla-community__desktop-break" />
                explore the services that move your project forward.
              </p>
            </div>

            <a
              className="ascylla-community__contact community-discord"
              href="https://www.ascylla.com/contact"
            >
              Talk to Our Team
              <ArrowIcon />
            </a>
          </div>

          <div className="community-wall">
            <ul className="community-wall__columns">
              {services.map((service) => (
                <li className="community-post-wrap" key={service.href}>
                  <a className="community-post" href={service.href}>
                    <span
                      className="ascylla-service__icon"
                      aria-hidden="true"
                    >
                      <CapabilityIcon kind={service.kind} />
                    </span>

                    <span className="ascylla-service__category">
                      {service.category}
                    </span>

                    <h3 className="ascylla-service__title">
                      {service.title}
                    </h3>

                    <p className="ascylla-service__description">
                      {service.description}
                    </p>

                    <span className="ascylla-service__link">
                      Explore Service
                      <ArrowIcon />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
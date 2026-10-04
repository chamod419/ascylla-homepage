import { useEffect, useId, useRef, useState } from 'react'
import './Infrastructure.css'

type FeatureId =
  | 'cloud'
  | 'delivery'
  | 'integrations'
  | 'quality'
  | 'monitoring'
  | 'operations'

type Feature = {
  id: FeatureId
  label: string
  title: [string, string]
  description: string
  href: string
  wide?: boolean
}

const features: Feature[] = [
  {
    id: 'cloud',
    label: 'Cloud foundations',
    title: ['A stronger foundation.', 'Room to grow.'],
    description:
      'Plan infrastructure around your application, with clear environments, dependable configuration, and a path for future growth.',
    href: 'https://www.ascylla.com/services/cloud-devops',
  },
  {
    id: 'delivery',
    label: 'Continuous delivery',
    title: ['From a code change', 'to a confident release.'],
    description:
      'Bring builds, checks, and deployment steps into a repeatable delivery workflow that helps your team release with confidence.',
    href: 'https://www.ascylla.com/services/cloud-devops',
  },
  {
    id: 'integrations',
    label: 'Connected systems',
    title: ['Your tools.', 'Working together.'],
    description:
      'Connect applications, APIs, and business systems so information can move through your organisation with fewer manual handoffs.',
    href: 'https://www.ascylla.com/services/integrations',
    wide: true,
  },
  {
    id: 'quality',
    label: 'Quality assurance',
    title: ['Make quality part', 'of every delivery.'],
    description:
      'Build testing into the development process, identify issues earlier, and validate the experiences that matter to your users.',
    href: 'https://www.ascylla.com/services/quality-assurance',
  },
  {
    id: 'monitoring',
    label: 'Operational visibility',
    title: ['Understand your systems.', 'Respond with context.'],
    description:
      'Bring application signals, logs, and alerts into focus to help your team investigate issues and understand system behaviour.',
    href: 'https://www.ascylla.com/services/cloud-devops',
  },
  {
    id: 'operations',
    label: 'Managed services',
    title: ['Beyond the launch.', 'Ready for what comes next.'],
    description:
      'Keep improving the systems your business depends on with ongoing support, maintenance, and a practical approach to operational change.',
    href: 'https://www.ascylla.com/services/managed-services',
    wide: true,
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function CheckIcon({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="13" className="infra-drawing__check-bg" />
      <path
        d="m-5 0 3 3 7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}

function FeatureArtwork({ stage }: { stage: FeatureId }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')

  return (
    <svg
      className="infra-drawing"
      viewBox="0 0 480 280"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern
          id={`${id}-grid`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="12"
            cy="12"
            r="1"
            fill="var(--infra-edge)"
          />
        </pattern>

        <linearGradient id={`${id}-area`} x2="0" y2="1">
          <stop stopColor="var(--infra-accent)" stopOpacity=".2" />
          <stop offset="1" stopColor="var(--infra-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect
        x="12"
        y="12"
        width="456"
        height="256"
        rx="24"
        fill={`url(#${id}-grid)`}
        opacity=".6"
      />

      {stage === 'cloud' && (
        <>
          <ellipse
            cx="240"
            cy="236"
            rx="136"
            ry="14"
            className="infra-drawing__shadow"
          />

          <g className="infra-motion-float">
            <path
              d="M183 106h117c27 0 43-16 43-37s-17-38-39-38h-5C288 6 254-1 231 18c-17-3-36 9-40 27-22-4-42 11-42 31s14 30 34 30Z"
              transform="translate(0 16)"
              className="infra-drawing__cloud"
            />

            <path
              d="M240 70v26m-9-15 9-11 9 11"
              className="infra-drawing__accent-line"
            />
          </g>

          <path
            d="M240 129v24M160 153h160M160 153v20m80-20v20m80-20v20"
            className="infra-drawing__connection infra-motion-flow"
          />

          {[116, 196, 276].map((x, index) => (
            <g key={x}>
              <rect
                x={x}
                y="173"
                width="88"
                height="54"
                rx="12"
                className="infra-drawing__surface"
              />
              <circle
                cx={x + 18}
                cy="192"
                r="4"
                className="infra-drawing__accent"
              />
              <path
                d={`M${x + 31} 192h37M${x + 17} 208h51`}
                className="infra-drawing__muted-line"
              />
              <text x={x + 44} y="252" textAnchor="middle">
                {['DEV', 'STAGING', 'PROD'][index]}
              </text>
            </g>
          ))}
        </>
      )}

      {stage === 'delivery' && (
        <>
          <rect
            x="46"
            y="46"
            width="388"
            height="188"
            rx="18"
            className="infra-drawing__surface"
          />

          <path d="M46 86h388" className="infra-drawing__divider" />
          <circle cx="66" cy="66" r="3" className="infra-drawing__accent" />
          <text x="80" y="70">RELEASE PIPELINE</text>

          <path
            d="M108 145h264"
            className="infra-drawing__connection infra-motion-flow"
          />

          {[108, 196, 284, 372].map((x, index) => (
            <g key={x}>
              <circle
                cx={x}
                cy="145"
                r="24"
                className="infra-drawing__node"
              />

              <g
                className="infra-motion-check"
                style={{ animationDelay: `${index * 350}ms` }}
              >
                <CheckIcon x={x} y={145} />
              </g>

              <text x={x} y="192" textAnchor="middle">
                {['COMMIT', 'BUILD', 'TEST', 'DEPLOY'][index]}
              </text>
            </g>
          ))}
        </>
      )}

      {stage === 'integrations' && (
        <>
          <path
            d="M111 75h66l63 65M369 75h-66l-63 65M111 205h66l63-65M369 205h-66l-63-65"
            className="infra-drawing__connection infra-motion-flow"
          />

          {[
            { x: 50, y: 49, label: 'CRM' },
            { x: 310, y: 49, label: 'ERP' },
            { x: 50, y: 179, label: 'APIs' },
            { x: 310, y: 179, label: 'DATA' },
          ].map(({ x, y, label }) => (
            <g key={label}>
              <rect
                x={x}
                y={y}
                width="120"
                height="52"
                rx="14"
                className="infra-drawing__surface"
              />
              <text x={x + 60} y={y + 31} textAnchor="middle">
                {label}
              </text>
            </g>
          ))}

          <circle
            cx="240"
            cy="140"
            r="56"
            className="infra-drawing__halo infra-motion-halo"
          />
          <rect
            x="200"
            y="100"
            width="80"
            height="80"
            rx="24"
            className="infra-drawing__node"
          />
          <image
            href="/brand/ascylla-mark-transparent.png"
            x="218"
            y="121"
            width="44"
            height="38"
          />
        </>
      )}

      {stage === 'quality' && (
        <>
          <rect
            x="76"
            y="30"
            width="328"
            height="220"
            rx="18"
            className="infra-drawing__surface"
          />
          <text x="100" y="62">VALIDATION WORKFLOW</text>
          <path d="M76 80h328" className="infra-drawing__divider" />

          {[
            'Application behaviour',
            'API responses',
            'User journeys',
          ].map((label, index) => (
            <g key={label}>
              <rect
                x="94"
                y={95 + index * 46}
                width="292"
                height="36"
                rx="9"
                className="infra-drawing__subtle"
              />

              <text x="109" y={117 + index * 46}>
                {label}
              </text>

              <g
                className="infra-motion-check"
                style={{ animationDelay: `${index * 600}ms` }}
              >
                <CheckIcon x={365} y={113 + index * 46} />
              </g>
            </g>
          ))}
        </>
      )}

      {stage === 'monitoring' && (
        <>
          <rect
            x="46"
            y="38"
            width="388"
            height="204"
            rx="18"
            className="infra-drawing__surface"
          />
          <text x="70" y="69">APPLICATION SIGNALS</text>

          {[109, 148, 187].map((y) => (
            <path
              key={y}
              d={`M70 ${y}h340`}
              className="infra-drawing__divider"
            />
          ))}

          <path
            d="M70 190 109 177 146 187 184 146 222 158 260 118 298 137 336 96 374 110 410 88V219H70Z"
            fill={`url(#${id}-area)`}
          />

          <path
            d="M70 190 109 177 146 187 184 146 222 158 260 118 298 137 336 96 374 110 410 88"
            pathLength="1"
            className="infra-drawing__chart infra-motion-chart"
          />

          <circle
            cx="410"
            cy="88"
            r="5"
            className="infra-drawing__accent infra-motion-check"
          />

          <text x="70" y="231">LOGS · METRICS · ALERTS</text>
        </>
      )}

      {stage === 'operations' && (
        <>
          <ellipse
            cx="240"
            cy="140"
            rx="167"
            ry="90"
            className="infra-drawing__connection infra-motion-flow"
          />

          <circle
            cx="240"
            cy="140"
            r="65"
            className="infra-drawing__halo"
          />

          <g className="infra-motion-float">
            <path
              d="m240 86 42 17v37c0 29-21 47-42 57-21-10-42-28-42-57v-37Z"
              className="infra-drawing__cloud"
            />
            <path
              d="m221 140 13 13 25-28"
              className="infra-drawing__accent-line"
            />
          </g>

          {[
            { x: 52, y: 67, label: 'SUPPORT' },
            { x: 310, y: 67, label: 'MAINTAIN' },
            { x: 52, y: 180, label: 'REVIEW' },
            { x: 310, y: 180, label: 'IMPROVE' },
          ].map(({ x, y, label }) => (
            <g key={label}>
              <rect
                x={x}
                y={y}
                width="118"
                height="38"
                rx="12"
                className="infra-drawing__surface"
              />
              <text x={x + 59} y={y + 24} textAnchor="middle">
                {label}
              </text>
            </g>
          ))}
        </>
      )}
    </svg>
  )
}

function FeatureCard({
  feature,
  playing,
}: {
  feature: Feature
  playing: boolean
}) {
  const rootRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    )

    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  return (
    <article
      ref={rootRef}
      className={[
        'ascylla-infra-card',
        'infra-card',
        `infra-card--${feature.id}`,
        feature.wide ? 'infra-card--wide' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-running={playing && visible}
    >
      <div className="infra-art">
        <FeatureArtwork stage={feature.id} />
      </div>

      <div className="infra-card__copy">
        <span className="infra-card__eyebrow">{feature.label}</span>

        <h3>
          <span>{feature.title[0]}</span>
          <span>{feature.title[1]}</span>
        </h3>

        <p>{feature.description}</p>

        <a className="infra-card__link" href={feature.href}>
          Explore the service
          <ArrowIcon />
          <span className="infrastructure__sr">
            : {feature.label}
          </span>
        </a>
      </div>
    </article>
  )
}

export default function Infrastructure() {
  const headingId = useId()
  const [paused, setPaused] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const preference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    function syncVisibility() {
      setPageVisible(!document.hidden)
    }

    function syncPreference() {
      setReducedMotion(preference.matches)
    }

    syncVisibility()
    syncPreference()

    document.addEventListener('visibilitychange', syncVisibility)
    preference.addEventListener('change', syncPreference)

    return () => {
      document.removeEventListener('visibilitychange', syncVisibility)
      preference.removeEventListener('change', syncPreference)
    }
  }, [])

  const playing = !paused && pageVisible && !reducedMotion

  return (
    <section
      className="ascylla-infrastructure infrastructure"
      aria-labelledby={headingId}
    >
      <div className="page-container infrastructure__container">
        <header className="infrastructure__header">
          <span className="infrastructure__eyebrow">
            Cloud, delivery & operations
          </span>

          <h2 id={headingId}>
            Built to launch.
            <br />
            Supported to grow.
          </h2>

          <p className="infrastructure__intro">
            Connect development and operations with foundations
            designed around your applications and your team.
          </p>

          <ul
            className="infrastructure__technologies"
            aria-label="Service areas"
          >
            {['Cloud', 'CI/CD', 'Integrations', 'Quality', 'Operations'].map(
              (name) => <li key={name}>{name}</li>,
            )}
          </ul>

          <div className="infrastructure__actions">
            <a
              className="infrastructure__button"
              href="https://www.ascylla.com/contact"
            >
              Discuss your infrastructure
              <ArrowIcon />
            </a>

            <button
              type="button"
              className="infrastructure__playback"
              aria-label="Pause infrastructure animations"
              aria-pressed={paused}
              disabled={reducedMotion}
              onClick={() => setPaused((current) => !current)}
            >
              <span aria-hidden="true">
                {paused ? '▶' : 'Ⅱ'}
              </span>
              {paused ? 'Resume motion' : 'Pause motion'}
            </button>
          </div>
        </header>

        <div className="infrastructure__grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              playing={playing}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
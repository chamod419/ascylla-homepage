import { useEffect, useRef, useState } from 'react'
import './TrustedApps.css'

const ICON_BASE =
  'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons'

const technologies = [
  { name: 'React', icon: 'react/react-original.svg' },
  {
    name: 'TypeScript',
    icon: 'typescript/typescript-original.svg',
  },
  { name: 'Node.js', icon: 'nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'python/python-original.svg' },
  {
    name: 'AWS',
    icon: 'amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  { name: 'Azure', icon: 'azure/azure-original.svg' },
  {
    name: 'Google Cloud',
    icon: 'googlecloud/googlecloud-original.svg',
  },
  { name: 'Docker', icon: 'docker/docker-original.svg' },
  {
    name: 'Kubernetes',
    icon: 'kubernetes/kubernetes-original.svg',
  },
  {
    name: 'PostgreSQL',
    icon: 'postgresql/postgresql-original.svg',
  },
  { name: 'MongoDB', icon: 'mongodb/mongodb-original.svg' },
]

export default function TrustedApps() {
  const sectionRef = useRef<HTMLElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let visible = true

    function syncPlayback() {
      section!.dataset.inactive = String(
        !visible || document.hidden,
      )
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    })

    observer.observe(section)
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
    <section
      ref={sectionRef}
      className="ascylla-technologies trusted-apps"
      aria-labelledby="trusted-apps-heading"
      data-paused={paused}
    >
      <div className="trusted-apps__header">
        <h2
          id="trusted-apps-heading"
          className="trusted-apps__heading"
        >
          Technologies we work with
        </h2>

        <button
          type="button"
          className="trusted-apps__toggle"
          aria-label="Pause technology animation"
          aria-pressed={paused}
          aria-controls="technology-track"
          onClick={() => setPaused((current) => !current)}
        >
          <svg
            width="14"
            height="14"
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

          <span>{paused ? 'Resume' : 'Pause'}</span>
        </button>
      </div>

      <div className="trusted-apps__viewport">
        <div
          id="technology-track"
          className="trusted-apps__track"
        >
          {[0, 1].map((copy) => (
            <ul
              className="trusted-apps__group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {technologies.map((technology) => (
                <li
                  className="trusted-apps__item"
                  key={technology.name}
                >
                  <span className="trusted-apps__icon-wrap">
                    <img
                      className="trusted-apps__icon"
                      src={`${ICON_BASE}/${technology.icon}`}
                      alt=""
                      width="28"
                      height="28"
                      draggable={false}
                      decoding="async"
                    />
                  </span>

                  <span className="trusted-apps__name">
                    {technology.name}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
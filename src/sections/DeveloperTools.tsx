import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import './DeveloperTools.css'

function Arrow() {
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

function ProductLink({ children }: { children: string }) {
  return (
    <span className="ascylla-product__link">
      {children}
      <Arrow />
    </span>
  )
}

export default function DeveloperTools() {
  const sectionRef = useRef<HTMLElement>(null)
  const [available, setAvailable] = useState(false)
  const [paused, setPaused] = useState(false)

  const running = available && !paused

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const motion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    let visible = false

    function update() {
      setAvailable(
        visible && !document.hidden && !motion.matches,
      )
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      update()
    })

    observer.observe(section)
    document.addEventListener('visibilitychange', update)
    motion.addEventListener('change', update)
    update()

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
      motion.removeEventListener('change', update)
    }
  }, [])

  function moveHighlight(event: PointerEvent<HTMLAnchorElement>) {
    if (!running || event.pointerType === 'touch') return

    const bounds = event.currentTarget.getBoundingClientRect()

    const x = Math.max(
      0,
      Math.min(100, ((event.clientX - bounds.left) / bounds.width) * 100),
    )

    const y = Math.max(
      0,
      Math.min(100, ((event.clientY - bounds.top) / bounds.height) * 100),
    )

    event.currentTarget.style.setProperty('--pointer-x', `${x}%`)
    event.currentTarget.style.setProperty('--pointer-y', `${y}%`)
  }

  function clearHighlight(event: PointerEvent<HTMLAnchorElement>) {
    event.currentTarget.style.removeProperty('--pointer-x')
    event.currentTarget.style.removeProperty('--pointer-y')
  }

  return (
    <section
      ref={sectionRef}
      className="ascylla-products developer-tools"
      aria-labelledby="ascylla-products-heading"
      data-running={running}
    >
      <div className="ascylla-products__container page-container">
        <div className="ascylla-products__heading">
          <div>
            <p className="ascylla-products__eyebrow">
              Our products
            </p>

            <h2 id="ascylla-products-heading">
              The foundations.
              <br />
              For your next big idea.
            </h2>

            <p className="ascylla-products__description">
              Explore products for building applications,
              supporting customers, and connecting experiences.
            </p>
          </div>

          <button
            type="button"
            className="ascylla-products__playback"
            aria-label="Pause product animations"
            aria-pressed={paused}
            onClick={() => setPaused((current) => !current)}
          >
            <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
            {paused ? 'Resume' : 'Pause'}
          </button>
        </div>

        <div className="dev-grid">
          <a
            className="ascylla-product ascylla-product--core dev-card dev-sdk"
            href="https://www.ascylla.com/products/ascylla-core"
            onPointerMove={moveHighlight}
            onPointerLeave={clearHighlight}
            onPointerCancel={clearHighlight}
          >
            <div
              className="ascylla-core-art"
              aria-hidden="true"
            >
              <span className="ascylla-core-art__orbit" />
              <span className="ascylla-core-art__orbit ascylla-core-art__orbit--inner" />

              <span className="ascylla-core-art__mark">
                <span />
              </span>

              <span className="ascylla-core-art__label ascylla-core-art__label--api">
                APIs
              </span>

              <span className="ascylla-core-art__label ascylla-core-art__label--auth">
                Identity
              </span>

              <span className="ascylla-core-art__label ascylla-core-art__label--flow">
                Workflows
              </span>
            </div>

            <div className="ascylla-product__copy dev-sdk__content">
              <p className="ascylla-product__eyebrow">
                Application foundation
              </p>

              <h3>Ascylla Core</h3>

              <p className="ascylla-product__description">
                A configurable foundation for your applications.
                Bring identity, entity management, APIs, and
                workflows together.
              </p>

              <ProductLink>Explore Ascylla Core</ProductLink>
            </div>
          </a>

          <div className="dev-grid__right">
            <a
              className="ascylla-product ascylla-product--csm dev-card dev-ai"
              href="https://www.ascylla.com/products/csm"
            >
              <div className="ascylla-csm-art" aria-hidden="true">
                <div className="ascylla-csm-art__window">
                  <div className="ascylla-csm-art__toolbar">
                    <span />
                    <span />
                    <span />
                    <strong>Customer care</strong>
                  </div>

                  <div className="ascylla-csm-art__row">
                    <span className="ascylla-csm-art__avatar">?</span>
                    <div>
                      <span className="ascylla-csm-art__line" />
                      <span className="ascylla-csm-art__line ascylla-csm-art__line--short" />
                    </div>
                    <span className="ascylla-csm-art__dot" />
                  </div>

                  <div className="ascylla-csm-art__row">
                    <span className="ascylla-csm-art__avatar">↗</span>
                    <div>
                      <span className="ascylla-csm-art__line" />
                      <span className="ascylla-csm-art__line ascylla-csm-art__line--short" />
                    </div>
                    <span className="ascylla-csm-art__dot" />
                  </div>

                  <span className="ascylla-csm-art__reply">
                    Let’s help you move forward.
                  </span>
                </div>
              </div>

              <div className="ascylla-product__copy">
                <p className="ascylla-product__eyebrow">
                  Customer service management
                </p>

                <h3>Ascylla CSM</h3>

                <p className="ascylla-product__description">
                  Organize customer interactions and support
                  workflows with a headless-first approach.
                </p>

                <ProductLink>Explore Ascylla CSM</ProductLink>
              </div>
            </a>

            <a
              className="ascylla-product ascylla-product--portal dev-card dev-native"
              href="https://www.ascylla.com/products/connected-portal"
            >
              <div className="ascylla-portal-art" aria-hidden="true">
                <svg
                  className="ascylla-portal-art__paths"
                  viewBox="0 0 300 180"
                  fill="none"
                >
                  <path d="M55 40H100Q115 40 115 55V75Q115 90 135 90H150" />
                  <path d="M245 40H200Q185 40 185 55V75Q185 90 165 90H150" />
                  <path d="M55 140H100Q115 140 115 125V105Q115 90 135 90H150" />
                  <path d="M245 140H200Q185 140 185 125V105Q185 90 165 90H150" />
                </svg>

                <span className="ascylla-portal-art__hub">
                  <img
                    src="/brand/ascylla-mark-transparent.png"
                    width="34"
                    height="30"
                    alt=""
                    loading="lazy"
                  />
                </span>

                <span className="ascylla-portal-art__node ascylla-portal-art__node--one">
                  CRM
                </span>
                <span className="ascylla-portal-art__node ascylla-portal-art__node--two">
                  ERP
                </span>
                <span className="ascylla-portal-art__node ascylla-portal-art__node--three">
                  Support
                </span>
                <span className="ascylla-portal-art__node ascylla-portal-art__node--four">
                  Data
                </span>
              </div>

              <div className="ascylla-product__copy">
                <p className="ascylla-product__eyebrow">
                  Connected customer experiences
                </p>

                <h3>Connected Portal</h3>

                <p className="ascylla-product__description">
                  Bring customer-facing experiences and enterprise
                  integrations into a connected portal.
                </p>

                <ProductLink>Explore Connected Portal</ProductLink>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
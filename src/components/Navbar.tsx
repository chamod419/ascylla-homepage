import { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import AscyllaLogo from './AscyllaLogo'

const ASCYLLA_URL = 'https://www.ascylla.com'

const productLinks = [
  {
    label: 'Ascylla Core',
    href: `${ASCYLLA_URL}/products/ascylla-core`,
  },
  {
    label: 'Ascylla CSM',
    href: `${ASCYLLA_URL}/products/csm`,
  },
  {
    label: 'Ascylla Connected Portal',
    href: `${ASCYLLA_URL}/products/connected-portal`,
  },
]

const serviceLinks = [
  {
    label: 'Software Development',
    href: `${ASCYLLA_URL}/services/software-development`,
  },
  {
    label: 'Integrations',
    href: `${ASCYLLA_URL}/services/integrations`,
  },
  {
    label: 'Managed Services',
    href: `${ASCYLLA_URL}/services/managed-services`,
  },
  {
    label: 'Consultancy',
    href: `${ASCYLLA_URL}/services/consultancy`,
  },
  {
    label: 'AI Consultancy',
    href: `${ASCYLLA_URL}/services/ai-consultancy`,
  },
  {
    label: 'AI-Assisted Development',
    href: `${ASCYLLA_URL}/services/ai-assisted-development`,
  },
  {
    label: 'Cloud & DevOps',
    href: `${ASCYLLA_URL}/services/cloud-devops`,
  },
  {
    label: 'Data Engineering & Analytics',
    href: `${ASCYLLA_URL}/services/data-engineering`,
  },
  {
    label: 'Quality Assurance & Testing',
    href: `${ASCYLLA_URL}/services/quality-assurance`,
  },
]

const dropdowns = [
  {
    name: 'products',
    label: 'Products',
    links: productLinks,
  },
  {
    name: 'services',
    label: 'Services',
    links: serviceLinks,
  },
] as const

type DropdownName = (typeof dropdowns)[number]['name']

function ChevronIcon() {
  return (
    <svg
      className="navbar-chevron"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] =
    useState<DropdownName | null>(null)

  const headerRef = useRef<HTMLElement>(null)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setActiveDropdown(null)
        setMobileOpen(false)
      }
    }

    document.addEventListener('pointerdown', handleOutsideClick)

    return () => {
      document.removeEventListener('pointerdown', handleOutsideClick)
    }
  }, [])

  function toggleDropdown(name: DropdownName) {
    setActiveDropdown((current) => (current === name ? null : name))
  }

  function closeMenus() {
    setActiveDropdown(null)
    setMobileOpen(false)
  }

  return (
    <header
      className="navbar"
      ref={headerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          closeMenus()
        }
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Escape') return

        if (activeDropdown) {
          event.preventDefault()
          event.stopPropagation()

          const trigger =
            headerRef.current?.querySelector<HTMLButtonElement>(
              `[aria-controls="${activeDropdown}-links"]`,
            )

          setActiveDropdown(null)
          trigger?.focus()
        } else if (mobileOpen) {
          event.preventDefault()
          setMobileOpen(false)
          mobileButtonRef.current?.focus()
        }
      }}
    >
      <div className="navbar-inner">
        <AscyllaLogo />

        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={`navbar-menu ${mobileOpen ? 'is-open' : ''}`}
        >
          <div className="navbar-links">
            {dropdowns.map((dropdown) => {
              const isOpen = activeDropdown === dropdown.name

              return (
                <div
                  key={dropdown.name}
                  className="navbar-dropdown"
                  onBlur={(event) => {
                    if (
                      !event.currentTarget.contains(event.relatedTarget)
                    ) {
                      setActiveDropdown((current) =>
                        current === dropdown.name ? null : current,
                      )
                    }
                  }}
                >
                  <button
                    id={`${dropdown.name}-trigger`}
                    type="button"
                    className="navbar-dropdown-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`${dropdown.name}-links`}
                    onClick={() => toggleDropdown(dropdown.name)}
                  >
                    {dropdown.label}
                    <ChevronIcon />
                  </button>

                  <div
                    id={`${dropdown.name}-links`}
                    className="navbar-dropdown-panel"
                    aria-labelledby={`${dropdown.name}-trigger`}
                    hidden={!isOpen}
                  >
                    {dropdown.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={closeMenus}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            })}

            <a
              href={`${ASCYLLA_URL}/about`}
              onClick={closeMenus}
            >
              About
            </a>

            <a
              href={`${ASCYLLA_URL}/blog`}
              onClick={closeMenus}
            >
              Insights
            </a>
          </div>

          <div className="navbar-actions">
            <a
              className="navbar-button navbar-signup navbar-contact"
              href={`${ASCYLLA_URL}/contact`}
              onClick={closeMenus}
            >
              Contact Us
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </nav>

        <button
          ref={mobileButtonRef}
          type="button"
          className="navbar-mobile-toggle"
          aria-label={
            mobileOpen ? 'Close navigation' : 'Open navigation'
          }
          aria-expanded={mobileOpen}
          aria-controls="main-navigation"
          onClick={() => {
            setMobileOpen((current) => !current)
            setActiveDropdown(null)
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d={
                mobileOpen
                  ? 'M6 6l12 12M18 6 6 18'
                  : 'M4 6h16M4 12h16M4 18h16'
              }
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Navbar
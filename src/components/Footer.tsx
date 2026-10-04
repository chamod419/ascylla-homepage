import FooterLogo from './FooterLogo'
import ThemeSelector from './ThemeSelector'
import '../styles/expo-bottom.css'
import './Footer.css'

const ASCYLLA_URL = 'https://www.ascylla.com'

type FooterLink = {
  label: string
  href: string
}

type FooterGroup = {
  title: string
  links: FooterLink[]
}

const groups: FooterGroup[] = [
  {
    title: 'Products',
    links: [
      {
        label: 'Ascylla Core',
        href: `${ASCYLLA_URL}/products/ascylla-core`,
      },
      {
        label: 'Ascylla CSM',
        href: `${ASCYLLA_URL}/products/csm`,
      },
      {
        label: 'Connected Portal',
        href: `${ASCYLLA_URL}/products/connected-portal`,
      },
    ],
  },
  {
    title: 'Services',
    links: [
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
    ],
  },
  {
    title: 'Company',
    links: [
      {
        label: 'Home',
        href: '/',
      },
      {
        label: 'About Ascylla',
        href: `${ASCYLLA_URL}/about`,
      },
      {
        label: 'Insights',
        href: `${ASCYLLA_URL}/blog`,
      },
      {
        label: 'Contact Us',
        href: `${ASCYLLA_URL}/contact`,
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        label: 'Privacy Policy',
        href: `${ASCYLLA_URL}/privacy`,
      },
      {
        label: 'Terms of Service',
        href: `${ASCYLLA_URL}/terms`,
      },
      {
        label: 'Legal Notice',
        href: `${ASCYLLA_URL}/legal`,
      },
    ],
  },
]

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
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

export default function Footer() {
  return (
    <footer className="ascylla-footer site-footer expo-bottom">
      <div className="ascylla-footer__container expo-bottom__container">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <FooterLogo />

            <p className="ascylla-footer__description">
              Software for your next chapter. Web, mobile, AI,
              cloud, and integrations—built around your business.
            </p>

            <div className="site-footer__newsletter">
              <div>
                <p className="site-footer__eyebrow">
                  <span aria-hidden="true" />
                  Let’s work together
                </p>

                <p className="site-footer__newsletter-copy">
                  Have an idea? Let’s bring it to life.
                </p>
              </div>

              <a
                className="site-footer__updates"
                href={`${ASCYLLA_URL}/contact`}
              >
                Discuss Your Project
                <ArrowIcon />
              </a>
            </div>
          </div>

          <nav
            className="site-footer__groups"
            aria-label="Ascylla footer navigation"
          >
            {groups.map((group) => (
              <div
                className="ascylla-footer__group"
                key={group.title}
              >
                <h3>{group.title}</h3>

                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__legal">
            <p className="site-footer__copyright">
              © {new Date().getFullYear()} Ascylla.
              All rights reserved.
            </p>
          </div>

          <div className="ascylla-footer__utilities">
            <a
              className="ascylla-footer__email"
              href="mailto:sales@ascylla.com"
            >
              sales@ascylla.com
              <ArrowIcon />
            </a>

            <div className="ascylla-footer__theme">
              <ThemeSelector />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
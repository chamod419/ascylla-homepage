import HeroAnimation from '../components/HeroAnimation'
import './Hero.css'

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
        d="M4 12h15M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Hero() {
  return (
    <section
      className="ascylla-hero hero"
      aria-labelledby="hero-title"
    >
      <div className="hero-copy">
        <p className="ascylla-hero-eyebrow">
          Ideas into impact
        </p>

        <h1 id="hero-title" className="hero-title">
          Build what’s next.
          <span className="ascylla-hero-accent">
            With Ascylla.
          </span>
        </h1>

        <div className="hero-actions">
          <a
            className="hero-button hero-button-primary"
            href="https://www.ascylla.com/contact"
          >
            Discuss Your Project
            <ArrowIcon />
          </a>

          <a
            className="hero-button hero-button-secondary"
            href="https://www.ascylla.com/services/software-development"
          >
            Explore Our Services
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <HeroAnimation />
      </div>

      <div className="hero-details">
        <a
          className="hero-announcement"
          href="https://www.ascylla.com/services/ai-consultancy"
        >
          <span className="hero-announcement-badge">
            <span className="ascylla-hero-spark" aria-hidden="true">
              ✦
            </span>
            AI
          </span>

          <span>Explore AI Consultancy</span>

          <ArrowIcon />
        </a>

        <p className="hero-description">
          From web and mobile applications to AI, cloud, and
          enterprise integrations, we help turn your ideas into
          software that scales.
        </p>

        <a
          className="ascylla-hero-about"
          href="https://www.ascylla.com/about"
        >
          Meet Ascylla
          <ArrowIcon />
        </a>
      </div>
    </section>
  )
}

export default Hero
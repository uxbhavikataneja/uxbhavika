import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlassFolder from '../../components/Folder/Folder.jsx'
import './ProjectsIntro.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Workly AI',
    tag: 'UX / AI Dashboard',
    description: 'An AI-first task manager designed to reduce cognitive load.',
    thumbColor:
      'linear-gradient(135deg, rgba(200, 140, 200, 0.5), rgba(160, 100, 180, 0.5))',
    icon: '01',
  },
  {
    title: 'Inara Skin',
    tag: 'Product Design',
    description: 'AI-backed skincare routines with a softer shopping flow.',
    thumbColor:
      'linear-gradient(135deg, rgba(240, 180, 200, 0.5), rgba(200, 140, 180, 0.5))',
    icon: '02',
  },
  {
    title: 'Stepsave',
    tag: 'Concept App',
    description: 'A playful finance app for kids, chores, and tiny wins.',
    thumbColor:
      'linear-gradient(135deg, rgba(180, 160, 220, 0.5), rgba(140, 120, 200, 0.5))',
    icon: '03',
  },
]

const cardFinalPositions = [
  { x: -320, y: -40, rotate: -12, scale: 1 },
  { x: 320, y: -60, rotate: 10, scale: 1 },
  { x: 0, y: -300, rotate: 3, scale: 1.05 },
]

const mobileCardFinalPositions = [
  { x: -82, y: -228, rotate: -10, scale: 0.82 },
  { x: 82, y: -190, rotate: 9, scale: 0.82 },
  { x: 0, y: -292, rotate: 2, scale: 0.86 },
]

export default function ProjectsIntro() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = Array.from(
        sectionRef.current.querySelectorAll('.glass-project-card'),
      )
      const mm = gsap.matchMedia()

      mm.add('(min-width: 769px)', () => {
        createPinnedTimeline(cards, cardFinalPositions)
      })

      mm.add('(max-width: 768px)', () => {
        createPinnedTimeline(cards, mobileCardFinalPositions)
      })

      return () => mm.revert()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const createPinnedTimeline = (cards, positions) => {
    const totalScrollDistance = window.innerHeight * (cards.length + 1.5)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: `+=${totalScrollDistance}`,
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    cards.forEach((card, index) => {
      const position = positions[index]

      tl.to(
        card,
        {
          opacity: 1,
          x: position.x,
          y: position.y,
          rotate: position.rotate,
          scale: position.scale,
          duration: 0.6,
          ease: 'power3.out',
        },
        index * 0.3,
      )
    })
  }

  return (
    <section
      ref={sectionRef}
      className="projects-intro-section"
      id="projects-intro"
    >
      <div className="projects-intro-glow projects-intro-glow-one" />
      <div className="projects-intro-glow projects-intro-glow-two" />

      <div className="projects-intro-pin-wrap">
        <div className="projects-intro-text">
          <span className="projects-intro-eyebrow">&#10022; Selected Work</span>
          <h2 className="projects-intro-heading">
            Projects that
            <br />
            <em>actually ship.</em>
          </h2>
          <p className="projects-intro-sub">
            A few things I&apos;ve built, designed, and obsessed over.
          </p>
          <Link to="/projects" className="projects-intro-cta">
            View All Projects &#8594;
          </Link>
        </div>

        <div className="projects-intro-visual">
          <GlassFolder cards={projects} />
        </div>
      </div>
    </section>
  )
}

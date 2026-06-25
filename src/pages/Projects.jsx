import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectCard from '../components/ProjectCard.jsx'
import { projects } from '../data/projects.js'

gsap.registerPlugin(ScrollTrigger)

const filters = ['All', 'App Design', 'Dashboard', 'Gov UX', 'Concept']

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const pageRef = useRef(null)
  const gridRef = useRef(null)

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects
    }

    return projects.filter((project) => project.tags.includes(activeFilter))
  }, [activeFilter])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.projects-page-card', { opacity: 0, y: 80, rotateX: 8 })

      gsap.to('.projects-page-card', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          end: 'top 40%',
          scrub: false,
          once: true,
        },
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen overflow-hidden bg-[var(--color-bg)] pb-24"
    >
      <div className="projects-ambient projects-ambient-blush" />
      <div className="projects-ambient projects-ambient-purple" />

      <motion.header
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="relative z-10 flex min-h-[35vh] flex-col items-center justify-end px-6 pb-16 pt-32 text-center"
      >
        <p className="mb-5 inline-flex rounded-full border border-[rgba(242,196,206,0.5)] bg-[rgba(242,196,206,0.1)] px-4 py-[0.35rem] text-xs uppercase tracking-[0.15em] text-[var(--color-blush)]">
          All Work
        </p>
        <h1 className="font-display text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-tight text-[var(--color-cream)]">
          Every project, every story.
        </h1>
        <p className="mx-auto mt-5 max-w-[560px] text-[rgba(240,236,228,0.68)]">
          6 projects across product design, gov UX, and passion work.
        </p>
      </motion.header>

      <section className="relative z-10 px-[clamp(1.5rem,6vw,6rem)]">
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-[var(--color-blush)] bg-[var(--color-blush)] text-[#1a1a1a]'
                    : 'border-[rgba(242,196,206,0.35)] bg-transparent text-[var(--color-blush)] hover:border-[var(--color-blush)] hover:text-[var(--color-cream)]'
                }`}
              >
                {filter}
              </button>
            )
          })}
        </div>

        <motion.div
          ref={gridRef}
          layout
          className="grid gap-6 [perspective:1000px] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="projects-page-card"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  )
}

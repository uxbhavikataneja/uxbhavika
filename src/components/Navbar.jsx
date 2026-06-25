import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { NavLink } from 'react-router-dom'
import { useSplash } from '../context/splash.js'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const navVariants = {
  hidden: { y: -80 },
  visible: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 20,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
}

export default function Navbar() {
  const { splashDone } = useSplash()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 60)

    updateScrolled()
    window.addEventListener('scroll', updateScrolled, { passive: true })

    return () => window.removeEventListener('scroll', updateScrolled)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate={splashDone ? 'visible' : 'hidden'}
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300 ${
          isScrolled
            ? 'border-white/10 bg-[rgba(13,13,13,0.7)] backdrop-blur-[16px]'
            : 'border-transparent bg-transparent'
        }`}
      >
        <nav className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <motion.div variants={itemVariants}>
            <NavLink
              to="/"
              className="nav-logo font-display text-2xl text-[var(--color-cream)]"
              onClick={closeMenu}
            >
              Bhavika.
            </NavLink>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center gap-8 text-sm text-[var(--color-muted)] md:flex"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="hidden justify-end md:flex"
          >
            <a
              href="/cv-placeholder.pdf"
              download
              className="rounded-full border-[1.5px] border-[var(--color-cream)] px-5 py-2 text-sm font-medium text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-bg)]"
            >
              Download CV
            </a>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="button"
            className="relative ml-auto h-10 w-10 md:hidden"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span
              className={`absolute left-2 top-[14px] h-px w-6 bg-[var(--color-cream)] transition-transform ${
                isMenuOpen ? 'translate-y-[5px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-2 top-[24px] h-px w-6 bg-[var(--color-cream)] transition-transform ${
                isMenuOpen ? '-translate-y-[5px] -rotate-45' : ''
              }`}
            />
          </motion.button>
        </nav>
      </motion.header>

      <motion.div
        initial={false}
        animate={isMenuOpen ? 'open' : 'closed'}
        variants={{
          open: {
            x: 0,
            transition: { type: 'spring', stiffness: 120, damping: 22 },
          },
          closed: {
            x: '100%',
            transition: { type: 'spring', stiffness: 140, damping: 24 },
          },
        }}
        className="fixed inset-0 z-[90] flex flex-col justify-center bg-[var(--color-bg)] px-8 md:hidden"
      >
        <div className="flex flex-col gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `font-display text-5xl ${
                  isActive
                    ? 'text-[var(--color-butter)]'
                    : 'text-[var(--color-cream)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <a
            href="/cv-placeholder.pdf"
            download
            onClick={closeMenu}
            className="mt-4 inline-flex w-fit rounded-full border-[1.5px] border-[var(--color-cream)] px-6 py-3 text-sm font-medium text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-bg)]"
          >
            Download CV
          </a>
        </div>
      </motion.div>
    </>
  )
}

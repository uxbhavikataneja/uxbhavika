import { motion, useScroll, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'

const words = ['Designing', 'things', 'people', 'actually']

const headingVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const wordVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function Hero() {
  const { scrollY } = useScroll()
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 80], [1, 0])

  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src="/src/assets/hero-bg.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div className="absolute inset-0 z-[1] bg-[linear-gradient(135deg,rgba(242,196,206,0.35)_0%,rgba(20,10,30,0.55)_50%,rgba(242,196,206,0.2)_100%)]" />
      <div className="absolute inset-0 z-[1] backdrop-blur-[1px]" />

      <div className="hero-blob hero-blob-one" />
      <div className="hero-blob hero-blob-two" />

      <div className="relative z-10 flex min-h-screen items-end px-[clamp(2rem,8vw,8rem)] pb-[12vh] pt-32 md:pb-[14vh]">
        <div className="max-w-4xl text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            className="mb-5 inline-flex rounded-full border border-[rgba(242,196,206,0.5)] bg-[rgba(242,196,206,0.1)] px-4 py-[0.35rem] text-xs uppercase tracking-[0.15em] text-[var(--color-blush)]"
          >
            Available for work
          </motion.p>

          <motion.h1
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-[clamp(2rem,9vw,3.2rem)] font-semibold leading-[1.1] text-[var(--color-cream)] md:text-[clamp(2.8rem,7vw,6.5rem)]"
          >
            <span className="block">
              {words.slice(0, 2).map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className="mr-[0.22em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block">
              {words.slice(2).map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariants}
                  className="mr-[0.22em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                variants={wordVariants}
                className="inline-block italic text-[var(--color-blush)]"
              >
                feel.
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, ease: 'easeOut' }}
            className="mx-auto mt-6 max-w-[480px] text-[clamp(0.95rem,1.8vw,1.15rem)] text-[rgba(240,236,228,0.7)] md:mx-0"
          >
            UX/UI Designer who blends research-backed thinking with visuals
            that hit different.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
            className="mt-8 flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:items-start"
          >
            <motion.div
              whileHover={{ scale: 1.04, filter: 'brightness(1.08)' }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            >
              <Link
                to="/projects"
                className="inline-flex rounded-full bg-[var(--color-blush)] px-8 py-3 font-medium text-[#1a1a1a]"
              >
                View My Work
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            >
              <Link
                to="/contact"
                className="inline-flex rounded-full border-[1.5px] border-[rgba(240,236,228,0.4)] px-8 py-3 font-medium text-[var(--color-cream)] transition-colors hover:border-[var(--color-blush)] hover:text-[var(--color-blush)]"
              >
                Let&apos;s Talk &#8594;
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.2em] text-[rgba(240,236,228,0.4)]">
          scroll
        </span>
        <span className="hero-scroll-line" />
      </motion.div>
    </section>
  )
}

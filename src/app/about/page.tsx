'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import LanyardClient from '@/components/ui/LanyardClient'

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: 'easeOut' },
  },
}

export default function AboutPage() {
  return (
    <div className="bg-[#0a0a0f]">
      <section className="grid min-h-screen grid-cols-1 overflow-hidden px-6 py-24 md:grid-cols-2 md:px-12 lg:px-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="flex flex-col justify-center"
        >
          <motion.p
            variants={item}
            className="mb-6 text-xs font-medium uppercase tracking-[0.34em] text-[var(--color-muted)]"
          >
            About Me
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-[48px] font-semibold leading-[0.95] text-white md:text-[clamp(56px,6vw,72px)]"
          >
            <span className="block">Designing</span>
            <span className="block">with purpose</span>
            <span className="block bg-gradient-to-r from-[var(--color-violet)] via-[var(--color-pink)] to-[var(--color-sky)] bg-clip-text italic text-transparent">
              &amp; curiosity.
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-[480px] text-base leading-7 text-white/65"
          >
            I&apos;m Ayush, a Product Designer based in New Delhi with
            experience building digital products that are as functional as they
            are beautiful. I think in systems, design in details, and obsess
            over the gap between good and great.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap gap-3"
          >
            <span className="rounded-full border border-white/10 bg-[var(--color-surface)] px-5 py-3 text-sm font-medium text-white">
              3+ Years Experience
            </span>
            <span className="rounded-full border border-white/10 bg-[var(--color-surface)] px-5 py-3 text-sm font-medium text-white">
              20+ Projects Shipped
            </span>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              href="/projects"
              className="rounded-full bg-[var(--color-violet)] px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              View My Work
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white"
            >
              Download Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.25 }}
          className="relative mt-12 min-h-[600px] md:mt-0"
        >
          <div className="absolute inset-10 rounded-full bg-[radial-gradient(circle,rgba(123,47,247,0.15)_0%,transparent_68%)] blur-3xl" />
          <div className="relative h-full min-h-[600px]">
            <LanyardClient
              position={[0, 0, 22]}
              gravity={[0, -40, 0]}
              frontImage="/assets/lanyard/card-front.png"
              backImage="/assets/lanyard/card-back.png"
              lanyardWidth={1.2}
            />
          </div>
        </motion.div>
      </section>

      <div id="about-content">
        {/* Freeform canvas section goes here */}
      </div>
    </div>
  )
}

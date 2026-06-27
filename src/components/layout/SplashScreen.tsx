'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type SplashScreenProps = {
  onComplete?: () => void
}

const subtitle = 'Product Designer'

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true)
    }, 2800)

    return () => window.clearTimeout(exitTimer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: isExiting ? 0.5 : 0, ease: 'easeOut' }}
      onAnimationComplete={() => {
        if (isExiting) {
          onComplete?.()
        }
      }}
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#0a0a0f]"
      aria-label="Loading portfolio"
    >
      <motion.div
        className="absolute h-[34vw] w-[34vw] max-w-[520px] rounded-full bg-[radial-gradient(circle,rgba(79,195,247,0.2)_0%,rgba(123,47,247,0.16)_42%,transparent_70%)] blur-3xl"
        initial={{ opacity: 0, scale: 0.78 }}
        animate={{
          opacity: [0, 1, 0.34],
          scale: [0.78, 1.05, 0.92],
        }}
        transition={{
          delay: 0.85,
          duration: 1.15,
          ease: 'easeOut',
          times: [0, 0.48, 1],
        }}
      />

      <div className="relative flex w-full flex-col items-center px-6 text-center">
        <motion.div
          className="mb-6 h-px w-[min(72vw,720px)] origin-center bg-gradient-to-r from-transparent via-white/70 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        <motion.h1
          className="font-display text-[clamp(4rem,12vw,11rem)] font-semibold leading-none tracking-[0.08em] text-white"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          AYUSH
        </motion.h1>

        <motion.p
          className="mt-5 font-mono text-xs uppercase tracking-[0.34em] text-[var(--color-muted)] sm:text-sm"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                delayChildren: 1.22,
                staggerChildren: 0.04,
              },
            },
          }}
        >
          {subtitle.split('').map((character, index) => (
            <motion.span
              key={`${character}-${index}`}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.22, ease: 'easeOut' },
                },
              }}
            >
              {character === ' ' ? '\u00a0' : character}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </motion.div>
  )
}

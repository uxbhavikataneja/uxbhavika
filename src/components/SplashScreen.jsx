import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

const name = 'Bhavika'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true)
    }, 2500)

    return () => window.clearTimeout(exitTimer)
  }, [])

  return (
    <motion.div
      initial={{ clipPath: 'inset(0 0 0% 0)' }}
      animate={
        isExiting
          ? { clipPath: 'inset(0 0 100% 0)' }
          : { clipPath: 'inset(0 0 0% 0)' }
      }
      transition={
        isExiting
          ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0 }
      }
      onAnimationComplete={() => {
        if (isExiting) {
          onComplete()
        }
      }}
      className="fixed inset-0 z-50 grid h-dvh place-items-center overflow-hidden bg-[#f2c4ce]"
      aria-label="Loading portfolio"
    >
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="font-display text-[clamp(3rem,10vw,8rem)] leading-none text-[#1a1a1a]"
      >
        {name.split('').map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            variants={letterVariants}
            className="inline-block"
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
    </motion.div>
  )
}

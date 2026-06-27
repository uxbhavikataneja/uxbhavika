'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Footer from './Footer'
import Navbar from './Navbar'
import SplashScreen from './SplashScreen'

type AppShellProps = {
  children: React.ReactNode
}

const splashStorageKey = 'ayush-portfolio-splash-complete'

export default function AppShell({ children }: AppShellProps) {
  const [isReady, setIsReady] = useState(false)
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    const hasSeenSplash = window.sessionStorage.getItem(splashStorageKey)

    if (hasSeenSplash) {
      setShowSplash(false)
    } else {
      setShowSplash(true)
    }

    setIsReady(true)
  }, [])

  const handleSplashComplete = () => {
    window.sessionStorage.setItem(splashStorageKey, 'true')
    setShowSplash(false)
  }

  const contentVisible = isReady && !showSplash

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <Navbar isSplashActive={!isReady || showSplash} />
      <motion.main
        id="main"
        initial={false}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  )
}

import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { RouterProvider } from 'react-router-dom'
import SplashScreen from './components/SplashScreen.jsx'
import SplashProvider from './context/SplashProvider.jsx'

export default function App({ router }) {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <SplashProvider value={{ splashDone }}>
      <RouterProvider router={router} />
      <AnimatePresence>
        {!splashDone && (
          <SplashScreen key="splash" onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>
    </SplashProvider>
  )
}

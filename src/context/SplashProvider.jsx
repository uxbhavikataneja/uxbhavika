import { SplashContext } from './splash.js'

export default function SplashProvider({ children, value }) {
  return (
    <SplashContext.Provider value={value}>{children}</SplashContext.Provider>
  )
}

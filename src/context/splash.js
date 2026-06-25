import { createContext, useContext } from 'react'

export const SplashContext = createContext({
  splashDone: false,
})

export function useSplash() {
  return useContext(SplashContext)
}

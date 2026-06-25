import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isProjects = pathname === '/projects'

  return (
    <div className="min-h-svh bg-[var(--color-bg)] text-[var(--color-text)]">
      <Navbar />

      <main
        className={
          isHome || isProjects
            ? 'w-full'
            : 'mx-auto w-full max-w-6xl px-6 pb-16 pt-28'
        }
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

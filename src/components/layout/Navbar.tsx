'use client'

import { useRef, type ComponentType } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import {
  HiOutlineArrowDownTray,
  HiOutlineChatBubbleLeft,
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineUser,
} from 'react-icons/hi2'

type NavbarProps = {
  isSplashActive?: boolean
}

type DockItem = {
  label: string
  href: string
  external?: boolean
  isActive: (pathname: string) => boolean
  icon: ComponentType<{ size?: number; color?: string }>
  accent?: boolean
}

const dockItems: DockItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: HiOutlineHome,
    isActive: (pathname) => pathname === '/',
  },
  {
    label: 'Work',
    href: '/projects',
    icon: HiOutlineSquares2X2,
    isActive: (pathname) => pathname.startsWith('/projects'),
  },
  {
    label: 'About',
    href: '/about',
    icon: HiOutlineUser,
    isActive: (pathname) => pathname.startsWith('/about'),
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: HiOutlineChatBubbleLeft,
    isActive: (pathname) => pathname.startsWith('/contact'),
  },
  {
    label: 'Resume',
    href: '/resume.pdf',
    icon: HiOutlineArrowDownTray,
    isActive: () => false,
    external: true,
    accent: true,
  },
]

export default function Navbar({ isSplashActive = false }: NavbarProps) {
  const pathname = usePathname()
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY)

  return (
    <motion.nav
      initial={false}
      animate={{
        opacity: isSplashActive ? 0 : 1,
        y: isSplashActive ? 28 : 0,
      }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-5 left-1/2 z-[100] -translate-x-1/2 md:bottom-7"
      aria-label="Primary navigation"
    >
      <motion.div
        onMouseMove={(event) => mouseX.set(event.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className="flex items-end gap-2 rounded-[20px] border border-white/10 bg-[rgba(10,10,20,0.7)] px-3 py-2 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-[20px]"
      >
        {dockItems.map((item) => (
          <DockIcon
            key={item.label}
            item={item}
            mouseX={mouseX}
            isActive={item.isActive(pathname)}
          />
        ))}
      </motion.div>
    </motion.nav>
  )
}

function DockIcon({
  item,
  mouseX,
  isActive,
}: {
  item: DockItem
  mouseX: MotionValue<number>
  isActive: boolean
}) {
  const itemRef = useRef<HTMLAnchorElement | null>(null)
  const distance = useTransform(mouseX, (value) => {
    const bounds = itemRef.current?.getBoundingClientRect()
    return value - (bounds ? bounds.left + bounds.width / 2 : 0)
  })
  const rawSize = useTransform(
    distance,
    [-140, 0, 140],
    [48, 72, 48],
  )
  const mobileRawSize = useTransform(
    distance,
    [-110, 0, 110],
    [40, 56, 40],
  )
  const size = useSpring(rawSize, { mass: 0.18, stiffness: 220, damping: 18 })
  const mobileSize = useSpring(mobileRawSize, {
    mass: 0.18,
    stiffness: 220,
    damping: 18,
  })
  const Icon = item.icon

  const content = (
    <>
      <span className="pointer-events-none absolute bottom-[calc(100%+10px)] hidden rounded-full bg-[#12121a] px-3 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 md:block">
        {item.label}
      </span>

      <motion.span
        style={{ width: mobileSize, height: mobileSize }}
        className="grid place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white md:hidden"
      >
        <Icon size={20} color="white" />
      </motion.span>

      <motion.span
        style={{ width: size, height: size }}
        className={`hidden place-items-center rounded-2xl border border-white/10 bg-white/[0.06] text-white md:grid ${
          item.accent ? 'shadow-[0_0_28px_rgba(123,47,247,0.42)]' : ''
        }`}
      >
        <Icon size={20} color="white" />
      </motion.span>

      {isActive && (
        <span className="absolute -bottom-1 left-1/2 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-white opacity-80" />
      )}
    </>
  )

  const className =
    'group relative flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0f]'

  if (item.external) {
    return (
      <a
        ref={itemRef}
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-label={item.label}
      >
        {content}
      </a>
    )
  }

  return (
    <Link
      ref={itemRef}
      href={item.href}
      className={className}
      aria-label={item.label}
    >
      {content}
    </Link>
  )
}

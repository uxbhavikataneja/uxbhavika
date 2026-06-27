'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import type { PhotoCard } from '@/lib/photoCards'

type FreeformCanvasProps = {
  cards: PhotoCard[]
}

const cardSizes = {
  sm: { className: 'h-[180px] w-[160px]', imageHeight: 'h-[140px]' },
  md: { className: 'h-[230px] w-[200px]', imageHeight: 'h-[190px]' },
  lg: { className: 'h-[280px] w-[240px]', imageHeight: 'h-[240px]' },
}

function clampMobileRotation(rotation: number) {
  return Math.max(-3, Math.min(3, rotation))
}

export default function FreeformCanvas({ cards }: FreeformCanvasProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeMobileId, setActiveMobileId] = useState(cards[0]?.id)
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const updateActiveMobileCard = () => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const center = scroller.scrollLeft + scroller.clientWidth / 2
    let closest = cards[0]?.id
    let closestDistance = Number.POSITIVE_INFINITY

    Array.from(scroller.children).forEach((child) => {
      const element = child as HTMLElement
      const childCenter = element.offsetLeft + element.offsetWidth / 2
      const distance = Math.abs(center - childCenter)

      if (distance < closestDistance) {
        closestDistance = distance
        closest = element.dataset.cardId || closest
      }
    })

    setActiveMobileId(closest)
  }

  return (
    <>
      <div className="relative hidden min-h-[700px] overflow-hidden md:block">
        {cards.map((card) => (
          <PhotoBoardCard
            key={card.id}
            card={card}
            isHovered={hoveredId === card.id}
            isDimmed={Boolean(hoveredId && hoveredId !== card.id)}
            onHoverStart={() => setHoveredId(card.id)}
            onHoverEnd={() => setHoveredId(null)}
          />
        ))}
      </div>

      <div
        ref={scrollerRef}
        onScroll={updateActiveMobileCard}
        className="flex min-h-[900px] snap-x snap-mandatory gap-6 overflow-x-auto px-6 py-20 md:hidden"
      >
        {cards.map((card) => (
          <div
            key={card.id}
            data-card-id={card.id}
            className="flex min-w-[220px] snap-center items-center justify-center"
          >
            <PhotoBoardCard
              card={{
                ...card,
                size: 'md',
                rotation: clampMobileRotation(card.rotation),
              }}
              isHovered={activeMobileId === card.id}
              isDimmed={activeMobileId !== card.id}
              mobile
            />
          </div>
        ))}
      </div>
    </>
  )
}

function PhotoBoardCard({
  card,
  isHovered,
  isDimmed,
  mobile = false,
  onHoverStart,
  onHoverEnd,
}: {
  card: PhotoCard
  isHovered: boolean
  isDimmed: boolean
  mobile?: boolean
  onHoverStart?: () => void
  onHoverEnd?: () => void
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const size = mobile
    ? { className: 'h-[230px] w-[200px]', imageHeight: 'h-[190px]' }
    : cardSizes[card.size]

  return (
    <motion.article
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      initial={false}
      animate={{
        opacity: isDimmed ? 0.6 : 1,
        scale: isHovered ? 1.08 : 1,
        rotate: isHovered ? 0 : card.rotation,
        zIndex: isHovered ? 10 : 1,
      }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      className={`cursor-pointer bg-white px-2 pb-8 pt-2 shadow-[0_4px_24px_rgba(0,0,0,0.3)] ${size.className} ${
        mobile ? 'relative shrink-0' : 'absolute'
      }`}
      style={
        mobile
          ? undefined
          : {
              left: card.position.x,
              top: card.position.y,
            }
      }
    >
      <div
        className={`relative overflow-hidden bg-neutral-300 ${size.imageHeight}`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#d1d5db,#737373)]" />
        {!imageFailed && (
          <Image
            src={card.image}
            alt={card.tag}
            fill
            sizes="(max-width: 768px) 200px, 240px"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <motion.div
        initial={false}
        animate={{
          y: isHovered ? 0 : 10,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="absolute bottom-3 left-1/2 max-w-[calc(100%-24px)] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-[#1a1a2e] px-3 py-1 text-xs text-white"
      >
        {card.tag}
      </motion.div>
    </motion.article>
  )
}

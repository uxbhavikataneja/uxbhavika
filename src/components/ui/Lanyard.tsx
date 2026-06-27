'use client'

import { Canvas } from '@react-three/fiber'

const cardGLB = '/assets/lanyard/card.glb'
const lanyardDefault = '/assets/lanyard/lanyard.png'

export type LanyardProps = {
  position?: [number, number, number]
  gravity?: [number, number, number]
  frontImage?: string
  backImage?: string
  lanyardWidth?: number
}

export default function Lanyard({
  frontImage = '/assets/lanyard/card-front.png',
}: LanyardProps) {
  return (
    <div className="relative h-full min-h-[420px] w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
        <ambientLight intensity={1.5} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="h-[450px] w-[300px] rotate-[-7deg] overflow-hidden rounded-[28px] border border-white/15 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frontImage}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  )
}

export { cardGLB, lanyardDefault }

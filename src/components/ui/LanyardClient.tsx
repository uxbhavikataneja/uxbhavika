'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'
import type { LanyardProps } from './Lanyard'

const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false })

export default Lanyard as ComponentType<LanyardProps>

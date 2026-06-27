import Link from 'next/link'
import FreeformCanvas from './FreeformCanvas'
import photoCards from '@/lib/photoCards'

export default function AboutPreview() {
  return (
    <section className="bg-[var(--color-bg)] px-0 py-[120px]">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--color-muted)]">
          A little about the
        </p>
        <h2 className="mt-3 font-display text-[clamp(2.5rem,6vw,5rem)] leading-tight text-white">
          person behind the work
        </h2>
      </div>

      <div className="mt-14">
        <FreeformCanvas cards={photoCards} />
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/about"
          className="text-sm font-medium text-white/80 transition-colors hover:text-white"
        >
          More about me &#8594;
        </Link>
      </div>
    </section>
  )
}

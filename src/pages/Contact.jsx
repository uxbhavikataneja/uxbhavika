import PageTransition from '../components/PageTransition.jsx'

export default function Contact() {
  return (
    <PageTransition className="space-y-6">
      <p className="text-sm uppercase tracking-[0.24em] text-[var(--color-blush)]">
        Start A Conversation
      </p>
      <h1 className="font-display text-5xl text-[var(--color-cream)]">
        Contact
      </h1>
      <p className="max-w-2xl text-lg text-[var(--color-muted)]">
        Placeholder page for inquiries, availability, email, and social links.
      </p>
    </PageTransition>
  )
}

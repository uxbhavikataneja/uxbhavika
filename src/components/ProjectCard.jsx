import { Link } from 'react-router-dom'

export default function ProjectCard({ project }) {
  const isPhone = project.mockupType === 'phone'

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="project-card group block"
      aria-label={`View ${project.name}`}
    >
      <div
        className="project-card-mockup"
        style={{ background: project.mockupGradient }}
      >
        <div
          className="project-card-glow"
          style={{ backgroundColor: project.accent }}
        />
        <div className={isPhone ? 'phone-mockup' : 'laptop-mockup'}>
          <div
            className="mockup-screen"
            style={{ background: project.mockupGradient }}
          >
            <span style={{ color: project.accent }}>{project.category}</span>
          </div>
          {!isPhone && <div className="laptop-base" />}
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.3rem] leading-tight text-[var(--color-cream)]">
            {project.name}
          </h3>
          <span className="text-xl text-[var(--color-blush)] transition-transform duration-300 group-hover:translate-x-1">
            &#8594;
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="project-tag">
              {tag}
            </span>
          ))}
        </div>

        <p className="line-clamp-2 text-[0.85rem] leading-relaxed text-[var(--color-muted)]">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tools.map((tool) => (
            <span key={tool} className="project-tool">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}

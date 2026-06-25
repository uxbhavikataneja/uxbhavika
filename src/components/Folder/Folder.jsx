import './Folder.css'

const GlassFolder = ({ cards = [] }) => {
  return (
    <div className="glass-folder-wrapper">
      <div className="glass-folder-tab" />

      <div className="glass-folder-body">
        {cards.map((card, index) => (
          <div
            key={card.title}
            className={`glass-project-card glass-card-${index}`}
            data-card-index={index}
          >
            <span className="card-number">0{index + 1}</span>

            <div
              className="card-thumb"
              style={{
                background:
                  card.thumbColor || 'rgba(200, 160, 200, 0.4)',
              }}
            >
              {card.icon && <span className="card-icon">{card.icon}</span>}
            </div>

            <div className="card-info">
              <p className="card-tag">{card.tag || 'Project'}</p>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-desc">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GlassFolder

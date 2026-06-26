import { skills, technologies } from '../data/portfolio'
import { polygonPoints, radarPoints } from '../utils/chart'
import { SectionHeading } from './SectionHeading'
import styles from '../styles/Sections.module.css'

export function Skills() {
  const values = skills.map((skill) => skill.level)

  return (
    <section id="skills" data-section className={styles.section}>
      <SectionHeading
        index={5}
        eyebrow="Mapa de capacidades"
        title="Resumo das Habilidades"
        description="Uma leitura objetiva de repertório, profundidade e ferramentas."
      />
      <div className={styles.skillsGrid}>
        <article className={styles.panel} data-reveal>
          <div className={styles.panelHeader}>
            <span>01 / Radar</span>
            <small>Distribuição</small>
          </div>
          <div className={styles.radar}>
            <svg viewBox="0 0 220 220" role="img" aria-label="Gráfico radar das habilidades">
              {[0.18, 0.28, 0.37].map((scale) => (
                <polygon key={scale} points={polygonPoints(5, scale)} className={styles.radarGrid} />
              ))}
              <polygon points={radarPoints(values)} className={styles.radarValue} />
              {skills.map((skill, index) => {
                const point = polygonPoints(5, 0.48).split(' ')[index].split(',')
                return <text key={skill.name} x={point[0]} y={point[1]}>{skill.name}</text>
              })}
            </svg>
          </div>
        </article>
        <article className={styles.panel} data-reveal>
          <div className={styles.panelHeader}>
            <span>02 / Proficiência</span>
            <small>Pontuação relativa</small>
          </div>
          <div className={styles.skillBars}>
            {skills.map((skill) => (
              <div className={styles.skillRow} key={skill.name}>
                <div><strong>{skill.name}</strong><span>{skill.label}</span></div>
                <div className={styles.skillTrack}>
                  <i style={{ transform: `scaleX(${skill.level / 100})` }} />
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className={styles.panel} data-reveal>
          <div className={styles.panelHeader}>
            <span>03 / Toolkit</span>
            <small>Stack aplicado</small>
          </div>
          <div className={styles.techCloud}>
            {technologies.map((technology, index) => (
              <span key={technology} className={index < 3 ? styles.featuredTech : ''}>
                {technology}
              </span>
            ))}
          </div>
          <p className={styles.techNote}>Ferramentas são escolhidas pelo problema, não pelo hype.</p>
        </article>
      </div>
    </section>
  )
}

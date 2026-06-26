import { ArrowUpRight } from 'lucide-react'
import { journey } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import styles from '../styles/Sections.module.css'

export function CareerJourney() {
  return (
    <section id="journey" data-section className={styles.section}>
      <SectionHeading
        index={4}
        eyebrow="Análise de sequência"
        title="Jornada Profissional"
        description="Experiências distintas, conectadas por uma evolução consistente."
      />
      <div className={styles.journeyList}>
        {journey.map((item, index) => (
          <article className={styles.journeyCard} data-reveal key={item.year}>
            <div className={styles.journeyNumber}>{String(index + 1).padStart(2, '0')}</div>
            <div className={styles.journeyYear}>{item.year}</div>
            <div className={styles.journeyMain}>
              <h3>{item.role}</h3>
              <span>{item.company}</span>
            </div>
            <p>{item.description}</p>
            <div className={styles.tags}>
              {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <ArrowUpRight size={17} className={styles.journeyArrow} />
          </article>
        ))}
      </div>
    </section>
  )
}

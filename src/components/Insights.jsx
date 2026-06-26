import { Blocks, ChartNoAxesCombined, Search, Target } from 'lucide-react'
import { insights } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import styles from '../styles/Sections.module.css'

const icons = [Blocks, ChartNoAxesCombined, Search, Target]

export function Insights() {
  return (
    <section id="insights" data-section className={styles.section}>
      <SectionHeading index={7} eyebrow="Aprendizados extraídos" title="Principais Insights" />
      <div className={styles.insightsGrid}>
        {insights.map((insight, index) => {
          const Icon = icons[index]
          return (
            <article key={insight} className={styles.insightCard} data-reveal>
              <div><span>Insight #{String(index + 1).padStart(2, '0')}</span><Icon size={20} /></div>
              <p>“{insight}”</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

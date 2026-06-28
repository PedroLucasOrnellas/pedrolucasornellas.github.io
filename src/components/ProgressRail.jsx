import { Database } from 'lucide-react'
import { navigation, stages } from '../data/portfolio'
import styles from '../styles/ProgressRail.module.css'

export function ProgressRail({ activeSection }) {
  const sectionIndex = Math.max(0, navigation.findIndex(([id]) => id === activeSection))
  const activeIndex = stages.reduce((current, stage, index) => {
    const stageIndex = navigation.findIndex(([id]) => id === stage.target)
    return stageIndex <= sectionIndex ? index : current
  }, 0)
  const progress = (stages[activeIndex]?.value ?? 0) / 100

  return (
    <aside className={styles.rail} aria-label="Progresso da análise" data-progress-rail>
      <div className={styles.title}>
        <span>Análise</span>
        <strong>Progresso</strong>
      </div>
      <div className={styles.track}>
        <div className={styles.line} />
        <div
          className={styles.fill}
          style={{ '--progress-scale': progress }}
        />
        {stages.map((stage, index) => (
          <a
            key={stage.value}
            href={`#${stage.target}`}
            className={`${styles.stage} ${index <= activeIndex ? styles.active : ''}`}
            aria-label={`${stage.value}% — ${stage.label}`}
          >
            <i />
            <span>
              <strong>{stage.value}%</strong>
              <small>{stage.label}</small>
            </span>
          </a>
        ))}
      </div>
      <div className={styles.dataset}>
        <Database size={18} />
        <span>The Human<br />Dataset</span>
      </div>
    </aside>
  )
}

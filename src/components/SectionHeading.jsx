import styles from '../styles/Sections.module.css'

export function SectionHeading({ index, eyebrow, title, description }) {
  return (
    <header className={styles.sectionHeading} data-reveal>
      <div className={styles.sectionIndex}>{String(index).padStart(2, '0')}</div>
      <div>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </header>
  )
}

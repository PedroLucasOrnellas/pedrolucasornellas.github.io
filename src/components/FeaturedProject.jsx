import { ArrowUpRight, BarChart3, Database, PackageCheck, TrendingUp } from 'lucide-react'
import { project } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import styles from '../styles/Sections.module.css'

export function FeaturedProject() {
  return (
    <section id="project" data-section className={styles.section}>
      <SectionHeading
        index={6}
        eyebrow="Evidência em contexto"
        title="Projeto em Destaque"
        description="Competências aplicadas a um problema real, com impacto mensurável."
      />
      <article className={styles.projectCard} data-reveal>
        <div className={styles.projectVisual}>
          <div className={styles.mockToolbar}>
            <span /><span /><span />
            <b>O Catálogo / Overview</b>
          </div>
          <div className={styles.mockBody}>
            <aside>
              <i /><i /><i /><i />
            </aside>
            <main>
              <div className={styles.mockTitle}><span /><i /></div>
              <div className={styles.mockStats}>
                {[PackageCheck, TrendingUp, Database].map((Icon, index) => (
                  <div key={index}><Icon size={15} /><span /><b /></div>
                ))}
              </div>
              <div className={styles.mockChart}>
                <BarChart3 size={18} />
                <svg viewBox="0 0 320 100" preserveAspectRatio="none">
                  <path d="M0 76 C35 66 38 38 72 49 S113 81 143 54 S180 25 210 42 S248 77 280 43 S300 29 320 16" />
                </svg>
              </div>
            </main>
          </div>
        </div>
        <div className={styles.projectContent}>
          <div>
            <span className={styles.eyebrow}>{project.eyebrow}</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </div>
          <div className={styles.projectFacts}>
            {project.facts.map(([label, value]) => (
              <div key={label}><span>{label}</span><p>{value}</p></div>
            ))}
          </div>
          <a className={styles.primaryButton} href={projectUrl} target="_blank" rel="noreferrer">
            Ver Case Study <ArrowUpRight size={16} />
          </a>
        </div>
      </article>
    </section>
  )
}

const projectUrl = 'https://github.com/PedroLucasOrnellas'

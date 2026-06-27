import { ArrowDown, ArrowUpRight } from 'lucide-react'
import portrait from '../assets/portrait.png'
import { profile } from '../data/portfolio'
import styles from '../styles/Sections.module.css'

export function Hero() {
  return (
    <section id="overview" data-section className={`${styles.section} ${styles.hero}`}>
      <div className={styles.heroGrid} aria-hidden="true" />
      <div className={styles.heroCopy}>
        <div className={styles.heroKicker} data-hero>
          <span>01</span>
          Dataset do candidato / pronto
        </div>
        <h1 data-hero>
          Pedro Lucas
          <br />
          <span>Ornellas de Abreu.</span>
        </h1>
        <p className={styles.heroRole} data-hero>{profile.role}</p>
        <p className={styles.heroSummary} data-hero>{profile.summary}</p>
        <div className={styles.heroActions} data-hero>
          <a className={styles.primaryButton} href="#summary">
            Iniciar análise <ArrowDown size={16} />
          </a>
          <a className={styles.textLink} href="#project">
            Ver evidências <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className={styles.portraitWrap} data-hero>
        <div className={styles.orbit} aria-hidden="true" />
        <img src={portrait} alt="Retrato vetorial monocromático de Pedro Lucas" />
        <div className={styles.statusCard}>
          <span>Status</span>
          <strong><i /> Disponível</strong>
          <hr />
          <span>Objetivo Profissional</span>
          <b>{profile.role}</b>
        </div>
        <div className={styles.coordinate}>22.2819° S / 42.5311° W</div>
      </div>
      <div className={styles.heroFooter} data-hero>
        <span>Dataset ID — PL-2026.01</span>
        <span>Role para processar</span>
      </div>
    </section>
  )
}

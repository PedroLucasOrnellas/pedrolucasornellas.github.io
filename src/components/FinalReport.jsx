import { Check, Download, FileCheck2 } from 'lucide-react'
import { profile } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import styles from '../styles/Sections.module.css'

const verified = ['Habilidades técnicas', 'Evidência de projeto', 'Agilidade de aprendizado', 'Raciocínio analítico']

export function FinalReport() {
  return (
    <section id="report" data-section className={`${styles.section} ${styles.reportSection}`}>
      <SectionHeading index={8} eyebrow="Processamento concluído" title="Relatório Final" />
      <div className={styles.reportCard} data-reveal>
        <div className={styles.completeMark}>
          <FileCheck2 size={32} />
          <span>Análise concluída</span>
          <small>100% processado</small>
        </div>
        <div className={styles.recommendation}>
          <span>Candidato</span>
          <strong>{profile.name}</strong>
          <span>Recomendação</span>
          <h3>Recomendado para Entrevista</h3>
        </div>
        <div className={styles.verified}>
          {verified.map((item) => (
            <span key={item}><i><Check size={12} /></i>{item} <b>Verificado</b></span>
          ))}
        </div>
        <a className={styles.downloadButton} href="/pedro-lucas-resume.txt" download>
          <Download size={19} />
          <span>Baixar Currículo<small>TXT / 1 página</small></span>
        </a>
      </div>
    </section>
  )
}

import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import styles from '../styles/Sections.module.css'

export function WhyData() {
  return (
    <section id="why-data" data-section className={`${styles.section} ${styles.whySection}`}>
      <SectionHeading index={3} eyebrow="Reconhecimento de padrões" title="Por que Dados?" />
      <div className={styles.whyGrid}>
        <div className={styles.whyCopy} data-reveal>
          <p className={styles.lead}>
            Porque gosto de encontrar ordem onde, à primeira vista, só existe ruído.
          </p>
          <p>
            Dados revelam padrões, oportunidades e perguntas melhores. Meu trabalho é
            organizar sinais dispersos e transformar complexidade em uma narrativa útil.
          </p>
          <div className={styles.formula}>
            informação <ArrowRight size={15} /> estrutura <ArrowRight size={15} /> decisão
          </div>
        </div>

        <div className={styles.dataPrinciples} data-reveal>
          <span>Processo de análise</span>
          <div>
            <strong>01</strong>
            <p>Organizar dados dispersos em uma estrutura clara.</p>
          </div>
          <div>
            <strong>02</strong>
            <p>Transformar padrões em perguntas melhores.</p>
          </div>
          <div>
            <strong>03</strong>
            <p>Comunicar decisões com simplicidade e contexto.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

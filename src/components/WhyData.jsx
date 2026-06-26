import { ArrowRight } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import styles from '../styles/Sections.module.css'

const nodes = [
  [9, 34], [18, 70], [27, 20], [35, 48], [45, 78], [52, 29],
  [63, 58], [72, 17], [81, 72], [91, 40], [48, 52], [69, 84],
]
const links = [[0, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 6], [3, 10], [4, 6], [4, 11], [5, 7], [5, 10], [6, 8], [6, 9], [6, 10], [7, 9], [8, 9], [8, 11], [10, 11]]

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
            conectar os pontos e transformar complexidade em uma narrativa útil.
          </p>
          <div className={styles.formula}>
            informação <ArrowRight size={15} /> estrutura <ArrowRight size={15} /> decisão
          </div>
        </div>
        <div className={styles.network} data-reveal aria-label="Visualização abstrata de dados conectados">
          <span className={styles.networkLabel}>Sinais brutos</span>
          <svg viewBox="0 0 100 100" role="img">
            {links.map(([a, b]) => (
              <line
                key={`${a}-${b}`}
                x1={nodes[a][0]}
                y1={nodes[a][1]}
                x2={nodes[b][0]}
                y2={nodes[b][1]}
              />
            ))}
            {nodes.map(([x, y], index) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={index === 10 ? 2.2 : 1.25} />
            ))}
          </svg>
          <span className={styles.networkResult}>Conhecimento conectado</span>
        </div>
      </div>
    </section>
  )
}

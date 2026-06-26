import {
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  Languages,
  MapPin,
  UserRound,
} from 'lucide-react'
import { profile, summaryFields } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import styles from '../styles/Sections.module.css'

const icons = [UserRound, UserRound, BookOpen, MapPin, BriefcaseBusiness, Languages, BadgeCheck]

export function CandidateSummary() {
  return (
    <section id="summary" data-section className={styles.section}>
      <SectionHeading
        index={2}
        eyebrow="Dataset carregado"
        title="Resumo do Candidato"
        description="Informações essenciais, organizadas como um relatório de leitura rápida."
      />
      <div className={styles.summaryCard} data-reveal>
        <div className={styles.summaryIdentity}>
          <span>PL</span>
          <div>
            <small>Candidato</small>
            <strong>{profile.shortName}</strong>
          </div>
        </div>
        <div className={styles.summaryFields}>
          {summaryFields.map(([label, value], index) => {
            const Icon = icons[index]
            return (
              <div className={styles.summaryField} key={label}>
                <Icon size={16} />
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { social } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import styles from '../styles/Sections.module.css'

const contacts = [
  ['GitHub', '@PedroLucasOrnellas', social.github, Github],
  ['LinkedIn', 'pedro-lucas-ornellas', social.linkedin, Linkedin],
  ['Email', social.email, `mailto:${social.email}`, Mail],
]

export function Contact() {
  return (
    <footer id="contact" data-section className={`${styles.section} ${styles.contact}`}>
      <SectionHeading
        index={9}
        eyebrow="Contato"
        title="Vamos construir o próximo insight."
        description="Disponível para oportunidades em análise de dados e conversas sobre produtos orientados por informação."
      />
      <div className={styles.contactLinks}>
        {contacts.map(([label, value, href, Icon]) => (
          <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel="noreferrer">
            <Icon size={20} />
            <span><small>{label}</small><strong>{value}</strong></span>
            <ArrowUpRight size={16} />
          </a>
        ))}
      </div>
      <div className={styles.copyright}>
        <span>© 2026 Pedro Lucas Ornellas de Abreu</span>
        <span>The Human Dataset / v1.0</span>
      </div>
    </footer>
  )
}

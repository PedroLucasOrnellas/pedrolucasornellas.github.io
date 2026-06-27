import { navigation } from '../data/portfolio'
import styles from '../styles/TopNav.module.css'

export function TopNav({ activeSection }) {
  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <a className={styles.mobileBrand} href="#overview" data-nav-item>THD / PEDRO</a>
      <div className={styles.links} data-nav>
        {navigation.map(([id, label], index) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? styles.active : ''}
            data-nav-item
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}

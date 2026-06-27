import { useEffect, useRef } from 'react'
import { navigation } from '../data/portfolio'
import styles from '../styles/TopNav.module.css'

export function TopNav({ activeSection }) {
  const linksRef = useRef(null)
  const activeLinkRef = useRef(null)

  useEffect(() => {
    const container = linksRef.current
    const activeLink = activeLinkRef.current

    if (!container || !activeLink) return

    const isMobileNav = window.matchMedia('(max-width: 1100px)').matches
    if (!isMobileNav) return

    const containerRect = container.getBoundingClientRect()
    const activeRect = activeLink.getBoundingClientRect()
    const safeOffset = 16
    const isHiddenLeft = activeRect.left < containerRect.left + safeOffset
    const isHiddenRight = activeRect.right > containerRect.right - safeOffset

    if (!isHiddenLeft && !isHiddenRight) return

    container.scrollTo({
      left: activeLink.offsetLeft - (container.clientWidth / 2) + (activeLink.offsetWidth / 2),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [activeSection])

  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <a className={styles.mobileBrand} href="#overview" data-nav-item>THD / PEDRO</a>
      <div className={styles.links} ref={linksRef} data-nav>
        {navigation.map(([id, label], index) => (
          <a
            key={id}
            ref={activeSection === id ? activeLinkRef : null}
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

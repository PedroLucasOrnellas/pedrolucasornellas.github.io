import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import styles from '../styles/PreLoader.module.css'

const messages = [
  'Inicializando análise...',
  'Carregando perfil do candidato...',
  'Validando formação acadêmica...',
  'Processando habilidades técnicas...',
  'Organizando evidências...',
  'Gerando relatório final...',
  'Dataset carregado.',
]

const messageThresholds = [0, 15, 30, 48, 65, 82, 100]

export function PreLoader({ onComplete }) {
  const rootRef = useRef(null)
  const cardRef = useRef(null)
  const labelRef = useRef(null)
  const titleRef = useRef(null)
  const nameRef = useRef(null)
  const progressRef = useRef(null)
  const progressTextRef = useRef(null)
  const barRef = useRef(null)
  const statusRef = useRef(null)
  const logRefs = useRef([])
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [revealedLogs, setRevealedLogs] = useState([])
  const [isReady, setIsReady] = useState(false)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsStableGutter = window.CSS?.supports?.('scrollbar-gutter: stable')
    const previousOverflow = document.body.style.overflow
    const previousTouchAction = document.body.style.touchAction
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const progressState = { value: 0 }
    let lastMessageIndex = -1

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    if (!supportsStableGutter && scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const setStage = (index) => {
      if (index === lastMessageIndex) return
      lastMessageIndex = index

      setMessageIndex(index)
      setRevealedLogs((current) => (
        current.includes(index) ? current : [...current, index]
      ))

      const activeLog = logRefs.current[index]
      if (activeLog) {
        gsap.fromTo(
          activeLog,
          { autoAlpha: 0, y: reduceMotion ? 0 : 6 },
          { autoAlpha: 1, y: 0, duration: reduceMotion ? 0.12 : 0.32, ease: 'power2.out' },
        )
      }

      gsap.fromTo(
        progressTextRef.current,
        { autoAlpha: 0, y: reduceMotion ? 0 : 6 },
        { autoAlpha: 1, y: 0, duration: reduceMotion ? 0.12 : 0.28, ease: 'power2.out' },
      )
    }

    const syncProgress = () => {
      const nextProgress = Math.min(100, Math.round(progressState.value))
      const nextMessageIndex = messageThresholds.reduce((current, threshold, index) => (
        nextProgress >= threshold ? index : current
      ), 0)

      setProgress(nextProgress)
      gsap.set(barRef.current, { scaleX: progressState.value / 100 })
      setStage(nextMessageIndex)
    }

    gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(cardRef.current, { autoAlpha: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.985 })
    gsap.set([labelRef.current, titleRef.current, nameRef.current, progressRef.current, statusRef.current], {
      autoAlpha: 0,
      y: reduceMotion ? 0 : 8,
    })
    gsap.set(titleRef.current, { clipPath: 'inset(0 0 100% 0)' })
    gsap.set(logRefs.current, { autoAlpha: 0, y: reduceMotion ? 0 : 6 })

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        window.sessionStorage.setItem('human-dataset-preloader', 'seen')
        document.body.style.overflow = previousOverflow
        document.body.style.touchAction = previousTouchAction
        document.body.style.paddingRight = previousPaddingRight
        onComplete()
      },
    })

    timeline
      .to(cardRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: reduceMotion ? 0.18 : 0.68,
        ease: reduceMotion ? 'power2.out' : 'expo.out',
      }, 0.1)
      .to(labelRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: reduceMotion ? 0.12 : 0.38,
        ease: 'power3.out',
      }, 0.25)
      .to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration: reduceMotion ? 0.16 : 0.62,
        ease: 'power3.out',
      }, 0.38)
      .to(nameRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: reduceMotion ? 0.12 : 0.36,
        ease: 'power3.out',
      }, 0.52)
      .to([progressRef.current, statusRef.current], {
        autoAlpha: 1,
        y: 0,
        duration: reduceMotion ? 0.14 : 0.42,
        stagger: reduceMotion ? 0 : 0.08,
        ease: 'power3.out',
      }, 0.7)
      .call(() => setStage(0), [], 0.85)
      .to(progressState, {
        value: 100,
        duration: reduceMotion ? 1.1 : 4.35,
        ease: reduceMotion ? 'power2.out' : 'power3.inOut',
        onUpdate: syncProgress,
      }, 0.85)
      .call(() => {
        setStage(6)
        setProgress(100)
        setIsReady(true)
        gsap.set(barRef.current, { scaleX: 1 })
      }, [], '+=0.12')
      .to(statusRef.current, {
        borderColor: 'rgba(22, 163, 107, .24)',
        duration: reduceMotion ? 0.1 : 0.28,
        ease: 'power2.out',
      })
      .to({}, { duration: reduceMotion ? 0.16 : 0.5 })
      .to(cardRef.current, {
        autoAlpha: 0,
        y: reduceMotion ? 0 : -16,
        scale: reduceMotion ? 1 : 0.985,
        duration: reduceMotion ? 0.18 : 0.56,
        ease: 'power4.inOut',
      })
      .to(rootRef.current, {
        autoAlpha: 0,
        clipPath: reduceMotion ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
        duration: reduceMotion ? 0.18 : 0.64,
        ease: 'power4.inOut',
      }, '<0.08')

    return () => {
      timeline.kill()
      document.body.style.overflow = previousOverflow
      document.body.style.touchAction = previousTouchAction
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [onComplete])

  return (
    <div className={styles.preloader} ref={rootRef} role="status" aria-live="polite">
      <div className={styles.grid} aria-hidden="true" />
      <section className={styles.card} ref={cardRef} aria-label="Carregando The Human Dataset">
        <header className={styles.header}>
          <span ref={labelRef}>Portfólio em análise</span>
          <h1 ref={titleRef}>THE HUMAN DATASET</h1>
          <p ref={nameRef}>Pedro Lucas Ornellas de Abreu</p>
        </header>

        <div className={styles.progressGroup} ref={progressRef}>
          <div className={styles.progressMeta}>
            <span ref={progressTextRef}>{messages[messageIndex]}</span>
            <strong>{progress}%</strong>
          </div>
          <div className={styles.track} aria-hidden="true">
            <div className={styles.fill} ref={barRef} />
          </div>
        </div>

        <div className={styles.status} ref={statusRef}>
          <div>
            <span>Status</span>
            <strong>{isReady ? 'Dataset carregado' : 'Processando dataset'}</strong>
          </div>
          <small>{isReady ? 'Análise pronta' : 'Análise em andamento'}</small>
          <i className={isReady ? styles.readyDot : undefined} />
        </div>

        <div className={styles.log} aria-label="Log de análise">
          {messages.map((message, index) => (
            <span
              key={message}
              ref={(node) => { logRefs.current[index] = node }}
              className={[
                revealedLogs.includes(index) ? styles.visibleLog : styles.futureLog,
                index === messageIndex ? styles.activeLog : '',
              ].filter(Boolean).join(' ')}
            >
              {String(index + 1).padStart(2, '0')} / {message}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

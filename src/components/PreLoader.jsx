import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { dataConnections, dataPoints, POINTS_PER_LINE } from '../data/dataField'
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

export function PreLoader({ onReady, onComplete }) {
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
  const logTextRefs = useRef([])
  const dataSvgRef = useRef(null)
  const floatingPointsRef = useRef(null)
  const pointRefs = useRef([])
  const lineRefs = useRef([])
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [revealedLogs, setRevealedLogs] = useState([])
  const [isReady, setIsReady] = useState(false)
  const [viewport] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }))

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const supportsStableGutter = window.CSS?.supports?.('scrollbar-gutter: stable')
    const previousOverflow = document.body.style.overflow
    const previousTouchAction = document.body.style.touchAction
    const previousPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const progressState = { value: 0 }
    let lastProgress = -1
    let lastMessageIndex = -1
    let readyDispatched = false
    const initialPixels = []
    const toViewportPoint = ([x, y]) => [
      (x / 100) * viewport.width,
      (y / 100) * viewport.height,
    ]
    const getFinalPoint = (pointData, index) => {
      const heroPoint = document.querySelector(`[data-hero-point="${index}"]`)
      const rect = heroPoint?.getBoundingClientRect()

      if (rect) {
        return [
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
        ]
      }

      return toViewportPoint(pointData.final)
    }
    const getInitialPoint = (pointData) => {
      const lineElement = logRefs.current[pointData.line]
      const textElement = logTextRefs.current[pointData.line]
      const rect = lineElement?.getBoundingClientRect()
      const textRect = textElement?.getBoundingClientRect()

      if (!rect || !textRect) {
        return [
          viewport.width * 0.32 + pointData.point * 28,
          window.innerHeight * (0.65 + pointData.line * 0.024),
        ]
      }

      const usableWidth = Math.max(32, textRect.width * 0.78)
      const startX = textRect.left
      const clientX = startX + (usableWidth / (POINTS_PER_LINE - 1)) * pointData.point
      const firstLineRect = logRefs.current[0]?.getBoundingClientRect()
      const baseY = firstLineRect
        ? firstLineRect.top + firstLineRect.height / 2
        : rect.top + rect.height / 2
      const clientY = baseY + pointData.line * 26 - 20

      return [clientX, clientY]
    }

    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    if (!supportsStableGutter && scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const heroElements = gsap.utils.toArray('[data-hero]')
    const heroTitle = heroElements[1]

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

      if (nextProgress !== lastProgress) {
        lastProgress = nextProgress
        setProgress(nextProgress)
      }
      gsap.set(barRef.current, { scaleX: progressState.value / 100 })
      setStage(nextMessageIndex)
    }
    const dispatchReady = () => {
      if (readyDispatched) return
      readyDispatched = true
      onReady()
    }

    gsap.set(barRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(cardRef.current, { autoAlpha: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.985 })
    gsap.set([labelRef.current, titleRef.current, nameRef.current, progressRef.current, statusRef.current], {
      autoAlpha: 0,
      y: reduceMotion ? 0 : 8,
    })
    gsap.set(titleRef.current, { clipPath: 'inset(0 0 100% 0)' })
    gsap.set(logRefs.current, { autoAlpha: 0, y: reduceMotion ? 0 : 6 })
    gsap.set(logTextRefs.current, { clipPath: 'inset(0% 0% 0% 0%)' })
    gsap.set(dataSvgRef.current, { autoAlpha: 0 })
    gsap.set(floatingPointsRef.current, { autoAlpha: 1 })
    pointRefs.current.forEach((point, index) => {
      const [x, y] = getInitialPoint(dataPoints[index])
      initialPixels[index] = [x, y]
      gsap.set(point, { x, y, xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.6, transformOrigin: 'center center' })
    })
    gsap.set(lineRefs.current, { autoAlpha: 0, strokeDasharray: 1.4, strokeDashoffset: 1.4 })
    gsap.set(heroElements, {
      autoAlpha: 0,
      y: reduceMotion ? 0 : 84,
      scale: 1,
      filter: reduceMotion ? 'none' : 'blur(6px)',
    })
    if (heroTitle) gsap.set(heroTitle, { clipPath: 'inset(0 0 0% 0)' })

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
      .to(labelRef.current, { autoAlpha: 1, y: 0, duration: reduceMotion ? 0.12 : 0.38 }, 0.25)
      .to(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        clipPath: 'inset(0 0 0% 0)',
        duration: reduceMotion ? 0.16 : 0.62,
      }, 0.38)
      .to(nameRef.current, { autoAlpha: 1, y: 0, duration: reduceMotion ? 0.12 : 0.36 }, 0.52)
      .to([progressRef.current, statusRef.current], {
        autoAlpha: 1,
        y: 0,
        duration: reduceMotion ? 0.14 : 0.42,
        stagger: reduceMotion ? 0 : 0.08,
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
      }, [], '+=0.1')
      .to(statusRef.current, {
        borderColor: 'rgba(22, 163, 107, .24)',
        duration: reduceMotion ? 0.1 : 0.28,
        ease: 'power2.out',
      })
      .to({}, { duration: reduceMotion ? 0.16 : 0.5 })
      .to(dataSvgRef.current, { autoAlpha: 1, duration: reduceMotion ? 0.08 : 0.18 })

    for (let line = 0; line < 6; line += 1) {
      const linePoints = pointRefs.current.filter((_, index) => dataPoints[index].line === line)
      const conversionDuration = reduceMotion ? 0.12 : 0.9
      const pointStagger = reduceMotion ? 0 : 0.035
      const pointDuration = Math.max(0.2, conversionDuration - pointStagger * (linePoints.length - 1))
      timeline
        .to(logTextRefs.current[line], {
          autoAlpha: 0.5,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: reduceMotion ? 0.06 : 0.12,
          ease: 'power2.out',
        }, line === 0 ? '>' : '<0.08')
        .to(linePoints, {
          autoAlpha: 1,
          scale: 0.86,
          duration: pointDuration,
          stagger: pointStagger,
          ease: 'power2.out',
        }, '<')
        .to(logTextRefs.current[line], {
          autoAlpha: 0,
          clipPath: 'inset(0% 0% 0% 100%)',
          duration: conversionDuration,
          ease: 'power2.out',
        }, '<')
    }

    timeline
      .to(logTextRefs.current[6], {
        autoAlpha: 0,
        clipPath: 'inset(0% 0% 0% 100%)',
        duration: reduceMotion ? 0.08 : 0.24,
        ease: 'power2.out',
      }, '<0.12')
      .to(cardRef.current, {
        autoAlpha: 0,
        y: reduceMotion ? 0 : -12,
        scale: reduceMotion ? 1 : 0.99,
        filter: reduceMotion ? 'none' : 'blur(2px)',
        duration: reduceMotion ? 0.16 : 0.58,
        ease: 'power4.inOut',
      }, '<0.18')
      .add('migrate', '<0.14')

    pointRefs.current.forEach((point, index) => {
      const pointData = dataPoints[index]
      const final = getFinalPoint(pointData, index)
      timeline.to(point, {
        x: final[0],
        y: final[1],
        scale: 1,
        duration: reduceMotion ? 0.18 : pointData.duration,
        ease: index % 3 === 0 ? 'power3.inOut' : 'sine.inOut',
      }, `migrate+=${reduceMotion ? 0 : pointData.delay}`)
    })

    timeline
      .to(lineRefs.current, {
        autoAlpha: 1,
        strokeDashoffset: 0,
        duration: reduceMotion ? 0.14 : 0.72,
        stagger: reduceMotion ? 0 : 0.055,
        ease: 'power2.out',
      }, 'migrate+=1.05')
      .to(rootRef.current, {
        autoAlpha: 0,
        duration: reduceMotion ? 0.18 : 0.46,
        ease: 'power2.out',
      }, 'migrate+=1.68')
      .call(dispatchReady, [], 'migrate+=1.6')

    return () => {
      timeline.kill()
      document.body.style.overflow = previousOverflow
      document.body.style.touchAction = previousTouchAction
      document.body.style.paddingRight = previousPaddingRight
    }
  }, [onReady, onComplete])

  return (
    <div className={styles.preloader} ref={rootRef} role="status" aria-live="polite">
      <div className={styles.grid} aria-hidden="true" />
      <svg className={styles.dataField} ref={dataSvgRef} viewBox={`0 0 ${viewport.width} ${viewport.height}`} preserveAspectRatio="none" aria-hidden="true">
        <g className={styles.dataLines}>
          {dataConnections.map(([from, to], index) => {
            const [x1, y1] = [(dataPoints[from].final[0] / 100) * viewport.width, (dataPoints[from].final[1] / 100) * viewport.height]
            const [x2, y2] = [(dataPoints[to].final[0] / 100) * viewport.width, (dataPoints[to].final[1] / 100) * viewport.height]
            return (
              <line
                key={`${from}-${to}`}
                ref={(node) => { lineRefs.current[index] = node }}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
              />
            )
          })}
        </g>
      </svg>
      <div className={styles.floatingPoints} ref={floatingPointsRef} aria-hidden="true">
        {dataPoints.map((point, index) => (
          <span
            key={`${point.final[0]}-${point.final[1]}`}
            ref={(node) => { pointRefs.current[index] = node }}
            style={{ '--dot-size': `${point.size}px` }}
          />
        ))}
      </div>
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
              <b ref={(node) => { logTextRefs.current[index] = node }}>
                {String(index + 1).padStart(2, '0')} / {message}
              </b>
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

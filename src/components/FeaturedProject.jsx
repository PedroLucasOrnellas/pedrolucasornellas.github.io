import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowDownToLine, ArrowUpRight, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { certificates } from '../data/portfolio'
import { SectionHeading } from './SectionHeading'
import styles from '../styles/Sections.module.css'

export function FeaturedProject() {
  const [activeIndex, setActiveIndex] = useState(0)
  const viewerRef = useRef(null)
  const previewRef = useRef(null)
  const infoRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const skillRefs = useRef([])
  const actionRefs = useRef([])
  const transitionRef = useRef(null)
  const hasAnimatedRef = useRef(false)
  const activeCertificate = certificates[activeIndex]

  useEffect(() => {
    certificates.forEach((certificate) => {
      const image = new Image()
      image.src = certificate.thumbnail
    })
  }, [])

  const animateIn = useCallback(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = [
      previewRef.current,
      infoRef.current,
      titleRef.current,
      descriptionRef.current,
      ...skillRefs.current,
      ...actionRefs.current,
    ].filter(Boolean)

    gsap.killTweensOf(targets)

    if (reduceMotion) {
      gsap.set(targets, { autoAlpha: 1, x: 0, y: 0, scale: 1 })
      return
    }

    transitionRef.current = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .fromTo(previewRef.current, {
        autoAlpha: 0,
        x: 14,
        scale: 0.99,
      }, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        duration: 0.34,
        ease: 'expo.out',
      }, 0)
      .fromTo(titleRef.current, {
        autoAlpha: 0,
        y: 8,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
      }, 0.1)
      .fromTo(descriptionRef.current, {
        autoAlpha: 0,
        y: 8,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.3,
      }, 0.18)
      .fromTo(skillRefs.current, {
        autoAlpha: 0,
        y: 8,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.26,
        stagger: 0.045,
      }, 0.26)
      .fromTo(actionRefs.current, {
        autoAlpha: 0,
        y: 8,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.28,
        stagger: 0.06,
      }, 0.38)
  }, [])

  useLayoutEffect(() => {
    if (!hasAnimatedRef.current) {
      hasAnimatedRef.current = true
      return
    }

    animateIn()

    return () => {
      transitionRef.current?.kill()
    }
  }, [activeIndex, animateIn])

  const selectCertificate = useCallback((nextIndex) => {
    if (nextIndex === activeIndex) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    transitionRef.current?.kill()

    if (reduceMotion) {
      setActiveIndex(nextIndex)
      return
    }

    const outgoingTargets = [
      previewRef.current,
      titleRef.current,
      descriptionRef.current,
      ...skillRefs.current,
      ...actionRefs.current,
    ].filter(Boolean)

    transitionRef.current = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        setActiveIndex(nextIndex)
      },
    })
      .to(outgoingTargets, {
        autoAlpha: 0.42,
        duration: 0.12,
      })
      .to(previewRef.current, {
        x: -10,
        autoAlpha: 0,
        duration: 0.18,
      }, '<0.03')
      .to([titleRef.current, descriptionRef.current, ...skillRefs.current, ...actionRefs.current].filter(Boolean), {
        x: -8,
        autoAlpha: 0,
        duration: 0.16,
        stagger: 0.018,
      }, '<')
  }, [activeIndex])

  return (
    <section id="project" data-section className={styles.section}>
      <SectionHeading
        index={6}
        eyebrow="Evidências de aprendizado"
        title="Formação Contínua"
        description="Um repositório de certificados que documenta a evolução técnica do candidato."
      />

      <div className={styles.learningViewer} ref={viewerRef} data-reveal>
        <div className={styles.learningMain}>
          <div className={styles.learningPreview} ref={previewRef}>
            <img src={activeCertificate.thumbnail} alt={`Preview do certificado ${activeCertificate.course}`} />
          </div>

          <div className={styles.learningInfo} ref={infoRef}>
            <div className={styles.learningTitle} ref={titleRef}>
              <small>Instituição</small>
              <strong>{activeCertificate.institution}</strong>
              <h3>{activeCertificate.course}</h3>
            </div>

            <div className={styles.learningMeta}>
              <div>
                <small>Status</small>
                <p><CheckCircle2 size={15} /> {activeCertificate.status}</p>
              </div>
              <div>
                <small>Carga horária</small>
                <p>{activeCertificate.workload}</p>
              </div>
              <div>
                <small>Conclusão</small>
                <p>{activeCertificate.completedAt}</p>
              </div>
            </div>

            <p className={styles.learningDescription} ref={descriptionRef}>
              {activeCertificate.description}
            </p>

            <div className={styles.learningSkills} aria-label="Competências adquiridas">
              {activeCertificate.skills.slice(0, 6).map((skill, index) => (
                <span
                  key={skill}
                  ref={(node) => {
                    if (node) skillRefs.current[index] = node
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className={styles.learningActions}>
              <a
                ref={(node) => {
                  if (node) actionRefs.current[0] = node
                }}
                className={styles.primaryButton}
                href={activeCertificate.pdf}
                target="_blank"
                rel="noreferrer"
              >
                Abrir Certificado <ArrowUpRight size={16} />
              </a>
              <a
                ref={(node) => {
                  if (node) actionRefs.current[1] = node
                }}
                className={styles.downloadButton}
                href={activeCertificate.pdf}
                download
              >
                <ArrowDownToLine size={16} />
                <span>Baixar PDF<small>Documento original</small></span>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.certificateShelf} aria-label="Selecionar certificado">
          {certificates.map((certificate, index) => (
            <button
              key={certificate.course}
              type="button"
              className={`${styles.shelfItem} ${index === activeIndex ? styles.activeShelfItem : ''}`}
              onClick={() => selectCertificate(index)}
              aria-pressed={index === activeIndex}
            >
              <img src={certificate.thumbnail} alt="" aria-hidden="true" />
              <span>
                <strong>{certificate.course}</strong>
                <small>{certificate.institution} · {certificate.status}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

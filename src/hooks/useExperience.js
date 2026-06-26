import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useExperience(enabled = true) {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    if (!enabled) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduceMotion
      ? null
      : new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.85 })
    let frame

    const raf = (time) => {
      lenis?.raf(time)
      frame = requestAnimationFrame(raf)
    }
    if (lenis) frame = requestAnimationFrame(raf)
    lenis?.on('scroll', ScrollTrigger.update)

    const sections = [...document.querySelectorAll('[data-section]')]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -45%' },
    )
    sections.forEach((section) => observer.observe(section))

    if (!reduceMotion) {
      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            y: 48,
            scale: 0.98,
            filter: 'blur(8px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'transform,filter,opacity,visibility',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })
      gsap.fromTo(
        '[data-hero]',
        {
          autoAlpha: 0,
          y: 36,
          filter: 'blur(8px)',
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,filter,opacity,visibility',
        },
      )
      ScrollTrigger.refresh()
    }

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      lenis?.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return activeSection
}

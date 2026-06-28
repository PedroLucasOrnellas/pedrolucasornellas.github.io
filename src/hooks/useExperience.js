import { useLayoutEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let activeLenis = null
let activeLenisTick = null

export function useExperience(enabled = true, animateHero = true) {
  const [activeSection, setActiveSection] = useState('overview')

  useLayoutEffect(() => {
    if (!enabled) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobileNav = window.matchMedia('(max-width: 1100px)').matches
    const lenis = reduceMotion
      ? null
      : new Lenis({
        duration: 1.1,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        autoRaf: false,
      })
    const lenisTick = (time) => {
      lenis?.raf(time * 1000)
    }

    if (activeLenis && activeLenis !== lenis) {
      if (activeLenisTick) gsap.ticker.remove(activeLenisTick)
      activeLenis.destroy()
      activeLenisTick = null
    }
    activeLenis = lenis
    lenis?.on('scroll', ScrollTrigger.update)
    if (lenis) {
      gsap.ticker.add(lenisTick)
      activeLenisTick = lenisTick
    }
    let introTimeline

    const sections = [...document.querySelectorAll('[data-section]')]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          setActiveSection((current) => (current === visible.target.id ? current : visible.target.id))
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-20% 0px -45%' },
    )
    sections.forEach((section) => observer.observe(section))

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
      const nav = document.querySelector('[data-nav]')
      const navItems = gsap.utils.toArray('[data-nav-item]')
      const progressRail = document.querySelector('[data-progress-rail]')
      const heroElements = gsap.utils.toArray('[data-hero]')
      introTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (animateHero && heroElements.length) {
        gsap.killTweensOf(heroElements)

        introTimeline
          .set(heroElements, {
            autoAlpha: 0,
            y: 84,
            scale: 1,
            filter: 'blur(6px)',
          }, 0)
          .to(heroElements, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'transform,filter,opacity,visibility',
          }, 0)
      }

      if (nav) {
        gsap.set(nav, { clearProps: 'width,height,padding,transform,overflow,opacity,visibility' })
        gsap.set(navItems, { clearProps: 'transform,opacity,visibility' })

        const { width: navWidth, height: navHeight } = nav.getBoundingClientRect()
        const navStart = isMobileNav ? 1.12 : 0.12
        const navItemsStart = isMobileNav ? 1.4 : 0.4
        const navClearStart = isMobileNav ? 3.24 : 2.24

        introTimeline
          .set(navItems, { autoAlpha: 0, x: 6 }, 0)
          .set(nav, {
            autoAlpha: 1,
            width: 0,
            height: navHeight,
            padding: 0,
            overflow: 'hidden',
            transformOrigin: 'right center',
          }, 0)
          .to(nav, {
            width: navWidth,
            padding: 6,
            duration: 2.08,
            ease: 'expo.out',
          }, navStart)
          .to(navItems, {
            autoAlpha: 1,
            x: 0,
            duration: 1,
            stagger: 0.045,
            ease: 'power2.out',
            clearProps: 'transform,opacity,visibility',
          }, navItemsStart)
          .set(nav, { clearProps: 'width,height,padding,transform,overflow' }, navClearStart)
      }

      if (progressRail) {
        gsap.set(progressRail, { clearProps: 'width,height,padding,transform,overflow,opacity,visibility' })

        const railRect = progressRail.getBoundingClientRect()
        const railStyles = window.getComputedStyle(progressRail)
        const railPadding = {
          paddingTop: parseFloat(railStyles.paddingTop) || 0,
          paddingRight: parseFloat(railStyles.paddingRight) || 0,
          paddingBottom: parseFloat(railStyles.paddingBottom) || 0,
          paddingLeft: parseFloat(railStyles.paddingLeft) || 0,
        }

        gsap.set(progressRail, {
          autoAlpha: 0.5,
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          overflow: 'hidden',
          transformOrigin: 'top center',
        })

        introTimeline
          .to(progressRail, {
            autoAlpha: 1,
            height: railRect.height,
            ...railPadding,
            duration: 1.6,
            ease: 'power3.inOut',
          }, '-=1.5')
          .set(progressRail, { clearProps: 'height,padding,transform,overflow' })
      }

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 48,
            scale: 0.98,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: {
              trigger: element,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })
      ScrollTrigger.refresh()
    } else {
      gsap.set('[data-nav]', {
        autoAlpha: 1,
        width: 'auto',
        height: 'auto',
        scale: 1,
      })
      gsap.set('[data-nav-item]', {
        autoAlpha: 1,
        x: 0,
      })
      gsap.set('[data-progress-rail]', {
        autoAlpha: 1,
        x: 0,
        height: 'auto',
      })
    }
    })

    return () => {
      observer.disconnect()
      introTimeline?.kill()
      ctx.revert()
      gsap.set('[data-nav]', { clearProps: 'width,height,padding,transform,overflow,opacity,visibility' })
      gsap.set('[data-nav-item]', { clearProps: 'transform,opacity,visibility' })
      gsap.set('[data-progress-rail]', { clearProps: 'width,height,padding,transform,overflow,opacity,visibility' })
      gsap.killTweensOf('[data-hero]')
      if (lenis) gsap.ticker.remove(lenisTick)
      lenis?.destroy()
      if (activeLenis === lenis) {
        activeLenis = null
        activeLenisTick = null
      }
    }
  }, [enabled, animateHero])

  return activeSection
}

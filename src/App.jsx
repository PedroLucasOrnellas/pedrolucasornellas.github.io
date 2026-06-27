import { useCallback, useState } from 'react'
import { CandidateSummary } from './components/CandidateSummary'
import { CareerJourney } from './components/CareerJourney'
import { Contact } from './components/Contact'
import { FeaturedProject } from './components/FeaturedProject'
import { FinalReport } from './components/FinalReport'
import { Hero } from './components/Hero'
import { HeroDataField } from './components/HeroDataField'
import { Insights } from './components/Insights'
import { PreLoader } from './components/PreLoader'
import { ProgressRail } from './components/ProgressRail'
import { Skills } from './components/Skills'
import { TopNav } from './components/TopNav'
import { WhyData } from './components/WhyData'
import { useExperience } from './hooks/useExperience'
import styles from './styles/App.module.css'

export default function App() {
  const [preloaderWasSkipped] = useState(() => (
    window.sessionStorage.getItem('human-dataset-preloader') === 'seen'
  ))
  const [preloaderComplete, setPreloaderComplete] = useState(preloaderWasSkipped)
  const [showPreloader, setShowPreloader] = useState(!preloaderWasSkipped)
  const activeSection = useExperience(preloaderComplete, preloaderWasSkipped)
  const handlePreloaderReady = useCallback(() => {
    setPreloaderComplete(true)
  }, [])
  const handlePreloaderComplete = useCallback(() => {
    setShowPreloader(false)
  }, [])

  return (
    <div className={styles.app}>
      {showPreloader && (
        <PreLoader
          onReady={handlePreloaderReady}
          onComplete={handlePreloaderComplete}
        />
      )}
      <HeroDataField active idle={preloaderComplete} />
      <div className={`${styles.shell} ${!preloaderComplete ? styles.shellPreloading : ''}`}>
        <ProgressRail activeSection={activeSection} />
        <TopNav activeSection={activeSection} />
        <main className={styles.main}>
          <Hero />
          <CandidateSummary />
          <WhyData />
          <CareerJourney />
          <Skills />
          <FeaturedProject />
          <Insights />
          <FinalReport />
          <Contact />
        </main>
      </div>
    </div>
  )
}

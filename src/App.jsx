import { useCallback, useState } from 'react'
import { CandidateSummary } from './components/CandidateSummary'
import { CareerJourney } from './components/CareerJourney'
import { Contact } from './components/Contact'
import { FeaturedProject } from './components/FeaturedProject'
import { FinalReport } from './components/FinalReport'
import { Hero } from './components/Hero'
import { Insights } from './components/Insights'
import { PreLoader } from './components/PreLoader'
import { ProgressRail } from './components/ProgressRail'
import { Skills } from './components/Skills'
import { TopNav } from './components/TopNav'
import { WhyData } from './components/WhyData'
import { useExperience } from './hooks/useExperience'
import styles from './styles/App.module.css'

export default function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(() => (
    window.sessionStorage.getItem('human-dataset-preloader') === 'seen'
  ))
  const activeSection = useExperience(preloaderComplete)
  const handlePreloaderComplete = useCallback(() => {
    setPreloaderComplete(true)
  }, [])

  return (
    <div className={styles.app}>
      {!preloaderComplete && <PreLoader onComplete={handlePreloaderComplete} />}
      <div className={`${styles.shell} ${!preloaderComplete ? styles.shellHidden : ''}`}>
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

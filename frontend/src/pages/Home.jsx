import Hero from '../components/home/Hero/Hero'
import HomeTools from '../components/home/HomeTools'
import HomeWorkflow from '../components/home/HomeWorkflow'
import Furniture from '../components/home/Furniture/Furniture'
import CallToAction from '../components/home/CallToAction/CallToAction'

function Home() {
  return (
    <main id="main-content" className="scroll-mt-[76px]">
      <Hero />
      <HomeTools />
      <HomeWorkflow />
      <Furniture showViewAll compact />
      <CallToAction />
    </main>
  )
}

export default Home
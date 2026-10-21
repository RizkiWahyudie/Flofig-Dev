import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './sections/HeroSection'
import { ProblemSolutionSection } from './sections/ProblemSolutionSection'
import { WorkflowStorySection } from './sections/WorkflowStorySection'
import { StackedFeaturesSection } from './sections/StackedFeaturesSection'
import { ProductPlaygroundSection } from './sections/ProductPlaygroundSection'
import { UseCasesSection } from './sections/UseCasesSection'
import { PricingSection } from './sections/PricingSection'
import { FAQSection } from './sections/FAQSection'
import { FinalCTASection } from './sections/FinalCTASection'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FC] text-[#101828] selection:bg-[#315CF5] selection:text-white antialiased overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSolutionSection />
        <WorkflowStorySection />
        <StackedFeaturesSection />
        <ProductPlaygroundSection />
        <UseCasesSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}

export default App

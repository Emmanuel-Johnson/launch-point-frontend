import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import RecommendedCourses from '../components/sections/RecommendedCourses';
import AdvantagesSection from '../components/sections/AdvantagesSection';
import LearningRoadmap from '../components/sections/LearningRoadmap';
import PricingSection from '../components/sections/PricingSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <RecommendedCourses />
        <AdvantagesSection />
        <LearningRoadmap />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
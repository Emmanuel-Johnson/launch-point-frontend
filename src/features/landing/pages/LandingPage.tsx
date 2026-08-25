import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/home/HeroSection";
import RecommendedCourses from "../components/sections/courses/RecommendedCourses";
import AdvantagesSection from "../components/sections/courses/AdvantagesSection";
import LearningRoadmap from "../components/sections/courses/LearningRoadmap";
import PricingSection from "../components/sections/pricing/PricingSection";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";

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
        <AboutPage />
        <ContactPage />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

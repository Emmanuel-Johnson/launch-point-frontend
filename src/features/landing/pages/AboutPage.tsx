import AboutHero from '../components/sections/about/AboutHero';
import MissionSection from '../components/sections/about/MissionSection';
import WhatWeOffer from '../components/sections/about/WhatWeOffer';
import WhyChooseSection from '../components/sections/about/WhyChooseSection';
import HowItWorksSection from '../components/sections/about/HowItWorksSection';
import StatsBand from '../components/sections/about/StatsBand';
import JourneyCta from '../components/sections/about/JourneyCta';

const AboutPage = () => {
  return (
    <div id="About" className="min-h-screen bg-white text-slate-900">
      <main>
        <AboutHero />
        <MissionSection />
        <WhatWeOffer />
        <WhyChooseSection />
        <HowItWorksSection />
        <StatsBand />
        <JourneyCta />
      </main>
    </div>
  );
};

export default AboutPage;
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContactHero from '../components/sections/contact/ContactHero';
import ContactSection from '../components/sections/contact/ContactSection';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar activeLabel="Contact" />
      <main>
        <ContactHero />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
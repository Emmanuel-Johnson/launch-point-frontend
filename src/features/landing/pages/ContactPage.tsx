import ContactHero from '../components/sections/contact/ContactHero';
import ContactSection from '../components/sections/contact/ContactSection';

const ContactPage = () => {
  return (
    <div id="Contact" className="min-h-screen bg-white text-slate-900">
      <main>
        <ContactHero />
        <ContactSection />
      </main>
    </div>
  );
};

export default ContactPage;
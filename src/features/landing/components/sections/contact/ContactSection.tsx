import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import { contactMapImageUrl } from '../../../data/contactData';

const ContactSection = () => {
  return (
    <section className="bg-indigo-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ContactForm />

          <div className="flex flex-col gap-8">
            <ContactInfo />
            <div className="overflow-hidden rounded-2xl">
              <img
                src={contactMapImageUrl}
                alt="Map showing the Launch Point location in Kochi, Kerala"
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
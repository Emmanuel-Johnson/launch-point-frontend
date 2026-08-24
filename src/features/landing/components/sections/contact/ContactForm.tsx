import type { FormEvent } from 'react';

const fieldClasses =
  'mt-2 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100';

const labelClasses = 'block text-sm font-medium text-slate-700';

const ContactForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: wire up to the backend/API later.
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">Contact Form</h2>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label htmlFor="full-name" className={labelClasses}>
            Full Name
          </label>
          <input
            id="full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@example.com"
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="subject" className={labelClasses}>
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="How can we help?"
            className={fieldClasses}
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Your message here..."
            className={`${fieldClasses} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
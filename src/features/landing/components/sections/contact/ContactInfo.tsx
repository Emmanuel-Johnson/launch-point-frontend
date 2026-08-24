import { contactDetails } from '../../../data/contactData';

const ContactInfo = () => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-900">Contact Information</h2>

      <ul className="mt-6 space-y-6">
        {contactDetails.map((detail) => {
          const { id, icon: Icon, label, value } = detail;
          return (
            <li key={id} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                <Icon className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="text-sm font-semibold text-slate-900">{value}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactInfo;
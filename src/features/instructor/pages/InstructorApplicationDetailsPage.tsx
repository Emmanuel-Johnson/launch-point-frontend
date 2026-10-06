import {
  ArrowLeft,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  GraduationCap,

  Mail,
  Phone,
  User,
  XCircle,
} from "lucide-react";

const InstructorApplicationDetailsPage = () => {
  // Sample data — replace this with API data later
  const application = {
    status: "pending",
    full_name: "Emmanuel Johnson",
    email: "emmanuel@example.com",
    phone_number: "+91 9876543210",
    job_title: "Full Stack Developer",
    years_of_experience: "3-5",
    categories_to_teach: ["Web Development", "Python", "Django"],
    short_bio:
      "Full stack developer passionate about teaching web development and helping students build real-world projects.",
    motivation:
      "I want to help aspiring developers learn practical development skills and build confidence through project-based learning.",
    portfolio_url: "https://example.com",
    linkedin_url: "https://linkedin.com/in/example",
    submitted_at: "October 7, 2026",
    admin_message: null,
  };

  const getStatusConfig = () => {
    switch (application.status) {
      case "approved":
        return {
          label: "Approved",
          description:
            "Congratulations! Your instructor application has been approved.",
          icon: CheckCircle2,
          className: "border-emerald-400/20 bg-emerald-500/10 text-emerald-400",
        };

      case "rejected":
        return {
          label: "Rejected",
          description:
            "Your instructor application was not approved at this time.",
          icon: XCircle,
          className: "border-red-400/20 bg-red-500/10 text-red-400",
        };

      default:
        return {
          label: "Pending Review",
          description:
            "Our team is reviewing your application. You will be notified once a decision has been made.",
          icon: Clock3,
          className: "border-amber-400/20 bg-amber-500/10 text-amber-400",
        };
    }
  };

  const status = getStatusConfig();
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen bg-[#07111f] px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mb-5 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Application Details
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              View the details and current status of your instructor
              application.
            </p>
          </div>
        </div>

        {/* Status Card */}
        <div
          className={`mb-8 rounded-2xl border p-6 backdrop-blur-xl ${status.className}`}
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-black/20 p-3">
              <StatusIcon size={25} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold">{status.label}</h2>

                <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-medium">
                  {application.status}
                </span>
              </div>

              <p className="mt-2 text-sm opacity-80">{status.description}</p>

              <div className="mt-4 flex items-center gap-2 text-xs opacity-70">
                <CalendarDays size={15} />
                Submitted on {application.submitted_at}
              </div>
            </div>
          </div>
        </div>

        {/* Application Information */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personal Information */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-semibold">Personal Information</h2>
                <p className="text-xs text-slate-500">
                  Your submitted contact information
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-1 text-xs text-slate-500">Full Name</p>
                <p className="text-sm font-medium">{application.full_name}</p>
              </div>

              <div>
                <p className="mb-1 text-xs text-slate-500">Email</p>

                <div className="flex items-center gap-2 text-sm">
                  <Mail size={15} className="text-slate-500" />
                  {application.email}
                </div>
              </div>

              <div>
                <p className="mb-1 text-xs text-slate-500">Phone Number</p>

                <div className="flex items-center gap-2 text-sm">
                  <Phone size={15} className="text-slate-500" />
                  {application.phone_number}
                </div>
              </div>
            </div>
          </section>

          {/* Professional Information */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                <Briefcase size={20} />
              </div>

              <div>
                <h2 className="font-semibold">Professional Information</h2>
                <p className="text-xs text-slate-500">
                  Your teaching and professional background
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-1 text-xs text-slate-500">Current Job Title</p>

                <p className="text-sm font-medium">{application.job_title}</p>
              </div>

              <div>
                <p className="mb-1 text-xs text-slate-500">
                  Years of Experience
                </p>

                <p className="text-sm font-medium">
                  {application.years_of_experience}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-slate-500">
                  Categories You Want to Teach
                </p>

                <div className="flex flex-wrap gap-2">
                  {application.categories_to_teach.map((category) => (
                    <span
                      key={category}
                      className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* About You */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                <GraduationCap size={20} />
              </div>

              <div>
                <h2 className="font-semibold">About You</h2>
                <p className="text-xs text-slate-500">
                  Information provided in your application
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="mb-2 text-xs text-slate-500">Short Bio</p>

                <p className="text-sm leading-6 text-slate-300">
                  {application.short_bio}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs text-slate-500">
                  Why do you want to become an instructor?
                </p>

                <p className="text-sm leading-6 text-slate-300">
                  {application.motivation}
                </p>
              </div>
            </div>
          </section>

          {/* Links */}
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-xl bg-blue-500/10 p-2.5 text-blue-400">
                <ExternalLink size={20} />
              </div>

              <div>
                <h2 className="font-semibold">Professional Links</h2>
                <p className="text-xs text-slate-500">
                  Links submitted with your application
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={application.portfolio_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:border-blue-400/30 hover:bg-blue-500/5"
              >
                <ExternalLink size={18} className="text-blue-400" />

                <div>
                  <p className="text-xs text-slate-500">Portfolio</p>
                  <p className="mt-1 text-sm text-blue-300">View Portfolio</p>
                </div>
              </a>

              <a
                href={application.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:border-blue-400/30 hover:bg-blue-500/5"
              >
                {/* <Linkedin size={18} className="text-blue-400" /> */}

                <div>
                  <p className="text-xs text-slate-500">LinkedIn</p>
                  <p className="mt-1 text-sm text-blue-300">
                    View LinkedIn Profile
                  </p>
                </div>
              </a>
            </div>
          </section>

          {/* Admin Message */}
          {application.status === "rejected" && application.admin_message && (
            <section className="rounded-2xl border border-red-400/20 bg-red-500/5 p-6 lg:col-span-2">
              <div className="mb-3 flex items-center gap-2 text-red-400">
                <FileText size={18} />
                <h2 className="font-semibold">Message from Admin</h2>
              </div>

              <p className="text-sm leading-6 text-slate-300">
                {application.admin_message}
              </p>
            </section>
          )}
        </div>

        {/* Approved CTA */}
        {application.status === "approved" && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:from-blue-400 hover:to-blue-500"
            >
              Go to Instructor Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorApplicationDetailsPage;

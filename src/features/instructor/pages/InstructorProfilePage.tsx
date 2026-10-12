import {
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  UserRound,
} from "lucide-react";

const InstructorProfilePage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-8 text-white">
      {/* Page heading */}
      <div>
        <p className="text-sm text-blue-400">Account / Profile</p>
        <h1 className="mt-2 text-3xl font-bold">My Profile</h1>
        <p className="mt-2 text-sm text-white/50">
          Manage your personal and professional information.
        </p>
      </div>

      {/* Profile card */}
      <section className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-800 text-3xl font-bold">
            EJ
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">Emmanuel Johnson</h2>
            <p className="mt-1 text-blue-400">Full Stack Developer</p>
            <div className="mt-3 flex flex-wrap gap-4 text-sm text-white/50">
              <span className="flex items-center gap-2">
                <MapPin size={16} />
                Tokyo, Japan
              </span>
              <span className="flex items-center gap-2">
                <Mail size={16} />
                emmanuel@example.com
              </span>
            </div>
          </div>

          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium transition hover:bg-blue-500"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>
      </section>

      {/* Personal information */}
      <section className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <UserRound className="text-blue-400" size={22} />
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <InfoItem label="Full Name" value="Emmanuel Johnson" />
          <InfoItem label="Email Address" value="emmanuel@example.com" />
          <InfoItem label="Location" value="Tokyo, Japan" />
          <InfoItem label="Occupation" value="Full Stack Developer" />
        </div>
      </section>

      {/* Professional information */}
      <section className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <BriefcaseBusiness className="text-blue-400" size={22} />
          <h2 className="text-lg font-semibold">Professional Information</h2>
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm text-white/45">Professional Bio</p>
            <p className="text-sm leading-7 text-white/75">
              Full stack developer passionate about building useful web
              applications and helping students develop practical programming
              skills.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <InfoItem
              label="Years of Experience"
              value="3 Years"
              icon={<CalendarDays size={17} />}
            />
            <InfoItem
              label="Education"
              value="Computer Science"
              icon={<GraduationCap size={17} />}
            />
          </div>
        </div>
      </section>

      {/* Teaching categories */}
      <section className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-6 md:p-8">
        <h2 className="mb-5 text-lg font-semibold">Teaching Categories</h2>

        <div className="flex flex-wrap gap-3">
          {[
            "Frontend Development",
            "Full Stack Development",
            "Web Development",
          ].map((category) => (
            <span
              key={category}
              className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300"
            >
              {category}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

interface InfoItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

const InfoItem = ({ label, value, icon }: InfoItemProps) => (
  <div>
    <p className="mb-2 text-sm text-white/45">{label}</p>
    <div className="flex items-center gap-2 text-sm font-medium text-white/90">
      {icon && <span className="text-blue-400">{icon}</span>}
      {value}
    </div>
  </div>
);

export default InstructorProfilePage;

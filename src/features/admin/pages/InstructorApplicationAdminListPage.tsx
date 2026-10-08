import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  Clock3,
  CheckCircle2,
  XCircle,
  Users,
  ArrowUpRight,
} from "lucide-react";

type ApplicationStatus = "pending" | "approved" | "rejected";

type InstructorApplication = {
  id: number;
  full_name: string;
  email: string;
  occupation: string;
  years_of_experience: number;
  status: ApplicationStatus;
  submitted_at: string;
  categories: string[];
};

const applications: InstructorApplication[] = [
  {
    id: 16,
    full_name: "Harshibar",
    email: "harshibar@example.com",
    occupation: "Full Stack Developer",
    years_of_experience: 3,
    status: "pending",
    submitted_at: "2026-10-08T02:00:54+05:30",
    categories: ["Frontend Development", "Full Stack Development"],
  },
  {
    id: 15,
    full_name: "John Doe",
    email: "john@example.com",
    occupation: "Frontend Developer",
    years_of_experience: 5,
    status: "approved",
    submitted_at: "2026-10-07T14:20:00+05:30",
    categories: ["Frontend Development", "Web Development"],
  },
  {
    id: 14,
    full_name: "Ananya Menon",
    email: "ananya@example.com",
    occupation: "Python Developer",
    years_of_experience: 4,
    status: "pending",
    submitted_at: "2026-10-06T11:30:00+05:30",
    categories: ["Python", "Backend Development"],
  },
  {
    id: 13,
    full_name: "Rahul Nair",
    email: "rahul@example.com",
    occupation: "Software Engineer",
    years_of_experience: 6,
    status: "rejected",
    submitted_at: "2026-10-05T09:15:00+05:30",
    categories: ["Full Stack Development"],
  },
];

/*
  Status colours stay semantic (amber / emerald / red) — the same way the
  dashboard keeps red as a destructive signal. Emerald doubles as the theme
  accent, so "approved" sits naturally inside the green palette.
*/
const statusStyles: Record<ApplicationStatus, string> = {
  pending: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  approved: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  rejected: "border-red-500/20 bg-red-500/10 text-red-400",
};

const InstructorApplicationAdminListPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredApplications = applications.filter((application) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      application.full_name.toLowerCase().includes(query) ||
      application.email.toLowerCase().includes(query) ||
      application.occupation.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingCount = applications.filter(
    (application) => application.status === "pending",
  ).length;

  const approvedCount = applications.filter(
    (application) => application.status === "approved",
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "rejected",
  ).length;

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const openApplication = (applicationId: number) => {
    navigate(`/admin/applications/instructors/${applicationId}`);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/55">Total applications</span>
            <Users size={19} className="text-[#34D399]" />
          </div>
          <p className="mt-4 text-3xl font-semibold text-white">
            {applications.length}
          </p>
          <p className="mt-1 text-xs text-white/45">
            All submitted applications
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/55">Pending review</span>
            <Clock3 size={19} className="text-amber-400" />
          </div>
          <p className="mt-4 text-3xl font-semibold text-white">
            {pendingCount}
          </p>
          <p className="mt-1 text-xs text-white/45">Awaiting a decision</p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/55">Approved</span>
            <CheckCircle2 size={19} className="text-emerald-400" />
          </div>
          <p className="mt-4 text-3xl font-semibold text-white">
            {approvedCount}
          </p>
          <p className="mt-1 text-xs text-white/45">Accepted applications</p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#0A0A0A] p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/55">Rejected</span>
            <XCircle size={19} className="text-red-400" />
          </div>
          <p className="mt-4 text-3xl font-semibold text-white">
            {rejectedCount}
          </p>
          <p className="mt-1 text-xs text-white/45">Declined applications</p>
        </div>
      </div>

      {/* List Heading and Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            All Instructor Applications
          </h2>
          <p className="mt-1 text-sm text-white/55">
            Review applicant profiles and their teaching expertise.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search applicants..."
              className="w-full rounded-xl border border-white/[0.08] bg-[#0F0F12] py-2.5 pl-9 pr-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/35 focus:border-[#34D399]/50 sm:w-64"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="rounded-xl border border-white/[0.08] bg-[#0F0F12] px-3 py-2.5 text-sm text-white/80 outline-none transition-colors duration-300 focus:border-[#34D399]/50"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0A0A0A]">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <p className="text-sm text-white/55">
            Showing{" "}
            <span className="font-medium text-white">
              {filteredApplications.length}
            </span>{" "}
            applications
          </p>
          <span className="hidden text-xs text-white/45 sm:block">
            Sorted by most recent
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead>
              <tr className="border-b border-white/[0.08]">
                {[
                  "Applicant",
                  "Occupation",
                  "Experience",
                  "Applied",
                  "Status",
                  "",
                ].map((heading, index) => (
                  <th
                    key={`${heading}-${index}`}
                    className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-white/40"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr
                  key={application.id}
                  onClick={() => openApplication(application.id)}
                  className="cursor-pointer border-b border-white/[0.06] transition last:border-0 hover:bg-white/[0.03]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#34D399]/20 bg-[#34D399]/10 text-sm font-semibold text-[#34D399]">
                        {application.full_name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div>
                        <p className="font-medium text-white">
                          {application.full_name}
                        </p>
                        <p className="mt-1 text-sm text-white/45">
                          {application.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-white/80">
                    {application.occupation}
                  </td>

                  <td className="px-5 py-4 text-sm text-white/80">
                    {application.years_of_experience} years
                  </td>

                  <td className="px-5 py-4 text-sm text-white/55">
                    {formatDate(application.submitted_at)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium capitalize ${statusStyles[application.status]}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {application.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        openApplication(application.id);
                      }}
                      aria-label={`View ${application.full_name}'s application`}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] px-3 py-2 text-sm text-white/80 transition hover:border-[#34D399]/40 hover:text-[#6EE7B7]"
                    >
                      <Eye size={15} />
                      View
                      <ArrowUpRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <Search size={24} className="mx-auto text-white/30" />
                    <p className="mt-3 text-sm font-medium text-white/80">
                      No applications found
                    </p>
                    <p className="mt-1 text-sm text-white/45">
                      Try changing your search or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorApplicationAdminListPage;

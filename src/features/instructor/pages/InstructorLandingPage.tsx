import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarClock,
  BadgeDollarSign,
  TrendingUp,
  Blocks,
  Video,
  Wallet,
  MessagesSquare,
  Users,
} from "lucide-react";
import Reveal from "../../../shared/components/Reveal";

/* ---------- Brand logo (matches PublicNavbar, uses instructor png) ---------- */
const BrandLogo = () => (
  <Link
    to="/"
    className="group flex items-center gap-3 transition-all duration-500 hover:scale-105"
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-lg">
      <img
        src="/instructor_logo.png"
        alt="Launch Point Logo"
        className="h-full w-full rounded-lg object-contain"
      />
    </div>

    <div>
      <span className="block text-sm font-semibold tracking-[3px] text-white transition-all duration-500 group-hover:text-blue-300">
        LAUNCH POINT
      </span>
      <p className="mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.25em] text-zinc-500 transition-all duration-500 group-hover:text-zinc-300 sm:block">
        Study hard. Work hard.
      </p>
    </div>
  </Link>
);

/* ---------- Data ---------- */
const benefits = [
  {
    icon: CalendarClock,
    title: "Teach on Your Time",
    description: "Record, publish, and update lessons whenever it suits you.",
  },
  {
    icon: BadgeDollarSign,
    title: "Earn from Teaching",
    description: "Turn your knowledge and skills into an income opportunity.",
  },
  {
    icon: Users,
    title: "Reach More Learners",
    description: "Share your knowledge with learners and help them grow.",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Name",
    description:
      "Build your reputation and become a trusted voice in your field.",
  },
];

const toolkit = [
  {
    icon: Blocks,
    title: "Course Builder",
    description: "Create lessons with an easy drag-and-drop editor.",
  },
  {
    icon: Video,
    title: "Video Hosting",
    description: "Upload and stream your course videos easily.",
  },
  {
    icon: Wallet,
    title: "Secure Payouts",
    description: "Get paid on time with clear, fair revenue sharing.",
  },
  {
    icon: MessagesSquare,
    title: "Student Support",
    description: "Answer questions and guide learners in one place.",
  },
];

const steps = [
  {
    number: "1",
    title: "Apply",
    description: "Tell us about your qualifications and teaching experience.",
  },
  {
    number: "2",
    title: "Get Approved",
    description: "Our team reviews your profile and gets you set up to teach.",
  },
  {
    number: "3",
    title: "Create",
    description: "Create and manage courses easily at your own pace.",
  },
  {
    number: "4",
    title: "Go Live",
    description: "Publish, reach real learners, and start earning.",
  },
];

const InstructorLandingPage = () => {
  const accessToken = localStorage.getItem("access");
  const isLoggedIn = !!accessToken;

  // Must have an account to apply — swap this to your real apply flow.
  const applyPath = isLoggedIn ? "/instructor/apply" : "/signup";

  return (
    <main className="bg-[#09090B] text-zinc-100">
      {/* ================= HEADER ================= */}

      <header className="border-b border-white/10 bg-[#09090B]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Back button + Logo */}

          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              to="/student/dashboard"
              aria-label="Back to student dashboard"
              className="group flex shrink-0 items-center justify-center text-zinc-400 transition-colors duration-200 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
            </Link>

            <BrandLogo />
          </div>

          {/* Right: Apply button */}
          <Link
            to={applyPath}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-blue-400"
          >
            <span className="hidden sm:inline">Become an Instructor</span>
            <span className="sm:hidden">Apply</span>
          </Link>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-white/10">
        {/* Background glow + subtle grid */}
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-40 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          {/* Left content */}
          <div>
            <Reveal>
              <span className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                Share Your Expertise
              </span>
            </Reveal>

            <Reveal delay={150}>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Teach what you love.
                <span className="mt-1 block bg-linear-to-r from-blue-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Earn while you do it.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">
                Share your knowledge with learners around the world — on your
                own schedule, at your own pace. No studio, no gatekeepers. Just
                you and the people who want to learn from you.
              </p>
            </Reveal>

            {/* <Reveal delay={450}>
              <div className="mt-10">
                <Link
                  to={applyPath}
                  className="group inline-flex items-center gap-2 rounded-lg bg-blue-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-500 ease-out hover:scale-[1.04] hover:bg-blue-400 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  Start teaching today
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </Reveal> */}
          </div>

          {/* Right visual — honest feature panel (no fake data) */}
          <Reveal delay={300}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-blue-500/10 blur-3xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0F0F12] p-8 shadow-2xl shadow-black/40">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                  Everything you need
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white">
                  One place to teach, grow, and get paid.
                </h3>

                <div className="mt-8 space-y-3">
                  {toolkit.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="group flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-500 ease-out hover:border-blue-400/30 hover:bg-white/[0.04]"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-all duration-500 group-hover:bg-blue-500/15 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-zinc-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ================= WHY TEACH WITH US ================= */}
      <section className="border-b border-white/10 bg-[#0F0F12] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal delay={100}>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                Why Teach with Us
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Built around
                <span className="text-zinc-500"> your freedom.</span>
              </h2>
              <p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg">
                The simple tools and fair terms you need to teach well and get
                rewarded for it.
              </p>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Reveal key={benefit.title} delay={300 + index * 120}>
                  <div className="group h-full bg-[#0F0F12] p-8 transition-all duration-700 ease-out hover:-translate-y-1 hover:bg-white/[0.04] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-blue-500/10 text-blue-400 transition-all duration-700 ease-out group-hover:border-blue-400/40 group-hover:bg-blue-500/15 group-hover:shadow-[0_0_24px_rgba(59,130,246,0.35)]">
                      <Icon className="h-6 w-6" />
                    </div>

                    <h3 className="mt-8 text-lg font-semibold text-white">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-zinc-500 transition-colors duration-700 group-hover:text-zinc-400">
                      {benefit.description}
                    </p>

                    <div className="mt-8 h-px w-8 bg-zinc-700 transition-all duration-700 ease-out group-hover:w-14 group-hover:bg-blue-400" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      {/* ================= FOUR STEPS ================= */}
      <section className="border-b border-white/10 bg-[#09090B] py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Reveal delay={100}>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                How It Works
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                From sign-up to
                <span className="text-zinc-500"> your first student.</span>
              </h2>
              <p className="mt-5 text-base leading-7 text-zinc-400 sm:text-lg">
                Four simple steps. No complicated setup, no guesswork.
              </p>
            </div>
          </Reveal>

          <div className="relative mt-20">
            <div className="absolute left-0 right-0 top-8 hidden h-px bg-white/10 lg:block" />

            <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
              {steps.map((step, index) => (
                <Reveal key={step.number} delay={300 + index * 150}>
                  <div className="group relative">
                    <div
                      className="relative flex h-16 w-16 items-center justify-center
                        rounded-full border border-white/10 bg-white/[0.03]
                        text-sm font-semibold text-white
                        shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
                        backdrop-blur-sm
                        transition-all duration-1000 ease-out
                        group-hover:scale-[1.04]
                        group-hover:border-blue-400/70
                        group-hover:bg-blue-500/10
                        group-hover:shadow-[0_0_30px_rgba(59,130,246,0.45)]"
                    >
                      <span
                        className="absolute inset-1.5 rounded-full
                          border border-blue-500/30
                          transition-all duration-1000 ease-out
                          group-hover:scale-105
                          group-hover:border-blue-400/80
                          group-hover:shadow-[inset_0_0_14px_rgba(59,130,246,0.25)]"
                      />
                      <span className="relative z-10">{step.number}</span>
                    </div>

                    <div className="mt-7">
                      <h3 className="text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-zinc-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ================= FINAL CTA ================= */}
      <section className="relative overflow-hidden bg-[#0F0F12] py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 to-indigo-600 px-6 py-16 text-center shadow-2xl shadow-blue-950/50 sm:px-12 lg:px-20 lg:py-20">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-sky-300/10 blur-3xl" />

              <Reveal delay={150}>
                <h2 className="relative mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Ready to start teaching?
                </h2>
              </Reveal>

              <Reveal delay={300}>
                <p className="relative mx-auto mt-6 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
                  Share your knowledge, create courses, and help learners grow.
                  Apply today and take the first step toward becoming an
                  instructor.
                </p>
              </Reveal>

              <Reveal delay={450}>
                <div className="relative mt-9">
                  <Link
                    to={applyPath}
                    className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-blue-700 shadow-lg shadow-blue-950/30 transition-all duration-500 ease-out hover:scale-[1.04] hover:bg-zinc-100"
                  >
                    Apply to become an instructor
                  </Link>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </section>
      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 bg-[#09090B] text-zinc-400">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div className="max-w-sm">
              <BrandLogo />
              <p className="mt-5 text-sm leading-7 text-zinc-500">
                Teach what you love, reach learners worldwide, and build a
                business around your knowledge.
              </p>
            </div>

            {/* Links */}
            <div className="flex gap-16">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  For Instructors
                </h3>
                <div className="mt-5 space-y-3">
                  <Link
                    to={applyPath}
                    className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
                  >
                    Apply
                  </Link>
                  <Link
                    to="#"
                    className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
                  >
                    How it works
                  </Link>
                  <Link
                    to="#"
                    className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
                  >
                    Pricing
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-white">Company</h3>
                <div className="mt-5 space-y-3">
                  <Link
                    to="/about"
                    className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
                  >
                    Contact
                  </Link>
                  <Link
                    to="#"
                    className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
                  >
                    Help Center
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              © {new Date().getFullYear()} Launch Point. All rights reserved.
            </p>

            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-sm text-zinc-500 transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm text-zinc-500 transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                X
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default InstructorLandingPage;

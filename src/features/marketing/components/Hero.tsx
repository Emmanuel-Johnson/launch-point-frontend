import { Link } from "react-router-dom";
import Reveal from "../../../shared/components/Reveal";

const techLogos = [
  {
    name: "Python",
    short: "PY",
    logo: "https://cdn.simpleicons.org/python",
    position: "left-[8%] top-[12%]",
    animation: "techFloat1 7s ease-in-out infinite",
    delay: "0s",
  },
  {
    name: "JavaScript",
    short: "JS",
    logo: "https://cdn.simpleicons.org/javascript",
    position: "right-[8%] top-[16%]",
    animation: "techFloat2 8s ease-in-out infinite",
    delay: "0.4s",
  },
  {
    name: "React",
    short: "RE",
    logo: "https://cdn.simpleicons.org/react",
    position: "left-[2%] top-[40%]",
    animation: "techFloat3 6s ease-in-out infinite",
    delay: "0.8s",
  },
  {
    name: "TypeScript",
    short: "TS",
    logo: "https://cdn.simpleicons.org/typescript",
    position: "right-[2%] top-[43%]",
    animation: "techFloat4 7.5s ease-in-out infinite",
    delay: "1.2s",
  },
  {
    name: "Django",
    short: "DJ",
    logo: "https://cdn.simpleicons.org/django",
    position: "left-[10%] bottom-[18%]",
    animation: "techFloat2 8.5s ease-in-out infinite reverse",
    delay: "0.5s",
  },
  {
    name: "PostgreSQL",
    short: "PG",
    logo: "https://cdn.simpleicons.org/postgresql",
    position: "right-[10%] bottom-[17%]",
    animation: "techFloat1 9s ease-in-out infinite reverse",
    delay: "1s",
  },
  {
    name: "Git",
    short: "G",
    logo: "https://cdn.simpleicons.org/git",
    position: "left-[22%] top-[25%]",
    animation: "techFloat4 6.5s ease-in-out infinite reverse",
    delay: "0.7s",
  },
  {
    name: "GitHub",
    short: "GH",
    logo: "https://cdn.simpleicons.org/github",
    position: "right-[22%] top-[27%]",
    animation: "techFloat3 7s ease-in-out infinite reverse",
    delay: "1.4s",
  },
  {
    name: "Redux",
    short: "RX",
    logo: "https://cdn.simpleicons.org/redux",
    position: "left-[21%] bottom-[28%]",
    animation: "techFloat1 8s ease-in-out infinite",
    delay: "0.3s",
  },
  {
    name: "HTML",
    short: "HT",
    logo: "https://cdn.simpleicons.org/html5",
    position: "right-[21%] bottom-[28%]",
    animation: "techFloat2 7s ease-in-out infinite reverse",
    delay: "1.1s",
  },
  {
    name: "CSS",
    short: "CS",
    logo: "https://cdn.simpleicons.org/css",
    position: "left-[30%] top-[9%]",
    animation: "techFloat3 8.5s ease-in-out infinite",
    delay: "1.7s",
  },
  {
    name: "REST API",
    short: "API",
    logo: "https://cdn.simpleicons.org/fastapi",
    position: "right-[30%] top-[10%]",
    animation: "techFloat4 9s ease-in-out infinite reverse",
    delay: "2s",
  },
];

const Hero = () => {
  const accessToken = localStorage.getItem("access");
  const isLoggedIn = !!accessToken;

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#09090B]">
      {/* ================= BACKGROUND GLOW ================= */}

      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />

      <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.04] blur-3xl" />

      {/* ================= HERO CONTENT ================= */}

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* ================= LEFT CONTENT ================= */}

          <div className="text-center lg:text-left">
            {/* Badge */}
            <Reveal delay={100}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-400" />
                </span>

                <span className="text-sm font-medium text-zinc-300">
                  Learn. Build. Grow.
                </span>
              </div>
            </Reveal>

            {/* Heading */}
            <Reveal delay={250}>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Learn Skills.
                <span className="mt-2 block bg-gradient-to-r from-indigo-400 via-violet-400 to-violet-500 bg-clip-text text-transparent">
                  Build Your Future.
                </span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal delay={400}>
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl lg:mx-0">
                Master practical skills through structured courses, expert
                guidance, and hands-on learning designed to help you achieve
                your goals.
              </p>
            </Reveal>

            {/* CTA */}
            <Reveal delay={550}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  to="/courses"
                  className="w-full rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-700 ease-out hover:scale-[1.04] hover:bg-zinc-200 sm:w-auto"
                >
                  Explore Courses
                </Link>

                {isLoggedIn ? (
                  <Link
                    to="/student/dashboard"
                    className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-700 ease-out hover:scale-[1.04] hover:border-white/25 hover:bg-white/[0.08] sm:w-auto"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="w-full rounded-lg border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-700 ease-out hover:scale-[1.04] hover:border-white/25 hover:bg-white/[0.08] sm:w-auto"
                  >
                    Get Started
                  </Link>
                )}
              </div>
            </Reveal>

            {/* Trust / Stats */}
            <Reveal delay={700}>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-7 lg:mx-0">
                <div className="px-4">
                  <p className="text-2xl font-bold text-white">10K+</p>
                  <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                    Learners
                  </p>
                </div>

                <div className="px-4">
                  <p className="text-2xl font-bold text-white">200+</p>
                  <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                    Courses
                  </p>
                </div>

                <div className="px-4">
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                    Instructors
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* =========================================================
              RIGHT FULL-STACK DEVELOPER PORTAL
              ========================================================= */}

          <Reveal delay={300}>
            <div className="group relative flex min-h-[480px] items-center justify-center lg:min-h-[600px]">
              {/* =====================================================
                  AMBIENT GLOW
                  ===================================================== */}

              <div className="absolute h-[360px] w-[360px] rounded-full bg-indigo-600/10 blur-[100px] transition-all duration-[1200ms] ease-out group-hover:scale-125 group-hover:bg-violet-600/20 group-hover:blur-[120px]" />

              <div
                className="absolute h-[260px] w-[260px] rounded-full bg-violet-500/[0.08] blur-[80px]"
                style={{
                  animation: "portalGlow 4s ease-in-out infinite",
                }}
              />

              {/* =====================================================
                  TECHNOLOGY LOGOS
                  ===================================================== */}

              <div className="absolute inset-0">
                {techLogos.map((tech) => (
                  <div
                    key={tech.name}
                    className={`absolute ${tech.position} z-20`}
                    style={{
                      animation: tech.animation,
                      animationDelay: tech.delay,
                    }}
                  >
                    <div className="tech-logo group/logo relative">
                      {/* Outer glow */}
                      <div className="absolute inset-[-12px] rounded-2xl bg-indigo-500/10 opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover/logo:bg-violet-500/30" />

                      {/* Logo container */}
                      <div className="relative flex h-[54px] w-[54px] items-center justify-center rounded-2xl border border-white/10 bg-[#0d0d11]/90 shadow-[0_0_25px_rgba(99,102,241,0.08)] backdrop-blur-xl transition-all duration-700 group-hover:scale-125 group-hover:border-indigo-400/40 group-hover:bg-indigo-500/[0.08] group-hover:shadow-[0_0_35px_rgba(139,92,246,0.35)]">
                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="h-7 w-7 object-contain opacity-70 brightness-125 transition-all duration-700 group-hover/logo:scale-110 group-hover/logo:opacity-100"
                        />

                        {/* Shine */}
                        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                          <span
                            className="absolute -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"
                            style={{
                              animation: "logoShine 4s ease-in-out infinite",
                            }}
                          />
                        </span>
                      </div>

                      {/* Tech name */}
                      <div className="absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <span className="text-[10px] font-medium tracking-wide text-zinc-500">
                          {tech.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* =====================================================
                  CONNECTING ORBIT LINES
                  ===================================================== */}

              <div
                className="absolute h-[390px] w-[390px] rounded-full border border-indigo-400/[0.07]"
                style={{
                  animation: "orbitSpin 25s linear infinite",
                }}
              />

              <div
                className="absolute h-[330px] w-[330px] rounded-full border border-violet-400/[0.06]"
                style={{
                  animation: "orbitSpinReverse 20s linear infinite",
                }}
              />

              <div
                className="absolute h-[250px] w-[250px] rounded-full border border-indigo-300/[0.05]"
                style={{
                  animation: "orbitPulse 5s ease-in-out infinite",
                }}
              />

              {/* =====================================================
                  CENTRAL PORTAL
                  ===================================================== */}

              <div className="relative flex h-[420px] w-[420px] items-center justify-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]">
                {/* Atmospheric glow */}
                <div
                  className="absolute h-[330px] w-[330px] rounded-full bg-indigo-600/10 blur-[80px] transition-all duration-1000 group-hover:scale-125 group-hover:bg-violet-600/20 group-hover:blur-[100px]"
                  style={{
                    animation: "portalGlow 4s ease-in-out infinite",
                  }}
                />

                {/* Outer ring */}
                <div
                  className="absolute h-[350px] w-[350px] rounded-full border border-indigo-400/10 transition-all duration-1000 group-hover:border-violet-400/30"
                  style={{
                    animation: "slowSpin 18s linear infinite",
                  }}
                />

                {/* =================================================
                    ENERGY RING
                    ================================================= */}

                <div
                  className="absolute h-[300px] w-[300px] rounded-full transition-all duration-1000 group-hover:scale-110"
                  style={{
                    animation: "energyRotate 12s linear infinite",
                  }}
                >
                  {/* Ring glow */}
                  <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-[25px]" />

                  {/* Energy particles */}
                  <span
                    className="absolute left-1/2 top-[-12px] h-3 w-3 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_25px_rgba(167,139,250,0.9)]"
                    style={{
                      animation: "energyDot 2s ease-in-out infinite",
                    }}
                  />

                  <span
                    className="absolute right-[-2px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-indigo-300 shadow-[0_0_22px_rgba(129,140,248,0.9)]"
                    style={{
                      animation: "energyDot 2.4s ease-in-out infinite",
                    }}
                  />

                  <span
                    className="absolute bottom-[-4px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-purple-300 shadow-[0_0_22px_rgba(192,132,252,0.9)]"
                    style={{
                      animation: "energyDot 1.8s ease-in-out infinite reverse",
                    }}
                  />

                  <span
                    className="absolute left-[-3px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-indigo-200 shadow-[0_0_22px_rgba(165,180,252,0.9)]"
                    style={{
                      animation: "energyDot 2.2s ease-in-out infinite reverse",
                    }}
                  />

                  {/* Inner ring */}
                  <div
                    className="absolute inset-[30px] rounded-full border-2 border-indigo-400/20 shadow-[0_0_40px_rgba(99,102,241,0.2),inset_0_0_40px_rgba(139,92,246,0.15)] transition-all duration-1000 group-hover:border-violet-300/50 group-hover:shadow-[0_0_65px_rgba(139,92,246,0.45),inset_0_0_55px_rgba(99,102,241,0.25)]"
                    style={{
                      animation: "innerPulse 3s ease-in-out infinite",
                    }}
                  />

                  {/* Inner dotted orbit */}
                  <div
                    className="absolute inset-[48px] rounded-full border border-dashed border-violet-300/10"
                    style={{
                      animation: "slowSpinReverse 10s linear infinite",
                    }}
                  />
                </div>

                {/* =================================================
                    CENTRAL CODE CORE
                    ================================================= */}

                <div className="relative flex h-[155px] w-[155px] items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-transparent shadow-[0_0_80px_rgba(99,102,241,0.35)] transition-all duration-1000 group-hover:scale-110 group-hover:shadow-[0_0_130px_rgba(139,92,246,0.65)]">
                  {/* Core glow */}
                  <div
                    className="absolute h-[110px] w-[110px] rounded-full bg-indigo-500/20 blur-2xl transition-all duration-1000 group-hover:scale-125 group-hover:bg-violet-400/30"
                    style={{
                      animation: "corePulse 3s ease-in-out infinite",
                    }}
                  />

                  {/* Code symbol */}
                  <div className="relative flex h-[82px] w-[82px] items-center justify-center rounded-3xl border border-indigo-300/20 bg-[#0c0c10]/80 shadow-[0_0_45px_rgba(129,140,248,0.35)] backdrop-blur-xl transition-all duration-1000 group-hover:scale-110 group-hover:border-violet-300/50">
                    <div className="flex items-center gap-1 font-mono text-2xl font-bold">
                      <span className="text-indigo-300">&lt;</span>
                      <span className="text-violet-300">/</span>
                      <span className="text-purple-300">&gt;</span>
                    </div>

                    {/* Code glow */}
                    <div className="absolute inset-0 rounded-3xl bg-violet-500/10 blur-xl" />
                  </div>
                </div>

                {/* =================================================
                    OUTER ARCS
                    ================================================= */}

                <div
                  className="absolute h-[410px] w-[410px] rounded-full border-t border-indigo-300/20 transition-all duration-1000 group-hover:border-violet-300/50"
                  style={{
                    animation: "slowSpinReverse 14s linear infinite",
                  }}
                />

                <div
                  className="absolute h-[440px] w-[440px] rounded-full border-b border-violet-300/15 transition-all duration-1000 group-hover:border-indigo-300/40"
                  style={{
                    animation: "slowSpin 20s linear infinite",
                  }}
                />
              </div>

              {/* =====================================================
                  FLOATING CODE TEXT
                  ===================================================== */}

              <div
                className="absolute left-[31%] top-[20%] font-mono text-[10px] text-indigo-300/25"
                style={{
                  animation: "codeFloat 5s ease-in-out infinite",
                }}
              >
                {"{ code }"}
              </div>

              <div
                className="absolute bottom-[22%] right-[30%] font-mono text-[10px] text-violet-300/25"
                style={{
                  animation: "codeFloat 6s ease-in-out infinite reverse",
                }}
              >
                {"<dev />"}
              </div>

              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md transition-all duration-700 group-hover:border-indigo-400/30 group-hover:bg-indigo-400/[0.08]"
                style={{
                  animation: "floatingLabel 4s ease-in-out infinite",
                }}
              >
                <span className="text-xs font-medium tracking-wide text-zinc-400 transition-colors duration-700 group-hover:text-zinc-200">
                  Build. Code. Create.
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* =============================================================
          ANIMATIONS
          ============================================================= */}

      <style>{`
        /* =========================
           GENERAL
        ========================= */

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slowSpinReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        /* =========================
           PORTAL
        ========================= */

        @keyframes portalGlow {
          0%,
          100% {
            transform: scale(0.95);
            opacity: 0.45;
          }

          50% {
            transform: scale(1.1);
            opacity: 0.85;
          }
        }

        @keyframes energyRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbitSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbitSpinReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        @keyframes orbitPulse {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.4;
          }

          50% {
            transform: scale(1.04);
            opacity: 0.8;
          }
        }

        @keyframes innerPulse {
          0%,
          100% {
            transform: scale(0.96);
            opacity: 0.5;
          }

          50% {
            transform: scale(1.04);
            opacity: 0.95;
          }
        }

        /* =========================
           CORE
        ========================= */

        @keyframes corePulse {
          0%,
          100% {
            transform: scale(0.8);
            opacity: 0.4;
          }

          50% {
            transform: scale(1.15);
            opacity: 0.9;
          }
        }

        @keyframes energyDot {
          0%,
          100% {
            transform: scale(0.75);
            opacity: 0.45;
          }

          50% {
            transform: scale(1.5);
            opacity: 1;
          }
        }

        /* =========================
           TECHNOLOGY LOGOS
        ========================= */

        @keyframes techFloat1 {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          25% {
            transform: translate3d(10px, -14px, 0);
          }

          50% {
            transform: translate3d(4px, -24px, 0);
          }

          75% {
            transform: translate3d(-8px, -10px, 0);
          }
        }

        @keyframes techFloat2 {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          30% {
            transform: translate3d(-12px, 12px, 0);
          }

          60% {
            transform: translate3d(-20px, -5px, 0);
          }

          80% {
            transform: translate3d(-7px, -15px, 0);
          }
        }

        @keyframes techFloat3 {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          40% {
            transform: translate3d(15px, -18px, 0);
          }

          70% {
            transform: translate3d(20px, 8px, 0);
          }
        }

        @keyframes techFloat4 {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          35% {
            transform: translate3d(-15px, -12px, 0);
          }

          65% {
            transform: translate3d(8px, -24px, 0);
          }
        }

        @keyframes logoShine {
          0% {
            left: -100%;
          }

          30%,
          100% {
            left: 160%;
          }
        }

        /* =========================
           CODE TEXT
        ========================= */

        @keyframes codeFloat {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.25;
          }

          50% {
            transform: translateY(-12px);
            opacity: 0.6;
          }
        }

        /* =========================
           LABEL
        ========================= */

        @keyframes floatingLabel {
          0%,
          100% {
            transform: translate(-50%, 0);
          }

          50% {
            transform: translate(-50%, -8px);
          }
        }

        /* =========================
           REDUCED MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 640px) {
          .tech-logo > div {
            transform: scale(0.82);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;

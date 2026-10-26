interface ComingSoonPageProps {
  featureName?: string;
  title?: string;
  description?: string;
}

export default function ComingSoonPage({
  featureName = "Something New",
  description = "A new experience is taking shape. We're building something meaningful to help you learn, grow, and go further.",
}: ComingSoonPageProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#08070D] px-6 py-20 text-white selection:bg-violet-500/30">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[42%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.07] blur-[150px]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#08070D_78%)]" />

        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      {/* Top label */}
      <div className="absolute left-6 top-7 flex items-center gap-3 sm:left-10 sm:top-9">
        <span className="text-[11px] font-medium tracking-[0.12em] text-white/50">
          BUILT FOR WHAT'S NEXT
        </span>
      </div>

      {/* Availability */}
      <div className="absolute right-6 top-8 flex items-center gap-2.5 sm:right-10 sm:top-10">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />

        <span className="text-[10px] font-medium uppercase tracking-[0.17em] text-white/40">
          In the making
        </span>
      </div>

      {/* Main content */}
      <section className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center pt-8 text-center">
        {/* Orbital centerpiece */}
        <div className="relative mb-10 flex h-36 w-36 items-center justify-center sm:mb-12 sm:h-44 sm:w-44">
          {/* Outer orbit */}
          <div className="absolute inset-0 rounded-full border border-white/[0.055]" />

          {/* Middle orbit */}
          <div className="absolute inset-[15px] rounded-full border border-violet-300/[0.12]" />

          {/* Inner orbit */}
          <div className="absolute inset-[31px] rounded-full border border-white/[0.07]" />

          {/* Orbital path */}
          <div className="absolute inset-[7px] animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-violet-300/[0.16]" />

          {/* Orbiting point */}
          <div className="absolute inset-[7px] animate-[spin_18s_linear_infinite] rounded-full">
            <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
          </div>

          {/* Core glow */}
          <div className="absolute h-16 w-16 rounded-full bg-violet-500/20 blur-2xl sm:h-20 sm:w-20" />

          {/* Centerpiece */}
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-violet-300/20 bg-[#100D19] shadow-[inset_0_0_25px_rgba(139,92,246,0.08),0_0_40px_rgba(139,92,246,0.08)] sm:h-16 sm:w-16">
            <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-white via-violet-200 to-violet-500 shadow-[0_0_22px_rgba(167,139,250,0.7)]" />
          </div>
        </div>

        {/* Feature label */}
        <div className="mb-7 flex items-center gap-3">
          <span className="h-px w-5 bg-violet-400/40" />

          <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-violet-300/90 sm:text-[11px]">
            {featureName} · Coming Soon
          </p>

          <span className="h-px w-5 bg-violet-400/40" />
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-[42px] font-medium leading-[1.08] tracking-[-0.065em] text-white sm:text-6xl md:text-7xl lg:text-[84px]">
          The future looks
          <span className="mt-1 block bg-gradient-to-r from-violet-200 via-purple-300 to-violet-400 bg-clip-text pb-2 text-transparent">
            different here.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-7 max-w-md text-sm leading-7 text-white/45 sm:mt-8 sm:text-base sm:leading-8">
          {description}
        </p>

        {/* Bottom accent */}
        <div className="mt-12 flex items-center gap-2.5">
          <span className="h-1 w-1 rounded-full bg-violet-300/40" />
          <span className="h-1 w-1 rounded-full bg-violet-300/70" />
          <span className="h-1 w-1 rounded-full bg-violet-300/40" />
        </div>
      </section>

      {/* Bottom footer */}
      <footer className="absolute bottom-7 left-6 right-6 flex flex-col items-center justify-between gap-3 sm:bottom-9 sm:left-10 sm:right-10 sm:flex-row">
        <p className="text-[10px] tracking-wide text-white/25">
          Learn Today, Lead Tomorrow.
        </p>

        <p className="text-[10px] tracking-[0.12em] text-white/25">
          A LITTLE MORE TO LOOK FORWARD TO.
        </p>
      </footer>
    </main>
  );
}

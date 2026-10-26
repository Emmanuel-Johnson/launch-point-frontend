interface ComingSoonPageProps {
  featureName?: string;
  title?: string;
  description?: string;
}

export default function ComingSoonPage({
  featureName = "Something New",
  title = "The future looks",
  description = "A new experience is taking shape. We're building something meaningful to help you learn, grow, and go further.",
}: ComingSoonPageProps) {
  return (
    <section className="relative flex min-h-[calc(100vh-9rem)] w-full items-center justify-center overflow-hidden rounded-2xl bg-black px-5 py-12 text-white selection:bg-[#3B82F6]/30 sm:px-8 lg:min-h-[calc(100vh-10rem)]">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Ambient blue glow */}
        <div className="absolute left-1/2 top-[42%] h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3B82F6]/[0.09] blur-[120px] sm:h-[500px] sm:w-[500px]" />

        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_78%)]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.025] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      {/* Top label */}
      <div className="absolute left-5 top-5 flex items-center gap-3 sm:left-8 sm:top-7">
        <span className="text-[9px] font-medium tracking-[0.12em] text-white/40 sm:text-[11px]">
          BUILT FOR WHAT'S NEXT
        </span>
      </div>

      {/* Availability */}
      <div className="absolute right-5 top-5 flex items-center gap-2 sm:right-8 sm:top-7">
        <span className="h-1.5 w-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

        <span className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/40 sm:text-[10px] sm:tracking-[0.17em]">
          In the making
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center pt-8 text-center">
        {/* Orbital centerpiece */}
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center sm:mb-10 sm:h-36 sm:w-36 lg:h-40 lg:w-40">
          {/* Outer orbit */}
          <div className="absolute inset-0 rounded-full border border-white/[0.055]" />

          {/* Middle orbit */}
          <div className="absolute inset-[12px] rounded-full border border-[#60A5FA]/[0.16] sm:inset-[15px]" />

          {/* Inner orbit */}
          <div className="absolute inset-[24px] rounded-full border border-white/[0.07] sm:inset-[31px]" />

          {/* Orbital path */}
          <div className="absolute inset-[6px] animate-[spin_18s_linear_infinite] rounded-full border border-dashed border-[#60A5FA]/[0.22]" />

          {/* Orbiting point */}
          <div className="absolute inset-[6px] animate-[spin_18s_linear_infinite] rounded-full">
            <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#93C5FD] shadow-[0_0_12px_rgba(59,130,246,0.9)]" />
          </div>

          {/* Core glow */}
          <div className="absolute h-14 w-14 rounded-full bg-[#3B82F6]/25 blur-2xl sm:h-20 sm:w-20" />

          {/* Centerpiece */}
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#60A5FA]/25 bg-[#080D16] shadow-[inset_0_0_25px_rgba(59,130,246,0.10),0_0_40px_rgba(59,130,246,0.10)] transition-all duration-300 hover:border-[#60A5FA]/40 sm:h-16 sm:w-16">
            <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-white via-[#93C5FD] to-[#3B82F6] shadow-[0_0_22px_rgba(59,130,246,0.8)]" />
          </div>
        </div>

        {/* Feature label */}
        <div className="mb-6 flex items-center gap-3 sm:mb-7">
          <span className="h-px w-5 bg-[#60A5FA]/50" />

          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#60A5FA] sm:text-[11px] sm:tracking-[0.25em]">
            {featureName} · Coming Soon
          </p>

          <span className="h-px w-5 bg-[#60A5FA]/50" />
        </div>

        {/* Headline */}
        <h1 className="max-w-3xl text-[38px] font-medium leading-[1.08] tracking-[-0.065em] text-white sm:text-6xl md:text-7xl lg:text-[76px]">
          {title}
          <span className="mt-1 block bg-gradient-to-r from-white via-[#93C5FD] to-[#3B82F6] bg-clip-text pb-2 text-transparent">
            different here.
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-md text-sm leading-7 text-white/45 sm:mt-7 sm:text-base sm:leading-8">
          {description}
        </p>

        {/* Bottom accent */}
        <div className="mt-9 flex items-center gap-2.5 sm:mt-10">
          <span className="h-1 w-1 rounded-full bg-[#60A5FA]/40" />
          <span className="h-1 w-1 rounded-full bg-[#60A5FA]/80" />
          <span className="h-1 w-1 rounded-full bg-[#60A5FA]/40" />
        </div>
      </div>

      {/* Bottom footer */}
      <footer className="absolute bottom-4 left-5 right-5 flex flex-col items-center justify-between gap-2 sm:bottom-6 sm:left-8 sm:right-8 sm:flex-row">
        <p className="text-[9px] tracking-wide text-white/25 sm:text-[10px]">
          Learn Today, Lead Tomorrow.
        </p>

        <p className="text-[9px] tracking-[0.1em] text-white/25 sm:text-[10px] sm:tracking-[0.12em]">
          A LITTLE MORE TO LOOK FORWARD TO.
        </p>
      </footer>
    </section>
  );
}

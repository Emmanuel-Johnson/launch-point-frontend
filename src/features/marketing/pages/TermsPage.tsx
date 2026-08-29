import { Link, useLocation, useNavigate } from "react-router-dom";

const TermsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          {/* Back */}
          <button
            type="button"
            onClick={() => navigate(from)}
            className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
          >
            <span className="text-lg">←</span>
            <span>Back</span>
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="text-sm font-semibold tracking-[3px] text-white"
          >
            LAUNCH POINT
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#6c63ff]/10 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {/* Title */}
          <div className="mb-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[4px] text-[#8b83ff]">
              Legal
            </p>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Terms of Service
            </h1>

            <p className="text-sm leading-6 text-gray-500">
              Last updated: August 29, 2026
            </p>
          </div>

          {/* Introduction */}
          <section className="space-y-5">
            <p className="leading-7 text-gray-400">
              Welcome to Launch Point. These Terms of Service govern your access
              to and use of the Launch Point platform, including our website,
              learning resources, courses, and related services.
            </p>

            <p className="leading-7 text-gray-400">
              By accessing or using Launch Point, you acknowledge that you have
              read, understood, and agree to be bound by these Terms. If you do
              not agree with these Terms, please do not use our services.
            </p>
          </section>

          <div className="my-12 h-px bg-white/10" />

          {/* Sections */}
          <div className="space-y-12">
            {/* 1 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                1. Use of Services
              </h2>

              <p className="leading-7 text-gray-400">
                Launch Point provides educational content and learning tools
                designed to help users develop practical skills. You agree to
                use the platform only for lawful purposes and in accordance with
                these Terms.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                2. Account Information
              </h2>

              <p className="leading-7 text-gray-400">
                You may need to create an account to access certain features.
                You are responsible for providing accurate information and
                keeping your account credentials secure. You are responsible for
                activities performed through your account.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                3. Acceptable Use
              </h2>

              <p className="leading-7 text-gray-400">
                You must not use Launch Point to engage in activities that are
                unlawful, harmful, fraudulent, abusive, or disruptive. You must
                not attempt to gain unauthorized access to accounts, systems, or
                information belonging to Launch Point or other users.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                4. Intellectual Property
              </h2>

              <p className="leading-7 text-gray-400">
                Unless otherwise stated, the content available through Launch
                Point, including text, graphics, software, courses, lessons, and
                other materials, belongs to Launch Point or its licensors and is
                protected by applicable intellectual property laws.
              </p>

              <p className="mt-4 leading-7 text-gray-400">
                You may not reproduce, distribute, modify, sell, or otherwise
                exploit our content without prior written permission.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                5. User Content
              </h2>

              <p className="leading-7 text-gray-400">
                If you submit content to Launch Point, you are responsible for
                ensuring that you have the necessary rights to submit that
                content. You agree not to submit content that violates the
                rights of others or applicable laws.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                6. Third-Party Services
              </h2>

              <p className="leading-7 text-gray-400">
                Launch Point may integrate with or provide access to third-party
                services. Your use of those services may be subject to the terms
                and privacy policies of the respective third parties.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                7. Privacy
              </h2>

              <p className="leading-7 text-gray-400">
                Your use of Launch Point is also subject to our Privacy Policy,
                which explains how we collect, use, and protect information
                associated with your use of the platform.
              </p>

              <Link
                to="/privacy-policy"
                state={{ from }}
                className="mt-4 inline-block text-sm text-[#8b83ff] transition-colors hover:text-white"
              >
                Read our Privacy Policy →
              </Link>
            </section>

            {/* 8 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                8. Disclaimer
              </h2>

              <p className="leading-7 text-gray-400">
                Launch Point is provided on an "as is" and "as available" basis.
                We do not guarantee that the platform will always be available,
                uninterrupted, secure, or free from errors.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                9. Limitation of Liability
              </h2>

              <p className="leading-7 text-gray-400">
                To the fullest extent permitted by applicable law, Launch Point
                will not be liable for indirect, incidental, special,
                consequential, or other damages arising from your use of or
                inability to use the platform.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                10. Changes to These Terms
              </h2>

              <p className="leading-7 text-gray-400">
                We may update these Terms from time to time. When we make
                changes, we may update the date shown at the top of this page.
                Your continued use of Launch Point after changes become
                effective means you accept the updated Terms.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                11. Contact Us
              </h2>

              <p className="leading-7 text-gray-400">
                If you have questions about these Terms, please contact us
                through our support channels.
              </p>
            </section>
          </div>

          {/* Bottom Navigation */}
          <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => navigate(from)}
              className="text-left text-sm text-gray-500 transition-colors hover:text-white"
            >
              ← Back
            </button>

            <Link
              to="/privacy-policy"
              state={{ from }}
              className="text-sm text-[#8b83ff] transition-colors hover:text-white"
            >
              Privacy Policy →
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <p className="py-6 text-center text-[10px] font-light uppercase tracking-[3px] text-gray-700">
          © {new Date().getFullYear()} Launch Point
        </p>
      </footer>
    </div>
  );
};

export default TermsPage;

import { Link, useLocation, useNavigate } from "react-router-dom";

const PrivacyPolicyPage = () => {
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
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#6c63ff]/10 blur-[130px]" />

        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {/* Title */}
          <div className="mb-14">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[4px] text-[#8b83ff]">
              Legal
            </p>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="text-sm leading-6 text-gray-500">
              Last updated: August 29, 2026
            </p>
          </div>

          {/* Introduction */}
          <section className="space-y-5">
            <p className="leading-7 text-gray-400">
              At Launch Point, we respect your privacy and are committed to
              protecting the information you provide when using our platform.
              This Privacy Policy explains what information we collect, how we
              use it, and how we protect it.
            </p>

            <p className="leading-7 text-gray-400">
              By using Launch Point, you acknowledge that you have read and
              understood this Privacy Policy.
            </p>
          </section>

          <div className="my-12 h-px bg-white/10" />

          {/* Sections */}
          <div className="space-y-12">
            {/* 1 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                1. Information We Collect
              </h2>

              <p className="mb-4 leading-7 text-gray-400">
                When you use Launch Point, we may collect information that you
                provide directly to us, including:
              </p>

              <ul className="space-y-3 pl-5 text-gray-400">
                <li className="list-disc">Your name and email address.</li>
                <li className="list-disc">
                  Account and authentication information.
                </li>
                <li className="list-disc">
                  Information you provide when contacting us.
                </li>
                <li className="list-disc">
                  Learning activity and progress associated with your account.
                </li>
              </ul>
            </section>

            {/* 2 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                2. Information Collected Automatically
              </h2>

              <p className="leading-7 text-gray-400">
                We may automatically collect certain information when you access
                or use Launch Point, such as your device type, browser
                information, IP address, pages viewed, and information about how
                you interact with our platform.
              </p>
            </section>

            {/* 3 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                3. How We Use Your Information
              </h2>

              <p className="mb-4 leading-7 text-gray-400">
                We may use the information we collect to:
              </p>

              <ul className="space-y-3 pl-5 text-gray-400">
                <li className="list-disc">Create and manage your account.</li>
                <li className="list-disc">
                  Provide and improve our learning services.
                </li>
                <li className="list-disc">Track your learning progress.</li>
                <li className="list-disc">
                  Communicate with you about your account or our services.
                </li>
                <li className="list-disc">
                  Detect, prevent, and address security issues or abuse.
                </li>
                <li className="list-disc">
                  Improve the performance and functionality of Launch Point.
                </li>
              </ul>
            </section>

            {/* 4 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                4. Cookies and Similar Technologies
              </h2>

              <p className="leading-7 text-gray-400">
                Launch Point may use cookies and similar technologies to
                maintain sessions, remember preferences, understand how users
                interact with our platform, and improve our services.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                5. How We Share Information
              </h2>

              <p className="leading-7 text-gray-400">
                We do not sell your personal information. We may share
                information with trusted service providers when necessary to
                operate, maintain, secure, or improve Launch Point. We may also
                disclose information when required by law or when necessary to
                protect our rights, users, or the security of our services.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                6. Data Security
              </h2>

              <p className="leading-7 text-gray-400">
                We take reasonable measures to protect your information from
                unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmitting or storing information is
                completely secure.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                7. Data Retention
              </h2>

              <p className="leading-7 text-gray-400">
                We retain information for as long as reasonably necessary to
                provide our services, maintain your account, comply with legal
                obligations, resolve disputes, and enforce our agreements.
              </p>
            </section>

            {/* 8 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                8. Your Choices
              </h2>

              <p className="leading-7 text-gray-400">
                Depending on applicable law, you may have rights regarding your
                personal information, including the ability to request access,
                correction, or deletion of certain information associated with
                your account.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                9. Third-Party Services
              </h2>

              <p className="leading-7 text-gray-400">
                Launch Point may use third-party services for functionality such
                as authentication, analytics, payments, hosting, or other
                platform operations. These services may collect or process
                information according to their own privacy policies.
              </p>
            </section>

            {/* 10 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                10. Children's Privacy
              </h2>

              <p className="leading-7 text-gray-400">
                Launch Point is not intended for children who are not legally
                permitted to use online services in their jurisdiction. We do
                not knowingly collect personal information from children in
                violation of applicable law.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                11. Changes to This Privacy Policy
              </h2>

              <p className="leading-7 text-gray-400">
                We may update this Privacy Policy from time to time. When we
                make changes, we will update the "Last updated" date displayed
                at the top of this page. Your continued use of Launch Point
                after changes become effective means you acknowledge the updated
                policy.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="mb-4 text-xl font-semibold text-white">
                12. Contact Us
              </h2>

              <p className="leading-7 text-gray-400">
                If you have questions or concerns about this Privacy Policy or
                how your information is handled, please contact Launch Point
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
              to="/terms"
              state={{ from }}
              className="text-sm text-[#8b83ff] transition-colors hover:text-white"
            >
              Terms of Service →
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

export default PrivacyPolicyPage;

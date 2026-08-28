import { Link } from "react-router-dom";

const PublicFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-[#09090B] text-zinc-400">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              to="#"
              className="inline-flex items-center gap-3 transition-all duration-500 hover:scale-105"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-500 hover:scale-105">
                <img
                  src="/logo.png"
                  alt="Launch Point Logo"
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>

              <span className="text-lg font-semibold tracking-tight text-white transition-colors duration-500 hover:text-indigo-300">
                Launch Point
              </span>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-500 transition-colors duration-500 hover:text-zinc-400">
              A modern learning platform designed to help you build practical
              skills, learn from experts, and move confidently toward your
              career goals.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-white">Platform</h3>

            <div className="mt-5 space-y-3">
              <Link
                to="#"
                className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                Courses
              </Link>

              <Link
                to="#"
                className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                Categories
              </Link>

              <Link
                to="#"
                className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                Instructors
              </Link>

              <Link
                to="#"
                className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>

            <div className="mt-5 space-y-3">
              <Link
                to="#"
                className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                About
              </Link>

              <Link
                to="#"
                className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                Contact
              </Link>

              <Link
                to="#"
                className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                FAQ
              </Link>

              <Link
                to="#"
                className="block text-sm transition-all duration-500 hover:translate-x-1 hover:text-white"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-600 transition-colors duration-500 hover:text-zinc-400">
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
  );
};

export default PublicFooter;

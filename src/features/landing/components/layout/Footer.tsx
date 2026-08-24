import { Rocket, Globe, AtSign, Share2 } from "lucide-react";
import {
  footerQuickLinks,
  footerCategories,
  footerLegalLinks,
} from "../../data/landingData";

const Footer = () => {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2 lg:pr-8">
            <a href="#home" className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              <span className="text-base font-bold text-indigo-600">
                Launch Point
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              The world&apos;s leading premium LMS platform. Master new skills
              with manual renewals and final sale pricing. No hidden fees, no
              auto-charges.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#social-web"
                aria-label="Website"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Globe className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#social-email"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
              >
                <AtSign className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#social-share"
                aria-label="Share"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-600"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-indigo-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-800">
              Categories
            </h3>
            <ul className="mt-4 space-y-3">
              {footerCategories.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-indigo-600"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            &copy; 2026 Launch Point. Manual renewal only. No refunds.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLegalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-slate-400 transition-colors hover:text-indigo-600"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

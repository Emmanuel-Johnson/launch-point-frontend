const ContactPage = () => {
  return (
    <main className="min-h-screen bg-[#09090B] text-zinc-100">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            {/* Left Content */}
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Contact Us
              </p>

              <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Let's start a
                <span className="block text-zinc-500">conversation.</span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-zinc-400">
                Have a question about Launch Point, our courses, or your
                learning journey? We'd love to hear from you.
              </p>

              {/* Contact Information */}
              <div className="mt-12 space-y-8">
                <div>
                  <p className="text-sm font-medium text-zinc-500">Email</p>

                  <p className="mt-2 text-base text-zinc-200">
                    support@launchpoint.com
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-500">
                    Response Time
                  </p>

                  <p className="mt-2 text-base text-zinc-200">
                    Usually within 24–48 hours
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-500">Available</p>

                  <p className="mt-2 text-base text-zinc-200">
                    Monday – Friday
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-2xl border border-white/10 bg-[#0F0F12] p-6 sm:p-8">
              <form className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition-all duration-500 ease-out focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition-all duration-500 ease-out focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    className="w-full rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition-all duration-500 ease-out focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-lg border border-white/10 bg-[#09090B] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 transition-all duration-500 ease-out focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-700 ease-out hover:scale-[1.02] hover:bg-indigo-400 hover:shadow-xl hover:shadow-indigo-500/30"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;

export default function InterestingTy() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f172a] text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-slate-900 to-black" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-cyan-400 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-fuchsia-500 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-white/15 bg-white/10 shadow-2xl backdrop-blur-md">
            <div className="h-14 w-14 rounded-full bg-emerald-400/20 flex items-center justify-center">
              <span className="text-3xl">✓</span>
            </div>
          </div>

          <h1 className="text-5xl font-black tracking-tight sm:text-7xl md:text-8xl">
            Thank You
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/75 sm:text-lg md:text-xl">
            We’ve received your message and truly appreciate you reaching out.
            Your submission is on its way, and we’ll be in touch soon.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:scale-[1.02] hover:bg-white/90"
            >
              Back to Home
            </a>
            <a
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:scale-[1.02] hover:bg-white/10"
            >
              Send Another Message
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

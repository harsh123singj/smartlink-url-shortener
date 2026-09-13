import { ArrowRight, Check, Copy, Link2 } from "lucide-react";

const Hero = () => {
  return (
    <section className="px-6 pb-20 pt-20 lg:px-8 lg:pb-28 lg:pt-28">
      <div className="mx-auto max-w-7xl">

        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-medium text-[#FF5A1F]">
            <span className="h-2 w-2 rounded-full bg-[#FF5A1F]" />
            Simple link management
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#171717] sm:text-6xl lg:text-7xl">
            Short links.
            <br />
            <span className="text-[#FF5A1F]">
              Smarter results.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            Create short, memorable links and understand exactly
            how people interact with them.
          </p>

          {/* URL Input */}
          <div className="mx-auto mt-10 max-w-2xl">
            <div className="flex flex-col gap-3 rounded-xl border border-black/10 bg-white p-2 shadow-sm sm:flex-row">

              <div className="flex flex-1 items-center gap-3 px-3">
                <Link2 className="h-5 w-5 shrink-0 text-gray-400" />

                <input
                  type="url"
                  placeholder="Paste your long URL here..."
                  className="w-full bg-transparent py-3 text-sm text-[#171717] outline-none placeholder:text-gray-400"
                />
              </div>

              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#FF5A1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E94D16]">
                Shorten URL
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>

            <p className="mt-3 text-sm text-gray-500">
              Free to use · No credit card required
            </p>
          </div>
        </div>

        {/* Product Preview */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">

            {/* Browser Header */}
            <div className="flex items-center gap-2 border-b border-black/5 px-5 py-4">
              <span className="h-3 w-3 rounded-full bg-red-300" />
              <span className="h-3 w-3 rounded-full bg-yellow-300" />
              <span className="h-3 w-3 rounded-full bg-green-300" />

              <div className="ml-4 flex-1 rounded-md bg-gray-100 px-4 py-2 text-xs text-gray-500">
                app.smartlink.com/dashboard
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="flex min-h-[360px]">

              {/* Mini Sidebar */}
              <div className="hidden w-48 border-r border-black/5 bg-[#252525] p-5 sm:block">

                <div className="mb-8 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#FF5A1F]">
                    <Link2 className="h-4 w-4 text-white" />
                  </div>

                  <span className="text-sm font-semibold text-white">
                    SmartLink
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="rounded-md bg-white/10 px-3 py-2 text-xs font-medium text-white">
                    Dashboard
                  </div>

                  <div className="px-3 py-2 text-xs text-gray-400">
                    Links
                  </div>

                  <div className="px-3 py-2 text-xs text-gray-400">
                    Analytics
                  </div>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 bg-[#FAF9F6] p-6 sm:p-8">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">
                      Dashboard
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-[#171717]">
                      Your links
                    </h3>
                  </div>

                  <button className="rounded-md bg-[#FF5A1F] px-3 py-2 text-xs font-semibold text-white">
                    + Create link
                  </button>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-3">

                  <div className="rounded-lg border border-black/5 bg-white p-4">
                    <p className="text-xs text-gray-500">
                      Total links
                    </p>
                    <p className="mt-2 text-xl font-bold text-[#171717]">
                      24
                    </p>
                  </div>

                  <div className="rounded-lg border border-black/5 bg-white p-4">
                    <p className="text-xs text-gray-500">
                      Total clicks
                    </p>
                    <p className="mt-2 text-xl font-bold text-[#171717]">
                      1,284
                    </p>
                  </div>

                  <div className="rounded-lg border border-black/5 bg-white p-4">
                    <p className="text-xs text-gray-500">
                      Active links
                    </p>
                    <p className="mt-2 text-xl font-bold text-[#171717]">
                      21
                    </p>
                  </div>

                </div>

                {/* Links Preview */}
                <div className="mt-5 rounded-lg border border-black/5 bg-white">

                  <div className="border-b border-black/5 px-4 py-3 text-xs font-semibold text-gray-500">
                    Recent links
                  </div>

                  <div className="divide-y divide-black/5">

                    <div className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-xs font-semibold text-[#171717]">
                          smartlink.app/github
                        </p>
                        <p className="mt-1 text-[11px] text-gray-400">
                          github.com/harsh...
                        </p>
                      </div>

                      <span className="text-xs font-semibold text-[#FF5A1F]">
                        245 clicks
                      </span>
                    </div>

                    <div className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-xs font-semibold text-[#171717]">
                          smartlink.app/portfolio
                        </p>
                        <p className="mt-1 text-[11px] text-gray-400">
                          portfolio.example...
                        </p>
                      </div>

                      <span className="text-xs font-semibold text-[#FF5A1F]">
                        128 clicks
                      </span>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Trust Points */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-500">

          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-[#FF5A1F]" />
            Custom aliases
          </div>

          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-[#FF5A1F]" />
            Click analytics
          </div>

          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-[#FF5A1F]" />
            Expiring links
          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
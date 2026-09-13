import {
  BarChart3,
  Link2,
  ShieldCheck,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Short & memorable",
    description:
      "Turn long URLs into clean, shareable links that are easy to remember.",
  },
  {
    icon: BarChart3,
    title: "Useful analytics",
    description:
      "See clicks, browsers, devices, operating systems and referrers.",
  },
  {
    icon: ShieldCheck,
    title: "Full control",
    description:
      "Create custom aliases, set expiration dates and disable links whenever you want.",
  },
  {
    icon: Zap,
    title: "Fast & simple",
    description:
      "Create and manage your links without unnecessary complexity.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="border-t border-black/5 bg-white px-6 py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#FF5A1F]">
            Everything you need
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl">
            Simple tools for better links.
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            SmartLink gives you the essential tools to create,
            manage and understand your links.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white p-7 transition hover:bg-orange-50/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <Icon
                    className="h-5 w-5 text-[#FF5A1F]"
                    strokeWidth={2}
                  />
                </div>

                <h3 className="mt-5 text-base font-semibold text-[#171717]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default Features;
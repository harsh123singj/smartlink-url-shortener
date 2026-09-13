import { ArrowRight, BarChart3, Link2, MousePointerClick } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Create your link",
    description:
      "Paste your long URL, add an optional custom alias, and create your short link in seconds.",
  },
  {
    number: "02",
    icon: MousePointerClick,
    title: "Share it anywhere",
    description:
      "Use your clean short link on social media, websites, resumes, messages, or anywhere else.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Track the results",
    description:
      "See how many people clicked your link and understand where those clicks came from.",
  },
];

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="bg-[#FAF9F6] px-6 py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#FF5A1F]">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#171717] sm:text-4xl">
            From long URL to smart link.
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-600">
            Three simple steps. No complicated setup.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-10 md:grid-cols-3">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative">

                {/* Connector */}
                {index !== steps.length - 1 && (
                  <div className="absolute left-[calc(100%+1rem)] top-7 hidden w-16 border-t border-dashed border-gray-300 md:block" />
                )}

                <div className="rounded-2xl border border-black/10 bg-white p-7">

                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-100">
                      <Icon className="h-5 w-5 text-[#FF5A1F]" />
                    </div>

                    <span className="text-sm font-bold text-gray-300">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-[#171717]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {step.description}
                  </p>

                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
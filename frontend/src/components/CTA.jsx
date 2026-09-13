import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="px-6 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-[#252525] px-6 py-14 text-center sm:px-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-400">
          Get started
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to make your links smarter?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
          Create your first short link and start tracking your
          results today.
        </p>

        <Link
          to="/register"
          className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-[#FF5A1F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#E94D16]"
        >
          Get Started

          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
};

export default CTA;
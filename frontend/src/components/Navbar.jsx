import { Link } from "react-router-dom";
import { ArrowRight, Link2 } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full border-b border-black/5 bg-[#FAF9F6]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF5A1F]">
            <Link2 className="h-5 w-5 text-white" strokeWidth={2.5} />
          </div>

          <span className="text-xl font-bold tracking-tight text-[#171717]">
            SmartLink
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <a
            href="#features"
            className="text-sm font-medium text-gray-600 transition hover:text-[#FF5A1F]"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-gray-600 transition hover:text-[#FF5A1F]"
          >
            How it works
          </a>

          <a
            href="#pricing"
            className="text-sm font-medium text-gray-600 transition hover:text-[#FF5A1F]"
          >
            Pricing
          </a>

          <a
            href="#blog"
            className="text-sm font-medium text-gray-600 transition hover:text-[#FF5A1F]"
          >
            Blog
          </a>

        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">

          <Link
            to="/login"
            className="hidden rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#171717] transition hover:border-black/20 hover:bg-gray-50 sm:block"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="group flex items-center gap-2 rounded-lg bg-[#FF5A1F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E94D16]"
          >
            Get Started

            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-black/5 bg-white px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-12">

        <div className="flex flex-col justify-between gap-10 md:flex-row">

          {/* Brand */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF5A1F]">
                <Link2 className="h-5 w-5 text-white" />
              </div>

              <span className="text-lg font-bold text-[#171717]">
                SmartLink
              </span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-gray-500">
              Simple link management and analytics for everyone.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">

            <div>
              <h3 className="text-sm font-semibold text-[#171717]">
                Product
              </h3>

              <div className="mt-4 space-y-3">
                <a
                  href="#features"
                  className="block text-sm text-gray-500 hover:text-[#FF5A1F]"
                >
                  Features
                </a>

                <a
                  href="#how-it-works"
                  className="block text-sm text-gray-500 hover:text-[#FF5A1F]"
                >
                  How it works
                </a>

                <a
                  href="#pricing"
                  className="block text-sm text-gray-500 hover:text-[#FF5A1F]"
                >
                  Pricing
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#171717]">
                Account
              </h3>

              <div className="mt-4 space-y-3">
                <Link
                  to="/login"
                  className="block text-sm text-gray-500 hover:text-[#FF5A1F]"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="block text-sm text-gray-500 hover:text-[#FF5A1F]"
                >
                  Sign up
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-black/5 pt-6">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} SmartLink. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthContext";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="w-full bg-black sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[101px] h-[90px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fe63f1bfa4aeb4c919cee7af50d229bf4%2Fccaf1859a5814530a30af1beb12dece7?format=webp&width=800"
            alt="SR Technologies logo"
            className="w-[80px] h-[80px] mx-auto"
          />
        </Link>

        <nav
          className="hidden md:flex items-center gap-8 lg:gap-12"
          aria-label="Main navigation"
        >
          <Link
            to="/work"
            className="text-white text-sm font-medium uppercase hover:text-lime transition-colors"
          >
            Work
          </Link>
          <Link
            to="/services"
            className="text-white text-sm font-medium uppercase hover:text-lime transition-colors"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-white text-sm font-medium uppercase hover:text-lime transition-colors"
          >
            About
          </Link>
          <Link
            to="/evenements"
            className="text-white text-sm font-medium uppercase hover:text-lime transition-colors"
          >
            Événements
          </Link>
          <Link
            to="/contact"
            className="text-white text-sm font-medium uppercase hover:text-lime transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              {isAdmin() && (
                <Link
                  to="/admin"
                  className="text-white text-sm font-medium uppercase hover:text-lime transition-colors"
                >
                  Admin
                </Link>
              )}
              <span className="text-white text-sm">{user.email}</span>
              <button
                onClick={logout}
                className="bg-white text-black px-3 py-1 rounded text-sm"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="bg-white text-black px-4 py-2 rounded text-sm hover:bg-white/90 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-lime text-black px-4 py-2 rounded text-sm hover:bg-lime/90 transition-colors"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                {open ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <>
                    <path
                      d="M3 6h18M3 12h18M3 18h18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden bg-black transition-max-h duration-300 overflow-hidden ${open ? "max-h-[320px]" : "max-h-0"}`}
      >
        <div className="px-6 pb-6">
          <nav className="flex flex-col gap-4 pt-4">
            <Link
              to="/work"
              onClick={() => setOpen(false)}
              className="text-white text-base font-medium uppercase"
            >
              Work
            </Link>
            <Link
              to="/services"
              onClick={() => setOpen(false)}
              className="text-white text-base font-medium uppercase"
            >
              Services
            </Link>
            <Link
              to="/about"
              onClick={() => setOpen(false)}
              className="text-white text-base font-medium uppercase"
            >
              About
            </Link>
            <Link
              to="/evenements"
              onClick={() => setOpen(false)}
              className="text-white text-base font-medium uppercase"
            >
              Événements
            </Link>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="text-white text-base font-medium uppercase"
            >
              Contact
            </Link>
            {user ? (
              <div className="mt-4 flex flex-col gap-3">
                {isAdmin() && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="text-white text-base font-medium uppercase border border-white/30 px-3 py-1 rounded hover:bg-white/10 transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-white text-base font-medium uppercase border border-white/30 px-3 py-1 rounded hover:bg-white/10 transition-colors text-left"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="mt-4 flex items-center gap-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="text-white text-base font-medium uppercase border border-white/30 px-3 py-1 rounded hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="text-black text-base font-medium uppercase bg-lime px-3 py-1 rounded hover:bg-lime/90 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>

      <div className="w-full h-[1px] bg-white/20"></div>
    </header>
  );
}

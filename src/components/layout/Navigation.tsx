import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/team", label: "Team" },
    { path: "/prizes", label: "Prizes" },
    { path: "/give", label: "Give Back" },
    { path: "/join", label: "Join" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-space border-b border-gray-600/30"
      style={{ backgroundColor: "rgba(1, 2, 24, 0.95)" }}
    >
      <div className="max-w-5xl mx-auto md:px-6 py-3 flex justify-between items-center w-full">
        <Link
          to="/"
          className="flex items-center gap-3 text-white font-display text-xl font-bold no-underline"
        >
          <span>🔥</span>
          <span>Bitcamp Alumni</span>
        </Link>

        <div className="nav-links flex gap-8 items-center">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`text-sm no-underline transition-colors ${
                isActive(path)
                  ? "text-orange font-bold"
                  : "text-cream font-semibold hover:text-orange"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-button hidden bg-transparent border-none text-cream text-2xl cursor-pointer ml-auto"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="flex flex-col gap-3 md:px-6 py-3 border-t border-gray-600/30"
          style={{ backgroundColor: "rgba(1, 2, 24, 0.98)" }}
        >
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-sm no-underline ${
                isActive(path) ? "text-orange font-bold" : "text-cream font-semibold"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

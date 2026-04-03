import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/Button";

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
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(1, 2, 24, 0.95)",
        borderBottom: "1px solid rgba(100, 100, 100, 0.3)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingTop: "12px",
          paddingBottom: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "white",
            fontFamily: "Aleo, serif",
            fontSize: "20px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          <span>🔥</span>
          <span style={{ display: "inline" }}>Bitcamp Alumni</span>
        </Link>

        <div className="nav-links" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              style={{
                fontSize: "14px",
                color: isActive(path) ? "#FF6F3F" : "#FFF7EB",
                fontWeight: isActive(path) ? "700" : "600",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
          <Button size="sm" as={Link} to="/join">
            Join
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "#FFF7EB",
            fontSize: "24px",
            cursor: "pointer",
          }}
          className="mobile-menu-button"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "16px 24px",
            backgroundColor: "rgba(1, 2, 24, 0.98)",
            borderTop: "1px solid rgba(100, 100, 100, 0.3)",
          }}
        >
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: "14px",
                color: isActive(path) ? "#FF6F3F" : "#FFF7EB",
                fontWeight: isActive(path) ? "700" : "600",
                textDecoration: "none",
              }}
            >
              {label}
            </Link>
          ))}
          <Button size="sm" as={Link} to="/join" onClick={() => setMobileMenuOpen(false)}>
            Join
          </Button>
        </div>
      )}
    </nav>
  );
};

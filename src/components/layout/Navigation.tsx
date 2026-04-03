import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export const Navigation: React.FC = () => {
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backgroundColor: "rgba(1, 2, 24, 0.95)", borderBottom: "1px solid rgba(100, 100, 100, 0.3)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px", paddingTop: "12px", paddingBottom: "12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: "12px", color: "white", fontFamily: "Aleo, serif", fontSize: "20px", fontWeight: "bold", textDecoration: "none" }}
        >
          <span>🔥</span>
          <span>Bitcamp Alumni</span>
        </Link>

        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <Link to="/" style={{ fontSize: "14px", color: "#FF6F3F", fontWeight: "600", textDecoration: "none" }}>
            Home
          </Link>
          <Link to="/about" style={{ fontSize: "14px", color: "#FFF7EB", textDecoration: "none" }}>
            About
          </Link>
          <Link to="/team" style={{ fontSize: "14px", color: "#FFF7EB", textDecoration: "none" }}>
            Team
          </Link>
          <Link to="/prizes" style={{ fontSize: "14px", color: "#FFF7EB", textDecoration: "none" }}>
            Prizes
          </Link>
          <Link to="/give" style={{ fontSize: "14px", color: "#FFF7EB", textDecoration: "none" }}>
            Give Back
          </Link>
          <Link to="/contact" style={{ fontSize: "14px", color: "#FFF7EB", textDecoration: "none" }}>
            Contact
          </Link>
          <Button size="sm" as={Link} to="/join">
            Join
          </Button>
        </div>
      </div>
    </nav>
  );
};

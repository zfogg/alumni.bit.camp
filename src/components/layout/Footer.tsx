import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const discordUrl = import.meta.env.VITE_DISCORD_INVITE_URL || "https://discord.gg/bitcamp";

  return (
    <footer style={{ backgroundColor: "#010218", borderTop: "1px solid rgba(100, 100, 100, 0.2)", paddingTop: "60px", paddingBottom: "60px", marginTop: "80px", zIndex: 1, position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", paddingLeft: "24px", paddingRight: "24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px", marginBottom: "40px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "white", fontFamily: "Aleo, serif", fontSize: "18px", fontWeight: "bold", marginBottom: "16px" }}>
              <span>🔥</span>
              <span>Bitcamp Alumni</span>
            </div>
            <p style={{ color: "#FFF7EB", fontSize: "14px", lineHeight: "1.6" }}>Eleven years of builders. One community.</p>
          </div>

          <div>
            <h3 style={{ color: "white", fontWeight: "600", marginBottom: "16px", fontSize: "16px" }}>Pages</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <Link to="/about" style={{ color: "#FFF7EB", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6F3F")} onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF7EB")}>
                  About
                </Link>
              </li>
              <li>
                <Link to="/team" style={{ color: "#FFF7EB", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6F3F")} onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF7EB")}>
                  Team
                </Link>
              </li>
              <li>
                <Link to="/prizes" style={{ color: "#FFF7EB", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6F3F")} onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF7EB")}>
                  Prizes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: "white", fontWeight: "600", marginBottom: "16px", fontSize: "16px" }}>Get Involved</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <Link to="/join" style={{ color: "#FFF7EB", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6F3F")} onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF7EB")}>
                  Join
                </Link>
              </li>
              <li>
                <Link to="/give" style={{ color: "#FFF7EB", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6F3F")} onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF7EB")}>
                  Give Back
                </Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: "#FFF7EB", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6F3F")} onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF7EB")}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: "white", fontWeight: "600", marginBottom: "16px", fontSize: "16px" }}>Community</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              <li>
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#FFF7EB", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6F3F")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF7EB")}
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://bit.camp"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#FFF7EB", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#FF6F3F")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#FFF7EB")}
                >
                  Main Event
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(100, 100, 100, 0.2)", paddingTop: "32px", textAlign: "center" }}>
          <p style={{ color: "#999", fontSize: "12px", margin: 0 }}>&copy; {new Date().getFullYear()} Bitcamp Alumni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

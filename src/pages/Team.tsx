import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

const colors = [
  "#FF6F3F", // orange
  "#4A90E2", // blue
  "#66BB6A", // green
  "#E91E63", // pink
  "#FFD580", // yellow
  "#4FC3F7", // cyan
  "#9C27B0", // purple
  "#FF9800", // deep orange
];

export const Team: React.FC = () => {
  const [filter] = useState<string>("all");

  return (
    <div className="min-h-screen bg-space text-cream">
      {/* Hero */}
      <section style={{ paddingTop: "120px", paddingBottom: "16px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontFamily: "Aleo, serif",
              fontWeight: "bold",
              color: "white",
              margin: 0,
              marginBottom: "8px",
            }}
          >
            Who We Are <span style={{ fontSize: "24px" }}>✨</span>
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#FFF7EB",
              margin: 0,
              marginBottom: "32px",
              lineHeight: "1.5",
            }}
          >
            The people behind Bitcamp Alumni — organizers, hackers, sponsors, and friends.
          </p>
          <div style={{ height: "1px", backgroundColor: "rgba(255, 111, 63, 0.3)" }}></div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: "16px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["All", "Organizers", "Hackers", "Sponsors", "Staff"].map((f) => (
              <button
                key={f}
                style={{
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: filter === f.toLowerCase() ? "#FF6F3F" : "rgba(26, 46, 51, 0.6)",
                  color: filter === f.toLowerCase() ? "white" : "#FFF7EB",
                  transition: "all 0.3s",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Grid */}
      <section style={{ padding: "16px", paddingBottom: "128px" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            paddingLeft: "24px",
            paddingRight: "24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const color = colors[(i - 1) % colors.length];
              const initials = String.fromCharCode(64 + i);
              return (
                <div
                  key={i}
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "#1A2E33",
                    border: "1px solid rgba(255, 111, 63, 0.2)",
                    transition: "transform 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  }}
                >
                  <div
                    style={{
                      height: "140px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: color,
                      fontSize: "48px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {initials}
                  </div>
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    <h3
                      style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: "16px",
                        margin: 0,
                        marginBottom: "4px",
                      }}
                    >
                      Member {i}
                    </h3>
                    <p
                      style={{
                        color: "#FF6F3F",
                        fontSize: "12px",
                        fontWeight: "600",
                        margin: 0,
                        marginBottom: "4px",
                      }}
                    >
                      Hacker
                    </p>
                    <p style={{ color: "#A7A7A7", fontSize: "12px", margin: 0 }}>2020</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div
            style={{
              backgroundColor: "#1A2E33",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid rgba(255, 111, 63, 0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "20px",
                  fontFamily: "Aleo, serif",
                  fontWeight: "bold",
                  color: "white",
                  margin: 0,
                  marginBottom: "8px",
                }}
              >
                Are you a Bitcamp alum? Add yourself to the team page →
              </h2>
              <p style={{ fontSize: "14px", color: "#FFF7EB", margin: 0, lineHeight: "1.5" }}>
                Submit your name, headshot, role, and Bitcamp year. We'll add you to the directory.
              </p>
            </div>
            <Button size="lg" as={Link} to="/join">
              JOIN NOW
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

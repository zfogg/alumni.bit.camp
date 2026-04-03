"use client";

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
  const [filter, setFilter] = useState<string>("all");

  const members = [
    { id: 1, name: "Member 1", role: "hacker", year: 2020, color: "#FF6F3F" },
    { id: 2, name: "Member 2", role: "organizer", year: 2020, color: "#4A90E2" },
    { id: 3, name: "Member 3", role: "hacker", year: 2020, color: "#66BB6A" },
    { id: 4, name: "Member 4", role: "sponsor", year: 2020, color: "#E91E63" },
    { id: 5, name: "Member 5", role: "hacker", year: 2020, color: "#FFD580" },
    { id: 6, name: "Member 6", role: "staff", year: 2020, color: "#4FC3F7" },
    { id: 7, name: "Member 7", role: "organizer", year: 2020, color: "#9C27B0" },
    { id: 8, name: "Member 8", role: "hacker", year: 2020, color: "#FF9800" },
  ];

  const filteredMembers =
    filter === "all" ? members : members.filter((m) => m.role === filter.toLowerCase());

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
            {[
              { label: "All", value: "all" },
              { label: "Organizers", value: "organizer" },
              { label: "Hackers", value: "hacker" },
              { label: "Sponsors", value: "sponsor" },
              { label: "Staff", value: "staff" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  fontWeight: "600",
                  fontSize: "14px",
                  border: "none",
                  cursor: "pointer",
                  backgroundColor: filter === f.value ? "#FF6F3F" : "rgba(26, 46, 51, 0.6)",
                  color: filter === f.value ? "white" : "#FFF7EB",
                  transition: "all 0.3s",
                }}
              >
                {f.label}
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
            {filteredMembers.map((member) => {
              const initials = member.name
                .split(" ")
                .map((n) => n[0])
                .join("");
              return (
                <div
                  key={member.id}
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
                      backgroundColor: member.color,
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
                      {member.name}
                    </h3>
                    <p
                      style={{
                        color: "#FF6F3F",
                        fontSize: "12px",
                        fontWeight: "600",
                        margin: 0,
                        marginBottom: "4px",
                        textTransform: "capitalize",
                      }}
                    >
                      {member.role}
                    </p>
                    <p style={{ color: "#A7A7A7", fontSize: "12px", margin: 0 }}>{member.year}</p>
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

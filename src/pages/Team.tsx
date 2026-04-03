"use client";

import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

const colors = [
  "#FF6F3F",
  "#4A90E2",
  "#66BB6A",
  "#E91E63",
  "#FFD580",
  "#4FC3F7",
  "#9C27B0",
  "#FF9800",
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
      <section className="pt-30 pb-4">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-6xl font-display font-bold text-white mb-1">
            Who We Are <span className="text-2xl">✨</span>
          </h1>
          <p className="text-base text-cream m-0 mb-8 leading-relaxed">
            The people behind Bitcamp Alumni — organizers, hackers, sponsors, and friends.
          </p>
          <div className="h-px bg-orange/30"></div>
        </div>
      </section>

      {/* Filters */}
      <section className="p-4">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap gap-2">
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
                className={`px-4 py-2 rounded-full font-semibold text-sm border-none cursor-pointer transition-all ${
                  filter === f.value ? "bg-orange text-white" : "bg-teal/60 text-cream"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Grid */}
      <section className="p-4 pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div
            className="gap-6 mb-12"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
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
                  className="rounded-2xl overflow-hidden bg-teal border border-orange/20 transition-transform hover:scale-105"
                >
                  <div
                    className="h-32 flex items-center justify-center text-5xl font-bold text-white"
                    style={{ backgroundColor: member.color }}
                  >
                    {initials}
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-white font-semibold text-base m-0 mb-1">{member.name}</h3>
                    <p className="text-orange text-xs font-semibold m-0 mb-1 capitalize">
                      {member.role}
                    </p>
                    <p className="text-muted text-xs m-0">{member.year}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="bg-teal rounded-2xl p-8 border border-orange/20 flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-display font-bold text-white m-0 mb-2">
                Are you a Bitcamp alum? Add yourself to the team page →
              </h2>
              <p className="text-sm text-cream m-0 leading-relaxed">
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

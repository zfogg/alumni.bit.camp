"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

interface Member {
  id: string;
  name: string;
  email: string;
  year: string;
  role: string;
  school?: string;
  what_i_did?: string;
  headshot_url?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  created_at: string;
  featured: boolean;
}

const ROLE_COLORS: Record<string, string> = {
  hacker: "#FF6F3F",
  organizer: "#4A90E2",
  sponsor: "#E91E63",
  staff: "#4FC3F7",
  other: "#9C27B0",
};

export const Team: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMembers() {
      try {
        const res = await fetch("/api/members", { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to fetch members: ${res.status}`);
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        console.error("Error loading members:", err);
        setError("Failed to load members. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadMembers();
  }, []);

  const filteredMembers =
    filter === "all"
      ? members
      : members.filter((m) => m.role.toLowerCase() === filter.toLowerCase());

  return (
    <div className="bg-space text-cream flex-1">
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

      {/* Loading State */}
      {loading && (
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-cream">Loading team members...</p>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-orange">{error}</p>
          </div>
        </section>
      )}

      {/* Profile Grid */}
      {!loading && !error && (
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
                const roleColor = ROLE_COLORS[member.role.toLowerCase()] || ROLE_COLORS.other;
                return (
                  <div
                    key={member.id}
                    className="rounded-2xl overflow-hidden bg-teal border border-orange/20 transition-transform hover:scale-105"
                  >
                    <div
                      className="h-32 flex items-center justify-center text-5xl font-bold text-white"
                      style={{ backgroundColor: roleColor }}
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
                  Submit your name, headshot, role, and Bitcamp year. We'll add you to the
                  directory.
                </p>
              </div>
              <Button size="lg" as={Link} to="/join">
                JOIN NOW
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

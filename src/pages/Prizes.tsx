import { useEffect, useState } from "react";
import { getPrizes, getWinners } from "../lib/sheets";
import type { Prize, Winner } from "../types";

interface PrizeWithWinners extends Prize {
  winners: Winner[];
}

export const Prizes: React.FC = () => {
  const [prizes, setPrizes] = useState<PrizeWithWinners[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrizes() {
      try {
        const [prizeData, winnerData] = await Promise.all([getPrizes(), getWinners()]);

        // Combine prizes with their winners
        const combined = prizeData.map((prize) => {
          return {
            ...prize,
            winners: winnerData
              .filter((w) => w.prize_id === prize.prize_id)
              .sort((a, b) => Number(b.year) - Number(a.year)), // Sort by year descending
          };
        });

        setPrizes(combined);
      } catch (err) {
        console.error("Error loading prizes:", err);
        setError("Failed to load prizes. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    void loadPrizes();
  }, []);

  return (
    <div className="bg-space text-cream flex-1">
      {/* Hero */}
      <section className="pt-30 pb-4">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-6xl font-display font-bold text-white mb-1">
            <span className="inline-block w-6 h-6 bg-star mr-3 align-middle"></span>Prize Hall of
            Fame
          </h1>
          <p className="text-cream text-base mb-8">
            Celebrating the winners of alumni-sponsored prizes across all Bitcamp years.
          </p>
          <div className="h-px bg-orange/30"></div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-cream">Loading prizes...</p>
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

      {/* Prize Cards Flowbox */}
      {!loading && !error && (
        <section className="py-4 pb-32">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex flex-wrap gap-6 mb-12">
              {prizes.map((prize) => (
                <div
                  key={prize.prize_id}
                  className="flex-1 min-w-[250px] sm:min-w-80 max-w-lg rounded-2xl overflow-hidden bg-teal border border-orange/20"
                >
                  {/* Card Header */}
                  <div
                    className="px-6 py-6 text-white flex justify-between items-start gap-3"
                    style={{ backgroundColor: prize.color }}
                  >
                    <div>
                      <h2 className="text-2xl font-display font-bold m-0 mb-2">
                        {prize.prize_name}
                      </h2>
                      <p className="text-sm opacity-95 m-0">{prize.description}</p>
                    </div>
                    <span className="text-3xl flex-shrink-0">{prize.icon}</span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col gap-3">
                    {prize.winners.length > 0 ? (
                      prize.winners.map((w, widx) => (
                        <div
                          key={widx}
                          className="p-4 bg-gradient-to-r from-orange/10 to-transparent rounded-lg border-l-4 transition-all hover:shadow-lg hover:scale-102"
                          style={{ borderLeftColor: prize.color }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className="text-xs font-bold px-3 py-1.5 rounded-full text-white flex-shrink-0 shadow-md"
                              style={{
                                backgroundColor: prize.color,
                                boxShadow: `0 0 0 2px ${prize.color}33`,
                              }}
                            >
                              {w.year}
                            </span>
                            <p className="text-white font-semibold text-sm m-0 !mb-0 flex-1">
                              {w.team_name}
                            </p>
                          </div>
                          <p className="text-cream/95 text-xs leading-relaxed m-0 mb-2">
                            <strong>{w.project_name}</strong>
                          </p>
                          {w.description && (
                            <p className="text-cream/80 text-xs leading-relaxed m-0 mb-2">
                              {w.description}
                            </p>
                          )}
                          {w.members && (
                            <p className="text-cream/70 text-xs italic m-0">{w.members}</p>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-cream/60 text-xs text-center py-4">No winners yet</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Info Box */}
            <div className="border-2 border-orange rounded-2xl p-8 bg-teal/50 mb-8">
              <div className="flex gap-3 mb-3">
                <span className="text-3xl">🔥</span>
                <h3 className="text-orange font-display font-bold text-xl m-0">
                  Adding a New Winner
                </h3>
              </div>
              <p className="text-sm text-cream leading-relaxed m-0">
                Prize winners are managed via{" "}
                <a
                  href="https://docs.google.com/spreadsheets/d/1WTq7U2SOWJQI836oQydv0kgTPSY2fl7J8oIZCuKCeE8/edit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange hover:underline"
                >
                  a connected Google Sheet
                </a>{" "}
                — no coding required. Prize sponsors can add winners directly; the page updates
                automatically.
              </p>
            </div>

            {/* About */}
            <div className="bg-teal rounded-2xl p-8 border border-orange/20">
              <h2 className="text-xl font-display font-bold text-white mb-4 m-0">
                About Alumni Prizes
              </h2>
              <p className="text-sm text-cream leading-relaxed mb-4">
                Alumni prizes are sponsored by Bitcamp alumni who want to give back to the hacking
                community. Each prize has its own criteria and is awarded by the sponsoring alum at
                the closing ceremony.
              </p>
              <p className="text-sm text-cream leading-relaxed m-0">
                Prizes are grouped by sponsor so each person's winners are celebrated together in
                perpetuity. Want to sponsor a prize? Reach out via the{" "}
                <a
                  href="/contact"
                  className="text-orange no-underline font-semibold hover:text-white"
                >
                  Contact page
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

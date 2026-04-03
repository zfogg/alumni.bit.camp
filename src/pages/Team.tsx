import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

export const Team: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const filters = ["All", "Hackers", "Organizers", "Sponsors", "Staff"];

  return (
    <div className="min-h-screen bg-space text-cream">
      {/* Hero Section */}
      <section className="pt-30 pb-20">
        <div className="text-center max-w-3xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Meet the Alumni
          </h1>
          <p className="text-lg md:text-xl text-cream leading-relaxed">
            Hackers, organizers, sponsors, and staff who've shaped Bitcamp.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f.toLowerCase())}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition text-sm sm:text-base ${
                  filter === f.toLowerCase()
                    ? "bg-orange text-white"
                    : "bg-teal text-cream hover:bg-teal/80"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni Grid */}
      <section className="py-16 pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-teal rounded-2xl p-8 text-center border border-orange/20 hover:scale-105 transition duration-300"
              >
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-star rounded-full mx-auto mb-4"
                  style={{ backgroundColor: "#ffd580" }}
                />
                <h3 className="text-white font-semibold text-lg mb-2">Alumni Member {i}</h3>
                <p className="text-orange text-sm font-semibold mb-1">Hacker</p>
                <p className="text-muted text-sm mb-3">2020</p>
                <p className="text-cream text-sm leading-relaxed">"Built something amazing"</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center pt-8 border-t border-orange/30">
            <p className="text-cream mb-6 text-lg">Want to see your profile here?</p>
            <Button size="lg" as={Link} to="/join">
              ADD YOURSELF
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

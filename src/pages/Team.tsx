import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";

export const Team: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");

  const filters = ["All", "Hackers", "Organizers", "Sponsors", "Staff"];

  return (
    <div className="min-h-screen bg-space text-cream pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-display font-bold text-white mb-12 text-center">
          Meet the Alumni
        </h1>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f.toLowerCase())}
              className={`px-6 py-2 rounded-pill font-semibold transition ${
                filter === f.toLowerCase()
                  ? "bg-orange text-white"
                  : "bg-teal text-cream hover:bg-teal/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="text-center relative -rotate-2 hover:rotate-0 transition">
              <div className="w-24 h-24 bg-star rounded-full mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg">Alumni Member {i}</h3>
              <p className="text-orange text-sm font-semibold mb-1">Hacker</p>
              <p className="text-muted text-sm mb-2">2020</p>
              <p className="text-cream text-sm">"Built something amazing"</p>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-cream mb-6">Want to see your profile here?</p>
          <Button size="lg" as={Link} to="/join">
            Add Yourself
          </Button>
        </div>
      </div>
    </div>
  );
};

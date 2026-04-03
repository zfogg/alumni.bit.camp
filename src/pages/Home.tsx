import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Sparkle } from "../components/ui/Sparkle";

export const Home: React.FC = () => {
  const alumni = [
    { initial: "Z", name: "Zach F.", role: "Hacker", year: "'14", color: "#FF8A65" },
    { initial: "P", name: "Priya M.", role: "Organizer", year: "'19", color: "#42A5F5" },
    { initial: "A", name: "Alex K.", role: "Sponsor", year: "'22", color: "#66BB6A" },
    { initial: "J", name: "Jordan L.", role: "Staff", year: "'23", color: "#AB47BC" },
  ];

  return (
    <div className="min-h-screen bg-space text-cream">
      {/* Hero Section - LARGE */}
      <section className="py-20 text-center">
        <div>
          <div className="flex justify-center mb-16 gap-10">
            <Sparkle size={40} />
            <Sparkle size={40} />
          </div>
          <h1 className="home-hero-title text-9xl font-display font-bold text-white mb-10 leading-tight">
            Bitcamp Alumni
          </h1>
          <p className="home-hero-tagline text-4xl text-cream mb-16 leading-relaxed">
            Eleven years of builders. One community.
          </p>
          <div className="flex flex-col gap-6 justify-center items-center">
            <Button size="lg" as={Link} to="/join">
              JOIN NOW
            </Button>
            <Button size="lg" variant="ghost" as={Link} to="/about">
              LEARN MORE
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div>
          <div className="home-stats-grid grid grid-cols-4 gap-10">
            <div className="home-stat-item text-center border-r border-gray-700 pr-10">
              <div className="home-stat-number text-6xl font-bold text-orange mb-4">11</div>
              <div className="text-base text-cream font-semibold">Years of Bitcamp</div>
            </div>
            <div className="home-stat-item text-center border-r border-gray-700 pr-10">
              <div className="home-stat-number text-6xl font-bold text-orange mb-4">1,400+</div>
              <div className="text-base text-cream font-semibold">Hackers per year</div>
            </div>
            <div className="home-stat-item text-center border-r border-gray-700 pr-10">
              <div className="home-stat-number text-6xl font-bold text-orange mb-4">100+</div>
              <div className="text-base text-cream font-semibold">Alumni connected</div>
            </div>
            <div className="home-stat-item text-center">
              <div className="home-stat-number text-6xl font-bold text-orange mb-4">∞</div>
              <div className="text-base text-cream font-semibold">Ideas spawned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA Section - HEAVILY PADDED */}
      <section className="home-cta-section py-32">
        <div className="home-cta-box max-w-3xl mx-auto bg-teal rounded-3xl p-20">
          <h2 className="home-cta-title text-6xl font-display font-bold text-white mb-8">
            Are you a Bitcamp alum?
          </h2>
          <p className="home-cta-text text-xl text-cream mb-12 leading-relaxed">
            Whether you hacked, organized, sponsored, or staffed — this community is for you. Share
            your info and we'll add you to the alumni network.
          </p>
          <div className="flex flex-col gap-4 mb-8">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full px-6 py-4 rounded-lg bg-space/50 border border-gray-700 text-cream text-base focus:outline-none focus:border-orange"
            />
            <input
              type="number"
              placeholder="Year attended"
              className="w-full px-6 py-4 rounded-lg bg-space/50 border border-gray-700 text-cream text-base focus:outline-none focus:border-orange"
            />
            <Button as={Link} to="/join" size="lg">
              JOIN
            </Button>
          </div>
          <p className="text-sm text-gray-400 mb-6">
            Your info is saved to a private spreadsheet. We'll never share it.
          </p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-base text-cream mb-3">Then join our community:</p>
            <a
              href={import.meta.env.VITE_DISCORD_INVITE_URL || "https://discord.gg/bitcamp"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-base text-orange no-underline font-semibold border-b-2 border-orange pb-1"
            >
              Join our Discord →
            </a>
          </div>
        </div>
      </section>

      {/* Featured Alumni Section */}
      <section className="py-20 mb-20">
        <div>
          <h2 className="home-featured-title text-6xl font-display font-bold text-white text-center mb-6">
            Featured Alumni
          </h2>
          <p className="text-gray-400 text-center mb-16 text-lg">
            A few of the people who've made Bitcamp what it is.
          </p>
          <div className="home-featured-grid grid grid-cols-4 gap-6">
            {alumni.map((person) => (
              <div key={person.initial} className="rounded-2xl overflow-hidden bg-teal">
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ backgroundColor: person.color }}
                >
                  <span className="text-8xl font-bold text-white">{person.initial}</span>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-white font-semibold text-lg mb-2">{person.name}</h3>
                  <p className="text-orange text-sm font-semibold mb-3">
                    {person.role} {person.year}
                  </p>
                  <p className="text-cream text-sm leading-relaxed">
                    Built something amazing at Bitcamp and never looked back.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

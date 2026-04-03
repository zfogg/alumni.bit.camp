import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
  const discordUrl = import.meta.env.VITE_DISCORD_INVITE_URL || "https://discord.gg/bitcamp";

  return (
    <footer className="bg-teal/30 border-t border-teal/50 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 text-white font-display text-lg mb-4">
              <span>🔥</span>
              <span>Bitcamp Alumni</span>
            </div>
            <p className="text-cream text-sm">Eleven years of builders. One community.</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-cream hover:text-orange transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-cream hover:text-orange transition">
                  Team
                </Link>
              </li>
              <li>
                <Link to="/prizes" className="text-cream hover:text-orange transition">
                  Prizes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/join" className="text-cream hover:text-orange transition">
                  Join
                </Link>
              </li>
              <li>
                <Link to="/give" className="text-cream hover:text-orange transition">
                  Give Back
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream hover:text-orange transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream hover:text-orange transition"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://bit.camp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream hover:text-orange transition"
                >
                  Main Event
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-teal/30 pt-8 text-center text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} Bitcamp Alumni. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

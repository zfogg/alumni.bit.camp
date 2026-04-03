import { Link } from "react-router-dom";

const FooterLink: React.FC<{
  to?: string;
  href?: string;
  children: React.ReactNode;
}> = ({ to, href, children }) => {
  if (to) {
    return (
      <Link to={to} className="text-cream text-sm no-underline transition-colors hover:text-orange">
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cream text-sm no-underline transition-colors hover:text-orange"
    >
      {children}
    </a>
  );
};

export const Footer: React.FC = () => {
  const discordUrl = import.meta.env.VITE_DISCORD_INVITE_URL || "https://discord.gg/bitcamp";

  return (
    <footer className="bg-space border-t border-gray-600/20 py-16 mt-20 z-1 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="footer-grid grid grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 text-white font-display text-lg font-bold mb-4">
              <span>🔥</span>
              <span>Bitcamp Alumni</span>
            </div>
            <p className="text-cream text-sm leading-relaxed">
              Eleven years of builders. One community.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Pages</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <FooterLink to="/about">About</FooterLink>
              </li>
              <li>
                <FooterLink to="/team">Team</FooterLink>
              </li>
              <li>
                <FooterLink to="/prizes">Prizes</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Get Involved</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <FooterLink to="/join">Join</FooterLink>
              </li>
              <li>
                <FooterLink to="/give">Give Back</FooterLink>
              </li>
              <li>
                <FooterLink to="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Community</h3>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              <li>
                <FooterLink href={discordUrl}>Discord</FooterLink>
              </li>
              <li>
                <FooterLink href="https://bit.camp">Main Event</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600/20 pt-8 text-center">
          <p className="text-gray-600 text-xs m-0">
            &copy; {new Date().getFullYear()} Bitcamp Alumni. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-space/95 backdrop-blur border-b border-teal/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-white font-display text-xl hover:text-orange transition"
        >
          <span>🔥</span>
          <span>Bitcamp Alumni</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/about" className="text-cream hover:text-orange transition">
            About
          </Link>
          <Link to="/team" className="text-cream hover:text-orange transition">
            Team
          </Link>
          <Link to="/prizes" className="text-cream hover:text-orange transition">
            Prizes
          </Link>
          <Link to="/give" className="text-cream hover:text-orange transition">
            Give Back
          </Link>
          <Link to="/contact" className="text-cream hover:text-orange transition">
            Contact
          </Link>
          <Button size="sm" as={Link} to="/join">
            Join
          </Button>
        </div>

        <div className="md:hidden">
          <Button size="sm" variant="secondary">
            Menu
          </Button>
        </div>
      </div>
    </nav>
  );
};

import { useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Starfield } from "../Starfield";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const is404 =
    location.pathname !== "/" &&
    location.pathname !== "/about" &&
    location.pathname !== "/join" &&
    location.pathname !== "/team" &&
    location.pathname !== "/prizes" &&
    location.pathname !== "/give" &&
    location.pathname !== "/contact";

  return (
    <div className="min-h-screen bg-space flex flex-col">
      <Starfield count={150} speed={0.5} />
      <Navigation />

      <main
        className={`flex-1 flex flex-col z-10 mt-24 px-6 main-content ${
          is404 ? "justify-center items-center" : "items-center"
        }`}
      >
        <div className="w-full max-w-5xl flex flex-col flex-1">{children}</div>
      </main>

      <Footer />
    </div>
  );
};

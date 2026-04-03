import { useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { Starfield } from "../Starfield";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const is404 = location.pathname !== "/" && location.pathname !== "/about" && location.pathname !== "/join" && location.pathname !== "/team" && location.pathname !== "/prizes" && location.pathname !== "/give" && location.pathname !== "/contact";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#010218" }}>
      <Starfield count={150} speed={0.5} />
      <Navigation />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          zIndex: 10,
          marginTop: "100px",
          paddingLeft: "24px",
          paddingRight: "24px",
          ...(is404
            ? {
                justifyContent: "center",
                alignItems: "center",
                minHeight: "calc(100vh - 100px)",
              }
            : {
                alignItems: "center",
              }),
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
          }}
        >
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
};

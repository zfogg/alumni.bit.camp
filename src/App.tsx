import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { Starfield } from "./components/Starfield";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Join } from "./pages/Join";
import { Team } from "./pages/Team";
import { Prizes } from "./pages/Prizes";
import { Give } from "./pages/Give";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import "./styles/globals.css";

function App() {
  return (
    <BrowserRouter>
      <Starfield count={150} speed={0.5} />
      <Navigation />
      <main className="z-10 min-h-screen" style={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/join" element={<Join />} />
          <Route path="/team" element={<Team />} />
          <Route path="/prizes" element={<Prizes />} />
          <Route path="/give" element={<Give />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

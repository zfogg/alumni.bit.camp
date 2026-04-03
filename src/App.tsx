import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
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
      <Layout>
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
      </Layout>
    </BrowserRouter>
  );
}

export default App;

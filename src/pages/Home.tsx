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
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "60px", gap: "40px" }}>
            <Sparkle size={40} />
            <Sparkle size={40} />
          </div>
          <h1 style={{ fontSize: "120px", fontFamily: "Aleo, serif", fontWeight: "bold", color: "white", marginBottom: "40px", lineHeight: "1" }}>
            Bitcamp Alumni
          </h1>
          <p style={{ fontSize: "32px", color: "#FFF7EB", marginBottom: "60px", lineHeight: "1.4" }}>
            Eleven years of builders. One community.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", justifyContent: "center", alignItems: "center" }}>
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
      <section style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "40px" }}>
            <div style={{ textAlign: "center", borderRight: "1px solid rgba(200, 200, 200, 0.2)", paddingRight: "40px" }}>
              <div style={{ fontSize: "80px", fontWeight: "bold", color: "#FF6F3F", marginBottom: "16px" }}>11</div>
              <div style={{ fontSize: "16px", color: "#FFF7EB", fontWeight: "600" }}>Years of Bitcamp</div>
            </div>
            <div style={{ textAlign: "center", borderRight: "1px solid rgba(200, 200, 200, 0.2)", paddingRight: "40px" }}>
              <div style={{ fontSize: "80px", fontWeight: "bold", color: "#FF6F3F", marginBottom: "16px" }}>1,400+</div>
              <div style={{ fontSize: "16px", color: "#FFF7EB", fontWeight: "600" }}>Hackers per year</div>
            </div>
            <div style={{ textAlign: "center", borderRight: "1px solid rgba(200, 200, 200, 0.2)", paddingRight: "40px" }}>
              <div style={{ fontSize: "80px", fontWeight: "bold", color: "#FF6F3F", marginBottom: "16px" }}>100+</div>
              <div style={{ fontSize: "16px", color: "#FFF7EB", fontWeight: "600" }}>Alumni connected</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "80px", fontWeight: "bold", color: "#FF6F3F", marginBottom: "16px" }}>∞</div>
              <div style={{ fontSize: "16px", color: "#FFF7EB", fontWeight: "600" }}>Ideas spawned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA Section - HEAVILY PADDED */}
      <section style={{ paddingTop: "120px", paddingBottom: "120px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#1A2E33", borderRadius: "32px", padding: "80px 60px" }}>
          <h2 style={{ fontSize: "56px", fontFamily: "Aleo, serif", fontWeight: "bold", color: "white", marginBottom: "32px" }}>
            Are you a Bitcamp alum?
          </h2>
          <p style={{ fontSize: "20px", color: "#FFF7EB", marginBottom: "48px", lineHeight: "1.6" }}>
            Whether you hacked, organized, sponsored, or staffed — this community is for you.
            Share your info and we'll add you to the alumni network.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: "12px",
                backgroundColor: "rgba(1, 2, 24, 0.5)",
                border: "1px solid #555",
                color: "#FFF7EB",
                fontSize: "16px"
              }}
            />
            <input
              type="number"
              placeholder="Year attended"
              style={{
                width: "100%",
                padding: "16px 24px",
                borderRadius: "12px",
                backgroundColor: "rgba(1, 2, 24, 0.5)",
                border: "1px solid #555",
                color: "#FFF7EB",
                fontSize: "16px"
              }}
            />
            <Button as={Link} to="/join" size="lg">
              JOIN
            </Button>
          </div>
          <p style={{ fontSize: "14px", color: "#aaa", marginBottom: "24px" }}>
            Your info is saved to a private spreadsheet. We'll never share it.
          </p>
          <div style={{ borderTop: "1px solid rgba(200, 200, 200, 0.2)", paddingTop: "24px" }}>
            <p style={{ fontSize: "16px", color: "#FFF7EB", marginBottom: "12px" }}>
              Then join our community:
            </p>
            <a
              href={import.meta.env.VITE_DISCORD_INVITE_URL || "https://discord.gg/bitcamp"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontSize: "16px",
                color: "#FF6F3F",
                textDecoration: "none",
                fontWeight: "600",
                borderBottom: "2px solid #FF6F3F",
                paddingBottom: "4px"
              }}
            >
              Join our Discord →
            </a>
          </div>
        </div>
      </section>

      {/* Featured Alumni Section */}
      <section style={{ paddingTop: "80px", paddingBottom: "80px", marginBottom: "80px" }}>
        <div>
          <h2 style={{ fontSize: "56px", fontFamily: "Aleo, serif", fontWeight: "bold", color: "white", textAlign: "center", marginBottom: "24px" }}>
            Featured Alumni
          </h2>
          <p style={{ color: "#999", textAlign: "center", marginBottom: "60px", fontSize: "18px" }}>
            A few of the people who've made Bitcamp what it is.
          </p>
          <section style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {alumni.map((person) => (
              <div key={person.initial} style={{ borderRadius: "24px", overflow: "hidden", backgroundColor: "#1A2E33" }}>
                <div
                  style={{
                    height: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: person.color
                  }}
                >
                  <span style={{ fontSize: "80px", fontWeight: "bold", color: "white" }}>
                    {person.initial}
                  </span>
                </div>
                <div style={{ padding: "32px 24px", textAlign: "center" }}>
                  <h3 style={{ color: "white", fontWeight: "600", fontSize: "18px", marginBottom: "8px" }}>
                    {person.name}
                  </h3>
                  <p style={{ color: "#FF6F3F", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
                    {person.role} {person.year}
                  </p>
                  <p style={{ color: "#FFF7EB", fontSize: "14px", lineHeight: "1.5" }}>
                    Built something amazing at Bitcamp and never looked back.
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
    </div>
  );
};

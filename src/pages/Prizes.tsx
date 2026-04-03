export const Prizes: React.FC = () => {
  const prizes = [
    {
      name: "Zach's Prize",
      subtitle: "Best use of open source tools",
      headerColor: "#FF6F3F",
      icon: "🔧",
      winners: [
        { year: 2024, team: "Team Quantum", project: "NeuroSync — AI-powered meditation app" },
        { year: 2023, team: "HackHub", project: "DevForge — real-time coding collaboration" },
        { year: 2022, team: "Byte Builders", project: "EcoTrack — carbon footprint visualizer" },
      ],
    },
    {
      name: "Gurpreet's Prize",
      subtitle: "Most impactful social good hack",
      headerColor: "#4A90E2",
      icon: "💙",
      winners: [
        { year: 2024, team: "Team Terra", project: "SafeRoute — accessible transit mapping" },
        { year: 2023, team: "CodeForGood", project: "FoodBridge — surplus food redistribution" },
        { year: 2022, team: "Impact X", project: "MedAlert — medication reminder for elderly" },
      ],
    },
    {
      name: "Best AI Innovation",
      subtitle: "Creative use of artificial intelligence",
      headerColor: "#9C27B0",
      icon: "🤖",
      winners: [
        { year: 2024, team: "Neural Nexus", project: "CodeAssist — AI code review tool" },
        { year: 2023, team: "ML Masters", project: "PredictFlow — predictive analytics platform" },
        { year: 2022, team: "AI Innovators", project: "VisionAI — computer vision classifier" },
      ],
    },
    {
      name: "People's Choice",
      subtitle: "The project everyone loved",
      headerColor: "#E91E63",
      icon: "❤️",
      winners: [
        { year: 2024, team: "Fun Hackers", project: "GameFlow — multiplayer game in 36h" },
        { year: 2023, team: "Creative Minds", project: "ArtSync — collaborative digital canvas" },
        { year: 2022, team: "Joy Makers", project: "SoundWave — interactive music creator" },
      ],
    },
    {
      name: "Rookie of the Year",
      subtitle: "Best first-time hacker project",
      headerColor: "#66BB6A",
      icon: "🌱",
      winners: [
        { year: 2024, team: "First Timer", project: "HealthTrack — personal wellness app" },
        { year: 2023, team: "New Builders", project: "EduConnect — peer tutoring platform" },
        { year: 2022, team: "Fresh Start", project: "TaskMaster — productivity tool" },
      ],
    },
    {
      name: "Community Spirit",
      subtitle: "Best contribution to Bitcamp",
      headerColor: "#F59E0B",
      icon: "🔥",
      winners: [
        { year: 2024, team: "Team Unity", project: "Documentation — built better docs" },
        { year: 2023, team: "Helpers", project: "Mentorship — helped 20+ teams" },
        { year: 2022, team: "Organizers", project: "Workshop — taught web dev basics" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-space text-cream">
      {/* Hero */}
      <section className="pt-30 pb-4">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-6xl font-display font-bold text-white mb-1">
            <span className="inline-block w-6 h-6 bg-star mr-3 align-middle"></span>Prize Hall of
            Fame
          </h1>
          <p className="text-cream text-base mb-8">
            Celebrating the winners of alumni-sponsored prizes across all Bitcamp years.
          </p>
          <div className="h-px bg-orange/30"></div>
        </div>
      </section>

      {/* Prize Cards Flowbox */}
      <section className="py-4 pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "48px" }}>
            {prizes.map((prize, idx) => (
              <div
                key={idx}
                style={{
                  flex: "1 1 auto",
                  minWidth: "320px",
                  maxWidth: "420px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "#1A2E33",
                  border: "1px solid rgba(255, 111, 63, 0.2)",
                }}
              >
                {/* Card Header */}
                <div
                  style={{
                    backgroundColor: prize.headerColor,
                    padding: "24px",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontSize: "22px",
                        fontWeight: "bold",
                        fontFamily: "Aleo, serif",
                        margin: 0,
                        marginBottom: "8px",
                      }}
                    >
                      {prize.name}
                    </h2>
                    <p style={{ fontSize: "14px", opacity: 0.95, margin: 0 }}>{prize.subtitle}</p>
                  </div>
                  <span style={{ fontSize: "28px", flexShrink: 0 }}>{prize.icon}</span>
                </div>

                {/* Card Content */}
                <div
                  style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}
                >
                  {prize.winners.map((w, widx) => (
                    <div
                      key={widx}
                      style={{
                        padding: "12px",
                        backgroundColor: "rgba(255, 111, 63, 0.1)",
                        borderRadius: "8px",
                        borderLeft: `4px solid ${prize.headerColor}`,
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(255, 111, 63, 0.2)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(255, 111, 63, 0.1)";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "4px",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: prize.headerColor,
                            color: "white",
                            fontSize: "11px",
                            fontWeight: "bold",
                            padding: "4px 8px",
                            borderRadius: "4px",
                            flexShrink: 0,
                          }}
                        >
                          {w.year}
                        </span>
                        <p
                          style={{ color: "white", fontWeight: "600", fontSize: "14px", margin: 0 }}
                        >
                          {w.team}
                        </p>
                      </div>
                      <p
                        style={{ color: "#FFF7EB", fontSize: "12px", lineHeight: "1.4", margin: 0 }}
                      >
                        {w.project}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div
            style={{
              border: "2px solid #FF6F3F",
              borderRadius: "16px",
              padding: "32px",
              backgroundColor: "rgba(26, 46, 51, 0.5)",
              marginBottom: "32px",
            }}
          >
            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <span style={{ fontSize: "28px" }}>🔥</span>
              <h3
                style={{
                  color: "#FF6F3F",
                  fontFamily: "Aleo, serif",
                  fontWeight: "bold",
                  fontSize: "20px",
                  margin: 0,
                }}
              >
                Adding a New Winner
              </h3>
            </div>
            <p style={{ fontSize: "14px", color: "#FFF7EB", lineHeight: "1.6", margin: 0 }}>
              Prize winners are managed via a connected Google Sheet — no coding required. Prize
              sponsors can add winners directly; the page updates automatically.
            </p>
          </div>

          {/* About */}
          <div
            style={{
              backgroundColor: "#1A2E33",
              borderRadius: "16px",
              padding: "32px",
              border: "1px solid rgba(255, 111, 63, 0.2)",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontFamily: "Aleo, serif",
                fontWeight: "bold",
                color: "white",
                marginBottom: "16px",
                margin: 0,
              }}
            >
              About Alumni Prizes
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#FFF7EB",
                lineHeight: "1.6",
                marginBottom: "16px",
              }}
            >
              Alumni prizes are sponsored by Bitcamp alumni who want to give back to the hacking
              community. Each prize has its own criteria and is awarded by the sponsoring alum at
              the closing ceremony.
            </p>
            <p style={{ fontSize: "14px", color: "#FFF7EB", lineHeight: "1.6", margin: 0 }}>
              Prizes are grouped by sponsor so each person's winners are celebrated together in
              perpetuity. Want to sponsor a prize? Reach out via the{" "}
              <a
                href="/contact"
                style={{ color: "#FF6F3F", textDecoration: "none", fontWeight: "600" }}
              >
                Contact page
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

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
          <div className="flex flex-wrap gap-6 mb-12">
            {prizes.map((prize, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-80 max-w-lg rounded-2xl overflow-hidden bg-teal border border-orange/20"
              >
                {/* Card Header */}
                <div
                  className="px-6 py-6 text-white flex justify-between items-start gap-3"
                  style={{ backgroundColor: prize.headerColor }}
                >
                  <div>
                    <h2 className="text-2xl font-display font-bold m-0 mb-2">{prize.name}</h2>
                    <p className="text-sm opacity-95 m-0">{prize.subtitle}</p>
                  </div>
                  <span className="text-3xl flex-shrink-0">{prize.icon}</span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col gap-3">
                  {prize.winners.map((w, widx) => (
                    <div
                      key={widx}
                      className="p-3 bg-orange/10 rounded-lg border-l-4 transition-colors hover:bg-orange/20"
                      style={{ borderLeftColor: prize.headerColor }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-bold px-2 py-1 rounded text-white flex-shrink-0"
                          style={{ backgroundColor: prize.headerColor }}
                        >
                          {w.year}
                        </span>
                        <p className="text-white font-semibold text-sm m-0">{w.team}</p>
                      </div>
                      <p className="text-cream/95 text-xs leading-relaxed m-0">{w.project}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="border-2 border-orange rounded-2xl p-8 bg-teal/50 mb-8">
            <div className="flex gap-3 mb-3">
              <span className="text-3xl">🔥</span>
              <h3 className="text-orange font-display font-bold text-xl m-0">
                Adding a New Winner
              </h3>
            </div>
            <p className="text-sm text-cream leading-relaxed m-0">
              Prize winners are managed via a connected Google Sheet — no coding required. Prize
              sponsors can add winners directly; the page updates automatically.
            </p>
          </div>

          {/* About */}
          <div className="bg-teal rounded-2xl p-8 border border-orange/20">
            <h2 className="text-xl font-display font-bold text-white mb-4 m-0">
              About Alumni Prizes
            </h2>
            <p className="text-sm text-cream leading-relaxed mb-4">
              Alumni prizes are sponsored by Bitcamp alumni who want to give back to the hacking
              community. Each prize has its own criteria and is awarded by the sponsoring alum at
              the closing ceremony.
            </p>
            <p className="text-sm text-cream leading-relaxed m-0">
              Prizes are grouped by sponsor so each person's winners are celebrated together in
              perpetuity. Want to sponsor a prize? Reach out via the{" "}
              <a
                href="/contact"
                className="text-orange no-underline font-semibold hover:text-white"
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

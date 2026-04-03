export const Prizes: React.FC = () => {
  const awards = [
    { name: "Best AI Innovation", desc: "For creative use of artificial intelligence" },
    { name: "People's Choice", desc: "For the project everyone loved" },
    { name: "Rookie of the Year", desc: "For the best first-time hacker project" },
  ];

  const winners = [
    {
      year: 2024,
      team: "Team Name",
      project: "Amazing Project Description",
      members: "Zach, Ali, Chen",
    },
    {
      year: 2023,
      team: "Another Team",
      project: "Previous winner with great project",
      members: "Sarah, Mike",
    },
    {
      year: 2022,
      team: "Team Builder",
      project: "Innovative solution that changed everything",
      members: "Jordan, Alex, Pat",
    },
  ];

  return (
    <div className="min-h-screen bg-space text-cream">
      {/* Hero Section */}
      <section className="pt-30 pb-20">
        <div className="text-center max-w-3xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Prize Hall of Fame
          </h1>
          <p className="text-lg md:text-xl text-cream leading-relaxed">
            Celebrating the amazing projects and teams that won big at Bitcamp.
          </p>
        </div>
      </section>

      {/* Prizes Grid */}
      <section className="py-20 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-12">
            {awards.map((award, i) => (
              <div key={i} className="bg-teal rounded-2xl p-10 border border-orange/20">
                <div className="mb-8">
                  <h2 className="text-3xl font-display font-bold text-orange mb-2">{award.name}</h2>
                  <p className="text-base text-cream">{award.desc}</p>
                </div>

                <div className="flex flex-col gap-6">
                  {winners.map((winner, idx) => (
                    <div key={idx} className="border-l-4 border-orange pl-6 py-2">
                      <div className="flex flex-col gap-2">
                        <p className="text-white font-semibold text-base">
                          {winner.year} · {winner.team}
                        </p>
                        <p className="text-cream text-sm">{winner.project}</p>
                        <p className="text-muted text-xs">{winner.members}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

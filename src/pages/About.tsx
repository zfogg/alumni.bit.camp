export const About: React.FC = () => {
  return (
    <div className="bg-space text-cream flex-1">
      {/* Hero */}
      <section className="pt-30 pb-4">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-6xl font-display font-bold text-white mb-1">About Bitcamp Alumni</h1>
          <p className="text-sm text-orange mb-8">
            Why we exist · What Bitcamp is · Why this community matters
          </p>
          <div className="h-px bg-orange/30"></div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-16 pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-20">
            {/* Left Column - Text (2 cols on desktop) */}
            <div className="md:col-span-2 flex flex-col gap-8">
              <div>
                <h2 className="text-xl font-display font-bold text-white mb-4">What is Bitcamp?</h2>
                <p className="text-base text-cream leading-relaxed mb-3">
                  Bitcamp is the University of Maryland's premier hackathon, founded in 2014. Every
                  year, 1,400+ students gather for 36 hours of building, learning, and connecting —
                  making it one of the largest collegiate hackathons on the East Coast.
                </p>
                <p className="text-base text-cream leading-relaxed">
                  The name combines two things every hacker loves: bits (the language of computers)
                  and camp (the spirit of community). A campfire where ideas catch fire.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-display font-bold text-white mb-4">
                  Why does this alumni group exist?
                </h2>
                <p className="text-base text-cream leading-relaxed mb-3">
                  Bitcamp has changed thousands of lives. Friendships formed over late-night
                  debugging sessions. Startups born from hackathon projects. Careers shaped by a
                  weekend of creative pressure and community support.
                </p>
                <p className="text-base text-cream leading-relaxed">
                  This alumni network exists to keep those connections alive — and to give back to
                  the next generation of Bitcamp hackers through mentorship, prizes, and memory.
                </p>
              </div>

              <div className="pb-8 md:pb-0">
                <h2 className="text-xl font-display font-bold text-white mb-4">Who can join?</h2>
                <p className="text-base text-cream leading-relaxed mb-4">
                  Anyone who has ever been part of Bitcamp is welcome:
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { color: "#66BB6A", text: "Hacker — you built something here" },
                    { color: "#FF6F3F", text: "Organizer — you made it happen" },
                    { color: "#FF6F3F", text: "Sponsor — you made it possible" },
                    { color: "#9C27B0", text: "Event staff — you kept it running" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-base text-cream">
                      <span
                        className="w-3 h-3 flex-shrink-0 inline-block"
                        style={{ backgroundColor: item.color }}
                      ></span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Stats (1 col on desktop) */}
            <div className="flex flex-col gap-4">
              {[
                { num: "11", label: "Years running" },
                { num: "1,400+", label: "Hackers per year" },
                { num: "396h", label: "Total building hours" },
                { num: "100s", label: "Of projects" },
                { num: "~15k", label: "Alumni total" },
              ].map((stat, i) => (
                <div key={i} className="bg-teal rounded-lg p-6 border border-orange/20">
                  <div className="text-4xl font-bold text-orange mb-3">{stat.num}</div>
                  <div className="text-sm text-cream">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-16">
            <h2 className="text-xl font-display font-bold text-white mb-8">
              Bitcamp through the years
            </h2>
            <div className="relative">
              <div className="hidden md:block absolute top-3 left-0 right-0 h-1 bg-orange/20"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 relative z-10">
                {[
                  { year: 2014, label: "1k+ hackers" },
                  { year: 2016, label: "Growing" },
                  { year: 2018, label: "Expanded" },
                  { year: 2019, label: "Frontier" },
                  { year: 2020, label: "Remote" },
                  { year: 2022, label: "Comeback" },
                  { year: 2024, label: "Journey" },
                  { year: 2026, label: "Unknown" },
                ].map((item) => (
                  <div key={item.year} className="text-center">
                    <div className="hidden md:block w-6 h-6 rounded-full mx-auto mb-3 border-4 bg-orange border-space"></div>
                    <div className="text-sm text-cream font-semibold">{item.year}</div>
                    <div className="text-xs text-muted">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

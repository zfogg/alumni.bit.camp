export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-space text-cream">
      {/* Hero Section */}
      <section className="pt-30 pb-4">
        <div className="text-center max-w-3xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            About Bitcamp
          </h1>
          <p className="text-lg md:text-xl text-cream leading-relaxed">
            The story behind eleven years of builders, hackers, and innovators.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🛠️",
                title: "What is Bitcamp?",
                desc: "Bitcamp is the University of Maryland's largest annual hackathon, founded in 2014. We bring together 1,400+ hackers, organizers, and sponsors for a weekend of innovation.",
              },
              {
                icon: "🤝",
                title: "Why This Community",
                desc: "We believe in the power of connection. This site keeps our alumni united, celebrating past hackathons and building towards the next generation.",
              },
              {
                icon: "👥",
                title: "Who Can Join",
                desc: "If you've ever been part of Bitcamp — as a hacker, organizer, sponsor, or staff member — you belong here. Welcome home.",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-teal rounded-2xl p-10 border border-orange/20">
                <div className="w-16 h-16 bg-orange rounded-lg flex items-center justify-center text-3xl mb-4">
                  {item.icon}
                </div>
                <h2 className="text-2xl font-display font-bold text-white mb-4">{item.title}</h2>
                <p className="text-base text-cream leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-4">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-teal rounded-2xl p-12 border border-orange/20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12 text-center">
              Our Timeline
            </h2>
            <div className="flex flex-col gap-6">
              {[2014, 2016, 2018, 2020, 2022, 2024].map((year, idx) => (
                <div
                  key={year}
                  className={`flex items-center gap-4 pb-6 ${idx < 5 ? "border-b border-orange/30" : ""}`}
                >
                  <div className="w-3 h-3 rounded-full bg-orange flex-shrink-0" />
                  <span className="text-lg text-white font-semibold">{year}</span>
                  <span className="text-base text-muted">Bitcamp {year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-4 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-teal rounded-2xl p-12 border border-orange/20">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12 text-center">
              By The Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-orange mb-3">11+</div>
                <div className="text-lg text-cream font-semibold">Years Active</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-orange mb-3">15,400+</div>
                <div className="text-lg text-cream font-semibold">Total Hackers</div>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-orange mb-3">$500K+</div>
                <div className="text-lg text-cream font-semibold">In Prizes</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

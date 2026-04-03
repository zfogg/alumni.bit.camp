import { Card } from "../components/ui/Card";

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-space text-cream pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-display font-bold text-white mb-12 text-center">
          About Bitcamp
        </h1>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card>
            <h2 className="text-2xl font-display font-bold text-white mb-4">What is Bitcamp?</h2>
            <p className="text-cream">
              Bitcamp is the University of Maryland's largest annual hackathon, founded in 2014. We
              bring together 1,400+ hackers, organizers, and sponsors for a weekend of innovation.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-display font-bold text-white mb-4">Why This Community</h2>
            <p className="text-cream">
              We believe in the power of connection. This site keeps our alumni united, celebrating
              past hackathons and building towards the next generation.
            </p>
          </Card>

          <Card>
            <h2 className="text-2xl font-display font-bold text-white mb-4">Who Can Join</h2>
            <p className="text-cream">
              If you've ever been part of Bitcamp — as a hacker, organizer, sponsor, or staff member
              — you belong here. Welcome home.
            </p>
          </Card>
        </div>

        <Card className="mb-20">
          <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">Timeline</h2>
          <div className="space-y-4">
            {[2014, 2016, 2018, 2020, 2022, 2024].map((year) => (
              <div key={year} className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-orange flex-shrink-0" />
                <span className="text-cream font-semibold">{year}</span>
                <span className="text-muted">Bitcamp {year}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-8">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold text-orange">11+</div>
              <div className="text-muted">Years</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange">15,400+</div>
              <div className="text-muted">Total Hackers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange">$500K+</div>
              <div className="text-muted">In Prizes</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

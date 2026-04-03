import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export const Give: React.FC = () => {
  const [type, setType] = useState<"donate" | "sponsor">("donate");

  return (
    <div className="min-h-screen bg-space text-cream pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-white mb-6">
            You got something from Bitcamp.
            <br />
            Give something back.
          </h1>
          <p className="text-xl text-cream mb-4 max-w-2xl mx-auto">
            Keeping Bitcamp free and growing. Every contribution funds prizes, food, and the next
            generation of builders.
          </p>
          <div className="text-orange font-bold text-2xl">
            100% of donations go directly to Bitcamp.
          </div>
        </section>

        {/* Path cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <Card
            className={`cursor-pointer transition ${type === "donate" ? "ring-2 ring-orange" : "opacity-70"}`}
            onClick={() => setType("donate")}
          >
            <h2 className="text-2xl font-display font-bold text-white mb-4">Donate</h2>
            <p className="text-cream mb-4">Give any amount to support Bitcamp</p>
            <ul className="text-muted text-sm space-y-2">
              <li>✓ One-time or recurring</li>
              <li>✓ 100% goes to Bitcamp</li>
              <li>✓ Direct impact</li>
            </ul>
          </Card>

          <Card
            className={`cursor-pointer transition ${type === "sponsor" ? "ring-2 ring-orange" : "opacity-70"}`}
            onClick={() => setType("sponsor")}
          >
            <h2 className="text-2xl font-display font-bold text-white mb-4">Sponsor a Prize</h2>
            <p className="text-cream mb-4">Put your name on a prize</p>
            <ul className="text-muted text-sm space-y-2">
              <li>✓ Your criteria</li>
              <li>✓ Winners remember you</li>
              <li>✓ Your legacy</li>
            </ul>
          </Card>
        </div>

        {/* Form */}
        <Card>
          <h2 className="text-2xl font-display font-bold text-white mb-6 text-center">
            {type === "donate" ? "Donate to Bitcamp" : "Sponsor a Prize"}
          </h2>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submitted! (Mock)");
            }}
          >
            <Input label="Full Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="your@email.com" />

            {type === "donate" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-cream mb-2">
                    Donation Range
                  </label>
                  <select className="w-full px-4 py-2 rounded-card bg-space border-2 border-teal text-cream">
                    <option value="unsure">Not sure yet</option>
                    <option value="<50">Less than $50</option>
                    <option value="50-200">$50–$200</option>
                    <option value="200-500">$200–$500</option>
                    <option value="500+">$500+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cream mb-2">
                    Message (optional)
                  </label>
                  <textarea
                    placeholder="Anything you'd like to say?"
                    className="w-full px-4 py-2 rounded-card bg-space border-2 border-teal text-cream placeholder-muted focus:outline-none focus:border-orange"
                    rows={4}
                  />
                </div>
              </>
            )}

            {type === "sponsor" && (
              <>
                <Input label="Prize Name" placeholder="e.g. The Zach Fogg Award" />
                <div>
                  <label className="block text-sm font-semibold text-cream mb-2">
                    What will winners receive?
                  </label>
                  <textarea
                    placeholder="Describe the prize..."
                    className="w-full px-4 py-2 rounded-card bg-space border-2 border-teal text-cream placeholder-muted focus:outline-none focus:border-orange"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cream mb-2">
                    Prize criteria
                  </label>
                  <textarea
                    placeholder="What kind of hack should win?"
                    className="w-full px-4 py-2 rounded-card bg-space border-2 border-teal text-cream placeholder-muted focus:outline-none focus:border-orange"
                    rows={4}
                  />
                </div>
              </>
            )}

            <Button type="submit" size="lg" className="w-full">
              {type === "donate" ? "Express Interest" : "Sponsor This Prize"}
            </Button>

            <p className="text-muted text-sm text-center">
              This form expresses interest only. No payment is collected here.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

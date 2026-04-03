import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import type { SupportFormData } from "../types";
import { submitSupportForm } from "../lib/api";

type Status = "idle" | "loading" | "success" | "error";

const testimonials = [
  {
    quote:
      "Bitcamp changed my life. Supporting the next generation feels like the right thing to do.",
    author: "Sarah Chen",
    role: "Hacker '18, now at Google",
  },
  {
    quote: "Sponsoring a prize was my way of saying thanks to the organizers who believed in me.",
    author: "Marcus Williams",
    role: "Sponsor '21",
  },
  {
    quote: "100% going to Bitcamp means your impact is real and immediate.",
    author: "Alex Rodriguez",
    role: "Donor since 2022",
  },
];

export const Give: React.FC = () => {
  const [type, setType] = useState<"donate" | "sponsor">("donate");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupportFormData & { company_name?: string }>({
    defaultValues: { type: "donate" },
  });

  const onSubmit = async (data: SupportFormData & { company_name?: string }) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitSupportForm({ ...data, type });
      setStatus("success");
      reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  const handleTypeChange = (newType: "donate" | "sponsor") => {
    setType(newType);
    setStatus("idle");
    setErrorMsg("");
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-space text-cream pt-20 pb-20 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-7xl mb-6">{type === "donate" ? "💰" : "🏆"}</div>
          <h1 className="text-5xl font-display font-bold text-white mb-6">
            {type === "donate" ? "Thank you!" : "Amazing!"}
          </h1>
          <p className="text-xl text-cream mb-10 leading-relaxed">
            {type === "donate"
              ? "We've received your donation interest. We'll be in touch within 48 hours with next steps."
              : "Your prize sponsorship interest has been submitted. We'll reach out within 48 hours to get the details sorted."}
          </p>
          <Button onClick={() => setStatus("idle")} variant="secondary" size="lg">
            Submit another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space text-cream pt-20 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            You got something from Bitcamp.
            <br />
            Give something back.
          </h1>
          <p className="text-lg md:text-xl text-cream mb-8 max-w-3xl mx-auto leading-relaxed">
            Keeping Bitcamp free and growing. Every contribution funds prizes, food, and the next
            generation of builders.
          </p>
          <div className="bg-teal rounded-card p-6 max-w-2xl mx-auto">
            <p className="text-orange font-display font-bold text-3xl">
              100% of donations go directly to Bitcamp.
            </p>
          </div>
        </section>

        {/* Donate Section */}
        <section className="mb-20">
          <div
            className={`bg-teal rounded-card p-8 cursor-pointer transition transform hover:scale-105 max-w-2xl mx-auto ${
              type === "donate" ? "ring-2 ring-orange scale-105" : "opacity-80"
            }`}
            onClick={() => handleTypeChange("donate")}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-3xl font-display font-bold text-white">Donate</h2>
              <span className="text-4xl text-orange">💰</span>
            </div>
            <p className="text-cream text-lg mb-6">Give any amount to support Bitcamp</p>
            <ul className="text-white text-base space-y-3">
              <li className="flex items-center">
                <span className="text-orange mr-3 text-xl">✓</span>
                <span>One-time or recurring</span>
              </li>
              <li className="flex items-center">
                <span className="text-orange mr-3 text-xl">✓</span>
                <span>100% goes to Bitcamp</span>
              </li>
              <li className="flex items-center">
                <span className="text-orange mr-3 text-xl">✓</span>
                <span>Direct impact on hackers</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Sponsor a Prize Section */}
        <section className="mb-20">
          <div
            className={`bg-teal rounded-card p-8 cursor-pointer transition transform hover:scale-105 max-w-2xl mx-auto ${
              type === "sponsor" ? "ring-2 ring-orange scale-105" : "opacity-80"
            }`}
            onClick={() => handleTypeChange("sponsor")}
          >
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-3xl font-display font-bold text-white">Sponsor a Prize</h2>
              <span className="text-4xl text-orange">🏆</span>
            </div>
            <p className="text-cream text-lg mb-6">Put your name on a prize at the next Bitcamp</p>
            <ul className="text-white text-base space-y-3">
              <li className="flex items-center">
                <span className="text-orange mr-3 text-xl">✓</span>
                <span>Your criteria, your impact</span>
              </li>
              <li className="flex items-center">
                <span className="text-orange mr-3 text-xl">✓</span>
                <span>Winners remember you forever</span>
              </li>
              <li className="flex items-center">
                <span className="text-orange mr-3 text-xl">✓</span>
                <span>Build your legacy</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Social Proof */}
        <section className="mb-20">
          <h3 className="text-2xl font-display font-bold text-white text-center mb-12">
            Why alumni are giving back
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-teal rounded-card p-6">
                <p className="text-cream mb-4 italic text-lg leading-relaxed">"{t.quote}"</p>
                <p className="font-display font-bold text-orange text-lg">{t.author}</p>
                <p className="text-muted text-sm">{t.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form Card */}
        <Card className="mb-12">
          <h2 className="text-4xl font-display font-bold text-white mb-8 text-center">
            {type === "donate" ? "Start Your Donation" : "Become a Prize Sponsor"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
            {/* Honeypot — hidden from real users, bots fill it in */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
              {...register("company_name")}
            />

            <Input
              label="Full Name"
              placeholder="Your name"
              {...register("name", { required: "Name is required" })}
              error={errors.name?.message}
            />

            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
              })}
              error={errors.email?.message}
            />

            {type === "donate" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-cream mb-3">
                    Donation Range
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-card bg-space border-2 border-orange text-cream font-body focus:outline-none focus:border-white transition"
                    {...register("donation_range")}
                  >
                    <option value="unsure">Not sure yet</option>
                    <option value="<50">Less than $50</option>
                    <option value="50-200">$50–$200</option>
                    <option value="200-500">$200–$500</option>
                    <option value="500+">$500+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cream mb-3">
                    Message (optional)
                  </label>
                  <textarea
                    placeholder="Anything you'd like to say to the Bitcamp team?"
                    className="w-full px-4 py-3 rounded-card bg-space border-2 border-orange text-cream placeholder-muted font-body focus:outline-none focus:border-white transition"
                    rows={4}
                    {...register("message")}
                  />
                </div>
              </>
            )}

            {type === "sponsor" && (
              <>
                <Input
                  label="Prize Name *"
                  placeholder="e.g. The Zach Fogg Award for Most Creative Use of AI"
                  {...register("prize_name", {
                    required: type === "sponsor" ? "Prize name is required" : false,
                  })}
                  error={errors.prize_name?.message}
                />
                <div>
                  <label className="block text-sm font-semibold text-cream mb-3">
                    What will winners receive? *
                  </label>
                  <textarea
                    placeholder="Describe the prize: cash amount, merchandise, experience, mentorship, etc."
                    className="w-full px-4 py-3 rounded-card bg-space border-2 border-orange text-cream placeholder-muted font-body focus:outline-none focus:border-white transition"
                    rows={4}
                    {...register("prize_description", {
                      required:
                        type === "sponsor" ? "Please describe what winners will receive" : false,
                    })}
                  />
                  {errors.prize_description && (
                    <p className="text-orange text-sm mt-2">{errors.prize_description.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cream mb-3">
                    Prize criteria *
                  </label>
                  <textarea
                    placeholder="What kind of hack or achievement should win? (e.g., 'Most creative use of open-source libraries')"
                    className="w-full px-4 py-3 rounded-card bg-space border-2 border-orange text-cream placeholder-muted font-body focus:outline-none focus:border-white transition"
                    rows={4}
                    {...register("prize_criteria", {
                      required:
                        type === "sponsor" ? "Please describe what kind of hack should win" : false,
                    })}
                  />
                  {errors.prize_criteria && (
                    <p className="text-orange text-sm mt-2">{errors.prize_criteria.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-cream mb-3">
                    Preferred year
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-card bg-space border-2 border-orange text-cream font-body focus:outline-none focus:border-white transition"
                    {...register("preferred_year")}
                  >
                    <option value="unsure">Not sure yet</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                  </select>
                </div>
              </>
            )}

            {status === "error" && (
              <div className="bg-teal border border-orange rounded-card px-4 py-3 text-orange text-sm">
                {errorMsg}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-8"
              disabled={status === "loading"}
            >
              {status === "loading"
                ? "Submitting…"
                : type === "donate"
                  ? "Express Donation Interest"
                  : "Sponsor a Prize"}
            </Button>

            <p className="text-muted text-sm text-center border-t border-orange pt-4">
              ✓ This form expresses interest only — no payment is collected here.
              <br />
              We'll be in touch within 48 hours.
            </p>
          </form>
        </Card>

        {/* Fine Print */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-muted text-sm">
            Donations are not currently tax-deductible. Bitcamp is a project of the University of
            Maryland. Have questions?{" "}
            <a href="/contact" className="text-orange hover:underline">
              Get in touch
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

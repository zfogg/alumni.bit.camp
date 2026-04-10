import { useState } from "react";
import { useForm } from "react-hook-form";
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
      <div className="bg-space text-cream flex-1 flex items-center justify-center py-20 px-6">
        <div className="max-w-xl text-center">
          <div className="text-8xl mb-6">{type === "donate" ? "💰" : "🏆"}</div>
          <h1 className="text-5xl font-display font-bold text-white mb-6">
            {type === "donate" ? "Thank you!" : "Amazing!"}
          </h1>
          <p className="text-lg text-cream mb-10 leading-relaxed">
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
    <div className="bg-space text-cream flex-1">
      {/* Hero */}
      <section className="pt-32 pb-4">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-display font-bold text-white mb-6 leading-tight">
            You got something from Bitcamp.
            <br />
            Give something back.
          </h1>
          <p className="text-lg text-cream max-w-2xl mx-auto mb-8 leading-relaxed">
            Keeping Bitcamp free and growing. Every contribution funds prizes, food, and the next
            generation of builders.
          </p>
          <div className="bg-teal rounded-2xl p-6 max-w-2xl mx-auto mb-8 border border-orange/20">
            <p className="text-2xl text-orange font-display font-bold m-0">
              100% of donations go directly to Bitcamp.
            </p>
          </div>
          <div className="h-px bg-orange/30"></div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="py-8 px-6">
        <div className="max-w-2xl mx-auto">
          <div
            className={`bg-teal rounded-2xl p-8 border-2 cursor-pointer transition-all ${
              type === "donate"
                ? "border-orange scale-105 opacity-100"
                : "border-orange/20 scale-100 opacity-70 hover:border-orange"
            }`}
            onClick={() => handleTypeChange("donate")}
          >
            <div className="flex justify-between items-start gap-3 mb-4">
              <h2 className="text-3xl font-display font-bold text-white m-0">Donate</h2>
              <span className="text-4xl flex-shrink-0">💰</span>
            </div>
            <p className="text-base text-cream mb-4 m-0">Give any amount to support Bitcamp</p>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {["One-time or recurring", "100% goes to Bitcamp", "Direct impact on hackers"].map(
                (item, i) => (
                  <li key={i} className="flex items-center text-base text-white gap-3">
                    <span className="text-orange text-lg flex-shrink-0">✓</span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Sponsor Section */}
      <section className="py-8 px-6 pb-32">
        <div className="max-w-2xl mx-auto">
          <div
            className={`bg-teal rounded-2xl p-8 border-2 cursor-pointer transition-all ${
              type === "sponsor"
                ? "border-orange scale-105 opacity-100"
                : "border-orange/20 scale-100 opacity-70 hover:border-orange"
            }`}
            onClick={() => handleTypeChange("sponsor")}
          >
            <div className="flex justify-between items-start gap-3 mb-4">
              <h2 className="text-3xl font-display font-bold text-white m-0">Sponsor a Prize</h2>
              <span className="text-4xl flex-shrink-0">🏆</span>
            </div>
            <p className="text-base text-cream mb-4 m-0">
              Put your name on a prize at the next Bitcamp
            </p>
            <div className="bg-orange/10 border border-orange/30 rounded-lg p-3 mb-4">
              <p className="text-sm text-cream m-0">
                💡 Prize budgets under $400 may be combined with another sponsor's contribution.
              </p>
            </div>
            <ul className="list-none p-0 m-0 flex flex-col gap-3">
              {[
                "Your criteria, your impact",
                "Winners remember you forever",
                "Build your legacy",
              ].map((item, i) => (
                <li key={i} className="flex items-center text-base text-white gap-3">
                  <span className="text-orange text-lg flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 px-6 pb-32">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-display font-bold text-white text-center mb-12">
            Why alumni are giving back
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-teal rounded-2xl p-6 border border-orange/20">
                <p className="text-cream mb-4 italic text-base leading-relaxed m-0">"{t.quote}"</p>
                <p className="text-orange font-display font-bold text-base mb-1 m-0">{t.author}</p>
                <p className="text-muted text-sm m-0">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 px-6 pb-32">
        <div className="max-w-2xl mx-auto">
          <div className="bg-teal rounded-2xl p-8 border border-orange/20">
            <h2 className="text-2xl font-display font-bold text-white text-center mb-8 m-0">
              {type === "donate" ? "Start Your Donation" : "Become a Prize Sponsor"}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                      className="w-full px-4 py-3 rounded-xl bg-space border-2 border-orange text-cream font-inherit"
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
                      className="w-full px-4 py-3 rounded-xl bg-space border-2 border-orange text-cream font-inherit min-h-24 resize-vertical"
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
                      className="w-full px-4 py-3 rounded-xl bg-space border-2 border-orange text-cream font-inherit min-h-24 resize-vertical"
                      rows={4}
                      {...register("prize_description", {
                        required:
                          type === "sponsor" ? "Please describe what winners will receive" : false,
                      })}
                    />
                    {errors.prize_description && (
                      <p className="text-orange text-xs mt-2">{errors.prize_description.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cream mb-3">
                      Prize criteria *
                    </label>
                    <textarea
                      placeholder="What kind of hack or achievement should win? (e.g., 'Most creative use of open-source libraries')"
                      className="w-full px-4 py-3 rounded-xl bg-space border-2 border-orange text-cream font-inherit min-h-24 resize-vertical"
                      rows={4}
                      {...register("prize_criteria", {
                        required:
                          type === "sponsor"
                            ? "Please describe what kind of hack should win"
                            : false,
                      })}
                    />
                    {errors.prize_criteria && (
                      <p className="text-orange text-xs mt-2">{errors.prize_criteria.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cream mb-3">
                      Estimated Budget (Bitcamp Contribution + Prizes for Hackers)
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-space border-2 border-orange text-cream font-inherit"
                      {...register("budget_range")}
                    >
                      <option value="">Select a budget range</option>
                      <option value="0-250">$0–$250</option>
                      <option value="250-500">$250–$500</option>
                      <option value="500-750">$500–$750</option>
                      <option value="750-1000">$750–$1,000</option>
                      <option value="1000+">$1,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cream mb-3">
                      Preferred year
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-space border-2 border-orange text-cream font-inherit"
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
                <div className="bg-teal border border-orange rounded-xl px-4 py-3 text-orange text-sm">
                  {errorMsg}
                </div>
              )}

              <Button
                type="submit"
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

              <p className="text-muted text-xs text-center border-t border-orange pt-4 m-0">
                ✓ This form expresses interest only — no payment is collected here.
                <br />
                We'll be in touch within 48 hours.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

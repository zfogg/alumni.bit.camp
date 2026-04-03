import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import type { JoinFormData } from "../types";
import { submitJoinForm } from "../lib/api";

type Status = "idle" | "loading" | "success" | "error";

export const Join: React.FC = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<JoinFormData & { website_url?: string }>();

  const onSubmit = async (data: JoinFormData & { website_url?: string }) => {
    setStatus("loading");
    setErrorMsg("");
    try {
      await submitJoinForm(data);
      setStatus("success");
      reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-space text-cream flex items-center justify-center py-20 px-6">
        <div className="max-w-xl text-center">
          <div className="text-8xl mb-6">🔥</div>
          <h1 className="text-5xl font-display font-bold text-white mb-6">You're in!</h1>
          <p className="text-lg text-cream mb-10 leading-relaxed">
            Welcome to the Bitcamp alumni network. We'll review your profile and reach out soon.
          </p>
          <Button onClick={() => setStatus("idle")} size="lg">
            Submit another entry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space text-cream pt-32 pb-20">
      {/* Hero */}
      <section className="pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-6xl font-display font-bold text-white mb-2">Join Bitcamp Alumni</h1>
          <p className="text-base text-cream mb-8 leading-relaxed">
            Add yourself to our community. Help us keep the Bitcamp spirit alive.
          </p>
          <div className="h-px bg-orange/30"></div>
        </div>
      </section>

      {/* Form */}
      <section className="py-4 px-6 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="bg-teal rounded-2xl p-8 border border-orange/20">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
              {/* Honeypot — hidden from real users, bots fill it in */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                {...register("website_url")}
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
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                error={errors.email?.message}
              />

              <div>
                <label className="block text-sm font-semibold text-cream mb-3">
                  Year(s) Attended *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[2014, 2016, 2018, 2019, 2020, 2022, 2024, 2025].map((y) => (
                    <label
                      key={y}
                      className="flex items-center gap-2 cursor-pointer text-sm text-cream"
                    >
                      <input
                        type="checkbox"
                        value={y}
                        className="w-5 h-5 cursor-pointer accent-orange"
                        {...register("year", {
                          validate: (value) =>
                            (value && value.length > 0) || "Select at least one year",
                        })}
                      />
                      {y}
                    </label>
                  ))}
                </div>
                {errors.year && <p className="text-orange text-xs mt-2">{errors.year.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-cream mb-3">Role</label>
                <select
                  className="w-full px-4 py-3 rounded-xl bg-space border-2 border-teal text-cream font-inherit focus:border-orange transition-colors"
                  {...register("role", { required: "Role is required" })}
                >
                  <option value="">Select a role</option>
                  <option value="Hacker">Hacker</option>
                  <option value="Organizer">Organizer</option>
                  <option value="Sponsor">Sponsor</option>
                  <option value="Staff">Staff</option>
                  <option value="Other">Other</option>
                </select>
                {errors.role && <p className="text-orange text-xs mt-2">{errors.role.message}</p>}
              </div>

              <Input
                label="School / Organization (optional)"
                placeholder="University of Maryland"
                {...register("school")}
              />

              <Input
                label="What did you build? (optional)"
                placeholder="Tell us about your project or role"
                {...register("what_i_did")}
              />

              <Input
                label="LinkedIn (optional)"
                placeholder="https://linkedin.com/in/..."
                {...register("linkedin")}
              />

              <Input
                label="GitHub (optional)"
                placeholder="https://github.com/..."
                {...register("github")}
              />

              {status === "error" && (
                <div className="bg-teal border border-orange rounded-xl px-4 py-3 text-orange text-sm">
                  {errorMsg}
                </div>
              )}

              <Button type="submit" size="lg" disabled={status === "loading"} className="w-full">
                {status === "loading" ? "Submitting…" : "Join the Alumni"}
              </Button>

              <p className="text-muted text-xs text-center m-0">
                Your info is saved to a private spreadsheet. We'll never share it without
                permission.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
